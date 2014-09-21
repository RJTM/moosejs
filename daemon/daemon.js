var fs = require('fs');
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var async = require('async');
var util = require('./util.js');
var config;

var io = sailsIOClient(socketIOClient);

var judge = function(grade){
    io.socket.get('/grade/toJudging/'+grade.id);
    grade.status = 'judging';
    
    util.log.judge("Received a new grade to judge");
    util.log.judge(JSON.stringify(grade,undefined,2));
    
    
    var sourceUrl = util.buildUrl({
        host: config.host,
        port: config.port,
        path: '/sources/'+grade.run.source
    });
    
    setTimeout(function(){
        util.httpGetContent(sourceUrl,function(err,data){
            util.log.judge("Processing...");
            util.log.debug(data);
            
            subscribe();
            
        });
    },3000);
}

var subscribe = function(){
    io.socket.get('/judgehost/subscribe',function(body,responseObj){
        if(body.status === 'pending'){
            judge(body.grade);
        }
    });
}

var onConnect = function(){
    util.log.info("Initiating handshake with the server.");
    io.socket.post('/judgehost/handshake', {token: config.key}, function(body, responseObj){
        if(responseObj.statusCode !== 200){
            util.log.info('Handshake not successful');
            process.exit(1);
        }
        subscribe();
    });
}


var onSubmission = function(grade){
    io.socket.get('/judgehost/unsubscribe');
    judge(grade);
}

util.log.info("Starting...");

//Reading config file
util.log.info("Reading config file...");
var data = fs.readFileSync('config.json');
config = JSON.parse(data);
util.log.info("Config file loaded.");
var configToShow = JSON.parse(JSON.stringify(config));
delete configToShow.key;
util.log.info("Config:");
util.log.info(JSON.stringify(configToShow,undefined,2));
io.sails.url = config.host+':'+config.port;

//define event actions
io.socket.on('connect', onConnect);
io.socket.on('submission', onSubmission);
io.socket.on('message', function(event){
    util.log.info(event);
});