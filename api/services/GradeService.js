module.exports = {

	fillGradeData: function(grade, cb){
		async.parallel([
        				function(callback){
        					User.findOne({id: grade.run.owner}).exec(callback);
        				},
        				function(callback){
        					Subtask.find({task: grade.task.id}).populate('testcases').exec(callback);
        				}
        			], function(err,results){
        				if(err){
        					cb(err);
        					return;	
        				} 
        				grade.run.owner = results[0];
        				grade.subtasks = results[1];
        				
        				cb(null,grade);
        			});
	}

};