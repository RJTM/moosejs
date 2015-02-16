var fs = require('fs-extra');
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var async = require('async');
var util = require('./util.js');
var grader = require('./grader/grader.js');
var jsonfile = require('jsonfile');
var config,tmp,subscribed = false;

var io = sailsIOClient(socketIOClient);

var socket = {
	get: function(url, data, callback){
		if(!callback){
			if(typeof data == 'function' || typeof data == 'undefined'){
				callback = data;
				data = {};
			}
		}
		data.token = config.key;
		io.socket.get(url,data, callback);
	},
	post: function(url, data, callback){
		if(!callback){
			if(typeof data == 'function' || typeof data == 'undefined'){
				callback = data;
				data = {};
			}
		}
		data.token = config.key;
		io.socket.post(url,data, callback);
	}
}

var tokenHttp = function(url, callback){
	var headers = {
		'Authorization': 'Bearer '+ config.key
	}
	return util.httpGetContent({
		host: config.host,
		port: config.port,
		path: url,
		headers: headers, 
		
	}, callback);
}

var subscribe = function(){
	util.log.info('Waiting for next run');
	socket.get('/judgehost/subscribe',function(body,responseObj){
		if(body.status === 'pending'){
			judge(body.grade);
		}else{
			if(!subscribed){
				io.socket.once('submission', onSubmission);
				subscribed = true;
			}
		}
	});
}

var saveCompileError = function(grade, err){
	socket.post('/grade/compilerError', { grade: grade.id, message: err },
		function(data,responseObj){
				if(responseObj.statusCode !== 200){
					util.log.warn('Unable to mark problem judging done. Retrying...');
					socket.post('/grade/compilerError', { grade: grade.id, message: err },
						function(data,responseObj){
							if(responseObj.statusCode !== 200){
								util.log.error('Retry failed, starting cleaning for further judging');
								cleanGrade();
								return;
							}
					});
					return;
				}
		});
}

var cleanGrade = function(grade){
	socket.post('/grade/cleanGrade', {
		grade: grade.id
	});
}

var judgeTestcase = function(source, grade, subtask, testcase, cb){
	util.log.judge("Running testcase "+ testcase.id);
	grader.run(source, grade.run.language, testcase.inputFile, testcase.outputFile, subtask.timeLimit, subtask.memoryLimit,
		function(err, data){
			if(err){
				cb(err);
				return;
			}
			util.log.judge('Result for the run of testcase ' + testcase.id);
			util.log.judge(data);
			socket.post('/grade/saveGrade',{
				grade: grade.id,
				testcase: testcase.id,
				result: data.result,
				message: data.message
			}, function(data,responseObj){
				if(responseObj.statusCode !== 200){
					cb(data);
					return;
				}
				cb(null);
				
			});
		});
}

var judgeSubtask = function(source, grade, subtask, cb){
	util.log.judge("Judging subtask " + subtask.id);

	async.eachSeries(subtask.testcases, function(testcase, callback){
		judgeTestcase(source, grade, subtask, testcase, callback);
	},function(err){
		if(err){
			cb(err);
			return;
		}
		cb(null);
	});
}

var judgeTask = function(source, grade){
	util.log.judge("Judging for task "+ grade.task.name);
	async.eachSeries(grade.subtasks, function(subtask, callback){
		judgeSubtask(source, grade, subtask, callback);
	}, function(err){
		if(err){
			util.log.error(err);
			cleanGrade(grade);
			return;
		}
		socket.post('/grade/done', {grade: grade.id}, 
			function(data,responseObj){
				if(responseObj.statusCode !== 200){
					util.log.warn('Unable to mark problem judging done. Retrying...');
					socket.post('/grade/done', {grade : grade.id},  
						function(data,responseObj){
							if(responseObj.statusCode !== 200){
								util.log.error('Retry failed, starting cleaning for further judging');
								cleanGrade();
								return;
							}
						});
					return;
				}
				util.log.judge('Grade '+ grade.id + ' completed!!');
				// After judging the task, subscribe to receive new ones
				subscribe();
				
			});
	});
}

