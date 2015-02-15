angular.module('mooseJs.common')
.filter('subjectFilter', function() {
	return function(items, properties) {
		var filtered = [];
		angular.forEach(items, function(item) {
			// check for exceptions first
			var ok = (item.allowBypass && properties.allowBypass) ||
				(properties.contest && item.contest.id === properties.contest &&
				 item.name.toLowerCase().indexOf(properties.name.toLowerCase()) !== -1);

			// add it if it's ok
			if(ok)filtered.push(item);
		});
		return filtered;
	};
});