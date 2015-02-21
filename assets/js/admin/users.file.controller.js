angular.module('mooseJs.admin')
	.controller('admin.UsersFileController', ["$scope", "$state", "$http", function($scope, $state, $http){
		
		$scope.$watch('input', function(value){
			if(!value) return;
			var reader = new FileReader();

			reader.onload = function(evt){
				$scope.$apply(function(){				
					$scope.json = evt.target.result;
				});
			};

			reader.readAsText(value[0]);
		});

		$scope.upload = function(){
			$scope.errors = [];
			if(!$scope.json){
				$scope.errors.push('Please select a file');
				return;
			}
			$http.post('/user/json', {json: JSON.parse($scope.json)}).success(function(data){
				swal('Uploaded', 'Users created', 'success');
			});
		}
	}]);