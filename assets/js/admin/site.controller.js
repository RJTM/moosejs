angular.module('mooseJs.admin')
	.controller('admin.SitesController',["$scope", "Site", function($scope, Site){
		$scope.sites = Site.query();
	}])