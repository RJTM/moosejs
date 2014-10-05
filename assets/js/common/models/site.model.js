'use strict';

var app = angular.module('mooseJs.common');

app.factory('Site', ["$resource", function($resource) {
  return $resource("/site/:id", {id: '@id'}, {
      update: {
          method: 'PUT',
      }
    });
}]);