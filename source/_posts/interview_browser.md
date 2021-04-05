---
title: 前端学习指南_浏览器
categories:
- FrontEnd
tags:
- 学习指南

date: 2019/06/03 16:10:11
---

前端知识中涉及浏览器的部分、包括浏览器内核、工作原理、存储等

<!--more-->

# 前端学习指南_浏览器

## 浏览器组成

主流浏览器：Internet Explorer、Firefox、Safari、Chrome 浏览器和 Opera
浏览器的主要组件为：

1. 用户界面 - 除了浏览器主窗口显示的页面外，其他的部分，包括地址栏、前进/后退按钮、书签菜单等。
3. 浏览器引擎 - 在用户界面和渲染引擎之间传送指令。
3. 渲染引擎 - 负责显示请求的内容，负责解析 HTML 和 CSS，并将解析后的内容显示在屏幕上。Firefox-Gecko，Safari和Chrome-WebKit
4. 网络 - 用于网络调用，比如 HTTP 请求。其接口与平台无关，并为所有平台提供底层实现。
5. 用户界面后端 - 用于绘制基本的窗口小部件。其公开了与平台无关的通用接口，而在底层使用操作系统的用户界面方法。
6. JavaScript 解释器。用于解析和执行 JavaScript 代码。
7. 数据存储。这是持久层。浏览器需要在硬盘上保存各种数据，例如 Cookie。新的 HTML 规范 (HTML5) 定义了“网络数据库”，这是一个完整（但是轻便）的浏览器内数据库。
## 内核

|浏览器|渲染引擎|JS解释器|
|--|--|--|
|Chrome|WebKit->Blink(2013)、|V8|
|Firefox|Gecko|SpiderMonkey|
|Safari|Webkit|Nitro|
|Edge|EdgeHTML->Chromium(Blink)|Chakra|
|Opera|Presto->Blink|V8|
|IE|Trident|Chakra|

### 其他浏览器

360浏览器、猎豹浏览器内核：IE+Chrome双内核；

搜狗、遨游、QQ浏览器内核：Trident（兼容模式）+Webkit（高速模式）；

百度浏览器、世界之窗内核：IE内核；

2345浏览器内核：好像以前是IE内核，现在也是IE+Chrome双内核了；

UC浏览器内核：这个众口不一，UC说是他们自己研发的U3内核，但好像还是基于Webkit和Trident，还有说是基于火狐内核。

## 事件循环

**浏览器环境下，microtask 的任务队列是每个 macrotask 执行完之后执行。而在 Node.js 中，microtask 会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行 microtask 队列的任务**。

![img](../images/v2-24fd07c4074bdb1d169f63ad4de59a36_hd.jpg)



## 综合

### 输入URL

### 判断 协议 缓存 输入的是 URL 还是 query
### 域名解析

DNS 查询：顺序浏览器缓存->系统缓存->路由器缓存->运营商缓存->域名递归搜索

### 建立连接
HTTPS TCP
三握四挥



发送请求

接受响应

渲染页面

###  渲染
1.加载

当请求响应返回的时候，network thread 会依据 Content-Type及 MIME Type sniffing 判断响应内容的格式

加载过程贼复杂，需要加载各种资源，比如html、css、js或者pdf等等。这里又可以分成两种情况，一种是内容加载，比如需要打开一个新进程、需要打开保存弹窗或者需要直接加载内容；另一种则是子资源下载，比如css、js、图片等等，这里又会涉及到缓存，选择本地读取还是去服务器请求等等一系列的问题。

如果域名或者请求内容匹配到已知的恶意站点，network thread 会展示一个警告页。此外 CORB 检测也会触发确保敏感数据不会被传递给渲染进程

2.解析

解析过程就就是解析上面加载的文件（HTML），建立DOM树的过程，

除了解析HTML生成DOM树，为了提高性能，一般浏览器都会做一些预处理动作，比如：DNS预获取、预加载扫描以及安全扫描(防XSS)等等。

DNS的预获取在前面就顺带提到了，预获取过程就在这里发生的。大家可以回到1688首页可以看到如下一段代码片：
```
<!--dns预解析-->
  <link rel="dns-prefetch" href="//cbu01.alicdn.com" />
  <link rel="dns-prefetch" href="//img.alicdn.com" />
  <link rel="dns-prefetch" href="//astyle-src.alicdn.com" />
  <link rel="dns-prefetch" href="//g.alicdn.com" />
  <link rel="dns-prefetch" href="//dcms.1688.com" />
  <link rel="dns-prefetch" href="//gm.mmstat.com" />
  <link rel="dns-prefetch" href="//log.mmstat.com" />
```

这段代码片没有任何逻辑功能，唯一的作用就是主动告诉浏览器，赶紧去请求解析这些域名，我马上要用了，这样可以极大地缩减dns的解析时间。有人可能怀疑，放在头部，难道不会阻塞页面加载？实际上并不会，查了一下Chrome的文档，这玩意甚至都没有用浏览器的网络栈。Chrome会启动8个异步线程，啥都不干，就蹲在那里等浏览器给他丢任务（队列），然后去找操作系统要解析，这个过程唯一的作用就是提前触发DNS解析，后面再来的时候就直接走缓存了，实际上这8个线程只是下个任务罢了。除了上面这种写法来触发DNS的预获取，实际浏览器还会搞个线程去扫描html文件，看到域名以后也会丢给上面那8个线程。



3.构建DOM树

DOM本身没有任何渲染能力，我们渲染的也不是DOM。webkit会为DOM树建立一堆渲染树，这些渲染树再用于渲染。

渲染树是归属于DOM树的。渲染树是只存在于上下文中，上下文结束，树销毁；下次再次渲染，再新建一个渲染树。**渲染树包含了渲染需要的一切信息。**
渲染树的节点会有不同种类，下面是几种常见的（都是从一个基类继承出来的），这些类都有自己的渲染方法，你只需要告诉它，该你出场了，他们自己就有方法去把自己画好
解析html，生成一个DOM树，解析过程中遇到了script标签就会执行，注意的是，执行js会阻塞DOM的解析，这也是为什么都提倡把不重要的代码放到body的最后面来执行。 如果有些代码确实需要放在靠前的位置，可以写考虑写成异步的方式来避免阻塞页面渲染。新浏览器一般都支持了defer和async属性，其中defer属性的script的下载不会阻塞html解析，而且其会在解析完成后才执行；async属性则是下载不会阻塞html解析，但是执行还是会阻塞。
这是因为JavaScript不只是可以改DOM，它还可以更改样式，也就是它可以更改CSSOM。前面我们介绍，不完整的CSSOM是无法使用的，但JavaScript中想访问CSSOM并更改它，那么在执行JavaScript时，必须要能拿到完整的CSSOM。所以就导致了一个现象，如果浏览器尚未完成CSSOM的下载和构建，而我们却想在此时运行脚本，那么浏览器将延迟脚本执行和DOM构建，直至其完成CSSOM的下载和构建。也就是说，在这种情况下，浏览器会先下载和构建CSSOM，然后再执行JavaScript，最后在继续构建DOM。

4.加载次级的资源
网页中常常包含诸如图片，CSS，JS 等额外的资源，这些资源需要从网络上或者 cache 中获取。主进程可以在构建 DOM 的过程中会逐一请求它们，为了加速 preload scanner 会同时运行，如果在 html 中存在 `<img>` `<link>` 等标签，preload scanner 会把这些请求传递给 Browser process 中的 network thread 进行相关资源的下载。

5.样式计算
进程还会基于 CSS 选择器解析 CSS 获取每一个节点的最终的计算样式值。即使不提供任何 CSS，浏览器对每个元素也会有一个默认的样式

6.获取布局

想要渲染一个完整的页面，除了获知每个节点的具体样式，还需要获知每一个节点在页面上的位置，布局其实是找到所有元素的几何关系的过程。其具体过程如下：

