'use strict';

var exec = require('child_process').exec;
var fs = require('fs-extra');
var async = require('async');
var util = require('../util.js');
var chmodr = require('chmodr');

var getRandomInt  =  function (min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {

	compile: function(source, cb){
		/**
		
			TODO:
			- receive source file
			- compile
			- send compiler result
		
		**/
		async.series([
			//Copy source file to grader workspace
			function(callback){

				util.log.debug('copy source');
				fs.copy(__dirname+'/../'+source, __dirname+"/"+source, callback);
			},
			//Copy the scripts for compiling and running
			function(callback){
				util.log.debug('copy scripts');
				fs.copy(__dirname+'/Payload/', __dirname+'/'+util.getPath(source), callback);
			},
			// Give permissions to scripts
			function(callback){
				util.log.debug('chmod');
				fs.chmod(__dirname+'/'+util.getPath(source), '777', callback);
			},	
			//Compile the source code
			function(callback){
				util.log.debug('compile');

				var statement = __dirname + '/TimeScript.sh 10s -t -v ' +
								 __dirname + '/' +util.getPath(source) + ':/workspace ' + 
								 '-w /workspace ' +
								 'moosejs/grader:v0.1' + ' /workspace/compile.sh ' + 'g++ ' + 'source.cpp ' + '-O2';
				util.log.debug(statement);
				exec(statement, function(error, stdout, stderr){
					console.log('stdout: ', stdout);
				    	console.log('stderr: ', stderr);
				    	if (error !== null) {
				       	console.log('exec error: ', error);
				    	}
				    	callback(null);
				});
			}
		], function(err, results){
			cb(err, { status: 0});
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