// libraries stored in variables ( similar to include/import in most programming languages)
var mysql = require('mysql');
var path = require("path");
var express = require('express');

// object that holds connection details
var connection = mysql.createConnection({
	host : 'test.cu1tzf3zeuyw.ap-southeast-2.rds.amazonaws.com',
	user : 'i4ctest3',
	password: '1234567890',
}); 
var app = express();
var http = require('http').Server(app);
var io = require('socket.io').listen(http);

// Connecting to database
console.log('Connecting to the database');
connection.connect(function(err) {
	if (err) {
		console.error("error connecting: " + err.stack);
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

// var strQuery = "ALTER TABLE charities.users ADD username varchar(50);"
// var strQuery = "UPDATE charities.charity_list SET vote_count=0";
// var strQuery = "INSERT INTO charities.charity_list VALUES ('Vapur WaterBottles','Medicine',201,11231,4234,-1123,-3123,3234,0.84,0.52,34,54,0)"
// var strQuery = "ALTER TABLE charities.charity_list MODIFY vote_count INT DEFAULT 0"; 
// var strQuery = "SELECT * FROM charities.charity_list"
// connection.query(strQuery, function(err, rows, fields) {
	// if(!err) {
		// console.log(rows);	
	// }else {
		// throw err;
	// }
// });

// This function should handle all request from client and return what client requested
io.on('connection', function(socket){

	// Gets List of Charities
	socket.on('Get List', function(msg){
		var index = msg.indexOf(":");
		if(index < 0){
			var strQuery = "SELECT * FROM charities.charity_list WHERE Sector = '" +msg +"'";
		}else{
			var split = msg.split(":",2);
			var strQuery = "SELECT * FROM charities.charity_list WHERE Sector = '" +split[0] +"' AND total_revenues >= '" + split[1] +"'";
		}
		connection.query(strQuery, function(err, rows, fields) {
			if(!err) {
				socket.emit('Reply List', rows);
			}
			else {
				throw err;
			}
		});
	  });
	  
	  // Get list of Categories
	  socket.on('Get Categories', function(msg){
		var strQuery = "SELECT DISTINCT Sector FROM charities.charity_list";
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
		var strQuery = "SELECT * FROM charities.charity_list WHERE Name_of_charity LIKE '%"+ msg +"%'";
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
		var strQuery = "SELECT * FROM charities.users WHERE username='" + split[0] + "'";
		connection.query(strQuery, function(err, rows, fields) {
			if(!err) {
				if(rows.length > 0){
					socket.emit('Reply SignUp', "Not Successful");
				}else{
					var strQuery = "INSERT INTO charities.users (username, email, password, name) VALUES ('" + split[0] + "','" + split[1] + "','" + split[2] + "','" + split[3] +"')";
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
		var strQuery = "SELECT * FROM charities.users WHERE username='" + split[0] + "' AND password='" +split[1]+"'";
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
		var strQuery = "SELECT user FROM charities.user_votes WHERE EXISTS(SELECT 1 FROM charities.user_votes WHERE user ='"+ split[1] + "' AND charity ='" + split[0]+ "')";
		connection.query(strQuery, function(err, rows, fields) {
			if(!err) {
				if(rows[0] != null){
					socket.emit('Reply Vote', "Already Voted");
				}else{
					//increments vote count
					var strQuery = "UPDATE charities.charity_list SET vote_count = vote_count + 1 WHERE Name_of_charity ='" + split[0] +"'";
					connection.query(strQuery, function(err, rows, fields) {
						if(!err) {
							// Stores user voted to charity in table
							var strQuery = "INSERT INTO charities.user_votes VALUES ('" + split[1] + "','" + split[0]+"')";
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
		var strQuery = "SELECT * FROM charities.users WHERE username='" + msg + "'";
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
		var strQuery = "UPDATE charities.users SET password='" + split[0] + "' WHERE username='" + split[1] +"'";
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
		var strQuery = "UPDATE charities.users SET email='" + split[0] + "' WHERE username='" + split[1] +"'";
		connection.query(strQuery, function(err, rows, fields) {
			if(!err) {}
			else {
				throw err;
			}
		});
	});
	
	// Get voted charity list
	  socket.on('Get Voted Charities', function(msg){
		var strQuery = "Select * FROM charities.user_votes v INNER JOIN charities.charity_list c on(v.charity = c.Name_of_charity) WHERE (v.user ='"+ msg + "')";
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