angular.module('mooseJs.common')
	.controller('navController', function($scope, $state, Auth, CurrentUser, socket, $timeout){
		
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
					if(new Date(currentContest.startTime) > currentTime){
						$scope.timer.running = false;
						$scope.timer.endTime = new Date(currentContest.startTime).getTime();
					}else{
						$scope.timer.running = true;
						$scope.timer.endTime = new Date(currentContest.endTime).getTime();
					}
				}else{
					// Everything else

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
	});