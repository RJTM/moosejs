'use strict';

angular.module('mooseJs.team')
.controller('team.PillsController', ["$scope", "$rootScope", "socket", "CurrentUser", "LocalService", function($scope, $rootScope,socket, CurrentUser, LocalService){
	$scope.clarifications = 0;
	$scope.runs = 0;

	socket.get('/clarification/user', {});
	socket.get('/run/team', {});

	socket.on('clarification', function(message){
		if(message.verb === 'created'){
			if(message.data.toAll || message.data.owner.id === CurrentUser.user().id){
				$scope.clarifications++;
			}
		}else if(message.verb === 'updated'){
			if(message.data.toAll || message.data.owner === CurrentUser.user().id){
				$scope.clarifications++;
			}
		}
	});

	socket.on('run', function(message){
		$scope.runs++;
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