通过遍历 DOM 及相关元素的计算样式，主线程会构建出包含每个元素的坐标信息及盒子大小的布局树。布局树和 DOM 树类似，但是其中只包含页面可见的元素，如果一个元素设置了 `display:none` ，这个元素不会出现在布局树上，伪元素虽然在 DOM 树上不可见，但是在布局树上是可见的。

7.绘制各元素
浏览器引擎通过 DOM Tree 和 CSS Rule Tree 构建 Rendering Tree
即使知道了不同元素的位置及样式信息，我们还需要知道不同元素的绘制先后顺序才能正确绘制出整个页面。在绘制阶段，主线程会遍历布局树以创建绘制记录。绘制记录可以看做是记录各元素绘制先后顺序的笔记。

8.合成帧最终通过调用Native GUI 的 API 绘制网页画面，称为 Paint
复合是一种分割页面为不同的层，并单独栅格化，随后组合为帧的技术。不同层的组合由 compositor 线程（合成器线程）完成。
主线程会遍历布局树来创建层树（layer tree），添加了 `will-change` CSS 属性的元素，会被看做单独的一层，

**z-index**

9.事件处理

在构建Rendering Tree的同时，生成Javascript 脚本文件加载后， 通过 DOM API 和 CSSOM API 来操作 DOM Tree 和 CSS Rule Tree事件发生时，浏览器进程会发送事件类型及相应的坐标给渲染进程，渲染进程随后找到事件对象并执行所有绑定在其上的相关事件处理函数。
件委托，基于事件冒泡，我们常常在最顶层绑定事件：

```
document.body.addEventListener('touchstart',  event => {
    if (event.target === area) {
        event.preventDefault();
    }
});
```

事件分法deligation

#### Repaint
当元素改变的时候，将不会影响元素在页面当中的位置（比如 background-color, border-color, visibility），浏览器仅仅会应用新的样式重绘此元素，此过程称为 Repaint。

重绘:当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观、风格，而不会影响布局的，比如background-color。

#### Reflow
当元素改变的时候，将会影响文档内容或结构，或元素位置，此过程称为 Reflow。（ HTML 使用的是 flow based layout ，也就是流式布局，所以，如果某元件的几何尺寸发生了变化，需要重新布局，也就叫 Reflow。）



回流:当render tree中的一部分(或全部)因为元素的规模尺寸、布局、隐藏等改变而需要重新构建
回流必定会发生重绘，重绘不一定会引发回流。重绘和回流会在我们设置节点样式时频繁出现，同时也会很大程度上影响性能。回流所需的成本比重绘高的多，改变父节点里的子节点很可能会导致父节点的一系列回流。

1）常见引起回流属性和方法
任何会改变元素几何信息(元素的位置和尺寸大小)的操作，都会触发回流，

添加或者删除可见的DOM元素；
元素尺寸改变——边距、填充、边框、宽度和高度
内容变化，比如用户在input框中输入文字
浏览器窗口尺寸改变——resize事件发生时
计算 offsetWidth 和 offsetHeight 属性
设置 style 属性的值

重排
width height margin padding display border position overflow

clientWidth/Height/Top/Left 

offsetWidth/Height/Top/Left 

scrollWidth/Height/Top/Left 

scrollIntoView 

ScrollTo  

scrollIntoViewIfNeeded 

getComputedStyle getBoundingClientRect 

重绘
color border-style viisbility
background text-decoration background-image background-position background-repeat outline-color outline outline-style border-radius outline-width box-shadow background-size

不同的浏览器对于CSS和HTML的处理方式不同
如果有的浏览器的渲染引擎是需要等待CSS加载完成之后，对HTML元素进行渲染和展示的，那么在CSS加载完成之前，页面上不有任何信息，这种现象称为白屏（谷歌Chrome和苹果Safari）
而有的是先对HTML元素进行展示，然后等待CSS加载完成之后重新对样式进行修改，那么在CSS加载完之前，会首先在页面上显示没有任何CSS渲染的信息，这种现象称为FOUC(无样式内容闪烁)（IE和Firefox火狐）

问题四：为什么操作 DOM 慢
因为 DOM 是属于渲染引擎中的东西，而 JS 又是 JS 引擎中的东西。当我们通过 JS 操作 DOM 的时候，其实这个操作涉及到了两个线程之间的通信，那么势必会带来一些性能上的损耗。操作 DOM 次数一多，也就等同于一直在进行线程之间的通信，并且操作 DOM 可能还会带来重绘回流的情况，所以也就导致了性能上的问题。

问题五：渲染页面时常见哪些不良现象？
由于浏览器的渲染机制不同，在渲染页面时会出现两种常见的不良现象----白屏问题和FOUS（无样式内容闪烁）

FOUC：由于浏览器渲染机制（比如firefox），再CSS加载之前，先呈现了HTML，就会导致展示出无样式内容，然后样式突然呈现的现象；

白屏：有些浏览器渲染机制（比如chrome）要先构建DOM树和CSSOM树，构建完成后再进行渲染，如果CSS部分放在HTML尾部，由于CSS未加载完成，浏览器迟迟未渲染，从而导致白屏；也可能是把js文件放在头部，脚本会阻塞后面内容的呈现，脚本会阻塞其后组件的下载，出现白屏问题。

白屏和FOUC现象

> 不同的浏览器对于CSS和HTML的处理方式不同
>  如果有的浏览器的渲染引擎是需要等待CSS加载完成之后，对HTML元素进行渲染和展示的，那么在CSS加载完成之前，页面上不有任何信息，这种现象称为白屏（谷歌Chrome和苹果Safari）
>  而有的是先对HTML元素进行展示，然后等待CSS加载完成之后重新对样式进行修改，那么在CSS加载完之前，会首先在页面上显示没有任何CSS渲染的信息，这种现象称为FOUC(无样式内容闪烁)（IE和Firefox火狐）

## 工作原理

![img](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/webkitflow.png)![img](https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/image008.jpg)

## 渲染

## API

## 存储

### **一、Cookie**

#### 1. Cookie的来源

**Cookie 的本职工作并非本地存储，而是“维持状态”**。

因为**HTTP协议是无状态的，HTTP协议自身不对请求和响应之间的通信状态进行保存**，通俗来说，服务器不知道用户上一次做了什么，这严重阻碍了交互式Web应用程序的实现。在典型的网上购物场景中，用户浏览了几个页面，买了一盒饼干和两瓶饮料。最后结帐时，由于HTTP的无状态性，不通过额外的手段，服务器并不知道用户到底买了什么，于是就诞生了Cookie。它就是用来绕开HTTP的无状态性的“额外手段”之一。服务器可以设置或读取Cookies中包含信息，借此维护用户跟服务器会话中的状态。

我们可以把Cookie 理解为一个存储在浏览器里的一个小小的文本文件，它附着在 HTTP 请求上，在浏览器和服务器之间“飞来飞去”。它可以携带用户信息，当服务器检查 Cookie 的时候，便可以获取到客户端的状态。

在刚才的购物场景中，当用户选购了第一项商品，服务器在向用户发送网页的同时，还发送了一段Cookie，记录着那项商品的信息。当用户访问另一个页面，浏览器会把Cookie发送给服务器，于是服务器知道他之前选购了什么。用户继续选购饮料，服务器就在原来那段Cookie里追加新的商品信息。结帐时，服务器读取发送来的Cookie就行了。

#### 2. 什么是Cookie及应用场景

**Cookie指某些网站为了辨别用户身份而储存在用户本地终端上的数据(通常经过加密)。 cookie是服务端生成，客户端进行维护和存储**。通过cookie,可以让服务器知道请求是来源哪个客户端，就可以进行客户端状态的维护，比如登陆后刷新，请求头就会携带登陆时response header中的set-cookie,Web服务器接到请求时也能读出cookie的值，根据cookie值的内容就可以判断和恢复一些用户的信息状态。



