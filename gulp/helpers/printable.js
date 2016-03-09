'use strict';

var args = require('./args');
var plugin = require('./plugins');
var noop = require('through2').obj;

module.exports = args.verbose ? plugin.print : noop;
