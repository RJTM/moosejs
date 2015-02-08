'use strict';
angular.module('mooseJs.jury')
	.controller('jury.TaskController', function($scope, Task, $stateParams){
		$scope.task = Task.get({id :$stateParams.id});

		$scope.save = function(){
			Task.update($scope.task, function(data){
				swal('Saved', 'Changes to this task saved.','success');
			});
		}
	});