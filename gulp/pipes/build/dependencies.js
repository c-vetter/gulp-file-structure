'use strict';

var combine = require('pumpify').obj;
var gulp = require('gulp');
var helper = require('../../helpers');
var wiredep = require('wiredep')();

var plugin = helper.plugins;

module.exports = buildDependenciesPipe;

/**
 * Copies over bower dependencies.
 *
 * @returns {Pipe}
 */
function buildDependenciesPipe () {
    var sources;

    sources = []
    .concat(wiredep.js)
    .concat(wiredep.css)
    .concat([
        'bower_components/font-awesome/**/fonts/*',
        'bower_components/bootstrap/dist/**/fonts/*'
    ]);

    return combine([].concat(
        gulp.src(sources),
        plugin.sourcemaps.init({loadMaps: true}),
        helper.printable(),

        plugin.if('*.js', plugin.concat('lib.js')),
        plugin.if('*.css', plugin.concat('lib.css')),

        plugin.if('!**/fonts/**', plugin.rev()),
        plugin.if('!**/fonts/**', plugin.sourcemaps.write('.')),

        gulp.dest('build')
    ));
}
