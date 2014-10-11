'use strict';
angular.module('mooseJs.common')
    .controller('RoleController', ["$state", "CurrentUser", "RoleDestination", function($state, CurrentUser, RoleDestination){
        var role = CurrentUser.user().role;
        $state.go(RoleDestination[role]);
    }]); 