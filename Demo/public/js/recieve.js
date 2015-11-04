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
				$(appender).append('<li id="content"><p>' +
							'Name: ' + msg[i].name + '<br>Sector:' + msg[i].sector +
							'</p></li>' + '\n');
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