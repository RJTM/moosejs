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
 		RunService.uploadSourceFile(task, owner, source, function(err, sourceUrl){
 			if(err) return res.serverError(err);
 			Run.create({
 				time: time,
 				owner: owner,
 				task: task,
 				source: sourceUrl
 			}).exec(function(err, result){
 				if(err) return res.json(500, err);
 				JudgeService.dispatchRun(result);
 				return res.json(result);
 			});
 		});

 	},

 };

