'use strict';

angular.module('mooseJs.jury')
	.controller('jury.ZipController', ["$scope", "$upload", "$stateParams", function($scope, $upload, $stateParams){
		$scope.uploading = false;

		$scope.upload = function(){
			$scope.uploading = true;
			$upload.upload({
				url: '/contest/fromZip',
				file: $scope.input,
				fileFormDataName: 'input',
				fileName: 'contest.zip',
				data: {
					id: $stateParams.id
				}
			}).success(function(data){
				swal('Done!', 'Contest zip file uploaded successfuly','success');
			}).progress(function(evt){
				$scope.progress = parseInt(100.0 * evt.loaded / evt.total);
			});
		}
	}]);