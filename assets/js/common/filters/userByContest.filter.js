angular.module('mooseJs.common')
.filter('userByContestFilter', function() {
	return function(items, properties) {
		var filtered = [];
		for(var i = 0, n=items.length; i<n; i++){
			var item = items[i];
			// check for exceptions first
			var ok = (item.allowBypass && properties.allowBypass);
			if(ok)
				filtered.push(item);
			else{
				// check if the user is registered for this contest
				var contest = properties.contest;
				for(var j=0, m=item.contests.length; j<m; j++){
					if(item.contests[j].id === contest){
						filtered.push(item);
						break;
					}
				}
			}
		}
		return filtered;
	}
});