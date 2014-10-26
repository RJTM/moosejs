'use strict';

angular.module('mooseJs.staff')
	.controller('staff.PrintController', ["$rootScope", "$scope", "socket", function($rootScope, $scope, socket){
		$scope.prints = [];

		socket.get('/print', function(data){
			console.log(data);
			$scope.prints = data;
		});

		socket.on('print', function(message){
			console.log(message);
			$scope.prints.push(message.data);
		});
	}]);