'use strict';

var getRandomInt  =  function (min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

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
		var answer = getRandomInt(0, 4)
		var answers = ['TLE', 'WA', 'AC', 'RE', 'PE'];
		setTimeout(function(){
			callback(null, {result: answers[answer], message: ''});
		}, getRandomInt(3000, 10000));
	}
}