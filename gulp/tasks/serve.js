'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var redirectViews = require('connect-history-api-fallback');

/**
 * Serves the dev environment.
 */
gulp.task('serve', ['doc'], function serve () {
    var options;

    options = {
        files: [
            'dev/**/*',
            'src/**/*.html'
        ],
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'info',
        logPrefix: 'serve-dev',
        notify: true,
        port: 3000,
        reloadDelay: 100,
        server: {
            baseDir: [
                'dev',
                'src',
                'bower_components'
            ],
            middleware: redirectViews(),
            routes: {
                '/data': 'data'
            }
        }
    };

    browserSync(options);
});
