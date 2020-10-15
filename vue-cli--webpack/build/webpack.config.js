const path = require('path');
// 清理打包输出目录，默认dist
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 打包html 模版插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 复制静态资源到打包输出目录
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 分离css样式链接
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// vue-loader
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// webpack
const webpack = require('webpack');
// 压缩js代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
/*// ParallelUglifyPlugin则会开启多个子进程，把对多个文件的压缩工作分配给多个子进程去完成
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  // 入口文件配置
  // entry: './src/main.js', // 项目入口文件，webpack将从main.js开始，把所有依赖的js都打包
  entry: {
    app: './src/main.js',
  },
  // 输出目录配置
  output: {
    path: path.resolve(__dirname, '../dist'), // 项目的打包后的输出路径 可修改
    publicPath: './', // 通过devServer访问路径 可修改
    filename: 'static/js/[name].[chunkhash:8].js', // 打包后的文件名 可修改
  },
  //解析
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    // 别名配置
    alias: {
      vue$: 'vue/dist/vue.esm.js', // vue 使用es6及以上的模块化编程
      '@': resolve('src'),
    },
  },
  // 模块
  module: {
    // 匹配规则
    rules: [
      {
        test: /\.vue$/,
        use: [{ loader: 'vue-loader' }],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[hash:8].[ext]',
              esModule: false, // 因为vue使用的是commonjs语法规范，而file-loader/url-loader使用的es module语法规范
              outputPath: 'static/img',
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]',
              publicPath: '../font',
              outputPath: 'static/font',
            },
          },
        ],
      },
    ],
  },
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
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
    new HtmlWebpackPlugin({
      title: 'webpack',
      filename: 'index.html',
      template: './public/index.html',
    }),
  ],
  // 压缩js
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: false,
        },
      }),
    ],
  },
};
