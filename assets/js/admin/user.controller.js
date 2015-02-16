angular.module('mooseJs.admin')
	.controller('admin.UserController', function($scope, socket, $stateParams, $state){
		
		socket.get('/user/' + $stateParams.id, function(data){
			$scope.user = data;
		});

		$scope.save = function(){
			socket.post('/user/' + $stateParams.id, $scope.user, function(data){
				swal('Saved', 'User updated', 'success');
				$state.go('admin.users');
			});
		};
	});