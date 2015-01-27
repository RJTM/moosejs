/**
 * TestcaseController
 *
 * @description :: Server-side logic for managing Testcases
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	sync: function(req, res){
        Testcase.find({}).exec(function(e,list){
            Testcase.subscribe(req.socket,list,'update');
            Testcase.watch(req.socket);
            sails.log.debug(sails.sockets.socketRooms(req.socket));
//            sails.log.debug(sails.sockets.subscribers('testcase'));
        });
        var lastSync = req.param('date');
        Testcase.find({ updatedAt: { '>': lastSync}}).populate('subtask').exec(function(err, result){
            if(err) return res.serverError(err);
            return res.json(result);
        });
    },
    
    
    create: function(req, res){
        var subtask = req.param('subtask');
        var task = req.param('task');
        var inputFile = req.file('input');
        var outputFile = req.file('output');
        Testcase.create({
            subtask: subtask
        }).exec(function(err, testcase){
            
            var callback = function(err,results){
                if(err){
                    sails.log.error("Error loading files, deleting testcase");
                    Testcase.delete(testcase.id).exec(function(err,deleted){
                        sails.log.error("Error deleting testcase");
                    });
                    return res.serverError(err);
                }
                //Update testcase with the URL provided by service
                testcase.inputFile = results[0];
                testcase.outputFile = results[1];
                
                testcase.save(function(err,s){
                    if(err) return res.serverError(err);
                    Testcase.publishCreate(s);
                    return res.json(s);
                });
                
            };
            
            TestcaseService.uploadFiles(task,subtask, testcase.id,inputFile,callback);
        });
    },

    update: function(req, res){
        // req.file('input').upload({ maxBytes: Number.MAX_VALUE },function(err, files){
        //     if(err)
        //         return res.serverError(err);
        //     return res.json({
        //             message: files.length + ' file(s) uploaded successfully!',
        //             files: files
        //           });
        // });
        
        var subtask = req.param('subtask');
        var task = req.param('task');
        var inputFile = req.file('input');
        var outputFile = req.file('output');

        Testcase.findOne({id: req.param('testcase')}).exec(function(err, testcase){
            if(err) return res.serverError(err);

            var callback = function(err,results){
                if(err){
                    return res.serverError(err);
                }
                //Update testcase with the URL provided by service
                testcase.inputFile = results[0];
                testcase.outputFile = results[1];
                
                testcase.save(function(err,s){
                    if(err) return res.serverError(err);
                    Testcase.publishUpdate(s.id, s);
                    return res.json(s);
                });
                
            };

            TestcaseService.uploadFiles(task, subtask, testcase.id, inputFile, callback);
        });
        
    }
};

