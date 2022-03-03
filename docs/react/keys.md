---
lang: zh-CN
title: ● 考点梳理
description: React 的描述
---

## ➣ React 中 setState 什么时候是同步的，什么时候是异步的？

react 为了解决跨平台，兼容性和性能问题，自己封装了一套事件机制，代理了原生的事件。

- setState 只在合成事件和钩子函数中是 “异步” 的，在原生事件和 setTimeout 中都是同步的。
- setState 的 “异步” 并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的 “异步”，当然可以通过第二个参数 setState(partialState, callback) 中的 callback 拿到更新后的结果。
- setState 的批量更新优化也是建立在 “异步”（合成事件、钩子函数）之上的，在原生事件和 setTimeout 中不会批量更新，在 “异步” 中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新。

## ➣ React 中父组件如何调用子组件的方法？
使用 createRef()，然后在父组件中使用 ref 调用子组件实例的方法。

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
let message = {text: expectedTextButGotJSON};

// React 0.13 中有风险
<p>
  {message.text}
</p>
```

## ➣ React 高阶组件

高阶组件（HOC）是 React 中用于复用组件逻辑的一种高级技巧。HOC 自身不是 React API 的一部分，它是一种基于 React 的组合特性而形成的设计模式。

![](https://nojsja.gitee.io/static-resources/images/react/HOC.png)

### 一、高阶组件解决了什么问题？

1. 复用逻辑：高阶组件更像是一个加工 react 组件的工厂，批量对原有组件进行加工，包装处理。我们可以根据业务需求定制化专属的 HOC，这样可以解决复用逻辑。
2. 强化 props：这个是 HOC 最常用的用法之一，高阶组件返回的组件，可以劫持上一层传过来的 props, 然后混入新的 props, 来增强组件的功能。代表作 react-router 中的 withRouter。
3. 赋能组件：HOC 有一项独特的特性，就是可以给被 HOC 包裹的业务组件，提供一些拓展功能，比如说额外的生命周期，额外的事件，但是这种 HOC，可能需要和业务组件紧密结合。典型案例 react-keepalive-router 中的 keepaliveLifeCycle 就是通过 HOC 方式，给业务组件增加了额外的生命周期。
4. 控制渲染：劫持渲染是 hoc 一个特性，在 wrapComponent 包装组件中，可以对原来的组件，进行条件渲染，节流渲染，懒加载等功能，后面会详细讲解，典型代表做 react-redux 中 connect 和 dva 中 dynamic 组件懒加载。

### 二、高阶组件实现的方式

#### 1. mixin 模式

![](https://nojsja.gitee.io/static-resources/images/react/mixin.png)

老版本的 mixin，在 react 初期提供一种组合方法。通过 React.createClass 加入 mixins 属性，如下：

```javascript
const customMixin = {
  componentDidMount() {},
  say() {
    console.log(this.state.name)
  }
}

const APP = React.createClass({
  mixins: [customMixin],
  getInitialState(){
    return {
      name: 'alien'
    }
  },
  render() {
    const {name} = this.state
    return <div> hello ,world , my name is { name } </div>
  }
});
```

这种方式有些缺点：

- mixin 引入了隐式依赖关系。
- 不同 mixins 之间可能会有先后顺序甚至代码冲突覆盖的问题。
- mixin 代码会导致滚雪球式的复杂性。
- 只能存在 createClass 方式创建的组件中

虽然 mixin 已经被 react 废弃了，但是我们仍能够通过 prototype 原型方式实现：

```javascript
const customMixin = {  /* 自定义 mixins */
  componentDidMount(){},
  say(){
    console.log(this.state.name)
  }
}

function componentClassMixins(Component,mixin){ /* 继承 */
  for(let key in mixin){
    if (Object.prototype.hasOwnProperty.call(mixin, key)){
      Component.prototype[key] = mixin[key]
    }
  }
}

class Index extends React.Component{
  constructor(){
    super()
    this.state={name:'alien'}
  }
  render(){
    return <div> hello,world
      <button onClick={ this.say.bind(this) } > to say </button>
    </div>
  }
}
```

#### 2. extends 模式

![](https://nojsja.gitee.io/static-resources/images/react/extend.png)

在 class 组件盛行之后，我们可以通过继承的方式进一步的强化我们的组件。这种模式的好处在于，可以封装基础功能组件，然后根据需要去 extends 我们的基础组件，按需强化组件，但是值得注意的是，必须要对基础组件有足够的掌握，否则会造成一些列意想不到的情况发生。

```javascript
class Base extends React.Component{
  constructor() {
    super()
    this.state = {
      name: 'alien'
    }
  }
  say() {
    console.log('base components')
  }
  render(){
    return <div> hello,world <button onClick={ this.say.bind(this) } > 点击 </button>  </div>
  }
}

