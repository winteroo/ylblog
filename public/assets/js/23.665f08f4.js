(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{562:function(s,t,a){s.exports=a.p+"assets/img/webpack4.6949df60.png"},563:function(s,t,a){s.exports=a.p+"assets/img/webpack5.9de33940.gif"},564:function(s,t,a){s.exports=a.p+"assets/img/webpack6.45ec2196.gif"},703:function(s,t,a){"use strict";a.r(t);var n=a(4),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,n=s._self._c||t;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("h2",{attrs:{id:"简介"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#简介"}},[s._v("#")]),s._v(" 简介")]),s._v(" "),n("p",[s._v("loader帮助webpack解析非js文件，而当开发一些特殊的功能时，loader提供的能力可能无法满足我们的要求，这时候我们就需要\nplugin来帮助我们介入webpack的深层编译对象当中。用webpack官方网站对plugin的描述就是：")]),s._v(" "),n("blockquote",[n("p",[s._v("插件是 webpack 的支柱功能。webpack 自身也是构建于你在 webpack 配置中用到的相同的插件系统之上！")])]),s._v(" "),n("h2",{attrs:{id:"配置"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#配置"}},[s._v("#")]),s._v(" 配置")]),s._v(" "),n("p",[s._v("在webpack的配置中，有一个"),n("code",[s._v("plugins")]),s._v("字段，供我们配置我们需要的插件，他看起来像这样：")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[s._v("module"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  plugins"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br")])]),n("p",[s._v("由于插件可以携带参数/选项，你必须在 webpack 配置中，向 "),n("code",[s._v("plugins")]),s._v(" 属性传入 "),n("code",[s._v("new")]),s._v(" 实例。就像这样：")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" HtmlWebpackPlugin "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'html-webpack-plugin'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nmodule"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  plugins"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("HtmlWebpackPlugin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      title"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'测试webpack'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      filename"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'index.html'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      inject"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      minify"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      template"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./src/index.html'")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br")])]),n("h2",{attrs:{id:"常用插件"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#常用插件"}},[s._v("#")]),s._v(" 常用插件")]),s._v(" "),n("ul",[n("li",[n("p",[n("a",{attrs:{href:"https://github.com/jantimon/html-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[s._v("html-webpack-plugin"),n("OutboundLink")],1),s._v(" : 动态生成html文件的插件")])]),s._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://github.com/johnagan/clean-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[s._v("clean-webpack-plugin"),n("OutboundLink")],1),s._v(" : 清除指定文件或文件夹，一般用于打包前清除上一次生成的打包文件")])]),s._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://github.com/webpack-contrib/mini-css-extract-plugin",target:"_blank",rel:"noopener noreferrer"}},[s._v("mini-css-extract-plugin"),n("OutboundLink")],1),s._v(" : 分离css文件为单独文件")])]),s._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://github.com/webpack-contrib/copy-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[s._v("copy-webpack-plugin"),n("OutboundLink")],1),s._v(" : 拷贝文件或文件夹到到包后的文件夹")])]),s._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://github.com/webpack-contrib/compression-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[s._v("compression-webpack-plugin"),n("OutboundLink")],1),s._v(" : 对文件实行gzip压缩")])]),s._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://github.com/webpack-contrib/terser-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[s._v("terser-webpack-plugin"),n("OutboundLink")],1),s._v(" : 压缩代码的插件")])]),s._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://github.com/geowarin/friendly-errors-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[s._v("friendly-errors-webpack-plugin"),n("OutboundLink")],1),s._v(" : 友好的日志格式")])]),s._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://github.com/webpack-contrib/stylelint-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[s._v("stylelint-webpack-plugin"),n("OutboundLink")],1),s._v(": stylelint相关的webpack插件")])]),s._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://github.com/webpack-contrib/webpack-bundle-analyzer",target:"_blank",rel:"noopener noreferrer"}},[s._v("webpack-bundle-analyzer"),n("OutboundLink")],1),s._v(": weback打包后文件大小分析插件，会在打包完成后在"),n("a",{attrs:{href:"http://127.0.0:8888%E5%90%AF%E5%8A%A8%E4%B8%80%E4%B8%AA%E5%8F%AF%E8%A7%86%E5%8C%96%E7%9A%84bundle",target:"_blank",rel:"noopener noreferrer"}},[s._v("http://127.0.0:8888启动一个可视化的bundle"),n("OutboundLink")],1),s._v("文件分布视图。")])]),s._v(" "),n("li",[n("p",[n("a",{attrs:{href:"https://github.com/NMFR/optimize-css-assets-webpack-plugin",target:"_blank",rel:"noopener noreferrer"}},[s._v("optimize-css-assets-webpack-plugin"),n("OutboundLink")],1),s._v("：压缩css代码的webpack插件")])])]),s._v(" "),n("h2",{attrs:{id:"配置详情"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#配置详情"}},[s._v("#")]),s._v(" 配置详情")]),s._v(" "),n("p",[s._v("plugin扩展了webpack的能力，是的webpack可以实现任意的功能。下面提供本次项目的插件配置：")]),s._v(" "),n("div",{staticClass:"language-js line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-js"}},[n("code",[n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" HtmlWebpackPlugin "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'html-webpack-plugin'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  CleanWebpackPlugin\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'clean-webpack-plugin'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" MiniCssExtractPlugin "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'mini-css-extract-plugin'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" VueLoaderPlugin "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'vue-loader/lib/plugin'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" webpack "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'webpack'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" CopyWebpackPlugin "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'copy-webpack-plugin'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" CompressionPlugin "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'compression-webpack-plugin'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" TerserPlugin "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'terser-webpack-plugin'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\nmodule"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  plugins"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 打包进度插件")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("webpack"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("ProgressPlugin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 清除打包文件夹插件")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("CleanWebpackPlugin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// true:模拟文件的删除即不删除文件")]),s._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// false:真是删除文件")]),s._v("\n      dry"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 全局变量")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("webpack"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("DefinePlugin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'process.env'")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token constant"}},[s._v("NODE_ENV")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'production'")]),s._v("\n      "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 处理vue的特定插件")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("VueLoaderPlugin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 提取css为单独文件的插件")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("MiniCssExtractPlugin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 将css打包到执行文件夹")]),s._v("\n      filename"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'css/[name].[hash:8].css'")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 打包html插件，将动态的js插入HTML中")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("HtmlWebpackPlugin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      title"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'测试webpack'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      filename"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'index.html'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 控制将脚本插入到什么位置")]),s._v("\n      inject"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 是否压缩")]),s._v("\n      minify"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n      template"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./src/index.html'")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 开启gzip压缩插件")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("CompressionPlugin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      threshold"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[s._v("10240")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 复制文件夹插件")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("CopyWebpackPlugin")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      patterns"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n        "),n("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" path"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),n("span",{pre:!0,attrs:{class:"token function"}},[s._v("resolve")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("__dirname"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./static'")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n        to"),n("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),n("span",{pre:!0,attrs:{class:"token string"}},[s._v("'./'")]),s._v("\n      "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n    "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br"),n("span",{staticClass:"line-number"},[s._v("16")]),n("br"),n("span",{staticClass:"line-number"},[s._v("17")]),n("br"),n("span",{staticClass:"line-number"},[s._v("18")]),n("br"),n("span",{staticClass:"line-number"},[s._v("19")]),n("br"),n("span",{staticClass:"line-number"},[s._v("20")]),n("br"),n("span",{staticClass:"line-number"},[s._v("21")]),n("br"),n("span",{staticClass:"line-number"},[s._v("22")]),n("br"),n("span",{staticClass:"line-number"},[s._v("23")]),n("br"),n("span",{staticClass:"line-number"},[s._v("24")]),n("br"),n("span",{staticClass:"line-number"},[s._v("25")]),n("br"),n("span",{staticClass:"line-number"},[s._v("26")]),n("br"),n("span",{staticClass:"line-number"},[s._v("27")]),n("br"),n("span",{staticClass:"line-number"},[s._v("28")]),n("br"),n("span",{staticClass:"line-number"},[s._v("29")]),n("br"),n("span",{staticClass:"line-number"},[s._v("30")]),n("br"),n("span",{staticClass:"line-number"},[s._v("31")]),n("br"),n("span",{staticClass:"line-number"},[s._v("32")]),n("br"),n("span",{staticClass:"line-number"},[s._v("33")]),n("br"),n("span",{staticClass:"line-number"},[s._v("34")]),n("br"),n("span",{staticClass:"line-number"},[s._v("35")]),n("br"),n("span",{staticClass:"line-number"},[s._v("36")]),n("br"),n("span",{staticClass:"line-number"},[s._v("37")]),n("br"),n("span",{staticClass:"line-number"},[s._v("38")]),n("br"),n("span",{staticClass:"line-number"},[s._v("39")]),n("br"),n("span",{staticClass:"line-number"},[s._v("40")]),n("br"),n("span",{staticClass:"line-number"},[s._v("41")]),n("br"),n("span",{staticClass:"line-number"},[s._v("42")]),n("br"),n("span",{staticClass:"line-number"},[s._v("43")]),n("br"),n("span",{staticClass:"line-number"},[s._v("44")]),n("br"),n("span",{staticClass:"line-number"},[s._v("45")]),n("br"),n("span",{staticClass:"line-number"},[s._v("46")]),n("br"),n("span",{staticClass:"line-number"},[s._v("47")]),n("br"),n("span",{staticClass:"line-number"},[s._v("48")]),n("br"),n("span",{staticClass:"line-number"},[s._v("49")]),n("br"),n("span",{staticClass:"line-number"},[s._v("50")]),n("br"),n("span",{staticClass:"line-number"},[s._v("51")]),n("br"),n("span",{staticClass:"line-number"},[s._v("52")]),n("br"),n("span",{staticClass:"line-number"},[s._v("53")]),n("br"),n("span",{staticClass:"line-number"},[s._v("54")]),n("br"),n("span",{staticClass:"line-number"},[s._v("55")]),n("br"),n("span",{staticClass:"line-number"},[s._v("56")]),n("br"),n("span",{staticClass:"line-number"},[s._v("57")]),n("br")])]),n("h2",{attrs:{id:"实践"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#实践"}},[s._v("#")]),s._v(" 实践")]),s._v(" "),n("p",[s._v("到这里，我们大致已经配置出一个完整的vue的项目打包配置，那么下面让我们添加一些vue的项目代码，来试试打包效果。")]),s._v(" "),n("p",[s._v("这里我们需要在vue项目中添加动态路由、sass样式、图片资源以及静态资源static文件夹")]),s._v(" "),n("p",[n("img",{attrs:{src:a(562),alt:"webpack4"}})]),s._v(" "),n("p",[s._v("下面让我执行打包，看下效果：")]),s._v(" "),n("p",[n("img",{attrs:{src:a(563),alt:"webpack5"}})]),s._v(" "),n("p",[s._v("我们可以发现，动态路由正常生成了对应chunk文件，而且css和静态资源也各自打包进了各自的文件夹，生成的index.html文件\n也正确的引用了正确路径的css和js文件。让我们看下打包后的文件在服务端跑起来是否正常：")]),s._v(" "),n("p",[n("img",{attrs:{src:a(564),alt:"webpack6"}})]),s._v(" "),n("p",[s._v("很不错，正常运行了！")]),s._v(" "),n("h2",{attrs:{id:"总结"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[s._v("#")]),s._v(" 总结")]),s._v(" "),n("p",[s._v("至此，我们已经完成了vue项目的打包配置，而且能够正常打包，打包后的文件也是可以正常运行的，虽然我们的项目可以正常打包，\n但是我们不能总是打包后看效果，我们需要一个开发环境，能展示我们的页面效果，要是能实时响应我们的修改那就更好了，那接下来让我们一同探索下\n开发服务器的配置过程吧。")])])}),[],!1,null,null,null);t.default=e.exports}}]);