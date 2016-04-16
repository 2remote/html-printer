
module.exports = function(grunt) {
  'use strict';
  grunt.initConfig({
    jshint: {
      debug: [
        'test/**/*.js',
        'Gruntfile.js',
        'app.js',
      ]
    },

    tape: {
      files: ['test/**/*.js'],
    },

    watch: {
      test: {
        tasks: ['test'],
        files: ['Gruntfile.js', 'app.js', 'test/**/*.js', 'lib/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-tape');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.registerTask('test', ['jshint', 'tape']);
};
