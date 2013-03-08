module.exports = function( grunt ) {

grunt.loadNpmTasks( "grunt-contrib-jshint" );

grunt.initConfig({
	jshint: {
		options: {
			jshintrc: ".jshintrc"
		},
		files: {
			src: [ "*.js", "lib/**/*.js" ]
		}
	}
});

grunt.registerTask( "lint", [ "jshint" ] );
grunt.registerTask( "default", [ "lint" ] );

};
