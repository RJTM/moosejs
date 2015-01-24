/**
* TestcaseGrade.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		testcase: {
			model: 'testcase'
		},
		grade: {
			model: 'grade'
		},
		result: {
			type: 'string'
		},
		output: {
			type: 'text'
		}
	}
};

