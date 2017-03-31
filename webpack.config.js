const path = require('path');
const webpack = require('webpack');
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
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, 
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }, 
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'file-loader'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'file-loader'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/_locales', to: '_locales' },
      { from: 'src/img', to: 'img'  },
      { from: 'src/html'  },
      { from: 'src/manifest.json' }
    ]),
    new webpack.ProvidePlugin({   
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    })
  ],
  watch: true
};
