---
title: 初始化阶段（initLifecycle）
date: 2020-10-28
tags:
 - Vue
categories:
 - 前端
---

## 前言

此节我们主要是来分析第一个初始化过程`initLifecycle()`

## initLifecycle()函数

```js
export function initLifecycle (vm) {
  const options = vm.$options

  let parent = options.parent
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent
    }
    parent.$children.push(vm)
  }

  vm.$parent = parent
  vm.$root = parent ? parent.$root : vm

  vm.$children = []
  vm.$refs = {}

  vm._watcher = null
  vm._inactive = null
  vm._directInactive = false
  vm._isMounted = false
  vm._isDestroyed = false
  vm._isBeingDestroyed = false
}
```

其实此函数主要做的有两件事

* 1.为当前组件设置$parent和$children属性，并不断向上查找设置

* 2.为当前组件设置$root属性
