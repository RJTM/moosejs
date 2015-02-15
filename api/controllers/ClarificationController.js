/**
 * ClarificationController
 *
 * @description :: Server-side logic for managing Clarifications
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	/**
	*
	* Returns all the clarifications of the user calling this action
	*
	**/
	
	user: function(req, res){
		// get the active contest for this user
		ContestService.getActiveContest(req.token.id, function(err, contest){
			if(contest){
				Clarification.find({ or: [
					{ toAll: true, contest : contest.id},
					{ owner: req.token.id, contest : contest.id}
				]}).exec(function(err, clarifications){
					Clarification.subscribe(req.socket, clarifications);
					Clarification.watch(req.socket);
					return res.json(clarifications);
				});

			}else
				return res.json([]);
		});
	},

	/**
	*
	* Creates a new clarification
	*
	**/
	
	create: function(req,res){
		var clar = req.allParams();
		clar.owner = req.token.id;

		// if it already have contest (Jury assumed)
		if(clar.contest){
			ClarificationService.create(clar, function(err, result){
				if(err)
					return res.serverError(err);
				return res.json(result);
			});
		}else{
			User.findOne(req.token.id).exec(function(err, user){
				if(err)
					return res.serverError(err);

				if(user.role !== 'team')
					return res.serverError('User not allowed to create clarifications without contest');

				// get the active contest for this user
				ContestService.getActiveContest(req.token.id, function(err, contest){
					if(contest){
						clar.contest = contest;
						ClarificationService.create(clar, function(err, result){
							if(err)
								return res.serverError(err);
							return res.json(result);
						});
					}
				});
			});
		}
	}

};

