'use strict';

module.exports = {
	/*
		Service to create balloons
		Params : user, task
	 */
	create : function(user, task, cb){
		Balloon.create({ 
			user : user,
			task : task
		}).exec(function(err, balloon){
			if(err){
				sails.log.error(err);
				return;
			}
			Balloon.findOne(balloon.id).populate('user').populate('task').exec(function(error, balloonFull){
				if(error){
					sails.log.error(err);
					Balloon.publishCreate(balloon);
					return;
				}
				Balloon.publishCreate(balloonFull);
			});
		});
	}
}