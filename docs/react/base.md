---
lang: zh-CN
title: ● 基础知识
description: React 的描述
---

## ➣ React Fiber 原理

### React 架构

  - 1）Virtual DOM 层，描述页面长什么样
  - 2）Reconciler 层，负责调用组件生命周期方法，进行 Diff 运算等
  - 3）Renderer 层，根据不同的平台，渲染出相应的页面，如 ReactDOM 和 ReactNative

### React15 遗留问题

![StackReconciler](http://nojsja.gitee.io/static-resources/images/react/StackReconciler.jpg)
  - 1）浏览器的整体渲染是多线程的，包括 GUI 渲染线程、JS 引擎线程、事件触发线程、定时触发器线程和异步 http 请求线程。页面绘制和 JS 运算是互斥的线程，两者不能同时进行。
  - 2）React15 使用 JS 的函数调用栈 (Stack Reconciler) 递归渲染界面，因此在处理 DOM 元素过多的复杂页面的频繁更新时，大量同步进行的任务 (树 diff 和页面 render) 会导致界面更新阻塞、事件响应延迟、动画卡顿等，因此 React 团队在 16 版本重写了 React Reconciler 架构。

### React16 问题解决

![FiberReconciler](http://nojsja.gitee.io/static-resources/images/react/FiberReconciler.jpg)
 - 1）`Fiber Reconciler` 架构可以允许同步阻塞的任务拆分成多个小任务，每个任务占用一小段时间片，任务执行完成后判断有无空闲时间，有则继续执行下一个任务，否则将控制权交由浏览器以让浏览器去处理更高优先级的任务，等下次拿到时间片后，其它子任务继续执行。整个流程类似 CPU 调度逻辑，底层是使用了浏览器 API`requestIdleCallback`。
- 2）为了实现整个 Diff 和 Render 的流程可中断和恢复，单纯的 VirtualDom Tree 不再满足需求，React16 引入了采用单链表结构的 Fiber 树，如下图所示。
- 3）FiberReconciler 架构将更新流程划分成了两个阶段：1.diff(由多个 diff 任务组成，任务时间片消耗完后被可被中断，中断后由 requestIdleCallback 再次唤醒) => 2.commit(diff 完毕后拿到 fiber tree 更新结果触发 DOM 渲染，不可被中断)。左边灰色部分的树即为一颗 fiber 树，右边的 workInProgress 为中间态，它是在 diff 过程中自顶向下构建的树形结构，可用于断点恢复，所有工作单元都更新完成之后，生成的 workInProgress 树会成为新的 fiber tree。
- 4）fiber tree 中每个节点即一个工作单元，跟之前的 VirtualDom 树类似，表示一个虚拟 DOM 节点。workInProgress tree 的每个 fiber node 都保存着 diff 过程中产生的 effect list，它用来存放 diff 结果，并且底层的树节点会依次向上层 merge effect list，以收集所有 diff 结果。注意的是如果某些节点并未更新，workInProgress tree 会直接复用原 fiber tree 的节点 (链表操作)，而有数据更新的节点会被打上 tag 标签。

```js
<FiberNode> : {
    stateNode,    // 节点实例
    child,        // 子节点
    sibling,      // 兄弟节点
    return,       // 父节点
}
```

![FiberTree](http://nojsja.gitee.io/static-resources/images/react/FiberTree.png)

## ➣ React 新旧生命周期

### React16.3 之前的生命周期

![](http://nojsja.gitee.io/static-resources/images/react/react-lifecycle-old.png)

1. componentWillMount()
此生命周期函数会在在组件挂载之前被调用，整个生命周期中只被触发一次。开发者通常用来进行一些数据的预请求操作，以减少请求发起时间，建议的替代方案是考虑放入 constructor 构造函数中，或者 componentDidMount 后；另一种情况是在在使用了外部状态管理库时，如 Mobx，可以用于重置 Mobx Store 中的的已保存数据，替代方案是使用生命周期 componentWilUnmount 在组件卸载时自动执行数据清理。

2. componentDidMount()
此生命周期函数在组件被挂载之后被调用，整个生命周期中只触发一次。开发者同样可以用来进行一些数据请求的操作；除此之外也可用于添加事件订阅 (需要在 componentWillUnmount 中取消事件订阅)；因为函数触发时 dom 元素已经渲染完毕，第三种使用情况是处理一些界面更新的副作用，比如使用默认数据来初始化一个 echarts 组件，然后在 componentDidUpdate 后进行 echarts 组件的数据更新。

3. componentWillReceiveProps(nextProps, nexState)
此生命周期发生在组件挂载之后的组件更新阶段。最常见于在一个依赖于 prop 属性进行组件内部 state 更新的非完全受控组件中，非完全受控组件即组件内部维护 state 更新，同时又在某个特殊条件下会采用外部传入的 props 来更新内部 state，注意不要直接将 props 完全复制到 state，否则应该使用完全受控组件 `Function Component`，一个例子如下：
```js
class EmailInput extends Component {
  state = {email: this.props.email};

  render() {
    return <input onChange={this.handleChange} value={this.state.email} />;
  }

  handleChange = e => his.setState({email: e.target.value});

  componentWillReceiveProps(nextProps) {
    if (nextProps.userID !== this.props.userID) {
      this.setState({email: nextProps.email});
    }
  }
}
```

4. shouldComponentUpdate(nextProps)
此生命周期发生在组件挂载之后的组件更新阶段。
值得注意的是子组件更新不一定是由于 props 或 state 改变引起的，也可能是父组件的其它部分更改导致父组件重渲染而使得当前子组件在 props/state 未改变的情况下重新渲染一次。
函数被调用时会被传入即将更新的 `nextProps` 和 `nextState` 对象，开发者可以通过对比前后两个 props 对象上与界面渲染相关的属性是否改变，再决定是否允许这次更新 (return `true` 表示允许执行更新，否则忽略更新，默认为 `true`)。常搭配对象深比较函数用于减少界面无用渲染次数，优化性能。在一些只需要简单浅比较 props 变化的场景下，并且相同的 state 和 props 会渲染出相同的内容时，建议使用 `React.PureComponnet` 替代，在 props 更新时 React 会自动帮你进行一次浅比较，以减少不必要渲染。
```js
class EmailInput extends Component {
  state = {email: this.props.email};

  render() {
    return <input onChange={this.handleChange} value={this.state.email} />;
  }

  handleChange = e => his.setState({email: e.target.value});

  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextProps.userID === this.props.userID &&
      nextState.email == this.state.email
    ) return false;
  }
}
```

5. componenetWillUpdate(newProps, newState)
此生命周期发生在组件挂载之后的更新阶段。当组件收到新的 props 或 state，并且 `shouldComponentUpdate` 返回允许更新时，会在渲染之前调此方法，不可以在此生命周期执行 `setState`。在此生命周期中开发者可以在界面实际渲染更新之前拿到最新的 `nextProps` 和 `nextState`，从而执行一些副作用：比如触发一个事件、根据最新的 props 缓存一些计算数据到组件内、平滑界面元素动画等：
```js
 // 需要搭配 css 属性 transition 使用
 componentWillUpdate : function(newProps,newState){
    if(!newState.show)
      $(ReactDOM.findDOMNode(this.refs.elem)).css({'opacity':'1'});
    else
      $(ReactDOM.findDOMNode(this.refs.elem)).css({'opacity':'0'});;
  },
  componentDidUpdate : function(oldProps,oldState){
    if(this.state.show)
      $(ReactDOM.findDOMNode(this.refs.elem)).css({'opacity':'1'});
    else
      $(ReactDOM.findDOMNode(this.refs.elem)).css({'opacity':'0'});;
  }
```

6. componenetDidUpdate(prevProps, prevState)
此生命周期发生在组件挂载之后的更新阶段，组件初次挂载不会触发。当组件的 props 和 state 改变引起界面渲染更新后，此函数会被调用，不可以在此生命周期执行 `setState`。我们使用它用来执行一些副作用：比如条件式触发必要的网络请求来更新本地数据、使用 render 后的最新数据来调用一些外部库的执行 (例子：定时器请求接口数据动态绘制 echarts 折线图)：
```js
  ...
  componentDidMount() {
    this.echartsElement = echarts.init(this.refs.echart);
    this.echartsElement.setOption(this.props.defaultData);
    ...
  }
  componentDidUpdate() {
    const {treeData} = this.props;
    const optionData = this.echartsElement.getOption();
    optionData.series[0].data = [treeData];
    this.echartsElement.setOption(optionData, true);
  }
```


7. componentWillUnmount()
此生命周期发生在组件卸载之前，组件生命周期中只会触发一次。开发者可以在此函数中执行一些数据清理重置、取消页面组件的事件订阅等。

### React16.3 之后的生命周期
![](http://nojsja.gitee.io/static-resources/images/react/react-lifecycle.png)

React16.3 之后 React 的 `Reconciler` 架构被重写 (Reconciler 用于处理生命周期钩子函数和 DOM DIFF)，之前版本采用函数调用栈递归同步渲染机制即 Stack Reconciler，dom 的 diff 阶段不能被打断，所以不利于动画执行和事件响应。React 团队使用 Fiber Reconciler 架构之后，diff 阶段根据虚拟 DOM 节点拆分成包含多个工作任务单元(FiberNode) 的 Fiber 树(以链表实现)，实现了 Fiber 任务单元之间的任意切换和任务之间的打断及恢复等等。Fiber 架构下的异步渲染导致了 `componentWillMount`、`componentWillReceiveProps`、`componentWillUpdate` 三个生命周期在实际渲染之前可能会被调用多次，产生不可预料的调用结果，因此这三个不安全生命周期函数不建议被使用。取而代之的是使用全新的两个生命周期函数：`getDerivedStateFromProps` 和 `getSnapshotBeforeUpdate`。

1. __getDerivedStateFromProps(nextProps, currentState)__
- 1）定义
此生命周期发生在组件初始化挂载和组件更新阶段，开发者可以用它来替代之前的 `componentWillReceiveProps` 生命周期，可用于根据 props 变化来动态设置组件内部 state。
函数为 static 静态函数，因此我们无法使用 `this` 直接访问组件实例，也无法使用 `this.setState` 直接对 state 进行更改，以此可以看出 React 团队想通过 React 框架的 API 式约束来尽量减少开发者的 API 滥用。函数调用时会被传入即将更新的 props 和当前组件的 state 数据作为参数，我们可以通过对比处理 props 然后返回一个对象来触发的组件 state 更新，如果返回 null 则不更新任何内容。
- 2）滥用场景一：直接复制 props 到 state 上面
这会导致父层级重新渲染时，SimpleInput 组件的 state 都会被重置为父组件重新传入的 props，不管 props 是否发生了改变。如果你说使用 `shouldComponentUpdate` 搭配着避免这种情况可以吗？代码层面上可以，不过可能导致后期 `shouldComponentUpdate` 函数的数据来源混乱，任何一个 prop 的改变都会导致重新渲染和不正确的状态重置，维护一个可靠的 `shouldComponentUpdate` 会更难。
```js
class SimpleInput extends Component {
  state = {attr: ''};

  render() {
    return <input onChange={(e) => this.setState({ attr: e.target.value })} value={this.state.attr} />;
  }

  static getDerivedStateFromProps(nextProps, currentState) {
    // 这会覆盖所有组件内的 state 更新！
    return {attr: nextProps.attr};
  }
}
```

- 3）使用场景： 在 props 变化后选择性修改 state
```js
class SimpleInput extends Component {
  state = {attr: ''};

  render() {
    return <input onChange={(e) => this.setState({ attr: e.target.value })} value={this.state.attr} />;
  }

  static getDerivedStateFromProps(nextProps, currentState) {
    if (nextProps.attr !== currentState.attr) return { attr: nextProps.attr };
    return null;
  }
}
```
可能导致的 bug：在需要重置 SimpleInput 组件的情况下，由于 `props.attr` 未改变，导致组件无法正确重置状态，表现就是 input 输入框组件的值还是上次遗留的输入。

- 4）优化的使用场景一：使用完全可控的组件
完全可控的组件即没有内部状态的功能组件，其状态的改变完全受父级 props 控制，这种方式需要将原本位于组件内的 state 和改变 state 的逻辑方法抽离到父级。适用于一些简单的场景，不过如果父级存在太多的子级状态管理逻辑也会使逻辑冗余复杂化。
```js
function SimpleInput(props) {
  return <input onChange={props.onChange} value={props.attr} />;
}
```
- 5）优化的使用场景二：使用有 key 值的非可控的组件
如果我们想让组件拥有自己的状态管理逻辑，但是在适当的条件下我们又可以控制组件以新的默认值重新初始化，这里有几种方法参考：
```js
/*
  1. 设置一个唯一值传入作为组件重新初始化的标志
     通过对比属性手动让组件重新初始化
*/
class SimpleInput extends Component {
  state = {attr: this.props.attr, id=""}; // 初始化默认值

  render() {
    return <input onChange={(e) => this.setState({ attr: e.target.value })} value={this.state.attr} />;
  }

  static getDerivedStateFromProps(nextProps, currentState) {
    if (nextProps.id !== currentState.id)
      return {attr: nextProps.attr, id: nextProps.id};
    return null;
  }
}

/*
  2. 设置一个唯一值作为组件的 key 值
     key 值改变后组件会以默认值重新初始化
  */
class SimpleInput extends Component {
  state = {attr: this.props.attr}; // 初始化默认值

  render() {
    return <input onChange={(e) => this.setState({ attr: e.target.value })} value={this.state.attr} />;
  }
}

<SimpleInput
  attr={this.props.attr}
  key={this.props.id}
/>

/*
  3. 提供一个外部调用函数以供父级直接调用以重置组件状态
     父级通过 refs 来访问组件实例，拿到组件的内部方法进行调用
  */
class SimpleInput extends Component {
  state = {attr: this.props.attr}; // 初始化默认值

  resetState = (value) => {
    this.setState({attr: value});
  }

  render() {
    return <input onChange={(e) => this.setState({ attr: e.target.value })} value={this.state.attr} />;
  }
}

<SimpleInput
  attr={this.props.attr}
  ref={this.simpleInput}
/>


```


2. componentDidMount()
...

3. shouldComponentUpdate(nextProps, nexState)
...

4. __getSnapshotBeforeUpdate(prevProps, prevState)__
此生命周期发生在组件初始化挂载和组件更新阶段，界面实际 render 之前。开发者可以拿到组件更新前的 `prevProps` 和 `prevState`，同时也能获取到 dom 渲染之前的状态 (比如元素宽高、滚动条长度和位置等等)。此函数的返回值会被作为 `componentWillUpdate` 周期函数的第三个参数传入，通过搭配 `componentDidUpdate` 可以完全替代之前 `componentWillUpdate` 部分的逻辑，见以下示例。
```js
class ScrollingList extends Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 判断是否在 list 中添加新的 items
    // 捕获滚动​​位置以便我们稍后调整滚动位置。
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 调整滚动位置使得这些新 items 不会将旧的 items 推出视图
    // snapshot 是 getSnapshotBeforeUpdate 的返回值）
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    return (
      <div ref={this.listRef}>{/* ...list items... */}</div>
    );
  }
}
```

5. __componenetDidUpdate(prevProps, prevState, shot)__
此生命周期新增特性：`getSnapshotBeforeUpdate` 的返回值作为此函数执行时传入的第三个参数。

6. componenetWillUnmount
...

## ➣ 理解 useLayoutEffect 和 useEffect 的工作原理和区别

我们先看下 React 官方文档对这两个 hook 的介绍，建立个整体认识

- useEffect(create, deps):

> 该 Hook 接收一个包含命令式、且可能有副作用代码的函数。在函数组件主体内（这里指在 React 渲染阶段）改变 DOM、添加订阅、设置定时器、记录日志以及执行其他包含副作用的操作都是不被允许的，因为这可能会产生莫名其妙的 bug 并破坏 UI 的一致性。使用 useEffect 完成副作用操作。赋值给 useEffect 的函数会**在组件渲染到屏幕之后执行**。你可以把 effect 看作从 React 的纯函数式世界通往命令式世界的逃生通道。

- useLayoutEffect(create, deps):

> 其函数签名与 useEffect 相同，但它**会在所有的 DOM 变更之后同步调用** effect。可以使用它来读取 DOM 布局并同步触发重渲染。在浏览器执行绘制之前，useLayoutEffect 内部的更新计划将被同步刷新。

注意加粗的字段，React 官方的文档其实把两个 hook 的执行时机说的很清楚，下面我们深入到 react 的执行流程中来理解下

### 一、问题

- useEffect 和 useLayoutEffect 的区别？
- useEffect 和 useLayoutEffect 哪一个与 componentDidMount，componentDidUpdate 的是等价的？
- useEffect 和 useLayoutEffect 哪一个与 componentWillUnmount 的是等价的？
- 为什么建议将修改 DOM 的操作里放到 useLayoutEffect 里，而不是 useEffect？

### 二、流程

1. react 在 diff 后，会进入到 commit 阶段，准备把虚拟 DOM 发生的变化映射到真实 DOM 上。

2. 在 commit 阶段的前期，会调用一些生命周期方法，对于类组件来说，需要触发组件的 getSnapshotBeforeUpdate 生命周期，对于函数组件，此时会调度 useEffect 的 create destroy 函数。

3.  注意是调度，不是执行。在这个阶段，会把使用了 useEffect 组件产生的生命周期函数入列到 React 自己维护的调度队列中，给予一个普通的优先级，让这些生命周期函数异步执行。


```
// 可以近似的认为，React 做了这样一步，实际流程中要复杂的多

setTimeout(() => {
      const preDestory = element.destroy;
      if (!preDestory) prevDestroy();
      const destroy = create();
      element.destroy= destroy;
}, 0);
复制代码
```

1.  随后，就到了 React 把虚拟 DOM 设置到真实 DOM 上的阶段，这个阶段主要调用的函数是 commitWork，commitWork 函数会针对不同的 fiber 节点调用不同的 DOM 的修改方法，比如文本节点和元素节点的修改方法是不一样的。
    
2.  commitWork 如果遇到了类组件的 fiber 节点，不会做任何操作，会直接 return，进行收尾工作，然后去处理下一个节点，这点很容易理解，类组件的 fiber 节点没有对应的真实 DOM 结构，所以就没有相关操作
    
3.  但在有了 hooks 以后，函数组件在这个阶段，会**同步调用**上一次渲染时 useLayoutEffect(create, deps) create 函数返回的 destroy 函数
    
4.  注意一个节点在 commitWokr 后，这个时候，我们已经把发生的变化映射到真实 DOM 上了
    
5.  但由于 JS 线程和浏览器渲染线程是互斥的，因为 JS 虚拟机还在运行，即使内存中的真实 DOM 已经变化，浏览器也没有立刻渲染到屏幕上
    
6.  此时会进行收尾工作，**同步执行**对应的生命周期方法，我们说的componentDidMount，componentDidUpdate 以及 useLayoutEffect(create, deps) 的 create 函数都是在这个阶段被**同步执行**。
    
7.  对于 react 来说，commit 阶段是不可打断的，会一次性把所有需要 commit 的节点全部 commit 完，至此 react 更新完毕，JS 停止执行
    
8.  浏览器把发生变化的 DOM 渲染到屏幕上，到此为止 react 仅用一次回流、重绘的代价，就把所有需要更新的 DOM 节点全部更新完成
    
9.  浏览器渲染完成后，浏览器通知 react 自己处于空闲阶段，react 开始执行自己调度队列中的任务，此时才开始执行 useEffect(create, deps) 的产生的函数
    

### 三、解答

#### useEffect 和 useLayoutEffect 的区别？

useEffect 在渲染时是异步执行，并且要等到浏览器将所有变化渲染到屏幕后才会被执行。

useLayoutEffect 在渲染时是同步执行，其执行时机与 componentDidMount，componentDidUpdate 一致

#### 对于 useEffect 和 useLayoutEffect 哪一个与 componentDidMount，componentDidUpdate 的是等价的？

useLayoutEffect，因为从源码中调用的位置来看，useLayoutEffect的 create 函数的调用位置、时机都和 componentDidMount，componentDidUpdate 一致，且都是被 React 同步调用，都会阻塞浏览器渲染。

#### useEffect 和 useLayoutEffect 哪一个与 componentWillUnmount 的是等价的？

同上，useLayoutEffect 的 detroy 函数的调用位置、时机与 componentWillUnmount 一致，且都是同步调用。useEffect 的 detroy 函数从调用时机上来看，更像是 componentDidUnmount (注意React 中并没有这个生命周期函数)。

#### 为什么建议将修改 DOM 的操作里放到 useLayoutEffect 里，而不是 useEffect？

可以看到在流程9/10期间，DOM 已经被修改，但浏览器渲染线程依旧处于被阻塞阶段，所以还没有发生回流、重绘过程。由于内存中的 DOM 已经被修改，通过 useLayoutEffect 可以拿到最新的 DOM 节点，并且在此时对 DOM 进行样式上的修改，假设修改了元素的 height，这些修改会在步骤 11 和 react 做出的更改一起被一次性渲染到屏幕上，依旧只有一次回流、重绘的代价。

如果放在 useEffect 里，useEffect 的函数会**在组件渲染到屏幕之后执行**，此时对 DOM 进行修改，会触发浏览器再次进行回流、重绘，增加了性能上的损耗。