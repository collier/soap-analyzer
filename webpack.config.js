const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background.js',
    chromereload: './src/chromereload.js',
    options: './src/options.js',
    devtools: './src/devtools.js',
    panel: './src/panel.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src' }
    ], {
      ignore: ['*.js']
    })
  ]
};
