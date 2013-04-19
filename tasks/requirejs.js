/*
 * grunt-contrib-requirejs
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tyler Kellen, contributors
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  'use strict';

  var requirejs = require('requirejs');
  var path = require('path');

  var resolve = path.resolve;
  var join = path.join;
  var _ = grunt.util._;

  // TODO: extend this to send build log to grunt.log.ok / grunt.log.error
  // by overriding the r.js logger (or submit issue to r.js to expand logging support)
  requirejs.define('node/print', [], function() {
    return function print(msg) {
      if (msg.substring(0, 5) === 'Error') {
        grunt.log.errorlns(msg);
        grunt.fail.warn('RequireJS failed.');
      } else {
        grunt.log.oklns(msg);
      }
    };
  });

  grunt.registerMultiTask('requirejs', 'Build a RequireJS project.', function() {

    var done = this.async();
    var options = this.options({
      'logLevel': 0,
      'paths': {},
      'baseUrl': ''
    });

    // make paths absolute, to be able to include files outside the base directory
    var paths = options.paths = options.paths || {};
    _.each(paths, function (path, key) {
      paths[key] = resolve(join(options.baseUrl, path));
    });

    // if no out-file is provided, use the target name
    var out = options.out || this.target;

    // if trailing ".js" is missing on the outFile, append it
    if(!(/\.js$/.test(out))) {
      out = out + '.js';
    }

    // make the out-file path absolute too
    options.out = resolve(join(options.baseUrl, options.out));

    grunt.verbose.writeflags(options, 'Options');

    requirejs.optimize(options, function(response) {
      done();
    });
  });
};
