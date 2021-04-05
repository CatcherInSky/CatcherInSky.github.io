---
title: 跨域
categories:
- JavaScript
tags:
- JavaScript
date: 2018/12/24 14:33:01
---

常用跨域方法汇总

<!--more-->

# 什么是跨域

## 同源策略
同源指 **协议 域名 端口** 相同为同源，即便两个不同的域名指向同一个 ip 地址，也非同源。
浏览器的同源策略限制了从同一个源加载的文档或脚本如何与来自另一个源的资源进行交互。
它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到 XSS、CSFR 等攻击。

## 触发跨域错误
浏览器端的限制（服务端收到了请求并正确返回）
发送的是 XMLHttpRequest 请求（使用 img 标签发送的请求为 json 类型，并不会报错）
请求了不同域的资源

### CSRF
服务端验证通过后会在响应头加入Set-Cookie字段，然后下次再发请求的时候，浏览器会自动将cookie附加在HTTP请求的头字段Cookie中。如果没有同源策略的限制，盗用cookie进行请求进行CSRF攻击。

# 方法

## JSONP

JSONP，是 JSON with Padding 的简称，它是 json 的一种补充使用方式，利用 script 标签来解决跨域问题。JSONP 是非官方协议，他只是前后端一个约定，如果请求参数带有约定的参数，则后台返回 javascript 代码而非 json 数据，返回代码是函数调用形式，函数名即约定值，函数参数即要返回的数据。

首先在客户端 js 中定义一个函数（假设名为 handler），然后动态创建一个 script 标签插入页面中，script 标签的 src 属性即要调用的地址，同时，在调用的 url 中加入一个服务端约定的参数（假设名为 callback，参数值为已定义的函数名 handler），服务端收到请求，如果发现请求的 url 中带有约定的参数，那么就返回一段函数调用形式的 javascript 代码，该段代码的函数名即为 callback 参数的值 handler，函数的参数即为待返回的数据。这样，客户端拿到返回结果后就会执行 handler 函数，对返回的数据进行处理。

存在以下缺陷：
1.只能发送 GET 请求
2.发送的不是 XHR 请求，这样导致 XHR 请求中的很多事件都无法进行处理
3.服务端需要改动

## 

```
function jsonp(url, callback, success) {
    var script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.type = 'text/javascript'; 
    window[callback] = function(data) {
        success && success(data);
    }

    document.body.appendChild(script);
}
```

### 

## 空iframe加form

JSONP只能发GET请求，因为本质上script加载资源就是GET，用这个方法发POST请求

后端写个小接口

```
// 处理成功失败返回格式的工具
const {successBody} = require('../utli')
class CrossDomain {
  static async iframePost (ctx) {
    let postData = ctx.request.body
    console.log(postData)
    ctx.body = successBody({postData: postData}, 'success')
  }
}
module.exports = CrossDomain
```

前端

```
const requestPost = ({url, data}) => {
  // 首先创建一个用来发送数据的iframe.
  const iframe = document.createElement('iframe')
  iframe.name = 'iframePost'
  iframe.style.display = 'none'
  document.body.appendChild(iframe)
  const form = document.createElement('form')
  const node = document.createElement('input')
  // 注册iframe的load事件处理程序,如果你需要在响应返回时执行一些操作的话.
  iframe.addEventListener('load', function () {
    console.log('post success')
  })

  form.action = url
  // 在指定的iframe中执行form
  form.target = iframe.name
  form.method = 'post'
  for (let name in data) {
    node.name = name
    node.value = data[name].toString()
    form.appendChild(node.cloneNode())
  }
  // 表单元素需要添加到主文档中.
  form.style.display = 'none'
  document.body.appendChild(form)
  form.submit()

  // 表单提交后,就可以删除这个表单,不影响下次的数据发送.
  document.body.removeChild(form)
}
// 使用方式
requestPost({
  url: 'http://localhost:9871/api/iframePost',
  data: {
    msg: 'helloIframePost'
  }
})
```

## **postMessage 跨域**

`postMessage()`方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递。

```js
//捕获iframe
var domain = "http://scriptandstyle.com";
var iframe = document.getElementById("myIFrame").contentWindow;

//发送消息
setInterval(function() {
    var message = "Hello!  The time is: " + new Date().getTime();
    console.log("blog.local:  sending message:  " + message);
    //send the message and target URI
    iframe.postMessage(message, domain);
}, 6000);
//响应事件
window.addEventListener(
    "message",
    function(event) {
        if (event.origin !== "http://davidwalsh.name") return;
        console.log("message received:  " + event.data, event);
        event.source.postMessage("holla back youngin!", event.origin);
    },
    false
);
```

`postMessage`跨域适用于以下场景：同浏览器多窗口间跨域通信、`iframe`间跨域通信。

## CORS"跨域资源共享"（Cross-origin resource sharing）

需要浏览器和后端同时支持
服务端设置 Access-Control-Allow-Origin 该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。

Access-Control-Allow-Origin
简单说，允许跨域访问的host，必须设置，否则不允许跨域。

// 如需允许所有资源都可以访问您的资源，您可以如此设置：
Access-Control-Allow-Origin: *

// 如需允许https://developer.mozilla.org访问您的资源，您可以设置：
Access-Control-Allow-Origin: https://developer.mozilla.org
Access-Control-Allow-Credentials
如果想跨域传输cookies,需要Access-Control-Allow-Credentials与XMLHttpRequest.withCredentials 或Fetch API中的Request() 构造器中的credentials 选项结合使用。Credentials必须在前后端都被配置（即the Access-Control-Allow-Credentials header 和 XHR 或Fetch request中都要配置）才能使带credentials的CORS请求成功。

Access-Control-Request-Method
允许跨域的请求的方法。

Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers
response的header中Access-Control-Allow-Headers 用于 preflight request （即会在实际请求发送之前先发送一个option请求）中，列出了将会在正式请求的 Access-Control-Expose-Headers 字段中出现的首部信息。

简单首部，如 simple headers、Accept、Accept-Language、Content-Language、Content-Type （只限于解析后的值为 application/x-www-form-urlencoded、multipart/form-data 或 text/plain 三种MIME类型（不包括参数）），它们始终是被支持的，不需要在这个首部特意列出。

preflight request--options请求
很多人在抓包时会很郁闷怎么会无端端多出了一个OPTIONS请求，请不要奇怪，这只是CORS策略的预检请求，就像你要去跟别人借个东西，要先问问对方肯不肯一样。

什么情况下会发送OPTIONS请求？
简单的说，就是有自定义headers，Content-Type的值不属于下列之一:application/x-www-form-urlencoded，multipart/form-data，text/plain的请求会触发OPTIONS请求。如果产生OPTIONS请求，需要后台去响应它，允许它跨域。

简单请求：
只要同时满足以下两大条件，就属于简单请求
条件 1：使用下列方法之一：

- GET
- HEAD
- POST

条件 2：Content-Type 的值仅限于下列三者之一：

- text/plain
- multipart/form-data
- application/x-www-form-urlencoded

 [`document.domain`](https://developer.mozilla.org/zh-CN/docs/Web/API/Document/domain) 的值可以设置为其当前域或其当前域的父域，来允许子域安全访问其父域时，您需要在父域和子域中设置 document.domain 为相同的值。

## Nginx代理

![img](https://pic1.zhimg.com/80/v2-4b85a2e85aab5a14d8ac3ec2d6133dcc_hd.jpg)



https://segmentfault.com/a/1190000015597029

https://zhuanlan.zhihu.com/p/53545472


https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy

https://zhuanlan.zhihu.com/p/67489101

https://zhuanlan.zhihu.com/p/57991633