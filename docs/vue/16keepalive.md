---
title: keep-alive
date: 2020-11-18
tags:
 - Vue
categories:
 - 前端
---

## 前言

介绍原理之前，我们先根据官方文档来回顾一下`<keep-alive>`组件的具体用法，如下：

`<keep-alive>`组件可接收三个属性：

* include - 字符串或正则表达式。只有名称匹配的组件会被缓存。
* exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
* max - 数字。最多可以缓存多少组件实例。
include 和 exclude 属性允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示：

```HTML
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>

<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```

匹配时首先检查组件自身的 name 选项，如果 name 选项不可用，则匹配它的局部注册名称 (父组件 components 选项的键值)，也就是组件的标签值。匿名组件不能被匹配。

max表示最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，已缓存组件中最久没有被访问的实例会被销毁掉。

请读者注意此处加粗的地方，暂时有个印象，后面我们会详细说明。

```HTML
<keep-alive :max="10">
  <component :is="view"></component>
</keep-alive>
```

OK，以上就是`<keep-alive>`组件的用法，下面我们将着重介绍其内部实现原理。

## 实现原理

`<keep-alive>`组件的定义位于源码的 `src/core/components/keep-alive.js` 文件中，如下：

```JS
export default {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: [String, RegExp, Array],
    exclude: [String, RegExp, Array],
    max: [String, Number]
  },

  created () {
    this.cache = Object.create(null)
    this.keys = []
  },

  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys)
    }
  },

  mounted () {
    this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
    })
    this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
    })
  },

  render() {
    /*获取默认插槽中的第一个组件节点*/
    const slot = this.$slots.default
    const vnode = getFirstComponentChild(slot)
    /*获取该组件节点的componentOptions*/
    const componentOptions = vnode && vnode.componentOptions

    if (componentOptions) {
      /* 获取该组件节点的名称，优先获取组件的name字段，如果name不存在则获取组件的tag */
      const name = getComponentName(componentOptions)

      const { include, exclude } = this
      /* 如果name不在inlcude中或者存在于exlude中则表示不缓存，直接返回vnode */
      if (
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      const { cache, keys } = this
      const key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (##3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance
        // make current key freshest
        remove(keys, key)
        keys.push(key)
      } else {
        cache[key] = vnode
        keys.push(key)
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode)
        }
      }

      vnode.data.keepAlive = true
    }
    return vnode || (slot && slot[0])
  }
}
```

可以看到，该组件内没有常规的`<template></template>`标签，取而代之的是它内部多了一个叫做render的函数，所以它不是一个常规的模板组件，而是一个函数式组件。执行 `<keep-alive>` 组件渲染的时候，就会执行到这个 render 函数。了解了这个以后，接下来我们从上到下一步一步细细阅读。

## props

在props选项内接收传进来的三个属性：include、exclude和max。如下：

```js
props: {
  include: [String, RegExp, Array],
  exclude: [String, RegExp, Array],
  max: [String, Number]
}
```

`include` 表示只有匹配到的组件会被缓存，而 `exclude`表示任何匹配到的组件都不会被缓存， max表示缓存组件的数量，因为我们是缓存的 `vnode` 对象，它也会持有 DOM，当我们缓存的组件很多的时候，会比较占用内存，所以该配置允许我们指定缓存组件的数量。

## created

在 created 钩子函数里定义并初始化了两个属性： `this.cache` 和 `this.keys`。

```js
created () {
  this.cache = Object.create(null)
  this.keys = []
}
```

`this.cache`是一个对象，用来存储需要缓存的组件，它将以如下形式存储：

```js
this.cache = {
    'key1':'组件1',
    'key2':'组件2',
    // ...
}
```

this.keys是一个数组，用来存储每个需要缓存的组件的key，即对应this.cache对象中的键值。

## destroyed

当`<keep-alive>`组件被销毁时，此时会调用`destroyed`钩子函数，在该钩子函数里会遍历`this.cache`对象，然后将那些被缓存的并且当前没有处于被渲染状态的组件都销毁掉并将其从`this.cache`对象中剔除。如下：

```js
destroyed () {
    for (const key in this.cache) {
        pruneCacheEntry(this.cache, key, this.keys)
    }
}

// pruneCacheEntry函数
function pruneCacheEntry (cache,key,keys,current) {
  const cached = cache[key]
  /*判断当前没有处于被渲染状态的组件，将其销毁*/
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}
```

## mounted

在`mounted`钩子函数中观测 `include` 和 `exclude` 的变化，如下：

```js
mounted () {
  this.$watch('include', val => {
      pruneCache(this, name => matches(val, name))
  })
  this.$watch('exclude', val => {
      pruneCache(this, name => !matches(val, name))
  })
}
```

如果`include` 或`exclude` 发生了变化，即表示定义需要缓存的组件的规则或者不需要缓存的组件的规则发生了变化，那么就执行`pruneCache`函数，函数如下：

```js
function pruneCache (keepAliveInstance, filter) {
  const { cache, keys, _vnode } = keepAliveInstance
  for (const key in cache) {
    const cachedNode = cache[key]
    if (cachedNode) {
      const name = getComponentName(cachedNode.componentOptions)
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys,_vnode)
      }
    }
  }
}

function pruneCacheEntry (cache,key,keys,current) {
  const cached = cache[key]
  if (cached && (!current || cached.tag !== current.tag)) {
    cached.componentInstance.$destroy()
  }
  cache[key] = null
  remove(keys, key)
}
```

在该函数内对`this.cache`对象进行遍历，取出每一项的name值，用其与新的缓存规则进行匹配，如果匹配不上，则表示在新的缓存规则下该组件已经不需要被缓存，则调用pruneCacheEntry函数将这个已经不需要缓存的组件实例先销毁掉，然后再将其从`this.cache`对象中剔除。

