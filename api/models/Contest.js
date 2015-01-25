/**
* Contest.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		name: {
			type: 'string'
		},
		startTime: {
			type: 'datetime',
			defaultsTo: new Date().toISOString()
		},
		freezeTime: {
			type: 'datetime',
			defaultsTo: new Date().toISOString()
		},
		endTime: {
			type: 'datetime',
			defaultsTo: new Date().toISOString()
		},
		unfreezeTime: {
			type: 'datetime',
			defaultsTo: new Date().toISOString()
		},
		enabled: {
			type: 'boolean',
			defaultsTo: true
		},
		tasks: {
			collection: 'task',
			via: 'contest'
		},
		users: {
			collection: 'user',
			via: 'contests',
			dominant: true
		},
		penalty: {
			type: 'integer',
			defaultsTo: 0
		},
		set: {
			type: 'boolean',
			defaultsTo: false
		}
	},

	seedData: [{
		name: "DummyContest",
		penalty: 20

	},
	{
		name: "Slurpee Contest",

	},
	{
		name: "TuktukContest",
	}],
};

