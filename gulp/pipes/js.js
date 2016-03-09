'use strict';

var path = require('path');
var plugin = require('../helpers/plugins');
var vm = require('vm');

module.exports = jsPipe;

/**
 * Returns an array of pipes that wrap in IIFEs and inject angular dependencies in JS files.
 *
 * @returns {Pipe[]}
 */
function jsPipe () {
    return [
        plugin.ignore('!**/*.js'),

        // Strangely, SyntaxErrors break wrapJs even if `plumber()`ed.
        // Therefore, this needs explicit checking.
        plugin.ignore(malformed),

        plugin.sourcemaps.init(),

        // Build bootstrap.js
        plugin.if(
            '**/*.bootstrap.js',
            plugin.remember('app bootstrap')
        ),
        plugin.if(
            '**/*.bootstrap.js',
            plugin.concat('bootstrap.js')
        ),
        plugin.if(
            'bootstrap.js',
            plugin.wrapJs([
                'var bootstrap = {};',

                // https://github.com/estools/estemplate/issues/5
                '(function () {',
                '%= body %',
                '})();',

                'deferredBootstrapper.bootstrap({',
                    'bootstrapConfig: {strictDi: true},',
                    'element: document.body,',
                    'module: "vmsAdmin",',
                    'resolve: bootstrap',
                '});'
            ].join('\n'))
        ),
        plugin.if(
            'bootstrap.js',

            // `gulp-remember` outputs the bootstrap files irrespective of
            // whether they have actually changed.
            plugin.cached('app bootstrap')
        ),

        plugin.wrapJs([
            '(function () {',
            '"use strict";',
            '%= body %',
            '})();'
        ].join('\n')),
        plugin.ngAnnotate({add: true})
    ];
}

/**
 * Checks whether the file being streamed in is malformed.
 *
 * @param {Vinyl} file
 *
 * @returns {boolean} - true if malformed, false otherwise
 */
function malformed (file) {
    var script;

    try {
        script = new vm.Script(file.contents);
    } catch (e) {
        if (e instanceof SyntaxError) {
            console.error(
                'ERROR: file malformed and not processed: %s',
                path.relative(file.cwd, file.path)
            );

            return true;
        }
    }

    return false;
}
