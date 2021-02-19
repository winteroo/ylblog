---
title: 更新子节点
date: 2020-11-16
tags:
 - Vue
categories:
 - 前端
---

## 前言

前一篇文章我们分析了vue的DOM-DIFF的过程，其中创建和删除节点都比较简单，而更新子节点就相对的会比较复杂，vue为了提高子节点的更新效率，在子节点对比中也加入了一些优化策略，下面一起分析一下：

## 子节点更新策略

正常的子节点对比策略中，我们很容易想到的是循环新旧VNode子节点列表，逐个对比.
举个例子： 假如我们现有一份新的newChildren数组和旧的oldChildren数组，如下所示：

```js
newChildren = ['新子节点1','新子节点2','新子节点3','新子节点4']
oldChildren = ['旧子节点1','旧子节点2','旧子节点3','旧子节点4']
```

如果按照优化之前的解决方案，那么我们接下来的操作应该是这样的：先循环newChildren数组，拿到第一个新子节点1，然后用第一个新子节点1去跟oldChildren数组里的旧子节点逐一对比，如果运气好一点，刚好oldChildren数组里的第一个旧子节点1与第一个新子节点1相同，那就皆大欢喜，直接处理，不用再往下循环了。那如果运气坏一点，直到循环到oldChildren数组里的第四个旧子节点4才与第一个新子节点1相同，那此时就会多循环了4次。我们不妨把情况再设想的极端一点，如果newChildren数组和oldChildren数组里前三个节点都没有变化，只是第四个节点发生了变化，那么我们就会循环16次，只有在第16次循环的时候才发现新节点4与旧节点4相同，进行更新。在极端的对比条件下，我们的解决方案看起来就有点慢了，那么怎么解决这个问题呢，vue中提出了一种合理的解决方案：

* 先把newChildren数组里的所有未处理子节点的第一个子节点和oldChildren数组里所有未处理子节点的第一个子节点做比对，如果相同，那就直接进入更新节点的操作；

* 如果不同，再把newChildren数组里所有未处理子节点的最后一个子节点和oldChildren数组里所有未处理子节点的最后一个子节点做比对，如果相同，那就直接进入更新节点的操作；

* 如果不同，再把newChildren数组里所有未处理子节点的最后一个子节点和oldChildren数组里所有未处理子节点的第一个子节点做比对，如果相同，那就直接进入更新节点的操作，更新完后再将oldChildren数组里的该节点移动到与newChildren数组里节点相同的位置；

* 如果不同，再把newChildren数组里所有未处理子节点的第一个子节点和oldChildren数组里所有未处理子节点的最后一个子节点做比对，如果相同，那就直接进入更新节点的操作，更新完后再将oldChildren数组里的该节点移动到与newChildren数组里节点相同的位置；

* 最后四种情况都试完如果还不同，那就按照之前循环的方式来查找节点。

其过程如下所示：

![updatechildnode](~@Vue/images/updatechildnode.png)

```js
// 循环更新子节点
function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
  let oldStartIdx = 0               // oldChildren开始索引
  let oldEndIdx = oldCh.length - 1   // oldChildren结束索引
  let oldStartVnode = oldCh[0]        // oldChildren中所有未处理节点中的第一个
  let oldEndVnode = oldCh[oldEndIdx]   // oldChildren中所有未处理节点中的最后一个

  let newStartIdx = 0               // newChildren开始索引
  let newEndIdx = newCh.length - 1   // newChildren结束索引
  let newStartVnode = newCh[0]        // newChildren中所有未处理节点中的第一个
  let newEndVnode = newCh[newEndIdx]  // newChildren中所有未处理节点中的最后一个

  let oldKeyToIdx, idxInOld, vnodeToMove, refElm

  // removeOnly is a special flag used only by <transition-group>
  // to ensure removed elements stay in correct relative positions
  // during leaving transitions
  const canMove = !removeOnly

  // 以"新前"、"新后"、"旧前"、"旧后"的方式开始比对节点
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (isUndef(oldStartVnode)) {
      // 如果oldStartVnode不存在，则直接跳过，比对下一个
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (isUndef(oldEndVnode)) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (sameVnode(oldStartVnode, newStartVnode)) {
      // 如果新前与旧前节点相同，就把两个节点进行patch更新
      patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (sameVnode(oldEndVnode, newEndVnode)) {
      // 如果新后与旧后节点相同，就把两个节点进行patch更新
      patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
      // 如果新后与旧前节点相同，先把两个节点进行patch更新，然后把旧前节点移动到oldChilren中所有未处理节点之后
      patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
      canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
      // 如果新前与旧后节点相同，先把两个节点进行patch更新，然后把旧后节点移动到oldChilren中所有未处理节点之前
      patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
      canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      // 如果不属于以上四种情况，就进行常规的循环比对patch
      if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
      idxInOld = isDef(newStartVnode.key)
        ? oldKeyToIdx[newStartVnode.key]
        : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
      // 如果在oldChildren里找不到当前循环的newChildren里的子节点
      if (isUndef(idxInOld)) { // New element
        // 新增节点并插入到合适位置
        createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
      } else {
        // 如果在oldChildren里找到了当前循环的newChildren里的子节点
        vnodeToMove = oldCh[idxInOld]
        // 如果两个节点相同
        if (sameVnode(vnodeToMove, newStartVnode)) {
          // 调用patchVnode更新节点
          patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue)
          oldCh[idxInOld] = undefined
          // canmove表示是否需要移动节点，如果为true表示需要移动，则移动节点，如果为false则不用移动
          canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
        } else {
          // same key but different element. treat as new element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        }
      }
      newStartVnode = newCh[++newStartIdx]
    }
  }
  if (oldStartIdx > oldEndIdx) {
    /**
     * 如果oldChildren比newChildren先循环完毕，
     * 那么newChildren里面剩余的节点都是需要新增的节点，
     * 把[newStartIdx, newEndIdx]之间的所有节点都插入到DOM中
     */
    refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
    addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
  } else if (newStartIdx > newEndIdx) {
    /**
     * 如果newChildren比oldChildren先循环完毕，
     * 那么oldChildren里面剩余的节点都是需要删除的节点，
     * 把[oldStartIdx, oldEndIdx]之间的所有节点都删除
     */
    removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
  }
}
```

