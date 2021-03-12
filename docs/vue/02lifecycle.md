---
title: 综述
date: 2020-10-28
tags:
 - Vue
categories:
 - 前端
---

## 前言

在Vue中，每个Vue实例从被创建到销毁都经历着一个完善的过程，我们称之为生命周期，那么Vue的生命周期到底是怎么样的呢？
下面我们先看一下官方网站给出的生命周期图示。

## 生命周期流程图

![Vue](~@Vue/images/lifecycle.png)

从图中我们可以看到，Vue实例的生命周期大致可分为5个阶段：

* 初始化阶段：为Vue实例上初始化一些属性，事件以及响应式数据；

* 模板编译阶段：将模板编译成渲染函数；

* 挂载阶段：将实例挂载到指定的DOM上，即将模板渲染到真实DOM中；

* 更新阶段：Vue实例数据更新，触发虚拟DOM更新，通过diff算法找到需要更新的DOM节点，更新节点；

* 销毁阶段：将实例自身从父组件中删除，并取消依赖追踪及事件监听器；

## 总结

本节我们主要是总览Vue的整体运行过程，简单介绍各个阶段发生了什么事情，接下来我们就具体说说各个阶段都是如何运行的。