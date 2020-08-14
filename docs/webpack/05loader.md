---
title: loader
date: 2020-07-21
tags:
 - webpack
categories:
 - 前端
---

## 简介

webpack本身只能处理js文件，但是在我们的项目中不只包含js文件，项目中还会有css文件，图片文件，html文件，以及特定的vue文件，jsx文件等。
为了让webpack可以处理这些类型的文件，loader概念就诞生了。

loader 用于对模块的源代码进行转换。loader 可以使你在 `import` 或"加载"模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，
并提供了处理前端构建步骤的强大方法。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript，或将内联图像转换为 data URL。
loader 甚至允许你直接在 JavaScript 模块中 `import` CSS文件！

## loader特性

* loader 支持链式传递。能够对资源使用流水线(pipeline)。一组链式的 loader 将按照相反的顺序执行。loader 链中的第一个 loader 返回值给下一个 loader。在最后一个 loader，返回 webpack 所预期的 JavaScript。
* loader 可以是同步的，也可以是异步的。
* loader 运行在 Node.js 中，并且能够执行任何可能的操作。
* loader 接收查询参数。用于对 loader 传递配置。
* loader 也能够使用 options 对象进行配置。
* 除了使用 package.json 常见的 main 属性，还可以将普通的 npm 模块导出为 loader，做法是在 package.json 里定义一个 loader 字段。
* 插件(plugin)可以为 loader 带来更多特性。
* loader 能够产生额外的任意文件。

## loader配置

loader是webpack的概念，loader是处理一类文件的工具，所以，配置loader如何去处理文件才是关键。

loader需要在模块（`module`）下进行配置，每个规则匹配一类文件，使用一种或是多种loader进行处理。

下面介绍配置项：

### `module.rules`

`module.rules`是一个数组，用于定义规则数组，它看起来像这样：

```js
module.exports = {
  ...
  module: {
    rules: [{
      ...
    },{
      ...
    }]
  }
}
```

::: tip
其中的每项规则，我们用Rule来表示。以下篇幅的Rule也是单个规则配置项的意思。
:::

### `Rule.test`

`Rule.test`的值是一个正则表达式，用于匹配对应的文件，使用此配置，便可以将一类文件归于一种loader处理。它看起来像这样

```js
module.exports = {
  ...
  module: {
    rules: [{
      // 匹配css文件
      test: /\.css$/
    },{
      // 匹配多种图片类型的文件
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/
    }]
  }
}
```

### `Rule.use`

`Rule.use`用来表示匹配`Rule.test`的文件用哪种loader来解析。`Rule.use`接受一个数组，其中包含了loader种类和loader需要的配置参数，它看起来像这样:

```js
module.exports = {
  ...
  module: {
    rules: [{
      // 匹配css文件
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
        options: {}
      },{
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }]
    },{
      // 匹配多种图片类型的文件
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: ['url-loader']
    }]
  }
}
```

以上配置告诉webpack，当你遇到`.css`结尾的文件时，你需要先把该文件交给css-loader处理，然后将返回值交给style-loader处理，当然，在`options`中可以
根据不同的loader的配置要求进行必要的配置。

::: tip
建议大家在配置loader时，都在github上搜索一下对应的loader项目源码，其中的readme.md文件中会详细的介绍该loader的作用以及配置规则，避免因为版本的
迭代造成配置项的改动进而影响打包结果。
:::

### `Rule.include`和`Rule.exclude`

`Rule.include`和`Rule.exclude`是一对反义词，前者表示需要包含的文件，后者表示不需要包含的文件。

他们的取值都是一个字符串或字符串数组，表示需要处理的文件目录，他们看起来像这样：

```js
module.exports = {
  ...
  module: {
    rules: [{
      // 匹配css文件
      test: /\.css$/,
      include: [path.resolve(__dirname, 'src')],
      exclude: [path.resolve(__dirname, 'src', 'demo')]
      use: [{
        loader: 'style-loader',
        options: {}
      },{
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }]
    },{
      // 匹配多种图片类型的文件
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      use: ['url-loader']
    }]
  }
}
```

以上的配置可以理解为，解析src文件夹下除了demo文件夹下的所有css文件。

## 各种类型文件配置详情

下面我们详细说一下各种文件解析的具体配置方法。

::: warning
loader和plugin是互相配合的，plugin可以增强loader的作用，所以很多开源库都是loader和plugin配合使用的，次篇文章主要是讲loader的，
所以涉及plugin的内容我们会放到下一节中描述，这里只做基本配置，不做具体说明。
:::

### css文件

处理css文件的loader有很多，其中css-loader用来将css转化为js可以识别的模块，而style-loader可以帮助我们将css以style标签的方式插入html文档中。

所以可以这样配置：

```js
module.exports = {
  ...
  module: {
    rules: [{
      // 匹配css文件
      test: /\.css$/,
      use: [{
        loader: 'style-loader',
        options: {}
      },{
        loader: 'css-loader',
        options: {}
      }]
    }]
  }
}
```

