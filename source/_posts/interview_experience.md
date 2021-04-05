---
title:前端面试历程
categories:
- 
tags:
- 
display:no
date: 2017/12/16 23:47:41
---
## 前言



<!--more-->

# 前端面试历程

## 2019.07

### 07.28

#### 多益-投递

1.谈一谈对前端开发的理解，需要具备哪些知识和技术？你擅长哪方面？

运用HTML、CSS、JavaScript技术，通过react、vue等框架实现前台交互页面（网页、小程序），给用户良好的交互体验。并作为用户到后台的中介，完成数据的收集、传递与展示。
擅长页面的实现以及性能优化。

2.阐述你应聘该岗位的优势。（限100字）

具有UI库开发的经验，熟悉团队协作流程
具有良好沟通能力、较强学习能力、团队协作精神，能承受工作压力

3.令人崩溃的在线评测

IQ题加奥数

### 07.31

#### 网易

网易游戏通过手机登录投了两个岗位

互联网通过注册的CatcherInSky98@163.com又注册了一次

公众号通过身份证和手机号查询到的为163投递

## 2019.08

### 08.03

#### 网易

笔试

120分

20 单选

20 编程 （CSS写组件+用JavaScript写方法）

80 算法 https://www.nowcoder.com/discuss/216237



### 08.07

#### 4399

投简历

#### 虎牙内推

投简历



### 08.08

#### 网易

转投客户端/服务端开发

需再次笔试

看岗位要求



### 08.09

#### 网易

暂定客户端开发

#### 多益

**em/rem**

相对长度单位 **em相对于父元素，rem相对于根元素<html>元素**

chrome默认的字体大小是12px，也就是1em默认为12px，如果最外层的父元素直接把font-size设为1.5em，那么该元素的字体大小为18px（12*1.5）。

**堆排**

初始化建堆的时间复杂度为O(n)，排序重建堆的时间复杂度为nlog(n)

因为堆排序是就地排序，空间复杂度为常数：O(1)

**background-color/image**

background-color背景颜色是包含边框border，边框如果不设置颜色，默认会采用文本颜色，而文本颜色默认是黑色。

background-image背景图片

background-image背景图片占据了元素的全部尺寸，包括内边距padding和边框border，但不包括外边距margin。

https://blog.csdn.net/weimob258616/article/details/89162851

**SVG 路径 - <path>**

<path> 元素用于定义一个路径。

下面的命令可用于路径数据：

- M = moveto
- L = lineto
- H = horizontal lineto
- V = vertical lineto
- C = curveto
- S = smooth curveto
- Q = quadratic Bézier curve
- T = smooth quadratic Bézier curveto
- A = elliptical Arc
- Z = closepath

**注意：**以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。

```
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <path d="M150 0 L75 200 L225 200 Z" />
</svg>
```

**垃圾回收与内存泄漏**

**URL/URI**



### 08.11

#### 网易

笔试只能C/Java，做不动，告辞

#### 字节跳动

投了

#### 快手



### 08.25

#### 字节跳动

笔试

100/400

#### 快手

笔试



### 08.27

#### BIGO

投了

#### 电信

投了



### 08.29

#### 字节

视频面

UDP/TCP

POST/GET POST安全性

HTTP/2.0

```
给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
设计一个算法来计算你所能获取的最大利润。
注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
示例 1:
输入: [5,3,3,0,0,3,1,4]
输出: 6
function profits(arr){
    let n = arr.length,profit=0;
    for(let i=0;i<n-1;i++){
        if(arr[i]<arr[i+1]){
            profit+=arr[i+1]-arr[i]
        }
    }
    return profit
}
```



```
 * JS、CSS等静态资源路径，允许出现 ".."、"." 、 "//"，请简化这些资源路径，把它们变成最短字符串。
* 注：一个点（.）表示当前目录本身；此外，两个点 （..） 表示将目录切换到上一级（指向父目录）；两者都可以是复杂相对路径的组成部分。
* <script src="//s3.pstatp.com/eesz/.././resource/./bear/js//app.0fa757caa42b59caf8f0.js"></script>
* 示例：//s3.pstatp.com/eesz/.././resource/./bear/js//app.0fa757caa42b59caf8f0.js
* 结果：//s3.pstatp.com/resource/bear/js/app.0fa757caa42b59caf8f0.js

function shorten(str){
    let father = /\w+ \/ \. \. \//g      // eesz/..
    let self = /\.\//g             //./
    let double = /\/\//g
    str = str.replace(father,"")
    str = str.replace(self,"")
    str = str.replace(double,"")
    return str
}

function shorten2(str){
    let n = str.length,url = false;
    if(str.charAt(0)=="/"&&str.charAt(1)=="/"){
        url =true
        str = str.slice(2)
    }
    let arr = str.split("/")
    for(let i = 0;i< arr.length;i++){
        if(arr[i] === ""||arr[i]==="."){
            arr.splice(i,1)
            i--
        }else if(arr[i]===".."){
            arr.splice(i-1,2)
            i-=2
        }
    }
    str = arr.join("/")
    if(url){
        str = "//"+str
    }
    return str
}


var simplifyPath = function(path) {
    var result = ''  
    var tempPath = []
    var paths = path.split('/')
    paths.map(val => {
        if(val && val === '..') {
            tempPath.pop()
        }else if(val && val !== '.') {
            tempPath.push(val)
        }
    })
    tempPath.length ? result = '/'+tempPath.join('/') : result = '/'
    return result
};
```

