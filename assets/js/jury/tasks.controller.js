'use strict';
angular.module('mooseJs.jury')
	.controller('jury.TasksController', ["$scope", "Task", "socket", "$sce", function($scope, Task, socket, $sce){
		$scope.tasks = Task.query();

		$scope.contests = [];
		$scope.contest = {};

		socket.get('/contest', {}, function(data){
			$scope.contests.push.apply($scope.contests, data);
		});

		$scope.trustAsHtml = function(value) {
			return $sce.trustAsHtml(value);
		};
	}]);