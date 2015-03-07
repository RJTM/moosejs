'use strict';

module.exports = {
        dispatchRun: function(run, callback){
            /*
            1.- Receive new Run
            2.- Create new Grade with default status pending 
            3.- Check for available Judgehosts
            4.- If subscriber available: 
                    Send Run to that sub and change Grade status
            5.- Save Grade
            */
            var subscribers = sails.sockets.subscribers('newSubmissions');
            var grade = {
            	run: run.id,
            	task: run.task
            };
            if(subscribers.length > 0){
            	var judgehostToSend = subscribers[0];

            	Grade.create(grade).exec(function(err, result){
            		if(err){
            			sails.log.error(err);
            			return;   
            		}
                            Grade.publishCreate(result);
            		Grade.findOne({id: result.id}).populate('run').populate('task').exec(function(err, gradeToSend){
            			if(err){
    	        			sails.log.error(err);
    	        			return;   
    	        		}
            			GradeService.fillGradeData(gradeToSend, function(err, finalGrade){
            				if(err){
    		        			sails.log.error(err);
    		        			return;   
    		        		}
            				sails.sockets.emit(judgehostToSend, 'submission', finalGrade);
                                                   sails.sockets.leave(judgehostToSend, 'newSubmissions');
                                                   if(callback) callback();
            			});
            		});
            	});

            }else{
            	Grade.create(grade).exec(function(err, result){
            		if(err){
            			sails.log.error(err);
            			return;   
            		}
                            Grade.publishCreate(result);
                            if(callback) callback();
            	});
            }
        },

        reJudgeRun: function(id, callback){
            Run.findOne(id).exec(function(err, run){
                module.exports.dispatchRun(run, callback);
            });
        },

        reJudgeTask: function(id){
            Task.findOne(id).populate('runs').populate('subtasks').exec(function(err, task){
                async.series([
                        function(callback){
                            ScoreboardService.deleteTask([task], callback);
                        },
                        function(callback){
                            ScoreboardService.addTask(task, callback);      
                        }
                    ],function(err){
                        if(!err){
                            async.eachSeries(task.runs, function(run, callback){
                                module.exports.dispatchRun(run, callback);
                            }, function(err){
                                sails.log.info('Finished rejudging task '+id);
                            });
                        }
                    });
            });
        }
}