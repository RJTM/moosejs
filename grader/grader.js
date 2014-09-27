'use strict';

module.exports = {

	compile: function(source, callback){
		/**
		
			TODO:
			- receive source file
			- compile
			- send compiler result
		
		**/
		
		callback(null, { status: 0});
	},

	run : function(source, refInput, refOutput, timelimit, memorylimit, callback){
		callback(null, {result: 'AC', message: ''});
	}
}