angular.module('mooseJs.jury')
	.controller('jury.ContestsController', function($scope, Contest){
		$scope.contests = Contest.query();
		$scope.date = new Date();
	});