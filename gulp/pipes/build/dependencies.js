'use strict';

var gulp = require('gulp');
var helper = require('../../helpers');
var noop = require('through2').obj;
var wiredep = require('wiredep');

var args = helper.args;
var plugin = helper.load;

module.exports = buildDependenciesPipe;

/**
 * Copies over bower dependencies.
 *
 * @returns {Pipe}
 */
function buildDependenciesPipe () {
    var sources = wiredep();

    sources = sources.js
    .concat(sources.css)
    .concat(
        [
            'bower_components/font-awesome/**/fonts/*',
            'bower_components/bootstrap/dist/**/fonts/*'
        ]
    );

    return gulp.src(sources)
    .pipe(plugin.plumber())
    .pipe(plugin.sourcemaps.init({loadMaps: true}))
    .pipe(args.verbose ? plugin.print() : noop())

    .pipe(plugin.if('*.js', plugin.concat('lib.js')))
    .pipe(plugin.if('*.css', plugin.concat('lib.css')))

    .pipe(plugin.if('!**/fonts/**', plugin.rev()))
    .pipe(plugin.if('!**/fonts/**', plugin.sourcemaps.write('.')))
    .pipe(gulp.dest('build'));
}
