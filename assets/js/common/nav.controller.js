angular.module('mooseJs.common')
	.controller('navController', function($scope, $state, Auth, CurrentUser){
		
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
	});