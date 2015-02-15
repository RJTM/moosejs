'use strict';

angular.module('mooseJs.admin')
	.controller('admin.ContestUsersController', ["$scope", "$stateParams", "socket", "Contest", "User", "LocalService", function($scope, $stateParams, socket, Contest, User, LocalService){
		$scope.contest = Contest.get({id: $stateParams.id});
		$scope.users = User.query({role:'team'});

		$scope.registeredUsers = function(value, index){
			for(var i=0;i<$scope.contest.users.length; i++){
				var user = $scope.contest.users[i];
				if(value.id === user.id) return false;
			}
			return true;
		}

		$scope.select = function(user){
			user.selected = !user.selected;
		}

		$scope.selectAll = function(users){
			angular.forEach(users, function(user,index){
				user.selected = true;
			});
		}

		$scope.deselectAll = function(users){
			angular.forEach(users, function(user,index){
				user.selected = false;
			});
		}

		$scope.register = function(){
			$scope.disable = true;
			var users = [];
			var usersIds = [];
			angular.forEach($scope.users, function(user, index){
				if(user.selected){
					users.push(user);
					usersIds.push(user.id);
					user.selected = false;
				}
			});
			var toSend = {
				users: usersIds,
				contest: $scope.contest.id,
			};
			socket.post('/user/addUsersToContest', toSend, function(data){
				$scope.disable = false;
				$scope.contest.users = $scope.contest.users.concat(users);
			});
		}

		$scope.unregister = function(){
			$scope.disable = true;
			var usersIds = [];
			angular.forEach($scope.contest.users, function(user, index){
				if(user.selected){
					$scope.contest.users.splice(index,1);
					usersIds.push(user.id);
				}
			});
			var toSend = {
				users: usersIds,
				contest: $scope.contest.id,
			};
			socket.post('/user/deleteUsersFromContest', toSend, function(data){
				$scope.disable = false;
			});
		}

	}]);