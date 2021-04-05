---
title: Typescript学习笔记
categories:
- Typescript
tags:
- Typescript
date: 2019/06/12 15:12:21
typora-root-url: ../../source/
---

Typescript的学习记录，更新中……

基础类型、接口、泛型、类、函数、对象、声明

<!--more-->

# Typescript学习笔记



# 基础类型

## 布尔值、数字

同JS

## 字符串

字符串字面量类型用来约束取值只能是某几个字符串中的一个。

```
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dbclick');/ 报错，event 不能为 'dbclick'
```



## 元组Tuple

表示已知元素数量和类型的数组

```
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; 
```

当访问一个越界的元素，会使用联合类型替代：

```
x[3] = 'world'; // OK, 字符串可以赋值给(string | number)类型
x[6] = true; // Error, 布尔不是(string | number)类型
console.log(x[5].toString()); // OK, 'string' 和 'number' 都有 toString
```

## 枚举enum

自定义索引的数组，为一组数值赋予友好的名字。用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等

```
enum Color {Red, Green, Blue}// 从0开始，0,1,2；Color[Color["Red"] = 0] = "Red";
enum Color {Red = 1, Green, Blue}// 从1开始，1,2,3；
enum Color {Red = 1, Green = 2, Blue = 4}// 1,2,4；
let c: Color = Color.Green;//2
let colorName: string = Color[2];//由枚举的值得到它的名字 Green
```

### 字符串枚举

