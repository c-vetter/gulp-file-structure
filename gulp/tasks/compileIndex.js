'use strict';

var gulp = require('gulp');
var helper = require('../helpers');
var wiredep = require('wiredep').stream;

var plugin = helper.plugins;

module.exports = watchAndCompileIndex;

/**
 * Triggers building `index.html` on start and on file changes.
 *
 * @returns {Pipe}
 */
function watchAndCompileIndex () {
    gulp.watch(
        [
            'dev/**/*.css',
            'dev/**/*.js'
        ],
        {events: ['add', 'unlink']},
        compileIndex
    );

    gulp.watch(
        'src/index.html',
        {events: ['change']},
        compileIndex
    );

    return compileIndex();
}

/**
 * Builds the development version of `index.html`.
 */
function compileIndex () {
    return gulp.src('src/index.html')
    .pipe(plugin.duration('Build index.html'))
    .pipe(helper.printable())
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
