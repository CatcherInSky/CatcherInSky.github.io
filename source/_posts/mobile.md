# HTML5 移动设备触摸界面设计与开发

## 移动设备与 PC的区别

### 界面大小

在移动页面，页面较小，交互元素应足够大到可以用手指来操控

内容应适合在小屏体现

手机屏幕的横竖切换

### 运算能力

绘图时使用移动设备的“共享内存”

受网速影响较大，移动设备用户耐心较少

缓存有限，且经常被清空， WebStorage 在IOS上储存UTF-16格式文本，实际存储总量为2.5M

缓存生命周期？

### 交互方式

手指触摸 手机厂商开发的手势

### 使用方式

用户体验的快来自于及时响应，即使是失败的反馈也比没有反馈好

可以在发出请求时马上响应，做一些过渡动画，待请求处理完成后再转为内容

### 内核

移动设备流行的内核为WebKit

### 设备规格

平板800px 手机480px？



### 移动优先

先开发移动设备的代码再适配桌面设备



### Viewport

虚拟像素 实际像素  CSS像素 dpr





在真正必要时才让用户为大图的额外大小等待

数据大小与资费与加载速度





###  图片响应式

```html
//媒体查询方案
<div role="img" aria-label="description" class="img"></div>
//div破坏语义化，降级使用网页易读性倡议—无障碍富互联网应用（WAI-ARIA）来明确指定语义
<style>
    .img{
        max-width:640px;
        width:100%;
        height:0;
        padding-bottom:56%;
        //垂直方向内边距百分比也是宽度的百分比，使用padding百分比来占位出一个符合图片比例的空间
        background-size:100%;
        background:url(gull-640X360.jpg)
    }
    @media only screen and (min-width:800px){
        .img{
            background:url(gull-640x360.jpg)
        }
    }
    //媒体查询宽度更换图片
    @media only screen and (min-width:480px){
        .img{
            background:url(gull-360x112.jpg)
        }
    }
    /媒体查询dpr更换图片
    @media only screen and (device-pixel-ratio:1.5){
        .img{
            background:url(gull-360x112.jpg)
        }
    }
    //image-set方案根据dpr更换图片
    @media only screen and (min-width:480px){
        .img{
            background:url(gull-720x225.jpg);
            background：image-set(
            	url(gull-360x112.jpg) 1x;
            	url(gull-720x225.jpg) 1.5x;
            	url(gull-720x225.jpg) 2x;
            )
        }
    }
</style>
```



## 优化页面加载

### 缓存

### 使首页重定向可缓存

通常做法将移动用户重定向到一个单独的移动版网站（如百度 baidu.com->m.baidu.com），这个重定向将增加额外的（浏览器到服务器之间）的往返次数（重定向通过HTTP报头通知浏览器在另一位置获取资源），可以通过允许**客户端缓存重定向**得到一定程度的缓解。设置一个包含过期时间的报头实现：

```
HTTP/1.1 302 Moved Temporarily
Date:Mon, 27 Aug...
Expires:Sat,25 Aug...
//已过期
Cache-Control:private,max-age=86400
//86400=24*60*60

//防止代理服务器缓存
```

max-age不设置久一点是考虑到通过代理访问互联网的PC用户，在使用同一代理的移动用户访问后，不会被重定向到移动网站





### 浏览器缓存

不同浏览器缓存大小不同，一般为数十至数百M。且不会保存到浏览器再次启动，杀进程/崩溃/手机重启会清空浏览器缓存。

应用场景不大，往往用户没有任何缓存访问，因此优化时，状态不能忽略，要配置好HTTP报头来设置。



### WebStorage 

WebStorage 在IOS上储存UTF-16格式文本，实际存储总量为2.5M

同源策略限制。

用户重置浏览器丢失数据

用作缓存层



### 应用缓存

事先提供一个清单内含所需全部资源，浏览器下载并缓存其内容。该文件的MIME类型必须为text/cache-manifest，不太好用。

页面自动刷新用户体验不好，询问获得新内容也不妥，获取某个资源失败会忽略整个清单，一个请求失败下次访问没有缓存。

```
<html manifest="XXX.appcache">
//manifest文件
CACHE MANIFST

# TImestamp://因为资源不过期，只能通过更改时间戳强制更改清单文件
# 2013-03-15rl

CACHE://缓存内容，下面文件会在首次访问页面时永久缓存，直到manifest（而不是资源本身）被改变或用户清除缓存
jquery.js
gull-720x225.jpg

NETWORK://允许访问资源的域名的白名单，因为应用缓存为离线使用设计，必须通过网络加载的内容白名单获取
*//表示所有

FALLBACK://指定备用资源，相对路径
```

