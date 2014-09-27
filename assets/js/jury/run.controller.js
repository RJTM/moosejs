'use strict';
angular.module('mooseJs.jury')
	.controller('jury.RunController', function($scope, socket){
		socket.get('/run',function(data){
			$scope.runs = data;
		});

		socket.on('run', function(message){
			$scope.runs.push(message.data);
		});

		// $scope.predicate = 'grades[grades.length-1].status';
		$scope.predicate = function(run){
			var statues = {
				'done': 1,
				'judging': 2,
				'pending': 3,
				'verified': 4
			}
			if(run.grades.length === 0){
				return 3;
			}else{
				return statues[run.grades[run.grades.length-1].status];
			}
		}

	})