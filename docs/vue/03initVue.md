---
title: 初始化阶段（new Vue）
date: 2020-10-28
tags:
 - Vue
categories:
 - 前端
---

## 前言

一个Vue项目初始化时都会去`new Vue({})`这样做，那么到底`Vue`是个怎样的东西，内部又是怎么实现的呢？

## new Vue()

在`src/core/instance/index.js`文件中，我们只可以找到Vue的构造函数

```js
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```

不难发现，其实`new  Vue()`的过程就是执行`this._init(options)`的过程；

继续在`src/core/instance/init.js`文件中，我们可以发现`_init`的定义（精简掉了部分判断，只保留核心功能）；

```js
export function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    const vm = this

    vm.$options = mergeOptions(
      resolveConstructorOptions(vm.constructor),
      options || {},
      vm
    )

    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
}
```

`initMixin`函数的功能就是在Vue的原型上定义`_init`函数

该函数的过程大致可以分为三步

* 1.合并options对象（5-9行）

```js
vm.$options = mergeOptions(
  resolveConstructorOptions(vm.constructor),
  options || {},
  vm
)
```

* 2.一系列的初始化过程（12-19行），同时在合适的时机调用生命周期方法，我们可以看到目前只有`beforeCreate`和`created`方法，说明
现在还处在挂载阶段之前，页面上还没有显示出我们想看到的dom元素。

```js
initLifecycle(vm)
initEvents(vm)
initRender(vm)
callHook(vm, 'beforeCreate')
initInjections(vm) // resolve injections before data/props
initState(vm)
initProvide(vm) // resolve provide after data/props
callHook(vm, 'created')
```

* 3.如果存在el元素，则实行挂载（21-23行），如果我们提供了挂载节点，那么vue会自动帮我们挂载，如果没有提供，则需要我们手动调用
`$mount`方法实行挂载操作。

```js
if (vm.$options.el) {
  vm.$mount(vm.$options.el)
}
```

## 合并属性

```js
vm.$options = mergeOptions(
  resolveConstructorOptions(vm.constructor),
  options || {},
  vm
)
```

这里的`resolveConstructorOptions(vm.constructor)`的内部逻辑我们暂时先不关注，可以理解为这个函数返回的就是`vm.constructor.options`，相当于
`Vue.options`，那么`Vue.options`又是个什么东西呢，其实在函数`initGlobalAPI(Vue)`中我们可以找到该定义，在文件`src/core/global-api/index.js`中，

```js
export function initGlobalAPI (Vue: GlobalAPI) {
  // ...
  Vue.options = Object.create(null)

  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue

  extend(Vue.options.components, builtInComponents)
  // ...
}
```

可以发现，`Vue.options`被初始化为一个空函数，随后在其上扩展了`ASSET_TYPES`数组中的属性，

```js
export const ASSET_TYPES = [
  'component',
  'directive',
  'filter'
]
```

相当于得到

```js
Vue.options = {
  components: {},
  directives: {},
  filters: {}
}
```

最后执行

```js
extend(Vue.options.components, builtInComponents)
```

此句的意思就是在`Vue.options.components`上扩展`builtInComponents`组件，追踪`builtInComponents`可以发现是`keep-alive`内置组件，
查看打印出的options结果，如下

![options](~@Vue/images/options.png)

可以发现在其上扩展了三个内置组件，其实在`src/platforms/web/runtime/index.js`中扩展了其他两个组件

```js
import platformComponents from './components/index'

extend(Vue.options.components, platformComponents)
```

`src/platforms/web/runtime/components/index.js`文件内容

```js
import Transition from './transition'
import TransitionGroup from './transition-group'

export default {
  Transition,
  TransitionGroup
}
```

所以最后我们得到了大概这样的opitons。

```js
Vue.options = {
  components: {},
  directives: {},
  filters: {}
}
```

接下来便是`mergeOptions()`这个函数，它的定义在`src/core/util/options.js`中

```js
export function mergeOptions (
  parent,
  child,
  vm
) {
  if (typeof child === 'function') {
    child = child.options
  }
  const extendsFrom = child.extends
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm)
  }
  if (child.mixins) {
    for (let i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm)
    }
  }
  const options = {}
  let key
  for (key in parent) {
    mergeField(key)
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key)
    }
  }
  function mergeField (key) {
    const strat = strats[key] || defaultStrat
    options[key] = strat(parent[key], child[key], vm, key)
  }
  return options
}
```

其实函数的主要作用就是将parent和child两个变量进行合并，首先将`extends`和`mixins`的数据进行合并，之后再去
根据不同的配置项分别合并，不同的项有不同的合并策略，具体这里都是什么策略就不展开细说了，不过有一点需要明确就是
生命周期合并之后会以数组的形式存在，这也是为什么我们可以在混入的代码和组件代码中同时包含同一生命周期函数的原因。

::: tip

根据前面说的合并生命周期的策略，我们来看一下生命周期函数的执行源代码，可以发现，在获取到生命周期对象后，
是需要循环执行生命周期函数的，这也验证了前面我们所说的生命周期函数合并为数组的结论。

```js
export function callHook (vm: Component, hook: string) {
  const handlers = vm.$options[hook]
  const info = `${hook} hook`
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info)
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook)
  }
}
```

:::

## 总结

本节我们主要是讲解了Vue的初始化函数，并详细介绍了合并对象的方法和策略，后续将进入Vue的一系列的初始化过程，包括
事件系统，响应式数据系统、透传变量等等，下节我们便一一揭晓；
