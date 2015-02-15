'use strict';

angular.module('mooseJs.admin')
	.controller('admin.JudgehostController', function($scope, socket, $state, $stateParams){
		
		socket.get('/judgehost/'+$stateParams.id, function(data){
			$scope.judgehost = data;
		});

		$scope.save = function(){
			socket.post('/judgehost/'+$stateParams.id, $scope.judgehost, function(data){
				swal('Saved', 'Judgehost saved', 'success');
				$state.go('admin.judgehosts');
			});
		}
	});