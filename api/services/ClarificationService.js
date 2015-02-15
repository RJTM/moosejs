'use strict';

module.exports = {
	/*
		Service to create Clarifications
		Params : clar
	 */
	create : function(clar, cb){
		Clarification.create(clar).exec(function(err, result){
			if(err){
				cb(err);
			}

			Clarification.findOne(result.id).populate('contest').populate('owner')
			.exec(function(err, clarification){
				if(err)
					cb(err);

				Clarification.publishCreate(clarification);
				cb(null, clarification);
			});
		});
	}
}