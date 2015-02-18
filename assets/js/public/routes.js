'use strict';

var mooseJs = angular.module('mooseJs.public');

mooseJs.config(["$stateProvider", "$urlRouterProvider", "AccessLevels", function($stateProvider, $urlRouterProvider, AccessLevels){
	$stateProvider

        .state('public',{
            url: '/public',
            templateUrl: 'templates/public/layout.html',
            abstract: true,
            data: {
                access: AccessLevels.anon
            }
        })
        
        .state('public.home', {
            url: "/home",
            controller: 'public.HomeController',
            templateUrl: 'templates/public/home.html',
        })
    
        .state('public.login', {
            url: "/login",
            templateUrl: 'templates/common/login.html',
            controller: 'LoginController'
        })
}]);