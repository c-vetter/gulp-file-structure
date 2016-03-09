'use strict';

/**
 * Look in `./gulp/` for definitions of tasks, pipes and helpers.
 *
 * Additional arguments:
 * --verbose: Various tasks will produce more output to the console.
 */

var gulp = require('gulp');
var task = require('./gulp/tasks');

// Simple tasks
gulp.task('app', task.compileApp);
gulp.task('build', task.build);
gulp.task('bump', task.bump);
gulp.task('styles', task.compileStyles);
gulp.task('vet', task.vet('src'));
gulp.task('vet-gulp', task.vet('gulp'));

// Compound tasks
gulp.task('index', gulp.series(
    gulp.parallel(
        'app',
        'styles'
    ),
    task.compileIndex
));

gulp.task('serve', gulp.series(
    'index',
    task.startServer
));

gulp.task('default', gulp.parallel(
    'build',
    'serve',
    'vet',
    'vet-gulp'
));
