'use strict';

var gulp = require('gulp');
var helper = require('../../helpers');
var noop = require('through2').obj;
var jsPipe = require('../js');

var args = helper.args;
var plugin = helper.load;

module.exports = buildAppPipe;

/**
 * Builds the main angular app for production.
 *
 * @returns {Pipe}
 */
function buildAppPipe () {
    return gulp.src([
        'src/app/**/*.js',
        'src/app/**/*.html'
    ])
    .pipe(plugin.plumber())
    .pipe(args.verbose ? plugin.print() : noop())

    // Builds `app.templates.js`
    .pipe(plugin.if('*.html', plugin.htmlmin({
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeComments: true
    })))
    .pipe(plugin.if('*.html',
        plugin.angularTemplatecache(
            'app.templates.js',
            {
                module: 'app.core',
                root: '/app/'
            }
        ))
    )

    .pipe(plugin.order(
        [
            '**/*.module.js',
            '**/*'
        ]
    ))
    .pipe(jsPipe())

    .pipe(plugin.concat('app.js'))
    .pipe(plugin.uglify())

    .pipe(plugin.rev())
    .pipe(plugin.sourcemaps.write('.'))
    .pipe(gulp.dest('build'));
}
