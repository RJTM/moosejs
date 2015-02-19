'use strict';
angular.module('mooseJs.jury')
	.controller('jury.ClarificationController', ["$scope", "socket", "LocalService", "$modal", function($scope, socket, LocalService, $modal){
		socket.get('/clarification', function(data){
			$scope.clarifications = data;
		});

		socket.on('clarification', function(message){
			console.log(message);
			if(message.verb === 'created'){
				$scope.clarifications.push(message.data);
			}
		});

		$scope.showDetails = function(clarification){
			$modal.open({
				templateUrl : 'templates/jury/clarification-detail.html',
				controller : 'jury.ClarificationDetailController',
				resolve : {
					clarification : function(){
						return clarification;
					}
				}
			});
		}
	}
]);