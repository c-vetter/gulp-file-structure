'use strict';

var args = require('../helpers/args');
var gulp = require('gulp');
var plugin = require('../helpers/load');

gulp.task('bump', bumpVersion);

/**
 * Bump the version
 * --type=pre will bump the prerelease version *.*.*-x
 * --type=patch or no flag will bump the patch version *.*.x
 * --type=minor will bump the minor version *.x.*
 * --type=major will bump the major version x.*.*
 * --type=xyz is also available as --xyz
 * --version=1.2.3 will bump to a specific version and ignore other flags
 */
function bumpVersion () {
    var msg = 'Bumping versions';
    var type = args.type;
    var version = args.version;
    var options = {};

    if (!type && !version) {
        switch (true) {
            case args.major:
            case args.M:
                type = 'major';
                break;
            case args.minor:
            case args.m:
                type = 'minor';
                break;
            case args.patch:
            case args.P:
                type = 'patch';
                break;
            case args.pre:
            case args.p:
                type = 'pre';
                break;
        }
    }

    if (version) {
        options.version = version;
        msg += ' to ' + version;
    } else if (type) {
        options.type = type;
        msg += ' for a ' + type;
    }

    console.log(msg);

    return gulp.src([
        './package.json',
        './bower.json'
    ])
    .pipe(plugin.print())
    .pipe(plugin.bump(options))
    .pipe(gulp.dest('./'));
}
