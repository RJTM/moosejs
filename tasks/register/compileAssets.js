module.exports = function (grunt) {
	grunt.registerTask('compileAssets', [
		'bower:dev',
		'ngAnnotate',
		'clean:dev',
		'jst:dev',
		'less:dev',
		'copy:dev',
		'coffee:dev'
	]);
};
