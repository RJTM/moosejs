angular.module('mooseJs.jury')
	.controller('jury.ContestsController', ["$scope", "Contest", function($scope, Contest){
		$scope.contests = Contest.query();
		$scope.date = new Date();
	}]);