'use strict';

angular.module('mooseJs.team')
	.controller('team.RunsController', ["$scope", "socket", function($scope, socket){
		var reload = function(){
			socket.get('/run/team', function(data){
				$scope.runs = data;
			});
		};

		reload();
		socket.on('run', reload);

		$scope.showDetails = function(run){
			run.details = !run.details; 
		}
	}]);