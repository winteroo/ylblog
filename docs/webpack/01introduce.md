---
title: webpack简介
date: 2020-07-17
tags:
 - webpack
categories:
 - 前端
---

## 什么是webpack

![webpack](~@Webpack/images/webpack1.png)

webpack官网的解释：

> 本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

简单说，webpack就是可以把你的项目的分散的相同类型的文件打包到一个文件中（当然也可以分成多个文件），然后再index.html文件中
只需要引入一个js一个css文件就可以了。当然，webpack发展这么就，其能力已经被大大扩展：

* 代码转换

* 代码分割、分离

* 代码缓存

* 懒加载

* 代码热更新

* ......

现如今，三大开发框架基本三分天下，他们都是基于webpack进行项目打包的，如果你使用过vue-cli和creat-react-app等工具，
也会发现他们生成的项目也是基于webpack构建的，所以，目前webpack是前端开发的趋势，webpack的出现为前端工程化提供了基础。

## 教程安排

本次教程，我们会针对当下流行的vue2.0框架，搭建webpack开发环境，一步步的搭建出一个包含

* 开发服务器

* 代码转化(es6 => es5)

* 代码检查

* 支持sass、css、js、vue单文件组件、各种图片、音视频文件

* 代码压缩

* 代码分离

* tree shaking

* css文件分离

功能的完整vue工程。

## 参考文档

[webpack官方文档](https://webpack.docschina.org/)


