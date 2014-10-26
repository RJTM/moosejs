'use strict';

angular.module('mooseJs.team')
.controller('team.ClarificationsAddController', ["$scope", "$sce", "$state", "socket", "LocalService", function($scope, $sce, $state, socket, LocalService){
	$scope.subjects = [{name: 'General Issue'}];
	//TODO: Get token out of here
	socket.get('/task/contest', {token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiaWF0IjoxNDE0Mjg0MTQ0fQ.enUSSR4pWilw5hyGEc1yWZf5ZqyvK_BBqPFxchMk14o'} ,function(data){
		$scope.subjects.push.apply($scope.subjects, data);
	});

	$scope.trustAsHtml = function(value) {
		return $sce.trustAsHtml(value);
	};
	$scope.submitClarification = function(){
		//TODO: Remove token from data
		$scope.clarification.token = angular.fromJson(LocalService.get('auth_token')).token;
		socket.post('/clarification', $scope.clarification, function(){
			$scope.clarification = {};
			$state.go('team.clarifications');
		});
	}
}]);