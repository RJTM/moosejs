'use strict';

var app = angular.module('mooseJs.common');

app.factory('Contest', function($resource) {
  return $resource("/contest/:id", {id: '@id'}, {
      update: {
          method: 'PUT',
      }
    });
});