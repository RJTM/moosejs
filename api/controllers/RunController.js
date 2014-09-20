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
                return res.json(result);
            });
        });
		
	},
};

