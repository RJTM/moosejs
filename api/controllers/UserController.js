/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var bcrypt = require('bcrypt');

 module.exports = {
    /**
     * Function that handles the authentication of the users
     * @returns {String}   Access token
     */
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
     				return res.json({user: user, token: JWTService.issueToken({id: user.id})})
     			}
     		});
     	});
     },

     create: function(req, res){
          var  newUser = req.allParams();
          User.create(newUser).exec(function(err, user){
               if(err) return res.json(400, err);
     	    return res.json(user);
     	});
     },

     json: function(req, res){
          var json = req.param('json');
          sails.log.debug(json);
          User.create(json).exec(function(err, user){
               if(err) return res.json(400, err);
              return res.json(user);
          });
     },

     addToContest: function(req, res){
     	var user = req.param('user');
     	var contestId = req.param('contest');
     	Contest.findOne({ id: contestId }).exec(function(err, contest){
     		if(err) return res.serverError(err);
     		contest.users.add(user);
     		contest.save();
     		ScoreboardService.addUser(user, contestId);
     		return res.json(contest);
     	});	
     },

     addUsersToContest: function(req, res){
          var users = req.param('users');
          var contestId = req.param('contest');
          Contest.findOne({id: contestId}).exec(function(err, contest){
               if(err) return res.serverError(err);
               async.each(users, function(user, callback){
                    contest.users.add(user);
                    ScoreboardService.addUser(user, contestId);
                    callback();
               }, function(err){
                    contest.save(function(){
                         users.forEach(function(user){
                              Contest.publishAdd(contestId, 'users', user);
                         });
                    });
                    return res.json(contest);
               });
          });         
     },

     deleteUsersFromContest: function(req, res){
          var users = req.param('users');
          var contestId = req.param('contest');
          Contest.findOne({id: contestId}).exec(function(err, contest){
               if(err) return res.serverError(err);
               async.each(users, function(user, callback){
                    contest.users.remove(user);
                    ScoreboardService.removeUserFromContest(user,contestId);
                    callback();
               }, function(err){
                    contest.save(function(){
                         users.forEach(function(user){
                              Contest.publishRemove(contestId, 'users', user);
                         });
                    });
                    return res.json(contest);
               });
          });     
     },

     password: function(req, res){
          var password = req.param('password');
          var id = req.token.id;
          User.update({id: id}, {password: password})
          bcrypt.genSalt(10, function(err, salt) {

               bcrypt.hash(password, salt, function(err, hash) {
                    if (err) return next(err);

                    var encryptedPassword = hash;
                    User.update({id: id}, {encryptedPassword: encryptedPassword}).exec(function(err, user){
                         if(err) return res.serverError(err);
                         return res.json(user);
                    });
               });
          });

     }


 };

