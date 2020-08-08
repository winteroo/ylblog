---
title: babel配置项-presets
date: 2020-08-07
tags:
 - babel
categories:
 - 前端
---

## 前言

配置babel，很关键的配置项就是预设，预设其实就是一组babel插件的集合。

babel插件很多，babel7.8官方的插件就有100多个，这么多的插件让我们一个个的下载添加是非常麻烦的，此时使用预设就是个不错的选择。

在Babel6的时代，常见的preset有babel-preset-es2015、babel-preset-es2016、babel-preset-es2017、babel-preset-latest、
babel-preset-stage-0、babel-preset-stage-1、babel-preset-stage-2等。

babel-preset-es2015、babel-preset-es2016、babel-preset-es2017分别是TC39每年发布的进入标准的ES语法的转换器预设，我们在这里称之为年代preset。

**目前，Babel官方不再推出babel-preset-es2017以后的年代preset了。**

babel-preset-stage-0、babel-preset-stage-1、babel-preset-stage-2、babel-preset-stage-3是TC39每年草案阶段的ES语法转换器预设

**从Babel7版本开始，上述的预设都已经不推荐使用了，babel-preset-stage-X因为对开发造成了一些困扰，也不再更新。**

babel-preset-latest，在Babel6的时候是你在使用它的时候所有年代preset的集合，在Babel6最后一个版本，它是babel-preset-es2015、babel-preset-es2016、babel-preset-es2017这三个的集合。
因为Babel官方不再推出babel-preset-es2017以后的年代preset了，所以babel-preset-latest定义变成了TC39每年发布的进入标准的ES语法的转换器预设集合。
其实，和Babel6时的内涵是一样的。

**@babel/preset-env** 包含了babel-preset-latest的功能，并对其进行增强，现在@babel/preset-env完全可以替代babel-preset-latest。

经过一番梳理，可以总结为以前要用到的那么多preset预设，现在只需一个 **@babel/preset-env** 就可以了。


总结起来，Babel官方的preset，我们实际可能会用到的其实就只有4个：

* @babel/preset-env

* @babel/preset-flow

* @babel/preset-react

* @babel/preset-typescript

一个普通的vue工程，Babel官方的preset只需要配一个@babel/preset-env就可以了。

## 目标浏览器

@babel/preset-env是整个Babel大家族最重要的一个preset。不夸张地说，所有配置项仅需要它自己就可以完成现代JS工程所需要的所有转码要求。

@babel/preset-env的功能不光是进行语法转化，它还可以针对目标浏览器进行按需的语法转化以及按需的polyfill的引用。

下面我们就具体使用下它：

```bash
npm i @babel/preset-env -D
```

babel.config.js配置如下：
```js
module.exports = {
  presets: ['@babel/preset-env'],
  plugins: []
};
```

这样配置后babel就可以正常转化代码。

我们还可以根据项目需要支持的浏览器种类来按需转化代码，例如，项目只需要支持到ie11，那么针对ie11一下的代码转化就不需要了。

要想实现这样的需求，我们需要配置需要支持的目标浏览器，有三种配置的方法：

* 1、在package.json的browserslist的字段中配置所需支持浏览器。
```json
{
  "browserslist": [
    "> 1%",
    "not ie <= 8"
  ]
}
```
上面的配置说明，需要支持的浏览器是市场份额大于1%，且不提供ie8及以下版本的支持。

* 2、创建独立文件.browserslistrc（注意前面有点），在其中配置需要支持的浏览器。
```.browserslistrc
chrome > 38
firefox 58
```
上面的配置说明需要支持chrome大于38版本的浏览器，并且支持firefox大于58版本的浏览器。

* 3、在@babel/preset-env的配置项targets中配置需要支持的浏览器。
```js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: '> 1%, not ie <= 8'
      // targets: {
      //   'chrome': '58',
      //   'ie': '11'
      // }
      // targets: ['> 1%','not ie <= 8']
    }]
  ],
  plugins: []
};
```

上面的配置同样表示需要支持的浏览器是市场份额大于1%，且不提供ie8及以下版本的支持。

::: tip
```js
module.exports = {
  presets: [
    ['@babel/preset-env',{}]
  ]
};
```
这种将预设名称和一个对象作为数组的第一第二项的方式来为当前预设添加配置。
:::

这里我建议采用.browserslistrc单独配置文件的方式书写目标浏览器。

下面动图为大家展示下：


![babel1](~@Babel/images/babel1.gif)

设置支持chrome38版本以上的浏览器，因为chrome38是比较老的浏览器了，不支持ES6语法，所以我们能看到，babel帮助我们将
代码转换为ES5代码。

![babel2](~@Babel/images/babel2.gif)

我们换成比较新的chrome78 版本，该版本对ES6语法的支持度还是比较完善的，我们可以发现，babel没有转化箭头函数、let、const等
这些chrome78支持的语法。

## 按需引入polyfill

实现了根据目标浏览器按需转化语法，接下来我们将目光转向polyfill。

可以发现，虽然babel根据目标浏览器转化了基础语法，但是Promise始终存在，没有被转化，这与我们前面说的

**因为Babel默认只转换新的JavaScript语法（syntax），而不转换新的 API。**

的规则吻合，低版本浏览器支持Promise的方法就是引入polyfill。

但是整个polyfill是非常庞大的，babel官方当然也考虑到了这个问题，所以为我们提供了按需引入polyfill的解决方案。

何为按需引入Polyfill，

* 一种是按照我们配置的目标浏览器，只引入目标浏览器不支持的API的polyfill。

