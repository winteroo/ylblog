---
title: 综述
date: 2020-11-12
tags:
 - Vue
categories:
 - 前端
---

## 前言

本节开始，我们进入vue的模板编译原理阶段，首先需要搞清楚的一点是模板编译的目的是什么？其实，它的最终目的是根据
用户编写的vue模板生成供Vue实例挂载时可以调用的`render`函数，而`render`函数调用的结果是生成表示当前模板内容的虚拟DOM（VNode），最后vue调用`patch`函数去比较新旧VNode的差异，从而细粒度的渲染更新视图。

基本的模板编译和渲染历程我们了解了，下面我们就正式分析一下vue是如何编译模板的。

## 具体流程

在`src/compiler/index.js`文件中

```js
import { parse } from './parser/index'
import { optimize } from './optimizer'
import { generate } from './codegen/index'
import { createCompilerCreator } from './create-compiler'

export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  // parse 用于解析模板为抽象语法树
  const ast = parse(template.trim(), options)

  if (options.optimize !== false) {
    // optimize用于优化静态节点，为静态节点打上static标记
    optimize(ast, options)
  }
  // generate 用于生成render函数
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})
```

该函数的执行过程表示了vue模板编译的过程，大致分为三个部分：

* 解析模板：调用`parse`函数将模板解析为抽象语法树(ast)

* 优化标记：遍历ast，将其中的静态节点打上标记，优化虚拟DOM的比较效率

* 生成函数：将优化后的ast生成渲染函数

后续，我们就重点介绍下这三个部分的源码。
