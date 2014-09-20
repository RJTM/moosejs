'use strict';

module.exports = {
    uploadSourceFile: function(task, owner, file, callback){
        
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
                var dirName =  contestName+"/"+ownerName+"/"+taskName+"/";
                
                file.upload({
                                dirname: sails.config.appPath + "/assets/sources/" + dirName
                            }, function(err, up){
                    if (err){
                        callback(err,null);
                        return;
                    }
                    var fileName = /[^/]*$/.exec(up[0].fd)[0];
                    sails.log(sails.config.appPath + "/" + dirName);
                    callback(null,dirName+fileName);
			    });
           }
        );
        
    }
}