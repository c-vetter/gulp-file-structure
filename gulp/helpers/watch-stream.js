'use strict';

var gulp = require('gulp');
var noop = require('through2').obj;
var plugin = require('./load');

var plumber = plugin.plumber;
var watch = plugin.watch;

module.exports = watchStream;

/**
 * Returns a stream watching files based on the given glob.
 *
 * @param {string} glob - tells the files/directories to be watched
 * @param {Pipe} pipe - a lazy pipe for processing the changes on globbed files
 * @param {Function} [unlinkHandler] - an optional handler for unlink events
 *
 * @returns {Stream} - a readable stream that continually emits files
 */
function watchStream (glob, pipe, unlinkHandler) {
    if (unlinkHandler === undefined) {
        unlinkHandler = noop;
    }

    watch(
        glob,
        {events: ['add', 'change']},
        changeHandler
    );

    if (unlinkHandler) {
        watch(glob, {events: ['unlink']}, unlinkHandler);
    }

    return gulp.src(glob)
    .pipe(plumber())
    .pipe(pipe());

    /**
     * Handles `add` and `change` events.
     *
     * @param {Vinyl} file - the file that triggered the event
     */
    function changeHandler (file) {
        gulp.src(file.path, {base: file.base})
        .pipe(plumber())
        .pipe(pipe());
    }
}
