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
	}
};

