---
title: MySQL操作一览
categories:
- SQL
tags:
- SQL
- DataBase
- MySQL

date: 2019/02/23 20:50:45
---

SQL基本操作指令

<!--more-->

# MySQL操作一览

---
BY [wid][1]
---
## 一、概念
  SQL即为Structured Query Language(结构化查询语言)
  MySQL 为关系型数据库(Relational Database Management System), 这种所谓的"关系型"可以理解为"表格"的概念, 一个关系型数据库由一个或数个表格组成, 如图所示的一个表格:
![此处输入图片的描述][2]
- 表头(header): 每一列的名称;
- 列(column): 具有相同数据类型的数据的集合;
- 行(row): 每一行用来描述某个人/物的具体信息;
- 值(value): 行的具体信息,每个值必须与该列的数据类型相同;
- 键(key): 表中用来识别某个特定的人\物的方法,键的值在当前列中具有唯一性。
## 一、安装信息
配置的端口：3306

用户：Root:539450;CatcherInSky:zxc123

Windows Service Name: MySQL57

服务：控制面板->系统与安全->管理工具->服务 可停用、重启与卸载MySQL服务

路径：C:\Program Files\MySQL\MySQL Server 5.7\bin

## 二、基础操作
### 1.用户行为
- #### 2.1.1.登录
cmd进入安装路径，输入
>mysql -D 数据库名 -h 主机名 -u 用户名 -p；

### 2.库的操作
- #### 2.2.1创建数据库
>create database 数据库名 其它选项；

- #### 2.2.2查看数据库
>show databases；

- #### 2.2.3登录数据库
>use 数据库名（库声明）;

    声明如： character set gbk 可将数据库字符编码指定为 gbk

- #### 2.2.4删除数据库
>drop database 数据库名;

### .表的操作
- #### 2.3.1创建数据库表
>create table 表名称(列声明);

    对于一些较长的语句在命令提示符下可能容易输错,因此我们可以通过任何文本编辑器将语句输入好后保存为 createtable.sql 的文件中, 通过命令提示符下的文件重定向执行执行该脚本。

 >mysql -D samp_db -u root -p < createtable.sql；

    (提示: 1.如果连接远程主机请加上 -h 指令; 2. 该文件若不在当前工作目录下需指定文件的完整路径。)
    
    列声明首项为列的名称后面为数据类型描述。

- #### 2.3.2查看数据库表
    查看所有表名称
 >show tables;

    查看某个表的详细信息
>describe 表名;

- #### 2.3.4删除数据库表

 >drop table 表名;

- #### 2.3.5重命名数据库表

 >alter table 表名 rename 新表名;

- #### 2.3.6修改数据库表
 alter table 语句用于创建后对表的修改, 基础用法如下:

 - 2.3.6.1添加列

    >alter table 表名 add 列名 列数据类型 [after 插入位置];

    示例:在表的最后追加列 address: 
    
    >alter table students add address char(60);

    示例：在名为 age 的列后插入列 
>birthday: alter table students add birthday date after age;

 - 2.3.6.2修改列

    >alter table 表名 change 列名称 列新名称 新数据类型;

    示例：将表 tel 列改名为 telphone
>alter table students change tel telphone char(13) default "-";

    示例：将 name 列的数据类型改为 char(16)
>alter table students change name name char(16) not null;

 - 2.3.6.3删除列

    >alter table 表名 drop 列名称;

    示例:删除 birthday 列: 
    
    >alter table students drop birthday;



### 4.值的操作
- #### 2.4.1插入数据

 >insert [into] 表名 [(列名1, 列名2, ...)] values (值1, 值2,  ...);

 从第一列数据开始写全部数据
>insert into students values(NULL, "王刚", "男", 20,"13811371377");

 从某列开始写部分数据
>insert into students (name, sex, age) values("孙丽华", "女", 21);



- #### 2.4.2查询表中的数据
>select 列名称 from 表名称 where 特定条件;

    也可以使用通配符 * 查询表中所有的内容。where 子句不仅仅支持 "where 列名 = 值" 这种名等于值的查询形式,对一般的比较运算的运算符都是支持的, 例如 =、>、<、>=、<、!=以及一些扩展运算符 is [not] null、in、like 等等。 还可以对查询条件使用 or 和 and 进行组合查询
    
    示例:查询年龄在21岁以上的所有人信息: 
>select * from students where age > 21;

    示例:查询名字中带有 "王" 字的所有人信息: 
>select * from students where name like "%王%";

    示例:查询id小于5且年龄大于20的所有人信息: 
>select * from students where id<5 and age>20;

- #### 2.4.3更新表中的数据
 >update 表名称 set 列名称=新值 更新条件;

- #### 2.4.4删除表中数据

 >delete from 表名称 where 删除条件;

 不加条件删除所有数据


[1]: http://www.cnblogs.com/mr-wid/archive/2013/05/09/3068229.html
[2]: http://images.cnitblog.com/blog/453818/201305/09030127-13657abaf11945d1916297e6d23f2ec9.png