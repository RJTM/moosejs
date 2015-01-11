'use strict';

angular.module('mooseJs.jury')
	.controller('jury.WizardController', ["$scope", "$stateParams", "$state", "Contest", function($scope, $stateParams, $state, Contest){
		$scope.contest = Contest.get({id: $stateParams.id});

		$scope.next = function(level, taskIndex, subtaskIndex){
			if(level === 'contest'){
				$state.go('jury.wizard.task', {taskIndex: 0});
			}else if(level === 'task'){
				$state.go('jury.wizard.task.subtask', {subtaskIndex: 0});
			}else if(level === 'subtask') {
				if(subtaskIndex >= $scope.contest.tasks[taskIndex].subtasks.length -1){
					if(taskIndex >= $scope.contest.tasks.length -1){
						$state.go('jury.wizard.finished');
					}else{
						$state.go('jury.wizard.task', {taskIndex: taskIndex + 1});
					}
				}else{
					$state.go('jury.wizard.task.subtask', { subtaskIndex: subtaskIndex+1});
				}
			};
		}
	}]);