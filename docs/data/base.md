---
lang: zh-CN
title: ● 基础知识
description: data 的描述
---

## ➣ JavaScript ArrayBuffer 的概念和应用

JS 里的 Array，因为有很多功能，而且是不限制类型的，或者它还可能是稀疏的…… 总之这个 Array 是相当于只是一个代理对象，它内部有比较复杂的实现。

而如果你从 XHR、File API、Canvas 等等各种地方，读取了一大串字节流，如果用 JS 里的 Array 去存，又浪费，又低效。于是为了配合这些新的 API 增强 JS 的二进制处理能力，就有了 ArrayBuffer。

ArrayBuffer 简单说是一片内存，但是你不能 (也不方便) 直接用它。这就好比你在 C 里面，malloc 一片内存出来，你也会把它转换成 unsigned_int32 或者 int16 这些你需要的实际类型的数组 / 指针来用。

这就是 JS 里的 TypedArray 的作用，那些 Uint32Array 也好，Int16Array 也好，都是给 ArrayBuffer 提供了一个 `View`，MDN 上的原话叫做 `Multiple views on the same data`，对它们进行下标读写，最终都会反应到它所建立在的 ArrayBuffer 之上。除了 TypedArray 以外，也可以使用 DataView 来读写 ArrayBuffer，这样会麻烦一些，但也更灵活。DataView 能更自由的选择字节序，对于对齐的要求也更低。

## ➣ 中文 ascii 编码

取值范围是 0～127

在字符编码方面，ASCII 码为标准符号、数字、英文等进行了保留，取值范围是 0～127，还有一部分作为扩展 ASCII 码 128～255

当操作系统采用非 ASCII 编码时 (比如汉字编码)，一般用扩展 ASCII 码来进行，约定用 128～255 范围的编码连续 2～3 甚至 4 个来进行汉字编码，(比如国标用连续两个 128～255 的编码表示 1 个汉字，分别是区码和位码的编码；UTF-8 可以用 3 个连续的数来表示一个汉字)，具体编码规则要看具体定义，一般不相同的。

因此，在处理字符串时，如果是有符号字符串，遇到小于 0 的字符，会结合后面紧跟的字符来组成一个汉字，大于 0 的为标准西文字符；如果是无符号的，则可以判断是否大于 127。

ascii 码是目前计算机中用得最广泛的字符集及其编码，是由美国国家标准局 (ANSI) 制定的 ASCII 码（American Standard Code for Information Interchange，美国标准信息交换码），它已被国际标准化组织（ISO）定为国际标准，称为 ISO 646 标准。适用于所有拉丁文字字母，ASCII 码有 7 位码和 8 位码两种形式。

## ➣ Immutable Data

### 一、概念

Immutable Data 就是一旦创建，就不能再被更改的数据。对 Immutable 对象的任何修改或添加删除操作都会返回一个新的 Immutable 对象。Immutable 每次修改都会创建一个新对象，且对象不变，那么变更的记录就能够被保存下来，应用的状态变得可控、可追溯，方便撤销和重做功能的实现。

主要原理是采用了 Persistent Data Structure（持久化数据结构)，就是当每次修改后我们都会得到一个新的版本，且旧版本可以完好保留，也就是使用旧数据创建新数据时，要保证旧数据同时可用且不变。

同时为了避免 deepCopy 把所有节点都复制一遍带来的性能损耗，Immutable 使用了 Structural Sharing（结构共享），就是对于本次操作没有修改的部分，我们可以直接把相应的旧的节点拷贝过去，尽量复用内存，这其实就是结构共享。

### 二、React 中的应用

Immutable 实现了一套完整的 Persistent Data Structure，提供了很多易用的数据类型。像 `Collection`、`List`、`Map`、`Set`、`Record`、`Seq`，以及一系列操作它们的方法，包括 sort，filter，数据分组，reverse，flatten 以及创建子集等方法。

- 放在 State 中，在 shouldComponentUpdate 等生命周期中，通过内置的 `is` 比较方法进行高性能比较，和传统的 `deepComparison` 不同，不会具有对数级别的时间复杂度。immutable 内部使用了 Trie 数据结构来存储，只需要要两个对象的 `hashCode` 相等即可。

```javascript
import {is, Map} from 'immutable';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  shouldComponentUpdate(nextProps = {}, nextState = {}) {
    if (Object.keys(this.state).length !== Object.keys(nextState).length) {
      return true;
    }
    // 使用 immutable.is 来进行两个对象的比较
    for (const key in nextState) {
      if (!is(this.state[key], nextState[key])) {
        return true;
      }
    }
    return false;
  }

  render() {
    ...
  }
}
```

