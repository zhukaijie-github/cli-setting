/**
 * 配置icon - 雪碧图
 */
// https://www.npmjs.com/package/webpack-spritesmith
const path = require('path');
const SpritesmithPlugin = require('webpack-spritesmith'); // 合成雪碧图

/* 这里是我们自己修改的模板样式，webpack，会自动生成一个sprite.scss的样式，有时候生成的不满意，
我们可以在这里修改，可以自己打印一下 data里面的参数，看着就会大概明白（先看下面的配置，最后看这个模板）
*/
var templateFunction = function(data) {
  console.log(data);
  var shared = '.icon { background-image: url(I);background-size: Wpx Hpx;}'
    .replace('I', data.sprites[0].image)
    .replace('W', data.spritesheet.width)
    .replace('H', data.spritesheet.height);

  var perSprite = data.sprites
    .map(function(sprite) {
      return '.icon-N { width: Wpx; height: Hpx; background-position: Xpx Ypx; }'
        .replace('N', sprite.name)
        .replace('W', sprite.width)
        .replace('H', sprite.height)
        .replace('X', sprite.offset_x)
        .replace('Y', sprite.offset_y);
    })
    .join('\n');

  return shared + '\n' + perSprite;
};

module.exports = {
  configureWebpack: (config) => {
    /**
     * 雪碧图
     */
    /*
    细节坑。文档里面写着 需要resolve，引入图片生成的位置，
    不加这行会报错。因为github，Readme里面有这句话
    resolve contains location of where generated image is
    （要把生成的地址resolve到modules里面。不写就错）
    一定要加，血的教训啊
   */
    config.resolve.modules = ['node_modules', './src/assets/images'];

    // 定义一个插件数组。用来覆盖，在里面使用我们的主角
    const Plugins = [
      new SpritesmithPlugin({
        /*
        目标小图标，这里就是你需要整合的小图片的老巢。
        现在是一个个的散兵，把他们位置找到，合成一个
        */
        src: {
          cwd: path.resolve(__dirname, './src/assets/icon'),
          glob: '*.png',
        },
        // 输出雪碧图文件及样式文件，这个是打包后，自动生成的雪碧图和样式，自己配置想生成去哪里就去哪里
        target: {
          image: path.resolve(
            __dirname,
            './src/assets/images/sprite.[hash].png'
          ),
          css: [
            [
              path.resolve(__dirname, './src/assets/css/sprite.scss'),
              {
                // 引用自己的模板
                format: 'function_based_template',
              },
            ],
          ],
        },
        // 自定义模板入口，我们需要基本的修改webapck生成的样式，上面的大函数就是我们修改的模板
        customTemplates: {
          function_based_template: templateFunction,
        },
        // 样式文件中调用雪碧图地址写法（Readme这么写的）
        apiOptions: {
          cssImageRef: '~sprite.png',
        },
        // 让合成的每个图片有一定的距离，否则就会紧挨着，不好使用
        spritesmithOptions: {
          padding: 20,
        },
      }),
    ];
    // config里面，覆盖掉以前的，要不然不好使
    config.plugins = [...config.plugins, ...Plugins];
  },
};
