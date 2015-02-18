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
				controller : 'staff.HomeController',
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
				controller : 'staff.PrintsController',
				data : {
					ncyBreadcrumbLabel : 'Prints',
					ncyBreadcrumbParent : 'staff.home',
					clearBadge : 'prints'
				}
			})

			.state('staff.print', {
				url: '/print/:id',
				templateUrl: 'templates/staff/print.html',
				controller: 'staff.PrintController',
				data: {
					ncyBreadcrumbLabel : 'Print',
					ncyBreadcrumbParent : 'staff.prints',
				}
			})
	}]);