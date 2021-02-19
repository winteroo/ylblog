---
title: 变化监测
date: 2020-11-17
tags:
 - Vue
categories:
 - 前端
---

## 前言

众所周知，Vue最大的特点之一就是数据驱动视图，那么什么是数据驱动视图呢？在这里，我们可以把数据理解为状态，而视图就是用户可直观看到页面。页面不可能是一成不变的，它应该是动态变化的，而它的变化也不应该是无迹可寻的，它或者是由用户操作引起的，亦或者是由后端数据变化引起的，不管它是因为什么引起的，我们统称为它的状态变了，它由前一个状态变到了后一个状态，页面也就应该随之而变化，所以我们就可以得到如下一个公式：

```js
UI = render(state)
```

上述公式中：状态state是输入，页面UI输出，状态输入一旦变化了，页面输出也随之而变化。我们把这种特性称之为数据驱动视图。

OK，有了基本概念以后，我们再把上述公式拆成三部分：state、render()以及UI。我们知道state和UI都是用户定的，而不变的是这个render()。所以Vue就扮演了render()这个角色，当Vue发现state变化之后，经过一系列加工，最终将变化反应在UI上。

那么第一个问题来了，Vue怎么知道state变化了呢？

## 变化监测

回答前言中提到的问题，就涉及到我们每次提到vue都会想到的一个方法`Object.defineProperty()`，其用法如下：

```js
let car = {}
let val = 3000
Object.defineProperty(car, 'price', {
  enumerable: true,
  configurable: true,
  get(){
    console.log('price属性被读取了')
    return val
  },
  set(newVal){
    console.log('price属性被修改了')
    val = newVal
  }
})
```

直白说就是可以利用`Object.defineProperty()`来劫持对象上的getter和setter方法，从而拦截数据的获取和赋值，在这期间可以添加我们需要的操作。

在vue的源码位置：src/core/observer/index.js

```js

/**
 * Observer类会通过递归的方式把一个对象的所有属性都转化成可观测对象
 */
export class Observer {
  constructor (value) {
    this.value = value
    // 给value新增一个__ob__属性，值为该value的Observer实例
    // 相当于为value打上标记，表示它已经被转化成响应式了，避免重复操作
    def(value,'__ob__',this)
    if (Array.isArray(value)) {
      // 当value为数组时的逻辑
      // ...
    } else {
      this.walk(value)
    }
  }

  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }
}
/**
 * 使一个对象转化成可观测对象
 * @param { Object } obj 对象
 * @param { String } key 对象的key
 * @param { Any } val 对象的某个key的值
 */
function defineReactive (obj,key,val) {
  // 如果只传了obj和key，那么val = obj[key]
  if (arguments.length === 2) {
    val = obj[key]
  }
  if(typeof val === 'object'){
      new Observer(val)
  }
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get(){
      console.log(`${key}属性被读取了`);
      return val;
    },
    set(newVal){
      if(val === newVal){
          return
      }
      console.log(`${key}属性被修改了`);
      val = newVal;
    }
  })
}
```

vue实现了类似的数据劫持类。

## 依赖收集

### 什么是依赖收集

在上一章中，我们迈出了第一步：让object数据变的可观测。变的可观测以后，我们就能知道数据什么时候发生了变化，那么当数据发生变化时，我们去通知视图更新就好了。那么问题又来了，视图那么大，我们到底该通知谁去变化？总不能一个数据变化了，把整个视图全部更新一遍吧，这样显然是不合理的。此时，你肯定会想到，视图里谁用到了这个数据就更新谁呗。对！你想的没错，就是这样。

视图里谁用到了这个数据就更新谁，我们换个优雅说法：我们把"谁用到了这个数据"称为"谁依赖了这个数据",我们给每个数据都建一个依赖数组(因为一个数据可能被多处使用)，谁依赖了这个数据(即谁用到了这个数据)我们就把谁放入这个依赖数组中，那么当这个数据发生变化的时候，我们就去它对应的依赖数组中，把每个依赖都通知一遍，告诉他们："你们依赖的数据变啦，你们该更新啦！"。这个过程就是依赖收集。

### 何时收集依赖？何时通知依赖更新

明白了什么是依赖收集后，那么我们到底该在何时收集依赖？又该在何时通知依赖更新？

其实这个问题在上一小节中已经回答了，我们说过：谁用到了这个数据，那么当这个数据变化时就通知谁。所谓谁用到了这个数据，其实就是谁获取了这个数据，而可观测的数据被获取时会触发getter属性，那么我们就可以在getter中收集这个依赖。同样，当这个数据变化时会触发setter属性，那么我们就可以在setter中通知依赖更新。

总结一句话就是：**在getter中收集依赖，在setter中通知依赖更新。**

### 把依赖收集到哪里

明白了什么是依赖收集以及何时收集何时通知后，那么我们该把依赖收集到哪里？

在3.1小节中也说了，我们给每个数据都建一个依赖数组，谁依赖了这个数据我们就把谁放入这个依赖数组中。单单用一个数组来存放依赖的话，功能好像有点欠缺并且代码过于耦合。我们应该将依赖数组的功能扩展一下，更好的做法是我们应该为每一个数据都建立一个依赖管理器，把这个数据所有的依赖都管理起来。OK，到这里，我们的依赖管理器Dep类应运而生，代码如下：

