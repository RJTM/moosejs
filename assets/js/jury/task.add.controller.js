'use strict';
angular.module('mooseJs.jury')
	.controller('jury.TaskAddController', ["$scope", "$state", "Task", "Contest", function($scope, $state, Task, Contest){
		$scope.save = function(){
			Task.save($scope.task, function(data){
				$state.go('jury.tasks');
			})
		}

		$scope.contests = Contest.query();
	}]);