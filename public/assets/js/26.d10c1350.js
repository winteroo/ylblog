(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{555:function(s,a,t){s.exports=t.p+"assets/img/sourcemap1.de9f8332.png"},556:function(s,a,t){s.exports=t.p+"assets/img/sourcemap2.61f5ba65.png"},594:function(s,a,t){"use strict";t.r(a);var n=t(4),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,n=s._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h2",{attrs:{id:"现状"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#现状"}},[s._v("#")]),s._v(" 现状")]),s._v(" "),n("p",[s._v("公司目前存在一些比较棘手的项目，就是在本地无法联调，需要线上环境和客户进行对接，这就造成了开发调试上的巨大困难，")]),s._v(" "),n("p",[s._v("为了解决这些困难，需要创造线上调试的环境。下面就介绍目前可行的线上调试方法。")]),s._v(" "),n("h2",{attrs:{id:"方法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#方法"}},[s._v("#")]),s._v(" 方法")]),s._v(" "),n("h3",{attrs:{id:"生成sourcemap文件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#生成sourcemap文件"}},[s._v("#")]),s._v(" 生成sourceMap文件")]),s._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",[n("code",[s._v("Source map")]),s._v("就是一个信息文件，里面储存着位置信息。也就是说，转换后的代码的每一个位置，所对应的转换前的位置。")]),s._v(" "),n("p",[s._v("有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。这无疑给开发者带来了很大方便。")])]),s._v(" "),n("p",[s._v("生成sourceMap文件文件可以帮助我们快速定位问题点。")]),s._v(" "),n("p",[s._v("配置vue项目生成"),n("code",[s._v("sourceMap")]),s._v("文件是非常方便的：在config/index.js文件中，修改如下字段即可")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[s._v(" productionSourceMap"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// true 为生成source map")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br")])]),n("p",[s._v("下面，我们看一下生成"),n("code",[s._v("sourceMap")]),s._v("文件后的打包样子")]),s._v(" "),n("p",[n("img",{attrs:{src:t(555),alt:"sourcemap1"}})]),s._v(" "),n("p",[s._v("在浏览器中source/pages/webpack文件夹下我们可以找到我们需要的具体文件，而且文件是没有经过任何分析替换代码的。")]),s._v(" "),n("p",[s._v("可以轻松的打断点调试。\n"),n("img",{attrs:{src:t(556),alt:"sourcemap2"}})]),s._v(" "),n("h3",{attrs:{id:"利用动态路由"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#利用动态路由"}},[s._v("#")]),s._v(" 利用动态路由")]),s._v(" "),n("p",[s._v("项目采用动态路由的方式，按需加载对应的路由模块页面，这时，生成的动态加载的路由文件为"),n("code",[s._v("1.[hash].js")]),s._v("，无法分辨出")]),s._v(" "),n("p",[s._v("具体的哪个文件对应着哪个页面，而且js代码都是经过压缩处理的，根本无法跟踪代码。所以，下面我们就来解决这些问题。")]),s._v(" "),n("ul",[n("li",[s._v("1、修改动态路由引入方式，添加"),n("code",[s._v("webpackChunkName")]),s._v("注释，告诉webpack生成这个chunk对应的文件名称。")])]),s._v(" "),n("div",{staticClass:"custom-block warning"},[n("p",{staticClass:"custom-block-title"},[s._v("注意")]),s._v(" "),n("p",[n("code",[s._v('/* webpackChunkName: "home" */')]),s._v("，注释的前后都需要有空格，否则无法识别。即"),n("code",[s._v("webpackChunkName")]),s._v("前面需要空格，\n"),n("code",[s._v('"home"')]),s._v("后面需要空格。")])]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  path"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'/home'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  name"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Home'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token function-variable function"}},[s._v("component")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v('/* webpackChunkName: "home" */')]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'@/views/home/index.vue'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  meta"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    keepAlive"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    requireAuth"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    isSinglePage"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br")])]),n("ul",[n("li",[s._v("2、修改webpack打包配置文件，去掉代码压缩并修改生成chunk文件的名称规范。")])]),s._v(" "),n("p",[s._v("修改webpack输出chunk文件的命名规范，将"),n("code",[s._v("id")]),s._v("改为"),n("code",[s._v("name")]),s._v("，name会自动提取我们配置的"),n("code",[s._v("webpackChunkName")]),s._v("。")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[s._v("output"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  path"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" config"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("build"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("assetsRoot"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  filename"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" utils"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("assetsPath")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'js/[name].[chunkhash].js'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')")]),s._v("\n  chunkFilename"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" utils"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("assetsPath")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'js/[name].[chunkhash].js'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br")])]),n("p",[s._v("在"),n("code",[s._v("plugins")]),s._v("配置项中注释代码压缩插件，即以下这段代码。")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("UglifyJsPlugin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  uglifyOptions"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    compress"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      warnings"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  sourceMap"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" config"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("build"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("productionSourceMap"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  parallel"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br")])]),n("p",[s._v("最后重新打包即可生产配置了名称的js文件，同时，改js文件也是没有经过压缩的，我们可以在其中打断点查看程序的运行过程。")]),s._v(" "),n("h3",{attrs:{id:"利用抓包工具"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#利用抓包工具"}},[s._v("#")]),s._v(" 利用抓包工具")]),s._v(" "),n("div",{staticClass:"custom-block tip"},[n("p",[s._v("网上曝出的可以利用抓包工具抓取，页面加载请求index.html文件，然后拦截该请求，替换为本地的index.html文件进行伪造，然后本地的js文件也需要拦截请求，操作较复杂，目前不是很推荐。")])])])}),[],!1,null,null,null);a.default=e.exports}}]);