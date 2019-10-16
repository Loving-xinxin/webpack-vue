//webpack 的  webpack.config,js 是 webpack 的默认配置文件 打包的时候会默认
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// 以下对象就是wabpack配置文件
module.exports = merge(common, {
  // 生产模式(production) 要求体积小
  mode: 'production',
  // 开发模式下 使用什么类型的工具编译打包
  //   devtool: 'eval',
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

      //处理vue组件
      //   {
      //     test: /\.vue$/,
      //     loader: 'vue-loader'
      //   },
      //处理图片
      //   {
      //     test: /\.(png|jpg|gif)$/,
      //     use: [
      //       {
      //         loader: 'file-loader',
      //         options: {
      //           name: 'images/[name].[hash:5].[ext]'
      //         }
      //       }
      //     ]
      //   },
      //对css处理
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
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
  //VueLoaderPlugin 作用是搭配 vue-loader 用来编译 vue 组件的
  //HtmlWebpackPlugin 作用是创建简单的html文件，可以设置html 模板用用于创建html
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new UglifyJsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[id].css',
      ignoreOrder: false,
      publicPath: '/css'
    })
  ]
});
