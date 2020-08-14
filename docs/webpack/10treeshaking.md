---
title: tree-shaking
date: 2020-07-23
tags:
 - webpack
categories:
 - 前端
---

## 简介

tree-shaking是由rollup的作者首先提出的，这里有一个比喻：

> 如果把代码打包比作制作蛋糕。传统的方式是把鸡蛋(带壳)全部丢进去搅拌，然后放入烤箱，最后把(没有用的)蛋壳全部挑选并剔除出去。而 treeshaking 则是一开始就把有用的蛋白蛋黄放入搅拌，最后直接作出蛋糕。

因此，相比于**排除不使用的代码**，tree shaking 其实是**找出使用的代码**。

基于 ES6 的静态引用，tree shaking 通过扫描所有 ES6 的 `export`，找出被 `import` 的内容并添加到最终代码中。 webpack 的实现是把所有 `import` 标记为有使用/无使用两种，在后续压缩时进行区别处理。
因为就如比喻所说，在放入烤箱(压缩混淆)前先剔除蛋壳(无使用的 `import`)，只放入有用的蛋白蛋黄(有使用的 `import`)。

## 使用方法

### 测试未tree-shaking的情况

为了测试，作者添加了测试代码如下：

```js
export const con = () => {
  console.log('我是测试分离公共模块的');
};

export const cc = () => {
  console.log('测试treecc');
};

export const aa = () => {
  console.log('测试treeaa');
};

export const bb = () => {
  console.log('测试treebb');
};

export const dd = () => {
  console.log('测试treedd');
};
```

并在detail.vue文件中引入了其中两个方法。

```vue
<template>
  <div>
    detail
  </div>
</template>

<script>
import { con, cc } from '../util/dd';
export default {
  name: 'detail',
  methods: {
    go () {
      con();
      cc();
    }
  }
};
</script>
```

为了能清楚的查看打包后的代码，我们暂时关闭代码压缩（即关闭tree shaking）。

```js
module.exports = {
  optimization: {
    // 关闭代码压缩
    minimize: false
  }
}
```

打包查看效果：

![treeshaking1](~@Webpack/images/treeshaking1.gif)

我们不难发现，在打包后的文件中，依然存在我们没有用到的函数`aa`，`bb`，`dd`，说明webpack没有做tree shanking，这与我们前面关闭tree shaking的配置是一致的。

我们观察生成的打包文件，会发现如下特征：

![treeshaking2](~@Webpack/images/treeshaking2.png)

* 被使用过的 `export` 标记为 `/* harmony export ([type]) */`，其中 `[type]` 和 webpack 内部有关，可能是 `binding`, `immutable` 等等。

* 没被使用过的 `export` 标记为 `/* unused harmony export [FuncName] */`，其中 `[FuncName]` 为 export 的方法名称。

其实这正是，webpack为tree shaking做的准备工作，如果后续我们启用代码压缩的话，其中被标记`/* unused harmony export [FuncName] */`的代码会被丢弃，只有
被标记为`/* harmony export ([type]) */`的代码才会被引用并压缩。

::: tip
webpack4采用`terser-webpack-plugin`作为压缩工具，而webpack3采用的是`UglifyJSPlugin`。
:::

### 配置tree-shaking

#### 第一步

首先必须明确的一点是：（重要的事情说三遍）

* **webpack的tree shaking是基于ES6的模块规范`import`和`export`**

* **webpack的tree shaking是基于ES6的模块规范`import`和`export`**

* **webpack的tree shaking是基于ES6的模块规范`import`和`export`**

而babel的默认使用的模块规范是 CommonJS 规范，经过babel转义的代码都会变成`require`的形式，所以我们需要告诉babel不要这样转换，在.babelrc中添加`"modules": false`配置。

```.babelrc
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false
      }
    ]
  ]
}
```

::: tip
经过作者测试，在webpack4和babel7中即使不设置`"modules": false`，也可以正常tree shaking，目前还不知道原因。
:::

#### 第二步

webpack 4 在 `package.json` 新增了一个配置项叫做 `sideEffects`， 值为 `false` 表示整个包都没有副作用；
或者是一个数组列出有副作用的模块

```json
{
  "sideEffects": "['./src/util/cc.js']"
}
```

我们可以根据项目的需求，根据实际情况进行设置，这里我们设置为`false`

```json
{
  "sideEffects": false
}
```

#### 第三步

接下来就需要配置webpack了，我们已经知道了webpack将使用的和未使用的代码做了不同的标记，接下来就需要挑出有用的代码了，这里就需要压缩工具的帮助了，压缩工具
帮助我们压缩代码的同时，丢弃掉未使用的代码，生成最后的文件，这样便实现了tree shaking。

```js
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  optimization: {
    // 配置tree shaking
    usedExports: true,
    // 开启压缩
    minimize: true,
    // 压缩工具
    minimizer: [new TerserPlugin()]
  }
}
```

好啦，配置完成，打包试试看：

![treeshaking3](~@Webpack/images/treeshaking3.gif)

哎呀，怎么没有了css样式，而且css文件也没有生成，这是怎么回事，

原来，webpack认为利用`import`导入的文件，如果没有被使用的话，他会认为该引用是无用的，无情丢弃，也就造成了最后打包的文件没有css代码的问题。
解决这个问题，我们只需要告诉webpack样式文件是有副作用的，不能丢掉，需要在webpack的配合文件处添加如下语句：

```js
module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      sideEffects: true,
    },{
      test: /\.s[ac]ss$/,
      sideEffects: true,
    }]
  }
}
```

所有涉及样式文件的规则都需要添加`sideEffects: true`，表示这类文件是有副作用的。

接下来，再让我们打包看下：

![treeshaking4](~@Webpack/images/treeshaking4.gif)

运行一切正常，那tree shaking生效了吗？

![treeshaking5](~@Webpack/images/treeshaking5.gif)
![treeshaking6](~@Webpack/images/treeshaking6.png)

很高兴，打包后的项目我们只能找到引入的两个函数的打印语句，其他未使用的方法都没有包含在生产的文件中，这说明，tree shaking生效了。

## 总结

为了更好的达到tree shaking的效果，我们需要：

* 使用 ES6 模块语法编写代码

* 工具类函数尽量以单独的形式输出，不要集中成一个对象或者类

* 声明 sideEffects

* 注意样式文件是具有副作用的

至此，我们已经完成了完整的vue项目的webpack配置，需要源码的同学请移步

[我的github查看vue项目的webpack配置](https://github.com/winteroo/vue-webpack4-template)

[react项目webpack配置](https://github.com/winteroo/react-template)

真正的自己摆脱脚手架工具的帮助，自己配置一个vue项目，你会从中学习到很多东西，对于webpack的认识也会更近一步，妈妈再也不怕我不会自己配置webpack了。
