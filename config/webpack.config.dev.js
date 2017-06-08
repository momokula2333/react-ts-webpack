'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const base = require('./webpack.config.base');
const paths = require('./paths');

module.exports = merge.strategy({
  entry: 'prepend',
  plugins: 'prepend',
})(base, {
  devtool: 'cheap-module-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?/',
    'webpack/hot/only-dev-server',
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      chunkSortMode: 'dependency',
    }),
    new WatchMissingNodeModulesPlugin(paths.nodeModulesDir),
    new FriendlyErrorsPlugin(),
  ],
});
