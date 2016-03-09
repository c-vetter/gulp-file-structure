'use strict';

var helper = require('../helpers');

var args = helper.args;
var plugin = helper.plugins;

module.exports = vetPipe;

/**
 * Returns a pipe that wraps JS files in IIFEs.
 *
 * @returns {Function[]}
 */
function vetPipe () {
    return [
        helper.printable(),
        plugin.jshint(),
        plugin.jscs(),
        plugin.jscs.reporter(args.verbose ? 'console' : 'unix'),
        plugin.jshint.reporter(
            args.verbose ? 'jshint-stylish' : 'unix',
            {verbose: true}
        )
    ];
}
