// Sign Up user
function signUp(){
	var username = document.getElementById('usernameSign').value;
	var email = document.getElementById('email').value;
	var password = document.getElementById('passwordSign').value;
	var rePassword = document.getElementById('rePassword').value;
	var name = document.getElementById('name').value;
	if(username == null){
		alert("Enter a username");
	}else if(password == null){
		alert("Cannot have an empty password");
	}else if(rePassword != password){
		alert("passwords are not the same");
	}else if(name == null){
		alert("You can't have no name")
	}else{
		var msg = username + ":" + email + ":" + password + ":" + name;
		var socket = io();
		checkConnection();
		socket.emit('Sign Up', msg);
	}
}

function signUpReceive(){
	checkConnection();
	var socket = io();
	socket.on('Reply SignUp', function(msg){
		// User Name Taken
		if(msg == "Not Successful"){
			alert("username taken");
		}else{
			alert("Hi " + msg + ". Your Account has been successfully made");
			var username = document.getElementById('usernameSign').value;
			sessionStorage.setItem("user", username);
			document.location.href = "home.html";
		}
		socket.on('disconnect', function(){})
	});
}

function login(){
	var username = document.getElementById('usernameLogin').value;
	var password = document.getElementById('passwordLogin').value;
	if(username.length <= 0){
		alert("Enter a username");
	}else if(password.length <= 0){
		alert("Enter a password");
	}else{
		var msg = username + ":" + password;
		checkConnection();
		var socket = io();
		socket.emit('Login', msg);
	}
}

function acceptLogin(){
		var socket = io();
		socket.on('Reply Login', function(msg){
		// Incorrect Username or Password
		if(msg == "Not Successful"){
			alert("Incorrect Username or Password");
		}else{
			alert("Hi " + msg);
			sessionStorage.setItem("user", msg);
			document.location.href = "home.html";
		}
	});
}