// Processes the request for charity categories
function sendSocketCat(){
			var socket = io();
			socket.emit('Get Categories', "hello");
}

// Sends Request for charities under category
function sendSocketChar(){
	// Send to socket for server
	var socket = io();
	if(sessionStorage.getItem('revenue').length > 0){
		var val = sessionStorage.getItem('category') + ":" + sessionStorage.getItem('revenue');
		socket.emit('Get List', val);
	}else{
		var val = sessionStorage.getItem('category');
		socket.emit('Get List', val);
	}
}

// Send search request
function sendSeach(){
	// Send to socket for server
	var socket = io();
	var val = sessionStorage.getItem('charityName');
	socket.emit('Get Search', val);
}