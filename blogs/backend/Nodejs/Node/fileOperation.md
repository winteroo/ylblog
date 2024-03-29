---
title: node文件系统基本操作
date: 2020-06-23
sidebar: 'auto'
tags:
 - js
 - nodejs
categories:
 - 后端
---

nodejs提供javascript的运行环境，其中提供的一个很重要的能力就是利用js操作文件系统，
作为前端开发工程师，平时和浏览器打交道最多，很少接触文件的操作，所以今天就着重写一下nodejs
操作文件系统。

## 文件的基本操作

### 1.文件内容的读取
```js
const fs = require('fs');
let filePath = 'D:/workFile/root/readme.txt';
fs.readFile(filePath, 'utf8', (err, data) => {
  // data中存放着文件内容
  if (!err) {
    console.log(data);
  } else {
    console.log(err);
  }
});
```

### 2.写文件
::: tip 说明
:beginner:
* 当调用```writeFile```时，会清空原文件内容，写入新的文件内容，如果需要在原文件后追加内容，则使用```appendFile```
* 当写入的文件不存在时，会创建该文件，并写入内容；
:::

```js
let filePath = 'D:\\workFile\\root\\readme.txt';
let writeContent = '测试nodejs => koa 文件写入';
fs.writeFile(filePath, writeContent, (err) => {
  // err 文件写入失败时
  // 此处会将readme.txt里的原内容删除，并添加writeContent的内容
});
fs.appendFile(filePath, writeContent, (err) => {
  // err 文件写入失败时
  // 此处会在readme.txt里的原内容基础上追加writeContent的内容
});
```

### 3.创建文件
创建文件有多中方式，可以使用```fs.open```、```fs.writeFile```、```fs.appendFile```、```fs.readFile```......,
在```fs.writeFile```函数中，```writeFile```接受四个参数```writeFile(filepath, writeContent, options, callback)```
其中```options```中有```flag```选项，我们可以设置该选项为```writeFile```函数赋予不同的表现形式。
因为```writeFile```的```flag```默认值为```w```，根据下面的表格
我们可以看到，当写入的文件不存在时，```w```参数决定了函数会创建并写入数据,这里涉及文件的系统标志判定，根据nodejs官网上列出的标志和作用，下面的标志和作用会在
文件不存在时创建文件

| 标志 | 作用 |
| ------ | ------ | ------ |
| a | 打开文件用于追加。 如果文件不存在，则创建该文件。 |
| a+ | 打开文件用于读取和追加。 如果文件不存在，则创建该文件。 |
| as | 打开文件用于追加（在同步模式中）。 如果文件不存在，则创建该文件。 |
| w | 打开文件用于写入。 如果文件不存在则创建文件，如果文件存在则截断文件。 |
| w+ | 打开文件用于读取和追加。 如果文件不存在，则创建该文件。 |
| a+ | 打开文件用于读取和写入。 如果文件不存在则创建文件，如果文件存在则截断文件。 |

### 4.文件的删除
```js
let deleteFile = 'D:/cook/see/nodejs/name.txt';
fs.unlink(deleteFile, err => {
  
})
```

### 5.拷贝文件
::: tip 说明
* **源文件和目标文件必须是文件，不可以是目录**
:::
```js
let filePath = 'D:\\workFile\\root\\readme231.txt';
let dest = 'D:/cook/see/nodejs/111.txt';
fsp.copyFile(filePath, dest, callback);
```

### 6.文件的读取流和写入流
```js
let filePath = 'D:\\workFile\\root\\readme231.txt';
let writePath = 'D:\\workFile\\root\\readme1.txt';
// 创建可读流
let rs = fs.createReadStream(filePath);
// 创建可写流
let ws = fs.createWriteStream(writePath);
// 注册监听finish事件
ws.on('finish', () => {
  console.log('完成了！');
});
// 开始从可读流流向可写流
rs.pipe(ws);
```
### 6.文件的压缩和解压
利用```Nodejs```的```zlib```模块实现文件的压缩和解压功能。压缩和解压都是围绕 ```Node.js``` 的 ```Streams API``` 构建的。
让可读流流向可写流的过程中在经过一次zip压缩（```zlib.createGzip()```）或解压（```zlib.createGunzip()```），即可实现
文件的压缩和解压。
```js{9,11,19}
const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream');

let filePath = 'D:\\workFile\\root\\readme.txt';
let writePath = 'D:\\workFile\\root\\readme.zip';
let rs = fs.createReadStream(filePath);
let ws = fs.createWriteStream(writePath);
let gzip = zlib.createGzip();
// 压缩文件
pipeline(rs, gzip, ws, (err) => {
  if (!err) {
    console.log('成功');
  }
});
// 解压文件
pipeline(
  fs.createReadStream('D:\\workFile\\root\\readme.zip'),
  zlib.createGunzip(),
  fs.createWriteStream('D:\\workFile\\root\\readme98.txt'),
  (err) => {
    if (!err) {
      console.log('成功');
    }
  }
);
```

## 目录的基本操作

### 1.目录的创建
```fs.mkdir(path, options, callback)```函数接受三个参数，第一个是要创建的目录路径，第二个是配置参数，第三个是
回调函数，第二个参数有两个选项```mode ```、```recursive ```，将```recursive ```设置为```true```，创建函数会
创建```path```目录中所有的为创建的目录。
```js
// 创建 `/目录1/目录2/目录3`，不管 `/目录1` 和 `/目录1/目录2` 是否存在。
fs.mkdir('/目录1/目录2/目录3', { recursive: true }, (err) => {
  if (err) throw err;
});
```

### 2.目录的删除
::: tip 说明
:beginner:
* ```fs.rmdir(path, callback)```函数在```v12.10.0```版本之后支持传入```option```配置，可以在其中配置
```recursive:true```，来递归的删除目录（针对目录下存在目录的情况）
* ```fs.rmdir(path, callback)```注意递归删除只是实验性质的，建议还是只删除单一目录，目录下不存在新的目录的情况。
:::
```js
 fs.rmdir('D:/cook/see',  err => {});
```

### 3.读取目录内文件
```js
fs.readdir('D:\\workFile\\root', (err, files) => {
  // files => Array 中存放着目录下的全部文件名称
});
```