class Index extends Base{
  componentDidMount(){
    console.log(this.state.name)
  }
  say(){ /* 会覆盖基类中的 say  */
    console.log('extends components')
  }

  render() {
    return (
      <div>
        <h1>title</h1>
        { super.render() }
      </div>
    )
  }
}
```

#### 3. HOC 模式

![](https://nojsja.gitee.io/static-resources/images/react/HO.png)

HOC 即 React 高阶组件，是一种将组件逻辑抽象成一个函数的方式。函数接收组件作为参数，返回一个新的组件，新组件可以拥有组件的所有特性，并且可以自定义自己的属性和方法。

以下示例采用了注解的方式实现了 HOC 组件：

```javascript
function HOC(Component) {
  return class wrapComponent extends React.Component{
     constructor(){
       super()
       this.state={
         name:'alien'
       }
     }
     render=()=><Component { ...this.props } { ...this.state } />
  }
}

@HOC
class Index extends React.Component{
  say(){
    const {name} = this.props
    console.log(name)
  }
  render(){
    return <div> hello,world <button onClick={ this.say.bind(this) } > 点击 </button>  </div>
  }
}
```

#### 4. 自定义 hooks 模式

![](https://nojsja.gitee.io/static-resources/images/react/customHooks.png)

hooks 的诞生，一大部分原因是解决无状态组件没有 state 和逻辑难以复用问题。hooks 可以将一段逻辑封装起来，做到开箱即用。

### 三、高阶组件的实际应用

#### 1. 强化 props

可用于：

- 增加组件的 props 属性
- 抽离内部 state 到外层

```javascript
function classHOC(WrapComponent){
    return class  Idex extends React.Component{
        state={
            name:'alien'
        }
        componentDidMount(){
           console.log('HOC')
        }
        render(){
            return <WrapComponent { ...this.props }  { ...this.state }   />
        }
    }
}
function Index(props){
  const { name } = props
  useEffect(()=>{
     console.log( 'index' )
  },[])
  return <div>
    hello,world , my name is { name }
  </div>
}

export default classHOC(Index);
```

#### 2. 控制渲染

- 复杂组件的渲染节流

```javascript
function HOC (Component){
     return function renderWrapComponent(props){
       const { num } = props
       const RenderElement = useMemo(() =>  <Component {...props}  /> ,[ num ])
       return RenderElement
     }
}
class Index extends React.Component{
  render(){
     console.log(`当前组件是否渲染`,this.props)
     return <div>hello,world, my name is alien </div>
  }
}
const IndexHoc = HOC(Index)

export default ()=> {
    const [ num ,setNumber ] = useState(0)
    const [ num1 ,setNumber1 ] = useState(0)
    const [ num2 ,setNumber2 ] = useState(0)
    return <div>
        <IndexHoc  num={ num } num1={num1} num2={ num2 }  />
        <button onClick={() => setNumber(num + 1) } >num++</button>
        <button onClick={() => setNumber1(num1 + 1) } >num1++</button>
        <button onClick={() => setNumber2(num2 + 1) } >num2++</button>
    </div>
}
```

- 分片渲染

> 不至于一次渲染大量组件造成白屏效果

```javascript
const renderQueue = []
let isFirstrender = false

const tryRender = ()=>{
  const render = renderQueue.shift()
  if(!render) return
  setTimeout(()=>{
    render() /* 执行下一段渲染 */
  },300)
} 
/* HOC */
function renderHOC(WrapComponent){
    return function Index(props){
      const [ isRender , setRender ] = useState(false)
      useEffect(()=>{
        renderQueue.push(()=>{  /* 放入待渲染队列中 */
          setRender(true)
        })
        if(!isFirstrender) {
          tryRender() /**/
          isFirstrender = true
        }
      },[])
      return isRender ? <WrapComponent tryRender={tryRender}  { ...props }  /> : <div className='box' ><div className="icon" ><SyncOutlined   spin /></div></div>
    }
}
/* 业务组件 */
class Index extends React.Component{
  componentDidMount(){
    const { name , tryRender} = this.props
    /* 上一部分渲染完毕，进行下一部分渲染 */
    tryRender()
    console.log( name+'渲染')
  }
  render(){
    return <div>
        <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=294206908,2427609994&amp;fm=26&amp;gp=0.jpg" />
    </div>
  }
}
/* 高阶组件包裹 */
const Item = renderHOC(Index)

