'use strict';

var app = angular.module('mooseJs.common');

app.factory('Run', function($resource) {
	return $resource("/run/:id", {id: '@id'}, {
		update: {
			method: 'PUT',
		}
	});
});