字符串枚举的概念很简单，但是有细微的[运行时的差别](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Enums.html#enums-at-runtime)。 在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。

```ts
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```

由于字符串枚举没有自增长的行为，字符串枚举可以很好的序列化。 换句话说，如果你正在调试并且必须要读一个数字枚举的运行时的值，这个值通常是很难读的 - 它并不能表达有用的信息（尽管[反向映射](https://zhongsp.gitbooks.io/typescript-handbook/content/doc/handbook/Enums.html#enums-at-runtime)会有所帮助），字符串枚举允许你提供一个运行时有意义的并且可读的值，独立于枚举成员的名字。

## 任意值any

使用`any`类型来标记不希望被类型检查器检查而直接通过编译阶段检查的变量。 

允许你在编译时可选择地包含或移除类型检查。 你可能认为`Object`有相似的作用，就像它在其它语言中那样。 但是`Object`类型的变量只是允许你给它赋任意值 - 但是却不能够在它上面调用任意的方法，即便它真的有这些方法

```
let notSure: any = 4;
notSure.ifItExists(); // okay, ifItExists might exist at runtime
notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

let prettySure: Object = 4;
prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
```



## 空值void

 当一个函数没有返回值时，你通常会见到其返回值类型是`void`：

```ts
function warnUser(): void {
    console.log("This is my warning message");
}
```

`void`类型的变量只能赋予为`undefined`和`null`：

```ts
let unusable: void = undefined;
```

## Null 和 Undefined

默认情况下`null`和`undefined`是所有类型的子类型。 就是说你可以把`null`和`undefined`赋值给`number`类型的变量。

```ts
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```

## Never

`never`类型表示的是那些永不存在的值的类型。 例如，`never`类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是`never`类型，当它们被永不为真的类型保护所约束时。

`never`类型是任何类型的子类型，也可以赋值给任何类型；然而，*没有*类型是`never`的子类型或可以赋值给`never`类型（除了`never`本身之外）。 即使`any`也不可以赋值给`never`。

下面是一些返回`never`类型的函数：

```ts
// 返回never的函数必须存在无法达到的终点
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

## 联合类型

```
let myFavoriteNumber: string | number;

Dinner要么有 fish 要么有 bear
// 🙁 Not good.
interface Dinner1 {
  fish?: number,
  bear?: number,
}

// 🙂 Awesome!
type Dinner2 = {
  fish: number,
} | {
  bear: number,
}
```

## 映射类型 

```text
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };
```

等价于

```text
type Flags = {
    option1: boolean;
    option2: boolean;
}
```

## 类型断言

类型断言好比其它语言里的类型转换，把变量当做断言的类型，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。类型断言不是类型转换，只能断言成一个联合类型或any中的类型。

类型断言有两种形式。 其一是“尖括号”语法：

```ts
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
```

另一个为`as`语法：

```ts
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```

两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有`as`语法断言是被允许的。

```ts
let ro: ReadonlyArray<number> = a;
a = ro; // error! Readonly
a = ro as number[];// 用类型断言重写
```

### 查找类型

```js
interface Person {
    name: string;
    age: number;
    location: string;
}

type K1 = keyof Person; // "name" | "age" | "location"
type K2 = keyof Person[];  // "length" | "push" | "pop" | "concat" | ...
type K3 = keyof { [x: string]: Person };  // string
```

### in keyof

keyof` 产生联合类型, `in` 则可以遍历枚举类型

`keyof` 可以用来取得一个对象接口的所有 `key`值.

```ts
interface Foo {
  name: string;
  age: number
}
type T = keyof Foo // -> "name" | "age"
```

 in 则可以遍历枚举类型, 例如

```ts
type Keys = "a" | "b"
type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any }
```

### typeof 

```text
const a: number = 3
// 相当于: const b: number = 4
const b: typeof a = 4
```

### is

### const 断言

```text
const x = 'x'; // has the type 'x' 
let y = 'x';   // has the type string
```

# 接口

## 变量类型

```
interface LabeledValue{
	label:string;
	model:string='';//默认“”
	color?:string;//可选属性
	readonly width:number;//只读属性,赋值后不能被改变
}

function printLabel(labeledObj: LabeledValue) {//引入接口
  console.log(labeledObj.label);
}

let myObj = {color: "red", label: "Size 10 Object", width: 10};
printLabel(myObj);

type Partial<T> = { [P in keyof T]?: T[P] };
//keyof T 拿到 T 所有属性名, 然后 in 进行遍历, 将值赋给 P, 最后 T[P] 取得相应属性的值.
type Required<T> = { [P in keyof T]-?: T[P] };
//将可选项代表的 ? 去掉, 从而让这个类型变成必选项. 与之对应的还有个+? , 这个含义自然与-?之前相反, 它是用来把属性变成可选项的.
```

### readonly  vs  const

做为变量使用的话用`const`，若做为属性则使用`readonly`。

## 函数类型

使用接口表示函数类型，我们需要给接口定义一个调用签名。 它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```ts
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
// 函数的参数名不需要与接口里定义的名字相匹配,只要求对应位置上的参数类型是兼容的
//等价
mySearch = function(source: string, subString: string): boolean {
  let result = source.search(subString);
  return result > -1;
}
```

## 可索引的类型

Typescript支持两种索引签名：字符串和数字。 可以同时使用两种类型的索引，但是数字索引的返回值必须是字符串索引返回值类型的子类型。 这是因为当使用`number`来索引时，JavaScript会将它转换成`string`然后再去索引对象。 也就是说用`100`（一个`number`）去索引等同于使用`"100"`（一个`string`）去索引，因此两者需要保持一致。

###  对数组的约束

```ts
interface StringArray {
  [index: number]: string;//表示定义的数组是key是number类型，value是string类型
}
let myArray: StringArray;
myArray = ["Bob", "Fred"];
let myStr: string = myArray[0];//Bob
```

### 对对象的约束

```
interface UserObj {
  [index: string]: string
}
var arr: UserObj = { name: '张三' };

interface Dictionary<T> {
 [index: string]: T;
};
interface NumericDictionary<T> {
 [index: number]: T;
};
const data:Dictionary<number> = {
 a: 3,
 b: 4
}
```

## 类型

接口强制一个类去符合某种契约。同时描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。

```
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

class Clock implements ClockInterface {
    currentTime: Date = new Date();
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { }
}

```

## 继承

一个接口可以继承多个接口，创建出多个接口的合成接口。

```ts
interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends  Shape, PenStroke {
    sideLength: number;
}
```



# 泛型

## 泛型变量

**泛型就是：给类型传参**

3个主要用途：

1. 声明泛型容器或组件。比如：各种容器类Map、Array、Set等；各种组件，比如React.Component。
2. 对类型进行约束。比如：使用extends约束传入参数符合某种特定结构。
3. 生成新的类型。比如，上一章提到的ReturnType<T>。

当使用 TypeScript 实现的时候，我们需要在执行前就定义好函数返回的类型，但是我们又不能确定这个对象到底是什么类型，这里就可以借助泛型来实现：这是一种使返回值的类型与传入参数的类型是相同的方法。 这里，我们使用了类型变量，它是一种特殊的变量，只用于表示类型而不是值。

我们给identity添加了类型变量`T`。 `T`帮助我们捕获用户传入的类型（比如：`number`），之后我们就可以使用这个类型。 之后我们再次使用了`T`当做返回值类型。现在我们可以知道参数类型与返回值类型是相同的了。 这允许我们跟踪函数里使用的类型的信息。

```
function identity<T>(arg: T): T {
//1.声明泛型，2.参数泛型，3.返回值泛型
    return arg;
}
//事先不知道它是哪种类型，所以不能随意的操作它的属性或方法，表明泛型是个数组后可以使用.length
function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length);  // Array has a .length, so no more error
    return arg;
}
```

## 多个类型参数

定义泛型的时候，可以一次定义多个类型参数：

```
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}
swap([7, 'seven']); // ['seven', 7]
```

上例中，我们定义了一个 `swap` 函数，用来交换输入的元组。

## 索引访问操作符

```
function getProperty<T, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]; // o[name] is of type T[K]
}
getProperty({age:18}, 'age')
//K是T的key，T[K]是T的value
```



## 泛型约束

```
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

## 工具泛型

### Partial & Pick

**将所有属性变成可选属性 **

```text
//源码
type Partial<T> = {
     [P in keyof T]?: T[P];
};
type Pick<T, K extends keyof T> = {
     [P in K]: T[P];
};
interface User {
     id: number;
     age: number;
     name: string;
};
// 相当于: type PartialUser = { id?: number; age?: number; name?: string; }
type PartialUser = Partial<User>
// 相当于: type PickUser = { id: number; age: number; }
type PickUser = Pick<User, "id" | "age">

```

### Required

Required 的作用是将传入的属性变为必选项, 源码如下

```ts
type Required<T> = { [P in keyof T]-?: T[P] };
```

`-?`将可选项代表的 `?` 去掉, 从而让这个类型变成必选项. 与之对应的还有个`+?` ,把属性变成可选项的.

### Mutable (未包含)

类似地, 其实还有对 `+` 和 `-`, 这里要说的不是变量的之间的进行加减而是对 `readonly` 进行加减.
以下代码的作用就是将 T 的所有属性的 readonly 移除,你也可以写一个相反的出来.

```ts
type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}
```

### Readonly

将传入的属性变为只读选项

```ts
type Readonly<T> = { readonly [P in keyof T]: T[P] };
```

### Record

将 K 中所有的属性的值转化为 T 类型

```ts
type Record<K extends keyof any, T> = { [P in K]: T };
```

### EEO

#### Exclude 接受两个类型，去除T中的U

```ts
type Exclude<T, U> = T extends U ? never : T;
// 相当于: type A = 'a'
type A = Exclude<'x' | 'a', 'x' | 'y' | 'z'>
Exclude<'age'|'name','age'> // 'name'
```

#### Extract 同样接受两个类型，提取T中的U

```ts
Extract<'age'|'name'|'height','age'|'weight'> // 'age'
```

#### Omit

```text
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
interface User {
 id: number;
 age: number;
 name: string;
};
// 相当于: type PickUser = { age: number; name: string; }
type OmitUser = Omit<User, "id">
```

### ReturnType

在阅读源码之前我们需要了解一下 `infer` 这个关键字, 在条件类型语句中, 我们可以用 `infer` 声明一个类型变量并且对它进行使用,
我们可以用它获取函数的返回类型， 源码如下

```ts
type ReturnType<T> = T extends (
  ...args: any[]
) => infer R
  ? R
  : any;
