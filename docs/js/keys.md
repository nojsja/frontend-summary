---
lang: zh-CN
title: ● 考点梳理
description: Javascript 的描述
---

## ➣ Map/WeakMap/Set/WeakSet 区别

##### 1. Set
  - 成员唯一、无序且不重复，可以为对象或基本类型
  - 属性：size
  - [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
  - 操作方法：
  ```js
  add(value)：新增，相当于 array 里的 push
  delete(value)：存在即删除集合中 value
  has(value)：判断集合中是否存在 value
  clear()：清空集合
  ```
  - 可以遍历：
  ```js
  keys()：返回一个包含集合中所有键的迭代器
  values()：返回一个包含集合中所有值得迭代器
  entries()：返回一个包含 Set 对象中所有元素得键值对迭代器
  forEach((v, k) => (), thisArg)：用于对集合成员执行 callbackFn 操作，如果提供了 thisArg 参数，回调中的 this 会是这个参数，没有返回值
  ```

##### 2. WeakSet
  - 成员都是对象
  - 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存 DOM 节点，不容易造成内存泄漏
  - 不能遍历，方法有 add、delete、has

##### 3. Map
  - 本质上是键值对的集合，类似集合
  - 可以遍历，方法很多可以跟各种数据格式转换
  - 属性：size
  - 操作方法：
  ```js
    set(key, value)：向字典中添加新元素
    get(key)：通过键查找特定的数值并返回
    has(key)：判断字典中是否存在键 key
    delete(key)：通过键 key 从字典中移除对应的数据
    clear()：将这个字典中的所有元素删除
  ```
  - 遍历方法：
  ```js
    Keys()：将字典中包含的所有键名以迭代器形式返回
    values()：将字典中包含的所有数值以迭代器形式返回
    entries()：返回所有成员的迭代器
    forEach((v, k, map) => ())：遍历字典的所有成员

  ```
##### 4. WeakMap
  - 只接受对象作为键名（null 除外），不接受其他类型的值作为键名
  - 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
  - 不能遍历，方法有 get、set、has、delete

## ➣ js 类型的判断
```js
/*
基础类型：string/boolean/number/null/undefined/symbol
引用类型：function/object(date|regexp|obj)/array
*/
function getTypeOf(data) {
  if (Number.isNaN(data)) return 'nan';
  switch(Object.prototype.toString.call(data)) {
    case '[object Null]':
      return 'null';
    case '[object Array]':
      return 'array';
    case '[object Object]':
      return 'object';
    case '[object Date]':
      return 'date';
    case '[object RegExp]':
      return 'regexp';
    default:
      return (typeof data);
  }
}
```

## ➣ 实现 Call 和 Apply
```js
Function.prototype.myCall = function(context) {
  var args, result, symbol;

  context = Object(context) || window;
  args = Array.prototype.slice.call(arguments, 1);
  symbol = Symbol('myCall');
  context[symbol] = this;
  // 如果不使用扩展运算符的话可以将 args[i] 转换成逗号分隔的字符串
  // 然后通过 eval('context.fn('+ argstr +')') 获取结果
  result = context[symbol](...args);
  delete context[symbol];

  return result;
};

Function.prototype.myApply = function(context, args) {
  var result, symbol;

  args = args || [];
  context = Object(context) || window;
  if (!(args instanceof Array)) throw new Error('The args of apply must be an array.');

  symbol = Symbol('myApply');
  context[symbol] = this;
  result = context[symbol](...args);
  delete context[symbol];

  return result;
};

```

## ➣ 实现对象 new 操作
```js
function New(func) {
  if (Object.prototype.toString.call(func) !== '[object Function]')
    throw new Error('params of theNew must be a function!');

  var empty, args, res;

  args = Array.prototype.slice.call(arguments, 1);

  // 这两步也可简化为 Object.create(func.prototype)
  empty = new Object();
  empty.__proto__ = func.prototype;

  res = func.apply(empty, args);

  return res instanceof Object ? res : empty;
}
```

#### Js 实现 bind 函数
```js
Function.prototype.myBind = function(context) {
  var that = this;
  var args = Array.prototype.slice.call(arguments, 1);

  return function() {
    return that.apply(context, args.concat(Array.from(arguments)));
  }
}
```

## ➣ 二维数组扁平化

```js
function flat(array) {
  return array.reduce((total, current) => {
    return total.concat(current);
  }, []);
}

function flat(array, res=[]) {
  for (var i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      flat(array[i], res);
    } else {
      res.push(array[i]);
    }
  }

  return res;
}

function flat(array) {
  const res = [];
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      res.push(...array[i]);
    } else {
      res.push(array[i]);
    }
  }
  return res;
}

function flat(array) {
  let str = JSON.stringify(array);
  str = str.replace(/[\[\]]/g, '');
  return JSON.parse(`[${str}]`);
}

console.log(flat([[1,2], [2,3], 4]))

```

## ➣ Js 如何判断一个数是不是 2 的 N 次幂

```js
function check2n(num) {
  if (!Number.isInteger(num) || num < 1) return false;

  if (num !== 1) {
    while (num> 1) {
      if (num % 2 === 0) {
        num = num / 2;
      } else {
        return false;
      }
    }
    return true;
  } else {
    return true;
  }
}
```

## ➣ Js 实现继承
```js
function Inherit (parent, child) {
  function Empty() {}; // 继承原型链的干净的构造函数
  Empty.prototype = parent.prototype;
  var empty = new Empty();
  empty.constructor = child;
  child.prototype = empty;
}

function Parent(parent) {
  this.p_attr = parent;
}

Parent.prototype.p_print = function() {
  console.log(this.p_attr);
}

function Child(attr) {
  Parent.call(this, 'parent');
  this.c_attr = attr;
  this.print = function() {
    console.log(this.c_attr);
  }
}

Inherit(Parent, Child);

var child = new Child('child');

child.print();
child.p_print();
```

## ➣ 手写深拷贝和浅拷贝

```js
/* 深拷贝 */
function deepClone(object) {
    const map = new WeakMap();
    const { hasOwnProperty } = Object.prototype;

    const getType = (data) => {
        if (Number.isNaN(data)) return 'nan';
        switch(Object.prototype.toString.call(data)) {
            case '[object Null]':
                return 'null';
            case '[object Object]':
                return 'object';
            case '[object Array]':
                return 'array';
            case '[object RegExp]':
                return 'regexp';
            case '[object Date]':
                return 'date';
            default:
                return typeof data;
        }
    };

    const _clone = (data) => {
        const typeStr = getType(data);
        if (typeStr === 'nan') return NaN;
        if (typeStr === 'null') return null;
        let newObj;

        if (typeof data === 'object') {
            if (typeStr === 'regexp')
                return new RegExp(data.source, data.flags);
            if (typeStr === 'date')
                return new Date(data.getTime());
            if (map.has(data)) {
                return map.get(data);
            } else {
                newObj = typeStr === 'array' ? [] : {};
                map.set(data, newObj);
            }
            for (let attr in data) {
                if (hasOwnProperty.call(data, attr)) {
                    newObj[attr] = _clone(data[attr]);
                }
            }
            return newObj;
        } else {
            return data;
        }
    };

    return _clone(object);
}

/* 浅拷贝 */
function shallowClone(data) {
  let base;

  if (!data || !(typeof data === 'object')) {
    return data;
  } else {
    base = Object.prototype.toString.call(data) === '[object Array]' ? [] : {};
  }

  for (let attr in data) {
    if (Object.prototype.hasOwnProperty.call(data, attr)) {
      base[attr] = data[attr];
    }
  }

  return base;
}

```

## ➣ 如何判断对象上的属性是原型属性还是实例属性呢？

```js
/* 实例属性 */
Object.prototype.hasOwnProperty.call(obj, attr);
/* 原型属性 */
(attr in obj) && !Object.prototype.hasOwnProperty.call(obj, attr);
```

## ➣ 移动端点击穿透问题

1. 问题来源
移动浏览器提供一个特殊的功能：双击 (double tap) 放大，300ms 的延迟就来自这里，用户碰触页面之后，需要等待一段时间来判断是不是双击动作，而不是立即响应单击（click），等待的这段时间大约是 300ms。为了消除延迟，我们使用 touch start / touch end 事件来模拟 click 事件，这便是造成点击穿透问题的原因，想象一个场景：mask 蒙层有个绑定 touch start 事件的关闭按钮，点击之后蒙层消失，之后 300ms 后点击位置触发 click 事件，导致 mask 下面的元素被误触。
2. 问题解决
1）界面统一使用 touch 事件替代 click 事件
2）界面只 click 事件 (会造成 300ms 延迟)
3）mask 隐藏后，给按钮下面元素添上 `pointer-events: none`(会造成元素短时间无法响应)
4）使用外部框架 `fastclick` 解决

## ➣ 图片懒加载具体实现方案和思路
使用监听器 IntersectionObserver 来监听界面滚动，当被监听元素处于视口可见区域时，设置图片元素的 src 为真实的地址。如果不使用这个 API 的话需要手动监听页面滚动然后通过计算 img 元素的 `offsetTop <document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop)` 来判断元素进入视区实现，并注意配合防抖函数进行优化。
```js
(function lazyLoad(){
    const imageToLazy = document.querySelectorAll('img[data-src]');
    const loadImage = function (image) {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.addEventListener('load', function() {
            image.removeAttribute("data-src");
        })
    }

    const intersectionObserver = new IntersectionObserver(function(items, observer) {
        items.forEach(function(item) {
            if(item.isIntersecting) {
                loadImage(item.target);
                observer.unobserve(item.target);
            }
        });
    });

    imageToLazy.forEach(function(image){
        intersectionObserver.observe(image);
    })
})()
```

## ➣ 函数防抖和节流实现

```js
/* 去抖 */
function debounce(fn, time) {
  let timer;

  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, time);
  }
}

/* 节流 */
function throttle(fn, time) {
  let canRun = true;

  return function() {
    if (canRun) {
      canRun = false;
      setTimeout(() => {
        fn.apply(this, arguments);
        canRun = true;
      }, time)
    }
  }
}
```

## ➣ Js 事件循环 (宏任务、微任务)

![](http://nojsja.github.io/static-resources/images/interview/EventLoop.png)

&nbsp;&nbsp;&nbsp;&nbsp; 每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）
再检测本次循环中是否寻在微任务，存在的话就依次从微任务的任务队列中读取执行完所有的微任务，再读取宏任务的任务队列中的任务执行，再执行所有的微任务，如此循环。JS 的执行顺序就是每次事件循环中的宏任务 - 微任务。

- 第一次事件循环，整段代码作为宏任务进入主线程执行
- 同步代码被直接推到执行栈执行，遇到异步代码就挂起交由其他线程执行 (执行完会往事件队列塞回调)
- 同步代码执行完，读取微任务队列，若有执行所有微任务，微任务清空
- 页面渲染
- 从事件队列面里取一个宏任务塞入执行栈执行
如此反复

** 一个参考题目：**
```js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  resolve(5);
  console.log(2);
}).then(val => {
  console.log(val);
});

promise.then(() => {
  console.log(3);
});

console.log(4);

setTimeout(function() {
  console.log(6);
});

```
输出结果：`124536`，注意 main 主进程代码第一次执行时被看做宏任务。

## ➣ 模拟实现 setTimeout

```js
let setTimeout = (fn, timeout, ...args) => {
  // 初始当前时间
  const start = +new Date();
  let timer, now;
  const loop = () => {
    timer = window.requestAnimationFrame(loop);
    // 再次运行时获取当前时间
    now = +new Date();
    // 当前运行时间 - 初始当前时间 >= 等待时间 ===>> 跳出
    if (now - start>= timeout) {
      fn.apply(this, args);
      window.cancelAnimationFrame(timer);
    }
  }
  window.requestAnimationFrame(loop);
}
```

## ➣ 从输入 URL 到页面渲染完成发生了什么

- 用户输入 url ，通过 DNS 解析成请求目的 IP 地址
- 浏览器与服务器建立连接（tcp 协议、三次握手），服务端处理请求返回 html 代码块
- 浏览器拿到返回的 html，解析 html 成 dom 树、解析 css 成 cssobj
- dom 树、cssobj 结合成 render 树
- JS 根据 render 树进行计算、布局、重绘
- GPU 合成，输出到屏幕

## ➣ tcp 协议三次握手和四次挥手

![](http://nojsja.github.io/static-resources/images/interview/tcp.png)

##### 1. 三次握手讲解
- 客户端发送位码为 syn＝1, 随机产生 seq 确认号到服务器，服务器由 SYN=1 知道客户端要求建立联机（客户端：我要连接你）
- 服务器收到请求后要确认联机信息，向 A 发送 ack number=(客户端的 seq+1),syn=1,ack=1, 随机产生 seq=7654321 的包（服务器：好的，你来连吧）
- 客户端收到后检查 ack number 是否正确，即第一次发送的 seq number+1, 以及位码 ack 是否为 1，若正确，客户端会再发送 ack number=(服务器的 seq+1),ack=1，服务器收到后确认 seq 值与 ack=1 则连接建立成功。（客户端：好的，我来了）
#### 2. 为什么 http 建立连接需要三次握手，不是两次或四次?
答：三次握手之所以是三次是保证 client 和 server 均让对方知道自己的接收和发送能力没问题而保证的最小次数，两次不安全，四次浪费资源。

#### 3. TCP 关闭连接过程
- Client 向 Server 发送 FIN 包，表示 Client 主动要关闭连接，然后进入 FIN_WAIT_1 状态，等待 Server 返回 ACK 包。此后 Client 不能再向 Server 发送数据，但能读取数据。
- Server 收到 FIN 包后向 Client 发送 ACK 包，然后进入 CLOSE_WAIT 状态，此后 Server 不能再读取数据，但可以继续向 Client 发送数据。
- Client 收到 Server 返回的 ACK 包后进入 FIN_WAIT_2 状态，等待 Server 发送 FIN 包。
- Server 完成数据的发送后，将 FIN 包发送给 Client，然后进入 LAST_ACK 状态，等待 Client 返回 ACK 包，此后 Server 既不能读取数据，也不能发送数据。
- Client 收到 FIN 包后向 Server 发送 ACK 包，然后进入 TIME_WAIT 状态，接着等待足够长的时间（2MSL）以确保 Server 接收到 ACK 包，最后回到 CLOSED 状态，释放网络资源。
- Server 收到 Client 返回的 ACK 包后便回到 CLOSED 状态，释放网络资源。

#### 4. 为什么要四次挥手？
&nbsp;&nbsp;&nbsp;&nbsp; TCP 是全双工信道，何为全双工就是客户端与服务端建立两条通道，通道 1: 客户端的输出连接服务端的输入；通道 2: 客户端的输入连接服务端的输出。两个通道可以同时工作：客户端向服务端发送信号的同时服务端也可以向客户端发送信号。所以关闭双通道的时候就是这样：
- 客户端：我要关闭输入通道了。 服务端：好的，你关闭吧，我这边也关闭这个通道。
- 服务端：我也要关闭输入通道了。 客户端：好的你关闭吧，我也把这个通道关闭。

## ➣ 页面加载会触发哪些事件

1. document readystatechange 事件
readyState 属性描述了文档的加载状态，在整个加载过程中 document.readyState 会不断变化，每次变化都会触发 readystatechange 事件。事件使用 `document.onreadystatechange` 进行监听。
readyState 有以下状态：
  _1）loading - document 仍在加载。_
  _2）interactive - 文档结构已经完成加载，文档已被解析并且可以交互，但是诸如图像，样式表和脚本之类的外部资源仍在加载_
  _3）complete - 文档和所有外部资源已完成加载。_
2. document DOMContentLoaded 事件
  DOM 树渲染完成时触发 DOMContentLoaded 事件，此时可能外部资源还在加载，事件同于 jQuery 中的 ready 事件和 `readyState == 'interactive'` 阶段。事件使用 `document.addEventListener('DOMContentLoaded', function)` 监听。
3. window load 事件
  所有的资源全部加载完成会触发 window 的 load 事件。事件使用 `window.onload=function` 进行监听。
```js
switch (document.readyState) {
  case "loading":
    // 表示文档还在加载中，即处于 “正在加载” 状态。
    break;
  case "interactive":
    // 文档已经结束了 “正在加载” 状态，DOM 元素可以被访问
    break;
  case "complete":
    // 页面所有内容都已被完全加载.
    break;
}
/* 模拟 原生 DOMContentLoaded 和 jquery ready 事件 */
document.onreadystatechange = function () {
  if (document.readyState === "interactive") {
    initApplication();
  }
}

/* 模拟 window.onload 事件 */
document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    initApplication();
  }
}
```


## ➣ document.ready 和 window.onload 的区别

```sh
ready 事件在 DOM 结构绘制完成之后就会执行，这样能确保就算有大量的媒体文件没加载出来，JS 代码一样可以执行。
load 事件必须等到网页中所有内容全部加载完毕之后才被执行，如果一个网页中有大量的图片的话，则就会出现这种情况：网页文档已经呈现出来，但由于网页数据还没有完全加载完毕，导致 load 事件不能够即时被触发。
```

## ➣ 闭包 Closure

1. 执行上下文
函数每次执行，都会生成一个执行上下文内部对象 (可理解为函数作用域)，这个上下文对象会保存函数中所有的变量值和该函数内部定义的函数的引用。函数每次执行时对应的执行上下文都是独一无二的，正常情况下函数执行完毕执行上下文就会被销毁。
2. 内部作用域的外部引用导致作用域内变量垃圾回收不执行
当一个函数内部作用域 (注意不是单纯的变量引用) 被其外层作用域引用时，函数执行完之后，其执行上下文不会被销毁，我们还能沿着作用域链访问到某个被引用的内部变量。

```js
// 外层作用域
function counterCreator() {
  // 内层作用域 1
  var index = 1;
  return function () {
    // 内层作用域 2，引用作用域 1 的变量 index
    return index ++;
  };
}

// 外层作用域通过作用域链保存了内层作用域 1 的变量引用
var counterA = counterCreator();
// index 变量不会被垃圾回收
counterA();     // 1
counterA();     // 2

```

## ➣ 函数式编程思想的体现

## ➣ 函数柯里化：add(1)(2)(3) == 6

```js
function add(num) {
  var sum = 0;

  function sumLogic(num) {
    sum += num;
    return sumLogic;
  }

  sumLogic.toString = function() {
    return sum;
  }

  return sumLogic;
}
```

## ➣ 函数柯里化 2：curry 函数

1. 实现效果：
```js
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert(curriedSum(1, 2, 3) ); // 6，仍然可以被正常调用
alert(curriedSum(1)(2,3) ); // 6，对第一个参数的柯里化
alert(curriedSum(1)(2)(3) ); // 6，全柯里化
```

2. 实现 curry 函数
```js
function curry(func) {
  return function core() {
    var args = [].slice.call(arguments);
    if (args.length>= func.length) {
      return func.apply(this, args);
    } else {
      return function() {
        return core.apply(this, args.concat(Array.from(arguments)));
      };
    }
  };
}
```

## ➣ vue 双向绑定实现原理

## ➣ Vue2.0 与 Vue3.0 双向绑定，proxy 实现

## ➣ 前端错误监控方法

## ➣ 发布订阅模式和观察者模式区别

- 在观察者模式中，观察者是知道 Subject 的，Subject 一直保持对观察者进行记录。然而，在发布订阅模式中，发布者和订阅者不知道对方的存在。它们只有通过消息代理进行通信。
- 在发布订阅模式中，组件是松散耦合的，正好和观察者模式相反。
- 可以理解为观察者模式没中间商赚差价，发布订阅模式，有中间商赚差价。
- 观察者模式大多数时候是同步的，比如当事件触发，Subject 就会去调用观察者的方法。而发布 - 订阅模式大多数时候是异步的（使用消息队列）。
- 观察者模式需要在单个应用程序地址空间中实现，而发布 - 订阅更像交叉应用模式。

## ➣ 实现一个 EventEmitter 类，支持事件的 on,off,emit,once,setMaxListeners。

```js
function EventEmitter() {
  this.maxListeners = 100;
  this.listeners = {};
}

EventEmitter.prototype.setMaxListeners = function(num) {
  if (typeof num !== 'number' || !Number.isInteger(num) || num <= 0)
    throw new Error('setMaxListeners: param num must be a positive integer!');
  this.maxListeners = num;
}

EventEmitter.prototype.on = function(type, func) {
  if (!type || !func instanceof Function) return;
  if (this.listeners[type]) {
    if (this.listeners[type].length === this.maxListeners)
      return console.error('The max listeners limitation:', this.maxListeners);
    this.listeners[type].push(func);
  } else {
    this.listeners[type] = [func];
  }
}

EventEmitter.prototype.once = function(type, func) {
  if (!type || !func instanceof Function) return;
  var that = this;
  var callback = function(...args) {
    func(...args);
    that.off(type, callback);
  };
  this.on(type, callback);
}

EventEmitter.prototype.off = function(type, func) {
  if (!type || !func) return;
  if (this.listeners[type]) {
    var index = this.listeners[type].indexOf(func);
    (index !== -1) && this.listeners[type].splice(index, 1);
  }
}

EventEmitter.prototype.emit = function(type) {
  var args = [].slice.call(arguments, 1);
  (this.listeners[type] || []).forEach(function(fn) {
    fn(...args);
  });
}
```

## ➣ 实现 ajax 并发请求控制

简化版：
```js
/**
  * multiAjaxRequest [批量并发异步请求]
  * @author nojsja
  * @param  {[Array]} urls [所有待请求接口地址]
  * @param  {[Array]} maxNum [最大并发数量]
  */
function multiAjaxRequest(urls=[], maxNum=0) {
  const length = urls.length;
  const result = new Array(length).fill(false);
  let index = 0;

  function sendRequest(url) {
    console.log('send');
    const ajax = new XMLHttpRequest();
    ajax.open('POST', url, true);
    ajax.send();
    return new Promise((resolve, reject) => {
      ajax.onreadystatechange((ev) => {
        if (ajax.readyState === 4) {
          if (ajax.status === 200) {
            resolve({
              code: 200,
              result: ajax.responseText
            });
          } else {
            resolve({
              code: ajax.status,
              result: ajax.responseText
            });
          }
        }
      });
    })
  }

  return new Promise((resolve, reject) => {

    function next() {
      const current = index++;
      const url = urls[current];
      console.log(current);

      sendRequest(url)
      .then(res => {
        result[current] = res.code === 200 ? res.result : false;
        if (current>= length - 1) {
          if (urls.includes(false)) return reject(result);
          resolve(result);
        } else {
          next();
        }
      })
    }

    while(index < maxNum) {
      if (urls[i]) {
        next();
      } else {
        break;
      }
    }
  });

}
```

## ➣ 使用 ES5 实现 Promise

[链接 -> 使用 ES5 实现 ES6 Promise API](https://github.com/nojsja/promise-nojsja)

## ➣ 什么情况下会发生布尔值的隐式强制类型转换？

- (..) 语句中的条件判断表达式。
- for (.. ; .. ; ..) 语句中的条件判断表达式（第二个）。
- while (..) 和 do..while(..) 循环中的条件判断表达式。
- 三元运算中的条件判断表达式。
- 逻辑运算中的操作数。
- 算术运算中的操作数。

## ➣ instanceof 方法的简单实现

```javascript
function new_instance_of(leftVaule, rightVaule) {
    let rightProto = rightVaule.prototype; // 取右表达式的 prototype 值
    leftVaule = leftVaule.__proto__; // 取左表达式的__proto__值

    while (true) {
    	if (leftVaule === null) {
          return false;
      }
      if (leftVaule === rightProto) {
          return true
      }
      leftVaule = leftVaule.__proto__;
    }
}
```

其实 instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可。因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false，告诉我们左边变量并非是右边变量的实例。

## ➣ for...in 和 for ... of 区别和使用场景

### 1. for...in 遍历

- for...in 可以用于遍历对象，不过会获取到原型链上的属性，必要时可以用 `Object.hasOwnProperty` 进行二次判断，不适合用于遍历数组。
- for...in 遍历的 index 索引为字符串型数字，不能直接进行几何运算。
- for...in 遍历顺序有可能不是按照实际数组的内部顺序。

### 2. for...of 遍历

- for...of 适用遍历数 / 数组对象 / 字符串 / map/set 等拥有迭代器对象的集合。但是不能遍历对象，因为没有迭代器对象。 与 forEach() 不同的是，它可以正确响应 break、continue 和 return 语句。
- for...of 循环不支持普通对象，但如果你想迭代一个对象的属性，你可以用 for-in 循环（这也是它的本职工作）或内建的 Object.keys() 方法。

## ➣ Symbol 的作用

- Symbol 的作用非常的专一，换句话说其设计出来就只有一个目的——作为对象属性的唯一标识符，防止对象属性冲突发生。
- Symbol 不是构造器，只能直接包装其它值使用：`Symbol(key)`。
- Symbol() 返回值是唯一的，也就是：`Symbol('description') === Symbol('description');`。
- 可以使用 `Object.getOwnPropertySymbols(obj)` 这个方法进行获取，可以返回 obj 对象中的 Symbol 信息。
- 并且 Symbol 在 for...in 迭代中不可枚举。
- 当使用 JSON.stringify 时以 symbol 值作为键的属性会被完全忽略。
