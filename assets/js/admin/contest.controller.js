angular.module('mooseJs.admin')
	.controller('admin.ContestsController', ["$scope", "Contest", function($scope, Contest){
		$scope.contests = Contest.query();
		$scope.date = new Date();
	}]);