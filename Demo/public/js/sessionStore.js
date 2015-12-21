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
	var val = document.getElementById("revBar").value
	sessionStorage.setItem("revenue", val);
	location.reload();
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