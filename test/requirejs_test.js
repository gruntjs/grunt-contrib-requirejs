'use strict';

var grunt = require('grunt');

exports.requirejs = {
  main: function(test) {
    var expect, result;

    test.expect(1);

    expect = 'define("hello",[],function(){return"hello"}),define("world",[],function(){return"world"}),require(["hello","world"],function(e,n){console.log(e,n)}),define("project",function(){});';
    result = grunt.file.read('tmp/requirejs.js');
    test.equal(expect, result, 'should optimize javascript modules with requireJS');

    test.done();
  },

  template: function(test) {
    var expect, result;

    test.expect(1);

    expect = 'define("hello",[],function(){return"hello"}),define("world",[],function(){return"world"}),require(["hello","world"],function(e,n){console.log(e,n)}),define("project",function(){});';
    result = grunt.file.read('tmp/requirejs-template.js');
    test.equal(expect, result, 'should process options with template variables.');

    test.done();
  },

  done: function(test) {
    var expect, result;

    test.expect(1);

    expect = 7;
    result = grunt.file.read('tmp/done-build.txt').split('\n').length;
    test.equal(expect, result, 'should provide a done hook with the output');

    test.done();
  }
};
