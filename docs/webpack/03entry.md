---
title: 入口entry
date: 2020-07-21
tags:
 - webpack
categories:
 - 前端
---

## 介绍

入口对象`entry`是用于 `webpack` 查找开始构建 bundle 的地方。上下文是入口文件所处的目录的绝对路径的字符串。

## `entry`

`entry`分为单文件入口和多文件入口。

### 单文件入口

配置方式:

* 1、字符串形式

```js
const path = require('path')
module.exports = {
  context: path.resolve(__dirname, './'),
  entry: './src/index.js'
}
```

* 2、对象形式

```js
const path = require('path')
module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    main: './src/index.js'
  }
}
```

上面两种写法均可以实现将`src/index.js`作为入口文件，生成名为`main.js`的打包文件。如果想要自定义输出文件的名称则可以这样写

```js
module.exports = {
  entry: {
    app: './src/index.js'
  }
}
```

这样，打包生成的文件就会称为`app.js`，与文件对象的key值相同。

::: tip 提示

如果输入文件为数组形式会如何呢，就像下面这样：

```js
module.exports = {
  entry: {
    app: ['./src/index.js', './src/main.js']
  }
}
```

根据`webpack`官方说法，输入为数组形式，则数组的所有子元素都会作为构建的入口，但是他们最终会打包出一个文件为`app.js`，而不是
想多文件入口那样打包出多个文件。

一些单页应用项目会采用在入口处添加`@babel/polyfill`，作为入口文件，这样来做浏览器的兼容性处理。

![entry1](~@Webpack/images/entry1.gif)
:::

### 多文件入口

使用多文件入口会生成多个打包文件，如下所示

```js
module.exports = {
  entry: {
    app: './src/index.js',
    main: './src/main.js'
  }
}
```

使用此配置最后会生成`app.js`和`main.js`文件。

![entry2](~@Webpack/images/entry2.gif)

## 总结

`entry`决定了我们的应用程序从哪里开始构建我们的应用程序，并且可以根据项目需求配置单入口还是多入口。
现在我们的项目此次只需要有一个入口，则最终我们的webpack配置如下：

```js
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, './'),
  entry: {
    app: './src/index.js',
  }
}
```
