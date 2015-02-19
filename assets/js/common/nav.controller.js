angular.module('mooseJs.common')
	.controller('navController', ["$scope", "$state", "Auth", "CurrentUser", "socket", "$timeout", function($scope, $state, Auth, CurrentUser, socket, $timeout){
		
		$scope.$on('loggedIn', function(event){
			console.log("Received a loggedIn event");
			$scope.isLogged = true;
			$scope.user = CurrentUser.user();
		});

		$scope.isLogged = false;
		if(Auth.isAuthenticated()){
			$scope.isLogged = true;
			$scope.user = CurrentUser.user();
		}
		
		$scope.logout = function(){
			Auth.logout();
			$scope.isLogged = false;
			$scope.user = {};

			socket.get('/contest/user', contestTime);

			$state.go('public.home');
		}

		var contestTime = function(contests){
			$scope.contests = contests;

			if(contests.length > 0){
				if($scope.user && $scope.user.role === 'team'){
					// Team
					var currentTime = new Date();
					var currentContest = contests[0];
					$scope.timer = {};
					var startTime = new Date(currentContest.startTime);
					var endTime = new Date(currentContest.endTime);
					var unfreezeTime = new Date(currentContest.unfreezeTime);
					if(startTime > currentTime){
						$scope.timer.status = 'not running';
						$scope.timer.endTime = startTime.getTime();
					}else if(startTime < currentTime && currentTime < endTime){
						$scope.timer.status = 'running';
						$scope.timer.endTime = endTime.getTime();
					}else{
						$scope.timer.status = 'waiting';
						$scope.timer.endTime = unfreezeTime.getTime();
					}
				}else{
					var currentTime = new Date();
					$scope.timers = [];
					angular.forEach(contests, function(contest){
						var startTime = new Date(contest.startTime);
						var endTime = new Date(contest.endTime);
						var unfreezeTime = new Date(contest.unfreezeTime);
						if(startTime > currentTime){
							var timer = {
								status: 'not running',
								name: contest.name,
								endTime: startTime.getTime(),
							}
							$scope.timers.push(timer);
						}else if(startTime < currentTime && currentTime < endTime){
							var timer = {
								status: 'running',
								name: contest.name,
								endTime: endTime.getTime()
							}
							$scope.timers.push(timer);
						}else{
							var timer = {
								status: 'waiting',
								name: contest.name,
								endTime: unfreezeTime.getTime()
							}
							$scope.timers.push(timer);
						}
					});

				}
			}
			
		};

		socket.get('/contest/user', contestTime);

		socket.on('reconnect', function(){
			socket.get('/contest/user', contestTime);
		});

		socket.on('contest', function(message){
			if(message.verb !== 'created'){
				socket.get('/contest/user', contestTime);
			}
		});

		$scope.$on('loggedIn', function(event){
			socket.get('/contest/user', contestTime);
		});

		$scope.$on('contestUpdated', function(event){
			socket.get('/contest/user', contestTime);
		});
	}]);