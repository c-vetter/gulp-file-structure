'use strict';

var gulp = require('gulp');
var helper = require('../helpers');
var noop = require('through2').obj;
var pipe = require('../pipes');
var rm = require('del').sync;
var wiredep = require('wiredep').stream;

var args = helper.args;
var plugin = helper.load;

gulp.task(
    'build',
    buildIndex
);

/**
 * Builds `index.html` for production.
 *
 * @returns {Pipe}
 */
function buildIndex () {
    rm('build/**/*');

    // Can run asynchronous without doing real harm.
    pipe.build.data();

    return gulp.src('src/index.html')
    .pipe(plugin.plumber())
    .pipe(args.verbose ? plugin.print() : noop())
    .pipe(wiredep({
        ignorePath: '../'
    }))
    .pipe(plugin.inject(pipe.build.app(), {
        ignorePath: 'build',
        relative: false
    }))
    .pipe(plugin.inject(pipe.build.dependencies(), {
        ignorePath: 'build',
        name: 'bower',
        relative: false
    }))
    .pipe(plugin.inject(pipe.build.styles(), {
        ignorePath: 'build',
        relative: false
    }))

    // https://github.com/kangax/html-minifier/issues/215
    .pipe(plugin.htmlmin({
        removeComments: true
    }))
    .pipe(plugin.htmlmin({
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        preserveLineBreaks: true
    }))

    .pipe(gulp.dest('build'));
}
