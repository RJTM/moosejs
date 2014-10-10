'use strict';
angular.module('mooseJs.common')
	.factory('socket', function($rootScope, Auth, LocalService){
		return {
			on: function(eventName, callback){
				io.socket.on(eventName, function(){
					var args = arguments;
					$rootScope.$apply(function(){
						callback.apply(io.socket, args);
					});
				});
			},
			get: function(url, data, callback){
				if(!callback){
					if(typeof data == 'function' || typeof data == 'undefined'){
						callback = data;
						data = {};
					}
				}

				if(Auth.isAuthenticated()){
					//data.token = JSON.parse(LocalService.get('auth_token')).token;
				}
				io.socket.get(url,data, function(){
					var args = arguments;
					$rootScope.$apply(function(){
						if(callback){
							callback.apply(io.socket, args);
						}
					});
				});
			},
			post: function(url, data, callback){
				if(!callback){
					if(typeof data == 'function' || typeof data == 'undefined'){
						callback = data;
						data = {};
					}
				}

				if(Auth.isAuthenticated()){
					//data.token = JSON.parse(LocalService.get('auth_token')).token;
				}
				io.socket.post(url,data, function(){
					var args = arguments;
					$rootScope.$apply(function(){
						if(callback){
							callback.apply(io.socket, args);
						}
					});
				});
			}
		}
	});