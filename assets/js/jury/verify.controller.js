'use strict';
angular.module('mooseJs.jury')
	.controller('jury.VerifyController', ["$scope", "$stateParams", "socket", "$http", "$state", "diff", function($scope, $stateParams, socket, $http, $state, diff){
		
		$scope.veredict = {};

		socket.get('/run/getResult', {run: $stateParams.id} , function(data){
			$scope.subtasks = data.subtasks;
			$scope.run = data.run;
			$scope.task = data.task;
			$scope.result = data.result;
			$scope.grade = data.grade;
			$http.get('/protected/sources/'+$scope.run.source).success(function(data){
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

				if(data.result === 'compiler-error'){
					return;
				}

				angular.forEach(subtask.testcases, function(testcase, index){
					$http.get('/protected/testcases/'+testcase.outputFile).success(function(data){
						testcase.juryOutput = data.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
				   			return '&#'+i.charCodeAt(0)+';';
						});
						var result = diff(testcase.juryOutput, testcase.testcasegrade.output);
						var lines = [];
						result.forEach(function(part){
							lines = lines.concat(part.value.split('\n').map(function(value){
								return {
									text : value,
									color : part.added ? 'green' : part.removed ? 'red' : 'gray'
								}
							}));
							lines.pop();
						});
						testcase.diff = lines;
					});
				});
			});
		});

		$scope.makeVeredict = function(){
			socket.post('/grade/verify', {grade: $scope.grade, veredict: $scope.veredict}, function(data, jwsres){
				if(jwsres.statusCode === 200){
					swal('Done!', 'Run verified successfully', 'success');
					$state.go('jury.runs');
				}else
					swal('Error', 'Run verification failed', 'error');
			});
		};

		$scope.ignoreSubmission = function(){
			console.log($scope.veredict);
			console.log($scope.subtasks);

			for(var i = 0, n=$scope.subtasks.length; i<n; i++){
				$scope.veredict[$scope.subtasks[i].id].veredict = 'ignore-submission';
			}
			console.log($scope.veredict);
		}

		$scope.redFilter = function(line){
			if(line.color == 'red' || line.color == 'gray')
				return true;
			return false;
		};

		$scope.greenFilter = function(line){
			if(line.color == 'green' || line.color == 'gray')
				return true;
			return false;
		};
	}]);