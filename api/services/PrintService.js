'use strict';

module.exports = {
	/*
		Method used to upload files to be printed
		params : user, the owner of the file
				 file, file to be printed
				 callback, function called after upload complete
	 */
	uploadSourceFile : function(user, file, callback){
		User.findOne(user).exec(function(err, theUser){
			if(err){
				callback(err);
				return;
			}
			var username = URLService.toSlug(theUser.username);

			file.upload({
				dirname : sails.config.appPath + "/jobs/" + username + "/"
			}, function(err, up){
				if(err){
					callback(err);
					return;
				}
				var filename = /[^/]*$/.exec(up[0].fd)[0];
				var url = username + "/"+filename;

				Print.create({
					user : theUser,
					source : url
				}).exec(function(err, printJob){
					callback(err, printJob);
				});
			});
		})
	}
}