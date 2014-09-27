 /**
  * tokenAuth
  * 
  * Check if the user making the request provided the token to see if the user is logged in
  */
  module.exports = function(req, res, next) {
  	var token;
  	if (req.headers && req.headers.authorization) {
  		var parts = req.headers.authorization.split(' ');
  		if (parts.length == 2) {
  			var scheme = parts[0],
  			credentials = parts[1];

  			if (/^Bearer$/i.test(scheme)) {
  				token = credentials;
  			}else{
  				return res.json(401, {err: 'Format is Authorization: Bearer [token]'});
  			}
  		} else {
  			return res.json(401, {err: 'Format is Authorization: Bearer [token]'});
  		}
  	} else if (req.param('token')) {
  		token = req.param('token');
	    	// We delete the token from param to not mess with blueprints
		delete req.params.token;
		delete req.query.token;
		delete req.body.token;

	} else {
		return res.json(401, {err: 'No Authorization header was found'});
	}
	JWTService.verifyToken(token, function(err, token) {
		if (err) return res.json(401, {err: 'The token is not valid'});

		req.token = token;

		next();
	});
}