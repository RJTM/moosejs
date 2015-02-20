'use strict';

angular.module('mooseJs.staff')
	.controller('staff.PrintsController', ["$rootScope", "$scope", "socket", function($rootScope, $scope, socket){
		$scope.prints = [];

		socket.get('/print', function(data){
			$scope.prints = data;
		});

		socket.on('print', function(message){
			if(message.verb === 'created'){
				$scope.prints.push(message.data);
			}else{
				angular.forEach($scope.prints, function(print){
					if(print.id == message.id){
						print.done = true;
					}
				});
			}
		});

		$scope.done = function(print){
			print.done = true;
			socket.post('/print/'+print.id, print);
		}
	}]);