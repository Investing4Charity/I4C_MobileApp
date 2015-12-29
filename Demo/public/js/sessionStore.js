// animations for loading page
function loading(){
	checkConnection();
	setTimeout(function(){
		document.location.href = "login.html";
	},2000);
}
function getSelectedCat(){
	if( sessionStorage.getItem('category') == "null"){
		document.getElementById('menuText').innerHTML = "Search Results";
	}else{
		document.getElementById('currentCategory').innerHTML = sessionStorage.getItem('category');	
	}
}

function clearCharChoice() {
	sessionStorage.setItem('vote', null);
}

// Used for searching for charity
function storeName(){
	var val = document.getElementById("searchBar").value;
	sessionStorage.setItem("charityName", val);
	sessionStorage.setItem("category", null);
}

// Store category chosen
function storeCat(val, index){
	sessionStorage.setItem("category", val);
	showCatSelection(index);
}

// Shows which category is selected
function showCatSelection(index){
	$("#cat").children().children().children().css("display", "none");
	$("#cat"+index).children().children().css("display", "inline");
}

// Stores new revenue input by user in edit option
function storeRev(){
	var val = document.getElementById("revBar").value;
	sessionStorage.setItem("revenue", val);
	var isnum = /^\d+$/.test(sessionStorage.getItem("revenue"));
		if(isnum || val.length == 0){
			window.location.href ="list.html";
			console.log(val);
		}else{
			alert("Please Enter number");
		}
}

function isNumeric (num) {
	return !isNaN(parseFloat(num)) && isFinite(num);
}

function storeCharVote(charity){
	sessionStorage.setItem("vote", charity);
}

//Check connection
function checkConnection(){
	// var xhr = new XMLHttpRequest();
    // var file = "https://www.google.com";
    // var randomNum = Math.round(Math.random() * 10000);
     
    // xhr.open('HEAD', file);
	// try {
        // xhr.send();
		// if(xhr.status < 200 && xhr.status >= 304){
			// alert("Please connect to the internet");
			// location.reload();
		// }
	// }catch (e) {
		// // alert("Please connect to the internet");
		// // location.reload();
	// }
}