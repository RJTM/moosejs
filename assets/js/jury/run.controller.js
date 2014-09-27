'use strict';
angular.module('mooseJs.jury')
	.controller('jury.RunController', function($scope, Run){
		$scope.runs = Run.query();
	})