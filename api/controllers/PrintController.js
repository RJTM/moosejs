/**
 * PrintController
 *
 * @description :: Server-side logic for managing prints
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	/**
	*
	* Sends a file to print service
	*
	**/
	
	create : function (req, res){
		var user = req.token.id;
		var source = req.file('source');
		PrintService.uploadSourceFile(user, source,
			function(err, printJob){
				if(err)
					return res.serverError(err);
				Print.findOne(printJob.id).populate('team').exec(function(err, fullJob){
					Print.publishCreate(fullJob);
					return res.json(fullJob);
				});
		});
	}
};