![img](https://pic2.zhimg.com/80/v2-b2e9d08cbbe54d47951c32d62e0796c5_hd.jpg)



如上图所示，**Cookie 以键值对的形式存在**。

典型的应用场景有：

- 记住密码，下次自动登录。
- 购物车功能。
- 记录用户浏览数据，进行商品（广告）推荐。

####  **3. Cookie的原理及生成方式**

Cookie的原理



![img](https://pic1.zhimg.com/80/v2-9d22446bd1c422fbab68276bd0440e44_hd.jpg)



第一次访问网站的时候，浏览器发出请求，服务器响应请求后，会在响应头里面添加一个Set-Cookie选项，将cookie放入到响应请求中，在浏览器第二次发请求的时候，会通过Cookie请求头部将Cookie信息发送给服务器，服务端会辨别用户身份，另外，Cookie的过期时间、域、路径、有效期、适用站点都可以根据需要来指定。

Cookie的生成方式主要有两种：

- 生成方式一：http response header中的set-cookie

我们可以通过响应头里的 Set-Cookie 指定要存储的 Cookie 值。默认情况下，domain 被设置为设置 Cookie 页面的主机名，我们也可以手动设置 domain 的值。

```text
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2018 07:28:00 GMT;//可以指定一个特定的过期时间（Expires）或有效期（Max-Age）
```

当**Cookie的过期时间被设定时，设定的日期和时间只与客户端相关，而不是服务端。**

内存cookie，是指没有设在cookie的Expires的属性，此时cookie将停留在客户端的内存中，只有在该IE窗口中从“文件－新建－ 窗口”打开的新的IE窗和由form的target属性为_blank产生的新的IE窗口才共享同一个cookie信息。IE，Chome的选项卡都共享同一个cookie信息。

硬盘cookie，是指在你设置了cookie的Expires属性，此时cookie将保存到你的硬盘上。此时所有的窗口将共享同一个名字的cookie。

- 生成方式二：js中可以通过document.cookie可以读写cookie，以键值对的形式展示

例如我们在掘金社区控制台输入以下三句代码，便可以在Chrome 的 Application 面板查看生成的cookie:

```js
document.cookie="userName=hello"
document.cookie="gender=male"
document.cookie='age=20;domain=.baidu.com'
```



![img](https://pic3.zhimg.com/80/v2-237182a275e0e58f97f3bddfa4bb29de_hd.jpg)



从上图中我们可以得出：

**Domain 标识指定了哪些域名可以接受Cookie**。如果没有设置domain，就会自动绑定到执行语句的当前域。

如果设置为”.baidu.com”,则所有以”baidu.com”结尾的域名都可以访问该Cookie，所以在掘金社区上读取不到第三条代码存储Cookie值。

####  4. Cookie的缺陷

- Cookie 不够大

Cookie的大小限制在4KB左右，对于复杂的存储需求来说是不够用的。当 Cookie 超过 4KB 时，它将面临被裁切的命运。这样看来，Cookie 只能用来存取少量的信息。此外很多浏览器对一个站点的cookie个数也是有限制的。

这里需注意：各浏览器的cookie每一个`name=value`的value值大概在4k，所以4k并不是一个域名下所有的cookie共享的,而是一个name的大小。

- 过多的 Cookie 会带来巨大的性能浪费

Cookie 是紧跟域名的。同一个域名下的所有请求，都会携带 Cookie。大家试想，如果我们此刻仅仅是请求一张图片或者一个 CSS 文件，我们也要携带一个 Cookie 跑来跑去（关键是 Cookie 里存储的信息并不需要），这是一件多么劳民伤财的事情。Cookie 虽然小，请求却可以有很多，随着请求的叠加，这样的不必要的 Cookie 带来的开销将是无法想象的。

cookie是用来维护用户信息的，而域名(domain)下所有请求都会携带cookie，但对于静态文件的请求，携带cookie信息根本没有用，此时可以通过cdn（存储静态文件的）的域名和主站的域名分开来解决。

- 由于在HTTP请求中的Cookie是明文传递的，所以安全性成问题，除非用HTTPS。

####  5. Cookie与安全

对于 cookie 来说，我们还需要注意安全性。



![img](https://pic4.zhimg.com/80/v2-a7269b1ae24fb52bfcb678450d2f0e63_hd.jpg)



HttpOnly 不支持读写，浏览器不允许脚本操作document.cookie去更改cookie， 所以为避免跨域脚本 (XSS) 攻击，通过JavaScript的 Document.cookie API无法访问带有 HttpOnly 标记的Cookie，它们只应该发送给服务端。如果包含服务端 Session 信息的 Cookie 不想被客户端 JavaScript 脚本调用，那么就应该为其设置 HttpOnly 标记。

```text
Set-Cookie: id=a3fWa; Expires=Wed, 21 Oct 2015 07:28:00 GMT; Secure; HttpOnly
```

标记为 Secure 的Cookie只应通过被HTTPS协议加密过的请求发送给服务端。但即便设置了 Secure 标记，敏感信息也不应该通过Cookie传输，因为Cookie有其固有的不安全性，Secure 标记也无法提供确实的安全保障。

为了弥补 Cookie 的局限性，让“专业的人做专业的事情”，Web Storage 出现了。

**HTML5中新增了本地存储的解决方案----Web Storage，它分成两类：sessionStorage和localStorage**。这样有了WebStorage后，cookie能只做它应该做的事情了——作为客户端与服务器交互的通道，保持客户端状态。

LocalStorage 是一种本地存储的公共资源，域名下很多应用共享这份资源会有风险；LocalStorage 是以页面域名划分的，如果有多个等价域名之间的 LocalStorage 不互通，则会造成缓存多份浪费。

LocalStorage 在 PC 上的兼容性不太好，而且当网络速度快、协商缓存响应快时使用 localStorage 的速度比不上 304。并且不能缓存 css 文件。而移动端由于网速慢，使用 localStorage 要快于 304。

而相对 LocalStorage 来说，SessionStorage 的数据只存储到特定的会话中，不属于持久化的存储，所以关闭浏览器会清除数据。和 localstorage 具有相同的方法。

### **二、Web Storage API**

在HTML5中添加的在本地存储数据的新选项，从cookie用于保存客户端与服务器通信，但Web Storage API用于保存比cookie更大的客户端数据

#### **1）LocalStorage**

##### **1. LocalStorage的特点**

- 保存的数据长期存在，下一次访问该网站的时候，网页可以直接读取以前保存的数据。
- 大小为5M左右
- 仅在客户端使用，不和服务端进行通信
- 接口封装较好
- 多选项卡之间同步数据

基于上面的特点，LocalStorage可以作为浏览器本地缓存方案，用来提升网页首屏渲染速度(根据第一请求返回时，将一些不变信息直接存储在本地)。

##### 2.存入/读取数据

localStorage保存的数据，以“键值对”的形式存在。也就是说，每一项数据都有一个键名和对应的值。所有的数据都是以文本格式保存。

存入数据使用setItem方法。它接受两个参数，第一个是键名，第二个是保存的数据。

```js
localStorage.setItem("key","value");
```

读取数据使用getItem方法。它只有一个参数，就是键名。

```js
var valueLocal = localStorage.getItem("key");
```

具体步骤，请看下面的例子：

```html

<script>
    if(window.localStorage){
      localStorage.setItem（'name','world'）
      localStorage.setItem（“gender','famale'）
    }
</script>
<body>
    <div id="name"></div>
    <div id="gender"></div>
    <script>
        var name = localStorage.getItem("name");
        var gender = localStorage.getItem("gender");
        document.getElementById("name").innerHTML = name;
        document.getElementById("gender").innerHTML = gender;
    </script>
</body>
<script>
    window.adddEventListener('storage',()=>{
        console.log('local storage has been updated')
    })
    //支持度可能不够
</script>
```

##### 3. 使用场景

LocalStorage在存储方面没有什么特别的限制，理论上 Cookie 无法胜任的、可以用简单的键值对来存取的数据存储任务，都可以交给 LocalStorage 来做。

这里给大家举个例子，考虑到 LocalStorage 的特点之一是持久，有时我们更倾向于用它来存储一些内容稳定的资源。比如图片内容丰富的电商网站会用它来存储 Base64 格式的图片字符串：



![img](https://pic3.zhimg.com/80/v2-8540ad0b59883ab1c712c1da30e79576_hd.jpg)



除非适应localStorage.removeItem('key')删除单个键值对，或localStorage.clear()清除所有数据

#### 2）sessionStorage

sessionStorage保存的数据用于浏览器的一次会话，当会话结束（通常是该窗口关闭），数据被清空；sessionStorage 特别的一点在于，**即便是相同域名下的两个页面，只要它们不在同一个浏览器窗口中打开，那么它们的 sessionStorage 内容便无法共享**；localStorage 在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的。除了保存期限的长短不同，SessionStorage的属性和方法与LocalStorage完全一样。

##### 1.sessionStorage的特点

- 会话级别的浏览器存储
- 大小为5M左右
- 仅在客户端使用，不和服务端进行通信
- 接口封装较好

基于上面的特点，sessionStorage 可以有效对表单信息进行维护，比如刷新时，表单信息不丢失。

##### 2. 使用场景

sessionStorage 更适合用来存储生命周期和它同步的会话级别的信息。这些信息只适用于当前会话，当你开启新的会话时，它也需要相应的更新或释放。比如微博的 sessionStorage就主要是存储你本次会话的浏览足迹：



![img](https://pic1.zhimg.com/80/v2-88b19378c4a8ab9956bd2c5eabd995d4_hd.jpg)



lasturl 对应的就是你上一次访问的 URL 地址，这个地址是即时的。当你切换 URL 时，它随之更新，当你关闭页面时，留着它也确实没有什么意义了，干脆释放吧。这样的数据用 sessionStorage 来处理再合适不过。

##### 3.sessionStorage 、localStorage 和 cookie 之间的区别

- 共同点：都是保存在浏览器端，且都遵循同源策略。
- 不同点：在于生命周期与作用域的不同

作用域：localStorage只要在相同的协议、相同的主机名、相同的端口下，就能读取/修改到同一份localStorage数据。sessionStorage比localStorage更严苛一点，除了协议、主机名、端口外，还要求在**同一窗口**（也就是浏览器的标签页）下



![img](https://pic2.zhimg.com/80/v2-2d85a9444b68937ef8aca17de84a5749_hd.jpg)



生命周期：localStorage 是持久化的本地存储，存储在其中的数据是永远不会过期的，使其消失的唯一办法是手动删除；而 sessionStorage 是临时性的本地存储，它是会话级别的存储，当会话结束（页面被关闭）时，存储内容也随之被释放。

Web Storage 是一个从定义到使用都非常简单的东西。它使用键值对的形式进行存储，这种模式有点类似于对象，却甚至连对象都不是——**它只能存储字符串**，要想得到对象，我们还需要先对字符串进行一轮解析。

说到底，Web Storage 是对 Cookie 的拓展，它只能用于存储少量的简单数据。当遇到大规模的、结构复杂的数据时，Web Storage 也爱莫能助了。这时候我们就要清楚我们的终极大 boss——IndexedDB！

### 四、Session

会话，服务器就要给每个客户端分配不同的“身份标识”。

Session是一种记录客户状态的机制，不同于Cookie的是Cookie保存在客户端浏览器中，而Session保存在服务器上。 客户端浏览器访问服务器的时候，服务器把客户端信息以某种形式记录在服务器上。这就是Session。 客户端浏览器再次访问时只需要从该Session中查找该客户的状态就可以了。

如果说Cookie机制是通过检查客户身上的"通行证"来确定客户身份的话， 那么Session机制就是通过检查服务器上的"客户明细表"来确认客户身份。 Session相当于程序在服务器上建立的一份客户档案， 客户来访的时候只需要查询客户档案表就可以了。

服务器使用session把用户的信息临时保存在了服务器上，用户离开网站后session会被销毁。这种用户信息存储方式相对cookie来说更安全，可是session有一个缺陷：如果web服务器做了负载均衡，那么下一个操作请求到了另一台服务器的时候session会丢失。

#### Session机制

一方面，我们可以把**客户端浏览器与服务器之间一系列交互的动作**称为一个 Session。 从这个语义出发，我们会提到Session持续的时间，会提到在Session过程中进行了什么操作等等。

另一方面，Session指的是**服务器端为客户端所开辟的存储空间**，该空间保存的信息就是用于保持状态。 从这个语义出发，我们则会提到往Session中存放什么内容，如何根据键值从Session中获取匹配的内容等。

- 要使用Session，当然是先要创建Session。那么Session在何时创建呢？

1. Session在服务器端程序运行的过程中创建的，不同语言实现的应用程序有不同创建Session的方法， 在Java中是通过调用HttpServletRequest的getSession方法(使用true作为参数)创建的。 创建Session的同时，**服务器会为该Session生成唯一的session id**， 这个session id在随后的请求中会被用来重新获得已经创建的Session
2. Session被创建之后，就可以调用Session相关的方法往Session中增加内容了， 而这些内容只会保存在服务器中，发到客户端的只有session id
3. 当客户端再次发送请求的时候，会将这个session id带上， 服务器接受到请求之后就会依据session id找到相应的Session，从而再次使用Session。

#### Session的生命周期

Session保存在服务器端。为了获得更高的存取速度，服务器一般把Session放在**内存**中。 **每个用户都会有一个独立的Session**。 如果Session内容过于复杂，当大量客户访问服务器时可能会导致内存溢出。 因此，Session里的信息应该尽量精简。

**Session在用户第一次访问服务器的时候自动创建**。 需要注意只有访问JSP、Servlet等程序时才会创建Session， 只访问HTML、IMAGE等静态资源并不会创建Session。 如果尚未生成Session，也可以使用request.getSession(true)强制生成Session。

Session生成后，只要用户继续访问，服务器就会更新Session的最后访问时间，并维护该Session。 用户每访问服务器一次，无论是否读写Session，服务器都认为该用户的Session"活跃(active)"了一次。

```
session的生命周期当一个Session开始时，Servlet容器会创建一个HttpSession对象，那么在HttpSession对象中，可以存放用户状态的信息。Servlet容器为HttpSession对象分配一个唯一标识符即Sessionid，Servlet容器把Sessionid作为一种Cookie保存在客户端的 *浏览器* 中。
```

​    用户每次发出Http请求时，Servlet容器会从HttpServletRequest对象中取出Sessionid,然后根据这个Sessionid找到相应的HttpSession对象，从而获取用户的状态信息。

我们知道Session是存在于服务器端的，当把浏览器关闭时，浏览器并没有向服务器发送任何请求来关闭Session，自然Session也不会被销毁，但是可以做一点努力，在所有的客户端页面里使用js的window.onclose来监视浏览器的关闭动作，然后向服务器发送一个请求来关闭Session，但是这种做法在实际的开发中也是不推荐使用的，最正常的办法就是不去管它，让它等到默认的时间后，自动销毁。那么为什么当我们关闭浏览器后，就再也访问不到之前的session了呢？其实之前的Session一直都在服务器端，而当我们关闭浏览器时，此时的Cookie是存在于浏览器的进程中的，当浏览器关闭时，Cookie也就不存在了。

其实Cookie有两种:

- 一种是存在于浏览器的进程中;
- 一种是存在于硬盘上

而session的Cookie是存在于浏览器的进程中，那么这种Cookie我们称为会话Cookie，当我们重新打开浏览器窗口时，之前的Cookie中存放的Sessionid已经不存在了，此时服务器从HttpServletRequest对象中没有检查到sessionid，服务器会再发送一个新的存有Sessionid的Cookie到客户端的浏览器中，此时对应的是一个新的会话，而服务器上原先的session等到它的默认时间到之后，便会自动销毁。

 	当在同一个浏览器中同时打开多个标签，发送同一个请求或不同的请求，仍是同一个session;

​	当不在同一个窗口中打开相同的浏览器时，发送请求，仍是同一个session;

​	当使用不同的浏览器时，发送请求，即使发送相同的请求，是不同的session;

​	当把当前某个浏览器的窗口全关闭，再打开，发起相同的请求时，就是本文所阐述的，是不同的session,但是它和session的生命周期是没有关系的.

#### Session的有效期

由于会有越来越多的用户访问服务器，因此Session也会越来越多。 为防止内存溢出，服务器会把长时间内没有活跃的Session从内存删除。 这个时间就是Session的超时时间。如果超过了超时时间没访问过服务器，Session就自动失效了。

Session的超时时间为maxInactiveInterval属性， 可以通过对应的getMaxInactiveInterval()获取，通过setMaxInactiveInterval(longinterval)修改。

Session的超时时间也可以在web.xml中修改。 另外，通过调用Session的invalidate()方法可以使Session失效。

#### Cookie和Session的的区别

1. HTTP协议是**无状态的协议**，服务端需要记录用户的状态，就需要用某种机制来**识别具体的用户**，这个机制就是Session。 Session典型的应用场景就是购物车，当点击下单按钮时，由于HTTP协议无状态，所以并不知道是哪个用户操作的， 所以服务端要为特定的用户创建了特定的Session，用于**标识这个用户，并且跟踪用户**，这样才知道购物车里面的商品情况。 这个Session是保存在服务端的，有一个唯一标识。在服务端保存Session的方法很多，内存、数据库、文件都有。 集群的时候也要考虑Session的转移，在大型的网站，一般会有专门的Session服务器集群， 用来保存用户会话，这个时候 Session 信息都是放在内存的，此外，一些缓存服务比如Memcached之类的来放 Session。
2. 服务端使用Cookie来识别特定的客户。每次HTTP请求的时候，客户端都会发送相应的Cookie信息到服务端。 实际上大多数的应用都是用 Cookie 来实现Session跟踪的， 第一次创建Session的时候，服务端会在HTTP协议中告诉客户端，需要在 Cookie 里面记录一个session id， 以后每次请求把这个 session id发送到服务器，这样就可以使用对应的Seesion了。 如果客户端的浏览器禁用了 Cookie 怎么办？ 一般这种情况下，会使用一种叫做**URL重写的技术**来进行**会话跟踪**， 即每次HTTP交互，URL后面都会被附加上一个诸如 sid=xxxxx 这样的参数，服务端据此来识别用户。
3. Cookie其实还可以用在一些方便用户的场景下， 设想你某次登陆过一个网站，下次登录的时候不想再次输入账号了，怎么办？ 这个信息可以写到Cookie里面，访问网站的时候， 网站页面的脚本可以读取这个信息，就自动帮你把用户名给填了， 能够方便一下用户。这也是Cookie名称的由来，给用户的一点甜头。

### 五、Token

在Web领域基于Token的身份验证随处可见。在大多数使用Web API的互联网公司中，tokens 是多用户下处理认证的最佳方式。

以下几点特性会让你在程序中使用基于Token的身份验证

1. 无状态、可扩展
2. 支持移动设备
3. 跨程序调用
4. 安全

那些使用基于Token的身份验证的大佬们

大部分你见到过的API和Web应用都使用tokens。例如Facebook, Twitter, Google+, GitHub等。

用户输入登陆凭据；




#### 基于服务器的验证

我们都是知道HTTP协议是无状态的，这种无状态意味着程序需要验证每一次请求，从而辨别客户端的身份。

在这之前，程序都是通过在服务端存储的登录信息来辨别请求的。这种方式一般都是通过存储Session来完成。

随着Web，应用程序，已经移动端的兴起，这种验证的方式逐渐暴露出了问题。尤其是在可扩展性方面。

#### 基于服务器验证方式暴露的一些问题

1. **Seesion：**每次认证用户发起请求时，服务器需要去创建一个记录来存储信息。当越来越多的用户发请求时，内存的开销也会不断增加。
2. **可扩展性：**在服务端的内存中使用Seesion存储登录信息，伴随而来的是可扩展性问题。
3. **CORS(跨域资源共享)：**当我们需要让数据跨多台移动设备上使用时，跨域资源的共享会是一个让人头疼的问题。在使用Ajax抓取另一个域的资源，就可以会出现禁止请求的情况。
4. **CSRF(跨站请求伪造)：**用户在访问银行网站时，他们很容易受到跨站请求伪造的攻击，并且能够被利用其访问其他的网站。

在这些问题中，可扩展行是最突出的。因此我们有必要去寻求一种更有行之有效的方法。

#### 基于Token的验证原理

基于Token的身份验证是无状态的，我们不将用户信息存在服务器或Session中。

这种概念解决了在服务端存储信息时的许多问题

> NoSession意味着你的程序可以根据需要去增减机器，而不用去担心用户是否登录。

基于Token的身份验证的过程如下:

1. 用户通过用户名和密码发送请求。
2. 程序验证。
3. 程序返回一个签名的token 给客户端。
4. 客户端储存token,并且每次用于每次发送请求。
5. 服务端验证token并返回数据。

每一次请求都需要token。token应该在HTTP的头部发送从而保证了Http请求无状态。我们同样通过设置服务器属性Access-Control-Allow-Origin:* ，让服务器能接受到来自所有域的请求。

需要主要的是，在ACAO头部标明(designating)*时，不得带有像HTTP认证，客户端SSL证书和cookies的证书。

实现思路：


  ![img](https://pic4.zhimg.com/80/v2-ef026f4b3a58beba57a2d585a8982c7b_hd.jpg)

1. 用户登录校验，校验成功后就返回Token给客户端。
2. 客户端收到数据后保存在客户端
3. 客户端每次访问API是携带Token到服务器端。
4. 服务器端采用filter过滤器校验。校验成功则返回请求数据，校验失败则返回错误码

当我们在程序中认证了信息并取得token之后，我们便能通过这个Token做许多的事情。

我们甚至能基于创建一个基于权限的token传给第三方应用程序，这些第三方程序能够获取到我们的数据（当然只有在我们允许的特定的token）

#### Tokens的优势

**无状态、可扩展**

在客户端存储的Tokens是无状态的，并且能够被扩展。基于这种无状态和不存储Session信息，负载负载均衡器能够将用户信息从一个服务传到其他服务器上。

如果我们将已验证的用户的信息保存在Session中，则每次请求都需要用户向已验证的服务器发送验证信息(称为Session亲和性)。用户量大时，可能会造成一些拥堵。

但是不要着急。使用tokens之后这些问题都迎刃而解，因为tokens自己hold住了用户的验证信息。

**安全性**

请求中发送token而不再是发送cookie能够防止CSRF(跨站请求伪造)。即使在客户端使用cookie存储token，cookie也仅仅是一个存储机制而不是用于认证。不将信息存储在Session中，让我们少了对session操作。

token是有时效的，一段时间之后用户需要重新验证。我们也不一定需要等到token自动失效，token有撤回的操作，通过token revocataion可以使一个特定的token或是一组有相同认证的token无效。

**可扩展性**

Tokens能够创建与其它程序共享权限的程序。例如，能将一个随便的社交帐号和自己的大号(Fackbook或是Twitter)联系起来。当通过服务登录Twitter(我们将这个过程Buffer)时，我们可以将这些Buffer附到Twitter的数据流上(we are allowing Buffer to post to our Twitter stream)。

使用tokens时，可以提供可选的权限给第三方应用程序。当用户想让另一个应用程序访问它们的数据，我们可以通过建立自己的API，得出特殊权限的tokens。

**多平台跨域**

我们提前先来谈论一下CORS(跨域资源共享)，对应用程序和服务进行扩展的时候，需要介入各种各种的设备和应用程序。

> Having our API just serve data, we can also make the design choice to serve assets from a CDN. This eliminates the issues that CORS brings up after we set a quick header configuration for our application.

只要用户有一个通过了验证的token，数据和资源就能够在任何域上被请求到。

```json
Access-Control-Allow-Origin: *      
```


基于标准创建token的时候，你可以设定一些选项。我们在后续的文章中会进行更加详尽的描述，但是标准的用法会在JSON Web Tokens体现。

最近的程序和文档是供给JSON Web Tokens的。它支持众多的语言。这意味在未来的使用中你可以真正的转换你的认证机制。

#### 对比Cookie

Cookies验证是有状态（stateful）的。这意味着，权限信息（比如session ID）必须同时在客户端和服务端维护。服务端需要根据session cookies信息去数据库查询用户相关信息；客户端每次发起请求时都必须带上Cookies信息作为身份验证。

**特征：**

1.不需要前端存储 
Cookies由后台设置（response header里的Set-Cookie），浏览器会在后续的请求中自动加上Cookies信息。有CSRF(跨站点伪造请求)风险 

2.Cookies是不支持跨域访问的，一般只能在某个域名及其子域名下被访问。但是，由于Cookies可以通过JS代码获取（document.cookies），由此，可能会引发安全问题，比如著名的CSRF攻击（跨站请求伪造）。

3.移动端用在使用cookie时有各种不便利和局限 

4.移动端平台和Cookies配合并不是太好，可能会在Cookies使用上有局限性。

5.Cookies可以在同一域名下或者同一主域不同子域下共享，一旦跨主域，就无法共享 如果遇到跨域共享身份信息的情况，就必须靠服务器协助（例如单点登录：一个身份，需要登录多个主域）

**身份验证**
1.用户输入登陆凭据；

2.服务器验证凭据是否正确，并创建会话，然后把会话数据存储在数据库中；

3.具有会话id的cookie被放置在用户浏览器中；

4.服务器验证凭据是否正确，并创建会话；

5.在后续请求中，服务器会根据数据库验证会话id，如果验证通过，则继续处理；

6.一旦用户登出，服务端和客户端同时销毁该会话在后续请求中，服务器会根据数据库验证会话id，如果验证通过，则继续处理；



**Token**
Token是无状态的（stateless）。也就是说，服务端不需要在数据库中存储和Token相关的字段，Token本身就已经包含了用户的所有信息

客户端一般在request header里面利用Authorization头传递Token值，格式为Bearer {JWT}（该格式并不是绝对的，要根据服务端具体情况来设置）。

**特征**：

1.Token值同样需要服务端提供（通过API返回） 
和Cookies不同，返回值不需要挂载在Set-Cookie上，而是利用其它response header或者response body返回Token值；

2.需要客户端存储 
和Cookies不同，浏览器无法自动在下一次请求中自动挂载身份信息。客户端必须自行存储Token值（建议用localstorage），然后在后续请求中通过设置request header来传递Token信息；

3.无CSRF风险
适合移动端身份认证

4.Token支持各类跨域

**身份验证**

1.服务器验证凭据是否正确，然后返回一个经过签名的token；

2.客户端负责存储token，可以存在localstorage，或者cookie中

3.对服务器的请求带上这个token；

4.服务器对JWT进行解码，如果token有效，则处理该请求；

5.一旦用户登出，客户端销毁token。

### 四、IndexDB

浏览器内置数据库系统，用于储存大量结构化数据

### 五、Cache API

最初为 service workers 创建，用于缓存网络请求，API公开了window.caches,允许保存可永远以后访问的Requests和Responses对

## 缓存

### 缓存位置

从缓存位置上来说分为四种，并且各自有优先级，当依次查找缓存且都没有命中的时候，才会去请求网络。

- Service Worker
- Memory Cache
- Disk Cache
- Push Cache

#### 1. Service Worker

Service Worker 是运行在浏览器背后的独立线程，一般可以用来实现缓存功能。使用 Service Worker的话，传输协议必须为 HTTPS。因为 Service Worker 中涉及到请求拦截，所以必须使用 HTTPS 协议来保障安全。**Service Worker 的缓存与浏览器其他内建的缓存机制不同，它可以让我们自由控制缓存哪些文件、如何匹配缓存、如何读取缓存，并且缓存是持续性的**。

Service Worker 实现缓存功能一般分为三个步骤：首先需要先注册 Service Worker，然后监听到 install 事件以后就可以缓存需要的文件，那么在下次用户访问的时候就可以通过拦截请求的方式查询是否存在缓存，存在缓存的话就可以直接读取缓存文件，否则就去请求数据。

当 Service Worker 没有命中缓存的时候，我们需要去调用 fetch 函数获取数据。也就是说，如果我们没有在 Service Worker 命中缓存的话，会根据缓存查找优先级去查找数据。但是不管我们是从 Memory Cache 中还是从网络请求中获取的数据，浏览器都会显示我们是从 Service Worker 中获取的内容。

#### 2. Memory Cache

Memory Cache 也就是内存中的缓存，主要包含的是当前中页面中已经抓取到的资源,例如页面上已经下载的样式、脚本、图片等。读取内存中的数据肯定比磁盘快,内存缓存虽然读取高效，可是缓存持续性很短，会随着进程的释放而释放。 **一旦我们关闭 Tab 页面，内存中的缓存也就被释放了**。

**那么既然内存缓存这么高效，我们是不是能让数据都存放在内存中呢？**
这是不可能的。计算机中的内存一定比硬盘容量小得多，操作系统需要精打细算内存的使用，所以能让我们使用的内存必然不多。

当我们访问过页面以后，再次刷新页面，可以发现很多数据都来自于内存缓存

内存缓存中有一块重要的缓存资源是preloader相关指令（例如`<link rel="prefetch">`）下载的资源。总所周知preloader的相关指令已经是页面优化的常见手段之一，它可以一边解析js/css文件，一边网络请求下一个资源。

需要注意的事情是，**内存缓存在缓存资源时并不关心返回资源的HTTP缓存头Cache-Control是什么值，同时资源的匹配也并非仅仅是对URL做匹配，还可能会对Content-Type，CORS等其他特征做校验**。

#### 3. Disk Cache

Disk Cache 也就是存储在硬盘中的缓存，读取速度慢点，但是什么都能存储到磁盘中，**比之 Memory Cache 胜在容量和存储时效性上**。

在所有浏览器缓存中，Disk Cache 覆盖面基本是最大的。它会根据 HTTP Herder 中的字段判断哪些资源需要缓存，哪些资源可以不请求直接使用，哪些资源已经过期需要重新请求。并且即使在跨站点的情况下，相同地址的资源一旦被硬盘缓存下来，就不会再次去请求数据。绝大部分的缓存都来自 Disk Cache，关于 HTTP 的协议头中的缓存字段，我们会在下文进行详细介绍。

**浏览器会把哪些文件丢进内存中？哪些丢进硬盘中？**

关于这点，网上说法不一，不过以下观点比较靠得住：

- 对于大文件来说，大概率是不存储在内存中的，反之优先
- 当前系统内存使用率高的话，文件优先存储进硬盘

#### 4. Push Cache

Push Cache（推送缓存）是 HTTP/2 中的内容，当以上三种缓存都没有命中时，它才会被使用。**它只在会话（Session）中存在，一旦会话结束就被释放，并且缓存时间也很短暂**，在Chrome浏览器中只有5分钟左右，同时它也并非严格执行HTTP头中的缓存指令。

Push Cache 在国内能够查到的资料很少，也是因为 HTTP/2 在国内不够普及。这里推荐阅读`Jake Archibald`的 [HTTP/2 push is tougher than I thought](https://jakearchibald.com/2017/h2-push-tougher-than-i-thought/) 这篇文章，文章中的几个结论：

- 所有的资源都能被推送，并且能够被缓存,但是 Edge 和 Safari 浏览器支持相对比较差
- 可以推送 no-cache 和 no-store 的资源
- 一旦连接被关闭，Push Cache 就被释放
- 多个页面可以使用同一个HTTP/2的连接，也就可以使用同一个Push Cache。这主要还是依赖浏览器的实现而定，出于对性能的考虑，有的浏览器会对相同域名但不同的tab标签使用同一个HTTP连接。
- Push Cache 中的缓存只能被使用一次
- 浏览器可以拒绝接受已经存在的资源推送
- 你可以给其他域名推送资源

如果以上四种缓存都没有命中的话，那么只能发起请求来获取资源了。

那么为了性能上的考虑，大部分的接口都应该选择好缓存策略，**通常浏览器缓存策略分为两种：强缓存和协商缓存，并且缓存策略都是通过设置 HTTP Header 来实现的**。

### 缓存过程分析

浏览器与服务器通信的方式为应答模式，即是：浏览器发起HTTP请求 – 服务器响应该请求，**那么浏览器怎么确定一个资源该不该缓存，如何去缓存呢**？浏览器第一次向服务器发起该请求后拿到请求结果后，将请求结果和缓存标识存入浏览器缓存，**浏览器对于缓存的处理是根据第一次请求资源时返回的响应头来确定的**。具体过程如下图：



![img](https://pic4.zhimg.com/80/v2-f7847e40161079c42f0c8ebea5c8e447_hd.jpg)

由上图我们可以知道：

- 浏览器每次发起请求，都会先在浏览器缓存中查找该请求的结果以及缓存标识
- 浏览器每次拿到返回的请求结果都会将该结果和缓存标识存入浏览器缓存中

以上两点结论就是浏览器缓存机制的关键，它确保了每个请求的缓存存入与读取，只要我们再理解浏览器缓存的使用规则，那么所有的问题就迎刃而解了，本文也将围绕着这点进行详细分析。为了方便大家理解，这里我们根据是否需要向服务器重新发起HTTP请求将缓存过程分为两个部分，分别是强缓存和协商缓存。

**https://www.cnblogs.com/lyzg/p/5125934.html#_label2**



### 强缓存

**强缓存：不会向服务器发送请求，直接从缓存中读取资源，在chrome控制台的Network选项中可以看到该请求返回200的状态码，并且Size显示from disk cache或from memory cache。强缓存可以通过设置两种 HTTP Header 实现：Expires 和 Cache-Control。**

#### 1. Expires

**缓存过期时间，用来指定资源到期的时间，是服务器端的具体的时间点**。也就是说，Expires=max-age + 请求时间，需要和Last-modified结合使用。Expires是Web服务器响应消息头字段，在响应http请求时告诉浏览器在过期时间前浏览器可以直接从浏览器缓存取数据，而无需再次请求。

**Expires 是 HTTP/1 的产物，受限于本地时间，如果修改了本地时间，可能会造成缓存失效**。`Expires: Wed, 22 Oct 2018 08:41:00 GMT`表示资源会在 Wed, 22 Oct 2018 08:41:00 GMT 后过期，需要再次请求。

#### 2.Cache-Control

在HTTP/1.1中，Cache-Control是最重要的规则，主要用于控制网页缓存。比如当`Cache-Control:max-age=300`时，则代表在这个请求正确返回时间（浏览器也会记录下来）的5分钟内再次加载资源，就会命中强缓存。

Cache-Control 可以在请求头或者响应头中设置，并且可以组合使用多种指令：

![img](https://pic2.zhimg.com/80/v2-acc1984b3804888cfc8fa29dfe880ce1_hd.jpg)

**public**：**所有内容都将被缓存（客户端和代理服务器都可缓存）**。具体来说响应可被任何中间节点缓存，如 Browser <– proxy1 <– proxy2 <– Server，中间的proxy可以缓存资源，比如下次再请求同一资源proxy1直接把自己缓存的东西给 Browser 而不再向proxy2要。

**private**：**所有内容只有客户端可以缓存**，Cache-Control的默认取值。具体来说，表示中间节点不允许缓存，对于Browser <– proxy1 <– proxy2 <– Server，proxy 会老老实实把Server 返回的数据发送给proxy1,自己不缓存任何数据。当下次Browser再次请求时proxy会做好请求转发而不是自作主张给自己缓存的数据。
**no-cache**：客户端缓存内容，是否使用缓存则需要经过协商缓存来验证决定。表示不使用 Cache-Control的缓存控制方式做前置验证，而是使用 Etag 或者Last-Modified字段来控制缓存。**需要注意的是，no-cache这个名字有一点误导。设置了no-cache之后，并不是说浏览器就不再缓存数据，只是浏览器在使用缓存数据时，需要先确认一下数据是否还跟服务器保持一致。**

**no-store**：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存

**max-age**：max-age=xxx (xxx is numeric)表示缓存内容将在xxx秒后失效

**s-maxage**（单位为s)：同max-age作用一样，只在代理服务器中生效（比如CDN缓存）。比如当s-maxage=60时，在这60秒中，即使更新了CDN的内容，浏览器也不会进行请求。max-age用于普通缓存，而s-maxage用于代理缓存。**s-maxage的优先级高于max-age**。如果存在s-maxage，则会覆盖掉max-age和Expires header。

**max-stale**：能容忍的最大过期时间。max-stale指令标示了客户端愿意接收一个已经过期了的响应。如果指定了max-stale的值，则最大容忍时间为对应的秒数。如果没有指定，那么说明浏览器愿意接收任何age的响应（age表示响应由源站生成或确认的时间与当前时间的差值）。

**min-fresh**：能够容忍的最小新鲜度。min-fresh标示了客户端不愿意接受新鲜度不多于当前的age加上min-fresh设定的时间之和的响应。

![img](https://pic4.zhimg.com/80/v2-3cfc35561a31cfbf910b927dc854d12f_hd.jpg)



从图中我们可以看到，我们可以将多个指令配合起来一起使用，达到多个目的。比如说我们希望资源能被缓存下来，并且是客户端和代理服务器都能缓存，还能设置缓存失效时间等等。

#### 3.Expires和Cache-Control两者对比

其实这两者差别不大，区别就在于 Expires 是http1.0的产物，Cache-Control是http1.1的产物，**两者同时存在的话，Cache-Control优先级高于Expires**；在某些不支持HTTP1.1的环境下，Expires就会发挥用处。所以Expires其实是过时的产物，现阶段它的存在只是一种兼容性的写法。
强缓存判断是否缓存的依据来自于是否超出某个时间或者某个时间段，而不关心服务器端文件是否已经更新，这可能会导致加载文件不是服务器端最新的内容，**那我们如何获知服务器端内容是否已经发生了更新呢**？此时我们需要用到协商缓存策略。

### 协商缓存

**协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程，主要有以下两种情况**：

- 协商缓存生效，返回304和Not Modified



![img](https://pic1.zhimg.com/80/v2-76dea9895be8352caf9093e1be1c7b30_hd.jpg)



- 协商缓存失效，返回200和请求结果



![img](https://pic4.zhimg.com/80/v2-ed740ea018526e10fc305db773fd1dd7_hd.jpg)



协商缓存可以通过设置两种 HTTP Header 实现：Last-Modified 和 ETag 。

#### 1.Last-Modified和If-Modified-Since

浏览器在第一次访问资源时，服务器返回资源的同时，在response header中添加 Last-Modified的header，值是这个资源在服务器上的最后修改时间，浏览器接收后缓存文件和header；

```js
Last-Modified: Fri, 22 Jul 2016 01:47:00 GMT
```

浏览器下一次请求这个资源，浏览器检测到有 Last-Modified这个header，于是添加If-Modified-Since这个header，值就是Last-Modified中的值；服务器再次收到这个资源请求，会根据 If-Modified-Since 中的值与服务器中这个资源的最后修改时间对比，如果没有变化，返回304和空的响应体，直接从缓存读取，如果If-Modified-Since的时间小于服务器中这个资源的最后修改时间，说明文件有更新，于是返回新的资源文件和200



![img](https://pic3.zhimg.com/80/v2-758710de7290cc1ba78d15fb2afdfd0e_hd.jpg)



**但是 Last-Modified 存在一些弊端：**

- 如果本地打开缓存文件，即使没有对文件进行修改，但还是会造成 Last-Modified 被修改，服务端不能命中缓存导致发送相同的资源
- 因为 Last-Modified 只能以秒计时，如果在不可感知的时间内修改完成文件，那么服务端会认为资源还是命中了，不会返回正确的资源

既然根据文件修改时间来决定是否缓存尚有不足，能否可以直接根据文件内容是否修改来决定缓存策略？所以在 HTTP / 1.1 出现了 `ETag`和`If-None-Match`

#### 2. ETag和If-None-Match

**Etag是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)，只要资源有变化，Etag就会重新生成**。浏览器在下一次加载资源向服务器发送请求时，会将上一次返回的Etag值放到request header里的If-None-Match里，服务器只需要比较客户端传来的If-None-Match跟自己服务器上该资源的ETag是否一致，就能很好地判断资源相对客户端而言是否被修改过了。如果服务器发现ETag匹配不上，那么直接以常规GET 200回包形式将新的资源（当然也包括了新的ETag）发给客户端；如果ETag是一致的，则直接返回304知会客户端直接使用本地缓存即可。



![img](https://pic4.zhimg.com/80/v2-29841ba3a30443c6e44b66f981de2817_hd.jpg)

#### 3. 两者之间对比：

- 首先在精确度上，Etag要优于Last-Modified。

Last-Modified的时间单位是秒，如果某个文件在1秒内改变了多次，那么他们的Last-Modified其实并没有体现出来修改，但是Etag每次都会改变确保了精度；如果是负载均衡的服务器，各个服务器生成的Last-Modified也有可能不一致。

- 第二在性能上，Etag要逊于Last-Modified，毕竟Last-Modified只需要记录时间，而Etag需要服务器通过算法来计算出一个hash值。
- 第三在优先级上，服务器校验优先考虑Etag

### 缓存机制

**强制缓存优先于协商缓存进行，若强制缓存(Expires和Cache-Control)生效则直接使用缓存，若不生效则进行协商缓存(Last-Modified / If-Modified-Since和Etag / If-None-Match)，协商缓存由服务器决定是否使用缓存，若协商缓存失效，那么代表该请求的缓存失效，返回200，重新返回资源和缓存标识，再存入浏览器缓存中；生效则返回304，继续使用缓存**。具体流程图如下：



![img](https://pic3.zhimg.com/80/v2-471c9c11772943906980d42fa26d1952_hd.jpg)



看到这里，不知道你是否存在这样一个疑问:**如果什么缓存策略都没设置，那么浏览器会怎么处理？**

对于这种情况，浏览器会采用一个启发式的算法，通常会取响应头中的 Date 减去 Last-Modified 值的 10% 作为缓存时间。

### 实际场景应用缓存策略

#### 1. 频繁变动的资源

> *Cache-Control: no-cache*

对于频繁变动的资源，首先需要使用`Cache-Control: no-cache` 使浏览器每次都请求服务器，然后配合 ETag 或者 Last-Modified 来验证资源是否有效。这样的做法虽然不能节省请求数量，但是能显著减少响应数据大小。

#### 2. 不常变化的资源

> *Cache-Control: max-age=31536000*

通常在处理这类资源时，给它们的 Cache-Control 配置一个很大的 `max-age=31536000` (一年)，这样浏览器之后请求相同的 URL 会命中强制缓存。而为了解决更新的问题，就需要在文件名(或者路径)中添加 hash， 版本号等动态字符，之后更改动态字符，从而达到更改引用 URL 的目的，让之前的强制缓存失效 (其实并未立即失效，只是不再使用了而已)。
在线提供的类库 (如 `jquery-3.3.1.min.js`, `lodash.min.js` 等) 均采用这个模式。

### 用户行为对浏览器缓存的影响

所谓用户行为对浏览器缓存的影响，指的就是用户在浏览器如何操作时，会触发怎样的缓存策略。主要有 3 种：

- 打开网页，地址栏输入地址： 查找 disk cache 中是否有匹配。如有则使用；如没有则发送网络请求。
- 普通刷新 (F5)：因为 TAB 并没有关闭，因此 memory cache 是可用的，会被优先使用(如果匹配的话)。其次才是 disk cache。
- 强制刷新 (Ctrl + F5)：浏览器不使用缓存，因此发送的请求头部均带有 `Cache-control: no-cache`(为了兼容，还带了 `Pragma: no-cache`),服务器直接返回 200 和最新内容。

## Service Worker

Service workers 本质上充当Web应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理。它们旨在（除其他之外）使得能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作。他们还允许访问推送通知和后台同步API。

## 服务工作线程概念和用法[节](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API#服务工作线程概念和用法)

Service worker是一个注册在指定源和路径下的事件驱动[worker](https://developer.mozilla.org/zh-CN/docs/Web/API/Worker)。它采用JavaScript控制关联的页面或者网站，拦截并修改访问和资源请求，细粒度地缓存资源。你可以完全控制应用在特定情形（最常见的情形是网络不可用）下的表现。

Service worker运行在worker上下文，因此它**不能访问DOM**。相对于驱动应用的主JavaScript线程，它运行在其他线程中，所以不会造成阻塞。它设计为**完全异步**，同步API（如[XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)和[localStorage](https://developer.mozilla.org/zh-CN/docs/Web/Guide/API/DOM/Storage)）不能在service worker中使用。

出于安全考量，Service workers只能由**HTTPS**承载，毕竟修改网络请求的能力暴露给中间人攻击会非常危险。在Firefox浏览器的[用户隐私模式](https://support.mozilla.org/zh-CN/kb/隐私浏览)，Service Worker不可用。

使用 [`ServiceWorkerContainer.register()`](https://developer.mozilla.org/zh-CN/docs/Web/API/ServiceWorkerContainer/register) 方法首次注册service worker。如果注册成功，service worker就会被下载到客户端并尝试安装或激活（见下文），这将作用于整个域内用户可访问的URL，或者其特定子集。

### 下载、安装和激活

此时，你的服务工作者(service worker)将遵守以下生命周期：

1. 下载
2. 安装
3. 激活

用户首次访问service worker控制的网站或页面时，service worker会立刻被下载。

之后至少每24小时它会被下载一次。它*可能*被更频繁地下载，不过每24小时一定会被下载一次，以避免不良脚本长时间生效。

**Service workers也可以用来做这些事情：**

- 后台数据同步
- 响应来自其它源的资源请求
- 集中接收计算成本高的数据更新，比如地理位置和陀螺仪信息，这样多个页面就可以利用同一组数据
- 在客户端进行CoffeeScript，LESS，CJS/AMD等模块编译和依赖管理（用于开发目的）
- 后台服务钩子
- 自定义模板用于特定URL模式
- 性能增强，比如预取用户可能需要的资源，比如相册中的后面数张图片

未来service workers能够用来做更多使web平台接近原生应用的事。 值得关注的是，其他标准也能并且将会使用service worker，例如:

- [后台同步](https://github.com/slightlyoff/BackgroundSync)：启动一个service worker即使没有用户访问特定站点，也可以更新缓存
- [响应推送](https://developer.mozilla.org/zh-CN/docs/Web/API/Push_API)：启动一个service worker向用户发送一条信息通知新的内容可用
- 对时间或日期作出响应
- 进入地理围栏



https://zhuanlan.zhihu.com/p/47407398
https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/

https://zhuanlan.zhihu.com/p/54314093

https://zhuanlan.zhihu.com/p/61704951

https://zhuanlan.zhihu.com/p/62168010