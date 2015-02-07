'use strict';

angular.module('mooseJs.team')
	.controller('team.RunsController', ["$scope", "socket", function($scope, socket){
		socket.get('/run/team', function(data){
			console.log(data);
		});
	}]);