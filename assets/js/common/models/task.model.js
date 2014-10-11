'use strict';

var app = angular.module('mooseJs.common');

app.factory('Task', ["$resource", function($resource) {
  return $resource("/task/:id", {id: '@id'}, {
      update: {
          method: 'PUT',
      }
    });
}]);