---
title: babel配置文件
date: 2020-08-06
tags:
 - babel
categories:
 - 前端
---

## 配置文件的种类

babel的功能非常强大，但是如果没有配置文件，babel原封不动的输出我们的源代码，不做任何转码，所以，babel虽然强大，
但是如果不能正确的配置配置文件，那babel的强大功能将被埋没，所以，学习如何配置配置文件是很有必要的。

babel的配置文件的种类常用的有以下几种：

* .babelrc.js

* babel.config.js

* .babelrc

* babel.config.json

* package.json中的babel字段

前两种配置文件均为js文件，我们可以在其中填入js逻辑来动态的配置babel

后三中采用的都是json的方式来配置，灵活性较前两种稍差。

所以，为了更灵活的配置babel，我们尽量选择前两种js文件的形式来配置babel。

## 配置项

babel的配置项还是比较多的，不过大部分的配置项对于我们来说是不需要关心的，我们需要关心的只有`presets`和`plugins`两个。

* `plugins`：插件，告诉babel如何去转码

* `presets`：预设，即插件集合，babel的插件很多，一个个的添加插件是非常可怕的，所以将一类的插件组合为一个插件集合一起使用。

## 总结

本节我们了解了babel的配置文件种类以及基础的配置项，接下来我们会具体讲解如何配置这两项，但是在这之前我们必须先了解一个新的
概念babel-polyfill。请看下节分解。
