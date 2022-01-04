---
lang: zh-CN
title: 考点梳理
description: Node 的描述
---

### > Node.js的优势和劣势
**优势：** 处理I/O密集的任务，主要在于Node利用事件循环的处理能力，而不是启动一个线程为每一个请求服务，不用处理线程间的切换，资源占用极少。

**劣势：** 处理CPU密集型的任务，由于JS单线程的原因，如果有长时间运行的计算，将会导致CPU时间片得不到释放，使得后续的I/O任务无法发起。因此应该考虑适当调整和分解大型运算任务为多个小任务，使得运算能够适时释放，充分利用CPU，又不阻塞I/O调用的发起。

### > Nodejs使用场景
Nodejs 是单线程，非阻塞 I/O，事件驱动，不适用于CPU密集运算的任务。它的特点决定了它适合做一些大量 I/O 的东西，比如，聊天室，表单提交等不需要大量计算的功能。做一些微信后端开发，或者做消息系统等。可以整个项目用， 也可以根据它的特点在某个模块使用，比如 socketio，打造一个消息系统等。

### > Nodejs 中的 Stream 和 Buffer 有什么区别?
Buffer：为数据缓冲对象，是一个类似数组结构的对象，可以通过指定开始写入的位置及写入的数据长度，往其中写入二进制数据。Stream：是对 buffer 对象的高级封装，其操作的底层还是 buffer 对象， stream 可以设置为可读、可写，或者即可读也可写，在 nodejs 中继承了 EventEmitter 接口，可以监听读入、写入的过程。具体实现有文件流，httpresponse 等。

### > Node.js和Webpack对模块循环依赖的处理

举例，A和B相互依赖，我们运行A.js：
```js
// A.js:
let b = require('./B');

module.exports = {
    A: 'this is a Object'
};


console.log('A: before log b');
console.log(b);
console.log('A: after log b');

// B.js:

let a = require('./A');

module.exports = {
    B: 'this is b Object'
};

console.log('B: before log a');
console.log(a);
console.log('B: after log a');

```

##### Node.js的处理

1. 工作方式

&nbsp;&nbsp;&nbsp;&nbsp; Node.js具有两个特性：运行时加载和缓存已加载模块。为了避免无限循环的模块依赖，在 Node.js 运行 A.js 之后，它就被缓存了，但需要注意的是，此时缓存的仅仅是一个未完工的 A.js（an unfinished copy of the a.js）。所以在 B.js require A.js 时，得到的仅仅是缓存中一个未完工的 A.js，具体来说，它并没有明确被导出的具体内容（A.js 尾端）。所以 B.js 中输出的 a 是一个空对象。之后，B.js 顺利执行完，回到 A.js 的 require 语句之后，继续执行完成。

```js
// a.js
module.exports.a = 1
var b = require('./b')
console.log(b)
module.exports.a = 2

// b.js
module.exports.b = 11
var a = require('./a')
console.log(a)
module.exports.b = 22

//main.js
var a = require('./a')
console.log(a)
```

执行过程：

- 执行 node main.js -> 第一行 require(a.js)，（node 执行也可以理解为调用了require方法，我们省略require(main.js)内容）
- 进入 require(a)方法： 判断缓存（无） -> 初始化一个 module -> 将 module 加入缓存 -> 执行模块 a.js 内容，（需要注意 是先加入缓存， 后执行模块内容）
- a.js： 第一行导出 a = 1 -> 第二行 require(b.js)（a 只执行了第一行）
- 进入 require(b) 内 同 1 -> 执行模块 b.js 内容
- b.js： 第一行 b = 11 -> 第二行 require(a.js)
- require(a) 此时 a.js 是第二次调用 require -> 判断缓存（有）-> cachedModule.exports -> 回到 b.js（因为js对象引用问题 此时的 cachedModule.exports = { a: 1 }）
- b.js：第三行 输出 { a: 1 } -> 第四行 修改 b = 22 -> 执行完毕回到 a.js
- a.js：第二行 require 完毕 获取到 b -> 第三行 输出 { b: 22 } -> 第四行 导出 a = 2 -> 执行完毕回到 main.js
- main.js：获取 a -> 第二行 输出 { a: 2 } -> 执行完毕

2. 解决方案

&nbsp;&nbsp;&nbsp;&nbsp; 想要解决这个问题有一个很简明的方法，那就是在循环依赖的每个模块中先导出自身，然后再导入其他模块（对于本文的举例来说，实际只需改动 A.js，先使用module.exports导出，然后再require B.js）。

##### Webpack的处理

1. 工作方式

&nbsp;&nbsp;&nbsp;&nbsp; ES Modules 模块输出的是值的引用，输出接口动态绑定，在编译时执行。

