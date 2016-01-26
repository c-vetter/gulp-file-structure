'use strict';

var args = require('./args');
var fs = require('fs');
var gulp = require('gulp');
var lazypipe = require('lazypipe');
var noop = require('through2').obj;
var path = require('path');
var plugin = require('./load');
var rm = require('del').sync;
var watchStream = require('./watch-stream');

module.exports = taskBuilder;

/**
 * Builds a build-task.
 *
 * @param {Glob} source
 * @param {Pipe} pipe
 * @param {Glob} target
 * @param {string} extension
 *
 * @returns {task}
 */
function taskBuilder (source, pipe, target, extension) {
    pipe = lazypipe()
    .pipe(plugin.plumber)
    .pipe(args.verbose ? plugin.print : noop)
    .pipe(pipe)
    .pipe(plugin.sourcemaps.write, '.')
    .pipe(gulp.dest, target);

    return task;

    /**
     * Removes old target files,
     * then creates a watch-stream for the source files.
     *
     * @return {Stream}
     */
    function task () {
        rm(target);

        return watchStream(source, pipe, unlinkHandler);
    }

    /**
     * Unlinks the target file for the given source file.
     *
     * @param {Vinyl} file
     */
    function unlinkHandler (file) {
        var filename = plugin.util.replaceExtension(file.relative, '.' + extension);

        fs.unlink(path.join(target, filename));
        fs.unlink(path.join(target, filename + '.map'));
    }
}
