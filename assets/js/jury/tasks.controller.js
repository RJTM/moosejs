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

		$scope.rejudge = function(index){
			swal({
				title: 'Rejudge all runs for this task',
				text: 'Are you sure?',
				type: 'warning',
				showCancelButton : true,
				confirmButtonText : 'Yes, rejudge',
				closeOnConfirm : false,
			}, function(){
				socket.post('/task/rejudge', {id: $scope.tasks[index].id}, function(data){
					swal('Done!', 'Starting to rejudge this task', 'success');
				});
			});
		}

		$scope.delete = function(index){
			swal({
				title: 'Delete Task',
				text: 'Are you sure?',
				type: 'warning',
				showCancelButton : true,
				confirmButtonText : 'Yes, delete it',
				closeOnConfirm : false,
			}, function(){
				socket.delete('/task/'+$scope.tasks[index].id, function(data, jwsres){
					console.log(data);
					console.log(jwsres);
					if(jwsres.statusCode === 200){
						swal('Done!', 'Task deleted', 'success');
						$scope.tasks.splice(index,1);
					}else
						swal('Error!', 'Task delete failed', 'error');
				});
			});	
		}
	}]);