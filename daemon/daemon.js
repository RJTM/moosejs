var fs = require('fs');
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var async = require('async');
var util = require('./util.js');
var config;

var io = sailsIOClient(socketIOClient);
var onConnect = function(){
    console.log("Initiating handshake with the server.");
    io.socket.post('/judgehost/handshake', {token: config.key}, function(body, responseObj){
        if(responseObj.statusCode !== 200){
            console.log('Handshake not successful');
            process.exit(1);
        }
    });
}


var onSubmission = function(grade){
    var sourceUrl = util.buildUrl({
        host: config.host,
        port: config.port,
        path: '/sources/'+grade.run.source
    });
        
    setTimeout(function(){
        util.httpGetContent(sourceUrl,function(err,data){
            console.log(data);
        });
    },3000);
   
}

console.log("Starting...");

//Reading config file
console.log("Reading config file...");
var data = fs.readFileSync('config.json');
config = JSON.parse(data);
console.log("Config file loaded.");
var configToShow = JSON.parse(JSON.stringify(config));
delete configToShow.key;
console.log("Config:");
console.log(configToShow);
io.sails.url = config.host+':'+config.port;

//define event actions
io.socket.on('connect', onConnect);
io.socket.on('submission', onSubmission);
io.socket.on('message', function(event){
    console.log(event);
});

