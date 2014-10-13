/**
 * GradeController
 *
 * @description :: Server-side logic for managing grades
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	toJudging: function(req, res){
		var gradeId = req.param('id');
		Grade.update({id : gradeId},{status: 'judging'}).exec(function(err, result){
			if(err) return res.serverError(err);
			Grade.publishUpdate(result[0].id, result[0]);
			return res.json(result);
		});
	},

	saveGrade: function(req,res){
		var grade = req.param('grade');
		var testcase = req.param('testcase');
		var result = req.param('result');
		var message = req.param('message');

		TestcaseGrade.create({
			grade: grade,
			testcase: testcase,
			result: result,
			message: message
		}).exec(function(err, data){
			if(err) return res.serverError(err);
			return res.json(data);
		});
	},

	cleanGrade: function(req, res){
		var grade = req.param('grade');
		TestcaseGrade.destroy({ grade: grade }).exec(function(err, result){
			if(err) return res.serverError(err);
			sails.log.error("Error ocurred judging a submission. Cleaning grade object");
			return res.json(result);
		});
	},

	done: function(req, res){
		var grade = req.param('grade');
		Grade.update({id: grade}, {status: 'done'}).exec(function(err, result){
			if(err) return res.serverError(err);
			sails.log.info('Grade '+ grade + ' completed');
			Grade.publishUpdate(result[0].id, result[0]);
			return res.json(result);
		});
	},

	verify: function(req, res){
		var grade = req.param('grade');
		var veredict = req.param('veredict');
		Grade.update({id: grade.id}, {status: 'verified'}).exec(function(err, result){
			if(err) return res.serverError(err);
			Grade.publishUpdate(result[0].id, result[0]);
			var veredicts = [];
			for(var subtaskId in veredict){
				veredict[subtaskId].id = subtaskId;
				veredicts.push(veredict[subtaskId]);
			}
			async.each(veredicts, function(item, callback){
				Veredict.create({ 
					run: result[0].run, 
					subtask: item.id,
					autojudge: item.autojudge,
					jury: item.veredict
					//owner: req.token.id
				}).exec(function(err, result){
					callback(err);
				});
			},function(err){
				if(err) return res.serverError(err);
				ScoreboardService.update(grade, veredicts);
				return res.json(result);
			});

			
		});
	}
};

