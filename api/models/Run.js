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
			model: 'language'
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
	seedData : []
};

