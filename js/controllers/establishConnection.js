
// libraries stored in variables ( similar to include/import in most programming languages)
var mysql = require('mysql');
var http = require("http");
var jquery = require("jsdom");

// object that holds connection details
var connection = mysql.createConnection({
	host : 'test.cu1tzf3zeuyw.ap-southeast-2.rds.amazonaws.com',
	user : 'i4ctest3',
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

var results;

var strQuery = "SELECT * FROM charities.villa_maria";
connection.query(strQuery, function(err, rows, fields) {
	results = rows;
	if(!err) {
		console.log(rows);
	}
	else {
		throw err;
	}
});

//a way to output data into a file, cant output the contents of charity data into a file
//var fs = require('fs');
//fs.writeFileSync("test.json", JSON.stringify(rows));
//fs.writeFileSync("test.json", "Hello world");

// creating the webserver 
// general function - http.createServer(function(request, response){body}).listen(8888, '127.0.0.1');
// The IP Address : 127.0.0.1 is commonly referred to as the localhost server and the port can be anything I believe
http.createServer(function(req, res) {  
	console.log('Creating the http server');
	
	// Querying starts here
	var strQuery = "SELECT * FROM charities.villa_maria";
	connection.query(strQuery, function(err, rows, fields) {
		if(!err) {
			console.log(rows);
			formatIntoTable(rows);
			
			// res(response) is sort of like an object for outputting things in the web server, here we are writing the html
			res.writeHead(200, { 'Content-Type': 'application/json'});
			res.writeHead(200, {
				'Content-Type': 'text/html'
			});
			/*
			res.write('<!doctype html>\n<html lang="en">\n' + 
				'\n<meta charset="utf-8">\n<title>Test web page on node.js</title>\n' + 
				'<style type="text/css">* {font-family:arial, sans-serif;}</style>\n' + 
				'\n\n<h1>Testing Queries</h1>\n' + 
				'<div id="content"><p>div</p></div>' + '\n\n'
			);
			*/
			// closes output stream
			res.end(JSON.stringify(rows));
			try {

				JSON.parse(JSON.stringify(rows));	

			} catch (e) {

				return console.error(e);
			
			}
			res.end();
		}
		else {
			throw err;
		}
	});

}).listen(8081);
console.log('Server running at http://127.0.0.1:8888');	
// close connection
// connection.end();

// Show the loading screen for 5 seconds, then go to the list of charities
//setTimeout(function(){window.location.href='list.html'}, 5000);

function formatIntoTable(obj){

	var tbl=$("<table/>").attr("id","mytable");
$("#div1").append(tbl);
for(var i=0;i<obj.length;i++)
{
    var tr="<tr>";
    var td1="<td>"+obj[i]["id"]+"</td>";
    var td2="<td>"+obj[i]["name"]+"</td>";
    var td3="<td>"+obj[i]["color"]+"</td></tr>";
    
   $("#mytable").append(tr+td1+td2+td3); 
  
}
}

