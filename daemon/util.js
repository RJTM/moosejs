'use strict';
var http = require('http');
var colors = require('colors');

module.exports = {
    /**
     * Function to get content of files using http.get()
     * Used for daemon handshake and gettin .in, .out and code files
     * @param  {string}   url Url to make the get request to
     * @param  {Function} cb  Callback function
     */
    httpGetContent: function (url, cb){
        http.get(url, function(res){
            if(res.statusCode !== 200){
                cb(res.statusCode,null);
                return;
            }
            var body = '';
            res.on('data', function(chunk){
                body += chunk;
            });
            res.on('end', function(){
                cb(null,body);
                return;
            });
        }).on('error',function(e){
            cb(e,null);
            return;
        });
    },
    
    /**
     * Helper function to build an url from some options
     * @param  {[object]} options Options object to build the url with the following format
     *                           {
     * 	                         host: string
     * 	                         port: string
     * 	                         path: string
     * 	                         params: [{name:string, value:string}, param, ...]  
     *                           }
     *                           
     * @return {[type]}   [description]
     */
    buildUrl: function (options){
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
    },
    
    log: {
        error: function(data){
            var timestamp = Date();
            console.log(timestamp+" "+data.red);
        },
        info: function(data){
             var timestamp = Date();
            console.log(timestamp+" "+data.blue);
        },
        debug: function(data){
             var timestamp = Date();
            console.log(timestamp+" "+data);
        },
        warning: function(data){
             var timestamp = Date();
            console.log(timestamp+" "+data.yellow);
        },
        judge: function(data){
            var timestamp = Date();
            console.log(timestamp+" "+data.green);
        }
    
    }
}