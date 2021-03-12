(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{693:function(s,t,a){"use strict";a.r(t);var n=a(4),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h2",{attrs:{id:"什么是stylelint"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#什么是stylelint"}},[s._v("#")]),s._v(" 什么是stylelint")]),s._v(" "),a("p",[s._v("引用stylelint官网的说明")]),s._v(" "),a("blockquote",[a("p",[s._v("A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.")])]),s._v(" "),a("p",[s._v("译:一个强大的，现代的linter，帮助您避免错误并且强制执行样式约定规则。")]),s._v(" "),a("p",[s._v("其实，stylelint就和eslint一样，不过stylelint是用来检查css或是css预处理语言书写规范的一款工具。")]),s._v(" "),a("p",[s._v("配合vscode 的插件一同使用会带来很愉悦的开发体验。")]),s._v(" "),a("h2",{attrs:{id:"stylelint配置项"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#stylelint配置项"}},[s._v("#")]),s._v(" stylelint配置项")]),s._v(" "),a("p",[s._v("stylelint使用如下方式作为配置源：")]),s._v(" "),a("ul",[a("li",[a("p",[s._v("1、在package.json中的stylelint字段；")])]),s._v(" "),a("li",[a("p",[s._v("2、"),a("code",[s._v(".stylelintrc")]),s._v(","),a("code",[s._v(".stylelintrc.json")]),s._v("等json配置文件")])]),s._v(" "),a("li",[a("p",[s._v("3、"),a("code",[s._v(".stylelintrc.js")]),s._v(","),a("code",[s._v("stylelint.config.js")]),s._v("js类型的配置文件，需要利用"),a("code",[s._v("module.exports = {}")]),s._v("导出一个配置对象。")])])]),s._v(" "),a("h3",{attrs:{id:"rules"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#rules"}},[s._v("#")]),s._v(" rules")]),s._v(" "),a("p",[s._v("自定义规则的检查行为，可以将自己需要加强或是忽略的规则配置在这里。")]),s._v(" "),a("h3",{attrs:{id:"extends"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#extends"}},[s._v("#")]),s._v(" extends")]),s._v(" "),a("p",[s._v("继承的配置规则，因为自己配置规则是比较繁琐的，所以我们一般会采用社区配置好的统一规范，例如"),a("code",[s._v("stylelint-config-standard")]),s._v("规范，以及"),a("code",[s._v("stylelint-config-rational-order")]),s._v("\n规定的css属性书写顺序的规范。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("extends")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'stylelint-config-standard'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'stylelint-config-rational-order'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("h3",{attrs:{id:"plugins"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#plugins"}},[s._v("#")]),s._v(" plugins")]),s._v(" "),a("p",[s._v("插件是由社区构建的规则或规则集，支持方法、工具集、非标准CSS特性或非常具体的用例。一般extends就可以满足我们的需求。")]),s._v(" "),a("h2",{attrs:{id:"为你的项目添加stylelint"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#为你的项目添加stylelint"}},[s._v("#")]),s._v(" 为你的项目添加stylelint")]),s._v(" "),a("p",[s._v("接下来，我们为vue项目添加stylelint支持。")]),s._v(" "),a("h3",{attrs:{id:"_1、编写stylelint配置文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、编写stylelint配置文件"}},[s._v("#")]),s._v(" 1、编写stylelint配置文件")]),s._v(" "),a("p",[s._v("首先我们需要安装项目需要的包：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" stylelint stylelint-config-standard stylelint-config-rational-order stylelint-order -D\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("ul",[a("li",[a("p",[s._v("stylelint: stylelint核心包")])]),s._v(" "),a("li",[a("p",[s._v("stylelint-config-standard：社区总结的统一css书写规范")])]),s._v(" "),a("li",[a("p",[s._v("stylelint-config-rational-order：社区总结的统一css属性顺序书写规范")])]),s._v(" "),a("li",[a("p",[s._v("stylelint-order：属性顺序需要的包文件")])])]),s._v(" "),a("p",[s._v("然后在项目根目录添加"),a("code",[s._v(".stylelintrc.js")]),s._v("文件，配添加如下配置：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[s._v("module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  plugins"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("extends")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"stylelint-config-standard"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'stylelint-config-rational-order'")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  rules"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("p",[s._v("我们这里继承了社区提供的统一的standard规范以及css属性书写顺序规范。")]),s._v(" "),a("h3",{attrs:{id:"配置webpack提供stylelint的支持"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置webpack提供stylelint的支持"}},[s._v("#")]),s._v(" 配置webpack提供stylelint的支持")]),s._v(" "),a("p",[s._v("将stylelint和构建工具一同使用才能真正发挥它的作用。")]),s._v(" "),a("p",[s._v("首先安装需要的包文件：")]),s._v(" "),a("div",{staticClass:"language-bash line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" i stylelint-webpack-plugin -D\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("div",{staticClass:"custom-block tip"},[a("p",[s._v("stylelint-webpack-plugin目前支持支webpack4")])]),s._v(" "),a("p",[s._v("之后我们在配置的开发阶段的webpack配置文件中加入该插件：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("const")]),s._v(" StylelintPlugin "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("require")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'stylelint-webpack-plugin'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nmodule"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("exports "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n  plugins"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("StylelintPlugin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 正则匹配想要lint监测的文件")]),s._v("\n      files"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'**/*.s?(a|c)ss'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'**/*.less'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'**/*.vue'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br")])]),a("p",[s._v("这样配置后，webpack在启动时会去检查sass、scss、less、css、vue文件中的样式代码。")]),s._v(" "),a("h3",{attrs:{id:"配置编辑器支持快速修复"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置编辑器支持快速修复"}},[s._v("#")]),s._v(" 配置编辑器支持快速修复")]),s._v(" "),a("p",[s._v("在出此配置了stylelint后，会发现，错误很多，一个个的错误修改，那简直是可怕的，此时，我们需要我们的编辑器能自动帮助我们修复问题代码。")]),s._v(" "),a("p",[s._v("以我使用的vs code为例，需要安装stylelint插件。")]),s._v(" "),a("p",[s._v("之后需要配置setting.json文件")]),s._v(" "),a("div",{staticClass:"language-json line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-json"}},[a("code",[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"editor.codeActionsOnSave"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"source.fixAll.stylelint"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"css.validate"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"less.validate"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v('"scss.validate"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("p",[s._v("这样配置是告诉vs code，在文件保存时执行修复，并且忽略编辑器自带的css、less、scss验证。")]),s._v(" "),a("p",[s._v("之后，在需要修复代码的文件处保一下，代码就自动修复了。")])])}),[],!1,null,null,null);t.default=e.exports}}]);