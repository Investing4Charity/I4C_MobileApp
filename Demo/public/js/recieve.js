// Receives List Of charities
function receiveChar(){
	var socket = io();
	socket.on('Reply List', function(msg){
		// No charities in selected category
		if(msg[0] == null){
			$('#result').append('<li id="content"><p>Oh no! No charities in this category</p></li>' + '\n');
		
		// Print charities in selected category
		}else{
			for(var i in msg){
				var src = msg[i].logo;
				if(src == null){
					src = "img/Nologo.gif"
				}
				$('#result').append('<li class="unselected" id="'+ "'" + msg[i].Name_of_charity +"'"  + '" onclick="charitySelect('+ "'" + msg[i].Name_of_charity +"'"  + ');"><p>' +
							'Name: ' + msg[i].Name_of_charity + '<br>Sector:' + msg[i].Sector +
							'<img src="' + src + '" alt="Image Not Found" height="50px" width="auto">' +
							'</p><div id="' + msg[i].Name_of_charity + 'Content" style="display:none">' +
							'<div class="summary"><h3>Summary</h3> This is a summary of ' + msg[i].Name_of_charity + '</div>'+
							'<div class="Revenue"><b>Revenue: </b>' + msg[i].total_revenues +'</div>' + 
							'<div class="Kpi"><b>KPI: </b>' + msg[i].KPI_E_CAPEXTotal_Revenue + '</div>' +
							'<div class="Grants"><b>Grants: </b>' + msg[i].Gov_Grants +'</div>' + 
							'<div class="Growth"><b>Growth: </b>' + msg[i].net_income_growth + '</div></div></li>' + '\n')
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
				$(appender).append('<li><a id="content" onclick="storeCat('+ "'" + msg[i].Sector +"'"  + ');" href="revenue.html">' 
				+ msg[i].Sector + '</a></li>' + '\n');
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
				$(appender).append('<li><a id="content" onclick="storeCat('+ "'" + msg[i].Sector +"'"  + ');">' 
				+ msg[i].Sector + '</a></li>' + '\n');
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
				$('#result').append('<li id="'+ msg[i].Name_of_charity +'"><a>' +
							'Name: ' + msg[i].Name_of_charity + '<br>Sector:' + msg[i].Sector +
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
		console.log(msg);
		document.getElementById('name').innerHTML = msg[0].name;
		document.getElementById('email').innerHTML = msg[0].email;
		document.getElementById('username').innerHTML = msg[0].username;
		document.getElementById('password').innerHTML = msg[0].password;
		socket.on('disconnect', function(){})
	});
}

// Receives user voted charities
function receiveVoteChar(){
	var socket = io();
	socket.on('Reply Voted List', function(msg){
		// No charities in selected category
		if(msg[0] == null){
			$('#result').append('<li id="content"><p>No voted charities yet. Go vote for some</p></li>' + '\n');
		// Print charities in selected category
		}else{
			for(var i in msg){
				var src = msg[i].logo;
				if(src == null){
					src = "img/Nologo.gif"
				}
				$('#result').append('<li class="unselected" id="'+ "'" + msg[i].Name_of_charity +"'"  + '" onclick="charitySelect('+ "'" + msg[i].Name_of_charity +"'"  + ');"><p>' +
							'Name: ' + msg[i].Name_of_charity + '<br>Sector:' + msg[i].Sector +
							'<img src="' + src + '" alt="Image Not Found" height="50px" width="auto">' +
							'</p><div id="' + msg[i].Name_of_charity + 'Content" style="display:none">' +
							'<div class="summary"><h3>Summary</h3> This is a summary of ' + msg[i].Name_of_charity + '</div>'+
							'<div class="Revenue"><b>Revenue: </b>' + msg[i].total_revenues +'</div>' + 
							'<div class="Kpi"><b>KPI: </b>' + msg[i].KPI_E_CAPEXTotal_Revenue + '</div>' +
							'<div class="Grants"><b>Grants: </b>' + msg[i].Gov_Grants +'</div>' + 
							'<div class="Growth"><b>Growth: </b>' + msg[i].net_income_growth + '</div></div></li>' + '\n')
			}
		}
		socket.on('disconnect', function(){})
	});
}