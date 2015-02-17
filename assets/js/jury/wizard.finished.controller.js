'use strict';

angular.module('mooseJs.jury')
	.controller('jury.WizardFinishedController', ["$scope", "socket", "$rootScope", function($scope, socket, $rootScope){
		$scope.getBlob = function(){
			var contest = {
				tasks: $scope.contest.tasks,
				name: $scope.contest.name,
				penalty: $scope.contest.penalty,
				startTime: $scope.contest.startTime,
				freezeTime: $scope.contest.freezeTime,
				endTime: $scope.contest.endTime,
				unfreezeTime: $scope.contest.unfreezeTime
			};
			return new Blob([JSON.stringify(contest, null, "  ")], {type: 'application/json'});
		}

		$scope.save = function(){
			socket.post('/contest/fromJson', $scope.contest, function(data){
				$rootScope.$broadcast('contestUpdated');
			});
		}
	}]);