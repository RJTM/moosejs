'use strict';

// Declare app level module which depends on filters, and services
var mooseJs = angular.module('mooseJs', [
  'ui.router'
]);

mooseJs.run(function($rootScope, $state){
	$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
		// if(!Auth.authorize(toState.data.access)){
		// 	event.preventDefault();
		// 	$state.go('home.login');
		// }
	});
});