export default () => {
  return <React.Fragment>
      <Item name="组件一" />
      <Item name="组件二" />
      <Item name="组件三" />
  </React.Fragment>
}
```

- 异步渲染

```javascript
/* 路由懒加载HOC */
export default function AsyncRouter(loadRouter) {
  return class Content extends React.Component {
    state = {Component: null}
    componentDidMount() {
      if (this.state.Component) return
      loadRouter()
        .then(module => module.default)
        .then(Component => this.setState({Component},
         ))
    }
    render() {
      const {Component} = this.state
      return Component ? <Component {
      ...this.props
      }
      /> : null
    }
  }
}
```

- 反向继承：渲染劫持

```javascript
const HOC = (WrapComponent) =>
  class Index  extends WrapComponent {
    render() {
      if (this.props.visible) {
        return super.render()
      } else {
        return <div>暂无数据</div>
      }
    }
  }
```

#### 3. 赋能组件

- 添加额外生命周期职责

```javascript
function HOC (Component){
  const didMount = Component.prototype.componentDidMount
  return class wrapComponent extends Component{
      componentDidMount(){
        console.log('------劫持生命周期------')
        if (didMount) {
           didMount.apply(this) /* 注意 `this` 指向问题。 */
        }
      }
      render(){
        return super.render()
      }
  }
}

@HOC
class Index extends React.Component{
   componentDidMount(){
     console.log('———didMounted———')
   }
   render(){
     return <div>hello,world</div>
   }
}
```

- 事件监听，添加错误上报功能等

```javascript
function ClickHoc (Component){
  return  function Wrap(props){
    const dom = useRef(null)
    useEffect(()=>{
     const handerClick = () => console.log('发生点击事件') 
     dom.current.addEventListener('click',handerClick)
     return () => dom.current.removeEventListener('click',handerClick)
    },[])
    return  <div ref={dom}  ><Component  {...props} /></div>
  }
}

