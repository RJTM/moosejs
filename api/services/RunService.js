'use strict';

module.exports = {
    getFileName: function(task, owner){
       var self = this;
        
       async.parallel([
                function(callback){
                    Task.findOne({id: task}).populate('contest').exec(callback);
                },
                function(callback){
                    User.findOne({id: owner}).exec(callback);
                }  
            ],
            function (err,results){
                if(err) return err;
                    var contestName = URLService.toSlug(results[0].contest.name);
                    var taskName = URLService.toSlug(results[0].name);
                    var ownerName = URLService.toSlug(results[1].username);
                    .return contestName+"/"+ownerName+"/"+taskName+"/";
           }
        );
        
    }
}