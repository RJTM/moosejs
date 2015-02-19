'use strict';

angular.module('mooseJs.admin')
	.controller('admin.LanguageController', ["$scope", "socket", "$state", "$stateParams", function($scope, socket, $state, $stateParams){
		
		socket.get('/language/'+$stateParams.id, function(data){
			$scope.language = data;
		});

		$scope.save = function(){
			socket.post('/language/'+$stateParams.id, $scope.language, function(data){
				swal('Saved', 'Changes to the language saved', 'success');
				$state.go('admin.languages');
			});
		}
	}]);