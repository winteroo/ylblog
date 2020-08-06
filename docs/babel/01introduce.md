---
title: babel简介
date: 2020-08-06
tags:
 - babel
categories:
 - 前端
---

## 介绍

![babel](~@Babel/images/babel.jpg)

babel是什么？

babel其实是一个工具集，用于将ES6代码转换为浏览器普遍支持的ES5代码。

有了babel的支持，我们就可以很愉快的在代码中使用ES6、ES7、......的超前语法，而不必担心浏览器的支持度，因为babel会做这部分工作的。这使得前端js代码的编写变得越发的简便和严谨。

举个栗子：

babel转换前的代码：

```js
const fun = () => {
  let str = `babel很厉害！`;
  return str;
}
```

上面的代码经过babel转换后会生成如下代码：

```js
var fun = function fun() {
  var str = 'babel很厉害！';
  return str;
}
```

我们可以发现，babel为我们把新式的`const`、`let`、箭头函数语法，转换为ES5支持的语法形式。

接下来让我们一同探索babel的神奇之处吧！

::: tip
本教程基于babel7编写，如果你在使用babel6或是更低版本，请寻找其他资料学习或是升级你的babel版本。
:::

## 参考

下面是我参考的babel学习资料，网站做的babel教程非常通俗易懂，通过通读作者写的babel教程，让我受益匪浅，希望大家也可以
去看下。

[姜瑞涛的官方网站之babel教程](https://www.jiangruitao.com/babel/)