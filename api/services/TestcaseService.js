'use strict';

module.exports = {
    uploadFiles: function(task, subtask, testcase, input, cb){
        
        Task.findOne({id: task}).populate('contest').exec(function(err,result){
            if(err) return err;
            var contestName = URLService.toSlug(result.contest.name);
            var taskName = URLService.toSlug(result.code);
            var dirName =  contestName+"/"+taskName+"/"+subtask+"/";
            
            input.upload({
                            dirname: sails.config.appPath + "/protected/testcases/" + dirName,
                            saveAs: function(__newFileStream,cb) {
                                var re = /(?:\.([^.]+))?$/;
                                var ext = re.exec(__newFileStream.filename)[1];
                                cb(null, testcase+'.'+ext); 
                            },
                            maxBytes: Number.MAX_VALUE
            }, function(err,up){
                if(err){ cb(err); return; }
                cb(null,[dirName+testcase+'.in', dirName+testcase+'.out']);
            });
      
        });
    }
};