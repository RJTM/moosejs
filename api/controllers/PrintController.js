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
		var user = req.param('user');
		var source = req.file('source');
		PrintService.uploadSourceFile(user, source,
			function(err, printJob){
				if(err)
					return res.serverError(err);
				Print.publishCreate(printJob);
				return res.json(printJob);
		});
	}
};

