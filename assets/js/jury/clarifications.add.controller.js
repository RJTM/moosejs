'use strict';

angular.module('mooseJs.jury')
.controller('jury.ClarificationsAddController', ["$scope", "$sce", "$state", "socket", "LocalService", "CurrentUser", function($scope, $sce, $state, socket, LocalService, CurrentUser){
	$scope.subjects = [{name: 'General Issue', allowBypass : true}];
	socket.get('/task', function(data){
		$scope.subjects.push.apply($scope.subjects, data);
	});

	$scope.recipients = [{name: 'Public', isPublic : true, allowBypass : true}]
	socket.get('/user', { role: 'team'}, function(data){
		$scope.recipients.push.apply($scope.recipients, data);
	});

	$scope.contests = [];
	socket.get('/contest', {}, function(data){
		$scope.contests.push.apply($scope.contests, data);
	});

	$scope.trustAsHtml = function(value) {
		return $sce.trustAsHtml(value);
	};

	$scope.submitClarification = function(){
		swal({
			title: 'Send Clarification Response',
			text: 'Are you sure?',
			type: 'warning',
			showCancelButton : true,
			confirmButtonText : 'Yes, send it',
			closeOnConfirm : false,
		}, function(){
			if($scope.clarification.owner.isPublic){
				$scope.clarification.toAll = true;
				$scope.clarification.owner = CurrentUser.user().id;
			}else{
				$scope.clarification.toAll = false;
			}

			$scope.clarification.subject = $scope.clarification.subject.name;
			
			socket.post('/clarification',
				$scope.clarification,
				function(data, jwsres){
					if(jwsres.statusCode === 200){
						swal('Done!', 'Clarification sent', 'success');
						$state.go('jury.clarifications');
					}else
						swal('Error', 'Clarification not sent', 'error');
				});
		});
	}
	$scope.clarification = {
		jury : CurrentUser.user().id
	};
}]);