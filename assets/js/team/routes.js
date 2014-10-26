'use strict';

angular.module('mooseJs.team')
	.config(["$stateProvider", "$urlRouterProvider", "AccessLevels", function($stateProvider, $urlRouterProvider, AccessLevels){
		$urlRouterProvider.otherwise('/team/home');

		$stateProvider
			.state('team',{
				url: '/team',
				templateUrl: 'templates/team/layout.html',
				abstract: true,
				controller: 'team.PillsController',
				data: {
					access: AccessLevels.team
				}
			})
			.state('team.home', {
				url: '/home',
				templateUrl: 'templates/team/home.html',
				controller: 'jury.ScoreboardController',
				data: {
					ncyBreadcrumbLabel: 'Home'
				}
			})
			.state('team.clarifications', {
				url: '/clarifications',
				templateUrl: 'templates/team/clarifications.html',
				controller: 'team.ClarificationsController',
				data: {
					ncyBreadcrumbLabel: 'Clarifications',
					ncyBreadcrumbParent: 'team.home',
					clearBadge: 'clarifications'
				}
			})
	}]);