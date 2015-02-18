/**
 * ScoreboardController
 *
 * @description :: Server-side logic for managing Scoreboards
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res){
		var userId;
		if(req.isSocket){
			sails.sockets.join(req.socket, 'resultsRelease');
		}
		if(req.token){
			userId = req.token.id;
			User.findOne(userId).exec(function(err, user){
				if(err) return res.serverError(err);
				if(user.role === 'jury'){
					var contestId = req.param('contest');
					if(req.param('public') && req.param('public') === true){
						ScoreboardService.findScoreboardPublic(req, contestId, function(err, scoreboard){
							if(err) return res.serverError(err);
							return res.json(scoreboard);
						});
					}else{
						ScoreboardService.findScoreboardJury(req, contestId, function(err, scoreboard){
							if(err) return res.serverError(err);
							return res.json(scoreboard);
						});
					}
				}else if(user.role === 'team'){
					ScoreboardService.findScoreboardTeam(req, userId, function(err, scoreboard){
						if(err) return res.serverError(err);
						return res.json(scoreboard);
					});
				}else{
					var contestId = req.param('contest');
					ScoreboardService.findScoreboardPublic(req, contestId, function(err, scoreboard){
						if(err) return res.serverError(err);
						return res.json(scoreboard);
					});
				}
			});
		}else{
			var contestId = req.param('contest');
			ScoreboardService.findScoreboardPublic(req, contestId, function(err, scoreboard){
				if(err) return res.serverError(err);
				return res.json(scoreboard);
			});
		}
	}	
};

