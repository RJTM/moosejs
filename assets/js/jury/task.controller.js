'use strict';
angular.module('mooseJs.jury')
	.controller('jury.TaskController', ["$scope", "Task", function($scope, Task){
		$scope.tasks = Task.query();
	}]);