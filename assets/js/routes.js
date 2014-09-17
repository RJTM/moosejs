'use strict';

var mooseJs = angular.module('mooseJs');

mooseJs.config(function($stateProvider, $urlRouterProvider, AccessLevels){
	$urlRouterProvider.otherwise('/home');
	$stateProvider
		.state('home', {
			url : '/home',
			templateUrl : 'templates/partial1.html',
			data : {
				access : AccessLevels.anon
			}
		})
		
		.state('home.login', {
			templateUrl: 'templates/login.html',
			controller: 'LoginController',
			data : {
				access : AccessLevels.anon
			}
		})

		.state('home.addUser', {
			templateUrl: 'templates/addUser.html',
			controller: 'registerController',
			data : {
				access : AccessLevels.anon
			}
		})

		.state('about', {
			url: '/about',
			templateUrl: 'templates/about.html',
			data : {
				access : AccessLevels.user
			}
		})

		.state('about.logged', {
			template : 'You are logged in.',
			data : {
				access : AccessLevels.user
			}
		});
});