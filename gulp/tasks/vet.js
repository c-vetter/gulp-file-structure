'use strict';

var pipe = require('../pipes');
var watchStream = require('../helpers').watchStream;

module.exports = vetFactory;

/**
 * Returns a task function for vetting JS files in the given path.
 *
 * @param {string} path
 *
 * @return {Function}
 */
function vetFactory (path) {
    return vetTask;

    /**
     * Has JS sources watched and piped into the `vet` pipe.
     *
     * @return {Stream}
     */
    function vetTask () {
        return watchStream(path + '/**/*.js', pipe.vet);
    }
}
