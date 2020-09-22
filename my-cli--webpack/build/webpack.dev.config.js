'use strict';

process.env.NODE_ENV = 'development';

const path = require('path');
// 基础配置
const webpackBaseConfig = require('./webpack.base.config');
// 合并
const { merge } = require('webpack-merge');
// webpack
const webpack = require('webpack');
// 复制静态资源到打包输出目录
const CopyWebpackPlugin = require('copy-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const webpackDevConfig = {
  mode: 'development',
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    hot: true,
    host: 'localhost',
    inline: true,
    port: 8080,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../public/static'), to: 'static' },
      ],
    }),
  ],
};
module.exports = merge(webpackBaseConfig, webpackDevConfig);
