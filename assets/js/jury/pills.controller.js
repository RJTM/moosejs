angular.module('mooseJs.jury')
	.controller('jury.PillsController', function($scope, socket){
		$scope.runs = 0;
		socket.get('/run');

		socket.on('run', function(message){
			$scope.runs++;
		})
	});