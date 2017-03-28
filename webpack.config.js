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
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, 
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src' }
    ], {
      ignore: ['*.js']
    })
  ],
  watch: true
};
