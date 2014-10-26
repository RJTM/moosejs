/**
* Run.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		time: {
			type: 'int'
		},
		owner: {
			model: 'user'
		},
		task: {
			model: 'task'
		},
		source: {
			type: 'string'
		},
		language: {
			type: 'string'
		},
		grades: {
			collection: 'grade',
			via: 'run'
		},
		ignore: {
			type: 'boolean',
			defaultsTo: false
		},
		veredicts: {
			collection: 'veredict',
			via: 'run'
		}
	},
	seedData : [{
		time : 5,
		owner : 5,
		task : 1,
		source : 'assets/DummyContest/zyx/DummyTask.cpp'
	},
	{
		time : 10,
		owner : 6,
		task : 1,
		source : 'assets/DummyContest/jbernadas/DummyTask.cpp',
	},
	{
		time : 20,
		owner : 6,
		task : 2,
		source : 'assets/DummyContest/jbernadas/Flips.cpp'
	}]
};

