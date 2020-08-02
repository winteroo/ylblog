(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{559:function(s,t,a){s.exports=a.p+"assets/img/webpack7.4f1b80bb.gif"},560:function(s,t,a){s.exports=a.p+"assets/img/webpack8.23c8ce40.gif"},561:function(s,t,a){s.exports=a.p+"assets/img/webpack9.c713edbc.gif"},670:function(s,t,a){"use strict";a.r(t);var e=a(4),n=Object(e.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h2",{attrs:{id:"简介"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#简介"}},[s._v("#")]),s._v(" 简介")]),s._v(" "),e("p",[s._v("webpack提供开箱即用的开发服务器"),e("code",[s._v("webpack-dev-server")]),s._v("，它能帮助我们快速开发应用，便于调试，所以配置开发服务器是很有必要的。")]),s._v(" "),e("h2",{attrs:{id:"配置介绍"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置介绍"}},[s._v("#")]),s._v(" 配置介绍")]),s._v(" "),e("p",[s._v("因为"),e("code",[s._v("devServer")]),s._v("的配置项很多，我们只介绍常用的几个配置项。")]),s._v(" "),e("h3",{attrs:{id:"devserver-compress"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#devserver-compress"}},[s._v("#")]),s._v(" "),e("code",[s._v("devServer.compress")])]),s._v(" "),e("p",[s._v("是否开启gzip压缩")]),s._v(" "),e("div",{staticClass:"language-js line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[s._v("module"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  devServer"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    compress"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br")])]),e("h3",{attrs:{id:"devserver-host和devserver-port"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#devserver-host和devserver-port"}},[s._v("#")]),s._v(" "),e("code",[s._v("devServer.host")]),s._v("和"),e("code",[s._v("devServer.port")])]),s._v(" "),e("p",[s._v("定义开发服务器启动的地址和端口")]),s._v(" "),e("h3",{attrs:{id:"devserver-hot"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#devserver-hot"}},[s._v("#")]),s._v(" "),e("code",[s._v("devServer.hot")])]),s._v(" "),e("p",[s._v("是否启用webpack的热更替功能。在配置文件中配置改选项时，还需要配合"),e("code",[s._v("webpack.HotModuleReplacementPlugin")]),s._v("一同才能生效。")]),s._v(" "),e("p",[s._v("如果在cli命令中以"),e("code",[s._v("--hot")]),s._v("的形式指定，那么将不需要配置"),e("code",[s._v("webpack.HotModuleReplacementPlugin")]),s._v("插件，因为webpack会自动调用该插件。")]),s._v(" "),e("h3",{attrs:{id:"devserver-inline"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#devserver-inline"}},[s._v("#")]),s._v(" "),e("code",[s._v("devServer.inline")])]),s._v(" "),e("p",[s._v("在 dev-server 的两种不同模式之间切换。默认情况下，应用程序启用内联模式(inline mode)。\n这意味着一段处理实时重载的脚本被插入到你的包(bundle)中，并且构建消息将会出现在浏览器控制台。")]),s._v(" "),e("div",{staticClass:"custom-block warning"},[e("p",[e("code",[s._v("webpack --inline=true")])]),s._v(" "),e("p",[s._v("此选项最好采用cli参数的方式指定（内联模式），因为它包含来自 websocket 的 HMR 触发器，这样启动的服务器允许你在不刷新浏览器的情况下响应你的程序更新。")])]),s._v(" "),e("h3",{attrs:{id:"devserver-open"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#devserver-open"}},[s._v("#")]),s._v(" "),e("code",[s._v("devServer.open")])]),s._v(" "),e("p",[s._v("是否打开浏览器")]),s._v(" "),e("h3",{attrs:{id:"devserver-proxy"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#devserver-proxy"}},[s._v("#")]),s._v(" "),e("code",[s._v("devServer.proxy")])]),s._v(" "),e("p",[s._v("跨域处理")]),s._v(" "),e("h2",{attrs:{id:"配置详情"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#配置详情"}},[s._v("#")]),s._v(" 配置详情")]),s._v(" "),e("p",[s._v("配置开发服务器非常简单，只需要以下配置：")]),s._v(" "),e("div",{staticClass:"language-js line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[s._v("module"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  devServer"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    hot"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    compress"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    host"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'localhost'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    port"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'8080'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    open"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    publicPath"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    quiet"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    stats"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'errors-only'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    proxy"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br")])]),e("p",[s._v("然后修改我们的dev启动命令，改成利用webpack-dev-server来启动应用：")]),s._v(" "),e("div",{staticClass:"language-json line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-json"}},[e("code",[e("span",{pre:!0,attrs:{class:"token property"}},[s._v('"dev"')]),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v('"webpack-dev-server --mode=development --progress --inline --hot --color"')]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br")])]),e("div",{staticClass:"custom-block tip"},[e("p",[s._v("注意这里的 "),e("code",[s._v("--inline")]),s._v("不可以在配置文件中配置，应在cli命令中指定，这样才会有热更新的效果。")])]),s._v(" "),e("p",[s._v("启动服务器查看效果：")]),s._v(" "),e("p",[e("img",{attrs:{src:a(559),alt:"webpack7"}})]),s._v(" "),e("p",[s._v("查看热更新效果：")]),s._v(" "),e("p",[e("img",{attrs:{src:a(560),alt:"webpack8"}})]),s._v(" "),e("div",{staticClass:"custom-block tip"},[e("p",[s._v("在开发环境下的vue单文件组件中，建议采用vue-style-loader来替代mini-css-extract-plugin，这样vue文件的样式变化也会相应\n热更新，就像在浏览器中直接改变css样式一样。配置如下：(sass文件一样配置)")]),s._v(" "),e("div",{staticClass:"language-js line-numbers-mode"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[s._v("module"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  module"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    rules"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      test"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/\\.css$/")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      use"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n          loader"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'vue-style-loader'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n          loader"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'css-loader'")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n          options"),e("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n        "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n    "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n  "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),e("div",{staticClass:"line-numbers-wrapper"},[e("span",{staticClass:"line-number"},[s._v("1")]),e("br"),e("span",{staticClass:"line-number"},[s._v("2")]),e("br"),e("span",{staticClass:"line-number"},[s._v("3")]),e("br"),e("span",{staticClass:"line-number"},[s._v("4")]),e("br"),e("span",{staticClass:"line-number"},[s._v("5")]),e("br"),e("span",{staticClass:"line-number"},[s._v("6")]),e("br"),e("span",{staticClass:"line-number"},[s._v("7")]),e("br"),e("span",{staticClass:"line-number"},[s._v("8")]),e("br"),e("span",{staticClass:"line-number"},[s._v("9")]),e("br"),e("span",{staticClass:"line-number"},[s._v("10")]),e("br"),e("span",{staticClass:"line-number"},[s._v("11")]),e("br"),e("span",{staticClass:"line-number"},[s._v("12")]),e("br"),e("span",{staticClass:"line-number"},[s._v("13")]),e("br"),e("span",{staticClass:"line-number"},[s._v("14")]),e("br"),e("span",{staticClass:"line-number"},[s._v("15")]),e("br")])]),e("p",[e("img",{attrs:{src:a(561),alt:"webpack9"}})])]),s._v(" "),e("h2",{attrs:{id:"总结"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[s._v("#")]),s._v(" 总结")]),s._v(" "),e("p",[s._v("至此，我们已经完整的配合了整个vue开发工程，包含本地调试和打包，这也是全部webpack的基础部分的内容，我相信，如果你\n跟着我一步步的来创建你的vue项目的话，现在应该已经完成了一个vue项目的搭建，是不是有点小自豪呢，其实，静下心来认真研究\n这些工具，你会发现其实它们没有想象的那么难，工具作者暴露出来的配置项是非常实用且简练的。如果你还想探索webpack更深层次的\n东西，那么请继续往下看，接下来我们会介绍webpack的高级用法，代码分割和tree shaking，以及如何编写一个loader和plugin，相信\n这些内容会让你对webpack有更深的理解。")])])}),[],!1,null,null,null);t.default=n.exports}}]);