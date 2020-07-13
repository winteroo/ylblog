---
title: 富文本编辑器（tinyMCE editor）
date: 2020-07-13
tags:
 - js
 - vue
 - editor
categories:
 - 前端
---
##  富文本编辑器示例

<tinymce-editor></tinymce-editor>

## 说明

公司的项目需要在线编辑模板，其中最关键的两个功能就是

* 1、添加、编辑控件（input框，其中附带各种属性）

* 2、多图上传功能

针对这两个功能，编写了两个插件，分别命名为addController、uploadImg。

建议将tinymce editor源文件下载到本地，放在静态资源文件中，利用动态添加script的方式来加载
tinymce.min.js，这样方便扩展editor的功能。

::: tip
推荐PowerPaste插件，可以复制word文档中的内容到editor，可以选择保留或是清除内联样式，非常方便。
:::

::: warning
可以在[这里](https://github.com/winteroo/ylblog/tree/master/.vuepress/components)查看次editor的vue封装源码，
注意[tinymceEditor源码](https://github.com/winteroo/ylblog/tree/master/.vuepress/public/tinymce)可以在[这里](https://github.com/winteroo/ylblog/tree/master/.vuepress/public/tinymce)
获取，可参考其中的plugins/addController的源码来查看如何书写插件。
:::
## 参考资料

* [tinyMCE editor中文文档](http://tinymce.ax-z.cn/)

* [tinyMCE editor官方文档](https://www.tiny.cloud/docs/)
