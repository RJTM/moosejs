/**
 * ProtectedFileController
 *
 * @description :: Server-side logic for managing Protectedfilecontrollers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var fs = require('fs');
var path = require('path');
module.exports = {
    download: function(req, res) {

        // Get the URL of the file to download
        var file = req.path;

        // Get the file path of the file on disk
        var filePath = sails.config.appPath + file;

        // Should check that it exists here, but for demo purposes, assume it does
        // and just pipe a read stream to the response.
        
        fs.exists(filePath, function(exists){
        	if(exists){
        		fs.createReadStream(filePath).pipe(res);
        	}else{
        		return res.send(404, 'File not found');
        	}
        });
        

    },

    job: function(req, res) {
        var file = req.path;

        // Get the file path of the file on disk
        var filePath = sails.config.appPath + file;

        // Should check that it exists here, but for demo purposes, assume it does
        // and just pipe a read stream to the response.
        fs.exists(filePath, function(exists){
            if(exists){
                fs.createReadStream(filePath).pipe(res);
            }else{
                return res.send(404, 'File not found');
            }
        });
    }


};
