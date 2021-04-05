---
title: HopeLibrarySystem项目总结
categories:
- 
tags:
- FrontEnd

date: 2017/12/16 23:47:41
---
记录此项目中一些技术要点

<!--more-->

# HopeLibrarySystem 项目总结

## 框架

### express+ejs

```
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```

Express里有个中间件（[**middleware**](http://expressjs.com/guide/using-middleware.html)）的概念。所谓中间件，就是在收到请求后和发送响应之前这个阶段执行的一些函数。

要在一条路由的处理链上插入中间件，可以使用express对象的use方法。该方法原型如下：

```
app.use([path,] function [, function...])
```

当app.use没有提供path参数时，路径默认为“/”。当你为某个路径安装了中间件，则当以该路径为基础的路径被访问时，都会应用该中间件。比如你为“/abcd”设置了中间件，那么“/abcd/xxx”被访问时也会应用该中间件。

中间件函数的原型如下：

```
function (req, res, next)
```

第一个参数是[Request](http://expressjs.com/4x/api.html#req)对象req。第二个参数是[Response](http://expressjs.com/4x/api.html#res)对象res。第三个则是用来驱动中间件调用链的函数next，如果你想让后面的中间件继续处理请求，就需要调用next方法。

给某个路径应用中间件函数的典型调用是这样的：

```
app.use('/abcd', function (req, res, next) {
  console.log(req.baseUrl);
  next();
})
```

## 组件

### express-session 

基于express框架专门用于处理session的中间件

只需要用express app的use方法将session挂载在‘/’路径即可，这样所有的路由都可以访问到session。可以给要挂载的session传递不同的option参数，来控制session的不同特性

一旦我们将express-session中间件用use挂载后，我们可以很方便的通过req参数来存储和访问session对象的数据。req.session是一个JSON格式的JavaScript对象，我们可以在使用的过程中随意的增加成员，这些成员会自动的被保存到option参数指定的地方，默认即为内存中去

```
app.use(session({
	secret:'hope',// 对session id 相关的cookie 进行签名
	cookie:{maxAge:1000*60*60*24*30},// 设置 session 的有效时间，单位毫秒,免密码一个月内自动登录
	resave: false,// 是否每次都重新保存会话，建议false
	saveUninitialized: true,// 是否保存未初始化的会话
}));
```

默认存在内存，store开启存在服务器，如下app会自动替我们把session存入到mongodb数据，而非内存中。

```
session({
    store: new MongoStore({   //创建新的mongodb数据库
        host: 'localhost',    //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
        port: 27017,          //数据库的端口号
        db: 'test-app'        //数据库的名称。
    })
})
```

由于session是存在服务器端数据库的，所以的它的生命周期可以持久化，而不仅限于浏览器关闭的时间。具体是由cookie.maxAge 决定：如果maxAge设定是1个小时，那么从这个因浏览器访问服务器导致session创建开始后，session会一直保存在服务器端，即使浏览器关闭，session也会继续存在。如果此时服务器宕机，只要开机后数据库没发生不可逆转的破坏，maxAge时间没过期，那么session是可以继续保持的。

当maxAge时间过期后，session会自动的数据库中移除，对应的还有浏览器的cookie。不过，由于connect-mongo的特殊机制（每1分钟检查一次过期session），session的移除可能在时间上会有一定的滞后。

### Morgan

http 请求日志记录中间件

使用 `app.use(logger('dev'));` 可以将请求信息打印在控制台，便于开发调试，但实际生产环境中，通常需要将日志记录在日志文件里

- 将所有的请求记录在 `log/` 目录下按每日日期生成的文件中，需要使用 `file-stream-rotator` 模块：

```
var FileStreamRotator = require('file-stream-rotator');
var express = require('express');
var fs = require('fs');
var logger = require('morgan');
 
var app = express();
var logDirectory = __dirname + '/log';
 
// ensure log directory exists 
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
 
// create a rotating write stream 
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: logDirectory + '/%DATE%.log',
    frequency: 'daily',
    verbose: false
});
 
// setup the logger 
app.use(logger('combined', {stream: accessLogStream}));
 
app.get('/', function (req, res) {
    res.send('hello, world!');
});
```

### body-parser

处理程序之前，在中间件中对传入的请求体进行解析（response body）

```
text 将所有的数据以文本格式字符串的返回 form表单中 text-plain
urlencoded({extended:false});解析 x-www-form-urlencoded
raw解析二进制数据
```

![img](https://images2018.cnblogs.com/blog/1295418/201805/1295418-20180527211518006-2003422834.png)

```
// create application/json parser
var jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/login.do', jsonParser, (req, res) => {
    console.log('********************')
    console.log(req.body)
    res.end();
})
```

#### 加载到没有挂载路径的中间件

```
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
```

### Cookie-parser

方便操作客户端中的cookie值

Express完成cookie值的签名，`cookie-parser`实现签名cookie的解析。两者共用同一个秘钥。

签名前的cookie值为`chyingp`，签名后的cookie值为`s%3Achyingp.uVofnk6k%2B9mHQpdPlQeOfjM8B5oa6mppny9d%2BmG9rD0`，decode后为`s:chyingp.uVofnk6k+9mHQpdPlQeOfjM8B5oa6mppny9d+mG9rD0`。

出于安全的考虑，我们通常需要对cookie进行签名。

```
var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();

// 初始化中间件，传入的第一个参数为singed secret 签名
app.use(cookieParser('secret'));

app.use(function (req, res, next) {
  console.log(req.cookies.nick); // chyingp
  console.log(req.signedCookies.nick); // chyingp
  next();
});

app.use(function (req, res, next) {  
  // 传入第三个参数 {signed: true}，表示要对cookie进行摘要计算
  res.cookie('nick', 'chyingp', {signed: true});
  res.end('ok');
});

app.listen(3000);
```

例子改写如下，有几个注意点：

1. `cookieParser`初始化时，传入`secret`作为签名的秘钥。
2. 设置cookie时，将`signed`设置为`true`，表示对即将设置的cookie进行签名。
3. 获取cookie时，可以通过`req.cookies`，也可以通过`req.signedCookies`获取。

"解析"签名cookie阶段，中间件主要做了两件事：

1. 将签名cookie对应的原始值提取出来
2. 验证签名cookie是否合法

**cookie签名的作用**

主要是出于安全考虑，**防止cookie被篡改**，增强安全性。

假设网站通过`nick`这个cookie来区分当前登录的用户是谁。在前面例子中，登录用户的cookie中，nick对应的值如下：(decode后的)

```
s:chyingp.uVofnk6k+9mHQpdPlQeOfjM8B5oa6mppny9d+mG9rD0
```

此时，有人试图修改这个cookie值，来达到伪造身份的目的。比如修改成`xiaoming`：

```
s:xiaoming.uVofnk6k+9mHQpdPlQeOfjM8B5oa6mppny9d+mG9rD0
```

当网站收到请求，对签名cookie进行解析，发现签名验证不通过。由此可判断，cookie是伪造的。

```repl
hmac("xiaoming", "secret") !== "uVofnk6k+9mHQpdPlQeOfjM8B5oa6mppny9d+mG9rD0"
```

**签名就一定能够确保安全吗**

当然不是。

上个小节的例子，仅通过`nick`这个cookie的值来判断登录的是哪个用户，这是一个非常糟糕的设计。虽然在秘钥未知的情况下，很难伪造签名cookie。但用户名相同的情况下，签名也是相同的。这种情况下，其实是很容易伪造的。

### **express.static** 

设置静态文件路径的中间件

```
app.use(express.static('public'));
```

### HLayer.js

[https://github.com/huruji/Hlayer](https://links.jianshu.com/go?to=https%3A%2F%2Fgithub.com%2Fhuruji%2FHlayer)

https://www.jianshu.com/p/662908ec7713

made by Huruji,  web弹层组件

## 重要部分

1.express 中有两个对象可用于模板的渲染：`app.locals` 和 `res.locals`

除了get方法中使用render来向ejs模版传递参数，还可以用locals对象的属性为view提供变量。

在调用 `res.render` 的时候，express 合并（merge）了 3 处的结果后传入要渲染的模板，优先级：`res.render` 传入的对象> `res.locals` 对象 > `app.locals` 对象，所以 `app.locals` 和 `res.locals` 几乎没有区别，都用来渲染模板，使用上的区别在于：`app.locals` 上通常挂载常量信息（如博客名、描述、作者信息），`res.locals` 上通常挂载变量信息，即每次请求可能的值都不一样（如请求者信息，`res.locals.user = req.session.user`）。



2.RESTful API 接口规范

1）URI

URI 表示资源，资源一般对应服务器端领域模型中的实体类。

URI规范

不用大写；
用中杠-不用下杠_；
参数列表要encode；
URI中的名词表示资源集合，使用复数形式。

2）Request

HTTP方法
通过标准HTTP方法对资源CRUD

3）等等等等

### 登录系统

#### 流程

第一步，用户访问网站(未登录)，生成空的session，通过cookie记录sessionid

```
if(!req.session.userID || !req.session.userSign){
	res.redirect("/hopelibrary/user/login");
	return;
}
```

第二步，用户跳转到登录页面：这个页面会向后端验证码接口发送一个请求，服务器根据此时用户的cookie中记录的sessionid找到前面生成的空session，生成一个验证码

```
session{
	sessionId:
	checkcode:
}
```

第三步，用户填写完用户信息，点击提交，表单信息包括  会被发送到服务器，服务器首先根据用户请求中用户的cookie中的sessionid，找到设置的验证码，和前端发送的验证码进行比对，若一致，则继续进行账号密码验证登录，若不一致则返回错误

第四步，建立与mysql数据库的连接，查询用户库，返回结果存在则设置cookie和session并设置信息

```
res.cookie("userId", rows[0].readerID, {
	maxAge: 30 * 60 * 1000,
	path: '/',
});
const message = {
	code: 0,
	message: "成功",
	userId: user.readerID
};
setSession(req, {userID: user.readerID, userSign: true});
function setSession(req,options) {
    for(let a in options) {
        req.session[a] = options[a];
    }
}
```

第五步，验证码验证通过，验证登录，将用户信息存入session，用户变为登录状态。

```
session{
	sessionId:
	checkcode:
	userID: user.readerID
	userSign: true
}
```

如果存在session跳转到正常页面

```
if(req.session.userSign) {
	res.redirect('/hopelibrary/user');
	return;
}
```

#### 验证码

captchapng组件

```
exports.captchap=function (req, res, next) {
	//设置宽高
    var width=!isNaN(parseInt(req.query.width))?parseInt(req.query.width):100;
    var height=!isNaN(parseInt(req.query.height))?parseInt(req.query.height):48;
    //生成随机数
    var code = parseInt(Math.random()*9000+1000);
    //设置为session中的值
    req.session.checkcode = code;
    //生成图片
    var p = new captchapng(width,height, code);
    p.color(0, 0, 0, 0); 
    p.color(80, 80, 80, 255);
    var img = p.getBase64();
    var imgbase64 = new Buffer(img,'base64');
    //响应头 响应类型图片
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

const captchap=require("./checkcode").captchap;
router.route("/checkcode").get(function(req, res)
    captchap(req,res);
});//验证码
```

#### 加密

crypto组件进行md5加密

#### 升级

##### 安全方面

token

考虑到网站安全的问题，用户做任何操作的时候都要验证session。session的生命周期决定这种方式也不是绝对安全的，
假如用户已经登录了，攻击者截取到了用户发送到服务器的请求，用请求里的sessionid,去做其他操作，只要被截取的用户在线，服务器上这个session没有过期，那操作都能成功

### 数据交互

**db-common.js**

拼接mysql查询字符串

连接数据库

定义操作方法

```
function operate(connect, table){
	this.table = table;
	this.connection = connect;
}
operate.prototype.selectAll = function(callback) {
	const action = 'SELECT * ' + 'FROM ' + this.table;
	console.log('action:'+action);
	this.connection.query(action, callback)
};
```

**hopeDB.js**

继承operate，并绑定具体数据库

实现数据库方法库

```
const connection = mysqlUtil.DBConnection;
const adminOperate = new dbCommon.operate(connection, 'hopeadmin');
const adminDB = {
    selectAll: (callback) => {
        adminOperate.selectAll((err, rows, fields) => {
            if(err){
                console.log(err);
                return;
            }
            callback&&callback(rows);
        });
    },
}
```

**具体页面**

调用方法

```
userDB.selectAll((rows) => {
})
```

#### 封装

当你需要隐藏一些属性和方法时，就可以将这些属性和方法封装起来，然后通过一个外部可以调用的特定接口（也可以说是一个公共的方法）进行调用。

防止代码冗余,也可以方便代码的调用,同时也可以防止不必要的错误。

安全？

### 页面渲染

ejs模板，res.render获得相关信息

```
res.render("user/user-book",{userName,userImg,userPermission,firstPath:'borrow',secondPath:'',book,bookCate,bookNum,bookPage:pageNum});
```

### 鉴权系统

利用服务器端的session（会话）和浏览器端的cookie来实现前后端的认证

不同管理权限用户入口不同

```
{
	adminID:admin.adminID,
	adminSign: true
}
```

https://blog.csdn.net/weixin_40442219/article/details/83377530

## 附录：项目结构

### 1. 目录结构

HopeLibrarySystem-master 项目文件
       bin pm2配置信息
       git_images
       node_modules
       public 公共css、js、图片（图书封面、设备、用户头像和其他图片）
              css
                     main.css 主要css
              img
                     admin 用户头像
                     book 图书封面
                     equip 设备图片
					 user 用户头像
              js
                     admin-super
                            adduser.js
                     data
                            charts.config.js
                     hlayer
                            hlayer.css
                            hlayer.js
                     layer
                     public
                     user
              favicon.ico
       routes
              api
                     api-book-borrow.js
                     api-book.js
                     api-equip.js
                     api-login.js
                     api-user.js
              admin-book.js
              admin-equip.js
              admin-super.js
              admin.js
			  book.js
              checkcode.js
              email-schedule.js
              equip.js
              mysql_util.js
              public.js
              user.js
       utils
       views 各页面ejs
       api.md
       app.js
       config.js
       hopeWechat.sql
       lib.log
       package-lock.json
       package.json
       README.md

### 2. 数据库结构

bookborrow 记录借阅书籍情况

​	borrowID 借阅序号

​	borrowBookID 被借阅书ID

​	borrowUserID 借阅者ID

​	borrowTime 借阅时间

​	returnWhe 

​	returnBefore 预定归还时间

equipborrow 记录借用设备情况

​	borrowID 借用序号

​	borrowEquipID 被借用设备ID

​	borrowUserID 借用者ID

​	borrowTime 借用时间

​	returnWhe 

​	returnBefore 预定归还时间

​	reservation 是否审核通过

​	reservationText 借用理由

hopeadmin 记录管理员信息

​	adminID 管理员ID

​	adminName 管理员名字

​	adminPassword 管理员密码

​	adminEmail 管理员邮件

​	adminImgSrc 管理员头像路径

​	adminPermissions 管理员权限

hopebook 记录书籍信息

​	bookID 书ID

​	bookImgSrc 书封面路径

​	bookName 书名

​	bookHopeID 书Hope编号

​	bookAuthor 书作者

​	bookISBN 书ISBN

​	bookPress 书出版社

​	bookCate 书类目

​	bookLeft 是否被借阅

hopeequip 记录设备信息

​	equipID 设备ID

​	equipHopeID 设备Hope编号

​	equipName 设备名

​	equipImgSrc 设备图片路径

​	equipAdminID 设备管理员ID

​	equipLeft 是否被借用

hopereader 记录用户信息

​	readerID 用户ID

​	readerName 用户名字

​	readerPassword 用户密码

​	readerSex 用户性别

​	readerGroup 用户兴趣组

​	studentNumber 用户学号

​	readerMajor 用户专业

​	readerPhone 用户电话

​	readerEmail 用户邮箱

​	readerBadNum

​	userImgSrc 用户头像路径

https://www.cnblogs.com/chenchenluo/p/4197181.html

https://blog.csdn.net/q809198545/article/details/79692483

https://www.cnblogs.com/mingjiatang/p/7495321.html

https://www.jianshu.com/p/ff6763c7d823

https://www.cnblogs.com/chyingp/p/express-cookie-parser-deep-in.html

https://www.jianshu.com/p/136a95f5bdc6