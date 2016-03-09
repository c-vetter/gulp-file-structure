'use strict';

var gulp = require('gulp');
var helper = require('../../helpers');

module.exports = buildDataPipe;

/**
 * Copies over the fixture data.
 *
 * @returns {Pipe}
 */
function buildDataPipe () {
    return gulp.src('data/**/*', {base: '.'})
    .pipe(helper.printable())
    .pipe(gulp.dest('build'));
}
