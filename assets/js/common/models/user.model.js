'use strict';

var app = angular.module('mooseJs.common');

app.factory('User', function($resource) {
  return $resource("/user/:id", {id: '@id'}, {
      update: {
          method: 'PUT',
      }
    });
});