## render

接下来就是重头戏render函数，也是本篇文章中的重中之重。以上工作都是一些辅助工作，真正实现缓存功能的就在这个render函数里，接下来我们逐行分析它。

在render函数中首先获取第一个子组件节点的 vnode：

```js
/*获取默认插槽中的第一个组件节点*/
const slot = this.$slots.default
const vnode = getFirstComponentChild(slot)
```

由于我们也是在 `<keep-alive>` 标签内部写 DOM，所以可以先获取到它的默认插槽，然后再获取到它的第一个子节点。`<keep-alive>` 只处理第一个子元素，所以一般和它搭配使用的有 `component` 动态组件或者是 `router-view`。

接下来获取该组件节点的名称：

```js
/*获取该组件节点的名称*/
const name = getComponentName(componentOptions)

/*优先获取组件的name字段，如果name不存在则获取组件的tag*/
function getComponentName (opts: ?VNodeComponentOptions): ?string {
  return opts && (opts.Ctor.options.name || opts.tag)
}
```

然后用组件名称跟 `include`、`exclude` 中的匹配规则去匹配：

```js
const { include, exclude } = this
/*如果name与include规则不匹配或者与exclude规则匹配则表示不缓存，直接返回vnode*/
if (
    (include && (!name || !matches(include, name))) ||
    // excluded
    (exclude && name && matches(exclude, name))
) {
    return vnode
}
```

如果组件名称与 `include` 规则不匹配或者与 `exclude` 规则匹配，则表示不缓存该组件，直接返回这个组件的 `vnode`，否则的话走下一步缓存：

```js
const { cache, keys } = this
/*获取组件的key*/
const key = vnode.key == null
? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
: vnode.key

/*如果命中缓存，则直接从缓存中拿 vnode 的组件实例*/
if (cache[key]) {
    vnode.componentInstance = cache[key].componentInstance
    /*调整该组件key的顺序，将其从原来的地方删掉并重新放在最后一个*/
    remove(keys, key)
    keys.push(key)
}
/*如果没有命中缓存，则将其设置进缓存*/
else {
    cache[key] = vnode
    keys.push(key)
    /*如果配置了max并且缓存的长度超过了this.max，则从缓存中删除第一个*/
    if (this.max && keys.length > parseInt(this.max)) {
        pruneCacheEntry(cache, keys[0], keys, this._vnode)
    }
}
/* 最后设置keepAlive标记位 */
vnode.data.keepAlive = true
```

首先获取组件的key值：

```js
const key = vnode.key == null?
componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
: vnode.key
```

拿到key值后去`this.cache`对象中去寻找是否有该值，如果有则表示该组件有缓存，即命中缓存：

```js
/*如果命中缓存，则直接从缓存中拿 vnode 的组件实例*/
if (cache[key]) {
    vnode.componentInstance = cache[key].componentInstance
    /*调整该组件key的顺序，将其从原来的地方删掉并重新放在最后一个*/
    remove(keys, key)
    keys.push(key)
}
```

直接从缓存中拿 `vnode`的组件实例，此时重新调整该组件key的顺序，将其从原来的地方删掉并重新放在this.keys中最后一个。

如果`this.cache`对象中没有该`key`值：

```js
/*如果没有命中缓存，则将其设置进缓存*/
else {
    cache[key] = vnode
    keys.push(key)
    /*如果配置了max并且缓存的长度超过了this.max，则从缓存中删除第一个*/
    if (this.max && keys.length > parseInt(this.max)) {
        pruneCacheEntry(cache, keys[0], keys, this._vnode)
    }
}
```

表明该组件还没有被缓存过，则以该组件的key为键，组件`vnode`为值，将其存入`this.cache`中，并且把`key`存入`this.keys`中。此时再判断`this.keys`中缓存组件的数量是否超过了设置的最大缓存数量值`this.max`，如果超过了，则把第一个缓存组件删掉。

那么问题来了：为什么要删除第一个缓存组件并且为什么命中缓存了还要调整组件key的顺序？

这其实应用了一个**缓存淘汰策略LRU**：

* LRU（Least recently used，最近最少使用）算法根据数据的历史访问记录来进行淘汰数据，其核心思想是“如果数据最近被访问过，那么将来被访问的几率也更高”。

它的算法是这样子的：

* 将新数据从尾部插入到this.keys中；
* 每当缓存命中（即缓存数据被访问），则将数据移到this.keys的尾部；
* 当this.keys满的时候，将头部的数据丢弃；

LRU的核心思想是如果数据最近被访问过，那么将来被访问的几率也更高，所以我们将命中缓存的组件key重新插入到this.keys的尾部，这样一来，this.keys中越往头部的数据即将来被访问几率越低，所以当缓存数量达到最大值时，我们就删除将来被访问几率最低的数据，即this.keys中第一个缓存的组件。这也就之前加粗强调的已缓存组件中最久没有被访问的实例会被销毁掉的原因所在。

OK，言归正传，以上工作做完后设置 `vnode.data.keepAlive = true` ，最后将vnode返回。

以上就是render函数的整个过程。

## 生命周期钩子

组件一旦被`<keep-alive>` 缓存，那么再次渲染的时候就不会执行 `created`、`mounted` 等钩子函数，但是我们很多业务场景都是希望在我们被缓存的组件再次被渲染的时候做一些事情，好在Vue 提供了 `activated`和`deactivated` 两个钩子函数，它的执行时机是`<keep-alive>` 包裹的组件激活时调用和停用时调用。
