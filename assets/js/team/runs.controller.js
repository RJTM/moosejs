'use strict';

angular.module('mooseJs.team')
	.controller('team.RunsController', ["$scope", "socket", function($scope, socket){
		socket.get('/run/team', function(data){
			$scope.runs = data;
		});

		$scope.showDetails = function(run){
			run.details = !run.details; 
		}
	}]);