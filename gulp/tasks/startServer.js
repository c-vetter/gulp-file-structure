'use strict';

var browserSync = require('browser-sync');
var redirectViews = require('connect-history-api-fallback');

module.exports = startServer;

/**
 * Serves the dev environment.
 *
 * @param {Function} done - callback needed for async support
 */
function startServer (done) {
    var options;

    options = {
        files: [
            'dev/**/*',
            '!dev/**/*.map',
            'src/**/*.html'
        ],
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'info',
        logPrefix: 'server',
        notify: true,
        port: 3000,
        reloadDelay: 200,
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

    done();
}
