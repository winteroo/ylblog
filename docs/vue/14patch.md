---
title: patch函数
date: 2020-11-16
tags:
 - Vue
categories:
 - 前端
---

## 前言

上一篇文章介绍了VNode的概念，数据变化前后生成表示当前真是DOM节点的VNode对象，通过对比前后两份VNode的差异，从而最小代价更新DOM，那么如何找到前后两份VNode的差异之处就变得尤为重要，Vue之中，比较两份VNode差异的函数被叫做patch函数，下面详细介绍一下

## patch

在Vue中，把 DOM-Diff过程叫做patch过程。patch,意为“补丁”，即指修补当前的DOM，打补丁从而得到新的DOM。其本质都是把对比新旧两份VNode的过程。我们在下面研究patch过程的时候，一定把握住这样一个思想：所谓旧的VNode(即oldVNode)就是数据变化之前视图所对应的虚拟DOM节点，而新的VNode是数据变化之后将要渲染的新的视图所对应的虚拟DOM节点，所以我们要以生成的新的VNode为基准，对比旧的oldVNode，如果新的VNode上有的节点而旧的oldVNode上没有，那么就在旧的DOM上加上去；如果新的VNode上没有的节点而旧的oldVNode上有，那么就在当前DOM上去掉；如果某些节点在新的VNode和旧的oldVNode上都有，那么就对比当前各自节点的差异性，以新的VNode为准，更新当前DOM元素。总结下来主要有三个过程：

* **创建节点：新的VNode中有而旧的oldVNode中没有，就在当前DOM中创建。**
* **删除节点：新的VNode中没有而旧的oldVNode中有，就从当前DOM中删除。**
* **更新节点：新的VNode和旧的oldVNode中都有，就以新的VNode为准，更新当前DOM。**

### 创建节点

在`/src/core/vdom/patch.js`中，可以发现创建节点的源代码：

```js
function createElm (vnode, parentElm, refElm) {
  const data = vnode.data
  const children = vnode.children
  const tag = vnode.tag
  if (isDef(tag)) {
      vnode.elm = nodeOps.createElement(tag, vnode)   // 创建元素节点
      createChildren(vnode, children, insertedVnodeQueue) // 创建元素节点的子节点
      insert(parentElm, vnode.elm, refElm)       // 插入到DOM中
  } else if (isTrue(vnode.isComment)) {
    vnode.elm = nodeOps.createComment(vnode.text)  // 创建注释节点
    insert(parentElm, vnode.elm, refElm)           // 插入到DOM中
  } else {
    vnode.elm = nodeOps.createTextNode(vnode.text)  // 创建文本节点
    insert(parentElm, vnode.elm, refElm)           // 插入到DOM中
  }
}
```

从上面代码中，我们可以看出：

* 判断是否为元素节点只需判断该VNode节点是否有tag标签即可。如果有tag属性即认为是元素节点，则调用createElement方法创建元素节点，通常元素节点还会有子节点，那就递归遍历创建所有子节点，将所有子节点创建好之后insert插入到当前元素节点里面，最后把当前元素节点插入到DOM中。
* 判断是否为注释节点，只需判断VNode的isComment属性是否为true即可，若为true则为注释节点，则调用createComment方法创建注释节点，再插入到DOM中。
* 如果既不是元素节点，也不是注释节点，那就认为是文本节点，则调用createTextNode方法创建文本节点，再插入到DOM中。

### 删除节点

如果某些节点再新的VNode中没有而在旧的oldVNode中有，那么就需要把这些节点从当前DOM中删除。删除节点非常简单，只需在要删除节点的父元素上调用removeChild方法即可。源码如下：

```js
function removeNode (el) {
  const parent = nodeOps.parentNode(el)  // 获取父节点
  if (isDef(parent)) {
    nodeOps.removeChild(parent, el)  // 调用父节点的removeChild方法
  }
}
```

### 更新节点

更新节点的代码过程相对复杂一点，源码如下:

```js
// 更新节点
function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
  // vnode与oldVnode是否完全一样？若是，退出程序
  if (oldVnode === vnode) {
    return
  }
  const elm = vnode.elm = oldVnode.elm

  // vnode与oldVnode是否都是静态节点？若是，退出程序
  if (isTrue(vnode.isStatic) &&
    isTrue(oldVnode.isStatic) &&
    vnode.key === oldVnode.key &&
    (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
  ) {
    return
  }

  const oldCh = oldVnode.children
  const ch = vnode.children
  // vnode有text属性？若没有：
  if (isUndef(vnode.text)) {
    // vnode的子节点与oldVnode的子节点是否都存在？
    if (isDef(oldCh) && isDef(ch)) {
      // 若都存在，判断子节点是否相同，不同则更新子节点
      if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
    }
    // 若只有vnode的子节点存在
    else if (isDef(ch)) {
      /**
       * 判断oldVnode是否有文本？
       * 若没有，则把vnode的子节点添加到真实DOM中
       * 若有，则清空Dom中的文本，再把vnode的子节点添加到真实DOM中
       */
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
    }
    // 若只有oldnode的子节点存在
    else if (isDef(oldCh)) {
      // 清空DOM中的子节点
      removeVnodes(elm, oldCh, 0, oldCh.length - 1)
    }
    // 若vnode和oldnode都没有子节点，但是oldnode中有文本
    else if (isDef(oldVnode.text)) {
      // 清空oldnode文本
      nodeOps.setTextContent(elm, '')
    }
    // 上面两个判断一句话概括就是，如果vnode中既没有text，也没有子节点，那么对应的oldnode中有什么就清空什么
  }
  // 若有，vnode的text属性与oldVnode的text属性是否相同？
  else if (oldVnode.text !== vnode.text) {
    // 若不相同：则用vnode的text替换真实DOM的文本
    nodeOps.setTextContent(elm, vnode.text)
  }
}
```

* 如果VNode和oldVNode均为静态节点
  
  * 因为静态节点无论数据发生任何变化都与它无关，所以都为静态节点的话则直接跳过，无需处理。

* 如果VNode是文本节点

  * 如果VNode是文本节点即表示这个节点内只包含纯文本，那么只需看oldVNode是否也是文本节点，如果是，那就比较两个文本是否不同，如果不同则把oldVNode里的文本改成跟VNode的文本一样。如果oldVNode不是文本节点，那么不论它是什么，直接调用setTextNode方法把它改成文本节点，并且文本内容跟VNode相同。

* 如果VNode是元素节点

  * 该节点包含子节点

    * 如果新的节点内包含了子节点，那么此时要看旧的节点是否包含子节点，如果旧的节点里也包含了子节点，那就需要递归对比更新子节点；如果旧的节点里不包含子节点，那么这个旧节点有可能是空节点或者是文本节点，如果旧的节点是空节点就把新的节点里的子节点创建一份然后插入到旧的节点里面，如果旧的节点是文本节点，则把文本清空，然后把新的节点里的子节点创建一份然后插入到旧的节点里面。

  * 该节点不包含子节点

    * 如果该节点不包含子节点，同时它又不是文本节点，那就说明该节点是个空节点，那就好办了，不管旧节点之前里面都有啥，直接清空即可。

下面利用流程图说明一下：

![patch](~@Vue/images/patch.png)

## 总结

整个patch函数的流程到这里就结束了，我们大体分析了vue对于几种不同情况下的虚拟DOM更新的处理方法，其实这就是vue中的DOM-DIFF算法的精髓所在。
