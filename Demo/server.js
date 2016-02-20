// libraries stored in variables ( similar to include/import in most programming languages)
var mysql = require('mysql');
var path = require("path");
var express = require('express');
var databaseName = "I4CApp";

// object that holds connection details
var connection = mysql.createConnection({
	host : 'i4cdb.cu1tzf3zeuyw.ap-southeast-2.rds.amazonaws.com',
	user : 'i4c_user',
	password: 'mypassword',
}); 
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

// Connecting to database
console.log('Connecting to the database');
connection.connect(function(err) {
	if (err) {
		console.error("error connecting: " + err.stack);
		console.log("");
		console.log("**************************************************");
		console.log("***Check internet connection and MySQL database***");
		console.log("**************************************************");
		return;
	}
	
	console.log("connected as id " + connection.threadId);
});



// view engine setup
app.set('views', path.join(__dirname, 'public/css'));
app.set('view engine', 'css');
app.use(express.static(path.join(__dirname, 'public')));
/******* Handling of client request ***********/

// This function returns the index page
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});


// This function should handle all request from client and return what client requested
io.on('connection', function(socket){

	// Gets List of Charities
	socket.on('Get List', function(msg){
		var index = msg.indexOf(":");
		if(index < 0){
			var strQuery = "SELECT * FROM " + databaseName + ".charity_list WHERE Sector = '" +msg +"'";
		}else{
			var split = msg.split(":",2);
			var strQuery = "SELECT * FROM " + databaseName + ".charity_list WHERE Sector = '" + split[0] +"' AND total_revenues >= " + parseInt(split[1]);
		}
		connection.query(strQuery, function(err, rows, fields) {
			if(!err) {
				//console.log(Number(split[1]));
				socket.emit('Reply List', rows);
			}
			else {
				throw err;
			}
		});
	  });
	  
	  // Get list of Categories
	  socket.on('Get Categories', function(msg){
		var strQuery = "SELECT DISTINCT Sector FROM " + databaseName + ".charity_list";
		connection.query(strQuery, function(err, rows, fields) {
			if(!err) {
				socket.emit('Reply Categories', rows);
			}else {
				throw err;
			}
		});
	  });
	  
	  // Gets Results From Search
	  socket.on('Get Search', function(msg){ 
		var strQuery = "SELECT * FROM " + databaseName + ".charity_list WHERE Name_of_charity LIKE '%"+ msg +"%'";
		connection.query(strQuery, function(err, rows, fields) {
			if(!err) {
				socket.emit('Reply List', rows);
			}
			else {
				throw err;
			}
		});
	});
	
	//Sign Up
	socket.on('Sign Up', function(msg){ 
		var split = msg.split(":",4);
		
		//Check if there is a person with same username
		var strQuery = "SELECT * FROM " + databaseName + ".users WHERE username='" + split[0] + "'";
		connection.query(strQuery, function(err, rows, fields) {
			if(!err) {
				if(rows.length > 0){
					socket.emit('Reply SignUp', "Not Successful");
				}else{
					var strQuery = "INSERT INTO " + databaseName + ".users (username, email, password, name) VALUES ('" + split[0] + "','" + split[1] + "','" + split[2] + "','" + split[3] +"')";
					connection.query(strQuery, function(err, rows, fields) {
						if(!err) {
							socket.emit('Reply SignUp', split[3]);
						}else{
							throw err;
						}
					});
				}
			}
			else {
				throw err;
			}
		});
	});
	
	 // Login
	  socket.on('Login', function(msg){ 
		var split = msg.split(":",2);
		var strQuery = "SELECT * FROM " + databaseName + ".users WHERE username='" + split[0] + "' AND password='" +split[1]+"'";
		connection.query(strQuery, function(err, rows, fields) {
			if(!err) {
				if(rows.length > 0){
					socket.emit('Reply Login', split[0]);
				}else{
					socket.emit('Reply Login', "Not Successful");
				}
			}
			else {
				throw err;
			}
		});
	});
	
	// Vote
	  socket.on('Vote', function(msg){
		var split = msg.split(":",2);
		// CHecks if user has already voted for this charity
		var strQuery = "SELECT user FROM " + databaseName + ".user_votes WHERE EXISTS(SELECT 1 FROM " + databaseName + ".user_votes WHERE user ='"+ split[1] + "' AND charity ='" + split[0]+ "')";
		connection.query(strQuery, function(err, rows, fields) {
			if(!err) {
				if(rows[0] != null){
					socket.emit('Reply Vote', "Already Voted");
				}else{
					//increments vote count
					var strQuery = "UPDATE " + databaseName + ".charity_list SET vote_count = vote_count + 1 WHERE Name_of_charity ='" + split[0] +"'";
					connection.query(strQuery, function(err, rows, fields) {
						if(!err) {
							// Stores user voted to charity in table
							var strQuery = "INSERT INTO " + databaseName + ".user_votes VALUES ('" + split[1] + "','" + split[0]+"')";
							connection.query(strQuery, function(err, rows, fields) {
								if(!err) {
									socket.emit('Reply Vote', "Successful Vote");
								}
								else {
									throw err;
								}
							});
						
						}else {
							throw err;
						}
					});
				}
			}else {
				throw err;
			}
		});
	});
	
	//User information
	socket.on('User Info', function(msg){
		var strQuery = "SELECT * FROM " + databaseName + ".users WHERE username='" + msg + "'";
		connection.query(strQuery, function(err, rows, fields) {
			if(!err) {
				socket.emit('Reply UserInfo', rows);
			}else {
				throw err;
			}
		});
	});
	
	// Change Password
	  socket.on('Change Password', function(msg){
	  var split = msg.split(":",2);
		var strQuery = "UPDATE " + databaseName + ".users SET password='" + split[0] + "' WHERE username='" + split[1] +"'";
		connection.query(strQuery, function(err, rows, fields) {
			if(!err) {}
			else {
				throw err;
			}
		});
	});
	
	// Change Email
	  socket.on('Change Email', function(msg){
	  var split = msg.split(":",2);
		var strQuery = "UPDATE " + databaseName + ".users SET email='" + split[0] + "' WHERE username='" + split[1] +"'";
		connection.query(strQuery, function(err, rows, fields) {
			if(!err) {}
			else {
				throw err;
			}
		});
	});
	
	// Get voted charity list
	  socket.on('Get Voted Charities', function(msg){
		var strQuery = "Select * FROM " + databaseName + ".user_votes v INNER JOIN " + databaseName + ".charity_list c on(v.charity = c.Name_of_charity) WHERE (v.user ='"+ msg + "')";
		connection.query(strQuery, function(err, rows, fields) {
			if(!err) {
				socket.emit('Reply Voted List', rows);
			}
			else {
				throw err;
			}
		});
	});
});

// Listen for request from clients
http.listen(8081, function(){
  console.log('listening on *:8081');
});