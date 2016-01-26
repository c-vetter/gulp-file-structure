'use strict';

var build = require('../helpers').buildTask;
var gulp = require('gulp');
var pipe = require('../pipes');

gulp.task('styles', [], build('src/styles/**/*.scss', pipe.sass, 'dev/styles', 'css'));
