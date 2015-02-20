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
					if(err)return res.serverError(err);
					return res.json(tasks);
				});
			}else{
				return res.json([]);				
			}
		});
	},

	rejudge: function(req, res){
		var id = req.param('id');
		JudgeService.reJudgeTask(id);
		return res.ok();
	},

	statement: function(req, res){
		var statement = req.file('statement');
		var taskId = req.param('task');
		if(!statement || !taskId){
			return res.json(400, {msg: 'Parameters missing'});
		}
		Task.findOne(taskId).populate('contest').exec(function(err, task){
			var contestName = task.contest.id;
			var taskName = URLService.toSlug(task.code);
			var dirName =  contestName+"/"+taskName+"/";

			statement.upload({
				dirname: sails.config.appPath + "/assets/statements/" + dirName,
				maxBytes: Number.MAX_VALUE,
				saveAs: taskName + '.pdf'
			}, function(err,up){
	                if(err){ 
	                	return res.serverError(err);
	                }
	                return res.json({statement: 'dirname/'+taskName+'.pdf'});
            	});
		});
	}
};