在我们前面所说的优化策略中，节点有可能是从前面对比，也有可能是从后面对比，对比成功就会进行更新处理，也就是说我们有可能处理第一个，也有可能处理最后一个，那么我们在循环的时候就不能简单从前往后或从后往前循环，而是要从两边向中间循环。

那么该如何从两边向中间循环呢？请看下图：

![updatechildnode](~@Vue/images/updatechildnode2.png)

首先，我们先准备4个变量：

* newStartIdx:newChildren数组里开始位置的下标；
* newEndIdx:newChildren数组里结束位置的下标；
* oldStartIdx:oldChildren数组里开始位置的下标；
* oldEndIdx:oldChildren数组里结束位置的下标；

在循环的时候，每处理一个节点，就将下标向图中箭头所指的方向移动一个位置，开始位置所表示的节点被处理后，就向后移动一个位置；结束位置所表示的节点被处理后，就向前移动一个位置；由于我们的优化策略都是新旧节点两两更新的，所以一次更新将会移动两个节点。说的再直白一点就是：newStartIdx和oldStartIdx只能往后移动（只会加），newEndIdx和oldEndIdx只能往前移动（只会减）。

当开始位置大于结束位置时，表示所有节点都已经遍历过了。

OK，有了这个概念后，我们开始读源码：

1.如果oldStartVnode不存在，则直接跳过，将oldStartIdx加1，比对下一个

```js
// 以"新前"、"新后"、"旧前"、"旧后"的方式开始比对节点
while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
 if (isUndef(oldStartVnode)) {
    oldStartVnode = oldCh[++oldStartIdx]
  }
}
```

2.如果oldEndVnode不存在，则直接跳过，将oldEndIdx减1，比对前一个

```js
else if (isUndef(oldEndVnode)) {
  oldEndVnode = oldCh[--oldEndIdx]
}
```

3.如果新前与旧前节点相同，就把两个节点进行patch更新，同时oldStartIdx和newStartIdx都加1，后移一个位置

```js
else if (sameVnode(oldStartVnode, newStartVnode)) {
  patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue)
  oldStartVnode = oldCh[++oldStartIdx]
  newStartVnode = newCh[++newStartIdx]
}
```

4.如果新后与旧后节点相同，就把两个节点进行patch更新，同时oldEndIdx和newEndIdx都减1，前移一个位置

```js
else if (sameVnode(oldEndVnode, newEndVnode)) {
  patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue)
  oldEndVnode = oldCh[--oldEndIdx]
  newEndVnode = newCh[--newEndIdx]
}
```

5.如果新后与旧前节点相同，先把两个节点进行patch更新，然后把旧前节点移动到oldChilren中所有未处理节点之后，最后把oldStartIdx加1，后移一个位置，newEndIdx减1，前移一个位置

```js
else if (sameVnode(oldStartVnode, newEndVnode)) {
  patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue)
  canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
  oldStartVnode = oldCh[++oldStartIdx]
  newEndVnode = newCh[--newEndIdx]
}
```

6.如果新前与旧后节点相同，先把两个节点进行patch更新，然后把旧后节点移动到oldChilren中所有未处理节点之前，最后把newStartIdx加1，后移一个位置，oldEndIdx减1，前移一个位置

```js
else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
  patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue)
  canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
  oldEndVnode = oldCh[--oldEndIdx]
  newStartVnode = newCh[++newStartIdx]
}
```

7.如果不属于以上四种情况，就进行常规的循环比对patch

8.如果在循环中，oldStartIdx大于oldEndIdx了，那就表示oldChildren比newChildren先循环完毕，那么newChildren里面剩余的节点都是需要新增的节点，把[newStartIdx, newEndIdx]之间的所有节点都插入到DOM中

```js
if (oldStartIdx > oldEndIdx) {
  refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
  addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
}
```

9.如果在循环中，newStartIdx大于newEndIdx了，那就表示newChildren比oldChildren先循环完毕，那么oldChildren里面剩余的节点都是需要删除的节点，把[oldStartIdx, oldEndIdx]之间的所有节点都删除

```js
else if (newStartIdx > newEndIdx) {
  removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
}
```

## 总结

本文我们着重对vue中子节点的更新策略进行了剖析，知道了vue中对于极端情况的优化。我相信，阅读完这这篇文章，你应该对vue的dom-difff过程有了一个比较清晰的认识。
