'use strict';
angular.module('mooseJs.jury')
	.controller('jury.VerifyController', function($scope, $stateParams, socket, $http){
		socket.get('/run/'+$stateParams.id, function(data){
			$scope.run = data;
			$http.get('/sources/'+$scope.run.source).success(function(data){
				$scope.code = data;
			});
		})
	});