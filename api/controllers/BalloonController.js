/**
 * BalloonController
 *
 * @description :: Server-side logic for managing balloons
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create : function(req, res){
		var user = req.param('user');
		var task = req.param('task');

		Balloon.create({
			user : user,
			task : task
		}).exec(function(err, balloon){
			if(err)
				return res.serverError(err);
			Balloon.findOne({id : balloon.id}).populate('user').populate('task').exec(function(err, balloonFull){
				if(err){
					Balloon.publishCreate(balloon);
					return res.serverError(err);
				}
				Balloon.publishCreate(balloonFull);
				return res.json(balloonFull);
			});
		});
	}
	
};

