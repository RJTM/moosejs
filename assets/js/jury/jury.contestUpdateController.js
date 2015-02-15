'use strict';

angular.module('mooseJs.jury')
	.controller('jury.ContestUpdateController', ["$scope","$state","$stateParams", "socket",  function($scope, $state, $stateParams, socket){
		socket.get('/contest/'+$stateParams.id, function(data){
			console.log(data);
			$scope.contest = data;
		});

		$scope.update = function(){
			swal({
				title : 'Update Contest',
				text : 'Are you sure?',
				type : 'warning',
				showCancelButton : true,
				confirmButtonText : 'Yes, update it',
				closeOnConfirm : true
			}, function(){
				socket.post('/contest/'+$scope.contest.id, $scope.contest, function(data){
					swal('Done!', 'Clarification sent', 'success');
					$state.go('jury.contests');
				});
			});
		};
	}
]);