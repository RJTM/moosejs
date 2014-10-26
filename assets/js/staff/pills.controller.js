'use strict';

angular.module('mooseJs.staff')
	.controller('staff.PillsController', ["$rootScope", "$scope", "socket", function($rootScope, $scope, socket){
		$scope.prints = 0;
		$scope.balloons = 0;

		socket.get('/print');
		socket.on('print', function(message){
			$scope.prints++;
		});

		socket.get('/balloon');
		socket.on('balloon', function(message){
			$scope.balloons++;
		});

		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState){
			if(toState.data.clearBadge){
				$scope[toState.data.clearBadge] = 0;
			}

			if(fromState.data.clearBadge){
				$scope[fromState.data.clearBadge] = 0;
			}
		});
	}]);