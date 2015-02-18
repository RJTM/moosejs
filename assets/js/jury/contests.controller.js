angular.module('mooseJs.jury')
	.controller('jury.ContestsController', ["$scope", "$state", "Contest", "socket", function($scope, $state, Contest, socket){
		$scope.contests = Contest.query();
		
		$scope.settings = function(index){
			if($scope.contests[index].set){
				$state.go('jury.contestUpdate', {
					id : $scope.contests[index].id
				});
			}else{
				$state.go('jury.wizard', {
					id: $scope.contests[index].id
				});
			}
		}

		$scope.kraken = function(index){
			swal({
				title: 'Are you sure?',
				text: 'Everybody will be able to see the final scoreboard',
				type: 'warning',
				showCancelButton : true,
				confirmButtonText : 'Yes, RELEASE',
				closeOnConfirm : false,
			}, function(){
				socket.post('/contest/release',
					{ id: $scope.contests[index].id },
					function(data){
						swal('Done!', 'Results released', 'success');
					});
			});
		}
	}]);