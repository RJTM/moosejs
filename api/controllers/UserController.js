/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
    /**
     * Function that handles the authentication of the users
     * @returns {String}   Access token
     */
    authenticate: function(req, res){
		var username = req.param('username');
		var password = req.param('password');
		console.log(username);

		User.find({}).exec(function findCB(err, found){
			console.log(found.length);
			while(found.length){
				console.log('Found user with name: ' + found.pop().name);
			}
		});

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
					return res.json({user: user, token: JWTService.issueToken({id: user.id})})
				}
			});
		});
	}  
    

	
};

