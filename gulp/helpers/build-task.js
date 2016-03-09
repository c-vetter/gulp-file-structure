'use strict';

var fs = require('fs');
var gulp = require('gulp');
var path = require('path');
var printable = require('./printable');
var plugin = require('./plugins');
var rm = require('del').sync;
var watchStream = require('./watch-stream');

module.exports = taskBuilder;

/**
 * Builds a build-task.
 *
 * @param {Glob} source
 * @param {Function} pipes - returns the array of task-specific pipes
 * @param {Glob} target
 * @param {string} extension
 *
 * @returns {task}
 */
function taskBuilder (source, pipes, target, extension) {
    return task;

    /**
     * Removes old target files,
     * then creates a watch for the source files.
     *
     * @return {Stream}
     */
    function task () {
        rm(target);

        return watchStream(source, buildPipe, unlinkHandler);
    }

    /**
     * Builds an array of pipes from the task-specific array of pipes
     * and the pipes common to all build tasks.
     *
     * @returns {Pipe[]}
     */
    function buildPipe () {
        return [].concat(
            printable(),
            pipes(),
            plugin.sourcemaps.write('.'),
            gulp.dest(target)
        );
    }

    /**
     * Asynchronously unlinks the target file (and related sourcemap)
     * for the given source file.
     *
     * @param {Vinyl} file
     */
    function unlinkHandler (file) {
        var filename = plugin.util.replaceExtension(file.relative, '.' + extension);
        var filepath = path.join(target, filename);

        // Unlink file and sourcemap if extant.
        fs.access(filepath, unlinkCallbackFor(filepath));
        fs.access(filepath + '.map', unlinkCallbackFor(filepath + '.map'));
    }

    /**
     * Returns a function that unlinks the file at the path given to this function.
     *
     * @param {string} path
     *
     * @returns {Function}
     */
    function unlinkCallbackFor (path) {
        return unlinkIfNoError;

        /**
         * Unlinks the file at `path` if not given an error.
         *
         * @param {Error} error
         */
        function unlinkIfNoError (error) {
            if (!error) {
                fs.unlink(path);
            }
        }
    }
}
