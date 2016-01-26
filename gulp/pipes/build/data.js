'use strict';

var gulp = require('gulp');
var helper = require('../../helpers');
var noop = require('through2').obj;

var args = helper.args;
var plugin = helper.load;

module.exports = buildDataPipe;

/**
 * Copies over the fixture data.
 *
 * @returns {Pipe}
 */
function buildDataPipe () {
    return gulp.src('data/**/*', {base: '.'})
    .pipe(plugin.plumber())
    .pipe(args.verbose ? plugin.print() : noop())
    .pipe(gulp.dest('build'));
}
