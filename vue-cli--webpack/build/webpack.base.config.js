const path = require('path');
// 打包html 模版插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 分离css样式链接
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// vue-loader
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  // 入口文件配置

  // 单入口
  // entry: './src/main.js', // 项目入口文件，webpack将从main.js开始，把所有依赖的js都打包

  //多入口
  entry: {
    app: './src/main.js',
  },
  // 输出目录配置
  output: {
    path: path.resolve(__dirname, '../dist'), // 项目的打包后的输出路径 可修改
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 通过devServer访问路径 可修改
    filename: 'static/js/[name].[hash:8].js', // 打包后的文件名 可修改
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
            loader:
              process.env.NODE_ENV === 'production'
                ? MiniCssExtractPlugin.loader
                : 'style-loader',
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
            loader:
              process.env.NODE_ENV === 'production'
                ? MiniCssExtractPlugin.loader
                : 'style-loader',
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
              limit: 1024 * 1,
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
              publicPath:
                process.env.NODE_ENV === 'production'
                  ? '../font'
                  : '/static/font',
              outputPath: 'static/font',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack',
      filename: 'index.html',
      template: './public/index.html',
    }),
  ],
};
