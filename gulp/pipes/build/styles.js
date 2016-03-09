'use strict';

var combine = require('pumpify').obj;
var gulp = require('gulp');
var helper = require('../../helpers');
var sassPipe = require('../sass');

var plugin = helper.plugins;

module.exports = buildStylesPipe;

/**
 * Compiles SCSS files.
 *
 * @returns {Pipe}
 */
function buildStylesPipe () {
    return combine([].concat(
        gulp.src('src/styles/**/*.scss'),
        helper.printable(),
        sassPipe(),
        plugin.concat('app.css'),
        plugin.rev(),
        plugin.sourcemaps.write('.'),
        gulp.dest('build')
    ));
}
