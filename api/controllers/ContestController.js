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
				user.contests.forEach(function(contest){
					if(new Date(contest.unfreezeTime) > now)
						upcomingContests.push(contest);
				});
				upcomingContests.sort(function(a,b){
					var startTimeA = new Date(a.startTime);
					var startTimeB = new Date(b.startTime);
					if(startTimeA < startTimeB) return -1;
					if (startTimeA > startTimeB) return 1;
					return 0;
				});
				upcomingContests.length = Math.min(3,upcomingContests.length);
				res.json(upcomingContests);
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
	}
};

