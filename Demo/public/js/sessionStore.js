// animations for loading page
function loading(){
	setTimeout(function(){
		document.location.href = "login.html";
	},5000);
}
function getSelectedCat(){
	document.getElementById('currentCategory').innerHTML = sessionStorage.getItem('category');	
}
// Used for searching for charity
function storeName(){
	var val = document.getElementById("searchBar").value;
	sessionStorage.setItem("charityName", val);
}

// Store category chosen
function storeCat(val){
	sessionStorage.setItem("category", val);
}

// Stores new revenue input by user in edit option
function storeRev(){
	var val = document.getElementById("revBar").value
	sessionStorage.setItem("revenue", val);
	location.reload();
}

function storeCharVote(charity){
	sessionStorage.setItem("vote", charity);
}