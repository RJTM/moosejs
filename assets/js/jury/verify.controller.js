'use strict';
angular.module('mooseJs.jury')
	.controller('jury.VerifyController', function($scope, $stateParams, socket, $http){
		socket.get('/run/getResult', {run: $stateParams.id} , function(data){
			console.log(data);
			$scope.run = data.run;
			$http.get('/sources/'+$scope.run.source).success(function(data){
				$scope.code = data;
			});
		})
	});