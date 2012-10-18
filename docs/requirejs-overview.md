# Overview

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