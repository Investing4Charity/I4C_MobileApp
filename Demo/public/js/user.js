// Sign Up user
function signUp(){
	var username = document.getElementsByName('usernameSign').value;
	var email = document.getElementsByName('email').value;
	var password = document.getElementsByName('passwordSign').value;
	var rePassword = document.getElementsByName('rePassword').value;
	if(username == null){
		alert("Enter a username");
	}else if(pass == null){
		alert("Cannot have an empty password");
	}else if(rePassword != password){
		alert("passwords are not the same");
	}
	}else{
		var msg = username + ":" + email + ":" + password;
		var socket = io();
		socket.emit('Sign Up', msg);
	}
}

function signUpReceive(){

}