'use strict';

angular.module('mooseJs')
.controller('RegisterController', function($scope, $state, Auth){
	
	$scope.user = {
		username : '',
		name : '',
		email : '',
		role : 'team',
		password : '',
		confirmPassword : ''
	};
	
	$scope.register = function(){
		Auth.register($scope.user).then(function(){
			$state.go('home');
		});
	}
	
});