'use strict';

var exec = require('child_process').exec;
var fs = require('fs-extra');
var async = require('async');
var util = require('../util.js');

var gPath = __dirname;
var getRandomInt  =  function (min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {

	compile: function(source, language, cb){
		async.series([
			//Copy source file to grader workspace
			function(callback){
				fs.copy(gPath+'/../'+source, gPath+"/"+source, callback);
			},
			//Copy the scripts for compiling and running
			function(callback){
				fs.copy(gPath+'/Payload/', gPath+'/'+util.getPath(source), callback);
			},
			// Creating dirs for running the solution
			function(callback){
				fs.mkdirs(gPath+'/'+util.getPath(source) + 'outputs', callback);
			},
			function(callback){
				fs.mkdirs(gPath+'/'+util.getPath(source) + 'errors', callback);
			},
			// Give permissions to scripts
			function(callback){
				fs.chmod(gPath+'/'+util.getPath(source), '777', callback);
			},	
			//Compile the source code
			function(callback){
				// Check if we are dealing with a interpreted language or compiled one
				if(language.compiler == ''){
					// Interpreted language. No need to compile
					callback(null);
					return;
				}
				var statement = gPath + '/TimeScript.sh 10s -t -v ' +
								 gPath + '/' +util.getPath(source) + ':/workspace ' + 
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
				       	return;
				    	}
				    	callback(null, stdout);
				    	return;
				});
			}
		], function(err, results){
			cb(err, results[3]);
		});		
	},

	run : function(source, language, refInput, refOutput, timelimit, memorylimit, callback){
		// var answer = getRandomInt(0, 4)
		// var answers = ['time-limit', 'wrong-answer', 'accepted', 'run-error', 'presentation-error'];
		// setTimeout(function(){
		// 	callback(null, {result: answers[answer], message: ''});
		// }, getRandomInt(3000, 10000));
		// 
		var statement = gPath + '/TimeScript.sh ' + ((timelimit/1000.0) * language.timeFactor) + 's -t ' +
						  // '-m '+ memorylimit + 'm -t ' +
						  '-v ' + gPath + '/' +util.getPath(source) + ':/workspace ' + 
						  '-v ' + gPath + '/../testcases/:/testcases ' + 
						   '-w /workspace ' +
						   'moosejs/grader:v0.1' + ' /workspace/run.sh "' +
						   language.executable + '" /testcases/'+refInput +
						   ' /workspace/outputs/'+util.getFileName(refOutput) +
						   ' /workspace/errors/'+util.getFileName(refOutput)+'.error';

		console.log(statement);
		exec(statement, function(error, stdout, stderr){
			if(error){
				if(error.code === 137){
					// Execution timed out
					callback(null, {result: 'time-limit', message: stderr});
				}else{
					// Run error
					callback(null, {result: 'run-error', message: stdout});
				}
				return;
			}
			var executionTime = stdout;
			// Check for wrong-answer
			var diffStatement = 'diff '+gPath+'/../testcases/' + refOutput +
			 ' ' + gPath + '/'+ util.getPath(source) + 'outputs/' + util.getFileName(refOutput);
			exec(diffStatement, function(error){
				if(error && error.code === 1){
					fs.readFile(gPath + '/'+ util.getPath(source) + 'outputs/' + util.getFileName(refOutput), 
						{
							encoding: 'utf8'
						},
						function(err, data){
							var diffPre = diffStatement + ' -iEZbwB'
							exec(diffPre, function(error){
								if(error && error.code === 1){
									callback(null, {result: 'wrong-answer', message: data});
									return;
								}
								callback(null, {result: 'presentation-error', message: data});
							});
							return;
						});
					return;
				}
				callback(null, {result: 'accepted', message: 'Execution Time: '+executionTime});
			});
		});
	}
}