* 另一种则是更加智能的在第一种的基础上再次分析我们的代码使用的API的情况，只引入目标浏览器不支持且在我们的源代码中使用的API的polyfill。

实现上面两种方案的方法是配置@babel/preset-env的配置参数`useBuiltIns`，该参数有三个可选项，分别为`false`，`'entry'`,`'usage'`，默认为`false`

### `useBuiltIns: false`

设置为`false`的话，babel不会按需引用polyfill，只会全部引入，如下图：

![babel2](~@Babel/images/babel3.gif)

可见，babel只是单纯的将全部的polyfill引入，并未做任何操作。

### `useBuiltIns: 'entry'`

设置为`'entry'`的话，会告诉babel，从我的入口文件处查找导入的polyfill，然后按照目标浏览器配置按需引入需要的polyfill。

我们修改我们的入口文件为：

```js
import '@babel/polyfill'

const arr = [1, 2];

let newArrr = arr.map((item) => {
  return item * 2;
})

let promise = Promise.resolve('1');
```

引入了@babel/polyfill，同时使用了数组的map方法以及promise。

设置我们的目标浏览器为chrome > 40

重新转码后，如下：

![babel2](~@Babel/images/babel4.gif)

一个巨大引用列表，因为chrome40是比较老的版本，很多ES6的特性方法都没有实现，所以babel帮助我们引入了所有chrome40不支持的API方法。

接下来，让我们吧把目标浏览器的版本提高，提高到chrome78

![babel2](~@Babel/images/babel5.gif)

惊人的差距，引入的polyfill的包只有3个，因为chrome78是比较高的版本，基本实现了ES6的语法，所以babel就只管导入了chrome78未实现的api。

由此可见`useBuiltIns: 'entry'`确实帮助我们实现了按照目标浏览器进行按需引入polyfill的目的，这真是太棒了，

### `useBuiltIns: 'usage'`

但是我们的代码中只使用了几个ES6的语法：数组的`map`,`Promise`，可是在低版本的目标浏览器中，babel仍然为我们引入了其他我们
未使用的但是浏览器不支持的语法API，

有没有更好的按需引入的方法呢？答案是有的。

那就是配置项`usage`，设置为该值后，babel不仅会分析当前的目标浏览器，同时它还会分析我们的代码，收集我们代码中使用的ES6
代码，从而只引入我们代码中用到的且浏览器不支持的polyfill。

我们依然用低版本的chrome 40测试：

![babel2](~@Babel/images/babel6.gif)

又是惊人的差距，我们使用`'usage'`配置项babel只为我们引入了我们需要的Promise的包和一个to-string的包，相比与`'entry'`
配置产出的一长串的包简直是小的太多了，这真是太棒了。

## @babel/preset-env的其他配置项

### corejs

前面我们说过，@babel/polyfill是由core-js与regenerator-runtime组成的，而corejs目前分为2、3两个版本，3版本相对2版本多了一些方法，作用是相当的，@babel/polyfill
默认采用的是2版本，corejs@2会跟随@babel/polyfill一起安装，如果我们想要使用3版本，需要另外安装`npm i core-js@3 -S`。

@babel/preset-env的corejs配置项的选值可以是2也可是3，默认是2，如果你安装了corejs@3版本，可以指定是3，如果没有安装corejs@3，指定为3的话会导致babel报错提示。
所以安装了那个版本就指定那个版本就可以了。

而且在useBuiltIns指定为entry时，前面说过需要在入口文件处引入@babel/polyfill，这在corejs为2的时候是正常运行的，但是如果你的corejs指定的是3，就会出现babel
没有按需引入polyfill的情况，如下图：

![babel2](~@Babel/images/babel7.gif)

我们可以发现，babel没有按需引入polyfill，而是直接引入了整个polyfill，这是糟糕的。

所以，当我们在指定corejs为3时，我们就需要在入口文件处按如下方式引入polyfill
```js
import 'core-js/stable'
import 'regenerator-runtime/runtime'
```

效果如下：

![babel2](~@Babel/images/babel8.gif)

很惊喜，babel的按需引入能力又生效了。

如果在useBuiltIns指定为usage时，因为不需要手动引入@babel/polyfill，指定相对应的corejs版本就可以了。

如果指定错误，即在没有安装corejs@3的情况下却指定corejs参数为3，babel依然会按照正确的corejs版本去处理代码的，即退回到corejs@2处理。

::: tip
只有在useBuiltIns指定entry或是usage时，corejs的设置项才会起作用。
:::

### modules

这个参数项的取值可以是`'amd'`、`'umd'` 、 `'systemjs'` 、 `'commonjs'` 、`'cjs'` 、`'auto'` 、`false`。在不设置的时候，取默认值`'auto'`。

该项用来设置是否把ES6的模块化语法改成其它模块化语法。

我们常见的模块化语法有两种：（1）ES6的模块法语法用的是import与export；（2）commonjs模块化语法是require与module.exports。

在该参数项值是’auto’或不设置的时候，会发现我们转码前的代码里import都被转码成require了。

如果我们将参数项改成false，那么就不会对ES6模块化进行更改，还是使用import引入模块。

使用ES6模块化语法有什么好处呢。在使用Webpack一类的打包工具，可以进行静态分析，从而可以做tree shakeing等优化措施。

下面演示：

![babel2](~@Babel/images/babel9.gif)


## 总结

本节内容中我们讲解了babel的配置项presets的含义以及配置规则，同时还对非常中的的@babel/preset-env的作用和配置参数进行了详细的讲解，相信，认真看完
本届教程的同学一定会对babel的presets有了更深刻的认识。下节我们继续介绍babel的神奇的插件。

