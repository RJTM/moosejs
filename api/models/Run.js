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
  },
  seedData : [{
    time : 5,
    status : 'done',
    owner : 5,
    task : 1,
    source : 'assets/DummyContest/zyx/DummyTask.cpp'
  },
  {
    time : 10,
    status : 'judging',
    owner : 6,
    task : 1,
    source : 'assets/DummyContest/jbernadas/DummyTask.cpp',
  },
  {
    time : 20,
    status : 'pending',
    owner : 6,
    task : 2,
    source : 'assets/DummyContest/jbernadas/Flips.cpp'
  }]
};