问题：缓存到期文件也不会立刻更新，要到下一次访问才更新。

解决：window.applicationCache 对象的status属性

状态码：

0 UNCACHED 没有使用

1 IDLE 缓存没更新

2 CHECKING 下载清单，可用更新

3 DOWNLOADING 清单已改，下载资源

4 UPDATEREADY 新缓存下载好，准备被使用

5 OBSOLETE 旧缓存不能用

```
let appCache = window.applicatioonCache;
appCache.addEventListener('updateready',function(e){
	if(appCache.status==appCache..UPDATEREADY){
		appCache.swapCache();
		window.location.reload();
	}
})
appCache.update()
```

放在页面最后判断是否有更新，更新则刷新页面



### PJAX？？？

PJAX= pushState+AJAX

AJAX的问题在与在移动设备上，考虑到分享等功能，页面与链接的对应关系会因为AJAX破坏（AJAX改变页面显示但不改变链接，导致分享出去的链接对应不是分享时页面）。所以必须使用history。

history像一个卡片的栈，pushState可以在当前加入一个新卡片，并清除前面所有卡片（访问了一系列网站，后退之后访问了新的网站，后退节点原本之后的记录就没了），replaceState则是替换当前卡片。

history.pushState({state},title,URL)

书中P72

**可实现路由**

P74

**模板渲染**

p76

使用PJAX会产生隐藏的DOM节点（不用的内容），删除多余隐藏节点可以减少存储空间和内存占用

策略：设置最大节点数，去除队列前方的节点

p77

**SPA**



## 触摸事件

处理触摸事件是记得浏览器和设备原生的事件（双击放大），避免覆盖。

touchstart，包含touches

touchmove，包含touches

touchend，包含touches

touchcancel 触摸被事件中断，如通知

touches数组是一组触摸事件产生的触摸对象，代表触摸屏幕的手指，属性包括

identifier

screenX/Y

clientX/Y

pageX/Y

target

ios可能不支持？

radius[X/Y] 接触点半径

rotationAngle 旋转至匹配需要角度？ 

force 力度

IE自己玩自己的指针事件

```
node.addEventListener('touchstart',(e)=>{
	e.preventDefault();
	e.target.className="active but"
	//do
})
//preventDefault()之后按钮不会进入active状态，它是用户知晓界面收到一次轻触的途径（用户反馈）
//可以通过切换样式类激活active状态
node.addEventListener('touchend',(e)=>{
	e.preventDefault();
	e.target.className="but"
	//do
})
```

自定义事件合并touch和click

P85



## 手势

手势不仅要判断触点，更要判断行为（滑动、双指）

在移动页面尽可能多手势，但考虑到移动屏幕阅读器用户可能无法正确滑动，最好是建立无需手势的基础页面，在加上手势作为增强，循序渐进增强。

P134





## CSS过渡、动画和变换

CSS transition

独立于JS执行线程的另一线程中执行，不影响脚本执行

cubic-bezier（0,x,y,1）立方贝塞尔方程

P96弹球动画

transform

matrix？？？

@keyframes name{

0{}

50%{}

100%{}

}

requestAnimationFrame???

1000ms/帧率

GPU 加速

2d 不一定在GPU上渲染 3d一定

将2D转换为3D利用GPU加速 translate(x,y)->translate3d(x,y,0),Z为0，仍然可以被加载到GPU上

原理：浏览器决定一个元素使用GPU加速时，不能把原生DOM传给GPU，而是将元素呈现在图像中，像GPU发送图像，GPU将图像应用为多边形纹理贴图来代表元素。然后GPU迅速移动多边形，如果位图有透明性信息（Alpha通道），就能部分透明，GPU还可以缩放旋转或原生地应用变换，但是不能重新渲染内容。

缺点：3D变换放大会导致模糊，因为3D操作图像，只能按比例放大图像，导致模糊

解决：在动画完成时，通过在触发transitionend/animationend事件时改变样式，将3D转回2D，净化变换

```
element.addEventListener(transformend,(e)=>{
	element.style[transform]='scale(2)'
})
element.style[transformd]='scale3d(2,2,0)'
```

净化变换还可释放GPU占用的内存



## 无限滚动？？？

P120





## 后感

可以看一下早期的开发者怎么思考他们遇到的问题，然后逐步形成现在的框架，来加深对框架的理解。

第五章比较惊喜

知识有些落后的注意甄别

《HTML5 触摸界面设计与开发》