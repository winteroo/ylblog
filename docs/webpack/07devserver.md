---
title: 开发服务器（devServer）以及热更新（HRM)
date: 2020-07-22
tags:
 - webpack
categories:
 - 前端
---

## 简介

webpack提供开箱即用的开发服务器`webpack-dev-server`，它能帮助我们快速开发应用，便于调试，所以配置开发服务器是很有必要的。

## 配置介绍

因为`devServer`的配置项很多，我们只介绍常用的几个配置项。

### `devServer.compress`

是否开启gzip压缩
```js
module.exports = {
  devServer: {
    compress: true
  }
}
```

### `devServer.host`和`devServer.port`

定义开发服务器启动的地址和端口

### `devServer.hot`

是否启用webpack的热更替功能。在配置文件中配置改选项时，还需要配合`webpack.HotModuleReplacementPlugin`一同才能生效。

如果在cli命令中以`--hot`的形式指定，那么将不需要配置`webpack.HotModuleReplacementPlugin`插件，因为webpack会自动调用该插件。

### `devServer.inline`

在 dev-server 的两种不同模式之间切换。默认情况下，应用程序启用内联模式(inline mode)。
这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台。

::: warning
`webpack --inline=true`

此选项最好采用cli参数的方式指定（内联模式），因为它包含来自 websocket 的 HMR 触发器，这样启动的服务器允许你在不刷新浏览器的情况下响应你的程序更新。
:::

### `devServer.open`

是否打开浏览器

### `devServer.proxy`

跨域处理


## 配置详情

配置开发服务器非常简单，只需要以下配置：

```js
module.exports = {
  devServer: {
    hot: true,
    compress: true,
    host: 'localhost',
    port: '8080',
    open: false,
    publicPath: '/',
    quiet: true,
    stats: 'errors-only',
    proxy: {}
  }
}
```

然后修改我们的dev启动命令，改成利用webpack-dev-server来启动应用：

```json
"dev": "webpack-dev-server --mode=development --progress --inline --hot --color"
```

::: tip
注意这里的 `--inline`不可以在配置文件中配置，应在cli命令中指定，这样才会有热更新的效果。
:::

启动服务器查看效果：

![webpack7](~@Webpack/images/webpack7.gif)


查看热更新效果：

![webpack8](~@Webpack/images/webpack8.gif)


::: tip

在开发环境下的vue单文件组件中，建议采用vue-style-loader来替代mini-css-extract-plugin，这样vue文件的样式变化也会相应
热更新，就像在浏览器中直接改变css样式一样。配置如下：(sass文件一样配置)

```js
module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        {
          loader: 'vue-style-loader',
        },
        {
          loader: 'css-loader',
          options: {}
        }]
    }]
  }
}
```

![webpack9](~@Webpack/images/webpack9.gif)
:::

## 总结 

至此，我们已经完整的配合了整个vue开发工程，包含本地调试和打包，这也是全部webpack的基础部分的内容，我相信，如果你
跟着我一步步的来创建你的vue项目的话，现在应该已经完成了一个vue项目的搭建，是不是有点小自豪呢，其实，静下心来认真研究
这些工具，你会发现其实它们没有想象的那么难，工具作者暴露出来的配置项是非常实用且简练的。如果你还想探索webpack更深层次的
东西，那么请继续往下看，接下来我们会介绍webpack的高级用法，代码分割和tree shaking，以及如何编写一个loader和plugin，相信
这些内容会让你对webpack有更深的理解。
