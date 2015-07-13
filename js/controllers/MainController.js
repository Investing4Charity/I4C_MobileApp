app.controller('ConnectionController', function($scope, $http) {
       $http.get("establishConnection.js")
       .success(function(response) {$scope.names = response.records;});
});