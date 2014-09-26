'use strict';

angular.module('mooseJs.admin')

            .config(function($stateProvider, AccessLevels){

	$stateProvider
    
                .state('admin', {
                    url : '/admin',
                    templateUrl : 'templates/admin/layout.html',
                    abstract : true,
                    data : {
                        access : AccessLevels.admin
                    }
                })

                .state('admin.home', {
                    url : '/home',
                    templateUrl : 'templates/admin/home.html',
                    data: {
                        ncyBreadcrumbLabel: 'Home'
                    }
                })
            
                .state('admin.contests', {
                    url: '/contests',
                    templateUrl: 'templates/admin/contests.html',
                    data: {
                        ncyBreadcrumbLabel: 'Contests',
                        ncyBreadcrumbParent: 'admin.home'
                    }
                })  

                .state('admin.register', {
                    url : "/register",
                    templateUrl : 'templates/common/register.html',
                    controller : 'RegisterController',
                    data : {
                        access : AccessLevels.admin
                    }
                })
});