var judge = function(grade){
	socket.get('/grade/toJudging/'+grade.id);
	grade.status = 'judging';

	util.log.judge("Received a new grade to judge");
	util.log.judge("Getting source file for the run");

	setTimeout(function(){
		tokenHttp('/protected/sources/'+grade.run.source ,function(err,data){
			var fileName = util.buildPath(['sources', grade.run.owner.username, 
				util.toSlug(grade.task.code), grade.run.id, grade.run.language.fileName ]);
			async.series([
					function(callback){
						fs.outputFile(fileName, data, callback);
					},
					function(callback){
						util.log.judge("Source file acquired. Beginning to judge");
						grader.compile(fileName, grade.run.language, callback);
					}
				],function(err, results){
					if(err){
						if(err.compileError){
							saveCompileError(grade, err.compileError);
							util.log.warning(err);
						}else{
							util.log.error(err);
						}
						util.log.judge('Grade '+ grade.id + ' completed!!');
						subscribe();
						return;
					}
					util.log.judge("Source file compiled succesfully.");
					judgeTask(fileName, grade);	
				});

		});
	},3000);
}

var getTestCase = function(testcase, callback){
	var inputFile =  '/protected/testcases/'+testcase.inputFile;

	var outputFile =  '/protected/testcases/'+testcase.outputFile;

	util.log.info("Fetching testcase "+testcase.id);
	async.parallel(
		[
		function(callback){
			tokenHttp(inputFile, callback);
		},
		function(callback){
			tokenHttp(outputFile, callback);
		}
		],
		function(err,results){
			if(err){ 
				callback(err); 
				return;
			}
			fs.outputFileSync('testcases/'+testcase.inputFile, results[0]);
			fs.outputFileSync('testcases/'+testcase.outputFile, results[1]);

			util.log.info("Testcase saved "+ testcase.id);
			callback();
		}
		)
}

var onTestcaseChange = function(obj){
	util.log.debug(obj);
	util.log.info("Getting updated testcases");
	if(obj.verb === "updated"){
		getTestCase(obj.data, function(err){
			if(err){
				util.log.error(err);
				return;
			}
			util.log.info("Testcase updated");
		});
	}else if(obj.verb === "created"){
		setTimeout(function(){
			getTestCase(obj.data, function(err){
				if(err){
					util.log.error(err);
					return;
				}
				util.log.info("New Testcase saved");
			})},3000);
	};
}

var syncTestcases = function(callback){
	socket.post('/testcase/sync',{date: tmp.lastUpdate}, function(body, responseObj){
		async.each(body, getTestCase, function(err){
			callback();
		});
	});
}

var onConnect = function(){
	util.log.info("Initiating handshake with the server.");
	socket.post('/judgehost/handshake', {token: config.key}, function(body, responseObj){
		if(responseObj.statusCode !== 200){
			util.log.info('Handshake not successful');
			process.exit(1);
		}
		syncTestcases(subscribe);
    });
}


var onSubmission = function(grade){
	subscribed = false;
	judge(grade);
}

util.log.info("Starting...");

//Reading config file
util.log.info("Reading config file...");
config = jsonfile.readFileSync('config.json');
util.log.info("Config file loaded.");
var configToShow = JSON.parse(JSON.stringify(config));
delete configToShow.key;
util.log.info("Config:");
util.log.info(configToShow);

//Reading TMP file
if(!fs.existsSync('tmp.json')){
	var newTmp = {
		lastUpdate: config.lastUpdate
	}
	jsonfile.writeFileSync('tmp.json',newTmp);
}
tmp = jsonfile.readFileSync('tmp.json');


io.sails.url = 'http://'+config.host+':'+config.port;

//define event actions
io.socket.on('connect', onConnect);
io.socket.on('testcase', onTestcaseChange);
io.socket.on('message', function(event){
	util.log.info(event);
});