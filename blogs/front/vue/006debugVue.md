---
title: 线上环境调试vue代码
date: 2020-07-02
tags:
 - js
 - vue
categories:
 - 前端
---
## 现状

公司目前存在一些比较棘手的项目，就是在本地无法联调，需要线上环境和客户进行对接，这就造成了开发调试上的巨大困难，

为了解决这些困难，需要创造线上调试的环境。下面就介绍目前可行的线上调试方法。

## 方法

### 生成sourceMap文件

::: tip
`Source map`就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。

有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。这无疑给开发者带来了很大方便。
:::

生成sourceMap文件文件可以帮助我们快速定位问题点。

配置vue项目生成`sourceMap`文件是非常方便的：在config/index.js文件中，修改如下字段即可

```js
 productionSourceMap: true, // true 为生成source map
```
下面，我们看一下生成`sourceMap`文件后的打包样子

![sourcemap1](~@Front/Vue/images/sourcemap1.png)

在浏览器中source/pages/webpack文件夹下我们可以找到我们需要的具体文件，而且文件是没有经过任何分析替换代码的。

可以轻松的打断点调试。
![sourcemap2](~@Front/Vue/images/sourcemap2.png)

### 利用动态路由

项目采用动态路由的方式，按需加载对应的路由模块页面，这时，生成的动态加载的路由文件为`1.[hash].js`，无法分辨出

具体的哪个文件对应着哪个页面，而且js代码都是经过压缩处理的，根本无法跟踪代码。所以，下面我们就来解决这些问题。

* 1、修改动态路由引入方式，添加`webpackChunkName`注释，告诉webpack生成这个chunk对应的文件名称。
::: warning 注意
`/* webpackChunkName: "home" */`，注释的前后都需要有空格，否则无法识别。即`webpackChunkName`前面需要空格，
`"home"`后面需要空格。
:::

```js
{
  path: '/home',
  name: 'Home',
  component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
  meta: {
    keepAlive: false,
    requireAuth: true,
    isSinglePage: false
  }
}
```

* 2、修改webpack打包配置文件，去掉代码压缩并修改生成chunk文件的名称规范。

修改webpack输出chunk文件的命名规范，将`id`改为`name`，name会自动提取我们配置的`webpackChunkName`。
```js
output: {
  path: config.build.assetsRoot,
  filename: utils.assetsPath('js/[name].[chunkhash].js'),
  // chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
}
```
在`plugins`配置项中注释代码压缩插件，即以下这段代码。
```js
new UglifyJsPlugin({
  uglifyOptions: {
    compress: {
      warnings: false
    }
  },
  sourceMap: config.build.productionSourceMap,
  parallel: true
})
```

最后重新打包即可生产配置了名称的js文件，同时，改js文件也是没有经过压缩的，我们可以在其中打断点查看程序的运行过程。

### 利用抓包工具

::: tip

网上曝出的可以利用抓包工具抓取，页面加载请求index.html文件，然后拦截该请求，替换为本地的index.html文件进行伪造，然后本地的js文件也需要拦截请求，操作较复杂，目前不是很推荐。

:::

