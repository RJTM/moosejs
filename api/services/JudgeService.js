'use strict';

module.exports = {
    dispatchRun: function(run){
        /*
         TODO:
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
            grade.status = 'judging';
            var judgehostToSend = subscribers[0];
            
            Grade.create(grade).exec(function(err, result){
                if(err){
                    sails.log.error(err);
                    return;   
                }
                Grade.findOne({id: result.id}).populate('run').exec(function(err, result){
                    sails.sockets.emit(judgehostToSend, 'submission', result);
                });
            });
               
        }else{
            Grade.create(grade).exec(function(err, result){
                if(err){
                    sails.log.error(err);
                    return;   
                }
            });
        }
    },
    
    test: function(){
        console.log(sails.sockets.subscribers('newSubmissions'));
        
        sails.sockets.broadcast('newSubmissions', {msg: 'Hello World!'});
    }
}