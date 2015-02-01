'use strict';
angular.module('mooseJs.jury')
	.controller('jury.VerifyController', ["$scope", "$stateParams", "socket", "$http", "$state", function($scope, $stateParams, socket, $http, $state){
		
		$scope.veredict = {};

		socket.get('/run/getResult', {run: $stateParams.id} , function(data){
			console.log(data);
			$scope.subtasks = data.subtasks;
			$scope.run = data.run;
			$scope.task = data.task;
			$scope.result = data.result;
			$scope.grade = data.grade;
			$http.get('/sources/'+$scope.run.source).success(function(data){
				$scope.code = data.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
				   return '&#'+i.charCodeAt(0)+';';
				});
			});

			angular.forEach($scope.subtasks, function(subtask, key){
				$scope.veredict[subtask.id] = {
					autojudge: subtask.result,
					veredict: subtask.result,
					points : subtask.points
				};

				angular.forEach(subtask.testcases, function(testcase, index){
					$http.get('/testcases/'+testcase.outputFile).success(function(data){
						testcase.juryOutput = data.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
				   			return '&#'+i.charCodeAt(0)+';';
						});
						console.log(testcase.juryOutput);
					});
				});
			});
		});

		$scope.makeVeredict = function(){
			socket.post('/grade/verify', {grade: $scope.grade, veredict: $scope.veredict}, function(data){
				$state.go('jury.runs');
			});
		};
	}]);