@ClickHoc
class Index extends React.Component{
   render(){
     return <div  className='index'  >
       <p>hello，world</p>
       <button>组件内部点击</button>
    </div>
   }
}
export default ()=>{
  return <div className='box'  >
     <Index />
     <button>组件外部点击</button>
  </div>
}
```

#### 总结

对于属性代理HOC，我们可以：

- 强化props & 抽离state。
- 条件渲染，控制渲染，分片渲染，懒加载。
- 劫持事件和生命周期
- ref控制组件实例
- 添加事件监听器，日志

对于反向代理的HOC,我们可以：

- 劫持渲染，操纵渲染树
- 控制/替换生命周期，直接获取组件状态，绑定事件。

## ➣ hooks 优缺点？

** 优点：**

1. 代码可读性更强，模板代码更少，原本同一块功能的代码逻辑被拆分在了不同的生命周期函数中，容易使开发者不利于维护和迭代，通过 React Hooks 可以将功能代码聚合，方便阅读维护。
2. 传统 Class 组件需要学习 ES6 原生 API，不利于初学者快速上手。
3. 更加扁平化，传统组件利用 `renderProps`(传入一个可渲染函数作为 props) 和 高阶组件 ( ** 组件组合包裹 ** 和 ** 反向继承 **) 的方式实现逻辑复用和职责添加，容易形成 "嵌套地狱"。
4. 不用处理 this 的指向的问题。

** 缺点：**

1. 复杂的组件逻辑，hooks 的方式代码可读性更差。
2. 不利于异步操作。
3. 还无法实现 getSnapshotBeforeUpdate 和 componentDidCatch 这两个在类组件中的生命周期函数。
4. 容易陷入闭包问题，导致读取到旧值，解决方式使用局部变量 或 useRef

## ➣ hooks 为什么不能放在条件判断里？
以 setState 为例，在 react 内部，每个组件 (Fiber) 的 hooks 都是以链表的形式存在 memorizedState 属性中：

![](http://nojsja.gitee.io/static-resources/images/interview/hooks.png)

update 阶段，每次调用 useState，链表就会执行 next 向后移动一步。如果将 useState 写在条件判断中，假设条件判断不成立，没有执行里面的 useState 方法，会导致接下来所有的 useState 的取值出现偏移，从而导致异常发生。

## ➣ React-Fiber 架构

[>> 文章链接](https://nojsja.gitee.io/blogs/2021/01/25/%E7%90%86%E8%A7%A3React%EF%BC%9AFiber%E6%9E%B6%E6%9E%84%E5%92%8C%E6%96%B0%E6%97%A7%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F/)

## ➣ React 虚拟 dom 以及 diff 算法

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

## ➣ Babel 原理

babel 的转译过程分为三个阶段：parsing、transforming、generating，以 ES6 代码转译为 ES5 代码为例，babel 转译的具体过程如下：

- ES6 代码输入
- `babylon` 进行解析得到 AST
- plugin 用 `babel-traverse` 对 AST 树进行遍历转译，得到新的 AST 树
- 用 `babel-generator` 通过 AST 树生成 ES5 代码

## ➣ React SetState 原理

1. 在 setState 的时候，React 会为当前节点创建一个 updateQueue 的更新列队。
2. 然后会触发 reconciliation 过程，在这个过程中，会使用名为 Fiber 的调度算法，开始生成新的 Fiber 树， Fiber 算法的最大特点是可以做到异步可中断的执行。
3. 然后 React Scheduler 会根据优先级高低，先执行优先级高的节点，具体是执行 doWork 方法。
4. 在 doWork 方法中，React 会执行一遍 updateQueue 中的方法，以获得新的节点。然后对比新旧节点，为老节点打上 更新、插入、替换 等 Tag。
5. 当前节点 doWork 完成后，会执行 performUnitOfWork 方法获得新节点，然后再重复上面的过程。
6. 当所有节点都 doWork 完成后，会触发 commitRoot 方法，React 进入 commit 阶段。
7. 在 commit 阶段中，React 会根据前面为各个节点打的 Tag，一次性更新整个 dom 元素。

## ➣ React Router 实现原理

目前 react-router 在项目中已有大量实践，其优点可以总结如下:

- 风格: 与 React 融为一体, 专为 react 量身打造，编码风格与 react 保持一致，例如路由的配置可以通过 component 来实现。
- 简单: 不需要手工维护路由 state，使代码变得简单。
- 强大: 强大的路由管理机制，体现在如下方面：
  - 路由配置: 可以通过组件、配置对象来进行路由的配置
  - 路由切换: 可以通过 `<Link>` Redirect 进行路由的切换
  - 路由加载: 可以同步记载，也可以异步加载，这样就可以实现按需加载
- 使用方式: 不仅可以在浏览器端的使用，而且可以在服务器端的使用。

### 一、history 库

history 是一个独立的第三方 js 库，可以用来兼容在不同浏览器、不同环境下对历史记录的管理，拥有统一的 API。具体来说里面的 history 分为三类:

- 老浏览器的 history: 主要通过 hash 来实现，对应 createHashHistory
- 高版本浏览器: 通过 html5 里面的 history，对应 createBrowserHistory
- node 环境下: 主要存储在 memeory 里面，对应 createMemoryHistory

#### 1. history 方法：

> 此时的 location 跟浏览器原生的 location 是不相同的，最大的区别就在于里面多了 key 字段，history 内部通过 key 来进行 location 的操作。

```javascript
// 内部的抽象实现
function createHistory(options={}) {
  ...
  return {
    listenBefore, // 内部的 hook 机制，可以在 location 发生变化前执行某些行为，AOP 的实现
    listen, // location 发生改变时触发回调
    transitionTo, // 执行 location 的改变
    push, // 改变 location
    replace,
    go,
    goBack,
    goForward,
    createKey, // 创建 location 的 key，用于唯一标示该 location，是随机生成的
    createPath,
    createHref,
    createLocation, // 创建 location
  }
}
```

#### 2. history 内部解析

- URL 前进
  - createBrowserHistory: `pushState`、`replaceState`。
  - createHashHistory: `location.hash=***`、`location.replace()`。
  - createMemoryHistory: 在内存中进行历史记录的存储。
- URL 回退
  - createBrowserHistory: `popstate`。
  - createHashHistory: `hashchange`。
  - createMemoryHistory: 因为是在内存中操作，跟浏览器没有关系，不涉及 UI 层面的事情，所以可以直接进行历史信息的回退。

### 二、整体流程

![](https://nojsja.gitee.io/static-resources/images/react/react-router-all.png)

单页面应用路由实现原理是，切换 url，监听 url 变化，从而渲染不同的页面组件，主要的方式有 history 模式和 hash 模式。

#### 1. 地址栏改变 url 时整个流程分析

拿 history 模式做参考。当 url 改变，首先触发 history 的 popstate 事件，触发回调函数 handlePopState，产生新的 location 对象并触发 history 下面的 setstate 方法更新内部状态。接下来以观察者模式通知 Router 组件更新 location 并通过 context 上下文传递状态信息，switch 通过传递的更新流，匹配出符合的 Route 组件渲染，最后有 Route 组件取出 context 内容，传递给渲染页面，渲染更新。

#### 2. 当我们调用 history.push 方法，组件的更新渲染流程分析

我们还是拿 history 模式作为参考，当我们调用 history.push 方法，通过 history.pushState 来改变当前 url，接下来触发 history 下面的 setState 方法，接下来的步骤就和上面一样。

#### 3. 改变路由 - history 模式

1）history.pushState：

  ```javascript
    history.pushState(state,title,path)
  ```
  - state：一个与指定网址相关的状态对象， popstate 事件触发时，该对象会传入回调函数。如果不需要可填 null。
  - title：新页面的标题，但是所有浏览器目前都忽略这个值，可填 null。
  - path：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个地址。

2）history.replaceState

```javascript
history.replaceState(state,title,path);
```

参数和 pushState 一样，这个方法会修改当前的 history 对象记录， history.length 的长度不会改变。

#### 3. 监听路由 - history 模式

popstate 事件

```javascript
  window.addEventListener('popstate',function(e){
      /* 监听改变 */
  });
