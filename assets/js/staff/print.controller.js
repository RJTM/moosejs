'use strict';

angular.module('mooseJs.staff')
	.controller('staff.PrintController', ["$scope", "socket", "$stateParams", "$http", function($scope, socket, $stateParams, $http){

		socket.get('/print/'+$stateParams.id, function(data){
			$scope.print = data;
			
			$http.get('/jobs/'+data.source).success(function(data){
				$scope.source = data;
			});

		});

		$scope.printSource = function(){
			window.print();
		}
	}]);