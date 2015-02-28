'use strict';

angular.module('mooseJs.common')
.controller('common.RegisterController', ["$scope", "$state", "User", function($scope, $state, User){
	
	$scope.user = {
		username : '',
		name : '',
		email : '',
		role : 'team',
		password : '',
		members: ''
	};
	$scope.errors = [];
	$scope.register = function(){
		$scope.errors = [];
		User.save($scope.user, function(data){
			swal('Done!', 'User registered', 'success');
		    $state.go('admin.users');
		},
		function(error){
			console.log(error);
			$scope.errors.push({message: error.data.summary});	
		});
	};
	
}]);