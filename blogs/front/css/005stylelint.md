---
title: stylelint
date: 2020-08-14
sidebar: 'auto'
tags:
 - stylelint
categories:
 - 前端
---

## 什么是stylelint

引用stylelint官网的说明

> A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.

译:一个强大的，现代的linter，帮助您避免错误并且强制执行样式约定规则。

其实，stylelint就和eslint一样，不过stylelint是用来检查css或是css预处理语言书写规范的一款工具。

配合vscode 的插件一同使用会带来很愉悦的开发体验。

## stylelint配置项

stylelint使用如下方式作为配置源：

* 1、在package.json中的stylelint字段；

* 2、`.stylelintrc`,`.stylelintrc.json`等json配置文件

* 3、`.stylelintrc.js`,`stylelint.config.js`js类型的配置文件，需要利用`module.exports = {}`导出一个配置对象。

### rules

自定义规则的检查行为，可以将自己需要加强或是忽略的规则配置在这里。

### extends

继承的配置规则，因为自己配置规则是比较繁琐的，所以我们一般会采用社区配置好的统一规范，例如`stylelint-config-standard`规范，以及`stylelint-config-rational-order`
规定的css属性书写顺序的规范。

```js
module.exports = {
  extends: ['stylelint-config-standard','stylelint-config-rational-order']
}
```

### plugins

插件是由社区构建的规则或规则集，支持方法、工具集、非标准CSS特性或非常具体的用例。一般extends就可以满足我们的需求。

## 为你的项目添加stylelint

接下来，我们为vue项目添加stylelint支持。

### 1、编写stylelint配置文件

首先我们需要安装项目需要的包：

```bash
npm stylelint stylelint-config-standard stylelint-config-rational-order stylelint-order -D
```

* stylelint: stylelint核心包

* stylelint-config-standard：社区总结的统一css书写规范

* stylelint-config-rational-order：社区总结的统一css属性顺序书写规范

* stylelint-order：属性顺序需要的包文件

然后在项目根目录添加`.stylelintrc.js`文件，配添加如下配置：

```js
module.exports = {
  plugins: [],
  extends: [
    "stylelint-config-standard",
    'stylelint-config-rational-order'
  ],
  rules: {}
};
```

我们这里继承了社区提供的统一的standard规范以及css属性书写顺序规范。

### 配置webpack提供stylelint的支持

将stylelint和构建工具一同使用才能真正发挥它的作用。

首先安装需要的包文件：

```bash
npm i stylelint-webpack-plugin -D
```

::: tip
stylelint-webpack-plugin目前支持支webpack4
:::

之后我们在配置的开发阶段的webpack配置文件中加入该插件：

```js
const StylelintPlugin = require('stylelint-webpack-plugin');
module.exports = {
  ...
  plugins: [
    new StylelintPlugin({
      // 正则匹配想要lint监测的文件
      files: ['**/*.s?(a|c)ss', '**/*.less', '**/*.vue']
    })
  ]
}
```

这样配置后，webpack在启动时会去检查sass、scss、less、css、vue文件中的样式代码。

### 配置编辑器支持快速修复

在出此配置了stylelint后，会发现，错误很多，一个个的错误修改，那简直是可怕的，此时，我们需要我们的编辑器能自动帮助我们修复问题代码。

以我使用的vs code为例，需要安装stylelint插件。

之后需要配置setting.json文件

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true,
  },
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
}
```

这样配置是告诉vs code，在文件保存时执行修复，并且忽略编辑器自带的css、less、scss验证。

之后，在需要修复代码的文件处保一下，代码就自动修复了。
