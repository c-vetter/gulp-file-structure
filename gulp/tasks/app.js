'use strict';

var build = require('../helpers').buildTask;
var gulp = require('gulp');
var pipe = require('../pipes');

gulp.task('app', [], build('src/app/**/*.js', pipe.js, 'dev/app', 'js'));
