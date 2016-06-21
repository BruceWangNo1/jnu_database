var mainApplicationModuleName='jnu';

var mainApplicationModule=angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'home', 'signin', 
	'userclient', 'information', 'signup']);

mainApplicationModule.config(['$locationProvider', function($locationProvider){
	console.log('I do not wanna set hash prefix!');
}]);

angular.element(document).ready(function(){
	angular.bootstrap(document, [mainApplicationModuleName]);
});