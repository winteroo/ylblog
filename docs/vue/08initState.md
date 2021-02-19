---
title: 初始化阶段（initState）
date: 2020-10-29
tags:
 - Vue
categories:
 - 前端
---

## 前言

本节内容我们介绍`initState`函数，我们平时使用频繁的props、data、methods、computed、watch都是在这个函数中
初始化的。

## initState函数

首先我们先来分析`initState`函数，该函数的定义位于源码的`src/core/instance/state.js`中，如下：

```js
export function initState (vm) {
  vm._watchers = []
  const opts = vm.$options
  if (opts.props) initProps(vm, opts.props)
  if (opts.methods) initMethods(vm, opts.methods)
  if (opts.data) {
    initData(vm)
  } else {
    observe(vm._data = {}, true /* asRootData */)
  }
  if (opts.computed) initComputed(vm, opts.computed)
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch)
  }
}
```

`initState`函数的定义比较简单，其实就是对props、methods、data、computed、watch选项进行的初始化过程，下面我们一个一个分析

### 1.initProps函数

```js
function initProps (vm, propsOptions) {

  const propsData = vm.$options.propsData || {}
  const props = vm._props = {}
  const keys = vm.$options._propKeys = []
  const isRoot = !vm.$parent

  if (!isRoot) {
    toggleObserving(false)
  }

  for (const key in propsOptions) {
    keys.push(key)
    const value = validateProp(key, propsOptions, propsData, vm)

    defineReactive(props, key, value)

    if (!(key in vm)) {
      proxy(vm, `_props`, key)
    }
  }

  toggleObserving(true)
}
```

在函数内部首先定义了4个变量，分别是：

```js
const propsData = vm.$options.propsData || {}
const props = vm._props = {}
const keys = vm.$options._propKeys = []
const isRoot = !vm.$parent
```

* `propsData`:父组件传入的真实`props`数据。
* `props`:指向`vm._props`的指针，所有设置到`props`变量中的属性都会保存到`vm._props`中。
* `keys`:指向`vm.$options._propKeys`的指针，缓存`props`对象中的`key`，将来更新`props`时只需遍历`vm.$options._propKeys`数组即可得到所有`props`的`key`。
* `isRoot`:当前组件是否为根组件。

接着，判断当前组件是否为根组件，如果不是，那么不需要将props数组转换为响应式的，`toggleObserving(false)`用来控制是否将数据转换成响应式。如下：

```js
if (!isRoot) {
    toggleObserving(false)
}
```

接着，遍历`props`选项拿到每一对键值，先将键名添加到`keys`中，
然后调用`validateProp`函数校验父组件传入的`props`数据类型是否匹配并获取到传入的值`value`，
然后将键和值通过`defineReactive`函数添加到`props`（即`vm._props`）中，如下：

```js
for (const key in propsOptions) {
  keys.push(key)
  const value = validateProp(key, propsOptions, propsData, vm)

  defineReactive(props, key, value)
}
```

添加完之后再判断这个`key`在当前实例vm中是否存在，如果不存在，
则调用`proxy`函数在vm上设置一个以`key`为属性的代码，
当使用`vm[key]`访问数据时，其实访问的是`vm._props[key]`。如下：

```js
if (!(key in vm)) {
    proxy(vm, `_props`, key)
}
```

最后再恢复响应式的初始设置，以免影响后续操作

```js
toggleObserving(true)
```

### 2.initMethods函数

```js
function initMethods (vm, methods) {

  for (const key in methods) {
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm)
  }
}
```

方法初始化的函数非常简单，一句话总结就是将方法绑定在当前的vue实例上

### 3.initData函数

```js
function initData (vm: Component) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}
  if (!isPlainObject(data)) {
    data = {}
  }
  // proxy data on instance
  const keys = Object.keys(data)
  let i = keys.length
  while (i--) {
    const key = keys[i]
    proxy(vm, `_data`, key)
  }
  observe(data, true /* asRootData */)
}
```

