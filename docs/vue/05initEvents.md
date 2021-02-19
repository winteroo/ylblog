---
title: 初始化阶段（initEvents）
date: 2020-10-29
tags:
 - Vue
categories:
 - 前端
---

## 前言

::: tip
本文转载 [vue源码系列](https://vue-js.com/learn-vue/lifecycle/initEvents.html)
:::

本篇文章介绍生命周期初始化阶段所调用的第二个初始化函数——initEvents。
从函数名字上来看，这个初始化函数是初始化实例的事件系统。
我们知道，在Vue中，当我们在父组件中使用子组件时可以给子组件上注册一些事件，
这些事件即包括使用v-on或@注册的自定义事件，也包括注册的浏览器原生事件（需要加 .native 修饰符），如下：

```html
<child @select="selectHandler"  @click.native="clickHandler"></child>
```

不管是什么事件，当子组件（即实例）在初始化的时候都需要进行一定的初始化，
那么本篇文章就来看看实例上的事件都是如何进行初始化的

## 解析事件

我们先从解析事件开始说起，回顾之前的模板编译解析中，当遇到开始标签的时候，除了会解析开始标签，还会调用processAttrs 方法解析标签中的属性，processAttrs 方法位于源码的 src/compiler/parser/index.js中， 如下：

```js
export const onRE = /^@|^v-on:/
export const dirRE = /^v-|^@|^:/

function processAttrs (el) {
  const list = el.attrsList
  let i, l, name, value, modifiers
  for (i = 0, l = list.length; i < l; i++) {
    name  = list[i].name
    value = list[i].value
    if (dirRE.test(name)) {
      // 解析修饰符
      modifiers = parseModifiers(name)
      if (modifiers) {
        name = name.replace(modifierRE, '')
      }
      if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '')
        addHandler(el, name, value, modifiers, false, warn)
      }
    }
  }
}
```

从上述代码中可以看到，在对标签属性进行解析时，判断如果属性是指令，首先通过 `parseModifiers` 解析出属性的修饰符，
然后判断如果是事件的指令，则执行 `addHandler(el, name, value, modifiers, false, warn)` 方法，
 该方法定义在 `src/compiler/helpers.js` 中，如下：

```js
export function addHandler (el,name,value,modifiers) {
  modifiers = modifiers || emptyObject

  // check capture modifier 判断是否有capture修饰符
  if (modifiers.capture) {
    delete modifiers.capture
    name = '!' + name // 给事件名前加'!'用以标记capture修饰符
  }
  // 判断是否有once修饰符
  if (modifiers.once) {
    delete modifiers.once
    name = '~' + name // 给事件名前加'~'用以标记once修饰符
  }
  // 判断是否有passive修饰符
  if (modifiers.passive) {
    delete modifiers.passive
    name = '&' + name // 给事件名前加'&'用以标记passive修饰符
  }

  let events
  if (modifiers.native) {
    delete modifiers.native
    events = el.nativeEvents || (el.nativeEvents = {})
  } else {
    events = el.events || (el.events = {})
  }

  const newHandler: any = {
    value: value.trim()
  }
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers
  }

  const handlers = events[name]
  if (Array.isArray(handlers)) {
    handlers.push(newHandler)
  } else if (handlers) {
    events[name] = [handlers, newHandler]
  } else {
    events[name] = newHandler
  }

  el.plain = false
}
```

在`addHandler` 函数里做了 3 件事情，首先根据 `modifier` 修饰符对事件名 `name` 做处理，接着根据 `modifier.native` 判断事件是一个浏览器原生事件还是自定义事件，
分别对应 `el.nativeEvents` 和 `el.events`，最后按照 `name` 对事件做归类，并把回调函数的字符串保留到对应的事件中。

在前言中的例子中，父组件的 `child` 节点生成的 `el.events` 和 `el.nativeEvents` 如下：

```js
el.events = {
  select: {
    value: 'selectHandler'
  }
}

el.nativeEvents = {
  click: {
    value: 'clickHandler'
  }
}
```

然后在模板编译的代码生成阶段，会在 `genData` 函数中根据 `AST` 元素节点上的 `events` 和 `nativeEvents` 生成`_c(tagName,data,children)`函数中所需要的 `data` 数据，它的定义在 `src/compiler/codegen/index.js`中：

```js
export function genData (el state) {
  let data = '{'
  // ...
  if (el.events) {
    data += `${genHandlers(el.events, false,state.warn)},`
  }
  if (el.nativeEvents) {
    data += `${genHandlers(el.nativeEvents, true, state.warn)},`
  }
  // ...
  return data
}
```

生成的data数据如下：

```js
{
  // ...
  on: {"select": selectHandler},
  nativeOn: {"click": function($event) {
      return clickHandler($event)
    }
  }
  // ...
}
```

可以看到，最开始的模板中标签上注册的事件最终会被解析成用于创建元素型VNode的`_c(tagName,data,children)`函数中data数据中的两个对象，自定义事件对象on，浏览器原生事件nativeOn。

在前面的文章中我们说过，模板编译的最终目的是创建render函数供挂载的时候调用生成虚拟DOM，那么在挂载阶段， 如果被挂载的节点是一个组件节点，则通过 `createComponent` 函数创建一个组件 vnode，该函数位于源码的 `src/core/vdom/create-component.js` 中， 如下：

```js
export function createComponent (
  Ctor: Class<Component> | Function | Object | void,
  data: ?VNodeData,
  context: Component,
  children: ?Array<VNode>,
  tag?: string
): VNode | Array<VNode> | void {
  // ...
  const listeners = data.on

  data.on = data.nativeOn

  // ...
  const name = Ctor.options.name || tag
  const vnode = new VNode(
    `vue-component-${Ctor.cid}${name ?`-${name}`: ''}`,
    data, undefined, undefined, undefined, context,
    { Ctor, propsData, listeners, tag, children },
    asyncFactory
  )

  return vnode
}
```

可以看到，把 自定义事件`data.on` 赋值给了 `listeners`，把浏览器原生事件 `data.nativeOn` 赋值给了 `data.on`，
这说明所有的原生浏览器事件处理是在当前父组件环境中处理的。而对于自定义事件，
会把 `listeners` 作为 `vnode` 的 `componentOptions` 传入，放在子组件初始化阶段中处理，
在子组件的初始化的时候，
拿到了父组件传入的 `listeners，然后在执行` `initEvents` 的过程中，会处理这个 `listeners。`

所以铺垫了这么多，结论来了：

* **父组件给子组件的注册事件中，把自定义事件传给子组件，在子组件实例化的时候进行初始化；而浏览器原生事件是在父组件中处理。**

换句话说：

* **实例初始化阶段调用的初始化事件函数initEvents实际上初始化的是父组件在模板中使用v-on或@注册的监听子组件内触发的事件**

## initEvents函数

了解了以上过程之后，我们终于进入了正题，开始分析`initEvents`函数，该函数位于源码的`src/instance/events.js`中，如下：

```js
export function initEvents (vm: Component) {
  vm._events = Object.create(null)
  // init parent attached events
  const listeners = vm.$options._parentListeners
  if (listeners) {
    updateComponentListeners(vm, listeners)
  }
}
```

可以看到，`initEvents`函数逻辑非常简单，首先在vm上新增_events属性并将其赋值为空对象，用来存储事件。

```js
vm._events = Object.create(null)
```

接着，获取父组件注册的事件赋给listeners，如果listeners不为空，则调用`updateComponentListeners`函数，将父组件向子组件注册的事件注册到子组件的实例中，如下：

```js
const listeners = vm.$options._parentListeners
if (listeners) {
  updateComponentListeners(vm, listeners)
}
这个updateComponentListeners函数是什么呢？该函数定义如下：

export function updateComponentListeners (
  vm: Component,
  listeners: Object,
  oldListeners: ?Object
) {
  target = vm
  updateListeners(listeners, oldListeners || {}, add, remove, vm)
  target = undefined
}

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn)
  } else {
    target.$on(event, fn)
  }
}

function remove (event, fn) {
  target.$off(event, fn)
}
```

可以看到，`updateComponentListeners`函数其实也没有干什么，只是调用了`updateListeners`函数，并把listeners以及add和remove这两个函数传入。我们继续跟进，看看updateListeners函数干了些什么，updateListeners函数位于源码的src/vdom/helpers/update-listeners.js中，如下：

```js
export function updateListeners (
  on: Object,
  oldOn: Object,
  add: Function,
  remove: Function,
  vm: Component
) {
  let name, def, cur, old, event
  for (name in on) {
    def = cur = on[name]
    old = oldOn[name]
    event = normalizeEvent(name)
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        `Invalid handler for event "${event.name}": got` + String(cur),
        vm
      )
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur)
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params)
    } else if (cur !== old) {
      old.fns = cur
      on[name] = old
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name)
      remove(event.name, oldOn[name], event.capture)
    }
  }
}
```

可以看到，该函数的作用是对比listeners和oldListeners的不同，并调用参数中提供的add和remove进行相应的注册事件和卸载事件。其思想是：如果listeners对象中存在某个key（即事件名）而oldListeners中不存在，则说明这个事件是需要新增的；反之，如果oldListeners对象中存在某个key（即事件名）而listeners中不存在，则说明这个事件是需要从事件系统中卸载的；

该函数接收5个参数，分别是on、oldOn、add、remove、vm，其中on对应listeners，oldOn对应oldListeners。

首先对on进行遍历， 获得每一个事件名，然后调用 normalizeEvent 函数（关于该函数下面会介绍）处理， 处理完事件名后， 判断事件名对应的值是否存在，如果不存在则抛出警告，如下：

```js
for (name in on) {
  def = cur = on[name]
  old = oldOn[name]
  event = normalizeEvent(name)
  if (isUndef(cur)) {
    process.env.NODE_ENV !== 'production' && warn(
      `Invalid handler for event "${event.name}": got` + String(cur),
      vm
    )
  }
}
```

如果存在，则继续判断该事件名在oldOn中是否存在，如果不存在，则调用add注册事件，如下：

```js
if (isUndef(old)) {
  if (isUndef(cur.fns)) {
    cur = on[name] = createFnInvoker(cur)
  }
  add(event.name, cur, event.once, event.capture, event.passive, event.params)
}
```

这里定义了 `createFnInvoker` 方法并返回invoker函数:

```js
export function createFnInvoker (fns) {
  function invoker () {
    const fns = invoker.fns
    if (Array.isArray(fns)) {
      const cloned = fns.slice()
      for (let i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments)
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns
  return invoker
}
```

由于一个事件可能会对应多个回调函数，所以这里做了数组的判断，多个回调函数就依次调用。注意最后的赋值逻辑， invoker.fns = fns，每一次执行 invoker 函数都是从 invoker.fns 里取执行的回调函数，回到 updateListeners，当我们第二次执行该函数的时候，判断如果 cur !== old，那么只需要更改 old.fns = cur 把之前绑定的 involer.fns 赋值为新的回调函数即可，并且 通过 on[name] = old 保留引用关系，这样就保证了事件回调只添加一次，之后仅仅去修改它的回调函数的引用。

```js
if (cur !== old) {
  old.fns = cur
  on[name] = old
}
```

最后遍历 oldOn， 获得每一个事件名，判断如果事件名在on中不存在，则表示该事件是需要从事件系统中卸载的事件，则调用 remove方法卸载该事件。

以上就是updateListeners函数的所有逻辑，那么上面还遗留了一个normalizeEvent 函数是干什么用的呢？还记得我们在解析事件的时候，当事件上有修饰符的时候，我们会根据不同的修饰符给事件名前面添加不同的符号以作标识，其实这个normalizeEvent 函数就是个反向操作，根据事件名前面的不同标识反向解析出该事件所带的何种修饰符，其代码如下：

```js
const normalizeEvent = cached((name: string): {
  name: string,
  once: boolean,
  capture: boolean,
  passive: boolean,
  handler?: Function,
  params?: Array<any>
} => {
  const passive = name.charAt(0) === '&'
  name = passive ? name.slice(1) : name
  const once = name.charAt(0) === '~'
  name = once ? name.slice(1) : name
  const capture = name.charAt(0) === '!'
  name = capture ? name.slice(1) : name
  return {
    name,
    once,
    capture,
    passive
  }
})
```

可以看到，就是判断事件名的第一个字符是何种标识进而判断出事件带有何种修饰符，最终将真实事件名及所带的修饰符返回

## 总结

总结下来其实就一句话：

**初始化事件函数initEvents实际上初始化的是父组件在模板中使用v-on或@注册的监听子组件内触发的事件。**
