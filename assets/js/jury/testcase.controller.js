'use strict';

angular.module('mooseJs.jury')
	.controller('jury.TestcaseController', function($scope, $stateParams, $upload){
		$scope.testcaseId = $stateParams.testcase;
		$scope.save = function(){
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
			});
		}
	});