signup.controller('signupController', ['$scope', '$location', '$window', '$http',
	function($scope, $locaiton, $window, $http){
		$scope.signup=function(){
			var user={
				email: this.email,
				username: this.username,
				password: this.password,
				code: this.registrationCode
			};

			$http.post('api/signup/', user).then(function(response){
				$window.location.reload();
				$location.path('/');
			}, function(errMessage){
				$scope.error=errMessage.data;
			});
		};
	}]);