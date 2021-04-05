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

## 生命周期

![1569553734991](C:\Users\PC\AppData\Roaming\Typora\typora-user-images\1569553734991.png)

## **React Fiber**

![img](https://pic1.zhimg.com/80/v2-de478ba837d05e597cbf629b176e2aac_hd.jpg)

在React Fiber之前的版本，当React决定要加载或者更新组件树时，会做很多事，但主要是两个阶段：

**调度阶段（Reconciler）**：这个阶段React用新数据生成新的Virtual DOM，遍历Virtual DOM，然后通过Diff算法，快速找出需要更新的元素，放到更新队列中去。

**渲染阶段（Renderer）**：这个阶段React 根据所在的渲染环境，遍历更新队列，将对应元素更新。在浏览器中，就是跟新对应的DOM元素。除浏览器外，渲染环境还可以是 Native、硬件、VR 、WebGL等等。

React之前的调度策略Stack Reconciler。这个策略像函数调用栈一样，会深度优先遍历所有的Virtual DOM节点，进行Diff。它一定要等整棵Virtual DOM计算完成之后，才将任务出栈释放主线程。而浏览器中的渲染引擎是**单线程**的，除了网络操作,几乎所有的操作都在这个单线程中执行：解析渲染DOM tree和CSS tree、解析执行JavaScript，这个线程就是浏览器的主线程。

React Fiber解决过去Reconciler存在的问题的思路是把渲染/更新过程（递归diff）**拆分成一系列小任务**，每次检查树上的一小部分，完成后确认否还有时间继续下一个任务，存在时继续，不存在下一个任务时自己挂起，主线程不忙的时候再继续。

React Fiber将组件的递归更新，改成链表的依次执行，扩展出了fiber tree，即Fiber上下文的Virtual DOM tree，更新过程根据输入数据以及现有的fiber tree构造出新的fiber tree（workInProgress tree）。

fiber tree实际上是个**单链表**（Singly Linked List）树结构。Fiber的拆分单位是fiber tree上的一个节点fiber，按Virtual DOM节点拆，因为fiber tree是根据Virtual DOM tree构造出来的，树结构一模一样，只是节点携带的信息有差异。所以，实际上Virtual DOM node粒度的拆分以fiber为工作单元，每个组件实例和每个DOM节点抽象表示的实例都是一个工作单元。工作循环中，每次处理一个fiber，处理完可以中断/挂起整个工作循环。

**reconcile**

React Fiber把渲染/更新过程分为两个阶段：

1）可中断的render/reconciliation 通过构造workInProgress tree得出change。

2）不可中断的commit 应用这些DOM change。

**第一阶段**render/reconciliation具体实现为以fiber tree为蓝本，把每个fiber作为一个工作单元，自顶向下逐节点构造workInProgress tree（构建中的新fiber tree）。

以组件节点为例，具体过程如下：

1）如果当前节点不需要更新，直接把子节点clone过来，跳到5；要更新的话打个tag。

2）更新当前props， state， context等节点状态。

3）调用should Component Update()，false的话，跳到5。

4）调用render()获得新的子节点，并为子节点创建fiber。创建过程会尽量复用现有fiber，子节点增删也发生在这里。

5）如果没有产生child fiber，该工作单元结束，把effect list归并到return，并把当前节点的sibling作为下一个工作单元；否则把child作为下一个工作单元。

6）如果没有剩余可用时间了，等到下一次主线程空闲时才开始下一个工作单元；否则，立即开始做。

7）如果没有下一个工作单元了，回到了workInProgress tree的根节点，第1阶段结束，进入pending Commit状态。

实际上是1->6的工作循环，7是出口，工作循环每次只做一件事，做完看要不要休息。工作循环结束时，因为每做完一个都向上归并，workInProgress tree根节点身上的effect list就是收集到的所有side effect。

所以，构建workInProgress tree的过程就是diff的过程，通过request Idle Callback来调度执行一组任务，每完成一个任务后回来看看有没有插队的（更紧急的），每完成一组任务，把时间控制权交还给主线程，直到下一次request Idle Callback回调再继续构建workInProgress tree。

这一阶段是没有副作用的，因此这个过程可以被打断，然后恢复执行。

**第二阶段**commit：第一阶段产生的effectlist只有在commit之后才会生效，也就是真正应用到DOM中。这一阶段往往不会执行太长时间，因此是同步（所谓的一次性）的，这样也避免了组件内视图层结构和DOM不一致。

**生命周期**

因为render/reconciliation阶段可能执行多次，会导致willXXX钩子执行多次。所以getDerivedStateFromProps取代了原本的componentWillMount与componentWillReceiveProps方法，而componentWillUpdate本来就是可有可无所以也被废弃了。

进入commit阶段时，组件多了一个新钩子叫getSnapshotBeforeUpdate，它与commit阶段的钩子一样只执行一次。

出错时，在componentDidMount/Update后，可以使用componentDidCatch方法。

## HOC

## DOM

React提供的获取DOM元素的方法有两种，一是react-dom中的findDOMNode()，二是refs。

#### 1、findDOMNode

findDOMNode通常用于React组件的引用，其语法如下：

```
import ReactDOM from 'react-dom';
ReactDOM.findDOMNode(ReactComponent);
```

当组件被渲染到DOM中后，findDOMNode会返回该组件实例对应的DOM节点。

示例：

```
componentDidMount(){
    const dom = ReactDOM.findDOMNode(this);
    // this为当前组件的实例
}

render() {}
```

注：如果render()中返回null，那么findDOMNode()也返回null。findDOMNode只对已经挂载的组件有效。

#### 2、refs

refs多用于React组件内子组件的引用。使用ref获取DOM节点有两种情况：

（1）子组件为原生DOM组件：获取到的就是这个DOM节点。如下例，this.input就获取到了当前`<input />`节点。

```
<input ref={(ref)=>{this.myInput = ref}} />
```

通过this.myInput，我就可以对`<input />`进行一系列操作，比如让输入框聚焦：

```
this.myInput.focus();
```

注：refs也支持字符串格式：

```
<input ref='myInput' />
```

通过this.refs.myInput获取到节点。

（2）子组件为React组件，比如`<MyInput/>`：获得的就是`<MyInput/>`的实例，因此就可以调用`<MyInput/>`的实例方法。
示例：

```
componentDidMount(){
    const myComp = this.refs.myComp;  // 获取到的是<Comp />的实例myComp
    const dom = ReactDOM.findDOMNode(myComp);  // 获取到实例对应的DOM节点
}

render(){
    return (
        <div>
            <Comp ref='myComp' />
        </div>
    );
}
```

注：调用`<Comp />`实例方法的方式：this.refs.myComp.method()，但并不建议这种调用方式。















https://m.meiwen.com.cn/subject/pzjixctx.html

https://zhuanlan.zhihu.com/p/49485308

https://zhuanlan.zhihu.com/p/39992552