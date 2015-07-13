app.directive('displayCharity', function() {
	
	return{
		
		restrict: 'E',
		scope: {
			
			charity: '='
			
		},
		templateUrl: 'js/directives/displayCharity.html'
		
	};
	
});