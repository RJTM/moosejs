'use strict';

var app = angular.module('mooseJs.common');

app.factory('Site', function($resource) {
  return $resource("/site/:id", {id: '@id'}, {
      update: {
          method: 'PUT',
      }
    });
});