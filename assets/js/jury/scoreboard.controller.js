'use strict';
angular.module('mooseJs.jury')
	.controller('jury.ScoreboardController', ["$scope", "socket", function($scope, socket){
		socket.get('/scoreboard', function(data){
			//console.log(data);
			var users = {};
			var tasks = {};
			angular.forEach(data, function(value, key){
				if(!users[value.user.id]){
					users[value.user.id] = {};
					users[value.user.id]['name'] = value.user.name;
					users[value.user.id]['total'] = 0;
					users[value.user.id]['tasks'] = {};
				}
				users[value.user.id]['tasks'][value.task.id] = { points: value.points, name: value.task.name, id: value.task.id};
				users[value.user.id]['total'] += value.points;
				tasks[value.task.name] = { name: value.task.name, id: value.task.id };
			});
			$scope.scoreboardRows = users;
			$scope.tasks = tasks;
			console.log(users);
		});

		$scope.getOrder = function(input){
			return input.team.total;
		}
	}]);