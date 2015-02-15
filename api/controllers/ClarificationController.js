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
		Clarification.find({ or: [
				{ toAll: true},
				{ owner: req.token.id}
			]}).exec(function(err, clarifications){
				Clarification.subscribe(req.socket, clarifications);
				Clarification.watch(req.socket);
				return res.json(clarifications);
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
		Clarification.create(clar).exec(function(err, result){
			if(err){
				return res.serverError(err);
			}

			Clarification.findOne(result.id).populate('contest', 'owner').exec(function(err, clarification){
				if(err)
					return res.serverError(err);

				Clarification.publishCreate(clar);
				return res.json(clar);
			});
		});
	}

};

