'use strict';

angular.module('mooseJs.admin')
	.controller('admin.NewJudgehostController', ["$scope", "socket", "$state", function($scope, socket, $state){
		
		$scope.save = function(){
			socket.post('/judgehost', $scope.judgehost, function(data){
				swal('Saved', 'New judgehost saved', 'success');
				$state.go('admin.judgehosts');
			});
		}
	}]);