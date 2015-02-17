angular.module('mooseJs.common')
.directive('timer', function() {
	return {
		scope: {
			endTime: '@endTime',
		},
		restrict: 'E',
		controller: function($scope, $timeout){
			var myTimeout = null;
			$scope.output = {};
			var create = function(){
				var onTimeout = function(){
					var now = Date.now();
					if(now >= $scope.endTime){
						$timeout.cancel(myTimeout);
						return;
					}

					var dt = $scope.endTime -now;
					$scope.output.hours = Math.trunc((dt)/3600000);
					dt = dt % 3600000;

					$scope.output.minutes = Math.trunc(dt / 60000);
					dt = dt % 60000;

					$scope.output.seconds = Math.trunc(dt / 1000);
					myTimeout = $timeout(onTimeout, 1000);
				}
				myTimeout = $timeout(onTimeout, 1000);
			};
			// create();

			$scope.$watch('endTime', function(value){
				$timeout.cancel(myTimeout);
				create();
			});
		},
		template: '<span>{{ output.hours }}h {{output.minutes}}m {{output.seconds}}s</span>'
	}
});