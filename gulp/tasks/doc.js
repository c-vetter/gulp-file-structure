'use strict';

var gulp = require('gulp');
var helper = require('../helpers');
var noop = require('through2').obj;
var wiredep = require('wiredep').stream;

var args = helper.args;
var plugin = helper.load;
var watch = plugin.watch;

gulp.task('doc', [
    'app',
    'styles'
], doc);

/**
 * Triggers building `index.html` on start and on file changes.
 *
 * @returns {Pipe}
 */
function doc () {
    watch(
        [
            'dev/**/*.css',
            'dev/**/*.js'
        ],
        {events: ['add', 'unlink']},
        buildIndex
    );

    watch(
        'src/index.html',
        {events: ['change']},
        buildIndex
    );

    return buildIndex();
}

/**
 * Builds the development version of `index.html`.
 */
function buildIndex () {
    return gulp.src('src/index.html')
    .pipe(plugin.plumber())
    .pipe(args.verbose ? plugin.print() : noop())
    .pipe(wiredep({
        ignorePath: '../bower_components'
    }))
    .pipe(plugin.inject(gulp.src(
        [
            'dev/app/**/*.module.js',
            'dev/app/**/*',
            'dev/styles/**/*'
        ],
        {read: false}),
        {
            ignorePath: 'dev',
            relative: false
        }
    ))
    .pipe(gulp.dest('dev'));
}
