'use strict';

angular.module('mooseJs.staff')
	.controller('staff.PillsController', ["$scope", "socket", function($scope, socket){
		$scope.prints = 0;
		$scope.balloons = 0;
	}]);