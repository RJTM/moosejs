angular.module('mooseJs.admin')
	.controller('ContestsController', function($scope, Contest){
		$scope.contests = Contest.query();
		$scope.date = new Date();
	});