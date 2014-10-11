module.exports = function(grunt){
	grunt.config.set('ngAnnotate',{
		options: {
			remove: true,
		},
		dev: {
			files: [
				{
					src: [
						'assets/js/**/*.controller.js',
						'assets/js/**/*.module.js',
						'assets/js/**/*.filter.js',
						'assets/js/**/*.model.js',
						'assets/js/**/*.service.js',
						'assets/js/**/*.factory.js',
						'assets/js/**/*.directive.js',
						'assets/js/**/routes.js'
					]
				}
			]
		}
	});

	grunt.loadNpmTasks('grunt-ng-annotate');
}