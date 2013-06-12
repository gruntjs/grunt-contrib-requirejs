/*
 * grunt-contrib-requirejs
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tyler Kellen, contributors
 * Licensed under the MIT license.
 */

var path = require('path');
var async = require('async');

module.exports = function(grunt) {
  'use strict';

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
      logLevel: 0,
      done: function(done, response){
        done();
      }
    });

    if(this.files.length === 0) {

      grunt.verbose.writeflags(options, 'Options');
      requirejs.optimize(options, options.done.bind(null, done));

    } else {
      async.eachSeries(this.files, function(file, _done) {

        if(file.src.length === 0) {
          grunt.warn("no src file");
        }

        if(file.src.length > 1) {
          grunt.log.warn('Should have only one src file: choosing the first one.');
        }

        var abs_name = path.resolve(process.cwd(), file.src[0]);
        // require: By default, all modules are located relative
        // to this baseUrl -> get relative path.
        // TODO: support AppDir and Co
        var name = path.relative(options.baseUrl, abs_name);

        // remove extension
        var ext = path.extname(name);
        name = name.slice(0, -ext.length);

        if(!file.dest) {
          grunt.warn('No destination file.');
          return;
        }

        var _options = grunt.util._.extend(options, {
          out : path.resolve(process.cwd(), file.dest),
          name : name
        });

        grunt.verbose.writeflags(_options, 'Options');

        requirejs.optimize(_options, function(){_done(null);});

      }, options.done.bind(null, done));
    }
  });
};
