---
lang: zh-CN
title: 考点梳理
description: Javascript 的描述
---

### > Map/WeakMap/Set/WeakSet区别

##### 1. Set
  - 成员唯一、无序且不重复，可以为对象或基本类型
  - 属性：size
  - [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
  - 操作方法：
  ```js
  add(value)：新增，相当于 array里的push
  delete(value)：存在即删除集合中value
  has(value)：判断集合中是否存在 value
  clear()：清空集合
  ```
  - 可以遍历：
  ```js
  keys()：返回一个包含集合中所有键的迭代器
  values()：返回一个包含集合中所有值得迭代器
  entries()：返回一个包含Set对象中所有元素得键值对迭代器
  forEach((v, k) => (), thisArg)：用于对集合成员执行callbackFn操作，如果提供了 thisArg 参数，回调中的this会是这个参数，没有返回值
  ```

##### 2. WeakSet
  - 成员都是对象
  - 成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
  - 不能遍历，方法有add、delete、has

##### 3. Map
  - 本质上是键值对的集合，类似集合
  - 可以遍历，方法很多可以跟各种数据格式转换
  - 属性：size
  - 操作方法：
  ```js
    set(key, value)：向字典中添加新元素
    get(key)：通过键查找特定的数值并返回
    has(key)：判断字典中是否存在键key
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
  - 只接受对象作为键名（null除外），不接受其他类型的值作为键名
  - 键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
  - 不能遍历，方法有get、set、has、delete

### > js类型的判断
```js
/*
基础类型：string/boolean/number/null/undefined/symbol
引用类型：function/object(date|regexp|obj)/array
*/
function getTypeOf(data) {
  if (data !== data) return 'nan';
  switch(Object.prototype.toString.call(data)) {
    case '[object Null]':
      return 'null';
    case '[object Array]':
      return 'array';
    case '[object Object]':
      return 'object';
    case '[object RegExp]':
      return 'regexp';
    case '[object Date]':
      return 'date';
    default:
      return (typeof data);
  }
}
```

### > 实现Call和Apply
```js
Function.prototype.myCall = function(context) {
  var args, result, symbol;

  context = Object(context) || window;
  args = Array.prototype.slice.call(arguments, 1);
  symbol = Symbol('myCall');
  context[symbol] = this;
  // 如果不使用扩展运算符的话可以将args[i]转换成逗号分隔的字符串
  // 然后通过eval('context.fn('+ argstr +')')获取结果
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

### > 实现对象new操作
```js
function New(func) {
  if (Object.prototype.toString.call(func) !== '[object Function]')
    throw new Error('params of theNew must be a function!');
  
  var empty, args, res;

  empty = new Object();
  args = Array.prototype.slice.call(arguments, 1);

  res = func.apply(empty, args);
  empty.__proto__ = func.prototype;

  return res || empty;
}
```

#### Js实现bind函数
```js
Function.prototype.myBind = function(context) {
  var that = this;
  var args = Array.prototype.slice.call(arguments, 1);

  return function() {
    return that.apply(context, args.concat(Array.from(arguments)));
  }
}
```

### > 二维数组扁平化

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

### > Js如何判断一个数是不是2的N次幂
```js
function check2n(num) {
  if (!Number.isInteger(num) || num < 1) return false;

  if (num !== 1) {
    while (num > 1) {
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

### > Js实现继承
```js
function Inherit (parent, child) {
  function Empty() {};
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

### > 手写深拷贝和浅拷贝

```js
/* 深拷贝 */
function deepClone(data) {

  const map = new WeakMap();
  
  const isObjType = (obj, type) => {
    if (typeof obj !== 'object') return false;
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  };

  const _clone = (target) => {
    if (target === null) return null;
    if (target !== target) return NaN;
    if (typeof target !== 'object') return target;
    
    let base;

    // 对正则对象做特殊处理
    if (isObjType(target, 'RegExp')) return new RegExp(target.source, target.flags);
    // 对Date对象做特殊处理
    if (isObjType(target, 'Date')) return new Date(target.getTime());

    base = isObjType(target, 'Array') ? [] : {};

    // 处理循环引用
    if (map.has(target))
      return map.get(target);
    map.set(target, base);
    
    for (let i in target) {
      if (Object.prototype.hasOwnProperty.call(target, i)) {
        base[i] = _clone(target[i]);
      }
    }
    
    return base;
  };

  return _clone(data);
};

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

### > 如何判断对象上的属性是原型属性还是实例属性呢？

```js
/* 实例属性 */
Object.prototype.hasOwnProperty.call(obj, attr);
/* 原型属性 */
(attr in obj) && !Object.prototype.hasOwnProperty.call(obj, attr);
```

### > 移动端点击穿透问题
1. 问题来源  
移动浏览器提供一个特殊的功能：双击(double tap)放大，300ms的延迟就来自这里，用户碰触页面之后，需要等待一段时间来判断是不是双击动作，而不是立即响应单击（click），等待的这段时间大约是300ms。为了消除延迟，我们使用touch start / touch end 事件来模拟click事件，这便是造成点击穿透问题的原因，想象一个场景：mask蒙层有个绑定touch start事件的关闭按钮，点击之后蒙层消失，之后300ms后点击位置触发click事件，导致mask下面的元素被误触。
2. 问题解决  
1）界面统一使用touch事件替代click事件  
2）界面只click事件(会造成300ms延迟)  
3）mask隐藏后，给按钮下面元素添上`pointer-events: none`(会造成元素短时间无法响应)  
4）使用外部框架`fastclick`解决  
### > 图片懒加载具体实现方案和思路  
使用监听器IntersectionObserver来监听界面滚动，当被监听元素处于视口可见区域时，设置图片元素的src为真实的地址。如果不使用这个API的话需要手动监听页面滚动然后通过计算img元素的`offsetTop < document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop)` 来判断元素进入视区实现，并注意配合防抖函数进行优化。
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

### > 函数防抖和节流实现

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


### > Js事件循环(宏任务、微任务)
![](http://nojsja.gitee.io/static-resources/images/interview/EventLoop.png)

&nbsp;&nbsp;&nbsp;&nbsp; 每次执行栈执行的代码就是一个宏任务（包括每次从事件队列中获取一个事件回调并放到执行栈中执行）
再检测本次循环中是否寻在微任务，存在的话就依次从微任务的任务队列中读取执行完所有的微任务，再读取宏任务的任务队列中的任务执行，再执行所有的微任务，如此循环。JS 的执行顺序就是每次事件循环中的宏任务-微任务。

- 第一次事件循环，整段代码作为宏任务进入主线程执行
- 同步代码被直接推到执行栈执行，遇到异步代码就挂起交由其他线程执行(执行完会往事件队列塞回调)
- 同步代码执行完，读取微任务队列，若有执行所有微任务，微任务清空
- 页面渲染
- 从事件队列面里取一个宏任务塞入执行栈执行
如此反复

**一个参考题目：**
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

### > 模拟实现 setTimeout

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
    if (now - start >= timeout) {
      fn.apply(this, args);
      window.cancelAnimationFrame(timer);
    }
  }
  window.requestAnimationFrame(loop);
}
```

### > 从输入URL到页面渲染完成发生了什么

- 用户输入url ，通过DNS解析成请求目的IP地址
- 浏览器与服务器建立连接（tcp 协议、三次握手），服务端处理请求返回html代码块
- 浏览器拿到返回的html，解析 html 成 dom 树、解析 css 成 cssobj
- dom 树、cssobj 结合成 render 树
- JS 根据 render 树进行计算、布局、重绘
- GPU 合成，输出到屏幕

### > tcp协议三次握手和四次挥手

![](http://nojsja.gitee.io/static-resources/images/interview/tcp.png)

##### 1. 三次握手讲解
- 客户端发送位码为syn＝1,随机产生seq确认号到服务器，服务器由SYN=1知道客户端要求建立联机（客户端：我要连接你）
- 服务器收到请求后要确认联机信息，向A发送ack number=(客户端的seq+1),syn=1,ack=1,随机产生seq=7654321的包（服务器：好的，你来连吧）
- 客户端收到后检查ack number是否正确，即第一次发送的seq number+1,以及位码ack是否为1，若正确，客户端会再发送ack number=(服务器的seq+1),ack=1，服务器收到后确认seq值与ack=1则连接建立成功。（客户端：好的，我来了）
#### 2. 为什么http建立连接需要三次握手，不是两次或四次?
答：三次握手之所以是三次是保证client和server均让对方知道自己的接收和发送能力没问题而保证的最小次数，两次不安全，四次浪费资源。

#### 3. TCP关闭连接过程
- Client向Server发送FIN包，表示Client主动要关闭连接，然后进入FIN_WAIT_1状态，等待Server返回ACK包。此后Client不能再向Server发送数据，但能读取数据。
- Server收到FIN包后向Client发送ACK包，然后进入CLOSE_WAIT状态，此后Server不能再读取数据，但可以继续向Client发送数据。
- Client收到Server返回的ACK包后进入FIN_WAIT_2状态，等待Server发送FIN包。
- Server完成数据的发送后，将FIN包发送给Client，然后进入LAST_ACK状态，等待Client返回ACK包，此后Server既不能读取数据，也不能发送数据。
- Client收到FIN包后向Server发送ACK包，然后进入TIME_WAIT状态，接着等待足够长的时间（2MSL）以确保Server接收到ACK包，最后回到CLOSED状态，释放网络资源。
- Server收到Client返回的ACK包后便回到CLOSED状态，释放网络资源。

#### 4. 为什么要四次挥手？
&nbsp;&nbsp;&nbsp;&nbsp; TCP是全双工信道，何为全双工就是客户端与服务端建立两条通道，通道1:客户端的输出连接服务端的输入；通道2:客户端的输入连接服务端的输出。两个通道可以同时工作：客户端向服务端发送信号的同时服务端也可以向客户端发送信号。所以关闭双通道的时候就是这样：
- 客户端：我要关闭输入通道了。 服务端：好的，你关闭吧，我这边也关闭这个通道。
- 服务端：我也要关闭输入通道了。 客户端：好的你关闭吧，我也把这个通道关闭。

### > 页面加载会触发哪些事件

1. document readystatechange事件  
readyState 属性描述了文档的加载状态，在整个加载过程中document.readyState会不断变化，每次变化都会触发readystatechange事件。事件使用`document.onreadystatechange`进行监听。  
readyState 有以下状态：  
  _1）loading - document仍在加载。_  
  _2）interactive - 文档结构已经完成加载，文档已被解析并且可以交互，但是诸如图像，样式表和脚本之类的外部资源仍在加载_  
  _3）complete - 文档和所有外部资源已完成加载。_  
2. document DOMContentLoaded事件  
  DOM树渲染完成时触发DOMContentLoaded事件，此时可能外部资源还在加载，事件同于jQuery中的ready事件和`readyState == 'interactive'`阶段。事件使用`document.addEventListener('DOMContentLoaded', function)`监听。
3. window load事件  
  所有的资源全部加载完成会触发window的load事件。事件使用`window.onload=function`进行监听。
```js
switch (document.readyState) {
  case "loading":
    // 表示文档还在加载中，即处于“正在加载”状态。
    break;
  case "interactive":
    // 文档已经结束了“正在加载”状态，DOM元素可以被访问
    break;
  case "complete":
    // 页面所有内容都已被完全加载.
    break;
}
/* 模拟 原生DOMContentLoaded 和 jquery ready 事件 */
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


### > document.ready 和 window.onload 的区别
```sh
ready事件在DOM结构绘制完成之后就会执行，这样能确保就算有大量的媒体文件没加载出来，JS代码一样可以执行。
load事件必须等到网页中所有内容全部加载完毕之后才被执行，如果一个网页中有大量的图片的话，则就会出现这种情况：网页文档已经呈现出来，但由于网页数据还没有完全加载完毕，导致load事件不能够即时被触发。
```

### > 闭包Closure

1. 执行上下文
函数每次执行，都会生成一个执行上下文内部对象(可理解为函数作用域)，这个上下文对象会保存函数中所有的变量值和该函数内部定义的函数的引用。函数每次执行时对应的执行上下文都是独一无二的，正常情况下函数执行完毕执行上下文就会被销毁。  
2. 内部作用域的外部引用导致作用域内变量垃圾回收不执行  
当一个函数内部作用域(注意不是单纯的变量引用)被其外层作用域引用时，函数执行完之后，其执行上下文不会被销毁，我们还能沿着作用域链访问到某个被引用的内部变量。

```js
// 外层作用域
function counterCreator() {
  // 内层作用域1
  var index = 1;
  return function () {
    // 内层作用域2，引用作用域1的变量index
    return index ++;
  };
}

// 外层作用域通过作用域链保存了内层作用域1的变量引用
var counterA = counterCreator();
// index变量不会被垃圾回收
counterA();     // 1
counterA();     // 2

```

### > 函数式编程思想的体现

### > 函数柯里化：add(1)(2)(3) == 6
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

### > 函数柯里化2：curry函数

1. 实现效果：
```js
function sum(a, b, c) {
  return a + b + c;
}

let curriedSum = curry(sum);

alert( curriedSum(1, 2, 3) ); // 6，仍然可以被正常调用
alert( curriedSum(1)(2,3) ); // 6，对第一个参数的柯里化
alert( curriedSum(1)(2)(3) ); // 6，全柯里化
```

2. 实现curry函数
```js
function curry(func) {
  return function core() {
    var args = [].slice.call(arguments);
    if (args.length >= func.length) {
      return func.apply(this, args);
    } else {
      return function() {
        return core.apply(this, args.concat(Array.from(arguments)));
      };
    }
  };
}
```

### > vue双向绑定实现原理

### > Vue2.0与Vue3.0双向绑定，proxy实现

### > 前端错误监控方法

### > 发布订阅模式和观察者模式区别

- 在观察者模式中，观察者是知道Subject的，Subject一直保持对观察者进行记录。然而，在发布订阅模式中，发布者和订阅者不知道对方的存在。它们只有通过消息代理进行通信。
- 在发布订阅模式中，组件是松散耦合的，正好和观察者模式相反。
- 可以理解为观察者模式没中间商赚差价，发布订阅模式，有中间商赚差价。
- 观察者模式大多数时候是同步的，比如当事件触发，Subject就会去调用观察者的方法。而发布-订阅模式大多数时候是异步的（使用消息队列）。
- 观察者模式需要在单个应用程序地址空间中实现，而发布-订阅更像交叉应用模式。

### > 实现一个EventEmitter类，支持事件的on,off,emit,once,setMaxListeners。

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
      return console.error('The max listeners limitation: ', this.maxListeners);
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

### > 实现ajax并发请求控制

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
        if (current >= length - 1) {
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

### > 如何自己实现一个单点登录系统

### > 使用ES5实现Promise

[链接-> 使用ES5实现ES6 Promise API](https://github.com/nojsja/promise-nojsja)

### > 什么情况下会发生布尔值的隐式强制类型转换？

- (..) 语句中的条件判断表达式。
- for ( .. ; .. ; .. ) 语句中的条件判断表达式（第二个）。
- while (..) 和 do..while(..) 循环中的条件判断表达式。
- 三元运算中的条件判断表达式。
- 逻辑运算中的操作数。
- 算术运算中的操作数。

### > 待完善

JavaScript：
请你谈谈 Cookie 的优缺点
简单说一下浏览器本地存储是怎样的
原型 / 构造函数 / 实例
原型链：
执行上下文(EC)
变量对象
作用域链
闭包
对象的拷贝
instanceof 原理
代码的复用
继承
类型转换
babel编译原理
......