但是在实际项目开发中，我们更希望css作为单独的文件已link标签的方式进行引入，那么我们就需要分离css文件，并在最后的html文件中自动插入css文件路径。

* [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) 帮助我们分离css

* [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)帮助我们自动生成html文件，并将生产的分离css以link标签的形式引入，当然它也会自动引入生成的js文件。

所以最后的配置如下：

首先安装：

```bash
npm i css-loader -D
npm i html-webpack-plugin -D
npm i mini-css-extract-plugin -D
```

建议分开安装，合并在一起安装经常会出现不可预测的问题。

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.css$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      }, {
        loader: 'css-loader',
        options: {}
      }]
    }]
  },
  plugins: [
    // 提取css为单独文件的插件
    new MiniCssExtractPlugin({
      // 将css打包到执行文件夹
      filename: 'css/[name].[hash:8].css'
    }),
    // 打包html插件，将动态的js插入HTML中
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
  ]
}

```

### sass文件

处理sass文件的loader为sass-loader，这里我们还需要配置postcss来帮助我们增强css

首先安装：

```bash
npm i sass node-sass sass-loader -D
npm i postcss-loader postcss-import postcss-url autoprefixer -D
```

::: warning
sass和node-sass的版本如果不匹配会出现问题，这里建议下载匹配版本。

作者使用版本：

* "sass": "^1.22.12",
* "sass-loader": "^7.2.0",
* "style-loader": "^1.2.1",
:::

::: tip
配置postcss需要在项目根目录下创建.postcssrc.js配置文件，了解具体的配置信息请查看

* [postcss配置信息](https://github.com/michael-ciniawsky/postcss-load-config)

```js
module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    "autoprefixer": {}
  }
}
```

:::

最终的webpack配置信息：

```js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.s[ac]ss$/,
      use: [{
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }, {
        // 需要添加postcss配置文件
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }]
    }]
  }
}
```

### js文件

在工程项目中，我们一般会使用较新的es6语法来编写js代码，但是为了兼容不同的浏览器（万恶的ie），我么需要降低js语法的版本为es5来支持不同浏览器。
为此，我们需要babel大杀器来帮助我们转换代码。

首先安装babel以及配套插件，这里我提供下我的配置版本：

```json
{
  "@babel/core": "^7.10.5",
  "@babel/preset-env": "^7.10.4",
  "babel-eslint": "^10.1.0",
  "babel-loader": "^8.1.0",
  "babel-plugin-syntax-jsx": "^6.18.0",
  "babel-plugin-transform-vue-jsx": "^3.7.0"
}
```

具体配置如下：

```js
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader'
      }],
      include: [resolve('src')]
    }]
  }
}
```

为了让babel更好的工作，你需要在根目录提供babel的配置文件`babel.config.js`，这里我们不具体说如何配置babel，仅展示配置结果，
如果你对babel感兴趣，那么你可能会对我的[babel系列教程](https://winteroo.github.io/ylblog/docs/babel/)感兴趣。

```js
module.exports = {
  presets: [
    ['@babel/preset-env', {
      useBuiltIns: 'entry',
      // useBuiltIns: 'usage',
      corejs: 3,
      modules: false
    }]
  ],
  plugins: ['transform-vue-jsx', '@babel/plugin-transform-runtime']
};

```

### 静态资源文件

静态资源文件我们都使用url-loader来解析

首先安装：

```bash
npm i url-loader -D
```

具体配置如下：相关配置项可参考

* [url-loader](https://github.com/webpack-contrib/url-loader)

* [file-loader](https://github.com/webpack-contrib/file-loader)

::: tip

* 1、url-loader依赖file-loader

* 2、当使用url-loader加载图片，图片大小小于上限值，则将图片转base64字符串，；否则使用file-loader加载图片，都是为了提高浏览器加载图片速度。

* 3、使用url-loader加载图片比file-loader更优秀
:::

```js
module.exports = {
  module: {
    rules: [{
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'img/[name].[hash:8].[ext]',
        // 因为file-loader将此项配置默认为true，方便tree shaking
        // 但是这样会导致使用src='./images/....png'的引用方式失效，故设置为false使其生效
        // 建议采用ES modules的方式引入,例如：
        // const imgsrc = require('./images/login-img.png');
        esModule: false
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'media/[name].[hash:7].[ext]',
        esModule: false
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]',
        esModule: false
      }
    }]
  }
}

