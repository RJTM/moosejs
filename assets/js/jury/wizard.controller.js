'use strict';

angular.module('mooseJs.jury')
	.controller('jury.WizardController', ["$scope", "$stateParams", "$state", "socket", function($scope, $stateParams, $state, socket){
		socket.get('/contest/'+$stateParams.id, function(data){
			var start = new Date(),
				end = new Date(),
				freeze = new Date(),
				unfreeze = new Date();
			
			data.startTime = new Date();
			data.startTime.setTime(start.getTime());
			data.endTime = new Date();
			data.endTime.setTime(end.getTime());
			data.freezeTime = new Date();
			data.freezeTime.setTime(freeze.getTime());
			data.unfreezeTime = new Date();
			data.unfreezeTime.setTime(unfreeze.getTime());

			$scope.contest = data;
		});

		$scope.contest = {
			startTime : new Date(),
			endTime : new Date(),
			freezeTime : new Date(),
			unfreezeTime : new Date()
		}

		$scope.$watch('contest.startTime', function(){
			if($scope.contest){
				var start = $scope.contest.startTime.getTime(),
					freeze = $scope.contest.freezeTime.getTime(),
					unfreeze = $scope.contest.unfreezeTime.getTime(),
					end = $scope.contest.endTime.getTime();

				if(!$scope.contest.freezeTime || freeze < start)
					$scope.contest.freezeTime = $scope.contest.startTime;

				if(!$scope.contest.endTime || end < start)
					$scope.contest.endTime = $scope.contest.startTime;

				if(!$scope.contest.unfreezeTime || unfreeze < start)
					$scope.contest.unfreezeTime = $scope.contest.startTime;
			}
		});	

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