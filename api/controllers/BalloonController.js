/**
 * BalloonController
 *
 * @description :: Server-side logic for managing balloons
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create : function(req, res){
		var user = req.param('user');
		var color = req.param('color');

		Balloon.create({
			user : user,
			color : color
		}).exec(function(err, result){
			if(err)
				return res.serverError(err);
			Balloon.findOne({id : result.id}).populate('user').exec(function(err, balloon){
				if(err){
					Balloon.publisCreate(result);
					return res.serverError(err);
				}
				Balloon.publishCreate(balloon);
				return res.json(balloon);
			});
		});
	}
	
};

