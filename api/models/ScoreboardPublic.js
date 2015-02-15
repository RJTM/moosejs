/**
* ScoreboardPublic.js
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
		subtask: {
			model: 'subtask'
		},
		submissions: {
			type: 'int',
			defaultsTo: 0
		},
		pending: {
			type: 'int',
			defaultsTo: 0
		},
		time: {
			type: 'int',
			defaultsTo: 0
		},
		penalty: {
			type: 'int',
			defaultsTo: 0
		},
		isCorrect: {
			type: 'boolean',
			defaultsTo: false
		},
		points: {
			type: 'float',
			defaultsTo: 0
		}
	}
};
