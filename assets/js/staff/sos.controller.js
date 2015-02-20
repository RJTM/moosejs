'use strict';

angular.module('mooseJs.staff')
	.controller('staff.SosController', ["$scope", "socket", function($scope, socket){
		$scope.soss = [];

		socket.get('/sos', function(data){
			$scope.soss = data;
		});

		socket.on('sos', function(message){
			if(message.verb === 'created'){
				$scope.soss.push(message.data);
			}else{
				angular.forEach($scope.soss, function(sos){
					if(sos.id == message.id){
						sos.done = true;
					}
				});
			}
		});

		$scope.done = function(sos){
			sos.done = true;
			socket.post('/sos/'+sos.id, sos);
		}
	}]);