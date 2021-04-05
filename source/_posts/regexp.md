---
title: RegExp正则表达式
categories:
- Algorithms
tags:
- Algorithms
- RegExp

date: 2018/07/13 20:46:25
---
JS中常用正则表达式操作

<!--more-->

# 正则表达式

---

# 定义
正则表达式，又称规则表达式。（英语：Regular Expression，在代码中常简写为regex、RegExp或RE），计算机科学的一个概念。在编写处理字符串的程序或网页时，经常会有查找符合某些复杂规则的字符串的需要。正则表达式就是用于**描述这些规则**的工具。换句话说，正则表达式就是记录文本规则的代码。正则表达式通常被用来检索、替换那些符合某个模式(规则)的文本。

正则表达式是对字符串操作的一种逻辑公式，就是用事先定义好的一些特定字符、及这些特定字符的组合，组成一个“规则字符串”，这个“规则字符串”用来表达对字符串的一种过滤逻辑。

# 测试

Javascript正则表达式在线测试工具[https://www.regexpal.com/][https://regexr.com/]

# 作用：

在字符串操作中常用于：

1. **验证**（给定的字符串是否符合正则表达式的过滤逻辑）

    - 验证输入是否符合规范


2. **查找**（可以通过正则表达式，从字符串中获取我们想要的特定部分）

    - 查找所需字符段落
    - 替换成自己想要的内容
    - 还有一些特殊的操作
    
3. 在HTML中可以这样使用
```
<style>
input:invalid { border-color: red; } input, input:valid { border-color: #ccc; }
</style>

<input type="text" name="tel" placeholder="tel" pattern="\d{11}">
```

# 声明
```
var expression = / pattern / flags;
var expression = new RegExp(" patterns " , " flags ");
//patterns为pattern中每个元字符前加一个\组成或者由字符串加变量组成
```

- expression：正则表达式的名称

- pattern：正则表达式的模式

- flags：标志，包括

 - g:global,应用于所有字符串，而非在发现第一个匹配项时立即停止
 - i:case-insesitive,忽略大小写
 - m:multiline,多行检测
 - u:Unicode,用来正确处理大于\uFFFFd Unicode字符
   注意：点（.）字符在正则表达式中，含义是除了换行符以外的任意单个字符。对于码位大于0xFFFF的 Unicode 字符，点字符不能识别，必须加上u修饰符
 - y:sticky,y修饰符的作用与g修饰符类似，也是全局匹配，后一次匹配都从上一次匹配成功的下一个位置开始。不同之处在于，g修饰符只要剩余位置中存在匹配就可，而y修饰符确保匹配必须从剩余的第一个位置开始，这也就是“粘连”的涵义。


# 实例属性
|属性|数据类型|意义|
|---|---|---|
|global|boolean|是否有g标志|
|ignoreCase|boolean|是否有i标志|
|multiline|boolean|是否有m标志|
|lastIndex|int|从第几个字符开始匹配|
|source|str|正则表达式的字符串表示|
|flags|str|正则表达式的修饰符|
|sticky|boolean|是否有y标签|



# RegExp实例方法

## regObj.test(strObj)
用于测试字符串中是否存在符合正则表达式模式的部分，如果**存在则返回true，否则返回false**。
```
var test = function(){
    var PhoneNumber = /^\d{11}$/;
    var number1 = "17802015408";
    var number2 = "1530775669";
    var number3 = "178020154080";
    console.log("number1 is a " + PhoneNumber.test(number1) + " phone number.");
    console.log("number2 is a " + PhoneNumber.test(number2) + " phone number.");
    console.log("number3 is a " + PhoneNumber.test(number3) + " phone number.");
}()
```

## regObj.exec(strObj)
方法用于正则表达式模式在字符串中运行查找，如果 exec() 找到了匹配的文本，则返回一个结果**数组**。否则，返回 **null**。除了数组元素和 length 属性之外，exec() 方法还返回两个属性。**index 属性**声明的是匹配文本的第一个字符的位置。**input 属性**则存放的是被检索的字符串 string。

调用非全局的 RegExp对象的 exec() 时，返回数组的第 0 个元素是与正则表达式相匹配的文本，第 1 个元素是与 RegExpObject 的第 1 个分组相匹配的文本（如果有的话），第 2 个元素是与 RegExp对象的第 2 个分组相匹配的文本（如果有的话），以此类推。

调用全局的RegExp对象的 exec() 时，它会在 RegExp实例的 lastIndex 属性指定的字符处开始检索字符串 string。当 exec() 找到了与表达式相匹配的文本时，在匹配后，它将把 RegExp实例的 lastIndex 属性设置为匹配文本的最后一个字符的下一个位置。可以通过反复调用 exec() 方法来遍历字符串中的所有匹配文本。当 exec() 再也找不到匹配的文本时，它将返回 null，并把 lastIndex 属性重置为 0。
```
//无g标志
var execs = function(){
    var text = "abababab";
    var pattern = /ab(ab)/;
    console.log(pattern.exec(text));
    console.log(pattern.lastIndex);
    console.log(pattern.exec(text));
	console.log(pattern.lastIndex);
    console.log(pattern.exec(text));
	console.log(pattern.lastIndex);
}()


//有g标志
var execg = function(){
	var text = "AbAbBCAb";

	var pattern = /Ab|BC/g;
	//pattern.lastIndex = 1;    //改变lastIndex属性
	console.log(pattern.lastIndex);
	console.log(pattern.exec(text));
	console.log(pattern.lastIndex);
	console.log(pattern.exec(text));
	console.log(pattern.lastIndex);
	console.log(pattern.exec(text));
	console.log(pattern.lastIndex);
	console.log(pattern.exec(text));
	console.log(pattern.lastIndex);
}()
```

# 字符串方法

## strObj.search(RegObj)
search() 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。search() 方法不执行全局匹配，它将忽略标志 g。它同时忽略 regexp 的 lastIndex属性，并且总是从字符串的开始进行检索，这意味着它总是返回 stringObject 的第一个匹配的位置。没有匹配则返回-1。

```
var search = function(){
	var text = "asdfasAAAAAA";
	var pattern = /AA/g;
	var te = "AA"
	console.log(text.search(pattern));
	console.log(text.indexOf(te));
	var example = "adfasd9ad1s1f";
	var pattern2 = /\d/g;
	console.log(example.charAt(example.search(pattern2)))；
}()
```

## strObj.match(RegObj)
字符串对象的match方法与正则对象的exec方法比较类似，但是如果正则表达式带有g修饰符，那么match方法就可以以数组的方式返回所有成功匹配的结果，但是exec方法只返回了一个。如果不带g，则是返回其分组结果。

```
var match = function(){
	var text="asdfasdasdfasdfadsf"
	var pattern = /a(sd)/g;
	console.log(text.match(pattern))
}()
```

## strObj.replace(regObj,replaceStr|function(){})
```
stringObject.replace(regexp/substr,replacement)
```
字符串 stringObject 的 replace() 方法执行的是查找并替换的操作。它将在 stringObject 中查找与 regexp 相匹配的子字符串，然后用 replacement 来替换这些子串。如果 regexp 具有全局标志 g，那么 replace() 方法将替换所有匹配的子串。否则，它只替换第一个匹配子串。

replacement 可以是字符串，也可以是函数。如果它是字符串，那么每个匹配都将由字符串替换。但是 replacement 中的 $ 字符具有特定的含义。如下表所示，它说明从模式匹配得到的字符串将用于替换。

|字符|	替换文本|
|---|---|
| \$1、\$2、...、\$99	|与 regexp 中的第 1 到第 99 个子表达式相匹配的文本。|
|\$&|	与 regexp 相匹配的子串。|
|\$`	|位于匹配子串左侧的文本。|
|\$'	|位于匹配子串右侧的文本。|
|\$$|直接量符号。|

**注意**：ECMAScript v3 规定，replace() 方法的参数 replacement 可以是函数而不是字符串。在这种情况下，每个匹配都调用该函数，它返回的字符串将作为替换文本使用。该函数的第一个参数是匹配模式的字符串。接下来的参数是与模式中的子表达式匹配的字符串，可以有 0 个或多个这样的参数。接下来的参数是一个整数，声明了匹配在 stringObject 中出现的位置。最后一个参数是 stringObject 本身。
```
//不使用正则
var replace = function(){
    var text = '1<%2%>34<%567%>89';
    text = text.replace('<','@');
    text = text.replace('%','#');
    text = text.replace('>','@');
    console.log(text);
}()
//使用正则
var replace = function(){
    var text = '1<%2%>34<%567%>89';
    text = text.replace(/<%(\d+)%>/g,'@#$1#@');
    console.log(text);
}()
```



## strObj.split(regObj)
```
stringObject.split(separator,howmany)
```
一个字符串数组。该数组是通过在 separator 指定的边界处将字符串 stringObject 分割成子串创建的。返回的数组中的字串不包括 separator 自身。

但是，如果 separator 是包含子表达式的正则表达式，那么返回的数组中包括与这些子表达式匹配的字串（但不包括与整个正则表达式匹配的文本）。
```
var split = function(){
    text = 'a1b2c3d'
    console.log(text.split(/\d/));
    name = "asfasdf,fadf./asdf.asdf[asdf"
    console.log(name.split(/\W/));
}()

```
# 语法
## 元字符
    ( [ { \ ^ $ | ) ? * + .

## 预定义的特殊字符

|字符|	描述|
|---|---|
|\t	|	制表符|
|\n	|	换行符|
|\r	|	回车符|
|\f	|	换页符|
|\a	|	alert字符|
|\e	|	escape字符|
|\cX	/|	与X相对应的控制字符|
|\b	|	与回退字符|
|\v	|	垂直制表符|
|\0	|	空字符|

## 分枝条件
继续在分组上做文章。在分组中插入管道符（“|”），把它划分为两个或多个候多项。
```
var reg = /(red|black|yellow)!!/;
alert(reg.test("red!!"))//true
alert(reg.test("black!!"))//true
alert(reg.test("yellow!!"))//true
```
## 边界
一个要与字符类合用的东西。

边界
|正则	|名称|	描述|
|---|---|---|
|^|	开头|	注意不能紧跟于左中括号的后面|
|$|	结尾|
|\b|	单词边界|	指[a-zA-Z_0-9]之外的字符|
|\B	|非单词边界	 |
单词边界举例。要匹配的东西的前端或未端不能为英文字母阿拉伯字数字或下横线。
```
var str = "12w-eefd&efrew";
alert(str.match(/\b\w+\b/g))//12w,eefd,efrew
```

## 字符类
### 简单类

原则上正则的一个字符对应一个字符，我们可以用[]把它们括起来，让[]这个整体对应一个字符。如
```
alert(/abc/.test("abc"));//true
alert(/[abc]/.test("a"));//true
alert(/[abc]/.test("b"));//true
alert(/[abc]/.test("c"));//true
alert("a bat ,a Cat,a fAt bat ,a faT cat".match(/[bcf]at/gi));//bat,Cat,fAt,bat,faT,cat
```
### 负向类

在[]前面加个元字符^进行取反，表示匹配不能为括号里面的字符。
```
alert(/[^abc]/.test("a"));//false
alert(/[^abc]/.test("b"));//false
alert(/[^abc]/.test("6"));//true
alert(/[^abc]/.test("gg"));//true
```
### 范围类

还是在那个中括号里面做文章。有时匹配的东西过多，而且类型又相同，全部输入太麻烦，我们可以用它。特征就是在中间加了个横线。
```
alert(/[a-f]/.test("b"));//true
alert(/[a-f]/.test("g"));//false
alert(/[a-z]/.test("h"));//true
alert(/[0-9]/.test("8"));//true
alert(/[0-9]/.test("a"));//false
```
### 组合类

中括号内可以组合使用不同类型的单个字符。
```

alert(/[^H-Y]/.test("G"));//true
alert(/[^7-9]/.test("6"));//true
alert(/[a-m1-5\n]/.test("a"))//true
alert(/[a-m1-5\n]/.test("3"))//true
alert(/[a-m1-5\n]/.test("\n"))//true
alert(/[a-m1-5\n]/.test("r"))//false
```
### 预定义类

使用反义字符代替某些常用的组合集

|字符|	等同于|	描述|
|---|---|---|
|.|	[^\n\r]	|除了换行和回车之外的任意字符|
|\d|	[0-9]|	数字字符|
|\D|	[^0-9]|	非数字字符|
|\s|	[ \t\n\x0B\f\r]|	空白字符|
|\S|	[^ \t\n\x0B\f\r]	|非空白字符|
|\w|	[a-zA-Z_0-9]|	单词字符(所有的字母)|
|\W|	[^a-zA-Z_0-9]|	非单词字符|

## 量词（限定符）

|代码|	描述|
|---|---|
|?|		出现零次或一次|
|*|		出现零次或多次(任意次)|
|+|		出现一次或多次（至少一次）|
|{n}	|	对应零次或者n次|
|{n,m}	|至少出现n次但不超过m次|
|{n,}|		至少出现n次(+的升级版)|
```
alert(/...../.test("正则表达式"))//true
alert(/正则表达式/.test("正则表达式"))//true

alert(/[\u4e00-\u9fa5]{5}/.test("正则表达式"))//true
alert(/[\u4e00-\u9fa5]{4}/.test("正则表达式55"))//true
alert(/^[\u4e00-\u9fa5]+$/.test("正则表达式"))//true
alert(/^[\u4e00-\u9fa5]+$/.test("正则表达式#")) //false
alert(/\d{6}/.test("123456"))//true
alert(/[regx]{2}/.test("ee"))//true
alert(/[regx]{2}/.test("ex"))//true
alert(/[regx]{2}/.test("xx"))//true
```
```
/[\u4e00-\u9fa5]/   //用于匹配单个汉字。这两个unicode值正好是Unicode表中的汉字的头和尾。
```

### 贪婪量词，懒惰量词与支配性量词

贪婪量词: 当正则表达式中包含能接受重复量词时，默认的行为是（在使整个表达式能得到匹配的前提下）匹配尽可能多的字符。
```
alert("aabab".match(/a.*b/g))//aabab
```

懒惰量词:在量词后加？，也就是匹配尽可能少的字符。其工作方式与贪婪量词相反。
```
alert("abaab".match(/a.*?b/g))

//为什么第一个匹配是aab（第一到第三个字符）而不是ab（第二到第三个字符）？简单地说，因为正则表达式有另一条规则，比懒惰／贪婪规则的优先级更高：最先开始的匹配拥有最高的优先权——The match that begins earliest wins。
```

表5.懒惰限定符
|代码|	描述|
|---|---|
|*?	|重复任意次，但尽可能少重复|
|+?|	重复1次或更多次，但尽可能少重复|
|??|	重复0次或1次，但尽可能少重复|
|{n,m}?|	重复n到m次，但尽可能少重复|
|{n,}?	|重复n次以上，但尽可能少重复|


支配性量词，在简单量词后加+。支配性量词只尝试一次。但是javascript不支持。


## 分组
到目前为止，我们接触到中括号表示范围内选择，大括号表示重复。小括号就可以表示分组，用作多字符的重复。

```
//分组+量词
alert(/(dog){2}/.test("dogdog"))//true

//分组+范围
alert("baddad".match(/([bd]ad?)*?/g))//baddad,dad

//分组+分组
alert("mon and dad".match(/(mon( and dad)?)/))//mon and dad,mon and dad, and dad
//man and dad 是符合正则模式的，而 and dad 是正则的一个分组]
```


### 捕获性分组
所有分组默认都是捕获性分组，当使用match或者exec方法不带全局属性的时候，就可以在返回数组的第1位开始捕获到符合分组的内容。
```
 var reg = /test(\d+)/;
 var str = 'test001 test002';
 console.log(str.match(reg));
//["test001", "001", index: 0, input: "test001"]

 var reg = /test(\d+)/g;
 var str = 'test001 test002';
 console.log(str.match(reg));
 //["test001", "test002"]
 
 var reg = /test(\d)+/;
 var str = 'test001 test002';
 console.log(str.match(reg));
//["test001", "1", index: 0, input: "test001"]

 var reg = /test(\d)+/;
 var str = 'test001 test002';
 console.log(str.match(reg));
//["test001", "1", index: 0, input: "test001"]

var reg = /test(\d)+?/;
 var str = 'test001 test002';
 console.log(str.match(reg));
//["test0", "0", index: 0, input: "test001"]
```
### 反向引用

**捕获会返回一个捕获组，这个分组是保存在内存中，不仅可以在正则表达式外部通过程序进行引用，也可以在正则表达式内部进行引用，这种引用方式就是反向引用**。

反向引用标识由正则表达式中的匹配组捕获性分组。每个反向引用都由一个编号或名称来标识，并通过“\编号”表示法进行引用。（MDN不推荐使用）
```
var color = "#990000";
/#(\d+)/.test(color);
alert(RegExp.$1);//990000
 
alert(/(dog)\1/.test("dogdog"))//true
 
var num = "1234 5678";
var newNum = num.replace(/(\d{4}) (\d{4})/,"$2 $1");
alert(newNum)
```

你也可以自己指定分组的组名。要指定一个分组的组名，请使用这样的语法：(?< name >exp)这样就把这部分表达式的组名指定为Word了。要反向引用这个分组捕获的内容，你可以使用\${name}来调用匹配到的内容

使用小括号的时候，还有很多特定用途的语法。下面列出了最常用的一些：
|代码|	说明|
|---|---|
|(exp)	|匹配exp,并捕获文本到自动命名的组里|
|(?< name \>exp)|	匹配exp,并捕获文本到名称为name的组里，也可以写成(?'name'exp)|
|(?:exp)|	匹配exp,不捕获匹配的文本，也不给此分组分配组号|


### 非捕获性分组
并不是所有分组都能创建反向引用，有一种特别的分组称之为非捕获性分组，它是不会创建反向引用。反之，就是捕获性分组。要创建一个非捕获性分组，只要在分组的左括号的后面紧跟一个问号与冒号就行了。使用match、exec方法的时候就不会捕获到分组的内容。
```
var reg = /test(?:\d)+/;
 var str = 'test001';
 console.log(str.match(reg));
//["test001", index: 0, input: "test001"]
```







## 零宽断言

1. 断言：俗话的断言就是“我断定什么什么”，而正则中的断言，就是说正则可以指明在指定的内容的前面或后面会出现满足指定规则的内容.
   意思正则也可以像人类那样断定什么什么，比如"ss1aa2bb3",正则可以用断言找出aa2前面有bb3，也可以找出aa2后面有ss1.
2. 零宽：就是没有宽度，在正则中，断言只是匹配位置，不占字符，也就是说，匹配结果里是不会返回断言本身。

|正则|	名称|	描述|
|---|---|---|
|(?=exp)	|正向前瞻|	匹配exp前面的位置|
|(?!exp)|	负向前瞻|	匹配后面不是exp的位置|
|(?<=exp)|	正向后瞻|	匹配exp后面的位置 JavaScript不支持|
|(?<\!exp) |	负向后瞻|	匹配前面不是exp的位置 JavaScript不支持|
正向前瞻用来检查接下来的出现的是不是某个特定的字符集。而负向前瞻则是检查接下来的不应该出现的特定字符串集。零宽断言是不会被捕获的。

```
var str1 = "bedroom";
var str2 = "bedding";
var reBed = /(bed(?=room))///在我们捕获bed这个字符串时，抢先去看接下来的字符串是不是room
alert(reBed.test(str1));//true
alert(RegExp.$1)//bed
alert(RegExp.$2 === "")//true
alert(reBed.test(str2))//false
var str1 = "bedroom";
var str2 = "bedding";
var reBed = /(bed(?!room))/  //要来它后面不能是room
alert(reBed.test(str1))//false
alert(reBed.test(str2))//true
```





# 小练习
## 检验

QQ号码： [1-9][0-9]{4,14}

手机号码：^(13[0-9]|14[57]|15[0-35-9]|18[0-35-9])\d{8}$

身份证：^([0-9]){7,18}(x|X)?$

密码：^[a-zA-Z]\w{5,17}$ 字母开头，长度在6~18之间，只能包含字母、数字和下划线

强密码：^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$ 包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间
电话号码
验证码/^[a-zA-z0-9]{4}$]/ 
IP地址
邮箱
网址


单词首字母大写
```
var a = "asdf";
 String.prototype.capitalize =  function () {
     return this.replace(/^\w/, function (s) {
         return s.toUpperCase();
     });
 }
alert(a.capitalize())//Asdf
```
```
var replace = function(){
    var text = "javascript Tutorial";
    console.log(text.replace(/\S/ig, '($&)'));
}()    
var replace = function(){    
    var name = "Doe, John";
    console.log(name.replace(/(\w+)\s*, \s*(\w+)/, "$2 $1"));
    var str = 'aaa bbb ccc';
    console.log(str.replace(/\b\w+\b/g, function(word){
	return word.substring(0,1).toUpperCase()+word.substring(1);}
	))
	
}()
```
月日年变日月年
```
"04-22-2018".replace(/(?<month>\d{2})-(?<day>\d{2})-(?<year>\d{4})/, (...args) => {
  const groups = args.slice(-1)[0]
  const {day, month, year} = groups
  return `${day}-${month}-${year}`
}) // "25-04-2017"
```

题目，移除所有标签，只留下innerText!
```
var html = "<p><a href='http://www.cnblogs.com/rubylouvre/'>Ruby Louvre</a>by <em>正则表达式</em></p>";
var text = html.replace(/<(.|\s)*?>/g, "");
alert(text)//Ruby Louvreby 正则表达式
```


# 官方教程
[微软：.NET 正则表达式](https://docs.microsoft.com/zh-cn/dotnet/standard/base-types/regular-expression-language-quick-reference)
[MSDN](https://msdn.microsoft.com/zh-cn/library/system.text.regularexpressions.regex.aspx)
[W3CSCHOOL 正则表达式基本语法](https://www.w3cschool.cn/regexp/zoxa1pq7.html)

# 参考资料
[正则表达式30分钟入门教程](http://www.cnblogs.com/deerchao/archive/2006/08/24/zhengzhe30fengzhongjiaocheng.html)
[JavaScript 正则表达式上——基本语法](http://www.cnblogs.com/dolphinX/p/3486214.html)
[JavaScript正则表达式下——相关方法](http://www.cnblogs.com/dolphinX/p/3486136.html)
[js正则表达式/replace替换变量方法](https://blog.csdn.net/xbfengyu/article/details/53150773)
[65条最常用正则表达式 你要的都在这里了](http://www.jb51.net/article/77687.htm)
[JavaScript replace() 方法](http://www.w3school.com.cn/jsref/jsref_replace.asp)
[JavaScript split() 方法](http://www.w3school.com.cn/jsref/jsref_split.asp)、
[javascript正则表达式](http://www.cnblogs.com/rubylouvre/archive/2010/03/09/1681222.html)
[JS 正则中的命名捕获分组](https://www.cnblogs.com/ziyunfei/p/6761413.html)
[javascript正则表达式中分组详解](http://www.jb51.net/article/88742.htm)
[pattern--HTML5的表单验证属性](https://www.w3cplus.com/html5/html5-form-validation-with-the-pattern-attribute.html)

https://zhuanlan.zhihu.com/p/83876910?utm_source=qq&utm_medium=social&utm_oi=549346247203553280