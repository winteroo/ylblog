---
title: 初始化阶段（initRender）
date: 2020-10-29
tags:
 - Vue
categories:
 - 前端
---

## 前言

本节我们介绍`initRender`这个函数。

## initRender函数

`initRender`函数比较简单，代码如下

```js
export function initRender (vm: Component) {
  vm._vnode = null // the root of the child tree
  vm._staticTrees = null // v-once cached trees
  const options = vm.$options
  const parentVnode = vm.$vnode = options._parentVnode // the placeholder node in parent tree
  const renderContext = parentVnode && parentVnode.context

  vm.$slots = resolveSlots(options._renderChildren, renderContext)
  vm.$scopedSlots = emptyObject

  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false)

  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true)

  const parentData = parentVnode && parentVnode.data

  defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true)
  defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true)
}
```

可以发现`initRender`函数注意啊是做了三件事

* 1.初始化slots

* 2.向实例注册生成vnode的函数$createElement

* 3.项实例上注册`$attrs`、`$listeners`对象，不过其中的数据是不可修改且不是响应式的。即对象的子孙数据是
不具备响应式效果的。
