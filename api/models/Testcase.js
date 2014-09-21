/**
* Testcase.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	subtask: {
  		model: 'subtask'
  	},
    inputFile: 'string',
    outputFile: 'string'
  },
  seedData: [
      {
        subtask: 1
      },
      {
          subtask: 1
      },
      {
        subtask: 1
      }
  ]
};

