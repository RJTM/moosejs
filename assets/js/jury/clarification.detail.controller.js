'use strict';

angular.module('mooseJs.team')
.controller('jury.ClarificationDetailController', ["$scope", "$modalInstance", "socket", "clarification", "CurrentUser", function($scope, $modalInstance, socket, clarification, CurrentUser){
	$scope.clarification = clarification;

	$scope.ok = function(){
		$modalInstance.close();
	}

	$scope.send = function(){
		swal({
			title: 'Send Clarification Response',
			text: 'Are you sure?',
			type: 'warning',
			showCancelButton : true,
			confirmButtonText : 'Yes, send it',
			closeOnConfirm : false,
		}, function(){
			$scope.clarification.jury = CurrentUser.user().id;
			socket.post('/clarification/' + $scope.clarification.id,
				$scope.clarification,
				function(data){
					swal('Done!', 'Clarification sent', 'success');
				});
		});
	}
}]);