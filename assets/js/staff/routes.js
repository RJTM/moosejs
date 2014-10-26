'use strict';

angular.module('mooseJs.staff')
	.config(["$stateProvider", "$urlRouterProvider", "AccessLevels", function($stateProvider, $urlRouterProvider, AccessLevels){
		$urlRouterProvider.otherwise('/staff/home');

		$stateProvider
			.state('staff', {
				url : '/staff',
				templateUrl : 'templates/staff/layout.html',
				abstract : true,
				controller : 'staff.PillsController',
				data : {
					access : AccessLevels.staff
				}
			})

			.state('staff.home', {
				url : '/home',
				templateUrl : 'templates/staff/home.html',
				controller : 'jury.ScoreboardController',
				data : {
					ncyBreadcrumbLabel : 'Home'
				}
			})

			.state('staff.balloons', {
				url : '/balloons',
				templateUrl : 'templates/staff/balloons.html',
				controller : 'staff.BalloonController',
				data : {
					ncyBreadcrumbLabel : 'Balloons',
					ncyBreadcrumbParent : 'staff.home',
					clearBadge : 'balloons'
				}
			})

			.state('staff.prints', {
				url : '/prints',
				templateUrl : 'templates/staff/prints.html',
				controller : 'staff.PrintController',
				data : {
					ncyBreadcrumbLabel : 'Prints',
					ncyBreadcrumbParent : 'staff.home',
					clearBadge : 'prints'
				}
			})
	}]);