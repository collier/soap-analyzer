const webpackMerge = require('webpack-merge');
const baseConfig = require('./base.js');

module.exports = function(env) {
  return webpackMerge(baseConfig(), {
    watch: true
  })
};