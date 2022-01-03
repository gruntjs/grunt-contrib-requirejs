# Options

For a full list of possible options, [see the r.js example build file](https://github.com/jrburke/r.js/blob/master/build/example.build.js).

## done(done, build)

The `done` option is an optional hook to receive the `r.js` build output. The first argument is the grunt async callback that you are required to call if you provide the `done` hook. This informs grunt that the task is complete. The second parameter is the build output from `r.js`.

## error(done, error)

The `error` option is an optional hook to receive the `r.js` error. The first argument is the grunt async callback that you are required to call if you provide the `done` hook. This informs grunt that the task is complete. The second parameter is the error instance thrown from `r.js` in case of failure.

## requirejs

The `requirejs` option is an object exported from a module compatible with `r.js`. You can pass an alternative optimizer version to the task by this option. The module `requirejs` is used by `require('requirejs')` by default.

## logLevel

The `logLevel` option is a number to be passed to the `r.js` as the log level. The values can be 0 (tracing), 1 (information), 2 (warning) or 3 (error). The default if 2 (warning).

## verbose

The `verbose` option is a boolean to enable logging at the level 0 (tracing) if set to `true`. The default is `false`.

## force

The `force` option is a boolean, which if set to `true`, forces the grunt running and executing further tasks, although the current task failed. The default is `false`.