```

其实这里的 `infer R` 就是声明一个变量来承载传入函数签名的返回值类型, 简单说就是用它取到函数返回值的类型方便之后使用.
具体用法

```ts
function foo(x: number): Array<number> {
  return [x];
}
type fn = ReturnType<typeof foo>;
```

### AxiosReturnType (未包含)

开发经常使用 axios 进行封装 API层 请求, 通常是一个函数返回一个 `AxiosPromise<Resp>`, 现在我想取到它的 Resp 类型, 根据上一个工具泛型的知识我们可以这样写.

```ts
import { AxiosPromise } from 'axios' // 导入接口
type AxiosReturnType<T> = T extends (...args: any[]) => AxiosPromise<infer R> ? R : any

// 使用
type Resp = AxiosReturnType<Api> // 泛型参数中传入你的 Api 请求函数
```

# 类

## 公有私有

TypeScript里，成员都默认为`public`。当成员被标记成`private`时，它就不能在声明它的类的外部访问。

TypeScript使用的是结构性类型系统。 当我们比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。

然而，当我们比较带有`private`或`protected`成员的类型的时候，情况就不同了。 如果其中一个类型里包含一个`private`成员，那么只有当另外一个类型中也存在这样一个`private`成员， 并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 对于`protected`成员也使用这个规则。

```
class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

new Animal("Cat").name; // 错误: 'name' 是私有的.
```

## 受保护protected

protected`修饰符与`private`修饰符的行为很相似，但有一点不同，`protected`成员在派生类中仍然可以访问

