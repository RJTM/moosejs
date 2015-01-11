'use strict';

angular.module('mooseJs.jury')
	.controller('jury.WizardInnerController', ["$scope", "$stateParams", function($scope, $stateParams){
		$scope.id = parseInt($stateParams.id);
		$scope.taskIndex = parseInt($stateParams.taskIndex);
		$scope.subtaskIndex = parseInt($stateParams.subtaskIndex);
	}]);