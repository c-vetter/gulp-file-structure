'use strict';

var lazypipe = require('lazypipe');
var helper = require('../helpers');
var noop = require('through2').obj;

var args = helper.args;
var plugin = helper.load;

var pipe;

module.exports = vetPipe;

pipe = lazypipe()
.pipe(plugin.plumber)
.pipe(args.verbose ? plugin.print : noop)
.pipe(plugin.plumber)
.pipe(plugin.jshint)
.pipe(plugin.jscs)
.pipe(
    plugin.jscs.reporter,
    args.verbose ? 'console' : 'unix'
)
.pipe(
    plugin.jshint.reporter,
    args.verbose ? 'jshint-stylish' : 'unix',
    {verbose: true}
);

/**
 * Returns a pipe that compiles SCSS files to CSS.
 *
 * @returns {Object}
 */
function vetPipe () {
    return pipe();
}
