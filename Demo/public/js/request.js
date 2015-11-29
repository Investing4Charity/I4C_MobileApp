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

// Request user information
function userInfo(){
	// Send to socket for server
	var socket = io();
	var val = sessionStorage.getItem('user');
	socket.emit('User Info', val);
}

function passwordChange(){
	var password = prompt("Please enter your new password", "Password.....");
    if (password != null) {
		var socket = io();
		var val = password + ":" + sessionStorage.getItem('user');;
		socket.emit('Change Password', val);
		alert("Password has been changed");
		location.reload();
    }else{
		alert("Password can't to empty");
	}
}

function emailChange(){
	var email = prompt("Please enter your new email", "Email.....");
    if (email != null) {
		var socket = io();
		var val = email + ":" + sessionStorage.getItem('user');;
		socket.emit('Change Email', val);
		alert("Email has been changed");
		location.reload();
    }else{
		alert("Email can't to empty");
	}
}