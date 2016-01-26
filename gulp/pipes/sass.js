'use strict';

var lazypipe = require('lazypipe');
var plugin = require('../helpers/load');
var pipe;

module.exports = sassPipe;

pipe = lazypipe()
.pipe(plugin.plumber)
.pipe(plugin.sourcemaps.init)
.pipe(plugin.ignore, '**/_*')
.pipe(plugin.header, '@import \'src/styles/_variables\';')
.pipe(plugin.pleeease, {
    browsers: [
        'last 2 version',
        '> 5%'
    ],
    sass: true
})
.pipe(plugin.rename, {extname: '.css'});

/**
 * Returns a pipe that compiles SCSS files to CSS.
 *
 * @returns {Object}
 */
function sassPipe () {
    return plugin.if('**/*.scss', pipe());
}
