/**
 * TestcaseController
 *
 * @description :: Server-side logic for managing Testcases
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	sync: function(req, res){
        var lastSync = req.param('date');
        Testcase.find({ updatedAt: { '>': lastSync}}).exec(function(err, result){
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
                    return res.json(s);
                });
                
            };
            
            TestcaseService.uploadFiles(task,subtask, testcase.id,inputFile,outputFile,callback);
        });
    }
};

