(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{576:function(s,a,t){s.exports=t.p+"assets/img/webpack2.2b755bc2.png"},721:function(s,a,t){"use strict";t.r(a);var n=t(4),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h2",{attrs:{id:"安装"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#安装"}},[s._v("#")]),s._v(" 安装")]),s._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",{staticClass:"custom-block-title"},[s._v("注意")]),s._v(" "),n("p",[s._v("本次搭建的webpack工程，webpack版本是4.x，后续涉及的babel版本是7.x，均为目前文章编写日期的最新版本。")])]),s._v(" "),n("p",[s._v("首先创建项目文件夹并初始化，安装webpack。")]),s._v(" "),n("div",{staticClass:"language-bash line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[s._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" webpack-demo\n\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" webpack-demo\n\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" init\n\n"),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" i webpack webpack-cli -D\n\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br")])]),n("h2",{attrs:{id:"创建工程"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#创建工程"}},[s._v("#")]),s._v(" 创建工程")]),s._v(" "),n("p",[s._v("之后在项目的根目录创建"),n("code",[s._v("webpack.config.js")]),s._v("文件，作为webpack的配置文件。")]),s._v(" "),n("p",[s._v("然后创建我们的源代码目录"),n("code",[s._v("src")]),s._v("，其中添加源文件"),n("code",[s._v("index.js")]),s._v("，并在其中输入下面的代码")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" str "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'测试'")]),s._v("\n\nconsole"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("log")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("str"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[s._v("等待全部模块安装完成后，我们在控制台输入"),n("code",[s._v("webpack")]),s._v("命令，如果不出意外的话，你的根目录会出现一个"),n("code",[s._v("dist")]),s._v("文件夹，而且里面\n有"),n("code",[s._v("main.js")]),s._v("文件，打开该文件，搜索"),n("code",[s._v("测试")]),s._v("字样，我们可以发现，在代码的最后会有"),n("code",[s._v("console.log('测试')")]),s._v("代码，可以发现，我们写的\n代码已经打包进最后生成的文件，而且，它还为我们自动做了优化，删除了无用的变量。")]),s._v(" "),n("p",[s._v("等下，你此时肯定会发现，控制台有如下警告：")]),s._v(" "),n("p",[n("img",{attrs:{src:t(576),alt:"webpack2"}})]),s._v(" "),n("p",[s._v("那么，接下来就让我们一同来解决这个问题，并一步步的配置webpack吧。")])])}),[],!1,null,null,null);a.default=e.exports}}]);