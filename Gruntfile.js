'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
    tape: {
      files: ['test/**/*.js'],
    },

    watch: {
      test: {
        tasks: ['tape'],
        files: ['test/**/*.js', 'lib/**/*.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-tape');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['tape']);
};
