signin.controller('signinController', ['$scope', '$location', '$route', '$window',
 'Authentication', '$http',
	function($scope, $location, $route, $window, Authentication, $http){
		$scope.authentication=Authentication;

		$scope.signin=function(){
			var user={
				username: this.loginusername,
				password: this.loginpassword
			};

			console.log(user);

			// user.$save(function(response){
			// 	$location.path('/home');
			// 	$windows.location.reload();
			// }, function(errorResponse){
			// 	$scope.error=errorResponse.data.message;
			// });
			$http.post('api/', user).then(function(response){
				$window.location.reload();
				$location.path('/');
			}, function(errMessage){
				$scope.error=errMessage.data;
			});
		};
	}]);