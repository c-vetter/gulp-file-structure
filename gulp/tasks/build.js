'use strict';

var gulp = require('gulp');
var helper = require('../helpers');
var pipe = require('../pipes');
var rm = require('del').sync;
var wiredep = require('wiredep').stream;

var plugin = helper.plugins;

module.exports = build;

/**
 * Builds `index.html` for production.
 *
 * @returns {Pipe}
 */
function build () {
    rm('build/**/*');

    // Can run asynchronously without doing real harm.
    pipe.build.data();

    return gulp.src('src/index.html')
    .pipe(helper.printable())
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

    .pipe(plugin.htmlmin({
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true
    }))

    .pipe(gulp.dest('build'));
}
