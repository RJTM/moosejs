'use strict';

angular.module('mooseJs.admin')

.config(["$stateProvider", "$urlRouterProvider", "AccessLevels", function($stateProvider, $urlRouterProvider, AccessLevels){

	$urlRouterProvider.otherwise('/admin/home');

	$stateProvider
	
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
		controller: 'admin.ContestsController',
		data: {
			ncyBreadcrumbLabel: 'Contests',
			ncyBreadcrumbParent: 'admin.home'
		}
	})  

	.state('admin.users',{
		url: '/users',
		templateUrl: 'templates/admin/users.html',
		controller: 'admin.UsersController',
		data: {
			ncyBreadcrumbLabel: 'Users',
			ncyBreadcrumbParent: 'admin.home'
		}
	})

	.state('admin.users.register', {
		url : "/register",
		views: {
			'@admin': {
				templateUrl : 'templates/common/register.html',
				controller : 'common.RegisterController'
			}
		},
		data : {
			ncyBreadcrumbLabel: 'New User',
			ncyBreadcrumbParent: 'admin.users'	
		}
	})

	.state('admin.sites',{
		url: "/sites",
		templateUrl: 'templates/admin/sites.html',
		controller: 'admin.SitesController',
		data: {
			ncyBreadcrumbLabel: 'Sites',
			ncyBreadcrumbParent: 'admin.home'
		}
	})

	.state('admin.contestUsers', {
		url: '/contest/:id/users',
		templateUrl: 'templates/admin/contest-users.html',
		controller: 'admin.ContestUsersController',
		data: {
			ncyBreadcrumbLabel: 'Registering users to contest',
			ncyBreadcrumbParent: 'admin.contests'
		}
	})

	.state('admin.languages', {
		url: '/languages',
		templateUrl: '/templates/admin/languages.html',
		controller: 'admin.LanguagesController',
		data: {
			ncyBreadcrumbLabel: 'Programming Languages',
			ncyBreadcrumbParent: 'admin.home'
		}
	})

	.state('admin.newLanguage', {
		url: '/languages/add',
		templateUrl: '/templates/admin/add-language.html',
		controller: 'admin.NewLanguageController',
		data: {
			ncyBreadcrumbLabel: 'Adding a language',
			ncyBreadcrumbParent: 'admin.languages',
		}
	})

	.state('admin.language', {
		url: '/languages/:id',
		templateUrl: 'templates/admin/language.html',
		controller: 'admin.LanguageController',
		data: {
			ncyBreadcrumbLabel: 'Modifying a language',
			ncyBreadcrumbParent: 'admin.languages'
		}
	})
}]);