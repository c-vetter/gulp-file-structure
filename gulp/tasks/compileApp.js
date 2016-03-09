'use strict';

var helper = require('../helpers');
var pipe = require('../pipes');

module.exports = helper.buildTask('src/app/**/*.js', pipe.js, 'dev/app', 'js');
