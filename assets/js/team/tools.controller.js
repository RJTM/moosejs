'use strict';

angular.module('mooseJs.team')
	.controller('team.ToolsController', ["$scope", "socket", "$upload", function($scope, socket, $upload){
		$scope.submit = function(){
			$upload.upload({
				url: '/print/',
				file: $scope.printFile,
				fileFormDataName: 'source',
			}).success(function(data){
				swal('Done!', 'File sent to print', 'success');
			});
		}
	}]);