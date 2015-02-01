/**
 * ContestController
 *
 * @description :: Server-side logic for managing Contests
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	/**
	*
	* Sets up a contest using the contest creation wizard
	*
	**/
	
	fromJson: function(req, res){
		ContestService.saveFromJson(req.params.all(), function(err, result){
			if(err) return res.serverError(err);
			return res.json(result);
		});
	},

	/**
	*
	* Sets up a contest using the zip uploader tool
	*
	**/
	
	fromZip: function(req, res){
		var id = req.param('id');
		var file = req.file('input');
		ContestService.saveFromZip(id, file, function(err, result){
			if(err) return res.serverError(err);
			return res.json(result);
		});
	}
};

