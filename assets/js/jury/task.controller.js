'use strict';
angular.module('mooseJs.jury')
	.controller('jury.TaskController', function($scope, Task, $stateParams, $http, $state){
		$scope.task = Task.get({id :$stateParams.id});

		$scope.save = function(){
			Task.update($scope.task, function(data){
				swal('Saved', 'Changes to this task saved.','success');
			});
		}

		$scope.deleteSubtask = function(index){
			swal({
				title: "Are you sure?",
				text: "This process cannot be undone!",
				type: "warning",
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "Yes, delete it!",
				closeOnConfirm: false
			},function(){
				var subtask = $scope.task.subtasks[index];
				$http.delete('/subtask/'+subtask.id).success(function(data){
					swal('Deleted', 'Subtask deleted', 'success');
					$scope.task.subtasks.splice(index,1);
					$state.go('jury.task');
				});
			});
		}
	});