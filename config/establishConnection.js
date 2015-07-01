// libraries stored in variables ( similar to include/import in most programming languages)
var mysql = require('mysql');

// object that holds connection details
var connection = mysql.createConnection({
	host : 'i4ctest.czutpqleq2ky.us-east-1.rds.amazonaws.com',
	user : 'i4ctest',
	password: '1234567890',
}); 

console.log('Connecting to the database');
connection.connect(function(err) {
	if (err) {
		console.error("error connecting: " + err.stack);
		return;
	}
	
	console.log("connected as id " + connection.threadId);
});

// Querying starts here
/*
var strQuery = "SELECT * FROM charity_list.yots WHERE sector = 'education' ";
connection.query(strQuery, function(err, rows, fields) {
	if(!err) {
		console.log(rows);
	}
	else {
		throw err;
	}
});

var results = rows;
*/


// close connection
// connection.end();

// Show the loading screen for 5 seconds, then go to the list of charities
setTimeout(function(){window.location.href='list.html'}, 5000);