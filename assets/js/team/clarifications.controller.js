'use strict';

angular.module('mooseJs.team')
.controller('team.ClarificationsController', ["$scope", "socket", "CurrentUser", "LocalService", function($scope, socket, CurrentUser, LocalService){
	socket.get('/clarification/user', {token: angular.fromJson(LocalService.get('auth_token')).token} ,function(data){
		$scope.clarifications = data;
	});

	socket.on('clarification', function(message){
		if(message.verb === 'created'){
			if(message.data.owner === CurrentUser.user().id){
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
}])