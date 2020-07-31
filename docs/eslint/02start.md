---
title: 入门
date: 2020-07-29
tags:
 - eslint
categories:
 - 前端
---

## 简介

ESLint是插件化的代码检查工具，所以在没有配置任何插件和规范的情况下，ESLint是
不会检查我们的代码，也不会给出任何的错误提示，只有我们配置了必要的插件和规则后，
ESLint才能真正发挥它的魔法。

## 安装

1、新建项目
```bash
mkdir eslint-demo && cd eslint-demo
```
2、初始化我们的项目
```bash 
npm init
```
3、安装eslint
```bash
npm i eslint -D
```
4、我们需要一个配置文件来告诉eslint按照什么样的规范检查我们书写的代码。eslint提供
```eslint --init```来交互式的创建配置文件，但是这里我们为了讲解各个配置参数的含义，
所以我们采用手动书写配置文件的方式。在文件夹的根目录下创建```.eslintrc.js```文件。
此配置文件遵循nodejs的模块规范，所以我们需要在配置文件中导出一个配置对象，项下面这样：

```js
module.exports = {};
```
接下来，让我们一点点的剖析其配置项。

::: tip
eslint的配置文件有json、yaml、js三种文件形式（文件名称为.eslintrc.json，.eslintrc.js，.eslintrc.yaml，.eslintrc.yml）以及在`package.json`文件的eslintConfig字段内配置，
.eslintrc类型的文件已经被废弃。
这里我们采用的是js类型的文件形式，因为js类型的文件可以书写逻辑，面对复杂的eslint
配置时会比较灵活。
:::

## 命令行

### --ext

`--ext`用于指定检测的文件范围。以下命令表示检测src文件夹下的js和vue结尾的文件。

```bash
npx eslint --ext .js,.vue src/
```

为了执行方便，我们在`pachkage.json`的`scripts`配置项下添加命令：

```json
{
  "scripts": {
    "lint": "npx eslint --ext .js,.vue src/"
  }
}
```

以后我们检测代码只需要运行`npm run lint`就可以了。