'use strict';

module.exports = {
	/*
		Service to create Clarifications
		Params : clar
	 */
	create : function(clar, cb){
		Clarification.create(clar).exec(function(err, result){
			if(err){
				cb(err);
				return;
			}

			Clarification.findOne(result.id).populate('contest')
			.populate('owner').populate('jury')
			.exec(function(err, clarification){
				if(err)
					cb(err);

				Clarification.publishCreate(clarification);
				cb(null, clarification);
			});
		});
	},

	createFromJury : function(clar, user, cb){
		if(!clar.contest){
			cb({ 
				status : 'error',
				error : "Contest required to send clarification"
			});
			return;
		}

		clar.jury = user;
		module.exports.create(clar, cb);
	},

	createFromTeam : function(clar, user, cb){
		// get the active contest for this user
		ContestService.getActiveContest(user.id, function(err, contest){
			if(contest){
				clar.contest = contest;
				clar.owner = user;
				module.exports.create(clar, cb);
			}else
				cb("No contest found for this user");
		});
	}
}