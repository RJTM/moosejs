'use strict';

module.exports = {
	/**
	*
	* function to find the active contest for a given user
	*
	**/
	getActiveContest: function(userId, callback){
		var curTime = Date().toISOString();
		User.findById(userId).populate('contests').exec(function(err, user){
			if(err){
				callback(err);
				return;
			}
			user.contests.forEach(function(contest, index){
				if(contest.startTime < curTime && curTime < contest.unfreezeTime){
					callback(null, contest);
					return;
				}
			});
			callback("No active contest found for this user");
		});
	},

	saveFromJson: function(contest, callback){
		contest.set = true;
		contest.tasks.forEach(function(task, index){
			task.subtasks.forEach(function(subtask, subIndex){
				var testcasesN = subtask.testcases;
				subtask.testcases = [];
				for(var i=0;i<testcasesN;i++){
					subtask.testcases.push({
						inputFile: '',
						outputFile: ''
					});
				}
			});
		});
		Contest.update({ id: contest.id }, contest).exec(callback);
	}
	
}