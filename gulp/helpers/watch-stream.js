'use strict';

var combine = require('pumpify').obj;
var format = require('util').format;
var gulp = require('gulp');
var noop = require('through2').obj;
var plugin = require('./plugins');
var printable = require('./printable');

module.exports = watchStream;

/**
 * Returns a stream processing files based on the given glob,
 * and creates watchers for file events.
 *
 * Added and changed files are processed the same as the initial files,
 * for unlinked files the destination files are handled by the given unlink-handler.
 *
 * @param {string} glob - tells the files/directories to be watched
 * @param {Function} pipes - returns an array of pipes for processing the changes on globbed files
 * @param {Function} [unlinkHandler] - an optional handler for unlink events
 *
 * @returns {Stream} - a readable stream that continually emits files
 */
function watchStream (glob, pipes, unlinkHandler) {
    if (unlinkHandler === undefined) {
        unlinkHandler = noop;
    }

    plugin.watch(
        glob,
        {events: ['add', 'change']},
        changeHandler
    );

    if (unlinkHandler) {
        plugin.watch(glob, {events: ['unlink']}, unlinkHandler);
    }

    return combine([].concat(
        gulp.src(glob),
        plugin.duration(format('Watch %s', glob)),
        pipes()
    ));

    /**
     * Handles `add` and `change` events.
     *
     * @param {Vinyl} file - the file that triggered the event
     */
    function changeHandler (file) {
        return combine([].concat(
            gulp.src(file.path, {base: file.base}),
            plugin.duration(format('Watch %s (%s)', glob, file.path)),
            printable(),
            pipes()
        ));
    }
}
