'use strict';

var app = angular.module('mooseJs.common');

app.factory('Contest', ["$resource", function($resource) {
  return $resource("/contest/:id", {id: '@id'}, {
      update: {
          method: 'PUT',
      }
    });
}]);