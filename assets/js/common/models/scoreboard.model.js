'use strict';

var app = angular.module('mooseJs.common');

app.factory('Scoreboard', ["$resource", function($resource) {
	return $resource("/scoreboard/:id", {id: '@id'}, {
		update: {
			method: 'PUT',
		}
	});
	
	
}]);