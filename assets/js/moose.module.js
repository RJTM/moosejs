'use strict';

// Declare app level module which depends on filters, and services
angular.module('mooseJs', [

	'mooseJs.admin',
	'mooseJs.common',
	'mooseJs.jury',
	'mooseJs.public',
	'mooseJs.staff',
	'mooseJs.team',


 	'ui.router', 'ngResource','ui.bootstrap','ncy-angular-breadcrumb','ui.select','angularFileUpload'
]).run(["$rootScope", "$state", "Auth", function($rootScope, $state, Auth){
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		if(!Auth.authorize(toState.data.access)){
			event.preventDefault();
			$state.go('public.login');
		}
	});
}]);