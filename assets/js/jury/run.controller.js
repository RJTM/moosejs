'use strict';
angular.module('mooseJs.jury')
	.controller('jury.RunController', ["$scope", "socket", function($scope, socket){
		var updateRun = function (element){
			for(var i=0; i < $scope.runs.length; i++){
				if($scope.runs[i].id === element.run){
					$scope.runs[i].status = element.status;
					return;
				}
			}
		};

		socket.get('/run',function(data){
			$scope.runs = data;
			angular.forEach($scope.runs, function(value, key){
				if(value.grades.length === 0){
					value.status = 'pending'
				}else{
					value.status = value.grades[value.grades.length-1].status;
				}
			});
		});

		socket.on('run', function(message){
			message.data.status = 'pending';
			$scope.runs.push(message.data);
		});

		socket.on('grade', function(message){
			if(message.verb === 'updated'){
				//buscar el run
				//actualizar la data
				updateRun(message.data);
				
			}
			console.log(message);
		});


		$scope.statusSort = function(run){
			var statues = {
				'done': 1,
				'judging': 2,
				'pending': 3,
				'verified': 4
			};
			return statues[run.status];
		};

	}])