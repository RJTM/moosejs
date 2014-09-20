/**
 * JudgehostController
 *
 * @description :: Server-side logic for managing judgehosts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	handshake: function(req, res){
		var token = req.param('token');
		JWTService.verifyToken(token, function(err, token){
			if(err) return res.json(401, {err: 'The token is not valid'});
            sails.sockets.join(req.socket, 'newSubmissions');
			return res.json({token: token, success: 'yes'});
		});
	},

	token: function(req, res){
		var id = req.param('id');		
		res.json({token: JWTService.issueToken({id:id,judgehost:'yes'})});
	}
};

