---
title: 数据库基础--MYSQL
date: 2020-06-24
tags:
 - 数据库
 - sql
categories:
 - 后端
---

::: tip
MySQL 是最流行的关系型数据库管理系统，
在 WEB 应用方面 MySQL 是最好的 RDBMS(Relational Database Management System：关系数据库管理系统)应用软件之一。
:::
<!-- more -->

## 基础操作

### 登录数据库
```bash
mysql -u root -p  #回车后输入密码

Enter password: ******  # 登录后进入终端
```

### 创建数据库
```sql
CREATE DATABASE 数据库名;
```

以下命令会检查是否存在数据库RUNOOB并设置字符编码为utf-8，如果不存在则创建该数据库，如果存在则不处理。

```sql
CREATE DATABASE IF NOT EXISTS RUNOOB DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
```

### 删除数据库

```sql
DROP DATABASE 数据库名;
```

### 选择数据库

选择数据库后，以后的所有操作都是在该数据库下完成的。

```sql
use 数据库名;
```

### 创建数据表

```sql
CREATE TABLE table_name (column_name column_type);
```

**实例：**

* 如果你不想字段为 NULL 可以设置字段的属性为 `NOT NULL`， 在操作数据库时如果输入该字段的数据为`NULL` ，就会报错。

* `AUTO_INCREMENT`定义列为自增的属性，一般用于主键，数值会自动加1。

* `PRIMARY KEY`关键字用于定义列为主键。 您可以使用多列来定义主键，列间以逗号分隔。

* `ENGINE` 设置存储引擎，`CHARSET` 设置编码。

```sql
CREATE TABLE IF NOT EXISTS `users`(
   `id` INT UNSIGNED AUTO_INCREMENT,
   `name` VARCHAR(100) NOT NULL,
   `age` VARCHAR(40) NOT NULL,
   `create_date` DATE,
   PRIMARY KEY ( `id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```
### 删除数据表

```sql
DROP TABLE table_name;
```

### 插入数据

```sql
-- 插入单条数据
INSERT INTO table_name (field1, field2,...) VALUES (value1, value2,...);

-- 插入多条数据
INSERT INTO table_name (field1, field2,...) 
                        VALUES 
                       (value1, value2,...),
                       (value11, value22,...),
                       (value1, value2,...),
                       ....;

-- 如果所有列都需要添加数据则可以不写field部分
INSERT INTO table_name VALUES (value1, value2,...);
```

### 选择数据

基础选择语句

```sql
SELECT column_name,column_name
FROM table_name
[WHERE Clause]
[LIMIT N][ OFFSET M]
```

* `limit y` 分句表示: 读取 `y` 条数据

* `limit x, y` 分句表示: 跳过 `x` 条数据，读取 `y` 条数据

* `limit y offset x` 分句表示: 跳过 `x` 条数据，读取 `y` 条数据

```sql
-- 选取全部的数据
SELECT * FROM users;

-- 选取name和age列显示
SELECT name, age FROM user;

-- 按条件选取
SELECT name FROM users WHERE age > 10;

-- 限制选取的条数
SELECT * FROM users LIMIT 2;

