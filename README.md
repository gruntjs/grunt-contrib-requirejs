# grunt-contrib-requirejs [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-requirejs.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-requirejs)

> Optimize RequireJS projects using r.js.

_Note that this plugin has not yet been released, and only works with the latest bleeding-edge, in-development version of grunt. See the [When will I be able to use in-development feature 'X'?](https://github.com/gruntjs/grunt/blob/devel/docs/faq.md#when-will-i-be-able-to-use-in-development-feature-x) FAQ entry for more information._

## Getting Started
_If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin with the following command:

```bash
npm install grunt-contrib-requirejs --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-contrib-requirejs');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task or tasks. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html


## The requirejs task

### Overview

In your project's Gruntfile, add a section named `requirejs` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  requirejs: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

Options are passed to the [RequireJS Optimizer](http://requirejs.org/docs/optimization.html).
### Options

For a full list of possible options, [see the r.js example build file](https://github.com/jrburke/r.js/blob/master/build/example.build.js).
### Examples

```js
requirejs: {
  compile: {
    options: {
      baseUrl: "path/to/base",
      mainConfigFile: "path/to/config.js",
      out: "path/to/optimized.js"
    }
  }
}
```

## Release History

 * 2012-10-11 - v0.3.3 - Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-10-08 - v0.3.1 - Bump to RequireJS 2.1.x. Run optimizer async.
 * 2012-09-22 - v0.3.0 - Options no longer accepted from global config key.
 * 2012-09-09 - v0.2.0 - Refactored from grunt-contrib into individual repo.

--
Task submitted by <a href="http://goingslowly.com/">Tyler Kellen</a>.

*Generated on Thu Oct 18 2012 17:41:58.*
