'use strict';
var getResultPriority = function(cb){
	var result = {
		'memory-limit': '99',
		'output-limit': '99',
		'run-error': '99',
		'time-limit': '99',
		'wrong-answer': '30',
		'presentation-error': '20',
		'no-output': '10',
		'accepted': '1'
	}
	cb(result);
	return;
}

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
		Run.findOne({id: run}).populate('grades').populate('task').populate('owner').exec(function(err, res){
			if(err || !res){
				cb(err);
				return;
			}
			finalResponse.run = res.toJSON();
			finalResponse.grade = res.grades[res.grades.length-1];
			finalResponse.task = res.task;
			delete finalResponse.run.grades;
			delete finalResponse.run.task;
			var resultPriority;
			getResultPriority(function(resultPrio){
				resultPriority = resultPrio;

				Subtask.find({task: finalResponse.task.id}).populate('testcases').exec(function(err,res){
					if(err || !res){
						cb(err);
						return;
					}
					finalResponse.subtasks = res;
					async.each(finalResponse.subtasks, function(subtask, finishedSubtask){
						async.each(subtask.testcases, function(testcase, finishedTestcase){
							TestcaseGrade.findOne({testcase: testcase.id, grade: finalResponse.grade.id}).exec(function(err,res){
								if(err || !res){
									cb(err);
									return;
								}
								testcase.testcasegrade = res;
								finishedTestcase(err);
							});
						}, function(err){
							var topPrio = 0;
							var tempResult = 'none';
							for(var i = 0; i<subtask.testcases.length; i++){
								if(resultPriority[subtask.testcases[i].testcasegrade.result] > topPrio){
									tempResult = subtask.testcases[i].testcasegrade.result;
									topPrio = resultPriority[subtask.testcases[i].testcasegrade.result];
								}
							}
							subtask.result = tempResult;
							finishedSubtask(err);
						})
					}, function(err){
						if(err){
							cb(err);	
						}
						var topPrio = 0;
						var tempResult = 'none';
						for(var i=0;i<finalResponse.subtasks.length;i++){
							if(resultPriority[finalResponse.subtasks[i].result] > topPrio){
								tempResult = finalResponse.subtasks[i].result;
								topPrio = resultPriority[finalResponse.subtasks[i].result];
							}
						}
						finalResponse.result = tempResult;
						cb(null,finalResponse);
					});
				});

			});
			
		});
	}

};