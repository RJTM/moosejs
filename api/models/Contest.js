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
		},
		freezeTime: {
			type: 'datetime',
		},
		endTime: {
			type: 'datetime',
		},
		unfreezeTime: {
			type: 'datetime',
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

	// seedData: [{
	// 	name: "DummyContest",
	// 	penalty: 20,
	// 	endTime: "2020-02-01T02:30:01.996Z",
	// 	unfreezeTime: "2020-02-01T02:30:01.996Z"

	// },
	// {
	// 	name: "Slurpee Contest",

	// },
	// {
	// 	name: "TuktukContest",
	// }],
};

