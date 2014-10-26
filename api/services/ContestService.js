'use strict';

module.exports = {
	/**
	*
	* function to find the active contest for a given user
	*
	**/
	getActiveContest: function(userId, callback){
		var curTime = Date().toISOString();
		User.findById(userId).populate('contests').exec(function(err, user){
			if(err){
				callback(err);
				return;
			}
			user.contests.forEach(function(contest, index){
				if(contest.startTime < curTime && curTime < contest.unfreezeTime){
					callback(null, contest);
					return;
				}
			});
			callback("No active contest found for this user");
		});
	}
	
}