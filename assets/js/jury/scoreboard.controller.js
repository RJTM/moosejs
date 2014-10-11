'use strict';
angular.module('mooseJs.jury')
	.controller('jury.ScoreboardController', ["$scope", "Scoreboard", function($scope, Scoreboard){
		$scope.scoreboardLines = Scoreboard.query();
	}]);