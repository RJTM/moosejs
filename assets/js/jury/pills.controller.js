angular.module('mooseJs.jury')
	.controller('jury.PillsController', ["$scope", "$rootScope", "socket", function($scope, $rootScope, socket){
		$scope.runs = 0;
		socket.get('/run');

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