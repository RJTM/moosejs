'use strict';

module.exports = {
    uploadFiles: function(task, subtask, testcase, input, output, cb){
        
        Task.findOne({id: task}).populate('contest').exec(function(err,result){
            if(err) return err;
            var contestName = URLService.toSlug(result.contest.name);
            var taskName = URLService.toSlug(result.name);
            var dirName =  contestName+"/"+taskName+"/"+subtask+"/";
            
            async.parallel([
                function(callback){
                    input.upload({
                                    dirname: sails.config.appPath + "/assets/testcases/" + dirName,
                                    saveAs: testcase+'.in'
                    }, function(err,up){
                        if(err){ callback(err); return; }
                        callback(null,dirName+testcase+'.in');
                        
                    });
                }
                ,
                function(callback){
                    output.upload({
                                    dirname: sails.config.appPath + "/assets/testcases/" + dirName,
                                    saveAs: testcase+'.out'
                    }, function(err,up){
                        if(err){ callback(err); return; }
                        callback(null,dirName+testcase+'.out');
                        
                    });
                }
            ], function(err, results){
                cb(err,results);
            }
        
            );  
        });
    }
};