/**
* User.js
*
* @description :: User model represents teams, jurys, admins and staff in the platform
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
  	username: {
  		type: 'string',
  		unique: true,
  		required: true
  	},
  	name: 'string',
  	email: 'string',
  	last_login: 'datetime',
  	last_ip_address: {
  		type: 'string',
  		ipv4: true,
  	},
  	encryptedPassword: {
  		type: 'string',
  	},
  	ip_address: {
  		type: 'string',
  		ipv4: true,
  	},
  	enable: 'boolean',
  	role: {
  		type: 'string',
  		enum: ['admin','jury','staff','team'],
  		required: true,
  	},
  	toJSON: function() {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj;
    }
  },

  beforeCreate: function(values, next) {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(values.password, salt, function(err, hash) {
        if (err) return next(err);

        values.encryptedPassword = hash;
        delete values.password;
        next();
      });
    });
  },

  validPassword: function(password, user, cb) {
    bcrypt.compare(password, user.encryptedPassword, function(err, match) {
    	if (err) cb(err);

    	if (match) {
        	cb(null, true);
      	} else {
        	cb(err);
      	}
    });
  }
};

