'use strict';

angular.module('mooseJs.team')
.controller('jury.ClarificationDetailController', ["$scope", "$modalInstance", "socket", "clarification", function($scope, $modalInstance, socket, clarification){
	$scope.clarification = clarification;

	$scope.ok = function(){
		$modalInstance.close();
	}

	$scope.send = function(){
		socket.post('/clarification/' + $scope.clarification.id,
			$scope.clarification,
			function(data){
				console.log(data);
			});
	}
}]);