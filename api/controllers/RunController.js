/**
 * RunController
 *
 * @description :: Server-side logic for managing runs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	test: function(req,res) {
		res.writeHead(200, {'content-type': 'text/html'});
		res.end(
			'<form action="http://localhost:1337/run/submit" enctype="multipart/form-data" method="post">'+
		 	'<input type="text" name="time"><br>'+
		 	'<input type="text" name="task"><br>'+
		 	'<input type="hidden" name="token" value="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.MQ.4j8XMwRpTlQdDjztlirYie0GN0e6G4cG_fHS6pjvUQ0"><br>'+
			'<input type="file" name="source"><br>'+
			'<input type="submit" value="Upload">'+
			'</form>'
		)
	},

	submit: function(req,res) {
		var time = req.param('time');
		var owner = req.token;
		var task = req.param('task');
		Task.findOne({id: task}).populate('contest').exec(function(err, res){
			if(err) return serverError(err);
			var contestName = res.contest.name;
			var taskName = res.name;
			User.findOne({id: owner}).exec(function(err,res){
				if(err) return serverError(err);
				var ownerName = res.username;
				fileUpload(contestName,taskName,ownerName);
			});
		});
		function fileUpload(contestName,taskName,ownerName){
			contestName = URLService.toSlug(contestName);
			taskName = URLService.toSlug(taskName);
			ownerName = URLService.toSlug(ownerName);
			var dirname = contestName+"/"+ownerName+"/"+taskName+"/";
			req.file('source').upload({dirname: "../../assets/sources/"+dirname}, function(err, up){
				if (err)
	       				return res.serverError(err);
	       			var fileName = /[^/]*$/.exec(up[0].fd)[0];
				Run.create({
					time: time,
					owner: owner,
					task: task,
					source: dirname + fileName
				}).exec(function(err, result){
					if(err) return res.json(500, err);
					return res.json(result);
				});
			});
		}
		
	},
};

