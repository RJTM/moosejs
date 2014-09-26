angular.module('mooseJs.common')
	.controller('navController', function($scope, $state, $rootScope, Auth, CurrentUser){
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
			if(Auth.isAuthenticated()){
				$scope.isLogged = true;
				$scope.user = CurrentUser.user();
			}
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