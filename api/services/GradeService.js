module.exports = {

	fillGradeData: function(grade, cb){
		async.parallel([
			function(callback){
				User.findOne({id: grade.run.owner}).exec(callback);
			},
			function(callback){
				Subtask.find({task: grade.task.id}).populate('testcases').exec(callback);
			}
			], function(err,results){
				if(err){
					cb(err);
					return;	
				} 
				grade.run.owner = results[0];
				grade.subtasks = results[1];

				cb(null,grade);
			});
	},

	getRunResult: function(run, cb){
		var finalResponse = {};
		Run.findOne({id: run}).populate('grades').populate('task').exec(function(err, res){
			finalResponse.run = res.toJSON();
			finalResponse.grade = res.grades[res.grades.length-1];
			finalResponse.task = res.task;
			delete finalResponse.run.grades;
			delete finalResponse.run.task;
			Subtask.find({task: finalResponse.task.id}).populate('testcases').exec(function(err,res){
				finalResponse.subtasks = res;
				async.each(finalResponse.subtasks, function(subtask, finishedSubtask){
					async.each(subtask.testcases, function(testcase, finishedTestcase){
						TestcaseGrade.findOne({testcase: testcase.id, grade: finalResponse.grade.id}).exec(function(err,res){
							testcase.testcasegrade = res;
							finishedTestcase(err);
						});
					}, function(err){
						finishedSubtask(err);
					})
				}, function(err){
					if(err){
						cb(err);	
					} 
					cb(null,finalResponse);
				});
			});
			
		});
	}

};