'use strict';

angular.module('mooseJs.jury')
	.config(["$stateProvider", "$urlRouterProvider", "AccessLevels", function($stateProvider, $urlRouterProvider, AccessLevels){

		$urlRouterProvider.otherwise('/jury/home');

		$stateProvider

			.state('jury',{
				url: '/jury',
				templateUrl: 'templates/jury/layout.html',
				abstract: true,
				controller: 'jury.PillsController',
				data: {
					access: AccessLevels.jury
				}
			})

			.state('jury.home', {
				url: '/home',
				templateUrl: 'templates/jury/home.html',
				controller: 'jury.ScoreboardController',
				data: {
					ncyBreadcrumbLabel: 'Home'
				}	
			})

			.state('jury.team', {
				url: '/team',
				templateUrl: 'templates/jury/team.html',
				data: {
					ncyBreadcrumbLabel: 'As a team',
					ncyBreadcrumbParent: 'jury.home'
				}
			})

			.state('jury.clarifications', {
				url: '/clarifications',
				templateUrl: 'templates/jury/clarifications.html',
				data: {
					ncyBreadcrumbLabel: 'Clarifications',
					ncyBreadcrumbParent: 'jury.home',
					clearBadge: 'clarifications'
				}
			})

			.state('jury.tasks', {
				url: '/tasks',
				templateUrl: 'templates/jury/tasks.html',
				controller: 'jury.TaskController',
				data: {
					ncyBreadcrumbLabel: 'Tasks',
					ncyBreadcrumbParent: 'jury.home'
				}
			})


			.state('jury.tasks.add', {
				url: '/add',
				views: {
					"@jury": {
						templateUrl: 'templates/jury/tasks-add.html',
						controller: 'jury.TaskAddController'
					}
				},
				data: {
					ncyBreadcrumbLabel: 'Create a new task',
					ncyBreadcrumbParent: 'jury.tasks'
				}
			})

			.state('jury.runs', {
				url: '/runs',
				templateUrl: 'templates/jury/runs.html',
				controller: 'jury.RunController',
				data: {
					ncyBreadcrumbLabel: 'Runs',
					ncyBreadcrumbParent: 'jury.home',
					clearBadge: 'runs'
				}
			})

			.state('jury.runs.verify', {
				url: '/verify/:id',
				views: {
					"@jury": {
						templateUrl: 'templates/jury/verify.html',
						controller: 'jury.VerifyController',
					}
				},
				data: {
					ncyBreadcrumbLabel: 'Verifyng solution for run {{ run.id }}',
					ncyBreadcrumbParent: 'jury.runs'
				}
			})

			.state('jury.contests', {
				url: '/contests',
				templateUrl: 'templates/jury/contests.html',
				controller: 'jury.ContestsController',
				data: {
					ncyBreadcrumbLabel: 'Contests',
					ncyBreadcrumbParent: 'jury.home'
				}
			});
	}]);