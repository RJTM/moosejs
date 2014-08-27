app.factory('Auth', function($http, LocalService, AccessLevels){
	return {
		authorize : function(access){
			if(access === AccessLevels.user){
				return this.isAuthenticated();
			}else{
				return true;
			}
		}
	}
});