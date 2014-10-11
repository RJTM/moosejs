'use strict';

module.exports = {
	addUser: function(user){
		Task.find().exec(function(err, tasks){
			if(err){ 
				sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
			}
			async.each(tasks, function(task, callback){
				Scoreboard.create({ contest: task.contest, user: user.id, task: task.id}).exec(function(err, res){
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
		User.find({role: ['jury','team']}).exec(function(err, users){
			if(err){
				sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
			}
			async.each(users, function(user, callback){
				Scoreboard.create({ contest: task.contest, user: user.id, task: task.id}).exec(function(err, res){
					callback(err);
				})
			}, function(err){
				if(err){ 
					sails.log.err("Error building scoreboard. Please refresh scoreboard"); return;
				}
			});
		});
		
	}
}