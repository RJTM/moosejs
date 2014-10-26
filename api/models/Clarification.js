/**
* Clarification.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		owner: {
			model: 'user'
		},
		jury: {
			model: 'user'
		},
		toAll: {
			type: 'boolean',
			defaultsTo: false
		},
		subject: {
			type: 'string',
			defaultsTo: 'General Issue'
		},
		question: {
			type: 'text'
		},
		answer: {
			type: 'text'
		}
	},

	seedData: [
		{
			owner: 1,
			jury: 2,
			question: 'Is this the real life?',
			answer: 'Is this just fantasy'
		},
		{
			owner: 2,
			jury: 1,
			question: 'Is this thing working',
			answer: 'Oh yes it is'
		},
		{
			owner: 1,
			question: 'I have no answer :('
		}

	]
};

