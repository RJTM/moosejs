'use strict';

var mooseJs = angular.module('mooseJs');

mooseJs.config(function($stateProvider, $urlRouterProvider, AccessLevels){
	$urlRouterProvider.otherwise('/roleRouter');
	$stateProvider
    
        .state('roleRouter', {
            url: '/roleRouter',
            controller: 'RoleController',
            data: {
                access: AccessLevels.anon
            }
        })
        .state('public',{
            url: '/public',
            templateUrl: 'templates/public/layout.html',
            abstract: true,
            data: {
                access: AccessLevels.anon
            }
        })
        
        .state('public.home', {
            url: "/home",
            templateUrl: 'templates/public/home.html',
        })
    
        .state('public.login', {
            url: "/login",
            templateUrl: 'templates/common/login.html',
            controller: 'LoginController'
        })

        .state('admin', {
            url : '/admin',
            templateUrl : 'templates/admin/layout.html',
            abstract : true,
            data : {
                access : AccessLevels.admin
            }
        })

        .state('admin.home', {
            url : '/home',
        	templateUrl : 'templates/admin/home.html',
            data: {
                ncyBreadcrumbLabel: 'Home'
            }
        })
    
        .state('admin.contests', {
            url: '/contests',
            templateUrl: 'templates/admin/contests.html',
            data: {
                ncyBreadcrumbLabel: 'Contests',
                ncyBreadcrumbParent: 'admin.home'
            }
        })  

        .state('admin.register', {
        	url : "/admin/register",
        	templateUrl : 'templates/common/register.html',
        	controller : 'RegisterController',
        	data : {
        		access : AccessLevels.admin
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
});