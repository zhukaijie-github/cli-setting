'use strict';

process.env.NODE_ENV = 'production';

const path = require('path');
// 基础配置
const webpackBaseConfig = require('./webpack.base.config');
// 合并
const { merge } = require('webpack-merge');
// webpack
const webpack = require('webpack');
// 压缩js代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 复制静态资源到打包输出目录
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 分离css样式链接
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 清理打包输出目录，默认dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const webpackProdConfig = {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../public/static'), to: 'static' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].css',
    }),
    new webpack.SourceMapDevToolPlugin({
      filename: 'static/js/[name].[chunkhash:8].js.map',
    }),
  ],
  // 压缩js
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: true,
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: false,
        },
      }),
    ],
  },
};
module.exports = merge(webpackBaseConfig, webpackProdConfig);
