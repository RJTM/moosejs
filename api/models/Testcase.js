/**
* Testcase.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var fs = require('fs');

module.exports = {

	attributes: {
		subtask: {
			model: 'subtask'
		},
		inputFile: 'string',
		outputFile: 'string',
		testcaseGrades: {
			collection: 'testcasegrade',
			via: 'testcase'
		}
	},

	afterDestroy: function(destroyedRecords, cb){
		async.each(destroyedRecords, function(testcase,callback){
			async.parallel([
				function(finishedTestcase){
					fs.unlink(sails.config.appPath + "/protected/testcases/" + testcase.inputFile,finishedTestcase);
				},
				function(finishedTestcase){
					fs.unlink(sails.config.appPath + "/protected/testcases/" + testcase.outputFile, finishedTestcase);
				}], function(err, result){
					if(err){
						sails.log.warn('Error deleting testcase file, not found. Ignoring');
					}
					callback();
				});
		}, cb);
	}



};

