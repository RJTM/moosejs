'use strict';

angular.module('mooseJs.admin')
	.controller('admin.NewLanguageController', function($scope, socket, $state){
		
		$scope.save = function(){
			socket.post('/language', $scope.language, function(data){
				swal('Saved', 'New language saved', 'success');
				$state.go('admin.languages');
			});
		}
	});