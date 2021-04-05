---
title:
categories:
- 
tags:
- 
display:none
date: 2017/12/16 23:47:41
---
## 前言



<!--more-->

zibi

```
<meta/>	头部元素
<base/>	标签为页面上的所有链接规定默认地址或默认目标。
<br/>	换行
<hr/>	分隔线
<area/>	标签定义图像映射中的区域(注:图像映射指得是带有可点击区域的图像)。area 元素总是嵌套在 标签中
<img/>	图片
<input>	输入框
<link/>	链接
<param/>	插入 XHTML 文档的对象规定 run-time 设置
<col/>	表格中一个或多个列定义属性值
<frame/>	frameset中的一个特定的窗口
<object/>	或者标签提供参数
<embed/>	HTML5 中新增的,标签定义了一个容器，用来嵌入外部应用或者互动程序（插件）
<keygen>	该对象提供了一个安全的方式来验证用户。
<source>	标签为媒体元素（比如 和 ）定义媒体资源。

```



<html manifest="demo.appcache">

manifest 属性规定文档的缓存 manifest 的位置。

HTML5 引入了应用程序缓存，这意味着 Web 应用程序可以被缓存，然后在无互联网连接的时候进行访问。

应用程序缓存使得应用程序有三个优点：

1. 离线浏览 - 用户可以在离线时使用应用程序
2. 快速 - 缓存的资源可以更快地加载
3. 减少服务器加载 - 浏览器只从服务器上下载已更新/已更改的资源

manifest 属性应该被 Web 应用程序中您想要缓存的每个页面包含。

manifest 文件是一个简单的文本文件，列举出了浏览器用于离线访问而缓存的资源。

## meta

**HTML <meta> 元素**表示那些不能由其它HTML元相关元素 ([``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/base), [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link), [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/script), [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/style) 或 [``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/title)) 之一表示的任何元数据信息.

允许的父元素`<meta charset>`, `<meta http-equiv>`, <head>元素

**charset**

此特性声明当前文档所使用的字符编码，但该声明可以被任何一个元素的 **lang** 特性的值覆盖。鼓励使用 UTF-8

```html
<meta charset="utf-8">
```

**content**     必需的属性

此属性包含`http-equiv` 或`name` 属性的值，具体取决于所使用的值。

**http-equiv**

把 content 属性关联到 HTTP 头部。

这个枚举属性定义了能改变服务器和用户引擎行为的编译。这个编译值使用`content` 来定

- content-type
- expires
- refresh
- set-cookie

使用带有 http-equiv 属性的 <meta> 标签时，服务器将把名称/值对添加到发送给浏览器的内容头部。例如，添加：

```
<meta http-equiv="charset" content="iso-8859-1">
<meta http-equiv="expires" content="31 Dec 2008">
```

这样发送到浏览器的头部就应该包含：

```
content-type: text/html
charset:iso-8859-1
expires:31 Dec 2008
```

当然，只有浏览器可以接受这些附加的头部字段，并能以适当的方式使用它们时，这些字段才有意义。





"content-security-policy"内容安全策略

它允许页面作者定义当前页的 [内容策略](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/CSP_policy_directives)。 内容策略主要指定允许的服务器源和脚本端点，这有助于防止跨站点脚本攻击。

default-style

这个属性指定了在页面上使用的首选样式表. `content`属性必须包含[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/link) 元素的标题, `href`属性链接到CSS样式表或包含CSS样式表的[``](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/style)元素的标题.

refresh

这个属性指定:

- 如果`content` 只包含一个正整数,则是重新载入页面的时间间隔(秒);
- 如果`content` 包含一个正整数并且跟着一个字符串,则是重定向到指定链接的时间间隔(秒)

```html
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="refresh" content="3;url=http://www.mozilla.org/">
```

**name**

把 content 属性关联到一个名称。

- author
- description
- keywords
- generator
- revised
- others

name 属性提供了名称/值对中的名称。HTML 和 XHTML 标签都没有指定任何预先定义的 <meta> 名称。通常情况下，您可以自由使用对自己和源文档的读者来说富有意义的名称。

"keywords" 是一个经常被用到的名称。它为文档定义了一组关键字。某些搜索引擎在遇到这些关键字时，会用这些关键字对文档进行分类。

类似这样的 meta 标签可能对于进入搜索引擎的索引有帮助：

```
<meta name="keywords" content="HTML,ASP,PHP,SQL">
```

如果没有提供 name 属性，那么名称/值对中的名称会采用 http-equiv 属性的值。





