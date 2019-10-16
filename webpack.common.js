const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //入口配置
  entry: './src/main.js',
  //出口配置
  output: {
    filename: 'js/[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  //自动解析以下列为后缀名扩展
  resolve: {
    extensions: ['.js', '.json', 'vue']
  },
  module: {
    // rules 代表规则
    // rules 下面每一条针对的就是一条模块的转化规则
    rules: [
      //处理vue组件
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      //处理图片
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[hash:5].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    //清理dist文件夹
    new CleanWebpackPlugin(),
    //VueLoaderPlugin 作用是搭配 vue-loader 用来编译 vue 组件的
    new VueLoaderPlugin(),
    //创建 html 模板
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    })
  ]
};
