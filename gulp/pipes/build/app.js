'use strict';

var combine = require('pumpify').obj;
var gulp = require('gulp');
var helper = require('../../helpers');
var jsPipe = require('../js');

var plugin = helper.plugins;

module.exports = buildAppPipe;

/**
 * Builds the main angular app for production.
 *
 * @returns {Pipe}
 */
function buildAppPipe () {
    return combine([].concat(
        gulp.src([
            'src/app/**/*.js',
            'src/app/**/*.html'
        ]),
        helper.printable(),

        // Builds `app.templates.js`
        plugin.if('*.html', plugin.htmlmin({
            collapseBooleanAttributes: true,
            collapseWhitespace: true,
            removeComments: true
        })),
        plugin.if('*.html',
            plugin.angularTemplatecache(
                'app.templates.js',
                {
                    module: 'vmsAdmin.core',
                    root: '/app/'
                }
            )
        ),

        plugin.order([
            '**/*.module.js',
            '**/*'
        ]),

        jsPipe(),

        plugin.concat('app.js'),
        plugin.uglify(),

        plugin.rev(),
        plugin.sourcemaps.write('.'),
        gulp.dest('build')
    ));
}
