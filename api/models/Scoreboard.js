/**
* Scoreboard.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		contest: {
			model: 'contest'
		},
		user: {
			model: 'user'
		},
		task: {
			model: 'task'
		},
		submissions: {
			type: 'int',
			defaultsTo: 0
		},
		pending: {
			type: 'int',
			defaultsTo: 0
		},
		totaltime: {
			type: 'int',
			defaultsTo: 0
		},
		is_correct: {
			type: 'boolean',
			defaultsTo: false
		},
		points: {
			type: 'float',
			defaultsTo: 0
		},
		jury: {
			model: 'user'
		},
		juryModified: {
			type: 'boolean',
			defaultsTo: false
		}
	}
};
