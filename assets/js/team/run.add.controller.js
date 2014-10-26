'use strict';

angular.module('mooseJs.team')
.controller('team.RunAddController', ["$scope", "socket", "FileUploader", function($scope, socket, FileUploader){
	//TODO: Get token out of here
	socket.get('/task/contest', {token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwiaWF0IjoxNDE0Mjg0MTQ0fQ.enUSSR4pWilw5hyGEc1yWZf5ZqyvK_BBqPFxchMk14o'} ,function(data){
		$scope.tasks = data;
	});

	$scope.submit = function(){
		swal({
			title: 'Submitting solution for '+$scope.submit.task,
			text: 'Are you sure?',
			type: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, submit',
			closeOnConfirm: false
		});
	}
}]);