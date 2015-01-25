/**
 * RunController
 *
 * @description :: Server-side logic for managing runs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

 module.exports = {

 	submit: function(req,res) {
 		var time = req.param('time');
 		var owner = req.token.id;
 		var task = req.param('task');
 		var source = req.file('source');
 		var language = req.param('language')
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

 	},

 	getResult: function(req,res){
 		var run = req.param('run');
 		GradeService.getRunResult(run, function(err, data){
 			if(err) return res.serverError(err);
 			return res.json(data);
 		});
 	}

 };

