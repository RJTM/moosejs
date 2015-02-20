'use strict';

angular.module('mooseJs.jury')
	.controller('jury.SubtaskController', ["$scope", "$stateParams", "socket", "$http", function($scope, $stateParams, socket, $http){
		socket.get('/subtask/'+$stateParams.subtask, function(data){
			$scope.subtask = data;
		});

		$scope.save = function(){
			socket.post('/subtask/'+$stateParams.subtask, $scope.subtask, function(data, jwsres){
				if(jwsres.statusCode === 200)
					swal('Saved', 'Subtask data saved', 'success');
				else
					swal('Error', 'Subtask save failed', 'error');
			});
		}

		$scope.deleteTestcase = function(index){
			swal({
				title: "Are you sure?",
				text: "This process cannot be undone!",
				type: "warning",
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "Yes, delete it!",
				closeOnConfirm: false
			},function(){
				var testcase = $scope.subtask.testcases[index];
				$http.delete('/testcase/'+testcase.id).success(function(data){
					swal('Deleted', 'Testcase deleted', 'success');
					$scope.subtask.testcases.splice(index,1);
					$state.go('jury.task.subtask');
				}).error(function(data){
					swal('Error', 'Testcase delete failed', 'error');
				});
			});
		}
	}]);