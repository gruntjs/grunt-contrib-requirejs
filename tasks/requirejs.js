/*
 * grunt-contrib-requirejs
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tyler Kellen, contributors
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  var resolve = require('path').resolve;
  var requirejs = require('requirejs');

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
      logLevel: 0
    });
    grunt.verbose.writeflags(options, 'Options');

    if (options.buildProfile && options.buildProfile.path) {
      options = build(options, options.buildProfile);

      // clean up the passed options, just to be safe
      delete options.buildProfile;

      grunt.verbose.writeflags(options, 'buildProfile Merged Options');
    }

    requirejs.optimize(options, function(response) {
      done();
    });
  });

  function build (options, buildProfile) {
    var profilePath = resolve(buildProfile.path);
    var profileOptions = buildProfile.options || {};
    var profile = require(profilePath)(profileOptions);

    var a = profile;
    var b = options;
    if (buildProfile.override === true) {
      // if the override flag is set, buildProfile will override passed options
      a = options;
      b = profile;
    }

    return extend(a, b);
  };

  function extend(a, b) {
    Object.keys(b).forEach(function(key) {
      a[key] = b[key];
    });
    return a;
  };
};
