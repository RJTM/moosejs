/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	authenticate: function(req, res){
		var username = req.param('username');
		var password = req.param('password');

		if(!username || !password){
			return res.json(401, {err:'Username and password required'});
		}

		User.findOne({ username: username }).exec(function(err,user) {
			if(!user){
				return res.json(401, {err:'Invalid username or password'});
			}

			User.validPassword(password, user, function(err, valid){
				if(err){
					return res.json(403, {err: 'Forbidden'});
				}

				if(!valid){
					return res.json(401, {err: 'invalid email or password'});
				}else{
					res.json({user: user, token: JWTService.issueToken(user.id)})
				}
			});
		});
	},

	check: function(req, res) {
		return res.json({token: req.token});
	}
};

