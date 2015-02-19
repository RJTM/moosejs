angular.module('mooseJs.admin')
	.controller('admin.UsersController', ["$scope", "User", "$http", function($scope, User, $http){
		$scope.users = User.query();

		$scope.delete = function($index){
			swal({
				title: 'Are you sure you want to delete this user?',
				text: 'This process cannot be undone',
				type: 'warning',
				showCancelButton : true,
				confirmButtonText : 'Yes, delete it',
				closeOnConfirm : false,
			}, function(){
				$http.delete('/user/'+ $scope.users[index].id, function(data){
					swal('Deleted!', 'This user has been deleted', 'success');
				});
			});
		};
	}])