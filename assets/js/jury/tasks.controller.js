'use strict';
angular.module('mooseJs.jury')
	.controller('jury.TasksController', ["$scope", "Task", function($scope, Task){
		$scope.tasks = Task.query();
	}]);