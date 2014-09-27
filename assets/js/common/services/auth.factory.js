'use strict';

var mooseJs = angular.module('mooseJs.common');

mooseJs.factory('Auth', function($http, LocalService, AccessLevels, User, CurrentUser) {
	return {
		authorize: function(access) {
			if (access === AccessLevels.team) {
				return this.isAuthenticated();
			}else if (access === AccessLevels.jury){
				return this.isJury();
			}else if (access === AccessLevels.admin){
				return this.isAdmin();
			}else if(access === AccessLevels.staff){
				return this.isStaff();
			} else {
				return true;
			}
		},
		isAuthenticated: function() {
			return LocalService.get('auth_token');
		},
		isJury: function() {
			if(LocalService.get('auth_token')){
				var user = CurrentUser.user();
				return user.role === 'jury';
			}
		},
		isAdmin: function() {
			if(LocalService.get('auth_token')){
				var user = CurrentUser.user();
				return user.role === 'admin';
			}
		},
		isStaff: function() {
			if(LocalService.get('auth_token')){
				var user = CurrentUser.user();
				return user.role === 'staff';
			}
		},
		login: function(credentials) {
			var login = $http.post('/user/authenticate', credentials);
			login.success(function(result) {
				LocalService.set('auth_token', JSON.stringify(result));
			});
			return login;
		},
		logout: function() {
	        // The backend doesn't care about logouts, delete the token and you're good to go.
	       	LocalService.unset('auth_token');
	      }
    }
  });

mooseJs.factory('AuthInterceptor', function($q, $injector) {
	var LocalService = $injector.get('LocalService');

	return {
		request: function(config) {
			var token;
			if (LocalService.get('auth_token')) {
				token = angular.fromJson(LocalService.get('auth_token')).token;
			}
			if (token) {
				config.headers.Authorization = 'Bearer ' + token;
			}
			return config;
		},
		responseError: function(response) {
			if (response.status === 401 || response.status === 403) {
				LocalService.unset('auth_token');
				$injector.get('$state').go('public.login');
			}
			return $q.reject(response);
		}
	}
})
.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInterceptor');
});