```

同一个文档的 history 对象出现变化时，就会触发 popstate 事件

history.pushState 可以使浏览器地址改变，无需刷新页面。注意⚠️的是：用 `history.pushState()` 或者 `history.replaceState()` 不会触发 popstate 事件。

popstate 事件只会在浏览器某些行为下触发, 比如点击后退、前进按钮或者调用 history.back()、history.forward()、history.go() 方法。

#### 4. 改变路由 - hash 模式

通过 window.location.hash  属性获取和设置 hash 值。

#### 5. 监听路由 - hash 模式

通过浏览器 onhashchange 事件：

```javascript
window.addEventListener('hashchange',function(e){
    /* 监听改变 */
});
```

### 三、基本原理

一句话：实现 URL 与 UI 界面的同步。其中在 react-router 中，URL 对应 Location 对象，而 UI 是由 react components 来决定的，这样就转变成 location 与 components 之间的同步问题。

![](https://nojsja.gitee.io/static-resources/images/react/react-router.png)

#### 1. 组件层面描述具体实现

在 react-router 中最主要的 component 是 Router RouterContext Link，history 库起到了中间桥梁的作用。

![](https://nojsja.gitee.io/static-resources/images/react/react-router-process1.png)

#### 2. API 层面描述具体实现

为了简单说明，只描述使用 browserHistory 的实现，hashHistory 的实现过程是类似的，就不在说明。

![](https://nojsja.gitee.io/static-resources/images/react/react-router-process2.png)

## ➣ React-Router Browser/Hash 两种路由模式的区别

### 一、HashRouter

- 兼容性：可以适配老式浏览器。
- 基于 hash 模式：页面跳转原理是使用了 location.hash、location.replace，和 vue router 的 hash 模式实现一致。
- 比较丑：在域名后，先拼接 /#，再拼接路径；也就是利用锚点，实现路由的跳转，如：http://www.abc.com/#/xx。
- SEO：不利于搜索引擎收录。
- 锚点跳转：hash 路由有利于锚点跳转的实现。

### 二、BrowserRouter

- 兼容性：仅适配新式浏览器。
- 基于 history 模式：页面跳转原理是使用了 HTML5 为浏览器全局的 history 对象新增了两个 API，包括 history.pushState、history.replaceState，和 vue router 的 history 模式实现一致
- 显示更加规范，如：http://www.abc.com/xx。
- 后端需做请求处理：切换路由后，请求接口路径会发生变化，后端需要配合处理，否则容易出现 404 请求。可以使用 nginx 的 `try_files $uri $uri/ /index.html` 功能，让路由在服务端没有正确被匹配时，直接返回 index.html 交给前端路由系统处理。
- SEO：有利于搜索引擎收录。
- 锚点跳转：browser 路由很难实现锚点跳转。