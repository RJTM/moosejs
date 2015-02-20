'use strict';

angular.module('mooseJs.jury')
	.controller('jury.AddSubtaskController', ["$scope", "$stateParams", "socket", "$state", function($scope, $stateParams, socket, $state){

		$scope.subtask = {
			task: $stateParams.id
		};
		
		$scope.save = function(){
			socket.post('/subtask', $scope.subtask, function(data, jwsres){
				if(jwsres.statusCode === 200){
					swal('Saved', 'New subtask saved.','success');
					$scope.task.subtasks.push(data);
					$state.go('jury.task');
				}else
					swal('Error', 'Subtask save failed', 'error');
			});
		}

	}]);