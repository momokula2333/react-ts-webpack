'use strict';
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const paths = require('./paths');
const env = require('./env');

module.exports = {
  entry: [
    require.resolve('./polyfills'),
    paths.appEntry,
  ],
  output: {
    path: paths.buildDir,
    pathinfo: true,
    filename: 'static/js/[name].[hash].js',
    chunkFilename: 'static/js/[name].[chunkhash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        exclude: [
          /\.html$/,
          /\.[tj]sx?$/,
          /\.json$/,
          /\.css$/,
          /\.less$/,
        ],
        loader: 'url-loader',
        options: {
          limit: 1500,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.tsx?$/,
        use: ['react-hot-loader/webpack', 'ts-loader'],
        include: paths.srcDir,
        exclude: paths.nodeModulesDir,
      },
      {
        test: /\.jsx?$/,
        loader: ['react-hot-loader/webpack', 'babel-loader?cacheDirectory=true'],
        include: paths.srcDir,
        exclude: paths.nodeModulesDir,
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    new InterpolateHtmlPlugin(env.raw),
    new webpack.DefinePlugin(env.stringified),
    new CaseSensitivePathsPlugin(),
  ],
};
