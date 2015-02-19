'use strict';

angular.module('mooseJs.admin')
	.controller('admin.JudgehostsController', ["$scope", "socket", "$http", function($scope, socket, $http){
		socket.get('/judgehost', function(data){
			$scope.judgehosts = data;
		});

		$scope.delete = function(index){
			swal({
				title: "Are you sure?",
				text: "This process cannot be undone!",
				type: "warning",
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "Yes, delete it!",
				closeOnConfirm: false
			},function(){
				var judgehost = $scope.judgehosts[index];
				$http.delete('/judgehost/'+judgehost.id).success(function(data){
					swal('Deleted', 'Judgehost deleted', 'success');
					$scope.judgehosts.splice(index,1);
				});
			});
		}

		$scope.key = function(index){
			var judgehost = $scope.judgehosts[index];
			socket.get('/judgehost/token/'+judgehost.id, function(data){
				$scope.token = data.token;
			});
		}
	}]);