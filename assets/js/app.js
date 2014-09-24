'use strict';

// Declare app level module which depends on filters, and services
angular.module('mooseJs', [
  'ui.router', 'ngResource','ui.bootstrap','ncy-angular-breadcrumb'
]).run(function($rootScope, $state, Auth){
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		if(!Auth.authorize(toState.data.access)){
			event.preventDefault();
			$state.go('public.login');
		}
	});
});