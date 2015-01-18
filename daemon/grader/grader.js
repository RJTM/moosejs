'use strict';

var exec = require('child_process').exec;
var fs = require('fs-extra');
var async = require('async');
var util = require('../util.js');

var getRandomInt  =  function (min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {

	compile: function(source, language, cb){
		/**
		
			TODO:
			- receive source file
			- compile
			- send compiler result
		
		**/
		async.series([
			//Copy source file to grader workspace
			function(callback){
				fs.copy(__dirname+'/../'+source, __dirname+"/"+source, callback);
			},
			//Copy the scripts for compiling and running
			function(callback){
				fs.copy(__dirname+'/Payload/', __dirname+'/'+util.getPath(source), callback);
			},
			// Give permissions to scripts
			function(callback){
				fs.chmod(__dirname+'/'+util.getPath(source), '777', callback);
			},	
			//Compile the source code
			function(callback){
				// Check if we are dealing with a interpreted language or compiled one
				if(language.compiler == ''){
					// Interpreted language. No need to compile
					callback(null);
					return;
				}
				var statement = __dirname + '/TimeScript.sh 10s -t -v ' +
								 __dirname + '/' +util.getPath(source) + ':/workspace ' + 
								 '-w /workspace ' +
								 'moosejs/grader:v0.1' + ' /workspace/compile.sh ' 
								 + language.compiler + ' ' + language.fileName + ' ' + language.arguments;
				exec(statement, function(error, stdout, stderr){
				    	if (error) {
				       	if(error.code === 1){
				       		// Compiler error
				       		callback({compileError: stdout});
				       	}else if(error.code === 2){
				       		// Timeout
				       		callback({compileError: 'The compilation proccess timed out.'});
				       	}
				    	}
				    	callback(null, stdout);
				});
			}
		], function(err, results){
			cb(err, results[3]);
		});		
	},

	run : function(source, refInput, refOutput, timelimit, memorylimit, callback){
		var answer = getRandomInt(0, 4)
		var answers = ['time-limit', 'wrong-answer', 'accepted', 'run-error', 'presentation-error'];
		setTimeout(function(){
			callback(null, {result: answers[answer], message: ''});
		}, getRandomInt(3000, 10000));
	}
}