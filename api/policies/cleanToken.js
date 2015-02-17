module.exports = function(req, res, next) {
	if (req.param('token')){
		JWTService.verifyToken(req.param('token'), function(err, token) {
			if (err) return res.json(401, {err: 'The token is not valid'});
			req.token = token;
			delete req.params.token;
			delete req.query.token;
			delete req.body.token;
			next();
		});
	}else{
		next();	
	}	
}