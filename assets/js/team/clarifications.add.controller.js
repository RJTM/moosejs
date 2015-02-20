'use strict';

angular.module('mooseJs.team')
.controller('team.ClarificationsAddController', ["$scope", "$sce", "$state", "socket", "LocalService", function($scope, $sce, $state, socket, LocalService){
	$scope.subjects = [{name: 'General Issue'}];
	socket.get('/task/contest', function(data){
		$scope.subjects.push.apply($scope.subjects, data);
	});

	$scope.trustAsHtml = function(value) {
		return $sce.trustAsHtml(value);
	};
	$scope.submitClarification = function(){
		swal({
			title : 'Send Clarification',
			text : 'Are you sure?',
			type : 'warning',
			showCancelButton : true,
			confirmButtonText : 'Yes, send it',
			closeOnConfirm : false
		}, function(){
			socket.post('/clarification', $scope.clarification, function(data, jwsres){
				if(jwsres.statusCode === 200){
					swal('Done!', 'Clarification sent', 'success');
					$scope.clarification = {};
					$state.go('team.clarifications');
				}else
					swal('Error', 'Clarification send failed', 'error');
			});
		});
	}
}]);