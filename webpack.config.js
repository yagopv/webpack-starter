const webpack = require('webpack');
const path = require('path');

const failPlugin = require('webpack-fail-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('shared.js');

module.exports = {
  context: path.resolve('src'),
  devtool: 'source-map',
  entry: {
    about: './app/about.ts',
    index: './app/index.ts',
    contact: './app/contact.ts',
    vendor: './css/vendor.ts',
    styles: './css/styles.ts'
  },
  output: {
    path: path.resolve('build/'),
    publicPath: '/public/assets/',
    filename: '[name].js'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.scss', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
			{ test: /\.(woff|woff2)$/, loader:"url?prefix=font/&limit=5000" },
			{ test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
			{ test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
      { test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/ },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!autoprefixer!sass-loader'), exclude: /node_modules/ }
    ]
  },
  plugins: [ 
    failPlugin, 
    commonsPlugin, 
    new ExtractTextPlugin('[name].css', {
      allChunks: true
    }) 
  ],
  devServer: {
    contentBase: 'public'
  },
  watch: false
}