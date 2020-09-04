/**
 * 配置依赖cdn
 */
// https://www.npmjs.com/package/html-webpack-externals-plugin
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin'); // 分包-设置Externals

module.exports = {
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      const cdnPlugins = [
        new HtmlWebpackExternalsPlugin({
          externals: [
            {
              module: 'vue',
              entry: 'https://cdn.bootcss.com/vue/2.5.2/vue.min.js',
              global: 'Vue',
            },
            {
              module: 'vue-router',
              entry:
                'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
              global: 'VueRouter',
            },
            {
              module: 'vuex',
              entry: 'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
              global: 'Vuex',
            },
          ],
        }),
      ];

      config.plugins = [...config.plugins, ...cdnPlugins];
    }
  },
};
