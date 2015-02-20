'use strict';

angular.module('mooseJs.jury')
	.controller('jury.ZipController', ["$scope", "$upload", "$stateParams", "$rootScope", function($scope, $upload, $stateParams, $rootScope){
		$scope.uploading = false;
		
		$scope.upload = function(){
			$scope.errors = [];
			if(!$scope.input){
				$scope.errors.push('Please select a file');
				return;
			}
			$scope.uploading = true;
			$upload.upload({
				url: '/contest/fromZip',
				file: $scope.input[0],
				fileFormDataName: 'input',
				fileName: 'contest.zip',
				data: {
					id: $stateParams.id
				}
			}).success(function(data){
				swal('Done!', 'Contest zip file uploaded successfuly','success');
				$rootScope.$broadcast('contestUpdated');
			}).progress(function(evt){
				$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
			});
		}
	}]);