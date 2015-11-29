// Receives List Of charities
function receiveChar(appender){
	var socket = io();
	socket.on('Reply List', function(msg){
		// No charities in selected category
		if(msg[0] == null){
			$('#result').append('<li id="content"><p>Oh no! No charities in this category</p></li>' + '\n');
		
		// Print charities in selected category
		}else{
			for(var i in msg){
				$(appender).append('<li class="unselected" id="'+ "'" + msg[i].name +"'"  + '" onclick="charitySelect('+ "'" + msg[i].name +"'"  + ');"><p>' +
							'Name: ' + msg[i].name + '<br>Sector:' + msg[i].sector +
							'</p><div id="' + msg[i].name + 'Content" style="display:none"><h3>Summary</h3> salkdjhaf askjfh wifuahlfk haw ifqhfo a fhaoifuh</div></li>' + '\n');
			}
		}
		socket.on('disconnect', function(){})
	});
}

// Receives categories in database
function receiveCat(appender){
	var socket = io();
	socket.on('Reply Categories', function(msg){
		// Print category
			for(var i in msg){
				$(appender).append('<li><a id="content" onclick="storeCat('+ "'" + msg[i].sector +"'"  + ');" href="revenue.html">' 
				+ msg[i].sector + '</a></li>' + '\n');
			}
		socket.on('disconnect', function(){})
	});
}

// Receives categories in database and appends to different list then above
function receiveCatEdit(appender){
	var socket = io();
	socket.on('Reply Categories', function(msg){
		// Print category
			for(var i in msg){
				$(appender).append('<li><a id="content" onclick="storeCat('+ "'" + msg[i].sector +"'"  + ');">' 
				+ msg[i].sector + '</a></li>' + '\n');
			}
		socket.on('disconnect', function(){})
	});
}


// Receives search result
function receiveSearch(){
	var socket = io();
	socket.on('Reply Search', function(msg){
		// No charities
		if(msg[0] == null){
			$('#result').append('<li><a>'+'There is no such charity</a></li>' + '\n');
		
		// Print charities that contained seach value
		}else{
			for(var i in msg){
				$('#result').append('<li id="'+ msg[i].name +'"><a>' +
							'Name: ' + msg[i].name + '<br>Sector:' + msg[i].sector +
							'</li>' + '\n');
			}
		}
		socket.on('disconnect', function(){})
	});
}

// Receives user info
function userRev(){
	var socket = io();
	socket.on('Reply UserInfo', function(msg){
		document.getElementById('name').innerHTML = msg[0].name;
		document.getElementById('email').innerHTML = msg[0].email;
		document.getElementById('username').innerHTML = msg[0].username;
		document.getElementById('password').innerHTML = msg[0].password;
		socket.on('disconnect', function(){})
	});
}