'use strict';

angular.module('mooseJs')
.controller('LoginController', function($scope, $state, Auth, $window){
	$scope.errors = [];

	$scope.login = function(){
		$window.alert('enter');
		$scope.errors = [];
		Auth.login($scope.user).success(function(result){
			$state.go('about.logged');
		}).error(function(err) {
			$scope.errors.push(err);
		});
	}
});