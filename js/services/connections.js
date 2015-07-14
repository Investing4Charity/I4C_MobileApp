app.factory('connections', ['$http', function($http) {
	
	return $http.get('test.json')
			.success(function(data){
				return data;
			})
			.error(function(err){
				return err;
			});
	
}]);