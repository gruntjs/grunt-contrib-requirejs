/*
 * grunt-contrib-requirejs
 * http://gruntjs.com/
 *
 * Copyright (c) 2012-2016 Tyler Kellen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    requirejs: {
      compile: {
        options: {
          baseUrl: 'test/fixtures',
          name: 'project',
          out: 'tmp/requirejs.js'
        }
      },
      template: {
        options: {
          baseUrl: 'test/fixtures',
          name: 'project',
          out: 'tmp/requirejs-template.js',
          verbose: true
        }
      },
      onOptimize: {
        options: {
          baseUrl: 'test/fixtures',
          name: 'project',
          out: 'tmp/requirejs-onoptimize.js',
          done: function(done, build) {
            grunt.file.write('tmp/done-build.txt', build);
            done();
          }
        }
      },
      'custom-requirejs': {
        options: {
          requirejs: require('requirejs'),
          baseUrl: 'test/fixtures',
          name: 'project',
          out: 'tmp/custom-requirejs.js'
        }
      },
      'build-failure': {
        options: {
          baseUrl: 'test/failure',
          name: 'project',
          out: 'tmp/build-failure.js',
          force: true
        }
      },
      'done-failure': {
        options: {
          baseUrl: 'test/fixtures',
          name: 'project',
          out: 'tmp/done-failure.js',
          done: function() {
            throw new Error('in done');
          },
          force: true
        }
      },
      'error-failure': {
        options: {
          baseUrl: 'test/failure',
          name: 'project',
          out: 'tmp/error-failure.js',
          error: function() {
            throw new Error('in error');
          },
          force: true
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-contrib-internal');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'jshint', 'requirejs', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test', 'build-contrib']);

};