&nbsp;&nbsp;&nbsp;&nbsp; webpack的头部启动代码中，通过闭包中的installedModules对象，将模块名或者id作为对象的key来缓存各个模块的export的值，通过判断installedModules上是否缓存了对应模块的key来判断是否已经加载了模块。

2. 解决方案
- 1）webpack尚未解决循环依赖问题，可以使用 circular-dependency-plugin 插件进行循依赖检测，减少debug时间。
- 2）打破文件间的依赖关系的闭环
- 3）依赖关系闭环的情况下，将变量改为function导出，利用function的变量提升机制

### > Webpack怎么处理require和import语法混用的
对于es6规范和commonJs规范来说，经过babel编译以后，都会转化成commonJs规范，然后在此基础上，用__esModule区分了是属于es6模块还是commonJs模块。并切为了保证es6规范用import导入值的正确性和统一性，babel还做了一些策略去处理这两者之前的差异。

### > 前端模块化历程
模块化主要是用来抽离公共代码，隔离作用域，避免变量冲突等。

##### 1. IIFE - 立即执行函数
使用自执行函数来编写模块化，特点：在一个单独的函数作用域中执行代码，避免变量冲突。
```js
(function(){
  return {
	data:[]
  }
})()

```

##### 2. AMD - requireJs
模块依赖需要提前声明好，不支持动态设置依赖
```js
define('./index.js',function(code){
	// code 就是index.js 返回的内容
});
```

##### 3. CMD - seaJs
支持动态依赖设置
```js
define(function(require, exports, module) {  
  var indexCode = require('./index.js');
});
```

##### 4. commonJs - Node.js模块规范
&nbsp;&nbsp;&nbsp;&nbsp; 属于动态导入规范，可以在条件语句中导入其它模块，特点: require、module.exports、exports。commonJs 一般用在服务端或者Node用来同步加载模块，它对于模块的依赖发生在代码运行阶段，不适合在浏览器端做异步加载。exports实际上是一个对module.exports的引用，不能给exports赋值，否则会断开与module.exports的连接：
```js
  exports.add = function add () {/* 方法 */}
    // 等同于
  module.exports.add = function add () {/* 方法 */}
```

##### 5. ES Module - 浏览器模块系统
&nbsp;&nbsp;&nbsp;&nbsp; 属于静态导入规范，import、export ES6模块化不是对象，import会在JavaScript引擎静态分析，在编译时就引入模块代码，而并非在代码运行时加载，因此也不适合异步加载。

静态的语法意味着可以在编译时确定导入和导出，更加快速的查找依赖，可以使用lint工具对模块依赖进行检查，可以对导入导出加上类型信息进行静态的类型检查

**ESModule的优势：**

- 死代码检测和排除。我们可以用静态分析工具检测出哪些模块没有被调用过。比如，在引入工具类库时，工程中往往只用到了其中一部分组件或接口，但有可能会将其代码完整地加载进来。未被调用到的模块代码永远不会被执行，也就成为了死代码。通过静态分析可以在打包时去掉这些未曾使用过的模块，以减小打包资源体积。
- 模块变量类型检查。JavaScript属于动态类型语言，不会在代码执行前检查类型错误（比如对一个字符串类型的值进行函数调用）。ES6 Module的静态模块结构有助于确保模块之间传递的值或接口类型是正确的。
- 编译器优化。在commonJs等动态模块系统中，无论采用哪种方式，本质上导入的都是一个对象，而ES6 Module支持直接导入变量，减少了引用层级，程序效率更高。

**ESModule导出的值是引用的例子：**
```js
// es6 module 中基本类型也按引用传递
// foo.js
export let a = 1
export function count(){
  a++
}

// main.js
import { a, count } from './foo'
console.log(a) //1
count()
console.log(a) //2
```

**ESModule和commonJs差异：**
- commonJs模块导入后是一个值的拷贝，一旦输出之后，无论模块内部怎么变化，都无法影响之前的引用；而ESModule导入后是一个引用值的动态映射，并且这个映射是只读的。
- ESModule 是引擎会在遇到import后生成一个引用链接，在脚本真正执行时才会根据这个引用链接去模块里面取值，模块内部的原始值变了import加载的模块也会变。
- commonJs运行时加载，ESModule编译阶段引用。commonJs在引入时是加载整个模块，生成一个对象，然后再从这个生成的对象上读取方法和属性。
- ESModule 不是对象，而是通过export暴露出要输出的代码块，在import时使用静态命令的方法引用指定的输出代码块，并在import语句处执行这个要输出的代码，而不是直接加载整个模块。

### > 谈谈node子进程child_process和实际使用场景

### > node是IO密集型体现在哪里