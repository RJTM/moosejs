'use strict';

angular.module('mooseJs.jury')
	.controller('jury.TestcaseController', ["$scope", "$stateParams", "$upload", function($scope, $stateParams, $upload){
		$scope.testcaseId = $stateParams.testcase;
		$scope.save = function(){
			$scope.errors = [];
			if(!$scope.input || !$scope.output){
				$scope.errors.push('Please select two files');
				return;
			}
			$upload.upload({
				url: '/testcase/'+$stateParams.testcase,
				file: [$scope.input[0], $scope.output[0]],
				fileFormDataName: 'input',
				fileName: ['data.in', 'data.out'],
				data: {
					subtask: $stateParams.subtask,
					task: $stateParams.id,
					testcase: $stateParams.testcase
				}
			}).success(function(data){
				swal('Done!', 'Testcase uploaded','success');
			}).error(function(data){
				swal('Error', 'Testcase upload failed', 'error');
			});
		}
	}]);