```js
// 源码位置：src/core/observer/dep.js
export default class Dep {
  constructor () {
    this.subs = []
  }

  addSub (sub) {
    this.subs.push(sub)
  }
  // 删除一个依赖
  removeSub (sub) {
    remove(this.subs, sub)
  }
  // 添加一个依赖
  depend () {
    if (window.target) {
      this.addSub(window.target)
    }
  }
  // 通知所有依赖更新
  notify () {
    const subs = this.subs.slice()
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

/**

* Remove an item from an array
 */
export function remove (arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}
```

在上面的依赖管理器Dep类中，我们先初始化了一个subs数组，用来存放依赖，并且定义了几个实例方法用来对依赖进行添加，删除，通知等操作。

有了依赖管理器后，我们就可以在getter中收集依赖，在setter中通知依赖更新了，代码如下：

```js
function defineReactive (obj,key,val) {
  if (arguments.length === 2) {
    val = obj[key]
  }
  if(typeof val === 'object'){
    new Observer(val)
  }
  const dep = new Dep()  //实例化一个依赖管理器，生成一个依赖管理数组dep
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get(){
      dep.depend()    // 在getter中收集依赖
      return val;
    },
    set(newVal){
      if(val === newVal){
          return
      }
      val = newVal;
      dep.notify()   // 在setter中通知依赖更新
    }
  })
}
```

在上述代码中，我们在getter中调用了dep.depend()方法收集依赖，在setter中调用dep.notify()方法通知所有依赖更新。

## 依赖到底是谁

通过上一章节，我们明白了什么是依赖？何时收集依赖？以及收集的依赖存放到何处？那么我们收集的依赖到底是谁？

虽然我们一直在说”谁用到了这个数据谁就是依赖“，但是这仅仅是在口语层面上，那么反应在代码上该如何来描述这个”谁“呢？

其实在Vue中还实现了一个叫做Watcher的类，而Watcher类的实例就是我们上面所说的那个"谁"。换句话说就是：谁用到了数据，谁就是依赖，我们就为谁创建一个Watcher实例。在之后数据变化时，我们不直接去通知依赖更新，而是通知依赖对应的Watch实例，由Watcher实例去通知真正的视图。

Watcher类的具体实现如下：

```js
export default class Watcher {
  constructor (vm,expOrFn,cb) {
    this.vm = vm;
    this.cb = cb;
    this.getter = parsePath(expOrFn)
    this.value = this.get()
  }
  get () {
    window.target = this;
    const vm = this.vm
    let value = this.getter.call(vm, vm)
    window.target = undefined;
    return value
  }
  update () {
    const oldValue = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, oldValue)
  }
}

/**

* Parse simple path.
* 把一个形如'data.a.b.c'的字符串路径所表示的值，从真实的data对象中取出来
* 例如：
* data = {a:{b:{c:2}}}
* parsePath('a.b.c')(data)  // 2
 */
const bailRE = /[^\w.$]/
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

谁用到了数据，谁就是依赖，我们就为谁创建一个Watcher实例，在创建Watcher实例的过程中会自动的把自己添加到这个数据对应的依赖管理器中，以后这个Watcher实例就代表这个依赖，当数据变化时，我们就通知Watcher实例，由Watcher实例再去通知真正的依赖。

那么，在创建Watcher实例的过程中它是如何的把自己添加到这个数据对应的依赖管理器中呢？

下面我们分析Watcher类的代码实现逻辑：

* 当实例化Watcher类时，会先执行其构造函数；
* 在构造函数中调用了this.get()实例方法；
* 在get()方法中，首先通过window.target = this把实例自身赋给了全局的一个唯一对象window.target上，然后通过let value = this.getter.call(vm, vm)获取一下被依赖的数据，获取被依赖数据的目的是触发该数据上面的getter，上文我们说过，在getter里会调用dep.depend()收集依赖，而在dep.depend()中取到挂载window.target上的值并将其存入依赖数组中，在get()方法最后将window.target释放掉。
* 而当数据变化时，会触发数据的setter，在setter中调用了dep.notify()方法，在dep.notify()方法中，遍历所有依赖(即watcher实例)，执行依赖的update()方法，也就是Watcher类中的update()实例方法，在update()方法中调用数据变化的更新回调函数，从而更新视图。
简单总结一下就是：Watcher先把自己设置到全局唯一的指定位置（window.target），然后读取数据。因为读取了数据，所以会触发这个数据的getter。接着，在getter中就会从全局唯一的那个位置读取当前正在读取数据的Watcher，并把这个watcher收集到Dep中去。收集好之后，当数据发生变化时，会向Dep中的每个Watcher发送通知。通过这样的方式，Watcher可以主动去订阅任意一个数据的变化。

如下图：

![observe](~@Vue/images/observe.jpg)

## 不足之处

虽然我们通过`Object.defineProperty`方法实现了对object数据的可观测，但是这个方法仅仅只能观测到object数据的取值及设置值，当我们向object数据里添加一对新的key/value或删除一对已有的key/value时，它是无法观测到的，导致当我们对object数据添加或删除值时，无法通知依赖，无法驱动视图进行响应式更新。

当然，Vue也注意到了这一点，为了解决这一问题，Vue增加了两个全局API:Vue.set和Vue.delete。
