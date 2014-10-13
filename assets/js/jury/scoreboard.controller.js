'use strict';
angular.module('mooseJs.jury')
	.controller('jury.ScoreboardController', ["$scope", "socket", function($scope, socket){
		var users = $scope.scoreboardRows = {};
		var tasks = $scope.tasks = {};

		socket.get('/scoreboard', function(data){
			
			angular.forEach(data, function(value, key){
				if(!users[value.user.id]){
					users[value.user.id] = {};
					users[value.user.id]['name'] = value.user.name;
					users[value.user.id]['total'] = 0;
					users[value.user.id]['tasks'] = {};
					users[value.user.id]['totalTime'] = 0;
					users[value.user.id]['penalty'] = 0;
				}
				
				if(!users[value.user.id]['tasks'][value.task.id]){
					users[value.user.id]['tasks'][value.task.id] = { 
						points: 0,
						name: value.task.name, 
						id: value.task.id,
						time: 0,
						runs: 0
					};	
				}

				users[value.user.id]['tasks'][value.task.id] .points += value.points;
				users[value.user.id]['tasks'][value.task.id].time = Math.max(users[value.user.id]['tasks'][value.task.id].time, value.time)
				users[value.user.id]['tasks'][value.task.id].runs = value.submissions;
				users[value.user.id]['total'] += value.points;
				users[value.user.id]['totalTime'] = Math.max(users[value.user.id]['totalTime'], parseInt(value.time));
				users[value.user.id]['penalty'] = Math.max(users[value.user.id]['penalty'], parseInt(value.penalty));

				if(!tasks[value.task.name]){
					tasks[value.task.name] = { 
						name: value.task.name, 
						id: value.task.id,
						fullPoints : 0,
						subtasks : {}
					};
				}
				tasks[value.task.name].subtasks[value.subtask.id] = value.subtask.points;
			});
			
			angular.forEach(tasks, function(task, taskName){
				angular.forEach(task.subtasks, function(points, subtaskId){
					task.fullPoints += parseInt(points);
				});
			});
			$scope.scoreboardRows = users;
			$scope.tasks = tasks;
			//console.log(users);

		});

		socket.on('scoreboard', function(message){
			if(message.verb === 'created'){
				//New user or task
			}else if(message.verb === 'deleted'){
				//Deleted user or task
			}else if(message.verb === 'updated'){
				//Updated scoreboard
				console.log('UPDATE');
				console.log(message.data);
			}
		})

		$scope.getOrder = function(input){
			return input.team.total;
		}
	}]);