该属性定义文档级元数据的名称。如果以下其中一个属性设置了`itemprop`, `http-equiv` or `charset` ，就不能在设置这个属性了。


此元数据名称与 属性包含的值相关联。name属性的可能值为：

```
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```

`viewport`, 它提供有关视口初始大小的提示，仅供移动设备使用。
值的内容为： <meta name="viewport">Value可能值描述width一个正整数或者字符串 device-width以pixels（像素）为单位， 定义viewport（视口）的宽度。

height一个正整数或者字符串 

device-height以pixels（像素）为单位， 定义viewport（视口）的高度。

initial-scale一个0.0 到10.0之间的正数定义设备宽度（纵向模式下的设备宽度或横向模式下的设备高度）与视口大小之间的缩放比率。

maximum-scale一个0.0 到10.0之间的正数定义缩放的最大值；它必须大于或等于minimum-scale的值，不然会导致不确定的行为发生。

minimum-scale一个0.0 到10.0之间的正数定义缩放的最小值；它必须小于或等于maximum-scale的值，不然会导致不确定的行为发生。

user-scalable一个布尔值（yes或者no）如果设置为 no，用户将不能放大或缩小网页。默认值为 yes。

https://www.cnblogs.com/2050/p/3877280.html

h5

在存储方面提供了sessionStorage 、localStorage和离线存储，通过这些存储方式方便数据在客户端的存储和获取，在多媒体方面规定了音频和视频元素audio和vedio； 另外还有地理定位、canvas画布、拖放、多线程编程的web workers和websocket协议





H5

canvas





SVG





## iframes

我们会经常使用iframes来加载第三方的内容、广告或者插件。使用iframe是因为它可以和主页面并行加载，不会阻塞主页面。

**一、使用iframe的优缺点优点:**
1.程序调入静态页面比较方便;
2.页面和程序分离;
**缺点：**
1.iframe有不好之处：样式/脚本需要额外链入，会增加请求。
另外用js防盗链只防得了小偷，防不了大盗。
2.iframe好在能够把原先的网页全部原封不动显示下来,但是如果用在首页,是搜索引擎最讨厌的.那么你
的网站即使做的在好,也排不到好的名次! 
如果是动态网页，用include还好点！
但是必须要去除他的<html><head><title><body>标签！ 
3.框架结构有时会让人感到迷惑，特别是在多个框架中都出现上下、左右滚动条的时候。这些滚动条除了
会挤占已经特别有限的页面空间外，还会分散访问者的留心力。访问者遇到这种站点往往会立刻转身离开
。他们会想，既然你的主页如此混乱，那么站点的其他部分也许更不值得阅读。
4.链接导航疑问。运用框架结构时，你必须保证正确配置所有的导航链接，如不然，会给访问者带来很大
的麻烦。比如被链接的页面出现在导航框架内，这种情况下访问者便被陷住了，因为此时他没有其他地点
可去。
5.调用外部页面,需要额外调用css,给页面带来额外的请求次数;

主页面和iframe共享同一个连接池

iframe会阻塞主页面的onload事件

**window 的 onload 事件需要在所有 iframe 加载完毕后(包含里面的元素)才会触发。**在 Safari 和 Chrome 里，通过 JavaScript 动态设置 iframe 的 SRC 可以避免这种阻塞情况。

怎样做到iframe无阻塞加载onload？

Meebo的两个工程师(@marcuswestin and Martin Hunt)做了一个关于他们的Meebo Bar的演讲。他们使用iframe来加载一些插件，并且真正做到了无阻塞加载。对于有的开发者来说，他们的做法还比较新鲜。很赞，超级赞。

```html
<script> (function(d) {
    var iframe = d.body.appendChild(d.createElement('iframe')),
    doc = iframe.contentWindow.document; 
    // style the iframe with some CSS     iframe.style.cssText ="position:absolute;width:200px;height:100px;left:0px;"; 
    doc.open().write('<body οnlοad="'+ 　　'var d = document;d.getElementsByTagName(\'head\')[0].'+ 　　'appendChild(d.createElement(\'script\')).src'+'=\'\/path\/to\/file\'">');
    doc.close(); //iframe onload event happens })(document);</script>
```

神奇的地方就在<body οnlοad="">:这个iframe一开始没有内容，所以onload会立即触发。然后你创建一个script元素，用他来加载内容、广告、插件什么的，然后再把这个script添加到HEAD中去，这样iframe内容的加载就不会阻塞主页面的onload！







https://blog.csdn.net/fs821031547/article/details/51821095