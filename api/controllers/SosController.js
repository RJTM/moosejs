/**
 * SosController
 *
 * @description :: Server-side logic for managing Sos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create : function (req, res){
		var user = req.token.id;
		Sos.create({ team: user}).exec(function(err, sos){
			if(err) return res.serverError(err);
			Sos.findOne(sos.id).populate('team').exec(function(err, sos){
				Sos.publishCreate(sos);
				return res.json(sos);
			});
		});
	},
};

