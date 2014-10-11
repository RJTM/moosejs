'use strict';

module.exports = {
	addUser: function(user, contest){
		Task.find({ contest: contest }).exec(function(err, tasks){
			if(err){ 
				sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
			}
			async.each(tasks, function(task, callback){
				Scoreboard.create({ contest: task.contest, user: user, task: task.id}).exec(function(err, res){
					Scoreboard.publishCreate(res);
					callback(err);
				});
			}, function(err){
				if(err){ 
					sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
				}
			});
		});
	},
	addTask: function(task){
		Contest.findOne({ id: task.contest}).populate('users').exec(function(err,contest){
			if(err){
				sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
			}
			async.each(contest.users, function(user, callback){
				if(user.role === 'jury' || user.role === 'team'){
					Scoreboard.create({ contest: task.contest, user: user.id, task: task.id}).exec(function(err, res){
						Scoreboard.publishCreate(res);
						callback(err);
					});
				}
			}, function(err){
				if(err){ 
					sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
				}
			});
		});
	},
	update: function(grade, veredicts){
		// GradeService.getRunResult(grade.run, function(err, response){
		// 	if(err){
		// 		sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
		// 	}
		// 	Scoreboard.findOne({user: response.run.owner.id, task: response.task.id}).exec(function(err, row){
		// 		if(err){
		// 			sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
		// 		}
		// 		row.submissions += 1;
		// 		row.pending = Math.max(0, row.pending-1);
		// 		if(veredict)
		// 	});
		// });
	}
}