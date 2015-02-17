'use strict';

angular.module('mooseJs.jury')
	.controller('jury.ContestUpdateController', ["$scope","$state","$stateParams", "socket", "$rootScope",  function($scope, $state, $stateParams, socket, $rootScope){
		socket.get('/contest/'+$stateParams.id, function(data){
			var start = new Date(data.startTime),
				end = new Date(data.endTime),
				freeze = new Date(data.freezeTime),
				unfreeze = new Date(data.unfreezeTime);
			
			data.startTime = new Date();
			data.startTime.setTime(start.getTime());
			data.endTime = new Date();
			data.endTime.setTime(end.getTime());
			data.freezeTime = new Date();
			data.freezeTime.setTime(freeze.getTime());
			data.unfreezeTime = new Date();
			data.unfreezeTime.setTime(unfreeze.getTime());

			$scope.contest = data;
		});

		$scope.contest = {
			startTime : new Date(),
			endTime : new Date(),
			freezeTime : new Date(),
			unfreezeTime : new Date()
		}

		$scope.$watch('contest.startTime', function(){
			if($scope.contest){
				var start = $scope.contest.startTime.getTime(),
					freeze = $scope.contest.freezeTime.getTime(),
					unfreeze = $scope.contest.unfreezeTime.getTime(),
					end = $scope.contest.endTime.getTime();

				if(!$scope.contest.freezeTime || freeze < start)
					$scope.contest.freezeTime = $scope.contest.startTime;

				if(!$scope.contest.endTime || end < start)
					$scope.contest.endTime = $scope.contest.startTime;

				if(!$scope.contest.unfreezeTime || unfreeze < start)
					$scope.contest.unfreezeTime = $scope.contest.startTime;
			}
		});

		$scope.update = function(){
			swal({
				title : 'Update Contest',
				text : 'Are you sure?',
				type : 'warning',
				showCancelButton : true,
				confirmButtonText : 'Yes, update it',
				closeOnConfirm : true
			}, function(){
				socket.post('/contest/'+$scope.contest.id, $scope.contest, function(data){
					swal('Done!', 'Clarification sent', 'success');
					$rootScope.$broadcast('contestUpdated');
					$state.go('jury.contests');
				});
			});
		};
	}
]);