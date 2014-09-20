/**
* Contest.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name: {
  		type: 'string'
  	},
  	tasks: {
  		collection: 'task',
  		via: 'contest'
  	}
  },
    
  seedData: [{
    name: "DummyContest",
    
  },
 {
     name: "Slurpee Contest",
     
 },
 {
     name: "TuktukContest",
 }],
};

