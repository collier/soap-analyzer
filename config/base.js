const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function() {
  return {
    entry: {
      background: './src/background/background.js',
      chromereload: './src/background/chromereload.js',
      options: './src/options/options.js',
      devtools: './src/devtools/devtools.js',
      panel: ['babel-polyfill', './src/devtools/panel.js']
    },
    output: {
      path: path.resolve(__dirname, '../build/dist'),
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
          test: /\.scss$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
            { loader: "sass-loader" }
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
      new HtmlWebpackPlugin({
        chunks: ['devtools'],
        template: './config/_html-template.ejs',
        filename: 'devtools.html'
      }),
      new HtmlWebpackPlugin({
        chunks: ['panel'],
        template: './config/_html-template.ejs',
        filename: 'panel.html'
      }),
      new HtmlWebpackPlugin({
        chunks: ['options'],
        template: './config/_html-template.ejs',
        filename: 'options.html'
      }),
      new CopyWebpackPlugin([
        { from: './src/_metadata/locales', to: '_locales' },
        { from: './src/_metadata/img', to: 'img'  },
        { from: './src/_metadata/manifest.json' }
      ]),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        jquery: 'jquery'
      })
    ],
    stats: {
      colors: true
    }
  }
};
