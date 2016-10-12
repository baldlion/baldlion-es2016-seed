const webpack = require('webpack');
const precss = require('precss');
const cssnext = require('postcss-cssnext');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = {
  context: __dirname + '/app/public',
  entry: './js/client.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/app/public/dist'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: ['transform-runtime'],
          presets: ['es2015', 'es2016']
        }
      },
      {
        test:   /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader')
      }
    ]
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false}
    }),
    new ExtractTextPlugin('styles.css')
  ],
  postcss: function () {
    return [
      precss,
      cssnext({ browsers: ['last 2 versions'] })
    ];
  }
};

module.exports = config;