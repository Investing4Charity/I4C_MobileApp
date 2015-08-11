app.controller('MainController', ['$scope', 'connections', function($scope, connections) {

	connections.success(function(data) {
		$scope.charity = data;
	});
	
}]);