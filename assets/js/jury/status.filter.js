angular.module('mooseJs.jury')
	.filter('statusFilter', function(){
		return function(input){
			if(!input){
				return 'Pending';
			}
			var statues = {
				'done': 'Waiting to be verified',
				'pending': 'Pending',
				'judging': 'Judging',
				'verified': 'Verified'
			}
			return statues[input];
		}
	});