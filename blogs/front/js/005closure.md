---
title: 闭包
date: 2020-06-23
sidebar: 'auto'
tags:
 - js
categories:
 - 前端
---
## 概念
::: tip
闭包：能够访问另一个函数作用域的变量的函数。
:::
```js
function fun(params) {
  var count = 1;
  return function () {
    count++;
    console.log('this count: ' + count);
  }
}
var closeureFun = fun();
closeureFun(); // this count: 2
closeureFun(); // this count: 3
closeureFun(); // this count: 4
```
## 