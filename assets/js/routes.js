'use strict';

var mooseJs = angular.module('mooseJs');

mooseJs.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('home', {
			url : '/home',
			templateUrl : 'templates/partial1.html'
		})
		
		.state('home.login', {
			templateUrl: 'templates/login.html',
			controller: 'LoginController'
		})

		.state('home.paragraph', {
			url : '/paragraph',
			template: 'I could sur use a drink right now.'
		})

		.state('about', {
			url: '/about',
			templateUrl: 'templates/about.html'
		});
});