## 2019.09

### 09.02

#### BIGO

笔试

一、单选

1. SQL

2. TCP/UDP

3. 保留地址**私有地址（内部局域网可以使用的）**

   **A级：10.0.0.0 - 10.255.255.255**

   **B级：172.16.0.0 - 172.31.255.255**

   **C级：192.168.0.0 - 192.168.255.255**

   **保留地址（特殊用途的）**

   **A类：127.X.X.X**

   **B类：169.254.X.X**

   扩展保留地址

   若干

4. 匿名函数与闭包

5. 栈

6. 进程与线程

7. 四次挥手

8. 进程从运行变等待（输入或输出事件发生 ）
   进程的状态有就绪、运行和阻塞3种。当一个就绪进程被调度程序选中，则该进程就从就绪变为运行；当一个运行的进程等待某事件或者申请的资源得不到满足时，则该进程由运行变为阻塞；当一个阻塞的进程等待的事件发生时，则该进程由阻塞变为就绪；当一个进程的时间片用完时，则该进程由运行变为就绪。

9. Promise

10. 稳定排序
    两个相等的元素排序过程不会交换位置
    [堆排序](https://baike.baidu.com/item/堆排序)、[快速排序](https://baike.baidu.com/item/快速排序)、[希尔排序](https://baike.baidu.com/item/希尔排序)、[直接选择排序](https://baike.baidu.com/item/直接选择排序)是不稳定的排序算法，而[基数排序](https://baike.baidu.com/item/基数排序)、[冒泡排序](https://baike.baidu.com/item/冒泡排序)、[直接插入排序](https://baike.baidu.com/item/直接插入排序)、[折半插入排序](https://baike.baidu.com/item/折半插入排序)、[归并排序](https://baike.baidu.com/item/归并排序)是稳定的排序算法。

11. 简单题

12. 简单题

13. CSS IE9兼容animation？单位？flex：3
    IE9 不支持animation

14. 多态作用：把不同的子类对象都当作父类来看，可以屏蔽不同子类对象之间的差异，写出通用的代码，做出通用的编程，以适应需求的不断变化。

    赋值之后，父类型的引用就可以根据当前赋值给它的子对象的特性以不同的方式运作。也就是说，父亲的行为像儿子，而不是儿子的行为像父亲。

    多态是面向对象的重要特性,简单点说:“**一个接口，多种实现**”，就是同一种事物表现出的多种形态。编程其实就是一个将具体世界进行抽象化的过程，多态就是抽象化的一种体现，把一系列具体事物的共同点抽象出来, 再通过这个抽象的事物, 与不同的具体事物进行对话。

15. HTNL标签

二、问答

1. 数据类型、typeof返回值
   string undefined number  null     boolean object symbol
   string undefined number  object  boolean object symbol function 
2. css三角形
3. 正则
4. 发布订阅模式
5. 回文链表
6. 新旧版本对比
7. 字符串是否全由字典中元素拼成

#### SHEIN

前端开发工程师

#### 3k游戏

### 09.05

#### BIG

以为一面很基础，看了一天的网络/浏览器/html/css

结果ES6+webpack+react

哎

Array/object 新方法

class继承

super

super.p

symbol

set(NAN) map

webpack

loader

pludgin

react异步

virtual dom

set  getElement set

输出什么

### 09.10

#### 三七

笔试

1. let const
2. JS 模块 AMD·CMD ComconJS·ES6
3. 私有地址
4. 没记
5. $(document).ready() window.onload()
6. 权限chmod chown 765 764
7. css优先级
8. css继承
9. http状态码
10. SQL语句
11. 同源策略
12. display none visibility hidden
13. BFC
14. var提升
15. 软件测试
16. 概率题
17. 作用域 this
18. 完全二叉树节点数和高度
19. 异步
20. 异步加载 defer sync
21. 股票LeetCode
22. object数组去重

### 09.13

投了一大波，我都忘记投了多少

### 09.14

#### 酷狗笔试

1. 变量提升，立即执行函数
   **匿名函数并不会提升**

2. HTTPS 443 

3. css优先

4. this

5. **<dl>     Definition  List
   <dt>列表标题</dt>    Title
   <dd>列表内容</dd>    Description
   </dl>**
   **<table>**
   **<tr><th>Month</th><th>Savings</th></tr> **

   **Row Head**

   **<tr><td>January</td><td>$100</td></tr>**
   **Description**
   **</table>**

6. 正则

7. HTTP状态码

8. LocalStorage

9. 跨域

10. 标准文档流 display:none不会
    使一个元素脱离标准文档流：

    　　　　（1）浮动

    　　　　（2）绝对定位

    　　　　（3）固定定位

11. HTTP 1.1支持长连接(PersistentConnection)和请求的流水线(Pipelining)处理

12. 强制类型转换
    0==false  true
    undefined==0  false
    null==false  false

13. 优化

14. 虚拟dom 内存 对象 不同步

15. 跨域

16. 生成随机播放列表

### 09.19

1. JSON
   JSON键/值对由键和值组成，键必须是字符串，用双引号包裹，值可以是字符串（string）、数值(number) 、对象（object）、数组（array）、true、false、null。

2. false+true//1
   (true+false)>2//false
   (true+false)>2+true//false

3. 稀疏数组就是数组中多数成员没有有效的信息，只有少数成员有有效数据

4. service worker

5. dipslay:none,visibility:hidden都会被构建DOM树
   解析HTML构建DOM树在前面；而样式的加载在后面

   dispaly:none的元素不会被加入到**Render Tree** 而visibility:hidden的元素会被加入到Render Tree；

6. transform:rotate(7deg);

7. 理论上，所有可输入的地方没有对输入数据进行处理的话，都会存在XSS漏洞，漏洞的危害取决于攻击代码的威力，攻击代码也不局限于script。

8. 基于TCP的应用层协议有：SMTP、TELNET、HTTP、FTP
   
   基于UDP的应用层协议：DNS、TFTP（简单文件传输协议）、RIP（路由选择协议）、DHCP、BOOTP（是DHCP的前身）、IGMP（Internet组管理协议）
   

DNS占用53号端口，同时使用TCP和UDP协议。
   **DNS区域传输的时候使用TCP协议**
   **域名解析时使用UDP协议**

9. font-size 回流
10. insertAfter()和insertBefore() insertAdjacentHTML
11. iframe
12. 0.8-0.6==0.2
    false//0.20000000000000007
    0.2-0.1==0.1
    true
13. setTimeout(()=>{console.log("")},0)
    910
14. FTP21 SSH22
15. 电报UDP 保证新型协议PUDP(Passive UDP)。该协议通过在传统TCP/IP协议的UPD层和应用层中间加入一层可靠UDP模块,保证数据的可靠传输,实现了基于UDP报文传输的可靠传输。
16. a = /ff/ b = /ff/ a!=b
    

### 09.20

#### 腾讯

笔试，做得太贪了，老老实实一题一题做就能做两题多了

**1.碰碰数**

给一个数组和若干碰碰数组

数组按顺序组合

1234组合成 1 12 123 1234 2 23 234 3 34 4这种

但是出现碰碰数组则不算

求组合数

数组比较不能==

```
function combo(arr,peng){
	let crr=[],ans=0;
	for(let i = 0;i<arr.length;i++){
		crr = []
		for(let j = i;j<arr.length;j++){
			crr.push(arr[j])
			if(crr.has(peng)){
			console.log("break")
				break
			}else{
				ans++
				console.log(crr)
			}
		}
	}
	return ans
}
Array.prototype.has = function(peng){
	if(this.length<2){
		return false
	}else{
		let x = [this[this.length-2],this[this.length-1]];
		for(let pe of peng){
			if(equar(x,pe)){
				return true
			}
		}
		return false
	}
}
function equar(a, b) {
    if (a.length !== b.length) {
        return false
    } else {
        for (let i = 0; i < a.length; i++) {
            if (a[i] != b[i]) {
                return false
            }
        }
        return true;
    }
}
```

2.自动日期

验证闰年

合法化日期，自动计算迭代使日期在合理范围

输出

```
function run(year){
    if(year>=3200){
        if(year%3200==0&&year%172800!=0){
            return false
        }
    }
    if(year%400==0){
        return true
    }else if(year%4==0&&year%100!=0){
        return true
    }
    return false
}
function date(y,m,d){
    let x;
    run(y)?x=29:x=28;
    let mouth = [31,x,31,30,31,30,31,31,30,31,30,31];
    while(d>mouth[m-1]){
        d -= mouth[m-1]
        m++
        if(m>12){
            y++
            run(y)?x=29:x=28;
            m-=12
        }
    }
    y+=""
    m+=""
    d+=""
    while(y.length<4){
        y="0"+y
    }
    while(m.length<2){
        m="0"+m
    }
    while(d.length<2){
        d="0"+d
    }
    return y+"-"+m+"-"+d
}

let arr = readline().split(" ").map((it)=>{
    return parseInt(it)
});
console.log(date(arr[0],arr[1],arr[2]))
```

3.螺旋读二维数组

螺旋边数为数组长度N的2N-1

只需按顺序执行即可计算即可

```
function lX(arr){
	let res = [],n = arr.length,
	lx = 2*n-1,times=0,i=0,j=0,mode=0,turn=0;
	while(times<n*n){
		x = Math.floor(n-turn/2)
		if(mode==0){
			for(let k = 0;k<x;k++){
				res.push(arr[i][j])
				times++
				j++
			}
			mode=1
			turn++
			j--
			i++
		}else if(mode==1){
			for(let k = 0;k<x;k++){
				res.push(arr[i][j])
				times++
				i++
			}
			mode=2
			turn++
			i--
			j--
		}else if(mode==2){
			for(let k = x-1;k>-1;k--){
				res.push(arr[i][j])
				times++
				j--
			}
			mode=3
			turn++
			j++
			i--
		}else if(mode==3){
			for(let k = x-1;k>-1;k--){
				res.push(arr[i][j])
				times++
				i--
			}
			mode=0
			turn++
			i++
			j++
		}
	}
	return res
}

//[1, 2, 3, 6, 9, 8, 7, 4, 5]
//[1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10]
lX([[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]])
//[1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13]
```







4.超出字数按行截断

正则/\w\W$/









5.FFT

### 09.21

#### 乐信

1. substr(start [，length]) 第一个字符的索引是0，start必选 length可选

　　　substring(start [, end]) 第一个字符的索引是0，start必选 end可选

2. fetch号称是AJAX的替代品，是在ES6出现的，使用了ES6中的promise对象。Fetch是基于promise设计的。Fetch的代码结构比起ajax简单多了，参数有点像jQuery ajax。但是，一定记住**fetch不是ajax的进一步封装，而是原生js，没有使用XMLHttpRequest对象**。



3. ##### 域名
   一个完整的域名（*.com、*.net、*.edu、*.gov等）由二个或二个以上部分组成，各部分之间用英文的句号"."来分隔，最后一个"."的右边部分称为顶级域名 (Top-level Domain Name)，顶级域名“.”的左边部分称为[二级域名](https://baike.baidu.com/item/二级域名/4605645) (Second-level Domain Name)，二级域名的左边部分称为三级域名，以此类推，每一级的域名控制它下一级域名的分配。
   1 com
   2 baidu.com
   3 pan.baidu.com

   4. Date 对象方法

   | 方法                                                         | 描述                                                   |
   | :----------------------------------------------------------- | :----------------------------------------------------- |
   | [Date()](https://www.w3school.com.cn/jsref/jsref_Date.asp)   | 返回当日的日期和时间。                                 |
   | [getDate()](https://www.w3school.com.cn/jsref/jsref_getDate.asp) | 从 Date 对象返回一个月中的某一天 (1 ~ 31)。            |
   | [getDay()](https://www.w3school.com.cn/jsref/jsref_getDay.asp) | 从 Date 对象返回一周中的某一天 (0 ~ 6)。               |
   | [getMonth()](https://www.w3school.com.cn/jsref/jsref_getMonth.asp) | 从 Date 对象返回月份 (0 ~ 11)。                        |
   | [getFullYear()](https://www.w3school.com.cn/jsref/jsref_getFullYear.asp) | 从 Date 对象以四位数字返回年份。                       |
   | [getYear()](https://www.w3school.com.cn/jsref/jsref_getYear.asp) | 请使用 getFullYear() 方法代替。                        |
   | [getHours()](https://www.w3school.com.cn/jsref/jsref_getHours.asp) | 返回 Date 对象的小时 (0 ~ 23)。                        |
   | [getMinutes()](https://www.w3school.com.cn/jsref/jsref_getMinutes.asp) | 返回 Date 对象的分钟 (0 ~ 59)。                        |
   | [getSeconds()](https://www.w3school.com.cn/jsref/jsref_getSeconds.asp) | 返回 Date 对象的秒数 (0 ~ 59)。                        |
   | [getMilliseconds()](https://www.w3school.com.cn/jsref/jsref_getMilliseconds.asp) | 返回 Date 对象的毫秒(0 ~ 999)。                        |
   | [getTime()](https://www.w3school.com.cn/jsref/jsref_getTime.asp) | 返回 1970 年 1 月 1 日至今的毫秒数。                   |
   | [getTimezoneOffset()](https://www.w3school.com.cn/jsref/jsref_getTimezoneOffset.asp) | 返回本地时间与格林威治标准时间 (GMT) 的分钟差。        |
   | [getUTCDate()](https://www.w3school.com.cn/jsref/jsref_getUTCDate.asp) | 根据世界时从 Date 对象返回月中的一天 (1 ~ 31)。        |
   | [getUTCDay()](https://www.w3school.com.cn/jsref/jsref_getUTCDay.asp) | 根据世界时从 Date 对象返回周中的一天 (0 ~ 6)。         |
   | [getUTCMonth()](https://www.w3school.com.cn/jsref/jsref_getUTCMonth.asp) | 根据世界时从 Date 对象返回月份 (0 ~ 11)。              |
   | [getUTCFullYear()](https://www.w3school.com.cn/jsref/jsref_getUTCFullYear.asp) | 根据世界时从 Date 对象返回四位数的年份。               |
   | [getUTCHours()](https://www.w3school.com.cn/jsref/jsref_getUTCHours.asp) | 根据世界时返回 Date 对象的小时 (0 ~ 23)。              |
   | [getUTCMinutes()](https://www.w3school.com.cn/jsref/jsref_getUTCMinutes.asp) | 根据世界时返回 Date 对象的分钟 (0 ~ 59)。              |
   | [getUTCSeconds()](https://www.w3school.com.cn/jsref/jsref_getUTCSeconds.asp) | 根据世界时返回 Date 对象的秒钟 (0 ~ 59)。              |
   | [getUTCMilliseconds()](https://www.w3school.com.cn/jsref/jsref_getUTCMilliseconds.asp) | 根据世界时返回 Date 对象的毫秒(0 ~ 999)。              |
   | [parse()](https://www.w3school.com.cn/jsref/jsref_parse.asp) | 返回1970年1月1日午夜到指定日期（字符串）的毫秒数。     |
   | [setDate()](https://www.w3school.com.cn/jsref/jsref_setDate.asp) | 设置 Date 对象中月的某一天 (1 ~ 31)。                  |
   | [setMonth()](https://www.w3school.com.cn/jsref/jsref_setMonth.asp) | 设置 Date 对象中月份 (0 ~ 11)。                        |
   | [setFullYear()](https://www.w3school.com.cn/jsref/jsref_setFullYear.asp) | 设置 Date 对象中的年份（四位数字）。                   |
   | [setYear()](https://www.w3school.com.cn/jsref/jsref_setYear.asp) | 请使用 setFullYear() 方法代替。                        |
   | [setHours()](https://www.w3school.com.cn/jsref/jsref_setHours.asp) | 设置 Date 对象中的小时 (0 ~ 23)。                      |
   | [setMinutes()](https://www.w3school.com.cn/jsref/jsref_setMinutes.asp) | 设置 Date 对象中的分钟 (0 ~ 59)。                      |
   | [setSeconds()](https://www.w3school.com.cn/jsref/jsref_setSeconds.asp) | 设置 Date 对象中的秒钟 (0 ~ 59)。                      |
   | [setMilliseconds()](https://www.w3school.com.cn/jsref/jsref_setMilliseconds.asp) | 设置 Date 对象中的毫秒 (0 ~ 999)。                     |
   | [setTime()](https://www.w3school.com.cn/jsref/jsref_setTime.asp) | 以毫秒设置 Date 对象。                                 |
   | [setUTCDate()](https://www.w3school.com.cn/jsref/jsref_setUTCDate.asp) | 根据世界时设置 Date 对象中月份的一天 (1 ~ 31)。        |
   | [setUTCMonth()](https://www.w3school.com.cn/jsref/jsref_setUTCMonth.asp) | 根据世界时设置 Date 对象中的月份 (0 ~ 11)。            |
   | [setUTCFullYear()](https://www.w3school.com.cn/jsref/jsref_setUTCFullYear.asp) | 根据世界时设置 Date 对象中的年份（四位数字）。         |
   | [setUTCHours()](https://www.w3school.com.cn/jsref/jsref_setutchours.asp) | 根据世界时设置 Date 对象中的小时 (0 ~ 23)。            |
   | [setUTCMinutes()](https://www.w3school.com.cn/jsref/jsref_setUTCMinutes.asp) | 根据世界时设置 Date 对象中的分钟 (0 ~ 59)。            |
   | [setUTCSeconds()](https://www.w3school.com.cn/jsref/jsref_setUTCSeconds.asp) | 根据世界时设置 Date 对象中的秒钟 (0 ~ 59)。            |
   | [setUTCMilliseconds()](https://www.w3school.com.cn/jsref/jsref_setUTCMilliseconds.asp) | 根据世界时设置 Date 对象中的毫秒 (0 ~ 999)。           |
   | [toSource()](https://www.w3school.com.cn/jsref/jsref_tosource_boolean.asp) | 返回该对象的源代码。                                   |
   | [toString()](https://www.w3school.com.cn/jsref/jsref_toString_date.asp) | 把 Date 对象转换为字符串。                             |
   | [toTimeString()](https://www.w3school.com.cn/jsref/jsref_toTimeString.asp) | 把 Date 对象的时间部分转换为字符串。                   |
   | [toDateString()](https://www.w3school.com.cn/jsref/jsref_toDateString.asp) | 把 Date 对象的日期部分转换为字符串。                   |
   | [toGMTString()](https://www.w3school.com.cn/jsref/jsref_toGMTString.asp) | 请使用 toUTCString() 方法代替。                        |
   | [toUTCString()](https://www.w3school.com.cn/jsref/jsref_toUTCString.asp) | 根据世界时，把 Date 对象转换为字符串。                 |
   | [toLocaleString()](https://www.w3school.com.cn/jsref/jsref_toLocaleString.asp) | 根据本地时间格式，把 Date 对象转换为字符串。           |
   | [toLocaleTimeString()](https://www.w3school.com.cn/jsref/jsref_toLocaleTimeString.asp) | 根据本地时间格式，把 Date 对象的时间部分转换为字符串。 |
   | [toLocaleDateString()](https://www.w3school.com.cn/jsref/jsref_toLocaleDateString.asp) | 根据本地时间格式，把 Date 对象的日期部分转换为字符串。 |
   | [UTC()](https://www.w3school.com.cn/jsref/jsref_utc.asp)     | 根据世界时返回 1970 年 1 月 1 日 到指定日期的毫秒数。  |
   | [valueOf()](https://www.w3school.com.cn/jsref/jsref_valueOf_date.asp) | 返回 Date 对象的原始值。                               |

   5. CTRL+F5刷新是指清空缓存
   6. head 里面 <title>是必须的
   7. localStorage  sessionStorage API一致 都不跨域 不跨浏览器 storage大小相同 
   8. 可以用栈和队列模拟递归
   9. 如果父元素有{display: none;}的样式的话，子元素在样式表中的背景图片既不会渲染也不会加载，但是标签上的图片会被加载不会被渲染 

### 09.23

#### 阿里

电话面

面了一个小时，自我感觉良好，但是到现在没回音，GG，唯一不懂的貌似是这个

云，混合云 私有云等概念

**评价**

优点：

1、web技术面较广，前后都有实际的开发经验，基础知识、技术能力也还不错；

2、沟通顺畅，思路清晰，态度积极；

3、对技术有较高的追求，能主动学习；

4、代码能力不错，相关题目都能比较顺利地完成。



不足：

1、一些技术细节了解得不深，比如登录态过期会发生什么，还答不上来；
2、缺乏一些横向领域的知识（工程化、云网络）。



总的来说表现不错，但是缺乏让人眼前一亮的点，同时不要只关注代码，可以把自己的知识面扩展下，这样以后会上升到一个更高的高度。

### 09.25

#### 4399

1. webscoket 同源？

2. 同源检测 不同文件夹下

3. 概率

4. 盒模型

5. borderbox width:200 padding:200 width=200px

6. SEO 异步不利于

7. <link/> 自闭

8. 封装

9. 十进制十六进制

10. JQ offset position

11. sass

12. chunks就是代码块的意思，多个chunk合在一起就是bundle
    `webpack-dev-server` 支持2种自动刷新的方式：

    - Iframe mode
    - inline mode

    这2种模式配置的方式和访问的路径稍微有点区别，最主要的区别还是 `Iframe mode` 是在网页中嵌入了一个 `iframe` ，将我们自己的应用注入到这个 `iframe` 当中去，因此每次你修改的文件后，都是这个 `iframe` 进行了 `reload` 。
    而 `Inline-mode` ，是 `webpack-dev-server` 会在你的 `webpack.config.js` 的入口配置文件中再添加一个入口,
    不过 `Iframe mode` 和 `Inline mode` 最后达到的效果都是一样的，都是监听文件的变化，然后再将编译后的文件推送到前端，完成页面的 `reload` 的。

13. 无

14. [1<2<3,3<2<1]
    [true, true]

15. function foo(){}
    a = foo.name
    console.log(a)//foo
    foo.name="bar"
    console.log([a,foo.name])//["foo", "foo"]

16. 跨域

17. this

18. localStorageAPI

19. n对括号，中间插入4399，输出数组

20.  requestAnimationFrame

21. CSS animation

#### 移动云计算

两面，面试官对化学专业背景的兴趣比技术问题还大，估计GG

一组有优先级数据的存储

单点登录

React·vue 特点

vue组件通信

HTTP请求头

popover组件父元素overflow：hidden情况的处理

### 09.26

#### 步步高

```
unction fn(){
  var n = 99
  function add(){	n+=1	}
  function fn1(){    console.log(n)  }
  return fn1
}
var result = fn()

result()//99
add()// Uncaught ReferenceError: add is not defined
result()//99
```

```
function Foo(){
	function gN(){	console.log(1)	} //执行上下文一直在Foo里面不会用上
	return this
}
Foo.gN = function(){	console.log(2)	}
Foo.prototype.gN= function(){	console.log(3)	}
var gN=function(){	console.log(4)	}
function gN(){	console.log(5)	}

Foo.gN()//2
gN()//4
Foo().gN()//4  this.gN() window.gN()
gN()//4
```

```
5-"2"//3
"21">3//true
~4//-5
```

**~是按位取反  ^=是异或运算，相同取0，不同取1**

```
let x,{x:y=1}={x};y;//1
console.log(x,y)//undefined 1
```

```
function test(){
	let re=[]
	for(var i=0;i<10;i++){
		re[i]=function(){return i}
	}
	return re
}
test()[5]()//10
```

```
typeof(undefined)//"undefined"
typeof(function(){})//"function"
typeof(99)//"number"
typeof({a:1})//"object"
typeof bar()//"function"
function bar(){
	return foo
	function foo(){}
}

typeof "${{Object}}"//"string"
typeof "${{Object}}".prototype//"undefined"
typeof "${{Object}}".isPrototypeOf//"function" 
```

CSS3 2D 转换

- translate()
- rotate()
- scale()
- skew()
- matrix()

html5自定义数据属性 data属性

````
<li data-type="veg" data-distance="2miles" data-identifier="10318">
  Salad King
</li>
````

tabindex 实例 带有指定的 tab 键导航顺序的链接

contenteditable可编辑

scope 属性规定此表头单元格是否是行、列、行组或列组的头部。



onKeyDown/Press/UP

三者在事件的响应上还有一点不同，就是onkeydown 、onkeypress事件响应的时候输入的字符并没有被系统接受，而响应onkeyup的时候，输入流已经被系统接受

onkeypress

这个事件在用户**按下并放开**任何字母数字键时发生。**系统按钮（例如，箭头键和功能键）无法得到识别**。

onkeyup

这个事件在用户**放开**任何先前按下的键盘键时发生。

onkeydown

这个事件在用户**按下**任何键盘键（包括系统按钮，如箭头键和功能键）时发生。

p块状元素

JQ插件开发

```
//1.直接给jquer添加全局函数
jQuery.myAlert=function (str) {
    alert(str);
};
//2.用extend()方法。extend是jquery提供的一个方法，把多个对象合并起来，参数是object
jQuery.extend({
    myAlert2:function (str1) {
        alert(str1);
    },
});
(function ($) {
    $.fn.plugin=function () {
    };
})(jQuery);
```

**history.back()**不是goback

**localstorage.clear**不是clearItem

Web Notifications.ClearAll()

[Notifications API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) 允许网页或应用程序在系统级别发送在页面外部显示的通知;这样即使应用程序空闲或在后台，Web应用程序也会向用户发送信息。本文将介绍在您自己的应用程序中使用此API的基础知识。

使用 **FileReader()** 构造器去创建一个新的 FileReader 没有readData方法

vue生命周期

设计模式 工厂 单例 装饰 中介

单例为了保证一个类只有一个实例，如果不存在便直接返回，如果存在便返回上一次的实例，其目的一般是为了资源优化。类实现是正统的实现，一般是放到类上，做静态方法。在实际项目中，一般这个应用会在一些通用UI上，比如mask，alert，toast，loading这类组件，还有可能是一些请求数据的model

装饰者模式的意图是为一个对象动态的增加一些额外职责；是类继承的另外一种选择，一个是编译时候增加行为，一个是运行时候。

中介者与代理模式的区别
1，中介者模式：A，B之间的对话通过C来传达。A,B可以互相不认识（减少了A和B对象间的耦合）
2，代理模式：A要送B礼物，A,B互相不认识，那么A可以找C来帮它实现送礼物的愿望（封装了A对象）

## 2019.10

### 10.09

#### 普联

jq ajax 超时

移动端适配

进度条 206

### 10.10

##### 中国平安

选择题全是Java，没得玩

开源协议

MIT AGPL CGPL BSD Apache

掩码拉长

UML中的动态图

static





### 10.12

#### 4399

莫名其妙的终面，先是骆总和一个HR和另外一个不是技术的随便问一些问题，然后再来技术面确没有前端的面试官

商城秒杀系统

微信信息管理系统 CDN 云

游戏人物移动

#### OPPO

```
var foo=1
function main(){
console.log(foo)
var foo=2
console.log(this.foo)
}
undefined
var foo=1
function main(){
console.log(foo)
var foo=2
console.log(this.foo)
this.foo=3
}
main()
new main()
VM977:3 undefined
VM977:5 1
VM977:3 undefined
VM977:5 undefined
```

```
var a=b=c={name:"dog"}
b.name="cat"
a={name:"fish"}
console.log(a,b,c)
VM758:4 {name: "fish"} {name: "cat"} {name: "cat"}
```

```
10+"20"-10
1010
```

元素同时应用了*position*: *absolute*及*float*属性,则*float*失效

*ECMAScript*中所有函数的参数都是按*值传递* 

*箭头函数*是没有*arguments*,用剩余运算符

prototype constructor `_proto_`

z-index仅在定位元素（position不等于static）中有效

闭包计数器

```
var add = (function(){
      var counter = 0;
      return function(){
             return(++counter);
      }
})()
```

#### 数字广东

innerHTML不包括外部标签

```
<body>
<div id="outer" style="width:100px;height:100px;background-color: red"><div id="inner" style="width:50px;height:50px;background-color: blue"></div></div>
</body>
<script type="text/javascript">
	let outer = document.getElementById("outer")
	let inner = document.getElementById("inner")
	new MutationObserver(function(){
		console.log("m")
	}).observe(outer,{attributes:true})
	function onClick(e){
		console.log("c"+e.target.id)
		let i = setTimeout(function(){
			console.log("t"+e.target.id)
		},0)
		let j = new Promise(function(resolve, reject) {resolve()}).then(()=>{
			console.log("p"+e.target.id)
		})
		outer.setAttribute("ran",Math.random())
	}
	
	inner.addEventListener("click",function(e){
		onClick(e)
	})
	outer.addEventListener("click",function(e){
		onClick(e)
	})
	//inner.click();
</script>
//点外
couter
pouter
m
touter
//点内
cinner
pinner
m
cinner
pinner
m
tinner
tinner
//inner.click();
cinner
cinner
pinner
m
pinner
tinner
tinner
```



### 10.14

#### 4399

OC

#### 平安

onready事件和onload事件

//window.onload函数在页面所有内容加载完成后触发，只能执行最后一个window.onload函数
$(window).load(function(){         //等价于window.onload = function
    alert("加载完成");
});

//ready函数在DOM树加载完成后触发，可以同时执行多个ready函数。
$(document).ready(function(){      //$(document)可以简写成$()，  $(document).ready函数可以简写成$(function(){})
    alert("加载完成");
});	
document.onDOMContentLoaded
当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完成加载。

下拉刷新

http://www.111com.net/wy/js-ajax/87990.htm

强缓存下更新资源 hash

webpack多页面

webpack按需加载

node进程保护

继承

https://www.ucloud.cn/yun/59102.html

### 10.15

#### 数字广东

redux无效修改

```
<div>     </div>
//五空格输出一空格
<div> </div>
```

```js
[0, 1, 2, 3, 4].reduce(function(accumulateur, valeurCourante, index, array){
  return accumulateur + valeurCourante;
}, 10);

arr.reduce(callback, valeurInitiale)
```

选项卡间通信

大数排序

Etag/If-None-Match

content-type

- ​    text/html ： HTML格式
- ​    text/plain ：纯文本格式      
- ​    text/xml ：  XML格式
- ​    image/gif ：gif图片格式    
- ​    image/jpeg ：jpg图片格式 
- ​    image/png：png图片格式

   以application开头的媒体格式类型：

-    application/xhtml+xml ：XHTML格式
-    application/xml     ： XML数据格式
-    application/atom+xml  ：Atom XML聚合格式    
-    application/json    ： JSON数据格式
-    application/pdf       ：pdf格式  
-    application/msword  ： Word文档格式
-    application/octet-stream ： 二进制流数据（如常见的文件下载）
-    application/x-www-form-urlencoded ： <form encType=””>中默认的encType，form表单数据被编码为key/value格式发送到服务器（表单默认的提交数据的格式）

   另外一种常见的媒体格式是上传文件之时使用的：

- ​    multipart/form-data ： 需要在表单中进行文件上传时，就需要使用该格式

​     以上就是我们在日常的开发中，经常会用到的若干content-type的内容格式。

### 10.16

#### 平安科技

快速找小数

Google弹珠

### 10.17

#### OPPO

TS面向接口编程

双向绑定的设计模式

Vue传值

去重算法（不用API）

中间人攻击

https://blog.csdn.net/whatday/article/details/87782352

http://www.sohu.com/a/225905759_505779

页面优化

get/post

http包括哪些部分



#### 4399

正式offer