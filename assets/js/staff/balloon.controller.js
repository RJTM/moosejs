'use strict';

angular.module('mooseJs.staff')
	.controller('staff.BalloonController', ["$scope", "socket", function($scope, socket){
		$scope.balloons = [];

		socket.get('/balloon', function(data){
			$scope.balloons = data;
		});

		socket.on('balloon', function(message){
			$scope.balloons.push(message.data);
		});
	}]);