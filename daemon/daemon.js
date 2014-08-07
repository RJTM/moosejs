var fs = require('fs');
var http = require('http');
var config;
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
fs.readFile('config.json', 'utf8', function(error,data){
	if(error){
		console.log('Error loading config file\n' + error);
		return;
	}
	config = JSON.parse(data);
	console.log("Config file loaded.");
	var configToShow = JSON.parse(JSON.stringify(config));
	delete configToShow.key;
	console.log("Config:");
	console.log(configToShow);

	//Sending a handshake request to the server
	var url = buildUrl({
		host: config.host,
		port: config.port,
		path: "/judgehost/handshake",
		params: [{name: 'token', value: config.key}],
	});

	console.log("Initiating handshake with the server.");
	httpGetContent(url,function(err, body){
		if(err){
			console.log("error"+ err);
			return;
		}

		handshakeResult(body);
	});

});

/**
 * Function that evaluates the response of the handshake and continues
 * @param  {string}		body JSON body of the response
 * @return {Function}   continues
 */
function handshakeResult(body){
	var response = JSON.parse(body);
	if(response.success === 'yes'){
		console.log("Handshake succeeded.");
		return startJudging();
	}else{
		console.log('Handshake not succesful! Something went wrong.');
	}
}

function startJudging(){

}

