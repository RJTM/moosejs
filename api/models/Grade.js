/**
* Grade.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		run: {
			model: 'run'
		},
		task: {
			model: 'task'
		},
		judgehost: {
			model: 'judgehost'
		},
		result: {
			type: 'string',
		},
		status: {
			type: 'string',
			enum: ['pending','judging','done','verified','invalid'],
			defaultsTo: 'pending'
		},
		testcaseGrades: {
			collection: 'testcasegrade',
			via: 'grade'
		}
	}
};

