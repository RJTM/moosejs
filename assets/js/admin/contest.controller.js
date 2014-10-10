angular.module('mooseJs.admin')
	.controller('admin.ContestsController', function($scope, Contest){
		$scope.contests = Contest.query();
		$scope.date = new Date();
	});