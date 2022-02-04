---
lang: zh-CN
title: ● 考点梳理
description: React 的描述
---

## ➣ React 中 setState 什么时候是同步的，什么时候是异步的？

react为了解决跨平台，兼容性和性能问题，自己封装了一套事件机制，代理了原生的事件。

- setState 只在合成事件和钩子函数中是“异步”的，在原生事件和 setTimeout 中都是同步的。
- setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
- setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。

## ➣ React中父组件如何调用子组件的方法？
使用createRef()，然后在父组件中使用ref调用子组件实例的方法。

## ➣ 为什么 React 元素有一个 $$typeof 属性？
```js
Object {
  $$typeof: Symbol(react.element)
}
```
目的是为了防止 XSS 攻击。因为 Synbol 无法被序列化，所以 React 可以通过有没有 $$typeof 属性来断出当前的 element 对象是从数据库来的还是自己生成的。

如果没有 $$typeof 这个属性，react 会拒绝处理该元素。

在 React 的古老版本中，下面的写法会出现 XSS 攻击：
```js
// 服务端允许用户存储 JSON
let expectedTextButGotJSON = {
  type: 'div',
  props: {
    dangerouslySetInnerHTML: {
      __html: '/* 把你想的搁着 */'
    },
  },
  // ...
};
let message = { text: expectedTextButGotJSON };

// React 0.13 中有风险
<p>
  {message.text}
</p>
```

## ➣ hooks 优缺点？

**优点：**

1. 代码可读性更强，模板代码更少，原本同一块功能的代码逻辑被拆分在了不同的生命周期函数中，容易使开发者不利于维护和迭代，通过 React Hooks 可以将功能代码聚合，方便阅读维护。
2. 传统Class组件需要学习ES6原生API，不利于初学者快速上手。
3. 更加扁平化，传统组件利用 `renderProps`(传入一个可渲染函数作为props) 和 高阶组件 ( **组件组合包裹** 和 **反向继承**) 的方式实现逻辑复用和职责添加，容易形成"嵌套地狱"。
4. 不用处理 this 的指向的问题。

**缺点：**

1. 复杂的组件逻辑，hooks的方式代码可读性更差。
2. 不利于异步操作。
3. 还无法实现 getSnapshotBeforeUpdate 和 componentDidCatch 这两个在类组件中的生命周期函数。
4. 容易陷入闭包问题，导致读取到旧值，解决方式使用局部变量 或 useRef

## ➣ hooks 为什么不能放在条件判断里？
以 setState 为例，在 react 内部，每个组件(Fiber)的 hooks 都是以链表的形式存在 memorizedState 属性中：

![](http://nojsja.gitee.io/static-resources/images/interview/hooks.png)

update 阶段，每次调用 useState，链表就会执行 next 向后移动一步。如果将 useState 写在条件判断中，假设条件判断不成立，没有执行里面的 useState 方法，会导致接下来所有的 useState 的取值出现偏移，从而导致异常发生。

## ➣ React-Fiber架构

[>> 文章链接](https://nojsja.gitee.io/blogs/2021/01/25/%E7%90%86%E8%A7%A3React%EF%BC%9AFiber%E6%9E%B6%E6%9E%84%E5%92%8C%E6%96%B0%E6%97%A7%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F/)

## ➣ React虚拟dom以及diff算法

传统 diff 算法的时间复杂度是 O(n^3)，这在前端 render 中是不可接受的。为了降低时间复杂度，react 的 diff 算法做了一些妥协，放弃了最优解，最终将时间复杂度降低到了 O(n)。

那么 react diff 算法做了哪些妥协呢？，参考如下：

1、tree diff：只对比同一层的 dom 节点，忽略 dom 节点的跨层级移动

如下图，react 只会对相同颜色方框内的 DOM 节点进行比较，即同一个父节点下的所有子节点。当发现节点不存在时，则该节点及其子节点会被完全删除掉，不会用于进一步的比较。

这样只需要对树进行一次遍历，便能完成整个 DOM 树的比较。

![](http://nojsja.gitee.io/static-resources/images/interview/diff1.png)

这就意味着，如果 dom 节点发生了跨层级移动，react 会删除旧的节点，生成新的节点，而不会复用。

2、component diff：如果不是同一类型的组件，会删除旧的组件，创建新的组件

![](http://nojsja.gitee.io/static-resources/images/interview/diff2.png)

3、element diff：对于同一层级的一组子节点，需要通过唯一 id 进行来区分

如果没有 id 来进行区分，一旦有插入动作，会导致插入位置之后的列表全部重新渲染。这也是为什么渲染列表时为什么要使用唯一的 key。

## ➣ Babel原理

babel的转译过程分为三个阶段：parsing、transforming、generating，以ES6代码转译为ES5代码为例，babel转译的具体过程如下：

- ES6 代码输入
- `babylon` 进行解析得到 AST
- plugin 用 `babel-traverse` 对 AST 树进行遍历转译，得到新的AST树
- 用 `babel-generator` 通过 AST 树生成 ES5 代码

## ➣ React SetState原理

1. 在 setState 的时候，React 会为当前节点创建一个 updateQueue 的更新列队。
2. 然后会触发 reconciliation 过程，在这个过程中，会使用名为 Fiber 的调度算法，开始生成新的 Fiber 树， Fiber 算法的最大特点是可以做到异步可中断的执行。
3. 然后 React Scheduler 会根据优先级高低，先执行优先级高的节点，具体是执行 doWork 方法。
4. 在 doWork 方法中，React 会执行一遍 updateQueue 中的方法，以获得新的节点。然后对比新旧节点，为老节点打上 更新、插入、替换 等 Tag。
5. 当前节点 doWork 完成后，会执行 performUnitOfWork 方法获得新节点，然后再重复上面的过程。
6. 当所有节点都 doWork 完成后，会触发 commitRoot 方法，React 进入 commit 阶段。
7. 在 commit 阶段中，React 会根据前面为各个节点打的 Tag，一次性更新整个 dom 元素。

## ➣ React Router实现原理