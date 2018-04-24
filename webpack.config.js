const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ZipPlugin = require('zip-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const htmlTemplate = require('html-webpack-template');
const Package = require('./package.json');
const Manifest = require('./src/_metadata/manifest.json');

const TARGET = process.env.npm_lifecycle_event;

const common = {
  entry: {
    devtools: './src/devtools/devtools.js',
    panel: ['babel-polyfill', './src/devtools/panel.js']
  },
  output: {
    path: path.resolve(__dirname, './build/dist'),
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
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['devtools'],
      filename: 'devtools.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      inject: false,
      chunks: ['panel'],
      template: htmlTemplate,
      filename: 'panel.html',
      appMountId: 'root',
      minify: {
        collapseWhitespace: true
      }
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
  ]
}

if(TARGET === 'start' || !TARGET) {
  module.exports = webpackMerge(common, {
    watch: true
  });
}

if(TARGET === 'build') {
  module.exports = webpackMerge(common, {
    plugins: [
      new ProgressBarPlugin(),
      new UglifyJSPlugin(),
      new ZipPlugin({
        path: '../packages',
        filename: `${Package.name}-${Manifest.version}.zip`
      })
    ]
  });
}
