'use strict';

angular.module('mooseJs')
.controller('RegisterController', function($scope, $state, User){
	
	$scope.user = {
		username : '',
		name : '',
		email : '',
		role : 'team',
		password : '',
		confirmPassword : ''
	};
	$scope.errors = [];
	$scope.register = function(){
		$scope.errors = [];
        User.save($scope.user, 
        function(data){
            $state.go('home');
	    },
        function(error){
            $scope.errors.push({message: error.data.summary});
        });
    };
	
});