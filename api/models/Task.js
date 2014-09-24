/**
* Task.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name: {
  		type: 'string'
  	},
  	contest: {
  		model: 'contest'
  	},
  	runs: {
  		collection: 'run',
  		via: 'task'
  	},
      subtasks: {
             collection: 'subtask',
             via: 'task',
      }
  },
    
  seedData: [{
    name: "DummyTask",
    contest: 1,
  },
 {
     name: "Flips",
     contest: 1,
 },
 {
     name: "Diet Coke",
     contest: 1,
 }],
    
};

