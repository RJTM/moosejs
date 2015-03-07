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
      code: {
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
      },
      color : {
        type : 'string'
      }
  },

  afterDestroy: function(destroyedRecords, cb){
      ScoreboardService.deleteTask(destroyedRecords);
      async.map(destroyedRecords, function(currentValue, callback){
        callback(null, currentValue.id);
      }, function(err, results){
          Subtask.destroy({
            task: results
          }).exec(cb);
      });
    },
    
 //  seedData: [{
 //    name: "DummyTask",
 //    code: 'dummy',
 //    contest: 1,
 //    color : '#D949E3'
 //  },
 // {
 //     name: "Flips",
 //     code: 'flips',
 //     contest: 1,
 //     color : '#4953E3'
 // },
 // {
 //     name: "Diet Coke",
 //     code: 'diet',
 //     contest: 1,
 //     color : '#49E389'
 // }],
    
};

