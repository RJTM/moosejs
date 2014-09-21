/**
 * GradeController
 *
 * @description :: Server-side logic for managing grades
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	save: function(req, res) {
		var runId = req.param('run');
		var judgehost = req.token.id;
		var result = req.param('result');
		var is_correct = result === "yes";
		var subtask = req.param('subtask');
		Grade.create({run: runId, judgehost: judgehost, result: result, subtask: subtask}).exec(function(err,response){
			if(err) return res.serverError(err);
		});
		Run.findOne({id: runId}).populate('task').exec(function(err,run) {
			if(err) return res.serverError(err);
			Subtask.findOne({id: subtask}).exec(function(err,subT) {
				if(err) return res.serverError(err);
				ScoreboardPublic.findOne({
					contest: run.task.contest,
					user: run.owner,
					task: run.task,
					subtask: subtask
				}).exec(function(err, scoreline) {
					if(err) return res.serverError(err);
					ScoreboardPublic.update({
						contest: run.task.contest,
						user: run.owner,
						task: run.task,
						subtask: subtask
					},{
						submissions: scoreline.submissions+1,
						totaltime: run.time,
						is_correct: is_correct,
						points: subT.poitns
					},function(err, updated) {
						if(err) return res.serverError(err);
						return res.json(updated);
					});
				});
			});			
		});
	},
    
    toJudging: function(req, res){
        var gradeId = req.param('id');
        Grade.update({id : gradeId},{status: 'judging'}).exec(function(err, result){
            if(err) return res.servrError(err);
            return res.json(result);
        });
    }
};

