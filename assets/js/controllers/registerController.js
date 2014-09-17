'use strict';

angular.module('mooseJs')
.controller('RegisterController', function($scope, $state, Auth, $window){
	$scope.register = function(){
		Auth.register($scope.user).then(function(){
			$state.go('home');
		});
	}
	
});