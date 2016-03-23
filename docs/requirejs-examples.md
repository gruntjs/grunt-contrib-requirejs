# Usage Examples

```js
requirejs: {
  compile: {
    options: {
      baseUrl: 'path/to/base',
      mainConfigFile: 'path/to/config.js',
      name: 'path/to/almond', /* assumes a production build using almond, if you don't use almond, you
                                 need to set the "includes" or "modules" option instead of name */
      include: [ 'src/main.js' ],
      out: 'path/to/optimized.js'
    }
  }
}
```

## Done

```js
requirejs: {
  compile: {
    options: {
      baseUrl: 'path/to/base',
      mainConfigFile: 'path/to/config.js',
      done: function(done, output) {
        var duplicates = require('rjs-build-analysis').duplicates(output);

        if (Object.keys(duplicates).length) {
          grunt.log.subhead('Duplicates found in requirejs build:');
          grunt.log.warn(duplicates);
          return done(new Error('r.js built duplicate modules, please check the excludes option.'));
        }

        done();
      }
    }
  }
}
```

## Error

```js
requirejs: {
  compile: {
    options: {
      baseUrl: 'path/to/base',
      mainConfigFile: 'path/to/config.js',
      error: function(done, err) {
        grunt.log.warn(err);
        done();
      }
    }
  }
}
```
