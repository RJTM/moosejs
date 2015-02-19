'use strict';

angular.module('mooseJs.jury')
	.controller('jury.AddSubtaskController', ["$scope", "$stateParams", "socket", "$state", function($scope, $stateParams, socket, $state){

		$scope.subtask = {
			task: $stateParams.id
		};
		
		$scope.save = function(){
			socket.post('/subtask', $scope.subtask, function(data){
				swal('Saved', 'New subtask saved.','success');
				$scope.task.subtasks.push(data);
				$state.go('jury.task');
			});
		}

	}]);