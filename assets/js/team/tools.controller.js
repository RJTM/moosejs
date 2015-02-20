'use strict';

angular.module('mooseJs.team')
	.controller('team.ToolsController', ["$scope", "socket", "$upload", function($scope, socket, $upload){
		$scope.submit = function(){
			$scope.errors = [];
			if(!$scope.printFile){
				$scope.errors.push('Please select a file');
				return;
			}
			$upload.upload({
				url: '/print/',
				file: $scope.printFile[0],
				fileFormDataName: 'source',
			}).success(function(data){
				swal('Done!', 'File sent to print', 'success');
			});
		}
	}]);