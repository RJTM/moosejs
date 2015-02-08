'use strict';

angular.module('mooseJs.jury')
	.controller('jury.AddTestcaseController', function($scope, $stateParams, $upload){
		$scope.save = function(){
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
			});
		}
	});