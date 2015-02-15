'use strict';

angular.module('mooseJs.team')
.controller('team.ClarificationsController', ["$scope", "$modal", "socket", "CurrentUser", "LocalService", function($scope, $modal, socket, CurrentUser, LocalService){
	// TODO: Remove token from data
	socket.get('/clarification/user', function(data){
		console.log(data);
		$scope.clarifications = data;
	});

	socket.on('clarification', function(message){
		if(message.verb === 'created'){
			if(message.data.owner === CurrentUser.user().id || message.data.toAll){
				$scope.clarifications.push(message.data);
			}
		}else if(message.verb === 'updated'){
			angular.forEach($scope.clarifications, function(clarification, index){
				if(clarification.id == message.id){
					angular.forEach(message.data, function(value, key){
						$scope.clarifications[index][key] = value;
					});
				}
			});
		}
	});

	$scope.showDetails = function(clarification){
		$modal.open({
			templateUrl: 'templates/team/clarification-detail.html',
			controller: 'team.ClarificationDetailController',
			resolve: {
				clarification: function(){
					return clarification;
				}
			}
		});
	}
}])