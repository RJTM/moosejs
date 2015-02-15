/**
 * GradeController
 *
 * @description :: Server-side logic for managing grades
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	/**
	*
	* Action used by the judgehost to mark a grade as judging
	*
	**/
	
	toJudging: function(req, res){
		var gradeId = req.param('id');
		var judgehost = req.token.id;
		Grade.update({id : gradeId},{status: 'judging', judgehost: judgehost}).exec(function(err, result){
			if(err) return res.serverError(err);
			Grade.publishUpdate(result[0].id, result[0]);
			return res.json(result);
		});
	},


	/**
	*
	* Saves the result of a grade
	*
	**/
	
	saveGrade: function(req,res){
		var grade = req.param('grade');
		var testcase = req.param('testcase');
		var result = req.param('result');
		var message = req.param('message');

		TestcaseGrade.create({
			grade: grade,
			testcase: testcase,
			result: result,
			output: message
		}).exec(function(err, data){
			if(err) return res.serverError(err);
			return res.json(data);
		});
	},

	/**
	*
	* Cleans grade object in case of error
	*
	**/
	
	cleanGrade: function(req, res){
		var grade = req.param('grade');
		TestcaseGrade.destroy({ grade: grade }).exec(function(err, result){
			if(err) return res.serverError(err);
			Grade.update({id: grade}, {status:'pending'}).exec(function(){});
			sails.log.error("Error ocurred judging a submission. Cleaning grade object");
			return res.json(result);
		});
	},

	/**
	*
	* Marks a grade as done
	*
	**/
	
	done: function(req, res){
		var grade = req.param('grade');
		Grade.update({id: grade}, {status: 'done'}).exec(function(err, result){
			if(err) return res.serverError(err);
			sails.log.info('Grade '+ grade + ' completed');
			Grade.publishUpdate(result[0].id, result[0]);
			return res.json(result);
		});
	},

	/**
	*
	* Saves compiler error message
	*
	**/

	compilerError: function(req, res){
		var message = req.param('message');
		var grade = req.param('grade');
		Grade.update({ id: grade}, {status: 'done', result: 'compiler-error', compileMessage: message}).exec(function(err, result){
			if(err) return res.serverError(err);
			sails.log.info('Grade '+ grade + ' completed');
			Grade.publishUpdate(result[0].id, result[0]);
			return res.json(result);
		});
	},

	/**
	*
	* Action called by the Jury to mark the final result of a problem
	*
	**/
	
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
					jury: item.veredict,
					owner: req.token.id
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

