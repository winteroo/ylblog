---
title: babel-polyfill
date: 2020-08-06
tags:
 - babel
categories:
 - 前端
---

## 介绍

总体来说，babel的主要工作有两部分：

* 语法转换

* API补齐

在babel入门一节中，我们体验了babel的语法转换功能，那么什么是API补齐呢？

简单说，API补齐就是补充浏览器暂不支持的js的api语法，例如`Promise`、`Array.from`等。


接下来，我们尝试对`Promise`进行babel转换，过程如下：

* 1、在index.js的文件中添加如下内容：

```js
let promise = Promise.resolve('1');
```

* 2、再次执行babel编译，查看转码后的文内容：

```js{8}
"use strict";

var fun = function fun() {
  var str = 'babel真厉害！';
  return str;
};

var promise = Promise.resolve('1');
```

可以发现，babel只是将`let`转换为了`var`，并没有对Promise进行转换，但是我们都知道，ie是不支持`Promise`的，所以我们的代码在ie下是无法正常运行的，

为什么babel不转换`Promise`呢？

因为Babel默认只转换新的JavaScript语法（syntax），而不转换新的 API。

新的API分类两类:

* 一类是`Promise`、`Map`、`Symbol`、`Proxy`、`Iterator`等全局对象及其对象自身的方法，例如`Object.assign`，`Promise.resolve`；

* 另一类是新的实例方法，例如数组实例方法`[1, 4, -5, 10].find((item) => item < 0)`

如果想让ES6新的API在低版本浏览器正常运行，我们就不能只做语法转换。

在前端web工程里，最常规的做法是使用polyfill，为当前环境提供一个垫片。所谓垫片，是指垫平不同浏览器之间差异的东西。

polyfill提供了全局的ES6对象以及通过修改原型链`Array.prototype`等实现对实例的实现。


## babel-polyfill

### 简介

babel-polyfill其实是一组文件集合，其中包含core-js与regenerator-runtime

core-js 主要是用ES3的语法来实现ES6、7、8...的语法，充分抹平各个浏览器之间的差异。

regenerator-runtime 主要是对异步语法的支持

### 使用

在babel7中babel-polyfill的安装包名为@babel/polyfill

```bash
npm i @babel/polyfill -S
```
@babel/polyfill的使用分为以下几种方式：

* 使用script标签引入@babel/polyfill的构建版本。

* 在webpack的入口文件处导入`import @babel/polyfill`

* 在webpack的配置入口文件处添加
```js
module.exports = {
  entry: {
    app: ['@babel/polyfill', 'index.js']
  }
}
```

* 在webapck的配置入口文件处直接添加@babel/polyfill的两个核心包core-js/stable、regenerator-runtime/runtime
```js
module.exports = {
  entry: {
    app: ['core-js/stable', 'regenerator-runtime/runtime', 'index.js']
  }
}
```
::: warning 注意
采用此方法时，需要独立安装core-js@3，因为core-js目前有2.x和3.x两个大版本，3.x相对于2.x功能更加丰富，api更加全面，
但是@babel/polyfill采用的是2.x版本，而且2.x版本的包中是没有stable这个文件夹的，所以如果采用这种方式，我们需要独立安装
core-js@3和regenerator-runtime。
:::

* 使用babel配置按需引入@babel/polyfill（后续章节详细讨论）

## 总结

从babel7.4版本开始，Babel官方已经不推荐再使用@babel/polyfill，这也包括官方的polyfill.js库文件。因此从2019年年中开始，我就的新项目都应该使用core-js和regenerator-runtime这两个包。即，我们应选择方法4与方法7。

这两种方法，都是把两个npm包全部都引入到了我们的前端打包后的文件里了，对于部分引入的方法，我们将在后面两节进行讲解。

