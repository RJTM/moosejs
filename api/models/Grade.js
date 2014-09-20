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
    subtask: {
        model: 'subtask'
    },
  	judgehost: {
  		model: 'judgehost'
  	},
  	result: {
  		type: 'string',
  	},
    status: {
  		type: 'string',
  		enum: ['pending','judging','done','invalid'],
  		defaultsTo: 'pending'
  	},
  }
};

