angular.module('mooseJs.admin')
	.controller('UsersController', function($scope, User){
		$scope.users = User.query();
	})