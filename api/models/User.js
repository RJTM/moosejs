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
		name: {
			type: 'string',
			unique: true,
			required: true
		},
		email: 'string',
		members: 'string',
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
			defaultsTo: 'team',
		},
		runs: {
			collection: 'run',
			via: 'owner'
		},
		contests: {
			collection: 'contest',
			via: 'users'
		},
		veredicts: {
			collection: 'veredict',
			via: 'owner'
		},
		toJSON: function() {
			var obj = this.toObject();
			delete obj.encryptedPassword;
			return obj;
		}
	},

	beforeCreate: function(values, next) {
		if(!values.password) values.password = '123';
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
	},

	afterDestroy: function(destroyedRecords, cb){
		ScoreboardService.deleteUser(destroyedRecords);
		cb();
	},

	seedData : [{
		username : 'emiliot',
		name : 'emilio',
		email : 'emilio.tirado57@gmail.com',
		password : '123',
		role : 'admin'
	},
	{
		username : 'rjtm',
		name : 'ricardo',
		email : 'rjtm1992@gmail.com',
		password : '123',
		role : 'admin'
	},
	{
		username : 'hnavarro',
		name : 'hector',
		email : 'hector.navarro@ciens.ucv.ve',
		password : '123',
		role : 'jury'
	}, 
	{
		username : 'trino',
		name : 'trino',
		email : 'trino.gomez@ciens.ucv.ve',
		password : '123',
		role : 'staff'
	},
	{
		username : 'zyx',
		name : 'carlos',
		email : 'carlos.guia.vera@gmail.com',
		password : '123',
		role : 'team'
	},
	{
		username : 'jbernadas',
		name : 'jorge',
		email : 'jbernadas@gmail.com',
		password : '123',
		role : 'team'
	}]
};

