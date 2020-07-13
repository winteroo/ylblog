---
title: 浏览器事件捕获和事件冒泡
date: 2020-06-30
tags:
 - js
 - 浏览器
categories:
 - 前端
---

## 基础概念

* 1、**事件捕获**

捕获型事件(event capturing)：事件从最不精确的对象(document 对象)开始触发，
然后到最精确(也可以在窗口级别捕获事件，不过必须由开发人员特别指定)

* 2、**事件冒泡**

冒泡型事件：事件按照从最特定的事件目标到最不特定的事件目标(document对象)的顺序触发。

**图形说明**

![event](~@Front/JS/image/jsevent.png)


**个人理解**

我认为利用皮球压入水中然后浮起的过程来描述浏览器的事件捕获和事件冒泡来说很形象。

试想：当我们将皮球用力压入水中时，最先受到皮球入水信号的肯定是最外层的水面，然后随着皮球不断的被压入水中，内层的水才接收到该信息，
这就是事件捕获的过程。而当我们松开手，皮球会上浮，上浮的这个信息，肯定是接触皮球的水层最先知道，然后随着皮球不断上浮，上层的水层才会
接收到皮球上浮的消息，这就是事件冒泡的过程。

所以，根据皮球压入水中然后上浮的生活经验，我们可以猜测

**浏览器的事件也是先触发最外层元素的捕获事件，层层向内触发捕获事件，之后触发目标元素捕获、冒泡事件，最后事件向上传播，层层向外触发元素的冒泡事件**，

其实事实也是这样的，不过，这里有个地方需要注意：

::: tip
事件触发的目标元素是不区分捕获事件还是冒泡事件的，浏览器会根据目标元素事件注册的先后顺序执行事件，所以，当目标元素的冒泡事件
先于捕获事件注册在了目标元素上，那么事件触发时，也是先触发冒泡事件再触发捕获事件。
:::

## 代码验证

测试代码统一采用如下结构和样式：

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Document</title>
  <style>
    #outer {
      height: 400px;
      width: 400px;
      background: #ccc;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 100px auto;
    }

    #mider {
      height: 200px;
      width: 200px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: green;
    }

    #inner {
      height: 100px;
      width: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: yellow;
    }
  </style>
</head>
<body>
  <div id="outer">
    <div id="mider">
      <div id="inner">inner</div>
    </div>
  </div>
</body>
</html>
```
![testevent1](~@Front/JS/image/testevent1.png)

### 验证先触发捕获事件后触发冒泡事件

```js
window.onload = function () {
  function $ (id){
    return document.getElementById(id);
  }
  $('outer').addEventListener('click', function () {
    console.log('outer capture');
  }, true);
  $('mider').addEventListener('click', function () {
    console.log('mider capture');
  }, true);
  $('inner').addEventListener('click', function () {
    console.log('inner capture');
  }, true);
  $('outer').addEventListener('click', function () {
    console.log('outer bubbling');
  }, false);
  $('mider').addEventListener('click', function () {
    console.log('mider bubbling');
  }, false);
  $('inner').addEventListener('click', function () {
    console.log('inner bubbling');
  }, false);
}
```
::: tip
利用`addEventListener`为dom元素添加事件时，第三个参数默认是`false`，意思是在事件冒泡阶段执行代码，
`true`为在事件捕获阶段执行代码。
:::

![testevent2](~@Front/JS/image/testevent2.png)

点击inner元素，按照我们的预期，先执行外层的事件捕获，再执行冒泡事件。

### 验证目标元素的事件按照注册顺序执行

调整项目代码将inner元素的冒泡事件注册在捕获事件之前，之后在inner元素上触发点击事件。

```js
window.onload = function () {
  function $ (id){
    return document.getElementById(id);
  }
  $('outer').addEventListener('click', function () {
    console.log('outer capture');
  }, true);
  $('mider').addEventListener('click', function () {
    console.log('mider capture');
  }, true);

  $('outer').addEventListener('click', function () {
    console.log('outer bubbling');
  }, false);
  $('mider').addEventListener('click', function () {
    console.log('mider bubbling');
  }, false);
  
  $('inner').addEventListener('click', function () {
    console.log('inner bubbling');
  }, false);
  $('inner').addEventListener('click', function () {
    console.log('inner capture');
  }, true);
}

```

![testevent3](~@Front/JS/image/testevent3.png)

我们可以发现，inner元素的冒泡事件先于捕获事件触发了，验证了我们观点的正确性。

## 阻止事件继续传播

### 理论基础

前面的介绍我们可以知道，多个事件处理函数会按照DOM事件流模型中的顺序执行。

如果子元素上发生某个事件，不需要执行父元素上注册的事件处理函数，那么我们可以停止捕获和冒泡，避免没有意义的函数调用。

推荐的方法是使用`event.stopPropagation();`来阻止事件的传播；

如果我们在最外层元素的捕获阶段阻止了事件继续传播，那么其内层的所有元素的事件均不会触发。

::: tip
虽然`event.stopPropagation();`可以阻止事件继续传播，但是有一点需要清楚，就是在目标元素上阻止事件传播，依然会触发目标元素的
捕获事件和冒泡事件，只是其后续的事件传播被阻止了。
:::

### 代码验证

我们在最外层outer元素的事件捕获阶段添加阻止事件传播的代码，其余代码保持不变，如下：

```js{7}
window.onload = function () {
  function $ (id){
    return document.getElementById(id);
  }
  $('outer').addEventListener('click', function () {
    console.log('outer capture');
    event.stopPropagation();
  }, true);
  $('mider').addEventListener('click', function () {
    console.log('mider capture');
  }, true);

  $('outer').addEventListener('click', function () {
    console.log('outer bubbling');
  }, false);
  $('mider').addEventListener('click', function () {
    console.log('mider bubbling');
  }, false);

  $('inner').addEventListener('click', function () {
    console.log('inner bubbling');
  }, false);
  $('inner').addEventListener('click', function () {
    console.log('inner capture');
  }, true);
}

```
点击inner或mider元素，效果如下：

![testevent4](~@Front/JS/image/testevent4.png)

outer元素触发了捕获事件后，后边的事件就再也没有触发；

点击outer元素，效果如下：

![testevent5](~@Front/JS/image/testevent5.png)

outer元素同时触发了outer元素的捕获和冒泡事件。