- 对于像 Redux 等状态管理库，通过引入 [redux-immutable](https://github.com/gajus/redux-immutable#readme?fileGuid=tCVw8Y6Cv8J3KYHw) 中间件的方式实现 redux 与 Immutable 的搭配使用，对于使用 Redux 的应用程序来说，你的整个 state tree 应该是 Immutable.JS 对象，根本不需要使用普通的 JavaScript 对象。

- 需要注意的是纯渲染组件不需要使用 Immutable.JS 对象，反而会影响渲染性能。

## ➣ Mobx

Mobx 是一个响应式编程（Reactive Programming）库，在一定程度上可以看做没有模板的 Vue，基本原理和 Vue 一致。

Mobx 借助于装饰器的实现，使得代码更加简洁易懂。由于使用了可观察对象，所以 Mobx 可以做到直接修改状态，而不必像 Redux 一样编写繁琐的 actions 和 reducers。

```javascript
import {action, observable} from mobx;

export class Store {
  @observable count = 0;
  @action increment(）{
    this.count++;
  }
  @action decrement(）{
    this.count --
  }
}
```

### 一、工作流程

![](https://nojsja.gitee.io/static-resources/images/interview/mobx-process.png)

一共有这么几个步骤：

- 页面事件（生命周期、点击事件等等）触发 action 的执行。
- 通过 action 来修改状态。
- 状态更新后，computed 计算属性也会根据依赖的状态重新计算属性值。
- 状态更新后会触发 reaction，从而响应这次状态变化来进行一些操作（渲染组件、打印日志等等）。

### 二、核心概念

#### 1. observable

observable 可以将接收到的值包装成可观察对象，这个值可以是 JS 基本数据类型、引用类型、普通对象、类实例、数组和映射等等等。

```
const list = observable([1, 2, 4]);
list[2] = 3;

const person = observable({
    firstName: "Clive Staples",
    lastName: "Lewis"
});
person.firstName = "C.S.";
```

#### 2. computed

有时候一个值 A 是由另外几个值 B、C、D 计算出来的，Mobx 中提供了 computed 来解决这个问题。正如 Mobx 官方介绍的一样，computed 是基于现有状态或计算值衍生出的值，如下面 todoList 的例子，一旦已完成事项数量改变，那么 completedCount 会自动更新。

```javascript
class TodoStore {
    @observable todos = []
    @computed get completedCount() {
		return (this.todos.filter(todo => todo.isCompleted) || []).length
	}
}
```

#### 3. reaction & autorun

autorun 接收一个函数，当这个函数中依赖的可观察属性发生变化的时候，autorun 里面的函数就会被触发。除此之外，autorun 里面的函数在第一次会立即执行一次。

注意不能改了可观察对象的引用，在追踪函数外进行间接引用。

```javascript
const person = observable({
    age: 20
})
// autorun 里面的函数会立即执行一次，当 age 变化的时候会再次执行一次
autorun(() => {
    console.log("age", person.age);
})
person.age = 21;
// 输出：
// age 20
// age 21
```

#### 4. observer

Mobx-React 中提供了一个 observer 方法，这个方法主要是改写了 React 的 render 函数，当监听到 render 中依赖属性变化的时候就会重新渲染组件，这样就可以做到高性能更新。

```javascript
@observer
class App extends Component {
    @observable count = 0;
    @action
    increment = () => {
        this.count++;
    }
    render() {
        <h1 onClick={this.increment}>{ this.count }</h1>
    }
}
```

### 内部原理

在 mobx 中，我们需要在一个值或一个对象被改变时，触发相应的动作或响应，这种模式就是典型的观察者模式（或发布订阅模式），那么这里一个值或一个对象就是被观察者，动作或者响应充当观察者。

逻辑描述：

- 核心思想也比较容易理解，首先进行对象代理（proxy 或 defineProperty），这样对象就成了 observable 对象；
- 其次观察者在执行主体逻辑时会访问代理对象属性，这时代理对象主动上报（reportObserved）自己到观察者的观察对象队列（observing）中，同时也会将观察者放入 observable 对象的观察者队列（observers）中，观察者和被观察者相互存有对方的引用，关系正式确立；
- 最后，当设置代理对象属性时，代理对象触发（reportChanged）观察者执行主体逻辑。

#### 1. observable

装饰器函数一般接收三个参数，分别是目标对象、属性、属性描述符。
我们都知道，被 observable 包装过的对象，其属性也是可观察的，也就是说需要递归处理其属性。
其次，由于需要收集依赖的方法，某个方法可能依赖了多个可观察属性，相当于这些可观察属性都有自己的订阅方法数组。

用法：

```javascript
const cat = observable({name: "tom"});
const mice = observable({name: "jerry"});
autorun(function func1 (){
    console.log(`${cat.name} and ${mice.name}`)
});
autorun(function func2(){
    console.log(mice.name)
});
```

订阅方法数组：

```javascript
cat.watches = [func1]
mice.watches = [func1, func2]
```

模拟实现：

```javascript
let observableId = 0
class Observable {
    id = 0
    constructor(v) {
        this.id = observableId++;
        this.value = v;
    }
    set(v) {
        this.value = v;
        dependenceManager.trigger(this.id);
    }
    get() {
        dependenceManager.collect(this.id);
        return this.value;
    }
}
```

但这个 get/set 和 autorun 也是密切相关的。get 会在 autorun 执行的时候，将传给 autorun 的函数依赖收集到 id 相关的数组里面。而 set 则是会触发数组中相关函数的执行。

#### 2. 依赖收集 autorun

autorun 会立即执行一次，并且会将其函数收集起来，存到和 observable.id 相关的数组中去。那么 autorun 就是一个收集依赖、执行函数的过程。实际上，在执行函数的时候，就已经触发了 get 来做了收集。

```javascript
import dependenceManager from './dependenceManager'

export default function autorun(handler) {
    dependenceManager.beginCollect(handler);
    handler(); // 触发 get，执行了 dependenceManager.collect()
    dependenceManager.endCollect();
}
```

#### 3. 对深层对象和数组的处理

对于 Proxy 和 Object.defineProperty 的时候就已经说过，由于 Object.defineProperty 的问题，无法监听到新增加的项，因此对于动态添加的属性或者下标就无法进行监听。

在 Mobx4 中使用了比较极端的方式，那就是不管数组中有多少项，都是用一个长度 1000 的数组来存放，去监听这 1000 个下标变化，可以满足大多数场景。在 Mobx5 中，已经使用 Proxy 来实现对数组的拦截。

对于数组和对象，在创建 observable 数据的时候，需要递归对其进行 observable 化转换：

- 首先，我们来判断包裹的属性是否为对象。
- 如果是个对象，那么就遍历其属性，对属性值创建新的 Observable 实例。
- 如果属性也是个对象，那么就进行递归，重复步骤1、2。

```javascript
function createObservable(target) {
    if (typeof target === "object") {
        for(let property in target) {
            if(target.hasOwnProperty(property)) {
                const observable = new Observable(target[property]);
                Object.defineProperty(target, property, {
                    get() {
                        return observable.get();
                    },
                    set(value) {
                        return observable.set(value);
                    }
                });
                createObservable(target[property])
            }
        }
    }
}
```

这个 createObservable 方法，我们只需要在 observable 装饰器里面执行就行了。

```javascript
function observable(target, name, descriptor) {
    const v = descriptor.initializer.call(this);
    createObservable(v)
    const o = new Observable(v);
    return {
        enumerable: true,
        configurable: true,
        get: function() {
            return o.get();
        },
        set: function(v) {
            createObservable(v)
            return o.set(v);
        }
    };
};
```

#### 4. computed

我们都知道 computed 有三个特点，分别是：

- computed 是个 get 方法，会缓存上一次的值。
- computed 会根据依赖的可观察属性重新计算。
- 依赖了 computed 的函数也会被重新执行。

其实 computed 和 observable 的实现思路类似，区别在于 computed 需要收集两次依赖，一次是 computed 依赖的可观察属性，一次是依赖了 computed 的方法。

首先，我们来定义一个 computed 的，这个方法依然是个装饰器。

```javascript
function computed(target, name, descriptor) {
    const getter = descriptor.get; // get 函数
    const computed = new Computed(target, getter);

    return {
        enumerable: true,
        configurable: true,
        get: function() {
            return computed.get();
        }
    };
}
```

接下来实现这个 Computed 类，这个类的实现方式和 Observable 差不多。

```javascript
let id = 0
class Computed {
    constructor(target, getter) {
        this.id = id++
        this.target = target
        this.getter = getter
    }
    get() {
        dependenceManager.collect(this.id);
    }
}
```

在执行 get 方法的时候，就会去收集依赖了当前 computed 的方法。我们还需要去收集当前 computed 依赖的属性，跟 autorun 的实现类似：

```javascript
let id = 0
class Computed {
    constructor(target, getter) {
        this.id = id++
        this.target = target
        this.getter = getter
    }
    registerReComputed() {
        if(!this.hasBindAutoReCompute) {
            this.hasBindAutoReCompute = true;
            // 收集依赖
            dependenceManager.beginCollect(this._reCompute, this);
            this._reCompute();
            // 收集完成
            dependenceManager.endCollect();
        }
    }
    reComputed() {
        this.value = this.getter.call(this.target);
        dependenceManager.trigger(this.id);
    }
    get() {
        this.registerReComputed();
        dependenceManager.collect(this.id);
        return this.value;
    }
}
```

#### 5. observer

而 observer 的实现比较简单，就是利用了 React 的 render 方法执行进行依赖收集，我们可以在 componentWillMount 里面注册 autorun。

```javascript
function observer(target) {
    const componentWillMount = target.prototype.componentWillMount;
    target.prototype.componentWillMount = function() {
        componentWillMount && componentWillMount.call(this);
        autorun(() => {
            this.render();
            this.forceUpdate();
        });
    };
}
```