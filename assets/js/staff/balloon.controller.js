'use strict';

angular.module('mooseJs.staff')
	.controller('staff.BalloonController', ["$scope", "socket", function($scope, socket){
		$scope.balloons = [];

		socket.get('/balloon', function(data){
			$scope.balloons = data;
		});

		socket.on('balloon', function(message){
			if(message.verb === 'created'){
				$scope.balloons.push(message.data);
			}else{
				angular.forEach($scope.balloons, function(balloon){
					if(balloon.id == message.id){
						balloon.done = true;
					}
				});
			}
		});

		$scope.done = function(balloon){
			balloon.done = true;
			socket.post('/balloon/'+balloon.id, balloon);
		}
	}]);