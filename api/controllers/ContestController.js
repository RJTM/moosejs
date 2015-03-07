/**
 * ContestController
 *
 * @description :: Server-side logic for managing Contests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	/**
	*
	* Sets up a contest using the contest creation wizard
	*
	**/
	
	fromJson: function(req, res){
		ContestService.saveFromJson(req.params.all(), function(err, result){
			if(err) return res.serverError(err);
			return res.json(result);
		});
	},

	/**
	*
	* Sets up a contest using the zip uploader tool
	*
	**/
	
	fromZip: function(req, res){
		var id = req.param('id');
		var file = req.file('input');
		ContestService.saveFromZip(id, file, function(err, result){
			if(err) return res.serverError(err);
			return res.json(result);
		});
	},

	user: function(req, res){
		var now = new Date();
		var user;
		if(req.token){
			user = req.token.id;
		}else{
			user = -1;
		}
		User.findOne(user).populate('contests').exec(function(err, user){
			if(err) return res.serverError(err);

			if(user && user.role === 'team'){
				Contest.subscribe(req.socket, user.contests);
				var upcomingContests = [];
				async.filterSeries(user.contests, function(contest, callback){
					callback(new Date(contest.unfreezeTime) > now);
				}, function(upcomingContests){
					async.sortBy(upcomingContests, function(contest, callback){
						callback(null, contest.startTime);
					}, function(err, results){
						results.length = Math.min(1, results.length);
						res.json(results);
					});
				});

			}else{
				Contest.find({ where: { unfreezeTime: { '>': new Date() } }, limit: 3, sort: 'startTime ASC' }).exec(function(err, contests){
					if(err){
						return res.serverError(err);
					}
					if(req.isSocket){
						Contest.subscribe(req.socket, contests);
					}
					res.json(contests);
				});
			}
		});
	},

	release: function(req, res){
		var contestId = req.param('id');
		Contest.update({id: contestId}, { unfreezeTime: new Date() }).exec(function(err, contest){
			if(err) return res.serverError;
			Contest.publishUpdate(contest[0].id);
			sails.sockets.broadcast('resultsRelease', 'release', {  contest: contest[0].id });
			res.ok();
		});
	},
};

