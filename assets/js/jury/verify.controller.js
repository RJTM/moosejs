'use strict';
angular.module('mooseJs.jury')
	.controller('jury.VerifyController', function($scope, $stateParams, socket, $http, $state){
		
		$scope.veredict = {};

		socket.get('/run/getResult', {run: $stateParams.id} , function(data){
			$scope.subtasks = data.subtasks;
			$scope.run = data.run;
			$scope.task = data.task;
			$scope.result = data.result;
			$scope.grade = data.grade;
			$http.get('/sources/'+$scope.run.source).success(function(data){
				$scope.code = data;
			});

			angular.forEach($scope.subtasks, function(value, key){
				$scope.veredict[value.id] = value.result;
			})
		});

		$scope.makeVeredict = function(){
			socket.post('/grade/verify', {grade: $scope.grade.id, veredict: $scope.veredict}, function(data){
				$state.go('jury.runs');
			});
		};
	});