该函数过程也比较简单，
首先获取data中的数据，如果是函数，则执行函数将返回值作为数据源，如果不是函数则将原数据直接赋值给`vm._data`,
之后遍历data上的key值，调用`proxy`函数将其代理到实例上，即我们在使用`this.key`时，其实是获取的`this._data.key`，这也是我们为什么可以直接采用`this.key`去调用data中的数据的原因。
最后调用`observe`函数将数据转换为响应式数据，具体如何转换的我们留在数据变化监测一节中具体讲解。

### 4.initComputed函数

```js
const computedWatcherOptions = { lazy: true }

function initComputed (vm, computed) {
  const watchers = vm._computedWatchers = Object.create(null)

  const isSSR = isServerRendering()

  for (const key in computed) {
    const userDef = computed[key]
    const getter = typeof userDef === 'function' ? userDef : userDef.get

    if (!isSSR) {
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      )
    }

    if (!(key in vm)) {
      defineComputed(vm, key, userDef)
    }
  }
}
```

函数过程如下：

* 首先初始化计算属性watcher存放数组，
* 之后循环每个计算属性，获取计算属性的getter函数

```js
const getter = typeof userDef === 'function' ? userDef : userDef.get
```

* 接着在非服务端渲染的环境下，初始化计算属性的watcher，注意这里给watcher传入的配置项`computedWatcherOptions`的`lazy`属性为`true`，这也是计算属性缓存数据的标志。
* 最后调动`defineComputed`函数项实例上设置每个计算属性。

`defineComputed`函数源码如下：

```js
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}
export function defineComputed (
  target,
  key,
  userDef
) {
  const shouldCache = !isServerRendering()

  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef)
    sharedPropertyDefinition.set = noop
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop
    sharedPropertyDefinition.set = userDef.set || noop
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```

该函数接收三个参数，分别是

* `target`：当前实例
* `key`: 计算属性的key值
* `userDef`: 计算属性设置的value值

其作用是为`target`上定义一个属性`key`，并且属性`key`的`getter`和`setter`根据`userDef`的值来设置。

这里在获取getter时，并不是直接获取用户设置的getter函数，而是经过了vue的一层处理，下面看一下函数源码：

```js
function createComputedGetter (key) {
  return function computedGetter () {
    const watcher = this._computedWatchers && this._computedWatchers[key]
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}
```

该函数是一个高阶函数，返回一个getter函数，所以其实是将`computedGetter`函数赋给了`sharedPropertyDefinition.get`。
当获取计算属性的值时会执行属性的getter，而属性的getter就是 `sharedPropertyDefinition.get`，也就是说最终执行的 `computedGetter`函数。

在`computedGetter`函数内部，首先存储在当前实例上`_computedWatchers`属性中key所对应的watcher实例，
如果watcher存在，则会判断当前watcher的dirty属性，该属性标志当前watcher是否是旧数据，如果数据已经更新，那么就需要
调用`watcher.evaluate()`去通知更新，再返回更新后的watcher的value值，如果数据未更新，那么直接返回当前watcher的value值。
这也是为什么计算属性具有缓存效果的原因，至于这个dirty属性是在什么时机变化的，我们也留在数据监测一节讲解。

### 5.initWatch函数

在分析该函数前，我们来看下watch的基本用法：

```js
var vm = new Vue({
  data: {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: {
      f: {
        g: 5
      }
    }
  },
  watch: {
    a: function (val, oldVal) {
      console.log('new: %s, old: %s', val, oldVal)
    },
    // methods选项中的方法名
    b: 'someMethod',
    // 深度侦听，该回调会在任何被侦听的对象的 property 改变时被调用，不论其被嵌套多深
    c: {
      handler: function (val, oldVal) { /* ... */ },
      deep: true
    },
    // 该回调将会在侦听开始之后被立即调用
    d: {
      handler: 'someMethod',
      immediate: true
    },
    // 调用多个回调
    e: [
      'handle1',
      function handle2 (val, oldVal) { /* ... */ },
      {
        handler: function handle3 (val, oldVal) { /* ... */ },
      }
    ],
    // 侦听表达式
    'e.f': function (val, oldVal) { /* ... */ }
  }
})
vm.a = 2 // => new: 2, old: 1
```

