'use strict';

// Declare app level module which depends on filters, and services
var mooseJs = angular.module('mooseJs', [
  'ui.router',
  'mooseJs.filters',
  'mooseJs.services',
  'mooseJs.directives',
  'mooseJs.controllers'
]);

mooseJs.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('home', {
			url : '/home',
			templateUrl : 'partial1.html'
		})
		.state('about', {

		});
});
// config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view1', {templateUrl: 'templates/partial1.html', controller: 'MyCtrl1'});
//   $routeProvider.when('/view2', {templateUrl: 'templates/partial2.html', controller: 'MyCtrl2'});
//   $routeProvider.otherwise({redirectTo: '/view1'});
// }]);