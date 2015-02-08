'use strict';

angular.module('mooseJs.jury')
	.controller('jury.SubtaskController', function($scope, $stateParams, socket){
		socket.get('/subtask/'+$stateParams.subtask, function(data){
			$scope.subtask = data;
		});

		$scope.save = function(){
			socket.post('/subtask/'+$stateParams.subtask, $scope.subtask, function(data){
				swal('Saved', 'Subtask data saved', 'success');
			});
		}
	});