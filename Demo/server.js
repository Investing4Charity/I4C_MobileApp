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

// var strQuery = "UPDATE charities.users SET username='bobham' WHERE name='Bob Hamilton'";
var strQuery = "SELECT * FROM charities.users"
// var strQuery = "ALTER TABLE charities.users ADD username varchar(50);"
connection.query(strQuery, function(err, rows, fields) {
	if(!err) {
		console.log(rows);	
	}else {
		throw err;
	}
});


// This function should handle all request from client and return what client requested
io.on('connection', function(socket){

	// Gets List of Charities
	socket.on('Get List', function(msg){
		var index = msg.indexOf(":");
		if(index < 0){
			var strQuery = "SELECT * FROM charities.villa_maria WHERE sector = '" +msg +"'";
		}else{
			var split = msg.split(":",2);
			var strQuery = "SELECT * FROM charities.villa_maria WHERE sector = '" +split[0] +"' AND net_income >= '" + split[1] +"'";
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
		var strQuery = "SELECT DISTINCT sector FROM charities.villa_maria";
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
		var strQuery = "SELECT * FROM charities.villa_maria WHERE name LIKE '%"+ msg +"%'";
		connection.query(strQuery, function(err, rows, fields) {
			if(!err) {
				socket.emit('Reply Search', rows);
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
				console.log(rows);
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
});

// Listen for request from clients
http.listen(8081, function(){
  console.log('listening on *:8081');
});
