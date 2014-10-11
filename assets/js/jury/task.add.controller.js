'use strict';
angular.module('mooseJs.jury')
	.controller('jury.TaskAddController', function($scope, $state, Task){
		$scope.save = function(){
			Task.save($scope.task, function(data){
				$state.go('jury.tasks');
			})
		}
	});