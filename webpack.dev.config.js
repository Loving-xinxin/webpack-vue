const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
module.exports = merge(common, {
  // 将环境设置成开发模式  要求速度快
  mode: 'development',
  devtool: 'eval',
  //DevServer 作用是提供简单服务器，实时重新加载你的项目
  devServer: {
    //服务器地址的文件夹
    contentBase: './dist',
    compress: true,
    //启用  HMR 热模块替换
    hot: true,
    // HMR 热替换的时候控制台的提示信息不显示
    clientLogLevel: 'none',
    // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。通过传入以下启用：
    historyApiFallback: true
  },
  //module 各种其他模块的配置（包括一些不支持的语法像 vue react 框架语法）
  module: {
    // rules 代表规则
    //rules 下面每一条针对的就是一条模块的转化规则
    rules: [
      // 处理 css 文件的 和 组件内的 style 标签
      // style-loader 将模块的导出作为样式添加到 DOM 中
      // css-loader 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
      // postcss-loader 转义 css 扩展
      // 而且必须注意顺序 从后往前的顺序

      //对css处理
      {
        test: /(\.css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          { loader: 'sass-loader' },
          {
            loader: 'postcss-loader',
            // options 是 postcss-loader 的配置 也可以直接在项目的根目录下新建一个 postcss.config.js 去配置
            options: {
              //plugins 是插件配置 我们 vue 组件样式的 scoped 属性其实是新的 css 写法需要插件 postcss-cssnext 插件解析
              plugins: [require('postcss-cssnext')()]
            }
          }
        ]
      }
    ]
  },
  //plugins 插件配置除了编译不认识的模块之外的功能基本上都是插件做的 比如 压缩 删除console,注释等
  plugins: [
    // 辅助 HMR 工作的两个插件是 webpck 自带的，只需导入 webpack 即可
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
