const path = require('path');

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

module.exports = {
  // 打包后的资源路径 './'相当路径 '/' 绝对路径
  publicPath: './',

  // 打包后的资源输出目录
  outputDir: 'dist',

  // 打包后的静态资源存放目录
  assetsDir: 'static',

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: process.env.NODE_ENV !== 'production',

  /**
   * 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
   * 如果这个值是一个函数，则会接收被解析的配置作为参数。
   * 该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
   */
  configureWebpack: {},
  // configureWebpack: (config) => {},

  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@src', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('layout', resolve('src/layout'))
      .set('base', resolve('src/base'))
      .set('static', resolve('src/static'));
  },
};
