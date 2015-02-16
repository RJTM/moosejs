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
      },
      timeFactor: {
             type: 'float',
             defaultsTo: 1.0
      },
      allowed: {
             type: 'boolean',
             defaultsTo: true
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
             syntaxHighlighting: 'python',
             timeFactor: 5.0
  	},
      {
        name: 'Ruby',
        compiler: '',
        fileName: 'source.rb',
        executable: 'ruby source.rb',
        arguments: '',
        extension: 'rb',
        syntaxHighlighting: 'ruby',
        timeFactor: 3.0
      },
      {
        name: 'Clojure',
        compiler: '',
        fileName: 'source.clj',
        executable: 'clojure source.clj',
        arguments: '',
        extension: 'clj',
        syntaxHighlighting: 'clike'
      },
      {
        name: 'PHP',
        compiler: '',
        fileName: 'source.php',
        executable: 'php source.php',
        arguments: '',
        extension: 'php',
        syntaxHighlighting: 'php',
        timeFactor: 3.0
      },
      {
        name: 'Javascript',
        compiler: '',
        fileName: 'source.js',
        executable: 'node source.js',
        arguments: '',
        extension: 'js',
        syntaxHighlighting: 'javascript',
        timeFactor: 2.0
      },
      {
        name: 'Scala',
        compiler: '',
        fileName: 'source.scala',
        executable: 'scala source.scala',
        arguments: '',
        extension: 'scala',
        syntaxHighlighting: 'scala',
        timeFactor: 2.0
      },
      {
        name: 'Go',
        compiler: '',
        fileName: 'source.go',
        executable: 'go run source.go',
        arguments: '',
        extension: 'go',
        syntaxHighlighting: 'go'
      },
      {
        name: 'Java',
        compiler: 'javac',
        fileName: 'source.java',
        executable: 'java source',
        arguments: '',
        extension: 'java',
        syntaxHighlighting: 'java'
      },
      {
        name: 'C#',
        compiler: 'gmcs',
        fileName: 'source.cs',
        executable: 'mono source.exe',
        arguments: '',
        extension: 'cs',
        syntaxHighlighting: 'csharp',
        timeFactor: 2.0
      },
      {
        name: 'Perl',
        compiler: '',
        fileName: 'source.pl',
        executable: 'perl source.pl',
        arguments: '',
        extension: 'pl',
        syntaxHighlighting: 'perl'
      },
      {
        name: 'Haskell',
        compiler: 'ghc',
        fileName: 'source.hs',
        executable: './source',
        arguments: '',
        extension: 'hs',
        syntaxHighlighting: 'haskell'
      },
      {
        name: 'Pascal',
        compiler: 'fpc',
        fileName: 'source.pas',
        executable: './source',
        arguments: '',
        extension: 'pas',
        syntaxHighlighting: 'pascal'
      }
  ]
};

