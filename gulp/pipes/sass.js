'use strict';

var path = require('path');
var plugin = require('../helpers/plugins');

module.exports = sassPipe;

/**
 * Returns a pipe that compiles SCSS files to CSS.
 *
 * @returns {Stream[]}
 */
function sassPipe () {
    return [
        plugin.ignore('!**/*.scss'),
        plugin.progeny(),
        plugin.ignore('**/_*'),
        plugin.sourcemaps.init(),
        plugin.pleeease({
            browsers: [
                'last 2 versions',
                '> 5%'
            ],
            sass: {
                importer: importLocator,
                includePaths: ['src/styles']
            }
        }),
        plugin.rename({extname: '.css'})
    ];
}

/**
 * Transorms import URLs to absolute filesystem paths.
 *
 * @param {string} url
 * @param {string} filepath
 *
 * @returns {Object}
 */
function importLocator (url, filepath) {
    if (!url.match(/^https?:\/\/|\.css$/)) {
        if (url.match(/^\//)) {
            url = path.resolve('.' + url);
        } else {
            filepath = path.relative('', filepath);

            url = path.resolve(
                'src/styles',
                path.dirname(filepath),
                url
            );
        }
    }

    console.log('importLocator', url, filepath);

    return {file: url};
}
