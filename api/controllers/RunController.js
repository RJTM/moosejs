/**
 * RunController
 *
 * @description :: Server-side logic for managing runs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 module.exports = {

 	/**
 	*
 	* Submits a new code to be graded
 	*
 	**/
 	
 	submit: function(req,res) {
 		var owner = req.token.id;
 		var task = req.param('task');
 		var source = req.file('source');
 		var language = req.param('language');

 		Task.findOne(task).populate('contest').exec(function(err, fullTask){
 			var now = new Date();
 			var contestTime = new Date(fullTask.contest.startTime);
 			var time = parseInt((now - contestTime)/60000);
 			var endTime = new Date(fullTask.contest.endTime);
 			if(now > endTime){
 				res.json(400, { msg: 'Too late'});
 				return;
 			}
 			RunService.uploadSourceFile(task, owner, source, function(err, sourceUrl){
 				if(err) return res.serverError(err);
 				Run.create({
 					time: time,
 					owner: owner,
 					task: task,
 					language: language,
 					source: sourceUrl
 				}).exec(function(err, result){
 					if(err) return res.json(500, err);
 					JudgeService.dispatchRun(result);
 					Run.findOne({id: result.id}).populate('owner').populate('task').exec(function(err, data){
 						if(err){
 							Run.publishCreate(result);
 							return res.json(result);
 						} 
 						Run.publishCreate(data);
 						return res.json(data);
 					});
 				});
 			});
 		});
 		

 	},

 	/**
 	*
 	* Gets the final result for a run
 	*
 	**/

 	getResult: function(req,res){
 		var run = req.param('run');
 		GradeService.getRunResult(run, function(err, data){
 			if(err) return res.serverError(err);
 			return res.json(data);
 		});
 	},

 	team: function(req, res){
 		var user = req.token.id;
 		ContestService.getActiveContest(user, function(err, contest){
 			if(err) res.serverError(err);
 			var finalRuns = [];
	 		Run.find({owner: user}).populate('task').exec(function(err, runs){
	 			if(err) return res.serverError(err);
				async.each(runs, function(run, callback){
					if(run.task.contest !== contest.id)
						callback();
					var finalSubtasks = [], overall = 'accepted';
					Task.findOne(run.task.id).populate('subtasks').exec(function(err, task){
						if(err) callback(err);
						async.each(task.subtasks, function(subtask, finishedSubtask){
							Veredict.find({ where: {subtask: subtask.id, run: run.id}, limit:1, sort: 'createdAt DESC'}).exec(function(err, veredict){
								if(err) callback(err);
								if(subtask.feedback){
									finalSubtasks.push({
										points: subtask.points,
										result: veredict.jury
									});
									if(veredict.jury !== 'accepted' && overall !== 'judged'){
										overall = 'problem';
									}
								}else{
									finalSubtasks.push({
										points: subtask.points,
										result: 'judged'
									});
									overall = 'judged';
								}
								finishedSubtask();
							});
						}, function(err){
							if(err) callback(err);
							run.subtasks = finalSubtasks;
							run.result = overall;
							finalRuns.push(run);
							callback();
						});
					});
				}, function(err){
					if(err) return res.serverError(err);
					return res.json(finalRuns);
				});
	 		});
 		});
 		
 	}
 };

