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
				data : {
					ncyBreadcrumbLabel : 'Balloons',
					ncyBreadcrumbParent : 'staff.home'
				}
			})

			.state('staff.prints', {
				url : '/prints',
				data : {
					ncyBreadcrumbLabel : 'Prints',
					ncyBreadcrumbParent : 'staff.home'
				}
			})
	}]);