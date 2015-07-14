app.directive('displayCharity', function() {
	
	return{
		
		restrict: 'E',
		scope: {
			
			charity: '='
			
		},
		templateUrl: 'views/displayCharity.html'
		
	};
	
});