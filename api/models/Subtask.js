/**
* Subtask.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		task: {
			model: 'task'
		},
		points: {
			type: 'int'
		},
		testcases: {
			collection: 'testcase',
			via: 'subtask'
		},
		feedback: {
			type: 'boolean'
		},
		timeLimit: {
			type: 'integer'
		},
		memoryLimit: {
			type: 'integer'
		},
		veredicts: {
			collection: 'veredict',
			via: 'subtask'
		}
	},

	seedData: [
	{
		task: 1,
		points: 20,
		timeLimit: 5,
		memoryLimit: 50
	},
	{
		task: 1,
		points: 30
	},
	{
		task: 1,
		points: 50
	}
	]
};

