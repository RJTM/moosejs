angular.module('mooseJs.jury')
	.controller('jury.PillsController', ["$scope", "socket", function($scope, socket){
		$scope.runs = 0;
		socket.get('/run');

		socket.on('run', function(message){
			$scope.runs++;
		})
	}]);