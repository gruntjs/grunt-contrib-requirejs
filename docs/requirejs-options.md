# Options

For a full list of possible options, [see the r.js example build file](https://github.com/jrburke/r.js/blob/master/build/example.build.js).

#### almond

The almond option allows you to easily configure an [almond.js](https://github.com/jrburke/almond) build. Here is a sample config which assumes that the almond.js library file is located at `dev/scripts/libs/almond.js`:

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

##### almond.almondFile
Type: `String`

Location of the almond.js file relative to the baseUrl.

##### almond.html.src
Type: `String`

Location of the html that contains the following block to be replaced with a script tag linking to the optimized script:
```html
<!-- almond -->
<script data-main="main" src="libs/require.js"></script>
<!-- almond -->
```

##### almond.html.dest
Type: `String`

Location to write the html file which contains a reference to the optimized script. The above example would replace the <!-- almond -->html block with the following markup:
```html
<script src="scripts/main-optimized.js"></script>
```

## done(done, build)

The done option is an optional hook to receive the r.js build output. The first argument is the grunt async callback that you are required to call if you provide the done hook. This informs grunt that the task is complete. The second parameter is the build output from r.js.