```
class Person {
    protected name: string;
    constructor(name: string) { this.name = name; }
}

class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
        super(name)
        this.department = department;
    }

    public getElevatorPitch() {
        return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
}
let howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());
console.log(howard.name); // 错误
```

## 只读readonly

你可以使用`readonly`关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。



# 函数

函数的完整类型

```ts
let myAdd: (x:number, y:number) => number =
    function(x: number, y: number): number { return x + y; };
```

只要参数类型是匹配的，那么就认为它是有效的函数类型，而不在乎参数名是否正确，参数名旁使用`?`实现可选参数。lastName = "Smith"  把last name的默认值设置为`"Smith"`。

在函数和返回值类型之前使用(`=>`)符号，使之清晰明了。如果函数没有返回任何值，也必须指定返回值类型为`void`而不能留空。

## this

### 匿名函数this

```ts
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {//不指定this为any
        return () => { //箭头函数能保存函数创建时的`this`值，而不是调用时的值。这里是Deck；如果是function(){ this 往往报错，为window或undefined
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}
```

### 回调函数this

当你将一个函数传递到某个库函数里在稍后被调用时，你可能也见到过回调函数里的`this`会报错。 因为当回调函数被调用时，它会被当成一个普通函数调用，`this`将为`undefined`。 稍做改动，你就可以通过`this`参数来避免错误。 首先，库函数的作者要指定`this`的类型：

```ts
interface UIElement {
    addClickListener(onclick: (this: void, e: Event) => void): void;
}
```

`this: void`意味着`addClickListener`期望`onclick`是一个函数且它不需要一个`this`类型。 然后，为调用代码里的`this`添加类型注解：

```ts
class Handler {
    info: string;
    onClickBad(this: Handler, e: Event) {
        // oops, used this here. using this callback would crash at runtime
        this.info = e.message;
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickBad); // error!
```

指定了`this`类型后，你显式声明`onClickBad`必须在`Handler`的实例上调用。 然后TypeScript会检测到`addClickListener`要求函数带有`this: void`。 改变`this`类型来修复这个错误：

```ts
class Handler {
    info: string;
    onClickGood(this: void, e: Event) {
        // can't use this here because it's of type void!
        console.log('clicked!');
    }
}
let h = new Handler();
uiElement.addClickListener(h.onClickGood);
```

因为`onClickGood`指定了`this`类型为`void`，因此传递`addClickListener`是合法的。 当然了，这也意味着不能使用`this.info`. 如果你两者都想要，你不得不使用箭头函数了：

```ts
class Handler {
    info: string;
    onClickGood = (e: Event) => { this.info = e.message }
}
```

这是可行的因为箭头函数使用外层的`this`，所以你总是可以把它们传给期望`this: void`的函数。 缺点是每个`Handler`对象都会创建一个箭头函数。 另一方面，方法只会被创建一次，添加到`Handler`的原型链上。 它们在不同`Handler`对象间是共享的。

### 重载

同一个函数提供多个函数类型定义来进行函数重载

# 对象

### 对象的展开与剩余运算符

TypeScript 2.1 带来了对 [ES2017 展开与剩余运算符](https://link.zhihu.com/?target=https%3A//github.com/sebmarkbage/ecmascript-rest-spread)的支持.

和数组的展开类似, 展开一个对象可以很方便地获得它的浅拷贝:

```js
let copy = { ...original };
```

相似的, 你可以合并多个不同的对象. 在下面的例子中, merged 会有来自 foo, bar 和 baz 的属性.

```js
let merged = { ...foo, ...bar, ...baz };
```

你也可以覆盖已有的属性和添加新的属性:

```js
let obj = { x: 1, y: "string" };
var newObj = {...obj, z: 3, y: 4}; // { x: number, y: number, z: number }
```

指定展开操作的顺序决定了那些属性的值会留在创建的对象里; 在靠后的展开中出现的属性会 "战胜" 之前创建的属性.

对象的剩余操作和对象的展开是对应的, 这样一来我们可以导出解构一个元素时被漏掉的其他属性.

```js
let obj = { x: 1, y: 1, z: 1 };
let { z, ...obj1 } = obj;
obj1; // {x: number, y: number};
```

# 声明

http://json.schemastore.org/tsconfig





https://legacy.gitbook.com/book/zhongsp/typescript-handbook/details

http://www.typescriptlang.org/

https://ts.xcatliu.com/

https://zhuanlan.zhihu.com/p/24267683

https://zhuanlan.zhihu.com/p/58517848

https://zhuanlan.zhihu.com/p/66624970

https://zhuanlan.zhihu.com/p/39620591

https://zhuanlan.zhihu.com/p/64423022

https://zhuanlan.zhihu.com/p/40311981