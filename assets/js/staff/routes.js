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

			.state('staff.sos', {
				url: '/sos',
				templateUrl: 'templates/staff/sos.html',
				controller: 'staff.SosController',
				data: {
					ncyBreadcrumbLabel: 'Sos calls',
					ncyBreadcrumbParent: 'staff.home',
					clearBadge : 'sos'
				}
			})

			.state('staff.password',{
				url:'/password',
				templateUrl: 'templates/common/password.html',
				controller: 'common.PasswordController',
				data: {
					ncyBreadcrumbLabel: 'Changing password',
					ncyBreadcrumbParent: 'staff.home',
					access: AccessLevels.staff
				}
			});

	}]);