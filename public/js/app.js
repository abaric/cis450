var app = angular.module("philly-guide",[]);


// controller to get education query information 

app.controller('educationController', function($scope, $http) {
	$scope.message="";
	$scope.Submit = function() {
		var request = $http.get('/education?education_num=' + $scope.education_num + '&education=' + $scope.education);
		console.log("request is " + request);
		request.success(function(data) {
			$scope.data = data;
		});
		request.error(function(data) {
			console.log('err');
		});
	};
});

app.controller('crimeController', function($scope, $http) {
	$scope.Submit = function() {
		var request = $http.get('/' + $scope.crime);
		request.success(function(data) {
			$scope.data = data;
		});
		request.error(function(data) {
			console.log('err');
		});
	};
});

app.controller('walkController', function($scope, $http) {
	$scope.Submit = function() {
		var request = $http.get('/' + $scope.walkscore);
		request.success(function(data) {
			$scope.data = data;
		});
		request.error(function(data) {
			console.log('err');
		});
	};
});