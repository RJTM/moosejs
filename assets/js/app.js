'use strict';

// Declare app level module which depends on filters, and services
angular.module('mooseJs', [
  'ngRoute',
  'mooseJs.filters',
  'mooseJs.services',
  'mooseJs.directives',
  'mooseJs.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'templates/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'templates/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);