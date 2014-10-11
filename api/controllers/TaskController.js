/**
 * TaskController
 *
 * @description :: Server-side logic for managing Tasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function(req, res){
		var task = req.allParams();
		Task.create(task).exec(function(err, task){
			if(err) return res.json(400, err);

			ScoreboardService.addTask(task);
			return res.json(task);
		});
	}
};

