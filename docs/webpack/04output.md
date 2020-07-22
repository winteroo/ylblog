---
title: 输出output
date: 2020-07-21
tags:
 - webpack
categories:
 - 前端
---

## 简介

配置 `output` 选项可以控制 webpack 如何向硬盘写入编译文件。

## 配置`output`

webpack官网中介绍的`output`的配置项很多，但是大部分是不需要更改的，这里我们只对需要我们手动更改的配置项进行说明。

### `output.path`

`output.path`的值应是一个绝对路径，表示打包的文件的输出位置。一下代码表示将文件输出在`demo`文件夹下

```js
module.exports = {
  ...
  output: {
    path: path.resolve(__dirname, 'demo')
  }
}
```

![output1](~@Webpack/images/output1.gif)

### `output.publicPath`

`output.publicPath`指定了在加载静态资源时的统一前缀。

例如：

```js
module.exports = {
  ...
  output: {
    path: path.resolve(__dirname, 'demo'),
    publicPath: '/assets/'
  }
}
```

我们如此配置的话，在生成的文件引用地址前都会加上`/assets/`前缀。一般此项配置为`'./'`，表示当前路径下。

### `output.filename`

`output.filename`表示了输出打包文件的名称。可以指定具体的文件名称，也可以根据变量来动态生成文件名称。

| 模块 | 描述 |
| ------ | ------ | ------ |
| `[hash]` | 模块标识符(module identifier)的 hash |
| `[chunkhash]` | chunk 内容的 hash |
| `[name]` | 模块名称 |
| `[id]` | 模块标识符(module identifier) |
| `[query]` | 模块的 query，例如，文件名 ? 后面的字符串 |

我们采用如下配置，看看输出的效果：

```js
module.exports = {
  ...
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: '[name].[hash].js'
  }
}
```

![output2](~@Webpack/images/output2.gif)

我们可以发现，生成的文件是我们配置的入口的`app`，然后紧跟一个20位的hash值。

::: tip
可以采用`[hash:8]`的写法来指定生成的hash的位数。
:::

### `output.chunkFilename`

`output.chunkFilename`用来指定生成的非入口文件生成的模块名称，例如，在Vue项目中，我们一般会采用动态路由的方式来优化首页加载速度，
采用动态路由就需要为每个路由页面生成单独的`chunkFile`，用于webpack动态加载，我们需要为每个`chunkFile`指定一个文件名称，方便我们
查看是哪个路由页面的文件，此时，`output.chunkFilename`就派上用场了。

`output.chunkFilename`同样可以使用变量来动态设置，例如：

```js
module.exports = {
  ...
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: '[name].[hash].js',
    chunkFilename: '[name].[chunkhash].js'
  }
}
```
这样设置的话，生成的chunFile会按照name.hash的名称生成文件。这里的name是在`/* webpackChunkName: login */`这样的注释中获取的，写过Vue项目的同学
一定不会陌生这种写法，如果你还不太熟悉Vue这种写法，name我的这篇[关于Vue动态路由的章节](https://winteroo.github.io/ylblog/blogs/front/vue/006debugVue.html#%E5%88%A9%E7%94%A8%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1)
可能会帮助到你。

::: tip
我们可以设置

```js
module.exports = {
  ...
  output: {
    ...
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[chunkhash].js'
  }
}
```
来使生成的js文件都放在`dist/js/`文件夹下，便于组织打包后的目录结构。
:::

## 总结

`output`配置项可以指定输出文件的位置和名称，不仅可以指定静态文件名，还可以根据用户的配置生成动态的文件名。

最终，我们采用如下配置：

```js
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    app: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: 'js/[name].[hash:8].js',
    chunkFilename: 'js/[name].[chunkhash:8].js'
  }
}
```