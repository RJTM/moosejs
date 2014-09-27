angular.module('mooseJs.admin')
	.controller('admin.SitesController',function($scope, Site){
		$scope.sites = Site.query();
	})