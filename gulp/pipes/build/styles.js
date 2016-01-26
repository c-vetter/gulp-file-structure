'use strict';

var gulp = require('gulp');
var helper = require('../../helpers');
var noop = require('through2').obj;
var sassPipe = require('../sass');

var args = helper.args;
var plugin = helper.load;

module.exports = buildStylesPipe;

/**
 * Compiles SCSS files.
 *
 * @returns {Pipe}
 */
function buildStylesPipe () {
    return gulp.src(['src/styles/**/*.scss'])
    .pipe(plugin.plumber())
    .pipe(args.verbose ? plugin.print() : noop())
    .pipe(sassPipe())

    .pipe(plugin.concat('app.css'))

    .pipe(plugin.rev())
    .pipe(plugin.sourcemaps.write('.'))
    .pipe(gulp.dest('build'));
}
