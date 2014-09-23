/**
 * Default model configuration
 * (sails.config.models)
 *
 * Unless you override them, the following properties will be included
 * in each of your models.
 *
 * For more info on Sails models, see:
 * http://sailsjs.org/#/documentation/concepts/ORM
 */

module.exports.models = {

  /***************************************************************************
  *                                                                          *
  * Your app's default connection. i.e. the name of one of your app's        *
  * connections (see `config/connections.js`)                                *
  *                                                                          *
  ***************************************************************************/
  migrate: 'safe',
  // connection: 'localDiskDb'
    
  seed: function(cb){
    var self = this;
    var modelName = self.adapter.identity.charAt(0).toUpperCase() + self.adapter.identity.slice(1);
    if (!self.seedData) {
      sails.log.debug('No data avaliable to seed ' + modelName);
      cb();
      return;
    }
    self.count().exec(function (err, count){
        if(!err && count === 0){
            sails.log.debug('Seeding ' + modelName);
            self.seedData.forEach(function(element){
                 self.create(element).exec(function(err, result){
                    if(err){
                        sails.log.debug(err);
                        cb();
                    }
                });
            });
            sails.log.debug(modelName +' seed planted');
            cb();
        }else{
            sails.log.debug('No need to seed '+ modelName);
            cb();
        }
    });
  }
};
