'use strict';

angular.module('mooseJs.staff')
	.controller('staff.PrintsController', ["$rootScope", "$scope", "socket", function($rootScope, $scope, socket){
		$scope.prints = [];

		socket.get('/print', function(data){
			$scope.prints = data;
		});

		socket.on('print', function(message){
			$scope.prints.push(message.data);
		});
	}]);