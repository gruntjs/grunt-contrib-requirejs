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
    grunt.verbose.writeflags(options, 'Options');

    if (options.almond) {
      options.insertRequire = [options.name];
      options.include       = [options.name];
      options.name          = options.almond.almondFile;

      var htmlSource   = grunt.file.read(options.almond.html.src);
      var htmlSections = htmlSource.split('<!-- almond -->');

      // Determine the relative location of the generated script by removing the folders that the paths have in common
      var i = 0;
      while (options.almond.html.dest[i] === options.out[i]) {
        i++;
      }
      var relativeScriptLocaiton = options.almond.scriptSrc || options.out.slice(i);

      grunt.file.write(options.almond.html.dest, htmlSections[0] + '<script src="' + relativeScriptLocaiton + '"></script>' + htmlSections[2]);
    }

    requirejs.optimize(options, options.done.bind(null, done));
  });
};
