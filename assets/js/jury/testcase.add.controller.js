'use strict';

angular.module('mooseJs.jury')
	.controller('jury.AddTestcaseController', ["$scope", "$stateParams", "$upload", "$state", function($scope, $stateParams, $upload, $state){
		$scope.save = function(){
			$scope.errors = [];
			if(!$scope.input || !$scope.output){
				$scope.errors.push('Please select two files');
				return;
			}
			$upload.upload({
				url: '/testcase',
				file: [$scope.input[0], $scope.output[0]],
				fileFormDataName: 'input',
				fileName: ['data.in', 'data.out'],
				data: {
					subtask: $stateParams.subtask,
					task: $stateParams.id
				}
			}).success(function(data){
				swal('Done!', 'Testcase uploaded','success');
				$scope.subtask.testcases.push(data);
				$state.go('jury.task.subtask');
			}).error(function(data){
				swal('Error', 'Testcase upload failed', 'error');
			});
		}
	}]);