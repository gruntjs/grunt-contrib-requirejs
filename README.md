# grunt-contrib-requirejs [![Build Status](https://travis-ci.org/gruntjs/grunt-contrib-requirejs.png?branch=master)](https://travis-ci.org/gruntjs/grunt-contrib-requirejs)

> Optimize RequireJS projects using r.js.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-requirejs --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-requirejs');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.3](https://github.com/gruntjs/grunt-contrib-requirejs/tree/grunt-0.3-stable).*



## Requirejs task
_Run this task with the `grunt requirejs` command._

Task targets and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

For a full list of possible options, [see the r.js example build file](https://github.com/jrburke/r.js/blob/master/build/example.build.js).

###### almond

The almond option allows you to easily configure an [almond](https://github.com/jrburke/almond) build. Here is a sample config which assumes that the almond.js library file is located at `dev/scripts/libs/almond.js`:

```js
requirejs: {
  compile: {
    options: {
      baseUrl: 'dev/scripts',
      name: 'main',
      out: 'dist/scripts/main-optimized.js',
      almond: {
        almondFile: 'libs/almond',
        html: {
          src: 'dev/index.html',
          dest: 'dist/index.html'
        }
      }
    }
  }
}
```

The almond option has three required properties: 

###### almond.almondFile
Type: `String`

Location of the almond.js file relative to the baseUrl.

###### almond.html.src
Type: `String`

Location of the html file that contains an almond block to be replaced with a script tag linking to the optimized script. Here is an example almond block:
```html
<!-- almond -->
<script data-main="main" src="libs/require.js"></script>
<!-- almond -->
```

###### almond.html.dest
Type: `String`

Location to write the html file which contains a reference to the optimized script. The above example would replace the `<!-- almond -->` delimited html block with the following markup:
```html
<script src="scripts/main-optimized.js"></script>
```

#### done(done, build)

The done option is an optional hook to receive the r.js build output. The first argument is the grunt async callback that you are required to call if you provide the done hook. This informs grunt that the task is complete. The second parameter is the build output from r.js.


### Usage Examples

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

#### Done

```js
requirejs: {
  compile: {
    options: {
      baseUrl: "path/to/base",
      mainConfigFile: "path/to/config.js",
      done: function(done, output) {
        var duplicates = require('rjs-build-analysis').duplicates(output);
        
        if (duplicates.length > 0) {
          grunt.log.subhead('Duplicates found in requirejs build:');
          grunt.log.warn(duplicates);
          done(new Error('r.js built duplicate modules, please check the excludes option.'));
        }
        
        done();
      }
    }
  }
}
```


## Release History

 * 2013-05-16   v0.4.1   Add 'done' option.
 * 2013-02-15   v0.4.0   First official release for Grunt 0.4.0.
 * 2013-01-23   v0.4.0rc7   Updating to work with grunt v0.4.0rc7.
 * 2013-01-09   v0.4.0rc5   Updating to work with grunt v0.4.0rc5.
 * 2012-10-12   v0.3.3   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-10-09   v0.3.1   Bump to RequireJS 2.1.x. Run optimizer async.
 * 2012-09-23   v0.3.0   Options no longer accepted from global config key.
 * 2012-09-10   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Tyler Kellen](http://goingslowly.com/)

*This file was generated on Tue Aug 13 2013 23:23:50.*
