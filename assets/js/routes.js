'use strict';

var mooseJs = angular.module('mooseJs');

mooseJs.config(["$stateProvider", "$urlRouterProvider", "AccessLevels", function($stateProvider, $urlRouterProvider, AccessLevels){
	$urlRouterProvider.otherwise('/roleRouter');
	$stateProvider
    
        .state('roleRouter', {
            url: '/roleRouter',
            controller: 'RoleController',
            data: {
                access: AccessLevels.anon
            }
        })
      

        
		/*.state('home', {
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
			url : '/register',
			templateUrl: 'templates/register.html',
			controller: 'RegisterController',
			data : {
				access : AccessLevels.anon
			}
		})
    
        .state('home.updateUser', {
            url: '/update/:id',
            templateUrl: 'templates/register.html',
            controller: 'UpdateController',
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
		});*/
}]);