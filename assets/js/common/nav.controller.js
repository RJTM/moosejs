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

		var Timer = function(){
			this.myTimeout = null;
		}

		Timer.prototype.create = function(output, endTime){
			var _this = this;
			if(!$scope[output]) $scope[output] = {};
			var onTimeout = function(){
				var now = Date.now();
				if(now >= endTime){
					$timeout.cancel(_this.myTimeout);
					return;
				}

				var dt = endTime -now;
				$scope[output].hours = Math.trunc((dt)/3600000);
				dt = dt % 3600000;

				$scope[output].minutes = Math.trunc(dt / 60000);
				dt = dt % 60000;

				$scope[output].seconds = Math.trunc(dt / 1000);
				_this.myTimeout = $timeout(onTimeout, 1000);
			}
			_this.myTimeout = $timeout(onTimeout, 1000);
		};

		Timer.prototype.cancel = function(){
			if(this.myTimeout){
				$timeout.cancel(this.myTimeout);
			}
		}

		var teamTimer = new Timer();
		var otherTimers = [];
		var contestTime = function(contests){
			$scope.contests = contests;

			console.log('asdqwe');

			if(contests.length > 0){
				if($scope.user && $scope.user.role === 'team'){
					// Team
					var currentTime = new Date();
					var currentContest = contests[0];

					if(new Date(currentContest.startTime) > currentTime){
						teamTimer.cancel();
						teamTimer.create('timerValue', new Date(currentContest.startTime).getTime());
					}else{
						teamTimer.cancel();
						teamTimer.create('timerValue', new Date(currentContest.endTime).getTime());
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
	});