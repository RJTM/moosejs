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
			.state('team.clarifications.add',{
				url: '/add',
				templateUrl: 'templates/team/clarifications-add.html',
				controller: 'team.ClarificationsAddController',
				data: {
					ncyBreadcrumbLabel: 'Requesting clarification',
					ncyBreadcrumbParent: 'team.clarifications'
				}
			})
			.state('team.newRun', {
				url: '/newRun',
				templateUrl: 'templates/team/submit.html',
				controller: 'team.RunAddController',
				data: {
					ncyBreadcrumbLabel: 'Submitting a new solution',
					ncyBreadcrumbParent: 'team.home'
				}
			})
			.state('team.runs', {
				url: '/runs',
				templateUrl: 'templates/team/runs.html',
				controller: 'team.RunsController',
				data: {
					ncyBreadcrumbLabel: 'Runs',
					ncyBreadcrumbParent: 'team.home'
				}
			})
	}]);