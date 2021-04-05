---
title: JavaScript Console 对象
categories:
- JavaScript
tags:
- JavaScript

date: 2018/11/24 14:33:01
---
了解console.log对象可以更好地调试代码

<!--more-->

# Console 对象用于 JavaScript 调试。

JavaScript 原生中默认是没有 Console 对象,这是宿主对象（也就是游览器）提供的内置对象。 用于访问调试控制台, 在不同的浏览器里效果可能不同。

### Console 对象常见的两个用途：

- 显示网页代码运行时的错误信息。
- 提供了一个命令行接口，用来与网页代码互动。

Chrome和大部分浏览器都可以通过F12调出这个窗口


![QQ截图20180624173440.jpg-180.7kB][1]



在console面板输入 for(var i in console){console.log(i)} 可列出所有Console方法

![QQ截图20180624172456.jpg-17.3kB][2]

# log()
console上述的集中度支持printf的占位符格式，支持的占位符有：字符（%s）、整数（%d或%i）、浮点数（%f）和对象（%o）:

|占位符|作用|
|--|--|
|%s	|字符串
|%d or %i|	整数|
|%f	|浮点数
|%o	|可展开的DOM
|%O	|列出DOM的属性
|%c	|根据提供的css样式格式化字符串 

在console.log里使用CSS：

![QQ截图20180701164114.jpg-3.6kB][3]

# info() warn() error()

![QQ截图20180701164446.jpg-5.4kB][4]
# assert()

assert方法接受两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为false，才会输出第二个参数，否则不会有任何结果。
	
![QQ截图20180701164553.jpg-9.5kB][5]

# clear()
清除当前控制台的所有输出，将光标回置到第一行。

# count()
用于计数，输出它被调用了多少次。
![QQ截图20180701164655.jpg-5.9kB][6]

# group() /groupCollapsed()/ groupEnd()

用于将显示的信息分组，可以把信息进行折叠和展开。

![QQ截图20180701165030.jpg-9.9kB][7]


与console.group方法很类似，唯一的区别是该组的内容，在第一次显示时是收起的（collapsed），而不是展开的。



# table()
将复合类型的数据转为表格显示


![QQ截图20180701165231.jpg-19.1kB][8]


# time()
计时
![QQ截图20180701165301.jpg-16.1kB][9]

# trace()

追踪函数的调用过程

![QQ截图20180701165346.jpg-14.9kB][10]

# dirxml()
用来显示网页的某个节点（node）所包含的html/xml代码。
![QQ截图20180701165525.jpg-9.9kB][11]


# profile() 
  性能分析（Profiler）就是分析程序各个部分的运行时间，找出瓶颈所在。

```
function All() {
  for (var i = 0; i < 10; i++) {
    funcA(1000);
  }　　　　
  funcB(10000);　　
}
function funcA(count) {　　　　
  for (var i = 0; i < count; i++) {}　　
}
function funcB(count) {　　　　
  for (var i = 0; i < count; i++) {}　　
}
console.profile('性能分析器');
All();　　
console.profileEnd();
```

# dir()
console.dir()方法用来对一个对象进行检查，并以易于阅读和打印的格式显示。类似于log()，但可以显示一个对象所有的属性和方法。
![QQ截图20180701165955.jpg-32.8kB][12]


[1]: http://static.zybuluo.com/CatcherInSky/vetmmpb07o3kw9wtkdjl7ql8/QQ%E6%88%AA%E5%9B%BE20180624173440.jpg
[2]: http://static.zybuluo.com/CatcherInSky/bctmqx8jgw1uhextlg24382l/QQ%E6%88%AA%E5%9B%BE20180624172456.jpg
[3]: http://static.zybuluo.com/CatcherInSky/qkwoqyz7osqiyifxm8btldql/QQ%E6%88%AA%E5%9B%BE20180701164114.jpg
[4]: http://static.zybuluo.com/CatcherInSky/j7u766z7oqyjr74k2bszgm4b/QQ%E6%88%AA%E5%9B%BE20180701164446.jpg
[5]: http://static.zybuluo.com/CatcherInSky/co8xwlzznrioh8qqxhtxkl97/QQ%E6%88%AA%E5%9B%BE20180701164553.jpg
[6]: http://static.zybuluo.com/CatcherInSky/tyyulbyn4lvfyjxymp9ehghi/QQ%E6%88%AA%E5%9B%BE20180701164655.jpg
[7]: http://static.zybuluo.com/CatcherInSky/gsh1268quoc6u2voa1s8w65v/QQ%E6%88%AA%E5%9B%BE20180701165030.jpg
[8]: http://static.zybuluo.com/CatcherInSky/wkow78bevs8you314m250i0t/QQ%E6%88%AA%E5%9B%BE20180701165231.jpg
[9]: http://static.zybuluo.com/CatcherInSky/9w1b0w421r0e9izmr7ig8751/QQ%E6%88%AA%E5%9B%BE20180701165301.jpg
[10]: http://static.zybuluo.com/CatcherInSky/rlq6w82d145r3t0ispju0dwq/QQ%E6%88%AA%E5%9B%BE20180701165346.jpg
[11]: http://static.zybuluo.com/CatcherInSky/rq0hn9dcsumxsghhjhku083y/QQ%E6%88%AA%E5%9B%BE20180701165525.jpg
[12]: http://static.zybuluo.com/CatcherInSky/a9i0yla8pjgmrdngdloqt0f2/QQ%E6%88%AA%E5%9B%BE20180701165955.jpg