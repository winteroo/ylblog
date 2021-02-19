---
title: 初始化阶段（initInjections）
date: 2020-10-29
tags:
 - Vue
categories:
 - 前端
---

## 前言

经历过前面介绍的

* initLifecycle：初始化父级组件以及根组件，并初始设置生命周期函数标志

* initEvents：初始化事件系统，初始化的是父组件在模板中使用v-on或@注册的监听子组件内触发的事件

* initRender：初始化渲染函数，为实例注入渲染函数，同时设置`$attrs`和`$listener`

之后vue便开始调用`beforeCreate`生命周期函数，此时只是做了一个实例创建之前的准备工作，此时我们的数据和
处理方法都还没有被创建，所以此时我们一般不会对数据做任何处理工作。

调用完`beforeCreate`生命周期函数后，边进入了组件实例的数据初始化阶段，此时会利用到我们传给vue的数据对象，
正式着手创建一个vue实例对象。

这篇文章主要介绍的是初始化函数`initInjections`函数

## provide和inject

因为本节涉及的vue选项是peovide和inject，这对选项在平时的开发中很少用到，但在高级的框架中会比较常用，
其实它们就是提供了一中祖先组件向其子孙组件注入数据的能力，无论组件的层级多深，都可以访问到；

在看源码之前，我们先来了解下这两个选项是怎么用：

`provide` 选项应该是一个对象或返回一个对象的函数。该对象包含可注入其子孙的属性。在该对象中你可以使用 ES2015 Symbols 作为 key，但是只在原生支持 Symbol 和 Reflect.ownKeys 的环境下可工作。

`inject` 选项应该是：

* 一个字符串数组，或
* 一个对象，对象的 key 是本地的绑定名，value 是：
  * 在可用的注入内容中搜索用的 key (字符串或 Symbol)，或
  * 一个对象，该对象的：
    * `from` 属性是在可用的注入内容中搜索用的 key (字符串或 Symbol)
    * `default` 属性是降级情况下使用的 value

具体代码示例请见[vue中provide/inject文档](https://cn.vuejs.org/v2/api/#provide-inject)

::: tip
`provide` 和 `inject` 选项绑定的数据不是响应式的。
:::

## initInjections函数

我们先来看一下具体的函数代码

```js
export function initInjections (vm) {
  const result = resolveInject(vm.$options.inject, vm)

  if (result) {
    toggleObserving(false)
    Object.keys(result).forEach(key => {
        defineReactive(vm, key, result[key])
    })
    toggleObserving(true)
  }
}

export let shouldObserve: boolean = true

export function toggleObserving (value: boolean) {
  shouldObserve = value
}
```

可以发现，该函数的逻辑并不复杂，首先是调用`resolveInject`函数将用户传入的inject选项处理一下返回一个标准result，
然后遍历reaslt的key值，添加到当前实例上，不过这里在添加之前会先调用`toggleObserving`函数，其实该函数就是
设置当前添加到实例上的数据是否是可响应的，这里先将可响应式变量设置为false，意思就是接下来设置的数据是不具备响应式
能力的，这也正呼应了官方网站上说的:

>`provide` 和 `inject` 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。

此时，我们还剩下获得result这个结果的`resolveInject`函数还没有分析，下面就让我们来分析一下：

```js
export function resolveInject (inject: any, vm: Component): ?Object {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    const result = Object.create(null)
    const keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      // #6574 in case the inject object is observed...
      if (key === '__ob__') continue
      const provideKey = inject[key].from
      let source = vm
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey]
          break
        }
        source = source.$parent
      }
      if (!source) {
        if ('default' in inject[key]) {
          const provideDefault = inject[key].default
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault
        } else if (process.env.NODE_ENV !== 'production') {
          warn(`Injection "${key}" not found`, vm)
        }
      }
    }
    return result
  }
}
```

函数的思路非常清晰，

* 1.判断是否存在inject，存在则获取inject内的key值并初始化一个空对象；

* 2.之后循环keys数组，在其中开启一个while循环，注意此时的source指向的是当前组件实例，我们知道组件实例中是
存储着父组件实例$parent的，通过不断向上级组件查找注入的provide对象，直到找到为止。

* 3.如果没有找到，且到达了根基组件的末端，那么证明没有找到注入的值，则查看是否存在默认值，如果存在则启用默认值，
如果不存在则抛出异常。

这里还需要说明一点：

```js
const provideKey = inject[key].from
```

在书写inject时，我们是可以有多种写法的，但是Vue取值时，都是按照这种方式去取值的，很显然，Vue肯定是将几种
inject的书写方式进行了规范化，其实`_init`函数合并options对象时，在`mergeOptions`函数中调用了`normalizeInject`函数：

```js
function normalizeInject (options, vm) {
  const inject = options.inject
  if (!inject) return
  const normalized = options.inject = {}
  if (Array.isArray(inject)) {
    for (let i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] }
    }
  } else if (isPlainObject(inject)) {
    for (const key in inject) {
      const val = inject[key]
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val }
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      `Invalid value for option "inject": expected an Array or an Object, ` +
      `but got ${toRawType(inject)}.`,
      vm
    )
  }
}
```

分析下来，我们就可以发现，其实最后vue的options中多有的inject写法都被规范化为了如下形式：

```js
const Child = {
  inject: {
    foo: {
      from: 'foo',
      default: 'xxx'  //如果有默认的值就有default属性
    },
    foo1: {
      from: 'foo1'
    }
  }
}
```

这也就很好理解为什么刚才的

```js
const provideKey = inject[key].from
```

是为何都需要`.from`去获取值了；

## initProvide函数

`inject`介绍完了，我们直接跨过`initState`函数，直接进入`initProvide`函数，应为这两个函数是相互呼应的；

::: tip
这里顺便说一下，为什么在`initInjections`与`initProvide`函数之间去初始化state数据。因为在data或是methods中很有
可能会用到注入的inject变量，所以数据初始化必须在注入inject变量之后，而注入的数据也很有可能是data中的数据，左右
provide数据需要在state初始化之后再调用。
:::

```js
export function initProvide (vm: Component) {
  const provide = vm.$options.provide
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide
  }
}
```

`initProvide`函数相当简单，就是将options中的provide数据注册处在实例的`_provided`属性上。

## 总结

本节我们介绍了provide/inject这对属性，分析了`initInjections`， `initProvide`这两个初始化函数，
同时也说明了为什么`initState`函数在这两个函数之间调用。
