angular.module('mooseJs.admin')
	.controller('admin.ContestsController', ["$scope", "Contest", "$rootScope", function($scope, Contest, $rootScope){
		$scope.contests = Contest.query();
		$scope.date = new Date();

		$scope.updating = false;

		$scope.save = function(){
			if(!$scope.contest || $scope.contest.name === '') return;
			Contest.save($scope.contest, function(data){
				$scope.contests.push(data);
			});
		}

		$scope.edit = function(index){
			$scope.updating = true;
			$scope.contest = $scope.contests[index];
		}

		$scope.cancel = function(){
			$scope.updating = false;
			$scope.contest = {};
		}

		$scope.update = function(){
			Contest.update($scope.contest);
			swal("Changes saved!", "Your changes for this contest have been successfuly saved", "success");
			$scope.cancel();
		}

		function deleteContest(index){
			Contest.delete({ id: $scope.contests[index].id});
			$scope.contests.splice(index,1);
			swal("Deleted!", "The contest has been deleted", "success");
			$rootScope.$broadcast('contestUpdated');
		}

		$scope.delete = function(index){
			swal({
				title: "Are you sure?",
				text: "This process cannot be undone!",
				type: "warning",
				showCancelButton: true,   
				confirmButtonColor: "#DD6B55",   
				confirmButtonText: "Yes, delete it!",
				closeOnConfirm: false
			},
			function(){
				if($scope.contests[index].set){
					swal({
						title: "This contest is already configured",
						text: "If you do this, all the work is going to be lost",
						type: 'warning',
						showCancelButton: true,   
						confirmButtonColor: "#DD6B55",   
						confirmButtonText: "Yes, delete it!",
						closeOnConfirm: false  
					},
					function(){
						deleteContest(index);
					});
				}else{
					deleteContest(index);
				}
				
			});
		}

	}]);