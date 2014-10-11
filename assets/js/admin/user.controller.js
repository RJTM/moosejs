angular.module('mooseJs.admin')
	.controller('admin.UsersController', ["$scope", "User", function($scope, User){
		$scope.users = User.query();
	}])