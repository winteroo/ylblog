---
title: babel配置项-plugins
date: 2020-08-08
tags:
 - babel
categories:
 - 前端
---

## 概念

插件在很多工具中都有提到，比如eslint的插件，webpack的插件等等，插件的功能无外乎帮助工具更好的工作，babel的插件也是如此，前面我们提到的配置项presets就是
插件集合，plugins则是根据我们的需要自行配置的插件。

同样插件的书写方式和presets的方法一样，同时，为插件配置参数的方法也是一样的，就像下面这样：

```js
module.exports = {
  plugins: [
    ['@babel/plugin-my-test', {
      xxx: '222'
    }]
  ]
}
```

## 插件@babel/plugin-transform-runtime

babel的插件很多，我们这里只对经典的@babel/plugin-transform-runtime插件进行讲解。

前面我们介绍了babel是如何转码的，看下面的语法转换：

源码：
```js
class Animal {
  run() {
    console.log('runing');
  }
}
```

转码：
```js
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Animal = /*#__PURE__*/function () {
  function Animal() {
    _classCallCheck(this, Animal);
  }

  _createClass(Animal, [{
    key: 'run',
    value: function run() {
      console.log('runing');
    }
  }]);

  return Animal;
}();
```

可以发现，babel针对`class`语法做了转换，引入了三个辅助函数，这三个辅助函数就是为了模拟class语法。

但是有个问题，前端工程中，成百上千的class怎么办，总不能每个文件在转换是都引入辅助函数，那样会造成大量的重复代码，而且打包后的代码体积也会异常的大，要是可以
将这些相同的辅助函数提取到一个文件中，需要的时候去require或是import就行了。

@babel/runtime就是这样的一个npm包，它其中包含了babel需要的各种辅助函数。

但是，如何去这个npm包里取函数呢？总不能我们自己动手把每个辅助函数都替换为从这个npm包中引用的语法吧。

为了解决这个问题，@babel/plugin-transform-runtime就诞生了，它有三个作用：

* 1.自动移除语法转换后内联的辅助函数（inline Babel helpers），使用@babel/runtime/helpers里的辅助函数来替代；

* 2.当代码里使用了core-js的API，自动引入@babel/runtime-corejs3/core-js-stable/，以此来替代全局引入的core-js/stable;

* 3.当代码里使用了Generator/async函数，自动引入@babel/runtime/regenerator，以此来替代全局引入的regenerator-runtime/runtime；

接下来，我们一个个的验证。

### 替换内联函数功能

首先我们需要安装辅助函数包和插件
```bash
npm i @babel/runtime -S
npm i @babel/plugin-transform-runtime -D
```


配置babel如下：
```js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'usage'
    }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime']
  ]
};
```

再次打包查看效果：

![babel2](~@Babel/images/babel10.gif)

转换后的代码：

```js{2,3,4}
'use strict';
var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault');
var _classCallCheck2 = _interopRequireDefault(require('@babel/runtime/helpers/classCallCheck'));
var _createClass2 = _interopRequireDefault(require('@babel/runtime/helpers/createClass'));
var Animal = /*#__PURE__*/function () {
  function Animal() {
    (0, _classCallCheck2.default)(this, Animal);
  }

  (0, _createClass2.default)(Animal, [{
    key: 'run',
    value: function run() {
      console.log('runing');
    }
  }]);
  return Animal;
}();

```

很明显，插件生效了，先前存在的每个辅助函数都被替换为了从@babel/runtime中导入的形式。

### 替换API功能

前面我们讲解的替换API的功能，babel是通过引入对应的polyfill实现的，但是这个方式对于一些公共库的作者来说并不是一个很好的方法，因为库作者使用的polyfill版本
可能和我们使用的不一样，这样全局中的API就会发生冲突，严重的可能会影响程序的正常运行，所以不使用而是替换API的方法对于公共库作者来说是非常有必要的。

@babel/plugin-transform-runtime插件提供替换API的功能，具体使用方式如下：

首先，我们先前安装的@babel/runtime已经无法满足我们不断膨胀的欲望，需要换成他的进化版@babel/runtime-corejs3。

```bash
npm uninstall @babel/runtime -S
npm i @babel/runtime-corejs3 -S
```

之后修改babel的配置文件为：

```js{4,9}
module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: false
    }]
  ],
  plugins: [
    ['@babel/plugin-transform-runtime',{
      corejs: 3
    }]
  ]
};
```

