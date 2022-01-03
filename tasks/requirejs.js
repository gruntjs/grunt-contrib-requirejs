/*
 * grunt-contrib-requirejs
 * http://gruntjs.com/
 *
 * Copyright (c) 2012-2016 Tyler Kellen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var LOG_LEVEL_TRACE = 0, LOG_LEVEL_WARN = 2;
  var force;

  function warning() {
    /* c8 ignore next */
    return force ? grunt.log.warn : grunt.fail.warn;
  }

  function fatal() {
    /* c8 ignore next */
    return force ? grunt.log.fatal : grunt.fail.fatal;
  }

  function initializeRequire(requirejs) {
    if (!requirejs) {
      requirejs = require('requirejs');
    }

    // TODO: extend this to send build log to grunt.log.ok / grunt.log.error
    // by overriding the r.js logger (or submit issue to r.js to expand logging support)
    requirejs.define('node/print', [], function() {
      return function print(msg) {
        if (msg.substring(0, 5) === 'Error') {
          grunt.log.errorlns(msg);
          warning()('RequireJS failed.');
        /* c8 ignore next 3 */
        } else {
          grunt.log.oklns(msg);
        }
      };
    });

    return requirejs;
  }

  grunt.registerMultiTask('requirejs', 'Build a RequireJS project.', function() {
    var done = this.async();
    var options = this.options({
      requirejs: undefined,
      /* c8 ignore next */
      logLevel: grunt.option('verbose') ? LOG_LEVEL_TRACE : LOG_LEVEL_WARN,
      error: false,
      force: false,
      verbose: false,
      done: function(done) {
        done();
      }
    });
    // If force is set, failures will be only logged and not abort the process.
    force = options.force;
    // If verbose is set, requirejs will print more about the progress on the console.
    if (options.verbose) {
      options.logLevel = LOG_LEVEL_TRACE;
    }

    // The following catches errors in the user-defined `done` function and outputs them.
    var tryCatchDone = function(fn, done, output) {
      try {
        fn(done, output);
      } catch (e) {
        warning()('There was an error while processing your done function: "' + e + '"');
        done();
      }
    };

    // The following catches errors in the user-defined `error` function and passes them.
    // if the error function options is not set, this value should be undefined
    var tryCatchError = function(fn, done, err) {
      try {
        fn(done, err);
      } catch (e) {
        fatal()('There was an error while processing your error function: "' + e + '"');
        done();
      }
    };

    // Ensure that done() is always called. Not calling it would abort
    // execution of still pending tasks after this one.
    var doneNoArgs = function() {
      done();
    };

    var requirejs = initializeRequire(options.requirejs);
    requirejs.optimize(
            options,
            tryCatchDone.bind(null, options.done, doneNoArgs),
            options.error ? tryCatchError.bind(null, options.error, doneNoArgs) : doneNoArgs
    );
  });
};
