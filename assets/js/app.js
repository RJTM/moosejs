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
			url: '/about',
			views : {
				'': { templateUrl : 'templates/partial2.html'},
				'columnOne@about' : { template : 'Look I am a column!'},
				'columnTwo@about' : {
					templateUrl : 'templates/table-data.html',
					controller : 'scotchController'
				}
			}
		});
});

mooseJs.controller('scotchController', function($scope){
	$scope.message = 'test';
	$scope.scotches = [
		{
			name: 'Macalan 12',
			price: 50
		},
		{
			name: 'Chivas Regal Royal Salute',
			price: 10000
		},
		{
			name: 'Glenfiddich 1937',
			price: 20000
		}
	];
});