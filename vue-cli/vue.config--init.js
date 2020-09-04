// 整体属性解析 具体参考https://cli.vuejs.org/zh/config/#vue-config-js
module.exports = {
  // 打包后的资源路径 './'相当路径 '/' 绝对路径
  publicPath: './',

  // 打包后的资源输出目录
  outputDir: 'dist',

  // 打包后的静态资源存放目录
  assetsDir: 'static',

  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'index.html',

  // 是否开启文件指纹
  filenameHashing: true,

  // 多页面打包配置
  pages: {
    index: {
      // page 的入口
      entry: 'src/index/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    subpage: 'src/subpage/main.js',
  },

  // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。// Type: boolean | 'warning' | 'default' | 'error
  lintOnSave: 'default',

  // 是否使用包含运行时编译器的 Vue 构建版本。如果为true,则组件中使用template, 而我们现在的.vue 文件 通过vue-loader在编译之前就已经预编译成js了，所以通常是false
  runtimeCompiler: false,

  // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。如果你想要通过 Babel 显式转译一个依赖，可以在这个选项中列出来。
  transpileDependencies: [],

  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
  productionSourceMap: process.env.NODE_ENV !== 'production',

  // 设置生成的 HTML 中 <link rel="stylesheet"> 和 <script> 标签的 crossorigin 属性。
  crossorigin: undefined,

  // 在生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)。如果你构建后的文件是部署在 CDN 上的，启用该选项可以提供额外的安全性。
  integrity: false,

  /**
   * 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
   * 如果这个值是一个函数，则会接收被解析的配置作为参数。
   * 该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
   */
  configureWebpack: {},
  // configureWebpack: (config) => {},

  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: (config) => {},

  //
  css: {
    // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块。
    // 设置为 false 后你就可以去掉文件名中的 .module 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块。
    requireModuleExtension: true,

    // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中
    extract: process.env.NODE_ENV === 'production',

    // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    sourceMap: false,

    // 向 CSS 相关的 loader 传递选项
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      },
      sass: {
        prependData: `@import "@/assets/scss/_variable.scss";`, //引入全局变量
      },
    },
  },

  // 配置本地服务  参考 https://webpack.docschina.org/configuration/dev-server/#root
  devServer: {
    host: 'localhost',
    port: '9090',
    proxy: {
      '/api': {
        target: '<url>',
        ws: true,
        changeOrigin: true,
      },
      '/foo': {
        target: '<other_url>',
      },
    },
  },
};
