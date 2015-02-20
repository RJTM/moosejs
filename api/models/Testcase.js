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
				function(callback){
					fs.unlink(sails.config.appPath + "/protected/testcases/" + testcase.inputFile,callback);
				},
				function(callback){
					fs.unlink(sails.config.appPath + "/protected/testcases/" + testcase.outputFile,callback);
				}], function(err, result){
					if(err){
						sails.log.warning('Error deleting testcase file, not found. Ignoring');
					}
					callback();
				});
		}, cb);
	}



};

