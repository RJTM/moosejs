'use strict';

angular.module('mooseJs.public')
	.controller('public.HomeController', ["$scope", "socket", "$sce", function($scope, socket, $sce){

		var users = $scope.scoreboardRows = {};
		var tasks = $scope.tasks = {};
		$scope.allowProblemset = false;

		var calculateScoreboard = function(){

			socket.get('/scoreboard', $scope.search, function(data){
				var users = $scope.scoreboardRows = {};
				var tasks = $scope.tasks = {};
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
							name: value.task.code, 
							id: value.task.id,
							time: 0,
							runs: 0,
							penalty: 0
						};	
					}

					users[value.user.id]['tasks'][value.task.id].points += parseInt(value.points);
					users[value.user.id]['tasks'][value.task.id].time = parseInt(value.time);
					users[value.user.id]['tasks'][value.task.id].runs = parseInt(value.submissions);
					users[value.user.id]['tasks'][value.task.id].penalty = parseInt(value.penalty);
					users[value.user.id]['total'] += value.points;

					if(!tasks[value.task.code]){
						tasks[value.task.code] = { 
							name: value.task.code, 
							id: value.task.id,
							fullPoints : 0,
							subtasks : {},
							color: value.task.color
						};
					}
					tasks[value.task.code].subtasks[value.subtask.id] = value.subtask.points;
				});
				
				// Compute time and penalty for each team
				angular.forEach(users, function(user, userId){
					user.totalTime = 0;
					user.penalty = 0;
					angular.forEach(user.tasks, function(task, taskId){
						user.totalTime += task.time;
						user.penalty += task.penalty;
					});
				});
				
				// Compute the maximum amount of points per task (visual only)
				angular.forEach(tasks, function(task, taskName){
					angular.forEach(task.subtasks, function(points, subtaskId){
						task.fullPoints += parseInt(points);
					});
				});
				$scope.scoreboardRows = users;
				$scope.tasks = tasks;				
			});


		};

		$scope.search = {};

		// calculateScoreboard();

		socket.get('/contest', function(data){
			$scope.contests = data;
		});

		$scope.$watch('search.contest', function(value){
			if(value)
				calculateScoreboard();
		});

		$scope.trustAsHtml = function(value) {
			return $sce.trustAsHtml(value);
		};

		var updateScoreboard = function(message){
			if(message.verb === 'created'){
				calculateScoreboard();
			}else if(message.verb === 'destroyed'){
				calculateScoreboard();
			}else if(message.verb === 'updated'){
				//Updated scoreboard
				var users = $scope.scoreboardRows;
				var updatedUser = message.data[0].user;
				var updatedTask = message.data[0].task;
				var oldTask = users[updatedUser]['tasks'][updatedTask];
				oldTask.points = 0;
				oldTask.runs++;
				oldTask.penalty = message.data[0].penalty;
				
				angular.forEach(message.data, function(value, key){
					oldTask.points += parseInt(value.points);
					oldTask.time = Math.max(oldTask.time, value.time);
					oldTask.runs = value.submissions;
				});

				//recalculate the team score
				var oldTeam = users[updatedUser];
				oldTeam.totalTime = 0;
				oldTeam.total = 0;
				oldTeam.penalty = 0;

				angular.forEach(oldTeam.tasks, function(task, taskId){
					oldTeam.totalTime += parseInt(task.time);
					oldTeam.total += parseInt(task.points);
					oldTeam.penalty += parseInt(task.penalty);
				});
			}

		};

		socket.on('scoreboardpublic', updateScoreboard);

		socket.on('release', function(message){
			if($scope.search.contest === message.contest){
				calculateScoreboard();
			}
		});

	}]);