angular.module('mooseJs.admin')
	.controller('admin.UsersController', function($scope, User){
		$scope.users = User.query();
	})