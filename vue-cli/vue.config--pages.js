/**
 * pages 多页面配置
 */
const path = require('path');

// glob 是 webpack 安装时依赖的一个第三方模块，该模块允许你使用 * 等符号,
// 例如 lib/*.js 就是获取 lib 文件夹下的所有 js 后缀名的文件
const glob = require('glob');

const fileList = glob.sync('./src/pages/**/*.js');

const setPages = (fileList) => {
  let pages = {};
  fileList.map((item) => {
    let fileName = item.substring(
      item.lastIndexOf('/') + 1,
      item.lastIndexOf('.')
    );
    pages[fileName] = {
      entry: `src/pages/${fileName}/${fileName}.js`,
      template: `src/${fileName}/${fileName}.html`,
      filename: `${fileName}.html`,
      title: `${fileName}.html`,
      chunks: ['chunk-vendors', 'chunk-common', fileName],
    };
  });

  return pages;
};

module.exports = {
  publicPath: './',
  pages: setPages(fileList),
};
