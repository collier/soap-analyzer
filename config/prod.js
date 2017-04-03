const webpackMerge = require('webpack-merge');
const ZipPlugin = require('zip-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const baseConfig = require('./base.js');
const Package = require('../package.json');
const Manifest = require('../src/manifest.json');

module.exports = function(env) {
  return webpackMerge(baseConfig(), {
    plugins: [
      new ProgressBarPlugin(),
      new UglifyJSPlugin(),
      new ZipPlugin({
        path: '../packages',
        filename: `${Package.name}-${Manifest.version}.zip`
      })
    ]
  })
};
