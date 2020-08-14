---
title: 插件plugin
date: 2020-07-22
tags:
 - webpack
categories:
 - 前端
---

## 简介

loader帮助webpack解析非js文件，而当开发一些特殊的功能时，loader提供的能力可能无法满足我们的要求，这时候我们就需要
plugin来帮助我们介入webpack的深层编译对象当中。用webpack官方网站对plugin的描述就是：

> 插件是 webpack 的支柱功能。webpack 自身也是构建于你在 webpack 配置中用到的相同的插件系统之上！

## 配置

在webpack的配置中，有一个`plugins`字段，供我们配置我们需要的插件，他看起来像这样：

```js
module.exports = {
  plugins: []
}
```

由于插件可以携带参数/选项，你必须在 webpack 配置中，向 `plugins` 属性传入 `new` 实例。就像这样：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      title: '测试webpack',
      filename: 'index.html',
      inject: true,
      minify: true,
      template: './src/index.html'
    }),
  ]
}
```

## 常用插件

* [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) : 动态生成html文件的插件

* [clean-webpack-plugin](https://github.com/johnagan/clean-webpack-plugin) : 清除指定文件或文件夹，一般用于打包前清除上一次生成的打包文件

* [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) : 分离css文件为单独文件

* [copy-webpack-plugin](https://github.com/webpack-contrib/copy-webpack-plugin) : 拷贝文件或文件夹到到包后的文件夹

* [compression-webpack-plugin](https://github.com/webpack-contrib/compression-webpack-plugin) : 对文件实行gzip压缩

* [terser-webpack-plugin](https://github.com/webpack-contrib/terser-webpack-plugin) : 压缩代码的插件

* [friendly-errors-webpack-plugin](https://github.com/geowarin/friendly-errors-webpack-plugin) : 友好的日志格式

* [stylelint-webpack-plugin](https://github.com/webpack-contrib/stylelint-webpack-plugin): stylelint相关的webpack插件

* [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer): weback打包后文件大小分析插件，会在打包完成后在<http://127.0.0:8888启动一个可视化的bundle>文件分布视图。

* [optimize-css-assets-webpack-plugin](https://github.com/NMFR/optimize-css-assets-webpack-plugin)：压缩css代码的webpack插件

## 配置详情

plugin扩展了webpack的能力，是的webpack可以实现任意的功能。下面提供本次项目的插件配置：

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  plugins: [
    // 打包进度插件
    new webpack.ProgressPlugin(),
    // 清除打包文件夹插件
    new CleanWebpackPlugin({
      // true:模拟文件的删除即不删除文件
      // false:真是删除文件
      dry: false
    }),
    // 全局变量
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    // 处理vue的特定插件
    new VueLoaderPlugin(),
    // 提取css为单独文件的插件
    new MiniCssExtractPlugin({
      // 将css打包到执行文件夹
      filename: 'css/[name].[hash:8].css'
    }),
    // 打包html插件，将动态的js插入HTML中
    new HtmlWebpackPlugin({
      title: '测试webpack',
      filename: 'index.html',
      // 控制将脚本插入到什么位置
      inject: true,
      // 是否压缩
      minify: true,
      template: './src/index.html'
    }),
    // 开启gzip压缩插件
    new CompressionPlugin({
      threshold: 10240
    }),
    // 复制文件夹插件
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, './static'),
        to: './'
      }]
    })
  ]
}
```

## 实践

到这里，我们大致已经配置出一个完整的vue的项目打包配置，那么下面让我们添加一些vue的项目代码，来试试打包效果。

这里我们需要在vue项目中添加动态路由、sass样式、图片资源以及静态资源static文件夹

![webpack4](~@Webpack/images/webpack4.png)

下面让我执行打包，看下效果：

![webpack5](~@Webpack/images/webpack5.gif)

我们可以发现，动态路由正常生成了对应chunk文件，而且css和静态资源也各自打包进了各自的文件夹，生成的index.html文件
也正确的引用了正确路径的css和js文件。让我们看下打包后的文件在服务端跑起来是否正常：

![webpack6](~@Webpack/images/webpack6.gif)

很不错，正常运行了！

## 总结

至此，我们已经完成了vue项目的打包配置，而且能够正常打包，打包后的文件也是可以正常运行的，虽然我们的项目可以正常打包，
但是我们不能总是打包后看效果，我们需要一个开发环境，能展示我们的页面效果，要是能实时响应我们的修改那就更好了，那接下来让我们一同探索下
开发服务器的配置过程吧。
