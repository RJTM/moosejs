'use strict';
angular.module('mooseJs.jury')
	.controller('jury.TaskController', function($scope, Task){
		$scope.tasks = Task.query();
	});