'use strict';

angular.module('mooseJs.common')
.controller('LoginController', ["$scope", "$state", "Auth", "$rootScope", function($scope, $state, Auth, $rootScope){
	$scope.errors = [];

	$scope.login = function(){
		$scope.errors = [];
		Auth.login($scope.user).success(function(result){
			$rootScope.$broadcast('loggedIn');
			$state.go('roleRouter');
		}).error(function(err) {
			$scope.errors.push(err);
		});
	}
}]);