可以看到，watch选项的用法非常灵活。首先watch选项是一个对象，键是需要观察的表达式，值是对应回调函数。
值也可以是方法名，或者包含选项的对象。
既然给用户提供的用法灵活，那么在代码中就需要按条件来判断，根据不同的用法做相应的处理。

```js
function initWatch (vm, watch) {
  for (const key in watch) {
    const handler = watch[key]
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      createWatcher(vm, key, handler)
    }
  }
}
```

该函数执行过程如下：

* 遍历watch选项中的各个值，通过值获取对应的value值

* 判断当前的值是否是数组，如果是数组则为每一个value值创造监听，如果不是数组，则直接创建监听。这里我们知道，watch的写法是支持为一个值设置多个监听函数的，即用数组形式来表示。

下面分析下`createWatcher`函数

```js
function createWatcher (
  vm: Component,
  expOrFn: string | Function,
  handler: any,
  options?: Object
) {
  if (isPlainObject(handler)) {
    options = handler
    handler = handler.handler
  }
  if (typeof handler === 'string') {
    handler = vm[handler]
  }
  return vm.$watch(expOrFn, handler, options)
}
```

该函数主要是根据当前的value值来判断数据变化的处理函数，
如果`handler`是对象形式，那么说明处理函数是`{handler: function() {}}`的形式，则取其handler的值。
如果`handler`是字符串，那么说明处理函数是以该字符串为key值的处理方法，则从实例上去取。

最后都会返回`vm.$watch(expOrFn, handler, options)`

下面看下`$watch`的定义，在`src/core/instance/state.js`中

```js
Vue.prototype.$watch = function (
  expOrFn: string | Function,
  cb: any,
  options?: Object
): Function {
  const vm: Component = this
  if (isPlainObject(cb)) {
    return createWatcher(vm, expOrFn, cb, options)
  }
  options = options || {}
  options.user = true
  const watcher = new Watcher(vm, expOrFn, cb, options)
  if (options.immediate) {
    try {
      cb.call(vm, watcher.value)
    } catch (error) {
      handleError(error, vm, `callback for immediate watcher "${watcher.expression}"`)
    }
  }
  return function unwatchFn () {
    watcher.teardown()
  }
}
```

该函数是定义在全局下的方法，该函数接收三个参数，如下：

* `expOrFn`：表示需要监听的对象或是返回一个对象的方法，
* `cb`：表示监听方法
* `options`：表示监听的配置参数

首先，会判断`cb`是否为对象，如果为对象则表示监听方法是以对象的方式存在的，则需要重新走`createWatcher`的逻辑。接着会根据配置项初始化
普通的数据监听watcher，然后会根据用户的配置项中的`immediate`选项，执行是否立即调用监听方法的逻辑。最后该方法返回一个取消监听的方法。
可以调用该监听方法取消数据监听功能。

::: tip
有一点这里注意一下，就是watch在编写时，是可以如下书写的：

```js
watch:{
 // 侦听表达式
  'e.f': function (val, oldVal) { /* ... */ }
}
```

那么，vue是如何实现监听这样的表达式的呢？

答案在Watcher的内部。

```js
class Watcher {
  ...

  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    ...
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
    }
    ...
  }
```

在watcher的构造函数中，会通过函数`parsePath`解析参数`expOrFn`，`parsePath`定义如下：

```js
const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`)
export function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return
      obj = obj[segments[i]]
    }
    return obj
  }
}
```

在解析时，vue会根据路径中是否存在`.`来判断是否是表达式，然后如果是表达式，则去获取表达式最终表示的值，从而返回该值进行监听。

:::

## 总结

本节我们介绍了vue生命周期初始化阶段的`initState`函数的执行过程，了解了各个初始化函数的内部实现细节。
