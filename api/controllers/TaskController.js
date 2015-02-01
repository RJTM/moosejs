/**
 * TaskController
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	/**
	*
	* Creates a new task
	*
	**/
	
	create: function(req, res){
		var task = req.allParams();
		Task.create(task).exec(function(err, task){
			if(err) return res.json(400, err);

			ScoreboardService.addTask(task);
			return res.json(task);
		});
	},

	/**
	*
	* Gets the tasks available for submissions to a user
	*
	**/
	
	contest: function(req, res){
		var user = req.token.id;
		ContestService.getActiveContest(user, function(err, contest){
			if(contest){
				Task.find({contest: contest.id}).exec(function(err, tasks){
					//TODO: Handle Error
					return res.json(tasks);
				});
			}else{
				return res.json([]);				
			}
		});
	}
};

