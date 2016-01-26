'use strict';

module.exports = require('require-dir')(
    '.',
    {
        camelcase: true,
        recurse: true
    }
);
