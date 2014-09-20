var fs = require('fs');
var http = require('http');
var socketIOClient = require('socket.io-client');
var sailsIOClient = require('sails.io.js');
var config;

var io = sailsIOClient(socketIOClient);

console.log("Starting...");

/**
 * Function to get content of files using http.get()
 * Used for daemon handshake and gettin .in, .out and code files
 * @param  {string}   url Url to make the get request to
 * @param  {Function} cb  Callback function
 */
function httpGetContent(url, cb){
	http.get(url, function(res){
		var body = '';
		res.on('data', function(chunk){
			body += chunk;
		});
		res.on('end', function(){
			return cb(null,body);
		});
	}).on('error',function(e){
		return cb(e);
	});
}

/**
 * Helper function to build some url from some options
 * @param  {[object]} options Options object to build the url with the following format
 * {
 * 	url: string
 * 	port: string
 * 	path: string
 * 	params: [{name:string, value:string}, param, ...]  
 * }
 *                            
 * @return {[type]}         [description]
 */
function buildUrl(options){
	var url = "";
	url += options.host;
	if(options.port)
		url += ":"+options.port;
	if(options.path){
		if(options.path[0] === "/")
			url += options.path;
		else
			url += "/"+options.path;
	}
	if(options.params){
		url += "?";
		options.params.forEach(function(param, index){
			url += param.name + "=" + param.value;
			if(index !== options.params.length-1)
				url += '&';
		});
	}
	return url;
}
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
io.socket.on('connect',function(){
    console.log("Initiating handshake with the server.");
    io.socket.post('/judgehost/handshake', {token: config.key}, function(body, responseObj){
        if(responseObj.statusCode !== 200){
            console.log('Handshake not successful');
            process.exit(1);
        }
    });
});

function startJudging(){
    io.socket.on('message', function(event){
        console.log(event);
    });
}

