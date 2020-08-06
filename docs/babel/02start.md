---
title: babel入门
date: 2020-08-06
tags:
 - babel
categories:
 - 前端
---

## babel安装

1、新建项目
```bash
mkdir babel-demo && cd babel-demo
```

2、初始化我们的项目
```bash 
npm init
```

3、安装babel依赖
```bash
npm i @babel/core @babel/cli @babel/preset-env -D
```

## babel编译文件初体验

项目和依赖都已经安装完成，接下来我们先来体验下babel的编译效果。

在项目的根目录创建babel.config.js文件，将如下代码复制进文件中。（次为babel的配置文件）

```js
module.exports = {
  presets: ["@babel/env"],
  plugins: []
}
```

之后我们创建需要转码的js文件，在项目根目录创建index.js，复制如下代码进文件中

```js
const fun = () => {
  let str = 'babel真厉害！';
  return str;
}
```

之后我们运行如下语句
```bash
npx babel index.js -o compile.js
```

运行成功后，你的项目根目录会出现一个compile.js文件，这便是babel转码后生成的文件，不出意外的话，文件内容是这样的：

```js
"use strict";

var fun = function fun() {
  var str = 'babel真厉害！';
  return str;
};
```

babel成功将我们书写的ES6代码转换为ES5代码。

## 说明

* babel.config.js 是babel运行转码时查找的配置文件，它可以指导babel如何转换代码

* @babel/cli是Babel命令行转码工具，如果我们使用命令行进行Babel转码就需要安装它。
  
* @babel/core是babel转码的核心包，@babel/cli依赖@babel/core。

* @babel/preset-env这个npm包提供了ES6转换ES5的语法转换规则，我们在Babel配置文件里指定使用它。如果不使用的话，也可以完成转码，但转码后的代码仍然是ES6的，相当于没有转码。

## 总结

如果按照上面的操作来，不出意外的话，现在你应该已经体验了一把babel的转码过程，但是，到底babel是如何转码的，配置文件里面
又是如何配置的，这一系列的问题我们会在后面的文章中一一说明，如果你对babel感兴趣那就继续往下看吧！