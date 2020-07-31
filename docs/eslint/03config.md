---
title: 配置项
date: 2020-07-29
tags:
 - eslint
categories:
 - 前端
---

## 配置项

### root

默认情况下，ESLint会在所有父级目录里寻找配置文件，一直到根目录，如果你需要你的项目代码都遵循一个代码规范，那么在配置文件中指定`root: true`，可以告诉ESLint，这已经是最高级配置，停止向父级目录查找配置文件。

```js
module.exports = {
  root: true
}
```

### env

该选项告诉ESLint当前的开发环境是什么，例如，我们一般都是在浏览器环境中开发项目，所以我们需要指定`env.browser=true`来明确当前的开发环境为浏览器，这样我们在使用浏览器的一些全局变量时就不会报错了。

```js
module.exports = {
  env: {
    browser: true, // 浏览器环境中的全局变量
    node: true, //  Node.js 全局变量和 Node.js 作用域
    commonjs: true, // CommonJS 全局变量和 CommonJS 作用域 (用于 Browserify/WebPack 打包的只在浏览器中运行的代码)
    es6: true // 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）
  }
}
```

### parserOptions

该选项允许你设置需要支持的语法的。

同样的，支持 ES6 语法并不意味着同时支持新的 ES6 全局变量或类型（比如 `Set` 等新类型）。对于 ES6 语法，使用 `{ "parserOptions": { "ecmaVersion": 6 } }`；
对于新的 ES6 全局变量，使用 `{ "env":{ "es6": true } }`. `{ "env": { "es6": true } }` 自动启用es6语法，但 `{ "parserOptions": { "ecmaVersion": 6 } }` 不自动启用es6全局变量。

parserOptions 属性设置。可用的选项有：

* `ecmaVersion` - 默认设置为 3，5（默认）， 你可以使用 6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本。你也可以用使用年份命名的版本号指定为 2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）或 2019 (same as 10)
* `sourceType` - 设置为 "`script`" (默认) 或 "`module`"（如果你的代码是 ECMAScript 模块)。
* `parser` - 执行解析文件的解析工具
  * Espree  - 默认解析工具
  * Esprima - 
  * babel-eslint - babel解析工具
  * @typescript-eslint/parser - 将 TypeScript 转换成与 estree 兼容的形式，以便在ESLint中使用。
* `ecmaFeatures` - 这是个对象，表示你想使用的额外的语言特性:
  * `globalReturn` - 允许在全局作用域下使用 `return` 语句
  * `impliedStrict` - 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
  * `jsx` - 启用 JSX
```js
module.exports = {
  ecmaVersion: 6,
  sourceType: "module",
  ecmaFeatures: {
    jsx: true
  }
}
```

### globals

globals允许你指定全局变量，在应用一些插件时，可能插件会暴露在window上一个全局变量，此时，如果我们直接使用该全局变量，eslint会立即报告一个错误，因为ESLint并不知道，它是一个全局变量。
所以，此时我们就需要在globals下配置该全局变量，让ESLint知道。

```js
module.exports = {
  globals: {
    $: 'writable'
  }
}
```
以上配置告诉ESLint，`$`是一个可写的全局变量。

::: tip
全局变量的规范有三总，分别为：
* `'writable'`：可写
* `'readonly'`：可读
* `'off'`：不可使用
:::

### plugins

前面就已经说过，ESLint是一个插件化的代码检查工具，所以，插件对于ESLint来说是非常重要的，我们可以利用插件来解析各种文件，例如，使用eslint-plugin-vue来检测vue文件，使用
eslint-plugin-react来检测jsx文件。ESLint使用插件非常简单，只需要安装该插件后再`plugins`字段中配置该插件即可。

```js
module.exports = {
  plugins: [
    'vue',
    'react'
  ]
}
```

::: tip
配置插件时，插件名称前面的`eslint-plugin-`可以省略。例如：`eslint-plugin-vue`可以写作'vue'。
:::

### rules

ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用的规则。要改变一个规则设置，你必须将规则 ID 设置为下列值之一：

* "off" 或 0 - 关闭规则
* "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
* "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

```js
module.exports = {
  rules: {
    eqeqeq: "off",
    curly: 2,
    quotes: ["error", "double"],
  }
}

```

### extends

`extends`表示继承一组规范，应用于当前项目。

就像babel的`preset`配置项一样，ESLint为了避免我们手动配置庞杂的规范，为我们提供了一组几乎是必须遵守的开发规范，我们只需要继承该规范，然后该规范就可以用于我们的项目，
让我们专注于代码的开发，而不是繁琐的配置。

```js
module.exports = {
  extends: ['eslint:recommended']
}
```
上面这样配置即开启了eslint为我们设计的默认遵守的开发规范。

::: tip
目前社区中有很多已经定义好的代码检查规范，像standard、airbnb等，同时也有插件级别的规范，像eslint-plugin-vue插件中提供的检测template和script内代码的规范，jsx规范，等等。
我们可以根据项目的需要寻找适合自己的规范，并严格遵守。
:::

### parser
`parser` - 执行解析文件的解析工具

* Espree  - 默认解析工具
* Esprima - 
* babel-eslint - babel解析工具
* @typescript-eslint/parser - 将 TypeScript 转换成与 estree 兼容的形式，以便在ESLint中使用。

```js
module.exports = {
  parser: 'babel-eslint'
}
```


### settings

ESLint 支持在配置文件添加共享设置。你可以添加 `settings` 对象到配置文件，
它将提供给每一个将被执行的规则。如果你想添加的自定义规则而且使它们可以访问到相同的信息，这将会很有用，并且很容易配置。

```js
module.exports = {
  settings: {

  }
}
```

## 添加忽略文件

在项目开发中，我们并不希望ESLint检查全部的文件，这就需要添加ESLint需要忽略的文件。

为了达到忽略文件的目的，我们需要在根目录添加`.eslintignore`文件，例如，我们需要忽略根文件static文件夹下的文件，我们可以在
`.eslintignore`文件中这样配置

```
/static/
```

## 忽略规则

有时，我们在某些文件中确实需要一些代码，但是这些代码违反了ESLint的代码规范，这时，我们又不能修改这些代码，而且，我们也不能修改那条规范，
因为别的文件中确实需要遵守这条规范，这时，我们就需要使用内联的忽略语句。

* 1、忽略整个文件，在文件开头添加`/* eslint-disable */`注释
```js
/* eslint-disable */
alert('foo');
```

* 2、忽略部分代码，需要如下代码注释
```js
alert('1')
/* eslint-disable */
alert('foo');
...
/* eslint-enable */
```
包裹在`/* eslint-disable */`和`/* eslint-enable */`之间的代码块会被ESLint忽略。

* 3、忽略某一行。

```js
alert('foo'); // eslint-disable-line

// eslint-disable-next-line
alert('foo');

/* eslint-disable-next-line */
alert('foo');

alert('foo'); /* eslint-disable-line */
```

::: tip
如果你可以准确的知道需要忽略的规则的名称，可以这样写：

```js
alert('foo'); // eslint-disable-line no-alert, quotes, semi

// eslint-disable-next-line no-alert, quotes, semi
alert('foo');

alert('foo'); /* eslint-disable-line no-alert, quotes, semi */

/* eslint-disable-next-line no-alert, quotes, semi */
alert('foo');
```
:::