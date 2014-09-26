'use strict';

angular.module('mooseJs.common')
.controller('LoginController', function($scope, $state, Auth, $window){
	$scope.errors = [];

	$scope.login = function(){
		$scope.errors = [];
		Auth.login($scope.user).success(function(result){
			$state.go('roleRouter');
		}).error(function(err) {
			$scope.errors.push(err);
		});
	}
});