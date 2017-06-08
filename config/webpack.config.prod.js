'use strict';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const base = require('./webpack.config.base');
const paths = require('./paths');

module.exports = merge.smart(base, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?importLoaders=1', 'postcss-loader'],
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?importLoaders=1', 'postcss-loader', 'less-loader'],
        }),
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minSize: 100 * 1024,
      minChunks: (module, count) =>
        count >= 2 && module.resource &&
        /\.js$/.test(module.resource) &&
        module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {warnings: false},
      mangle: true,
      comments: false,
      sourceMap: true,
      screw_ie8: true,
    }),
    new OptimizeCssPlugin(),
    new ExtractTextPlugin('static/css/[name].[contenthash:8].css'),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      filename: paths.buildHtml,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespaces: true,
        removeAttributeQuotes: true,
      },
      chunkSortMode: 'dependency',
    }),
    new ImageminWebpackPlugin({test: /\.(jpe?g|png|gif|svg)$/i}),
    new ManifestPlugin({
      fileName: 'asset-manifest.json'
    }),
  ],
});
