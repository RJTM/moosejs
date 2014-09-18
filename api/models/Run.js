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
  	status: {
  		type: 'string',
  		enum: ['pending','judging','done','invalid'],
  		defaultsTo: 'pending'
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
      grades: {
             collection: 'grade',
             via: 'run'
      }
  }
};

