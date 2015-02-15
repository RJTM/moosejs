'use strict';

angular.module('mooseJs.admin')
	.controller('admin.LanguagesController', function($scope, socket, $http){
		socket.get('/language', function(data){
			$scope.languages = data;
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
				var language = $scope.languages[index];
				$http.delete('/language/'+language.id).success(function(data){
					swal('Deleted', 'Language deleted', 'success');
					$scope.languages.splice(index,1);
				});
			});
		}
	});