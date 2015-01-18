'use strict';

angular.module('mooseJs.jury')
	.controller('jury.TeamController', ["$scope", "$upload", function($scope, $upload){
		$scope.upload = function(){
			$upload.upload({
				url: '/testcase/update',
				file: [$scope.input[0], $scope.output[0]],
				fileFormDataName: 'input',
				fileName: ['data.in', 'data.out'],
				data: {
					testcase: 1,
					subtask: 6,
					task: 4
				}
			}).success(function(data){
				console.log(data);
				swal('done');
			}).progress(function(evt){
				$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
				// console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% file :'+ evt.config.file.name);
			});
		}
	}]);