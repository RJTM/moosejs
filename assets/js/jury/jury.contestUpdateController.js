'use strict';

angular.module('mooseJs.jury')
	.controller('jury.ContestUpdateController', ["$scope","$state","$stateParams", "socket",  function($scope, $state, $stateParams, socket){
		socket.get('/contest/'+$stateParams.id, function(data){
			console.log(data);
			$scope.contest = data;
		});

		$scope.contest = {};

		$scope.$watch('contest.startTime', function(){
			var start = new Date($scope.contest.startTime),
				freeze = new Date($scope.contest.freezeTime),
				unfreeze = new Date($scope.contest.unfreezeTime),
				end = new Date($scope.contest.endTime);

			if(!$scope.contest.freezeTime || freeze < start)
				$scope.contest.freezeTime = $scope.contest.startTime;

			if(!$scope.contest.endTime || end < start)
				$scope.contest.endTime = $scope.contest.startTime;

			if(!$scope.contest.unfreezeTime || unfreeze < start)
				$scope.contest.unfreezeTime = $scope.contest.startTime;
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
					$state.go('jury.contests');
				});
			});
		};
	}
]);