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

tanslateZ可以利用gpu加速



这个问题是因为使用transform和opacity做CSS动画的时候，会将元素提升为一个复合层；而使用js操作css属性做动画时，必须使用translateZ或will-change才能将元素强行提升至一个复合层。

元素本身使用transform和opacity做CSS动画的时候，会提前告诉GPU动画如何开始和结束及所需要的指令；所以会创建一个复合层（渲染层），并把页面所有的复合层发送给GPU；作为图像缓存，然后动画的发生仅仅是复合层间相对移动。

而使用js做动画，js必须在动画的每一帧计算元素的状态；发送给GPU，但不会将元素提升至一个复合层；所以想让元素提升至一个复合层，必须使用translateZ或will-change: transform, opacity。









**window.requestAnimationFrame()** 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行

**显示器也会以每秒60次的频率正在不断的更新屏幕上的图像****16.7ms**(1000/60≈16.7



与setTimeout相比，requestAnimationFrame最大的优势是**由系统来决定回调函数的执行时机。**具体一点讲，如果屏幕刷新率是60Hz,那么回调函数就每16.7ms被执行一次，如果刷新率是75Hz，那么这个时间间隔就变成了1000/75=13.3ms，换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走。**它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次**，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。

```
var progress = 0;
//回调函数
function render() {
    progress += 1; //修改图像的位置
    if (progress < 100) {
           //在动画没有结束前，递归渲染
           window.requestAnimationFrame(render);
    }

}
//第一帧渲染
window.requestAnimationFrame(render);
```

- **CPU节能**：使用setTimeout实现的动画，当页面被隐藏或最小化时，setTimeout 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费CPU资源。而requestAnimationFrame则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统步伐走的requestAnimationFrame也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了CPU开销。

- **函数节流**：在高频率事件(resize,scroll等)中，为了防止在一个刷新间隔内发生多次函数执行，使用requestAnimationFrame可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。一个刷新间隔内函数执行多次时没有意义的，因为显示器每16.7ms刷新一次，多次绘制并不会在屏幕上体现出来。

```
var dis =0;
function animation(){
  requestAnimationFrame(function(){
      div.style.left = ++dis;
      if(disx<50) animation();
  })  
}
animation();
```

####    https://blog.csdn.net/vhwfr2u02q/article/details/79492303

伪类

- 
- [`:active`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:active)
- [`:any-link`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:any-link) 
- [`:blank`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:blank) 
- [`:checked`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:checked)
- [`:current`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:current) 
- [`:default`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:default)
- [`:defined`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:defined)
- [`:dir()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:dir) 
- [`:disabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:disabled)
- [`:drop`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:drop) 
- [`:empty`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:empty)
- [`:enabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:enabled)
- [`:first`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first)
- [`:first-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-child)
- [`:first-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-of-type)
- [`:fullscreen`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:fullscreen) 
- [`:future`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:future) 
- [`:focus`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus)
- [`:focus-visible`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-visible) 
- [`:focus-within`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-within)
- [`:has()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:has) 
- [`:host`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:host)
- [`:host()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:host())
- [`:host-context()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:host-context()) 
- [`:hover`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:hover)
- [`:indeterminate`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:indeterminate)
- [`:in-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:in-range)
- [`:invalid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid)
- [`:is()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:is) 
- [`:lang()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:lang)
- [`:last-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-child)
- [`:last-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-of-type)
- [`:left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:left)
- [`:link`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:link)
- [`:local-link`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:local-link) 
- [`:not()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not)
- [`:nth-child()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child)
- [`:nth-col()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-col) 
- [`:nth-last-child()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-child)
- [`:nth-last-col()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-col) 
- [`:nth-last-of-type()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-of-type)
- [`:nth-of-type()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-of-type)
- [`:only-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-child)
- [`:only-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-of-type)
- [`:optional`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:optional)
- [`:out-of-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:out-of-range)
- [`:past`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:past) 
- [`:placeholder-shown`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:placeholder-shown) 
- [`:read-only`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:read-only)
- [`:read-write`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:read-write)
- [`:required`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:required)
- [`:right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:right)
- [`:root`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root)
- [`:scope`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:scope)
- [`:target`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:target)
- [`:target-within`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:target-within) 
- [`:user-invalid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:user-invalid) 
- [`:valid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:valid)
- [`:visited`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:visited)
- [`:where()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:where) 

  

内联元素

1 a – 锚点

2 abbr – 缩写

3 acronym – 首字

4 b – 粗体(不推荐)

5 bdo – bidi override

6 big – 大字体

7 br – 换行

8 cite – 引用

9 code – 计算机代码(在引用源码的时候需要)

10 dfn – 定义字段

11 em – 强调

12 font – 字体设定(不推荐)

13 i– 斜体

14 img – 图片

15 input – 输入框

16 kbd – 定义键盘文本

17 label – 表格标签

18 q – 短引用

19 s – 中划线(不推荐)

20 samp – 定义范例计算机代码

21 select – 项目选择

22 small – 小字体文本

23 span – 常用内联容器，定义文本内区块

24 strike – 中划线

25 strong – 粗体强调

26 sub – 下标

27 sup – 上标

28 textarea– 多行文本输入框

29 tt – 电传文本

30 u – 下划线

31 var – 定义变量

# css可以继承的属性和不可继承的属性

2018.07.01 16:03:12字数 169阅读 677

不可继承的：display、margin、border、padding、background、height、min-height、max- height、width、min-width、max-width、overflow、position、left、right、top、 bottom、z-index、float、clear、table-layout、vertical-align、page-break-after、 page-bread-before和unicode-bidi

所有元素可继承：visibility和cursor

内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、 font-family、font-size、font-style、font-variant、font-weight、text- decoration、text-transform、direction

块状元素可继承：text-indent和text-align

列表元素可继承：list-style、list-style-type、list-style-position、list-style-image

表格元素可继承：border-collapse





0人点赞



[日记本](https://www.jianshu.com/nb/7366781)

## transform

position

display

inline-

flex

垂直居中

https://segmentfault.com/a/1190000016389031



```
<div class="red blue">123</div>
<div class="blue red">123</div>
.red {
    color: red
}

.blue {
    color: blue
}
```

两蓝

权重一样，按照声明顺序，后声明的优先。

## CSS单位

| 单位 | 描述                                                         |
| :--- | :----------------------------------------------------------- |
| %    | 百分比                                                       |
| in   | 英寸                                                         |
| cm   | 厘米                                                         |
| mm   | 毫米                                                         |
| em   | 1em 等于当前的字体尺寸。2em 等于当前字体尺寸的两倍。例如，如果某元素以 12pt 显示，那么 2em 是24pt。在 CSS 中，em 是非常有用的单位，因为它可以自动适应用户所使用的字体。 |
| ex   | 一个 ex 是一个字体的 x-height。 (x-height 通常是字体尺寸的一半。) |
| pt   | 磅 (1 pt 等于 1/72 英寸)                                     |
| pc   | 12 点活字 (1 pc 等于 12 点)                                  |
| px   | 像素 (计算机屏幕上的一个点)                                  |

选择器

## 盒模型

border-box content-box

### BFC块格式化上下文

Box 是 CSS 布局的对象和基本单位，页面是由若干个Box组成的。

元素的类型 和 `display` 属性，决定了这个 Box 的类型。不同类型的 Box 会参与不同的 Formatting Context。

> Formatting Context

Formatting Context 是页面的一块渲染区域，并且有一套渲染规则，决定了其子元素将如何定位，以及和其它元素的关系和相互作用。

Formatting Context 有 BFC (Block formatting context)，IFC (Inline formatting context)，FFC (Flex formatting context) 和 GFC (Grid formatting context)。FFC 和 GFC 为 CC3 中新增。

> [BFC布局规则](https://www.w3.org/TR/2011/REC-CSS2-20110607/visuren.html#block-formatting)

- BFC内，盒子依次垂直排列。
- BFC内，两个盒子的垂直距离由 `margin` 属性决定。属于同一个BFC的两个相邻Box的margin会发生重叠【符合合并原则的margin合并后是使用大的margin】
- BFC内，每个盒子的左外边缘接触内部盒子的左边缘（对于从右到左的格式，右边缘接触）。即使在存在浮动的情况下也是如此。除非创建新的BFC。
- BFC的区域不会与float box重叠。
- BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
- 计算BFC的高度时，浮动元素也参与计算。

> 如何创建BFC

- 根元素或其它包含它的元素
- 浮动元素 (元素的 float 不是 none)
- 绝对定位元素 (元素具有 position 为 absolute 或 fixed)
- 内联块 (元素具有 display: inline-block)
- 表格单元格 (元素具有 display: table-cell，HTML表格单元格默认属性)
- 表格标题 (元素具有 display: table-caption, HTML表格标题默认属性)
- 具有overflow 且值不是 visible 的块元素，
- display: flow-root
- column-span: all 应当总是会创建一个新的格式化上下文，即便具有 column-span: all 的元素并不被包裹在一个多列容器中。
- 一个块格式化上下文包括创建它的元素内部所有内容，除了被包含于创建新的块级格式化上下文的后代元素内的元素。

> BFC 的应用

1. 防止 margin 重叠 (同一个BFC内的两个两个相邻Box的 `margin` 会发生重叠，触发生成两个BFC，即不会重叠)
2. 清除内部浮动 (创建一个新的 BFC，因为根据 BFC 的规则，计算 BFC 的高度时，浮动元素也参与计算)
3. 自适应多栏布局 (BFC的区域不会与float box重叠。因此，可以触发生成一个新的BFC)

### W3C对BFC的定义如下：

```
浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为“visiable”的块级盒子，都会为他们的内容创建新的BFC（块级格式上下文）。
```

为了便于理解，我们换一种方式来重新定义BFC。一个HTML元素要创建BFC，则满足下列的任意一个或多个条件即可：

1、float的值不是none。
2、position的值不是static或者relative。
3、display的值是inline-block、table-cell、flex、table-caption或者inline-flex
4、overflow的值不是visible

BFC是一个独立的布局环境，其中的元素布局是不受外界的影响，并且在一个BFC中，块盒与行盒（行盒由一行中所有的内联元素所组成）都会垂直的沿着其父元素的边框排列。



### 隐藏页面中的某个元素的方法有哪些？

> 隐藏类型

屏幕并不是唯一的输出机制，比如说屏幕上看不见的元素（隐藏的元素），其中一些依然能够被读屏软件阅读出来（因为读屏软件依赖于可访问性树来阐述）。为了消除它们之间的歧义，我们将其归为三大类：

- 完全隐藏：元素从渲染树中消失，不占据空间。
- 视觉上的隐藏：屏幕中不可见，占据空间。
- 语义上的隐藏：读屏软件不可读，但正常占据空。

> 完全隐藏

**1.`display` 属性**

```css
display: none;
```

**2.hidden 属性**

HTML5 新增属性，相当于 `display: none`

```html
<div hidden>
</div>
```

dipslay:none,visibility:hidden都会被构建DOM树

解析HTML构建DOM树在前面；而样式的加载在后面

dispaly:none的元素不会被加入到**Render Tree** 而visibility:hidden的元素会被加入到Render Tree；

> 视觉上的隐藏

**1.利用 `position` 和 盒模型 将元素移出可视区范围**

1. 设置 `posoition` 为 `absolute` 或 `fixed`，通过设置 `top`、`left` 等值，将其移出可视区域。

```css
position:absolute;
left: -99999px;
```

1. 设置 `position` 为 `relative`，通过设置 `top`、`left` 等值，将其移出可视区域。

```css
position: relative;
left: -99999px;
height: 0
```

1. 设置 margin 值，将其移出可视区域范围（可视区域占位）。

```css
margin-left: -99999px;
height: 0;
```

**2.利用 transfrom**

1. 缩放

```css
transform: scale(0);
height: 0;
```

1. 移动 `translateX`, `translateY`

```css
transform: translateX(-99999px);
height: 0
```

1. 旋转 `rotate`

```css
transform: rotateY(90deg);
```

**3.设置其大小为0**

1. 宽高为0，字体大小为0：

```css
height: 0;
width: 0;
font-size: 0;
```

1. 宽高为0，超出隐藏:

```css
height: 0;
width: 0;
overflow: hidden;
```

**4.设置透明度为0**

```css
opacity: 0;
```

**5.`visibility`属性**

```css
visibility: hidden;
```

**6.层级覆盖，`z-index` 属性**

```css
position: relative;
z-index: -999;
```

再设置一个层级较高的元素覆盖在此元素上。

**7.clip-path 裁剪**

```css
clip-path: polygon(0 0, 0 0, 0 0, 0 0);
```

> 语义上的隐藏

**aria-hidden 属性**

读屏软件不可读，占据空间，可见。

```html
<div aria-hidden="true">
</div>
```

# 圣杯布局和双飞翼布局的理解与思考

https://www.jianshu.com/p/81ef7e7094e8

- 两侧宽度固定，中间宽度自适应
- 中间部分在DOM结构上优先，以便先行渲染
- 允许三列中的任意一列成为最高列
- 只需要使用一个额外的`<div>`标签