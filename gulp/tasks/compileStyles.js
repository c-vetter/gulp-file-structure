'use strict';

var helper = require('../helpers');
var pipe = require('../pipes');

module.exports = helper.buildTask('src/styles/**/*.scss', pipe.sass, 'dev/styles', 'css');
