(window.webpackJsonp=window.webpackJsonp||[]).push([[83],{668:function(t,v,s){"use strict";s.r(v);var _=s(4),a=Object(_.a)({},(function(){var t=this,v=t.$createElement,s=t._self._c||v;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("p",[t._v("正则表达式描述了一种字符串匹配的模式，可以用来检查一个串是否包含某种子串、将匹配的子串替换或者从某个子串中取出符合某个条件的子串等。")]),t._v(" "),s("h2",{attrs:{id:"语法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#语法"}},[t._v("#")]),t._v(" 语法")]),t._v(" "),s("h3",{attrs:{id:"限定符"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#限定符"}},[t._v("#")]),t._v(" 限定符")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("字符")]),t._v(" "),s("th",[t._v("描述")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("*")]),t._v(" "),s("td",[t._v("匹配前面的子表达式0次或多次，例如zo*能匹配z以及zooo,等级于zo{0,}")])]),t._v(" "),s("tr",[s("td",[t._v("+")]),t._v(" "),s("td",[t._v("匹配前面的子表达式一次或多次，例如zo+能匹配zo以及zoooo，但不能匹配z，等价于zo{1,}")])]),t._v(" "),s("tr",[s("td",[t._v("?")]),t._v(" "),s("td",[t._v("匹配前面的子表达式0次或一次，例如zo?能匹配zo以及z，但不能匹配zoo，等价于zo{0,1}")])]),t._v(" "),s("tr",[s("td",[t._v("{n}")]),t._v(" "),s("td",[t._v("n是非负整数，匹配确定的n次，例如zo{2}，能匹配zoo，但是不能匹配z")])]),t._v(" "),s("tr",[s("td",[t._v("{n,}")]),t._v(" "),s("td",[t._v("n是非负整数，至少匹配n次，例如zo{2,}，能匹配zooooo，但是不能匹配z")])]),t._v(" "),s("tr",[s("td",[t._v("{n,m}")]),t._v(" "),s("td",[t._v("n,m是非负整数，n < m, 至少匹配n次且最多匹配m次，例如zo{2,4}，能匹配zooo，但是不能匹配zooooo")])])])]),t._v(" "),s("h3",{attrs:{id:"定位符"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#定位符"}},[t._v("#")]),t._v(" 定位符")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("字符")]),t._v(" "),s("th",[t._v("描述")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("^")]),t._v(" "),s("td",[t._v("匹配输入字符串开始的位置，如果设置了Multiline,^还会与\\n或\\r之后的位置匹配")])]),t._v(" "),s("tr",[s("td",[t._v("$")]),t._v(" "),s("td",[t._v("匹配输入字符串结尾的位置，如果设置了Multiline,$还会与\\n或\\r之前的位置匹配")])])])]),t._v(" "),s("h3",{attrs:{id:"特殊字符"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#特殊字符"}},[t._v("#")]),t._v(" 特殊字符")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("字符")]),t._v(" "),s("th",[t._v("描述")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[s("code",[t._v("$")])]),t._v(" "),s("td",[s("code",[t._v("\\$")])])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("()")])]),t._v(" "),s("td",[s("code",[t._v("\\(\\)")])])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("*")])]),t._v(" "),s("td",[s("code",[t._v("\\*")])])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("+")])]),t._v(" "),s("td",[s("code",[t._v("\\+")])])]),t._v(" "),s("tr",[s("td",[s("code",[t._v(".")])]),t._v(" "),s("td",[s("code",[t._v("\\.")])])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("[]")])]),t._v(" "),s("td",[s("code",[t._v("\\[\\]")])])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("?")])]),t._v(" "),s("td",[s("code",[t._v("\\?")])])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("\\")])]),t._v(" "),s("td",[s("code",[t._v("\\\\")])])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("^")])]),t._v(" "),s("td",[s("code",[t._v("\\^")])])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("{}")])]),t._v(" "),s("td",[s("code",[t._v("\\{\\}")])])]),t._v(" "),s("tr",[s("td",[s("code",[t._v("|")])]),t._v(" "),s("td",[s("code",[t._v("\\|")])])])])]),t._v(" "),s("h3",{attrs:{id:"元字符"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#元字符"}},[t._v("#")]),t._v(" 元字符")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("字符")]),t._v(" "),s("th",[t._v("描述")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("(pattern)")]),t._v(" "),s("td",[t._v("匹配 pattern 并获取这一匹配。所获取的匹配可以从产生的 Matches 集合得到")])]),t._v(" "),s("tr",[s("td",[t._v("x")]),t._v(" "),s("td",[t._v("y")])]),t._v(" "),s("tr",[s("td",[t._v("[xyz]")]),t._v(" "),s("td",[t._v("字符集合。匹配所包含的任意一个字符。例如， '[abc]' 可以匹配 \"plain\" 中的 'a'。")])]),t._v(" "),s("tr",[s("td",[t._v("[^xyz]")]),t._v(" "),s("td",[t._v("负值字符集合。匹配未包含的任意字符。例如， '[^abc]' 可以匹配 \"plain\" 中的'p'、'l'、'i'、'n'。")])]),t._v(" "),s("tr",[s("td",[t._v("[a-z]")]),t._v(" "),s("td",[t._v("字符范围。匹配指定范围内的任意字符。例如，'[a-z]' 可以匹配 'a' 到 'z' 范围内的任意小写字母字符。")])]),t._v(" "),s("tr",[s("td",[t._v("[^a-z]")]),t._v(" "),s("td",[t._v("负值字符范围。匹配任何不在指定范围内的任意字符。例如，'[^a-z]' 可以匹配任何不在 'a' 到 'z' 范围内的任意字符。")])]),t._v(" "),s("tr",[s("td",[t._v("\\b")]),t._v(" "),s("td",[t._v("匹配一个单词边界，也就是指单词和空格间的位置。例如， 'er\\b' 可以匹配\"never\" 中的 'er'，但不能匹配 \"verb\" 中的 'er'。")])]),t._v(" "),s("tr",[s("td",[t._v("\\B")]),t._v(" "),s("td",[t._v("匹配非单词边界。'er\\B' 能匹配 \"verb\" 中的 'er'，但不能匹配 \"never\" 中的 'er'。")])]),t._v(" "),s("tr",[s("td",[t._v("\\d")]),t._v(" "),s("td",[t._v("匹配一个数字字符。等价于 [0-9]。")])]),t._v(" "),s("tr",[s("td",[t._v("\\D")]),t._v(" "),s("td",[t._v("匹配一个非数字字符。等价于 [^0-9]。")])]),t._v(" "),s("tr",[s("td",[t._v("\\s")]),t._v(" "),s("td",[t._v("匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \\f\\n\\r\\t\\v]。")])]),t._v(" "),s("tr",[s("td",[t._v("\\w")]),t._v(" "),s("td",[t._v("匹配字母、数字、下划线。等价于'[A-Za-z0-9_]'。")])])])]),t._v(" "),s("h2",{attrs:{id:"js中的正则表达式对象"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#js中的正则表达式对象"}},[t._v("#")]),t._v(" js中的正则表达式对象")]),t._v(" "),s("p",[t._v("js中的正则表达式由主体和修饰符组成")]),t._v(" "),s("p",[s("code",[t._v("/[0-9]/i")]),t._v("，其中[0-9]是正则表达的主体，在js中，正则表达式的主体需要放在"),s("code",[t._v("//")]),t._v("之间，"),s("code",[t._v("i")]),t._v("为修饰符。")]),t._v(" "),s("ul",[s("li",[s("strong",[t._v("修饰符的种类")])])]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("字符")]),t._v(" "),s("th",[t._v("描述")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("i")]),t._v(" "),s("td",[t._v("执行对大小写不敏感的匹配")])]),t._v(" "),s("tr",[s("td",[t._v("g")]),t._v(" "),s("td",[t._v("执行全局匹配（查找所有匹配而不是在找到第一个匹配后就停止）")])]),t._v(" "),s("tr",[s("td",[t._v("m")]),t._v(" "),s("td",[t._v("执行多行匹配")])])])]),t._v(" "),s("h3",{attrs:{id:"js中正则表达式的方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#js中正则表达式的方法"}},[t._v("#")]),t._v(" js中正则表达式的方法")]),t._v(" "),s("ul",[s("li",[s("code",[t._v("search()")]),t._v("查找第一个匹配的字符位置")])]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" str "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Visit w3cschool"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" n "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" str"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("search")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/w3cschool/i")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 6")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br")])]),s("ul",[s("li",[s("code",[t._v("replace()")]),t._v("替换字符串")])]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" str "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Visit Microsoft!"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" \n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" res "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" str"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("replace")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Microsoft"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"w3cschool"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v('// "Visit w3cschool"')]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br")])]),s("ul",[s("li",[s("code",[t._v("test()")]),t._v("方法检测是否满足条件")])]),t._v(" "),s("div",{staticClass:"language-js line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" reg "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token regex"}},[t._v("/[0-9]/gi")]),t._v("\nreg"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("test")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// true")]),t._v("\nreg"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("test")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'12'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// false")]),t._v("\n")])]),t._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[t._v("1")]),s("br"),s("span",{staticClass:"line-number"},[t._v("2")]),s("br"),s("span",{staticClass:"line-number"},[t._v("3")]),s("br")])]),s("h2",{attrs:{id:"常用正则表达式"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常用正则表达式"}},[t._v("#")]),t._v(" 常用正则表达式")]),t._v(" "),s("table",[s("thead",[s("tr",[s("th",[t._v("描述")]),t._v(" "),s("th",[t._v("正则表达式")])])]),t._v(" "),s("tbody",[s("tr",[s("td",[t._v("非负整数")]),t._v(" "),s("td",[s("code",[t._v("^\\d+$ 或 ^[1-9]\\d*|0$")])])]),t._v(" "),s("tr",[s("td",[t._v("汉字")]),t._v(" "),s("td",[s("code",[t._v("^[\\u4e00-\\u9fa5]{0,}$")])])]),t._v(" "),s("tr",[s("td",[t._v("邮箱地址")]),t._v(" "),s("td",[s("code",[t._v("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$")])])]),t._v(" "),s("tr",[s("td",[t._v("手机号码")]),t._v(" "),s("td",[s("code",[t._v("^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$")])])]),t._v(" "),s("tr",[s("td",[t._v("电话号码")]),t._v(" "),s("td",[s("code",[t._v("^(\\(\\d{3,4}-)|\\d{3.4}-)?\\d{7,8}$")])])]),t._v(" "),s("tr",[s("td",[t._v("身份证号")]),t._v(" "),s("td",[s("code",[t._v("(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x)$)")])])]),t._v(" "),s("tr",[s("td",[t._v("密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)")]),t._v(" "),s("td",[s("code",[t._v("^[a-zA-Z]\\w{5,17}$")])])]),t._v(" "),s("tr",[s("td",[t._v("强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间)")]),t._v(" "),s("td",[s("code",[t._v("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}$")])])]),t._v(" "),s("tr",[s("td",[t._v("强密码(必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-10之间)")]),t._v(" "),s("td",[s("code",[t._v("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$")])])]),t._v(" "),s("tr",[s("td",[t._v("中国邮政编码(中国邮政编码为6位数字)")]),t._v(" "),s("td",[s("code",[t._v("[1-9]\\d{5}(?!\\d)")])])]),t._v(" "),s("tr",[s("td",[t._v("不包含特殊于字符")]),t._v(" "),s("td",[s("code",[t._v("[^\\\\\\/\\*\\(\\)\\+\\.\\[\\]\\?\\^\\{\\}\\|~!@#$%^&<\\-=>`·,，。.;:：丶丨；‘’'\"！@￥……《》【】、？]+")])])])])])])}),[],!1,null,null,null);v.default=a.exports}}]);