-- 跳过2条选取3条数据
SELECT * FROM users LIMIT 2, 3;
SELECT * FROM users LIMIT 3 OFFSET 2;
```

### `WHERE`条件语句

```sql
SELECT field1, field2,...fieldN FROM table_name1, table_name2...
[WHERE condition1 [AND [OR]] condition2.....
```
**说明**

* 查询语句中你可以使用一个或者多个表，表之间使用逗号, 分割，并使用WHERE语句来设定查询条件。

* 你可以在 `WHERE` 子句中指定任何条件。

* 你可以使用 `AND` 或者 `OR` 指定一个或多个条件。

* `WHERE` 子句也可以运用于 SQL 的 `DELETE` 或者 `UPDATE` 命令。

* `WHERE` 子句类似于程序语言中的 if 条件，根据 MySQL 表中的字段值来读取指定的数据。

```sql
SELECT name FROM users WHERE id = 2 AND age > 18;
SELECT name FROM users WHERE id = 2 OR age > 18;
```
### `in`操作符

`in`操作符允许你在`WHERE`子句中规定多个值。反义词`NOT IN`


```sql
SELECT column_name(s)
FROM table_name
WHERE column_name IN (value1,value2,...);
```
```sql
-- 选取表中name为lisi和张三的数据项
SELECT * FROM users WHERE name IN ("lisi", "zhangsan");
-- 等价于下面这条语句
SELECT * FROM users WHERE name="lisi" OR name = "zhangsan";
```
### `BETWEEN`操作符

`BETWEEN` 操作符选取介于两个值之间的数据范围内的值。这些值可以是数值、文本或者日期。反义词`NOT BETWEEN`

```sql
-- 选取年龄在1-20之间的数据
SELECT * FROM users WHERE age BETWEEN 1 AND 20;
-- 选取名称介于'a' 到 'h'开头的数据项
SELECT * FROM users WHERE name BETWEEN 'A' AND 'H';
-- 选取创建时间介于'2016-05-10'到'2016-05-14'之间的数据
SELECT * FROM users WHERE createdate BETWEEN '2016-05-10' AND '2016-05-14';
```

### 更新数据

```sql
UPDATE table_name SET field1=new-value1, field2=new-value2
[WHERE Clause]
```
**注意**

* 你可以同时更新一个或多个字段。

* 你可以在 WHERE 子句中指定任何条件。

* 你可以在一个单独表中同时更新数据。

```sql
UPDATE users SET name = "zhangsan", age = 20 WHERE id = 3;
```

### 删除语句

```sql
DELETE FROM table_name [WHERE Clause]
```

**注意**

* 如果没有指定 WHERE 子句，MySQL 表中的所有记录将被删除。

* 你可以在 WHERE 子句中指定任何条件

* 您可以在单个表中一次性删除记录。

```sql
DELETE FROM users WHERE id = 2;
```

### `LINK`语句

```sql
SELECT field1, field2,...fieldN 
FROM table_name
WHERE field1 LIKE condition1 [AND [OR]] filed2 = 'somevalue'
```
**注意**

* `LIKE` 通常与 `%` 一同使用，类似于一个元字符的搜索。

```sql
SELECT * FROM users WHERE name LIKE '%s%' OR age LIKE "%1%";
```

### 排序

```sql
SELECT field1, field2,...fieldN FROM table_name1, table_name2...
ORDER BY field1 [ASC [DESC][默认 ASC]], [field2...] [ASC [DESC][默认 ASC]]
```

* 你可以使用任何字段来作为排序的条件，从而返回排序后的查询结果。

* 你可以设定多个字段来排序。

* 你可以使用 ASC 或 DESC 关键字来设置查询结果是按升序或降序排列。 默认情况下，它是按升序排列。

* 你可以添加 WHERE...LIKE 子句来设置条件。

```sql
-- 按照age字段降序排列
SELECT * FROM users ORDER BY age DESC;
```

### 别名

通过使用 SQL，可以为表名称或列名称指定别名。

```sql
SELECT column_name AS alias_name FROM table_name;
```

```sql
SELECT column_name(s) FROM table_name AS alias_name;
```
实例：
```sql
SELECT a.name AS aaa FROM users AS a;
```

### 连接

SQL join 用于把来自两个或多个表的行结合起来。

下图展示了`LEFT JOIN`、`RIGHT JOIN`、`INNER JOIN`、`OUTER JOIN` 相关的 7 种用法。

![sqljoin](~@Backend/database/images/sql-join.png)
 
#### `INNER JOIN`关键字

`INNER JOIN` 关键字在表中存在至少一个匹配时返回行。`INNER JOIN` 与 `JOIN` 是相同的。

```sql
SELECT column_name(s)
FROM table1
INNER JOIN table2
ON table1.column_name=table2.column_name;
```
![join](~@Backend/database/images/img_innerjoin.gif)

实例：
```sql
-- 选取users表中的name、age，和log表中的count字段组成新表，
-- 其中需要选取的数据为users.id = log.site_id
-- 降序排列
SELECT users.name, users.age, log.count 
FROM users 
INNER JOIN log 
ON users.id = log.site_id 
ORDER BY age DESC;
```
```sql
SELECT users.name, users.age, log.count 
FROM users 
INNER JOIN log 
ON users.id = log.site_id 
WHERE count > 20;
```
::: tip
数据库在通过连接两张或多张表来返回记录时，都会生成一张中间的临时表，然后再将这张临时表返回给用户。

在使用 left jion 时，on 和 where 条件的区别如下：

* 1、on 条件是在生成临时表时使用的条件，它不管 on 中的条件是否为真，都会返回左边表中的记录。

* 2、where 条件是在临时表生成好后，再对临时表进行过滤的条件。这时已经没有 left join 的含义（必须返回左边表的记录）了，条件不为真的就全部过滤掉。
:::

#### `LEFT JOIN`关键字


`LEFT JOIN` 关键字从左表（table1）返回所有的行，即使右表（table2）中没有匹配。

如果右表中没有匹配，则结果为 `NULL`。

```sql
SELECT column_name(s)
FROM table1
LEFT JOIN table2
ON table1.column_name=table2.column_name;
```
其中table1为左表，table2为右表；

实例：
```sql
-- 以users作为左表，log作为右表，选取字段
-- 连接条件为users.id = log.site_id
-- 最后对选取的临时表再做过滤，从中选取name不等于lisi的数据
SELECT users.name, users.age, log.count 
FROM users 
LEFT JOIN log 
ON users.id = log.site_id 
WHERE name!="lisi";
```
#### `RIGHT JOIN`关键字

同`LEFT JOIN`


#### `FULL OUTER JOIN`关键字

`FULL OUTER JOIN` 关键字只要左表（table1）和右表（table2）其中一个表中存在匹配，则返回行.

`FULL OUTER JOIN` 关键字结合了 LEFT JOIN 和 RIGHT JOIN 的结果。

mysql数据库暂不支持`FULL OUTER JOIN`关键字。

### mysql事务

MySQL 事务主要用于处理操作量大，复杂度高的数据。

事务处理可以用来维护数据库的完整性，要么全部执行，要么全部不执行。

**注意**

* `BEGIN` 或 `START TRANSACTION` 显式地开启一个事务；

* `COMMIT` 也可以使用 `COMMIT WORK`，不过二者是等价的。`COMMIT` 会提交事务，并使已对数据库进行的所有修改成为永久性的；

* `ROLLBACK` 也可以使用 `ROLLBACK WORK`，不过二者是等价的。回滚会结束用户的事务，并撤销正在进行的所有未提交的修改；

* `SAVEPOINT identifier`，`SAVEPOINT` 允许在事务中创建一个保存点，一个事务中可以有多个 `SAVEPOINT`；

* `RELEASE SAVEPOINT identifier` 删除一个事务的保存点，当没有指定的保存点时，执行该语句会抛出一个异常；

* `ROLLBACK TO SAVEPOINT identifier` 把事务回滚到标记点；

* `SET TRANSACTION` 用来设置事务的隔离级别。`InnoDB` 存储引擎提供事务的隔离级别有`READ UNCOMMITTED`、`READ COMMITTED`、`REPEATABLE READ` 和 `SERIALIZABLE`。

实例：

```sql
-- 开启事务
BEGIN;
INSERT INTO users (name, age) VALUES ("ww1", "40");
-- 保存点1
SAVEPOINT save1;
INSERT INTO users (name, age) VALUES ("ww2", "450");
-- 保存点2
SAVEPOINT save2;
INSERT INTO users (name, age) VALUES ("ww3", "4500");
-- 保存点3
SAVEPOINT save3;
-- 回滚保存点2
ROLLBACK TO SAVEPOINT save2;
-- COMMIT;
-- ROLLBACK;
```

### 修改数据表操作

#### 删除表字段

```sql
-- 删除users表的name字段
ALTER TABLE users DROP name;
```

#### 添加表字段
```sql
-- 向数据表users中添加age字段，类型bigint，不可为空，且默认值为10；
ALTER TABLE users ADD age BIGINT NOT NULL DEFAULT 10;
```
#### 修改字段

```sql
-- 修改字段类型
ALTER  TABLE users MODIFY age VARCHAR(45);

-- 修改字段名及类型
ALTER  TABLE users CHANGE age  ages CHAR(10);

-- 修改字段默认值
ALTER  TABLE users ALTER age SET DEFAULT "20";

-- 删除字段默认值
ALTER  TABLE users ALTER age DROP DEFAULT "20";
```

#### 修改表名

```sql
ALTER TABLE users RENAME TO people;
```

### sql函数

**SQL Aggregate 函数计算从列中取得的值，返回一个单一的值。**

有用的 Aggregate 函数：

* AVG() - 返回平均值

* COUNT() - 返回行数

* FIRST() - 返回第一个记录的值

* LAST() - 返回最后一个记录的值

* MAX() - 返回最大值

* MIN() - 返回最小值

* SUM() - 返回总和

**SQL Scalar 函数基于输入值，返回一个单一的值。**

有用的 Scalar 函数：

* UCASE() - 将某个字段转换为大写

* LCASE() - 将某个字段转换为小写

* MID() - 从某个文本字段提取字符，MySql 中使用

* SubString(字段，1，end) - 从某个文本字段提取字符

* LEN() - 返回某个文本字段的长度

* ROUND() - 对某个数值字段进行指定小数位数的四舍五入

* NOW() - 返回当前的系统日期和时间

* FORMAT() - 格式化某个字段的显示方式

```sql
-- 统计users表中全部的数据
SELECT COUNT(*) AS total FROM users;
-- 分页，查询10条数据之后的10条数据
-- SELECT * FROM users LIMIT pageSize * (currentPage - 1), pageSize;
SELECT * FROM users LIMIT 10, 10;
```