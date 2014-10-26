'use strict';

angular.module('mooseJs.team')
.controller('team.ClarificationDetailController', ["$scope", "$modalInstance", "clarification", function($scope, $modalInstance, clarification){
	$scope.clarification = clarification;

	$scope.ok = function(){
		$modalInstance.close();
	}
}]);