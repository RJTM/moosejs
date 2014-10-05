'use strict';

angular.module('mooseJs.common')
.controller('UpdateController', ["$scope", "$state", "$stateParams", "User", function($scope, $state, $stateParams, User){
	
	$scope.user = User.get({ id : $stateParams.id});
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
	
}]);