---
title: 解析模板
date: 2020-11-12
tags:
 - Vue
categories:
 - 前端
---

## 前言

模板解析就是将用户编写的`<template></template>`之间的内容从字符串的形式转化为对象的形式，并将其中的信息按照一定的规则
记录在对象的对应属性中，最终形成我们所说的抽象语法树（ast）

## 解析源码

在`src/compiler/parser/index.js`中

```js
export function parse(template, options) {
   // ...
  parseHTML(template, {
    warn,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start (tag, attrs, unary) {

    },
    end () {

    },
    chars (text: string) {

    },
    comment (text: string) {

    }
  })
  return root
}
```

`parse`函数很复杂，包含对于多种情况的复杂处理，不过，将处理函数剥离出去，我们就能发现，`parse`函数其中最主要的是调用`parseHTML`函数解析当前模板，并传入了包含`start`，`end`，`chars`，`comment`四个处理函数，分别用于处理模板标签的开始，结束，纯文本、注释等字符串，在`parseHTML` 函数解析模板字符串的过程中，如果遇到文本信息，就会调用文本解析器`parseText`函数进行文本解析；如果遇到文本中包含过滤器，就会调用过滤器解析器`parseFilters`函数进行解析。下面我们看一下`parseHTML`的源码：

## HTML解析器

```js
export function parseHTML (html, options) {
  const stack = []
  let index = 0
  let last, lastTag

  while (html) {
    last = html
    // Comment:
    if (comment.test(html)) {
      const commentEnd = html.indexOf('-->')

      if (commentEnd >= 0) {
        if (options.shouldKeepComment) {
          options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3)
        }
        advance(commentEnd + 3)
        continue
      }
    }

    // Doctype:
    const doctypeMatch = html.match(doctype)
    if (doctypeMatch) {
      advance(doctypeMatch[0].length)
      continue
    }

    // End tag:
    const endTagMatch = html.match(endTag)
    if (endTagMatch) {
      const curIndex = index
      advance(endTagMatch[0].length)
      parseEndTag(endTagMatch[1], curIndex, index)
      continue
    }

    // Start tag:
    const startTagMatch = parseStartTag()
    if (startTagMatch) {
      handleStartTag(startTagMatch)
      if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
        advance(1)
      }
      continue
    }
  }

  // Clean up any remaining tags
  parseEndTag()
  
 // 移动游标方法
 function advance(n) {
    index += n
    html = html.substring(n)
 }
   //parse 开始标签
 function parseStartTag() {

 }
 //处理 parseStartTag 的结果
 function handleStartTag(match) {

 }
 //parse 结束标签
 function parseEndTag(tagName, start, end) {

 }
}
```

经过精简后的`parseHTML`函数就如上面的代码所示，函数的解析主要分为注释节点，Doctype节点，结束标签和开始标签。

### 注释节点

```js
const comment = /^<!\--/

if (comment.test(html)) {
  const commentEnd = html.indexOf('-->')

  if (commentEnd >= 0) {
    if (options.shouldKeepComment) {
      options.comment(html.substring(4, commentEnd), index, index + commentEnd + 3)
    }
    advance(commentEnd + 3)
    continue
  }
}
```

