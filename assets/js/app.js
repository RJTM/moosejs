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
			templateUrl : 'templates/partial1.html'
		})
		
		.state('home.list', {
			url: '/list',
			templateUrl: 'templates/partial1-list.html',
			controller: function($scope){
				$scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
			}
		})

		.state('home.paragraph', {
			url : '/paragraph',
			template: 'I could sur use a drink right now.'
		})

		.state('about', {

		});
});
// config(['$routeProvider', function($routeProvider) {
//   $routeProvider.when('/view1', {templateUrl: 'templates/partial1.html', controller: 'MyCtrl1'});
//   $routeProvider.when('/view2', {templateUrl: 'templates/partial2.html', controller: 'MyCtrl2'});
//   $routeProvider.otherwise({redirectTo: '/view1'});
// }]);