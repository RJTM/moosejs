angular.module('mooseJs.admin')
	.controller('SitesController',function($scope, Site){
		$scope.sites = Site.query();
	})