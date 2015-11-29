// Selects Charities
function charitySelect(charity){
	charityName = "'" + charity + "'";
	
	// Gets all elements in selected class and changes them to unselected class
	var array = document.getElementsByClassName("selected");
	for(var i = 0; i < array.length; i++){
	
		// Since id is returned surrounded by quotes we must remove the quotes
		var temp = array[i].id;
		var hide = temp.substring(1,temp.length - 1) + "Content"
		
		// Hides the information
		document.getElementById(hide).style.display = 'none';
		array[i].className = "unselected";
	}
	
	// Selects user selected charity and shows information
	document.getElementById(charityName).className = "selected";
	var content = charity + "Content";
	document.getElementById(content).style.display = 'block';
	if(document.getElementById('voteButtonhide') != null){
		document.getElementById('voteButtonhide').id = "voteButtondisplay";
	}
	storeCharVote(charity);
}

function vote(){
	console.log(sessionStorage.getItem('vote'));
	if(sessionStorage.getItem('vote') == null){
		alert('Please select another charity to vote for');
	}else if(confirm('Are you sure you want to vote for ' + sessionStorage.getItem('vote') + '?')){
		var socket = io();
		socket.emit('Vote', sessionStorage.getItem('vote'));
		alert("Thank You For Voting")
	}else{
		alert('Please select another charity to vote for');
	}
}