'use strict';
angular.module('mooseJs')
    .controller('RoleController', function($state, CurrentUser, RoleDestination){
        var role = CurrentUser.user().role;
        $state.go(RoleDestination[role]);
    }); 