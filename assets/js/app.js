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
			templateUrl: 'templates/login.html',
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
				'columnOne@about' : { templateUrl : 'templates/login.html'},
				'columnTwo@about' : {
					templateUrl : 'templates/scoreboard.html',
					controller : 'scotchController'
				}
			}
		});
});

mooseJs.controller('scotchController', function($scope){
	$scope.message = 'test';
	$scope.problems = [
		{
			name : 'Problem A'
		},
		{
			name : 'Problem B'
		},
		{
			name : 'Problem C'
		},
		{
			name : 'Problem D'
		},
	];
	$scope.results = [
		{
			team: 'Macalan 12',
			scores : ['250(2)', '100', '20', '-']
		},
		{
			team: 'Chivas Regal Royal Salute',
			scores : ['250(2)', '100', '20', '-']
		},
		{
			team: 'Glenfiddich 1937',
			scores : ['250(2)', '100', '20', '-']
		}
	];
});