**注意**

**我们开启了@babel/plugin-transform-runtime的API转化功能，那么我们就不再需要polyfill的支持了，所以我们需要去掉所有polyfill相关的引用和配置。**

之后修改我们的源码文件，添加Promise和数组的includes方法：

```js
let promise = Promise.resolve(1)

let arr = [1, 2, 3];

let c = arr.includes(2);

console.log(c)
```

转码查看效果：

![babel2](~@Babel/images/babel11.gif)

转码后的代码：

```js{3,4}
'use strict';
var _interopRequireDefault = require('@babel/runtime-corejs3/helpers/interopRequireDefault');
var _includes = _interopRequireDefault(require('@babel/runtime-corejs3/core-js-stable/instance/includes'));
var _promise = _interopRequireDefault(require('@babel/runtime-corejs3/core-js-stable/promise'));
var promise = _promise.default.resolve(1);
var arr = [1, 2, 3];
var c = (0, _includes.default)(arr).call(arr, 2);
console.log(c);
```

非常明显，API转换功能完成了，而完成这一切的操作仅仅是：

* 1、替换@babel/runtime为@babel/runtime-corejs3

* 2、配置@babel/plugin-transform-runtime的corejs参数为3

### 转换async/await语法

其实，替换async/await语法与前面我们说的替换class语法是相似的，下面直接看效果：

![babel2](~@Babel/images/babel12.gif)

源码： 
```js
const fun = async () => {
  let ans = await new Promise(resolve => {
    setTimeout(() => {
      resolve(1)
    })
  })
  console.log(ans);
}
```


转码：
```js{3,4,5,6}
'use strict';
var _interopRequireDefault = require('@babel/runtime-corejs3/helpers/interopRequireDefault');
var _regenerator = _interopRequireDefault(require('@babel/runtime-corejs3/regenerator'));
var _setTimeout2 = _interopRequireDefault(require('@babel/runtime-corejs3/core-js-stable/set-timeout'));
var _promise = _interopRequireDefault(require('@babel/runtime-corejs3/core-js-stable/promise'));
var _asyncToGenerator2 = _interopRequireDefault(require('@babel/runtime-corejs3/helpers/asyncToGenerator'));
var fun = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var ans;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return new _promise.default(function (resolve) {
              (0, _setTimeout2.default)(function () {
                resolve(1);
              });
            });
          case 2:
            ans = _context.sent;
            console.log(ans);
          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return function fun() {
    return _ref.apply(this, arguments);
  };
}();
```

### 插件配置参数说明

默认参数：

```js
module.exports = {
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        helpers: true,
        corejs: false,
        regenerator: true,
        useESModules: false,
        absoluteRuntime: false,
        version: '7.0.0-beta.0'
      }
    ]
  ]
}
```

* helpers: 是否自动导入辅助函数包，这是该插件的核心功能。

* corejs: 是否进行API转换，取值范围为`false`，`2`，`3`。`false`表示不开启API转换，`2`，`3`均表示开启API转换功能，只是使用的@babel/runtime-corejs2还是@babel/runtime-corejs3的区别。如果不是公共库的开发，建议采用该项设置为false，同时配合@babel/preset-env的按需引入polyfill。

* regenerator：是否开启async/await语法的转化，默认是开启的。

* useESModules: 是否开启ES6的模块语法，不过因为插件先于预设执行，所以如果@babel/preset-env和@babel/plugin-transform-runtime配合使用的话，设置@babel/preset-env的modules选项才会得到想要的输出结果。

* absoluteRuntime: 该项用来自定义@babel/plugin-transform-runtime引入@babel/runtime/模块的路径规则，取值是布尔值或字符串。没有特殊需求，我们不需要修改，保持默认false即可。

* version: 插件版本号

## 总结

* 1、要使用@babel/plugin-transform-runtime插件，其实只有一个npm包是必须要装的，那就是它自己@babel/plugin-transform-runtime。

* 2、对于@babel/runtime及其进化版@babel/runtime-corejs2、@babel/runtime-corejs3，我们只需要根据自己的需要安装一个。

* 3、如果你不需要对core-js做API转换，那就安装@babel/runtime并把corejs配置项设置为false即可。

* 4、如果你需要用core-js2做API转换，那就安装@babel/runtime-corejs2并把corejs配置项设置为2即可。

* 5、如果你需要用core-js3做API转换，那就安装@babel/runtime-corejs3并把corejs配置项设置为3即可。