在上面代码中，如果模板字符串html符合注释开始的正则，那么就继续向后查找是否存在`-->`，若存在，则把html从第4位`<!--`(长度为4）开始截取，直到`-->`处，截取得到的内容就是注释的真实内容，然后调用4个钩子函数中的`comment`函数，将真实的注释内容传进去，创建注释类型的AST节点。

上面代码中有一处值得注意的地方，那就是我们平常在模板中可以在`<template></template>`标签上配置`comments`选项来决定在渲染模板时是否保留注释，对应到上面代码中就是`options.shouldKeepComment`,如果用户配置了`comments`选项为`true`，则`shouldKeepComment`为`true`，则创建注释类型的AST节点，如不保留注释，则将游标移动到`-->`之后，继续向后解析。

advance函数是用来移动解析游标的，解析完一部分就把游标向后移动一部分，确保不会重复解析。

```js
comment (text: string, start, end) {
  const child: ASTText = {
    type: 3,
    text,
    isComment: true
  }
  currentParent.children.push(child)
}
```

以上是`parse`函数中传入的生成注释虚拟节点的代码，其实就是创建了一个表示为注释节点的虚拟节点，并将其插入到根节点的子节点数组中。

### Doctype节点

Doctype节点无需解析，直接跳过

### 开始标签

```js
const startTagMatch = parseStartTag()
if (startTagMatch) {
  handleStartTag(startTagMatch)
  if (shouldIgnoreFirstNewline(startTagMatch.tagName, html)) {
    advance(1)
  }
  continue
}
```

解析开始标签主要由`parseStartTag`，`handleStartTag`两个函数进行处理，下面我们看下源码：

```js
function parseStartTag () {
  const start = html.match(startTagOpen)
  if (start) {
    const match = {
      tagName: start[1],
      attrs: [],
      start: index
    }
    advance(start[0].length)
    let end, attr
    while (
      !(end = html.match(startTagClose)) &&
      (attr = html.match(dynamicArgAttribute) || html.match(attribute))
      ) {
      attr.start = index
      advance(attr[0].length)
      attr.end = index
      match.attrs.push(attr)
    }
    if (end) {
      match.unarySlash = end[1]
      advance(end[0].length)
      match.end = index
      return match
    }
  }
}
```

该函数的主要作用是解析开始标签，并返回一个如下对象：

```js
{
  attrs: [
    [" id="demo"", "id", "=", "demo", undefined, undefined]
  ],
  end: 15,
  start: 0,
  tagName: "div",
  unarySlash: ""
}
```

其中提取出标签的属性以及开始结束位置，同时`unarySlash`用来表示当前标签是否是自闭合标签

```js
function handleStartTag (match) {
  const tagName = match.tagName
  const unarySlash = match.unarySlash

  if (expectHTML) {
    if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
      parseEndTag(lastTag)
    }
    if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
      parseEndTag(tagName)
    }
  }

  const unary = isUnaryTag(tagName) || !!unarySlash

  const l = match.attrs.length
  const attrs = new Array(l)
  for (let i = 0; i < l; i++) {
    const args = match.attrs[i]
    const value = args[3] || args[4] || args[5] || ''
    const shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
      ? options.shouldDecodeNewlinesForHref
      : options.shouldDecodeNewlines
    attrs[i] = {
      name: args[1],
      value: decodeAttr(value, shouldDecodeNewlines)
    }
    if (process.env.NODE_ENV !== 'production' && options.outputSourceRange) {
      attrs[i].start = args.start + args[0].match(/^\s*/).length
      attrs[i].end = args.end
    }
  }

  if (!unary) {
    stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs, start: match.start, end: match.end })
    lastTag = tagName
  }

  if (options.start) {
    options.start(tagName, attrs, unary, match.start, match.end)
  }
}
```

`handleStartTag`函数的主要是将得到的属性数组进一步整理，得到如下attrs：

```js
attrs:[{
  end: 14
  name: "id"
  start: 5
  value: "demo"
}]
```

最后调用传入的start函数进行进一步解析。传入该函数的参数分别为：

* tagName：标签名
* attrs：属性值
* unary：是否是自闭合标签
* match.start：开始标签开始位置
* match.end：开始标签结束位置

下面我们看一下start函数

```js
start (tag, attrs, unary, start, end) {
  // check namespace.
  // inherit parent ns if there is one
  const ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag)

  let element: ASTElement = createASTElement(tag, attrs, currentParent)
  if (ns) {
    element.ns = ns
  }

  if (isForbiddenTag(element) && !isServerRendering()) {
    element.forbidden = true
  }

  // apply pre-transforms
  for (let i = 0; i < preTransforms.length; i++) {
    element = preTransforms[i](element, options) || element
  }

  if (!inVPre) {
    processPre(element)
    if (element.pre) {
      inVPre = true
    }
  }
  if (platformIsPreTag(element.tag)) {
    inPre = true
  }
  if (inVPre) {
    processRawAttrs(element)
  } else if (!element.processed) {
    // structural directives
    processFor(element)
    processIf(element)
    processOnce(element)
  }

  if (!root) {
    root = element
  }

  if (!unary) {
    currentParent = element
    stack.push(element)
  } else {
    closeElement(element)
  }
}
```

该函数主要做了两件事：

* 解析属性列表中特殊的`v-pre`，`v-if`，`v-for`，`v-once`等内置指令，具体看起源码就是根据不同的指令在`element`对象上添加特定的标志属性，以方便后续生成render函数。

* 检查当前的元素是否为自闭合标签，如果是自闭合标签则调用`closeElement`来关闭当前标签，如果不是，则在标签层级栈`stack`中压入当前元素，以保证当前用户书写的模板层级是正确的。

### 结束标签

```js
const endTagMatch = html.match(endTag)
if (endTagMatch) {
  const curIndex = index
  advance(endTagMatch[0].length)
  parseEndTag(endTagMatch[1], curIndex, index)
  continue
}
```

解析结束标签的代码相对简单，源码是匹配到结束标签后即将游标向后移动结束标签大小的位移量，之后调用`parseEndTag`去处理当前的结束标签

```js

function parseEndTag (tagName, start, end) {
  let pos, lowerCasedTagName
  if (start == null) start = index
  if (end == null) end = index

  // Find the closest opened tag of the same type
  if (tagName) {
    lowerCasedTagName = tagName.toLowerCase()
    for (pos = stack.length - 1; pos >= 0; pos--) {
      if (stack[pos].lowerCasedTag === lowerCasedTagName) {
        break
      }
    }
  } else {
    // If no tag name is provided, clean shop
    pos = 0
  }

  if (pos >= 0) {
    // Close all the open elements, up the stack
    for (let i = stack.length - 1; i >= pos; i--) {
      if (options.end) {
        options.end(stack[i].tag, start, end)
      }
    }

    // Remove the open elements from the stack
    stack.length = pos
    lastTag = pos && stack[pos - 1].tag
  } else if (lowerCasedTagName === 'br') {
    if (options.start) {
      options.start(tagName, [], true, start, end)
    }
  } else if (lowerCasedTagName === 'p') {
    if (options.start) {
      options.start(tagName, [], false, start, end)
    }
    if (options.end) {
      options.end(tagName, start, end)
    }
  }
}
```

该函数接收三个参数，分别是结束标签名tagName、结束标签在html字符串中的起始和结束位置start和end。

这三个参数其实都是可选的，根据传参的不同其功能也不同。

* 第一种是三个参数都传递，用于处理普通的结束标签
* 第二种是只传递tagName
* 第三种是三个参数都不传递，用于处理栈中剩余未处理的标签

如果tagName存在，那么就从后往前遍历栈，在栈中寻找与tagName相同的标签并记录其所在的位置pos，如果tagName不存在，则将pos置为0。如下：

```js
if (tagName) {
  for (pos = stack.length - 1; pos >= 0; pos--) {
    if (stack[pos].lowerCasedTag === lowerCasedTagName) {
      break
      }
  }
} else {
    // If no tag name is provided, clean shop
  pos = 0
}
```

接着当pos>=0时，开启一个for循环，从栈顶位置从后向前遍历直到pos处，如果发现stack栈中存在索引大于pos的元素，那么该元素一定是缺少闭合标签的。这是因为在正常情况下，stack栈的栈顶元素应该和当前的结束标签tagName 匹配，也就是说正常的pos应该是栈顶位置，后面不应该再有元素，如果后面还有元素，那么后面的元素就都缺少闭合标签 那么这个时候如果是在非生产环境会抛出警告，告诉你缺少闭合标签。除此之外，还会调用 options.end(stack[i].tag, start, end)立即将其闭合，这是为了保证解析结果的正确性。最后把pos位置以后的元素都从stack栈中弹出，以及把lastTag更新为栈顶元素:

后续，因为浏览器会自动把`</br>`标签解析为正常的 `<br>`标签，而对于`</p>`浏览器则自动将其补全为`<p></p>`，所以Vue为了与浏览器对这两个标签的行为保持一致，故对这两个便签单独判断处理。

另外，在`while`循环后面还有一行代码：

```js
parseEndTag()
```

这行代码执行的时机是`html === last`，即html字符串中的标签格式有误时会跳出`while`循环，此时就会执行这行代码，这行代码是调用`parseEndTag`函数并不传递任何参数，前面我们说过如果`parseEndTag`函数不传递任何参数是用于处理栈中剩余未处理的标签。这是因为如果不传递任何函数，此时`parseEndTag`函数里的`pos`就为`0`，那么`pos>=0`就会恒成立，那么就会逐个警告缺少闭合标签，并调用 `options.end`将其闭合

## 文本解析器

在上篇文章中我们说了，当HTML解析器解析到文本内容时会调用4个钩子函数中的`chars`函数来创建文本型的AST节点，并且也说了在`chars`函数中会根据文本内容是否包含变量再细分为创建含有变量的AST节点和不包含变量的AST节点，如下：

```js
// 当解析到标签的文本时，触发chars
chars (text) {
  if(res = parseText(text)){
       let element = {
           type: 2,
           expression: res.expression,
           tokens: res.tokens,
           text
       }
    } else {
       let element = {
           type: 3,
           text
       }
    }
}
```

从上面代码中可以看到，创建含有变量的AST节点时节点的type属性为2，并且相较于不包含变量的AST节点多了两个属性：`expression`和`tokens`。那么如何来判断文本里面是否包含变量以及多的那两个属性是什么呢？这就涉及到文本解析器了，当Vue用HTML解析器解析出文本时，再将解析出来的文本内容传给文本解析器，最后由文本解析器解析该段文本里面是否包含变量以及如果包含变量时再解析`expression`和`tokens`。那么接下来，本篇文章就来分析一下文本解析器都干了些什么。

### 解析结果

研究文本解析器内部原理之前，我们先来看一下由HTML解析器解析得到的文本内容经过文本解析器后输出的结果是什么样子的，这样对我们后面分析文本解析器内部原理会有很大的帮助。

从上面`chars`函数的代码中可以看到，把HTML解析器解析得到的文本内容text传给文本解析器`parseText`函数，根据`parseText`函数是否有返回值判断该文本是否包含变量，以及从返回值中取到需要的`expression`和`tokens`。那么我们就先来看一下`parseText`函数如果有返回值，那么它的返回值是什么样子的。

假设现有由HTML解析器解析得到的文本内容如下：

```js
let text = "我叫{{name}}，我今年{{age}}岁了"
经过文本解析器解析后得到：

let res = parseText(text)
res = {
  expression:"我叫"+_s(name)+"，我今年"+_s(age)+"岁了",
  tokens:[
      "我叫",
      {'@binding': name },
      "，我今年"
      {'@binding': age },
    "岁了"
  ]
}
```

从上面的结果中我们可以看到，`expression`属性就是把文本中的变量和非变量提取出来，然后把变量用`_s()`包裹，最后按照文本里的顺序把它们用+连接起来。而`tokens`是个数组，数组内容也是文本中的变量和非变量，不一样的是把变量构造成`{'@binding': xxx}`。

那么这样做有什么用呢？这主要是为了给后面代码生成阶段的生成`render`函数时用的，这个我们在后面介绍代码生成阶段是会详细说明，此处暂可理解为单纯的在构造形式。

OK，现在我们就可以知道文本解析器内部就干了三件事：

* 判断传入的文本是否包含变量
* 构造expression
* 构造tokens

那么接下来我们就通过阅读源码，逐行分析文本解析器内部工作原理。

文本解析器的源码位于 `src/compiler/parser/text-parsre.js` 中，代码如下，且有详细注释：

```js
const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g
const buildRegex = cached(delimiters => {
  const open = delimiters[0].replace(regexEscapeRE, '\\$&')
  const close = delimiters[1].replace(regexEscapeRE, '\\$&')
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
})
export function parseText (text,delimiters) {
  const tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE
  if (!tagRE.test(text)) {
    return
  }
  const tokens = []
  const rawTokens = []
  let lastIndex = tagRE.lastIndex = 0
  let match, index, tokenValue
  while ((match = tagRE.exec(text))) {
    index = match.index
    // push text token
    if (index > lastIndex) {
      // 先把'{{'前面的文本放入tokens中
      rawTokens.push(tokenValue = text.slice(lastIndex, index))
      tokens.push(JSON.stringify(tokenValue))
    }
    // tag token
    // 取出'{{ }}'中间的变量exp
    const exp = parseFilters(match[1].trim())
    // 把变量exp改成_s(exp)形式也放入tokens中
    tokens.push(`_s(${exp})`)
    rawTokens.push({ '@binding': exp })
    // 设置lastIndex 以保证下一轮循环时，只从'}}'后面再开始匹配正则
    lastIndex = index + match[0].length
  }
  // 当剩下的text不再被正则匹配上时，表示所有变量已经处理完毕
  // 此时如果lastIndex < text.length，表示在最后一个变量后面还有文本
  // 最后将后面的文本再加入到tokens中
  if (lastIndex < text.length) {
    rawTokens.push(tokenValue = text.slice(lastIndex))
    tokens.push(JSON.stringify(tokenValue))
  }

  // 最后把数组tokens中的所有元素用'+'拼接起来
  return {
    expression: tokens.join('+'),
    tokens: rawTokens
  }
}
```

默认的绑定文本用`{{}}`来做，这里我们可以通过定义`delimiters`来改变绑定的符号，例如：

```js
{
  delimiters:['${','}'] // 修改绑定符号为es6的绑定习惯
}
```

## 总结

至此，本文讲述了HTML解析和文本解析的代码执行过程，解析完代码后，会返回一个类似如下结构的抽象语法树

```js
{
  attrs: [{…}],
  attrsList: [{…}],
  attrsMap: {id: "demo"},
  children: [{…}, {…}, {…}],
  end: 150,
  parent: undefined,
  plain: false,
  rawAttrsMap: {id: {…}},
  start: 0,
  static: false,
  staticRoot: false,
  tag: "div",
  type: 1
}
```

当然，其中会根据我们书写的个性化属性或是vue内部指令来添加各种不同的属性，从而满足后续生成render函数的需求。
