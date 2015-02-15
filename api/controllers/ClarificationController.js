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
		
		// get the user logged first
		User.findOne(req.token.id).exec(function(err, user){
			if(err)
				return res.serverError(err);

			if(user.role === 'jury')
				ClarificationService.createFromJury(clar, user, function(error, result){
					if(error)
						return res.serverError(error);
					return res.json(result);
				});
			else
				ClarificationService.createFromTeam(clar, user, function(error, result){
					if(error)
						return res.serverError(error);
					return res.json(result);
				});
		});
	}

};

