module.exports = function(req, res, next) {
	if (req.param('token')){
		delete req.params.token;
		delete req.query.token;
		delete req.body.token;
	}
	next();
}