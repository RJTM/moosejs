'use strict';

angular.module('mooseJs.common')
.controller('common.PasswordController', function($scope, $state, socket){
	$scope.changePassword = function(){
		socket.post('/user/password', $scope.user, function(data){
			swal('Done', 'Password updated successfuly', 'success');
		});
	}
});