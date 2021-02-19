---
title: 虚拟DOM（vnode）
date: 2020-11-16
tags:
 - Vue
categories:
 - 前端
---

## 前言

我们都知道浏览器中存在的DOM结构，我们可以利用js操作DOM元素，来打到我们想要的增删改查的目的，但是浏览器的DOM元素其实是非常复杂的，其上的属性非常多，这也使得DOM操作的开销是非常大的，为了避免不必要的开销，Vue引入了虚拟DOM，那么虚拟DOM到底是个什么东西呢，下面就来分析一下。

## 虚拟DOM

在源码`src/core/vdom/vnode.js`文件中，可以找到如下的虚拟DOM的定义：

```js
export default class VNode {
  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.ns = undefined
    this.context = context
    this.fnContext = undefined
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key
    this.componentOptions = componentOptions
    this.componentInstance = undefined
    this.parent = undefined
    this.raw = false
    this.isStatic = false
    this.isRootInsert = true
    this.isComment = false
    this.isCloned = false
    this.isOnce = false
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }

  // DEPRECATED: alias for componentInstance for backwards compat.
  /* istanbul ignore next */
  get child (): Component | void {
    return this.componentInstance
  }
}
```

从上面的代码中可以看出：VNode类中包含了描述一个真实DOM节点所需要的一系列属性，如tag表示节点的标签名，text表示节点中包含的文本，children表示该节点包含的子节点等。通过属性之间不同的搭配，就可以描述出各种类型的真实DOM节点

## VNode的作用

VNode的作用是相当大的。我们在视图渲染之前，把写好的template模板先编译成VNode并缓存下来，等到数据发生变化页面需要重新渲染的时候，我们把数据发生变化后生成的VNode与前一次缓存下来的VNode进行对比，找出差异，然后有差异的VNode对应的真实DOM节点就是需要重新渲染的节点，最后根据有差异的VNode创建出真实的DOM节点再插入到视图中，最终完成一次视图更新。

通过引入VNode，vue可以精准的找到需要更新的节点，从而最小代价操作DOM，DOM操作减少了，自然程序的性能就上升了
