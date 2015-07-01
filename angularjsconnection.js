var app = angular.module('myApp', []);
       app.controller('customersCtrl', 
	   function($scope, $http) {
       $http.get("config/establishConnection.js")
       .success(function(response) {$scope.names = response.records;});
});