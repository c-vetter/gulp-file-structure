'use strict';

var lazypipe = require('lazypipe');
var plugin = require('../helpers/load');
var pipe;

module.exports = jsPipe;

pipe = lazypipe()
.pipe(plugin.plumber)
.pipe(plugin.sourcemaps.init)

.pipe(plugin.wrapJs, [
    '(function () {',
    '"use strict";',
    '',
    '%= body %',
    '})();'
].join('\n'))

.pipe(plugin.ngAnnotate, {
    add: true,
    /**
     * gulp-ng-annotate workaround for GH-26:
     * change sourcemap `file` option from `list.module.js` to `core/nav-list/list.module.js`;
     * if it breaks your sourcemap setup, please comment at
     * https://github.com/Kagami/gulp-ng-annotate/issues/26
     * (you can mute this warning with `gulpWarnings: false` option)
    */
    gulpWarnings: false
});

/**
 * Returns a pipe that wraps JS files in IIFEs.
 *
 * @returns {Object}
 */
function jsPipe () {
    return plugin.if('**/*.js', pipe());
}