```

### vue单文件

在项目中我们为了更直观的编写vue代码，会选择使用vue的单文件组件方式书写代码，但是一个新的文件后缀对于webpack来说是根本无法识别的，
那么这时候我们就需要专门对vue文件做预处理，vue-loader就是专门来处理这类文件的。具体内容请参阅

* [vue-loader](https://vue-loader.vuejs.org/zh/)

首先安装：

```bash
npm i vue-loader vue-template-compiler -D
```

::: tip
注意你应该将 `vue-loader` 和 `vue-template-compiler` 一起安装，并且需要保证你的`vue`和`vue-template-compiler`的版本保持一致。
:::

```js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```

::: tip
引入`VueLoaderPlugin`这个插件是必须的，它是用来解析vue文件的对应块来适应你已经配置的规则，例如：
我们前面配置了js和css的规则，那么这个插件就会将对应的`<script>`块的内容解析为普通js提供给webpack处理，同理
`<style>`块中的内容会解析给对应的语言提供给webpack处理。
:::

vue单文件配置就这样很简单的结束了，基本不需要修改任何参数。

### eslit

工程项目一般会开启eslint代码检查，但是我们更希望当我们在编写代码时可以实时监测我们的代码，那么配置eslint-loader是webpack是非常
有必要的。

::: tip
由此此篇文章主要针对loader讲解，所以涉及eslint的知识，这里不会多说，只会给出基本配置，如果你对
eslint感兴趣，那么你可能会对我的[eslint系列教程](https://winteroo.github.io/ylblog/docs/eslint/)感兴趣。
:::

```js
module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true
  },
  // 使用vue-eslint-parser解析vue文件
  parser: 'vue-eslint-parser',
  parserOptions: {
    // 使用babel-eslint解析js文件以及vuescript标签内的内容
    parser: 'babel-eslint',
    ecmaVersion: 8,
    sourceType: 'module'
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': 'error',
    semi: ['error', 'always'],
    'no-var': 0 // 禁用var，用let和const代替
  }
};

```

我的eslint相关插件版本

```json
{
  "eslint": "^7.6.0",
  "eslint-config-standard": "^14.1.1",
  "eslint-friendly-formatter": "^4.0.1",
  "eslint-loader": "^4.0.2",
  "eslint-plugin-import": "^2.22.0",
  "eslint-plugin-node": "^11.1.0",
  "eslint-plugin-promise": "^4.2.1",
  "eslint-plugin-standard": "^4.0.1",
  "eslint-plugin-vue": "^6.2.2"
}
```

下面提供eslint-loader的配置:

```js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        // 表示eslint-loader先执行，与babel-loader存在前后顺序，eslint-loader
        // 要检查装换之前的代码，所以eslint-loader先执行
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          // 错误报告的输出规范
          formatter: require('eslint-friendly-formatter')
        }
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```

::: warning

eslint-loader的作用是帮助我们检查我们书写的源代码的格式规范，所以他必须是最先接受源码的loader，如果代码已经经过了babel-loader的转换，再传给eslint-loader，
那么检测的代码就是转换之后的代码，此时的代码检查已经没有了任何意义，所以，必须保证eslint-loader是第一个接手源码的loader，这里采用配置项`enforce: 'pre'`来
告诉webpack，当你遇到js或是vue文件时，先交给eslint-loader处理，处理完之后再交给其他loader处理。

:::

## 总结

至此，我们针对css、sass、js、静态资源文件、vue单文件等都做了loader配置，并成功添加了eslint代码检查，下面展示最终配置：

```js
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function resolve (dir) {
  return path.join(__dirname, '..', dir);
}

function processCss () {
  let obj = {};
  if (process.env.NODE_ENV === 'production') {
    obj = {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
      }
    };
  } else {
    obj = {
      loader: 'vue-style-loader'
    };
  }
  return obj;
}

module.exports = {
  entry: {
    // 默认的输出文件名称，默认为main
    app: './src/index.js'
  },
  output: {
    filename: '[name].[hash:8].js',
    path: resolve('dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader'
      }],
      include: [resolve('src')]
    },
    {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      // 表示eslint-loader先执行，与babel-loader存在前后顺序，eslint-loader
      // 要检查装换之前的代码，所以eslint-loader先执行
      enforce: 'pre',
      include: [resolve('src')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
    {
      test: /\.vue$/,
      use: [{
        loader: 'vue-loader'
      }]
    },
    {
      test: /\.css$/,
      use: [
        processCss(),
        {
          loader: 'css-loader',
          options: {}
        }]
    },
    {
      test: /\.s[ac]ss$/,
      use: [processCss(),
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
        // 需要添加postcss配置文件
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
      ]
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'img/[name].[hash:8].[ext]',
        // 因为file-loader将此项配置默认为true，方便tree shaking
        // 但是这样会导致使用src='./images/....png'的引用方式失效，故设置为false使其生效
        // 建议采用ES modules的方式引入,例如：
        // const imgsrc = require('./images/login-img.png');
        esModule: false
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'media/[name].[hash:7].[ext]',
        esModule: false
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'fonts/[name].[hash:7].[ext]',
        esModule: false
      }
    }
    ]
  }
};
```

但是对于webpack来说，只有loader处理文件还不够，我们需要plugin（插件）来增强loader的作用，并实现一些高级功能，那么下面就让我们一同探索plugin的世界吧。
