home.config(['$routeProvider', function($routeProvider){
	$routeProvider.
	when('/', {
		templateUrl:'home/views/home.client.view.html'
	}).
	when('/about', {
		templateUrl:'home/views/about.client.view.html'
	});
}]);