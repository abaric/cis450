var app = angular.module('controller',[]);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// controller to get education query information 

app.controller('educationController', function($scope, $http) {
	$scope.Submit = function() {
		var request = $http.get('/' + $scope.education);
		request.success(function(data) {
			$scope.data = data;
		});
		request.error(function(data) {
			console.log('err');
		});
	};
});