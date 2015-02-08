'use strict';

angular.module('mooseJs.jury')
	.controller('jury.AddSubtaskController', function($scope, $stateParams, socket){

		$scope.subtask = {
			task: $stateParams.id
		};
		
		$scope.save = function(){
			socket.post('/subtask', $scope.subtask, function(data){
				swal('Saved', 'New subtask saved.','success');
			});
		}

	});