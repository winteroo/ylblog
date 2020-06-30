---
title: node爬虫
date: 2020-06-27
tags:
 - JS
 - nodejs
 - 爬虫
categories:
 - 后端
---
## 介绍
::: tip
简易网络爬虫，用于爬取个人网站信息。代码量不大，十五分钟上手一个小爬虫！
:::

<!-- more -->

<github-corner></github-corner>

### 网络爬虫

网络爬虫（又称为网页蜘蛛，网络机器人，在FOAF社区中间，更经常的称为网页追逐者），
是一种按照一定的规则，自动地抓取万维网信息的程序或者脚本。另外一些不常使用的名字还有蚂蚁、自动索引、模拟程序或者蠕虫。

[百度百科：网络爬虫](https://baike.baidu.com/item/%E7%BD%91%E7%BB%9C%E7%88%AC%E8%99%AB/5162711?fr=aladdin)

### 爬虫工具

此次简易的爬虫我们用到了工具主要有以下两个

* 1、**axios**：用于发送请求，可以应用于浏览器环境和nodejs环境

* 2、**cheerio**：nodejs环境下解析html字符串为dom元素，同时可以利用类似`jQuery`的方法获取、修改dom元素。

## 目标

爬取[个人网站](https://winteroo.github.io/myblog/)中前端部分的全部文章的一级和二级标题。

## 爬虫原理及代码

### 爬虫原理

爬虫的工作原理主要分为以下几个步骤：

* 1、利用`axios`请求当前文章；

* 2、利用`cheerio`解析获取的html字符串为dom元素；

* 3、解析dom元素，获取一级标题和二级标题的标签内容，并拼接为易于查看的字符串。

* 4、将拼接好的字符串信息写入文件中，记录爬取的文章的信息。

* 5、在当前文章dom元素中获取下一篇文章的地址；

* 6、根据第二篇文章的地址，继续爬取第二篇文章；

* 7、重复1 - 6 的步骤，直到下一篇文章的地址为空，至此，爬取完毕；


### 爬虫代码

```js
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

// 第一篇文章的地址
let url = 'https://winteroo.github.io/myblog/Front/JS/001positionOperation.html';

let origin = 'https://winteroo.github.io';

class Crawler {
  constructor(url) {
    this.url = url;
  }
  start() {
    this.init(this.url);
    // 清空文件内容
    fs.writeFileSync('blogConfig.txt','');
  }
  async init(url) {
    try {
      let res = await axios.get(url);
      this.getNext(res.data);
    } catch(err){
      console.log('请求出错。');
    }
  }
  getNext(html) {
    // 解析html字符串为dom元素
    let $ = cheerio.load(html);
    this.processHtml($);
    // 获取下一篇文章的地址
    let nextHref = $('.next a').attr('href');
    let nextUrl = '';
    if (nextHref) {
      // 拼接下一个文章地址
      nextUrl = origin + nextHref;
      console.log(nextUrl);
      this.init(nextUrl);
    }
  }
  processHtml(dom) {
    let $ = dom;
    // 获取一级标题的文案
    let title = this.deleteItem($('.page h1').text());
    let secondTitle = '';
    // 获取二级标题的文案
    $('.page h2').each((i, el) => {
      let index = i + 1;
      let elText = this.deleteItem($(el).text());
      let secondStr = `${index}：${elText}，`
      secondTitle += secondStr;
    });
    let fileName = 'blogConfig.txt';
    let content = `一级标题：${title} \n二级标题：${secondTitle} \n`;
    // 将内容写入文件
    fs.appendFile(fileName, content, 'utf8', () => {
      console.log('爬取完毕！！');
    });
  }
  deleteItem(item) {
    let clone = item;
    return clone.replace('#', '').trim();
  }
}

// 初始化爬虫并开始爬取网页文章
let crawler = new Crawler(url);

crawler.start();

```
### 爬取效果

![爬虫效果](~@Backend/Nodejs/images/crawler.png)
