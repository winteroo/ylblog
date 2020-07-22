---
title: 快速开始
date: 2020-07-17
tags:
 - webpack
categories:
 - 前端
---

## 安装

::: tip 注意
本次搭建的webpack工程，webpack版本是4.x，后续涉及的babel版本是7.x，均为目前文章编写日期的最新版本。
:::

首先创建项目文件夹并初始化，安装webpack。

```bash

mkdir webpack-demo

cd webpack-demo

npm init

npm i webpack webpack-cli -D

```

## 创建工程

之后在项目的根目录创建`webpack.config.js`文件，作为webpack的配置文件。

然后创建我们的源代码目录`src`，其中添加源文件`index.js`，并在其中输入下面的代码

```js
let str = '测试'

console.log(str);
```

等待全部模块安装完成后，我们在控制台输入`webpack`命令，如果不出意外的话，你的根目录会出现一个`dist`文件夹，而且里面
有`main.js`文件，打开该文件，搜索`测试`字样，我们可以发现，在代码的最后会有`console.log('测试')`代码，可以发现，我们写的
代码已经打包进最后生成的文件，而且，它还为我们自动做了优化，删除了无用的变量。

等下，你此时肯定会发现，控制台有如下警告：

![webpack2](~@Webpack/images/webpack2.png)

那么，接下来就让我们一同来解决这个问题，并一步步的配置webpack吧。