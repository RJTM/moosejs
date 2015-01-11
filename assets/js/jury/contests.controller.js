angular.module('mooseJs.jury')
	.controller('jury.ContestsController', ["$scope", "$state", "Contest", function($scope, $state, Contest){
		$scope.contests = Contest.query();
		
		$scope.settings = function(index){
			if($scope.contests[index].set){
				// Show simple contest editing form
				
			}else{
				$state.go('jury.wizard', {
					id: $scope.contests[index].id
				});
			}
		}
	}]);