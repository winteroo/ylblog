---
title: 问题解释
date: 2020-08-08
tags:
 - babel
categories:
 - 前端
---

## 问题 

### 使用`useBuiltIns:usage`后，项目还是无法兼容ie

如果你使用的是webpack，那么一定是配合babel-loader一起使用的，babel-loader有一个特性是忽略node_modules内的文件，所以
并不是babel的按需引入polyfill不生效，而是babel只检测了你书写的代码，并没有检测你引用的库文件代码，如果你使用的库文件源码
中存在ie下不支持的语法，而该语法在你书写的代码中还没有用到，那么babel就没有按需引入该语法的polyfill，所以就造成了项目无法在
ie下运行的结果。

目前，我所知的babel7引入的新的配置文件babel.config.js是可以根据项目来配置babel的，所以解决方法为：

* 1、采用babel.config.js来作为babel的配置文件

* 2、在babel-loader的include字段配置你需要转码的包文件。如下：

```js
module.exports = {
  modules: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: [{
        loader: 'babel-loader'
      }],
      include: [
        path.resolve('src'),
        // 编译react-router
        path.resolve('node_modules/react-router/lib')
      ]
    }]
  }
}
```