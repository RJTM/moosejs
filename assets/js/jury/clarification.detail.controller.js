'use strict';

angular.module('mooseJs.team')
.controller('jury.ClarificationDetailController', ["$scope", "$modalInstance", "socket", "clarification", "CurrentUser", function($scope, $modalInstance, socket, clarification, CurrentUser){
	$scope.clarification = clarification;

	$scope.ok = function(){
		$modalInstance.close();
	}

	$scope.send = function(){
		$scope.clarification.jury = CurrentUser.user().id;
		socket.post('/clarification/' + $scope.clarification.id,
			$scope.clarification,
			function(data){
				console.log(data);
			});
	}
}]);