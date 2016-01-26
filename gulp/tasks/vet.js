'use strict';

var gulp = require('gulp');
var pipe = require('../pipes');
var watchStream = require('../helpers').watchStream;

gulp.task('vet', vet);

/**
 * Has JS sources watched and piped into `vetPipe`.
 *
 * @return {Stream}
 */
function vet () {
    return watchStream('src/**/*.js', pipe.vet);
}
