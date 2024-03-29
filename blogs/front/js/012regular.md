---
title: 正则表达式
date: 2020-06-23
sidebar: 'auto'
tags:
 - js 
 - 正则表达式
categories:
 - 前端
---

正则表达式描述了一种字符串匹配的模式，可以用来检查一个串是否包含某种子串、将匹配的子串替换或者从某个子串中取出符合某个条件的子串等。

## 语法

### 限定符

| 字符 | 描述 |
| ------ | ------ | ------ |
| * | 匹配前面的子表达式0次或多次，例如zo*能匹配z以及zooo,等级于zo{0,} |
| + | 匹配前面的子表达式一次或多次，例如zo+能匹配zo以及zoooo，但不能匹配z，等价于zo{1,} |
| ? | 匹配前面的子表达式0次或一次，例如zo?能匹配zo以及z，但不能匹配zoo，等价于zo{0,1} |
| {n} | n是非负整数，匹配确定的n次，例如zo{2}，能匹配zoo，但是不能匹配z |
| {n,} | n是非负整数，至少匹配n次，例如zo{2,}，能匹配zooooo，但是不能匹配z |
| {n,m} | n,m是非负整数，n < m, 至少匹配n次且最多匹配m次，例如zo{2,4}，能匹配zooo，但是不能匹配zooooo |

### 定位符

| 字符 | 描述 |
| ------ | ------ | ------ |
| ^ | 匹配输入字符串开始的位置，如果设置了Multiline,^还会与\n或\r之后的位置匹配 |
| $ | 匹配输入字符串结尾的位置，如果设置了Multiline,$还会与\n或\r之前的位置匹配 |


### 特殊字符
| 字符 | 描述 |
| ------ | ------ | ------ |
| ```$``` | ```\$``` |
| ```()``` | ```\(\)``` |
| ```*``` | ```\*``` |
| ```+``` | ```\+``` |
| ```.``` | ```\.``` |
| ```[]``` | ```\[\]``` |
| ```?``` | ```\?``` |
| ```\``` | ```\\``` |
| ```^``` | ```\^``` |
| ```{}``` |```\{\}``` |
| ```|``` | ```\|``` |

### 元字符

| 字符 | 描述 |
| ------ | ------ | ------ |
| (pattern) | 匹配 pattern 并获取这一匹配。所获取的匹配可以从产生的 Matches 集合得到 |
| x|y | 匹配 x 或 y。例如，'z|food' 能匹配 "z" 或 "food"。'(z|f)ood' 则匹配 "zood" 或 "food"。 |
| [xyz] | 字符集合。匹配所包含的任意一个字符。例如， '[abc]' 可以匹配 "plain" 中的 'a'。 | 
| [^xyz] | 负值字符集合。匹配未包含的任意字符。例如， '[^abc]' 可以匹配 "plain" 中的'p'、'l'、'i'、'n'。 | 
| [a-z] |	字符范围。匹配指定范围内的任意字符。例如，'[a-z]' 可以匹配 'a' 到 'z' 范围内的任意小写字母字符。|
| [^a-z] |	负值字符范围。匹配任何不在指定范围内的任意字符。例如，'[^a-z]' 可以匹配任何不在 'a' 到 'z' 范围内的任意字符。|
| \b | 匹配一个单词边界，也就是指单词和空格间的位置。例如， 'er\b' 可以匹配"never" 中的 'er'，但不能匹配 "verb" 中的 'er'。|
|\B	| 匹配非单词边界。'er\B' 能匹配 "verb" 中的 'er'，但不能匹配 "never" 中的 'er'。|
|\d	| 匹配一个数字字符。等价于 [0-9]。|
|\D| 匹配一个非数字字符。等价于 [^0-9]。|
|\s| 匹配任何空白字符，包括空格、制表符、换页符等等。等价于 [ \f\n\r\t\v]。|
|\w|匹配字母、数字、下划线。等价于'[A-Za-z0-9_]'。|


## js中的正则表达式对象

js中的正则表达式由主体和修饰符组成

```/[0-9]/i```，其中[0-9]是正则表达的主体，在js中，正则表达式的主体需要放在```//```之间，```i```为修饰符。

* **修饰符的种类**

| 字符 | 描述 |
| ------ | ------ | ------ |
| i | 执行对大小写不敏感的匹配 |
| g | 执行全局匹配（查找所有匹配而不是在找到第一个匹配后就停止） |
| m | 执行多行匹配 |

### js中正则表达式的方法

* ```search()```查找第一个匹配的字符位置

```js
let str = "Visit w3cschool"; 
let n = str.search(/w3cschool/i); // 6
```

* ```replace()```替换字符串

```js
let str = "Visit Microsoft!"; 
let res = str.replace("Microsoft", "w3cschool"); // "Visit w3cschool"
```

* ```test()```方法检测是否满足条件

```js
let reg = /[0-9]/gi
reg.test(0); // true
reg.test('12'); // false
```

## 常用正则表达式

| 描述 | 正则表达式 |
| ------ | ------ | ------ |
| 非负整数 | ```^\d+$ 或 ^[1-9]\d*|0$``` |
| 汉字     |```^[\u4e00-\u9fa5]{0,}$```|
| 邮箱地址|```^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$```|
|手机号码|```^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$```|
|电话号码| ```^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$```|
|身份证号|```(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)```|
|密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)|```^[a-zA-Z]\w{5,17}$```|
|强密码(必须包含大小写字母和数字的组合，不能使用特殊字符，长度在 8-10 之间)|```^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,10}$```|
|强密码(必须包含大小写字母和数字的组合，可以使用特殊字符，长度在8-10之间)|```^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$```|
|中国邮政编码(中国邮政编码为6位数字)|```[1-9]\d{5}(?!\d) ```|
|不包含特殊于字符|```[^\\\/\*\(\)\+\.\[\]\?\^\{\}\|~!@#$%^&<\-=>`·,，。.;:：丶丨；‘’'"！@￥……《》【】、？]+```|