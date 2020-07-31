---
title: 配置vue项目的eslint
date: 2020-07-29
tags:
 - eslint
categories:
 - 前端
---

## 配置vue项目的eslint

在webpack的教程中，我们对于eslint这部分的配置只是给出了配置，单并没有讲解为什么这么配置，下面就让我们一步步的
配置出适合vue项目的eslint。

* 1、首先为了让表示当前文件为最终配置我们需要配置`root`选项。
```js
module.exports = {
  root: true
}
```

* 2、指明当前项目运行的环境，所以我们需要配置`env`选项

```js
module.exports = {
  root: true,
  env: {
    browser: true
  }
}
```
* 3、配置eslint规范，这里我们选择社区中的standard规范，
首先安装`eslint-config-standard`，为了支持这个规范，我们还需要安装`eslint-plugin-node`，`eslint-plugin-import`，`eslint-plugin-promise`，
三个插件。之后在`extends`选项中配置该规范。

```js
module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: [
    'standard'
  ]
}
```

* 4、为了能够支持vue单文件的template和script的内容的检查，我们需要安装`eslint-plugin-vue`插件。
之后，配置启用该插件，同时，使用插件暴露出来的默认规则配置。

```js
module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  plugins: [
    'vue'
  ]
}
```

* 5、添加我们自己的配置，这里standard规范要求不加末尾的分号，我比较喜欢在末尾加上分号，所以我需要在rules中
配置该选项来覆盖standard的默认规范。

```js
module.exports = {
  root: true,
  env: {
    browser: true
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  plugins: [
    'vue'
  ],
  rules: [
    semi: ['error', 'always']
  ]
}
```

* 6、配置解析器，因为vue项目一般会用babel做转码，所以我们这里使用'babel-eslint'来做代码解析器。
同时需要支持es6的模块话。所以，需要如下配置：

```js
module.exports = {
  root: true,
  env: {
    browser: true
  },
  parserOptions: {
    ecmaVersion: 11, 
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: [
    'plugin:vue/essential',
    'standard'
  ],
  plugins: [
    'vue'
  ],
  rules: [
    semi: ['error', 'always']
  ]
}
```

这样，就形成了我们自己的配置规范。


## 附加

以下是作者自己配置的react项目的eslint代码检查，需要的请自取：

支持

* react语法

* react-hooks规范

* standard规范

*强制结尾添加分号


```js
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    'plugin:react/recommended',
    // 启用hooks规范检查
    'plugin:react-hooks/recommended',
    'standard',
    'standard-react'
  ],
  plugins: [
    'react',
    'react-hooks'
  ],
  rules: {
    // 必须添加分号
    semi: [2, 'always']
  }
};
```

## 总结

本次ESLint的教程相对基础，因为此次教程旨在帮助初级工程师完善ESLint相关知识。

本次ESLint的教程到这里就结束了，这次教程虽然篇幅很短，但是干活满满，认真看完此次教程，我相信你会对ESLint的配置有进一步的认识，至少不会再一头雾水。

如果你喜欢此教程，欢迎star。
