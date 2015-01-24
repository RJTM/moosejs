/**
* Language.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	name: {
  		type: 'string'
  	},
  	runs: {
  		collection: 'run',
  		via: 'language'
  	},
  	compiler: {
  		type: 'string'
  	},
  	fileName: {
  		type: 'string'
  	},
  	executable: {
  		type: 'string'
  	},
  	arguments: {
  		type: 'string'
  	},
      extension: {
             type: 'string'
      },
      syntaxHighlighting: {
             type: 'string'
      }
  },
  seedData: [
  	{
  		name: 'C++',
  		compiler: 'g++',
  		fileName: 'source.cpp',
  		executable: './a.out',
  		arguments: '-O2',
             extension: 'cpp',
             syntaxHighlighting: 'cpp'
  	},
  	{
  		name: 'Python',
  		compiler: '',
  		fileName: 'source.py',
  		executable: 'python source.py',
  		arguments: '',
             extension: 'py',
             syntaxHighlighting: 'python'
  	}
  ]
};

