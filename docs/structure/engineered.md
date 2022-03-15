---
lang: zh-CN
title: ● 工程化
description: structure 的描述
---

## ➣ 项目怎么复盘？

&nbsp;&nbsp;&nbsp;&nbsp; 通俗地讲，就是对你所做事情的反思，可以是优点也可以是缺点。笔者进行复盘的出发点，一方面是想在一个项目中，有什么东西可以沉淀下来，下次做事情的时候可以直接用；二是这次有哪些地方做得不够好的地方下次有更大的进步空间。朝着这两个方向去提高自己。

&nbsp;&nbsp;&nbsp;&nbsp; 在项目结束一个星期左右的时候开始第一次的复盘比较合适。这个时候因为刚做完项目，很多实操的做法和过程都是清晰的，方便自己回忆起来。而且这个时候，头脑也会自动处于一种整理的状态，一般手上的活也不会很多，效率是最高的时候。

` 复盘 `- 最普遍也是最通用的做法：回顾目标 -> 评估结果 —> 分析原因 —> 总结经验：

### 回顾目标

- 1）当初行动的意图是什么？
- 2）事件想要达到的目标是什么？
- 3）预先制定的计划是什么？
- 4）事先设想要发生的事情是什么？

### 评估结果

- 1）实际发生了什么事？
- 2）在什么情况下，是怎么发生的？
- 3）与目标相比，哪些地方做得好？哪些未达预期？

### 分析原因

- 1）实际情况与预期有无差异？
- 2）如果实际情况与预期有差异，那么，为什么会出现这些差异？是由哪些因素造成？根本原因是什么？
- 3）如果实际情况与预期无差异，那么，成功的关键因素是什么？

### 总结经验

- 1）我们从过程中学到了什么新东西？
- 2）如果有人进行同样的行动，我会给他什么建议？
- 3）接下来我们该做什么？哪些是可以直接行动的？哪些是其他层级才能处理的？是否要向上级呈报？

## ➣ 前端兼容

#### 1. 多屏幕自适应

\> 背景：

在不同的屏幕分辨率，浏览器页面展示差异很大。特别是屏幕分辨率较小时，容易发生布局错乱。为了解决这个问题，响应式 UI 框架应运而生。

\> 关于浏览器视口：
[浏览器视口](https://segmentfault.com/a/1190000016595303#)

\> 移动设备优先和非移动设备移动优先：
```css
/* 大于等于某个像素 - 优先兼容移动端，选择兼容更大的屏幕 */
@media only screen and (min-width : 768px) {...}
/* 小于等于某个像素 - 优先兼容桌面端，选择兼容更小的屏幕 */
@media only screen and (max-width : 768px) {...}
```

\> 主流分辨率：

- 主流桌面屏幕分辨率宽度集中在 1280~1920，高度集中在 720~1080；

- 主流平板屏幕分辨率宽度集中在 962~1280，高度集中在 601~800。

- 主流移动屏幕分辨率宽度集中在 360~414，高度集中在 640~896。

\> 典型分辨率：

- 典型的桌面屏幕分辨率：1920x1080

- 典型的便携屏幕分辨率：1366x768

- 典型的平板屏幕分辨率：768x1024

- 典型的移动屏幕分辨率：360x640

\> Bootstrap 定义（参考系是逻辑分辨率）：
```sh
>=1400px ----- xxl 超超大屏设备 桌面屏幕

>=1200px ----- xl 超大屏设备 便携屏幕

>=992px ----- lg 大屏设备 竖屏桌面屏幕、横屏平板屏幕

>=768px ----- md 中屏设备 竖屏平板屏幕

>=576px ----- sm 小屏设备 横屏移动屏幕

<576px ----- xs 超小屏设备 竖屏移动屏幕
```
> 注：Bootstrap5 新增 xxl，Bootstrap3 中的 lg>=1200px，无 576px 档。

\> 设备像素比：

&nbsp;&nbsp;&nbsp;&nbsp; 手机屏幕尺寸过小，使用原始分辨率会使得页面显示过小，因此使用了逻辑分辨率，用倍数放大的方法来保证兼容性。比如 iOS app 的 UI 资源区分 @1x、@2x 和 @3x，这就是指原始分辨率对逻辑分辨率的倍数，被称为设备像素比 DPR。所以大部分人的手机分辨率都是 1080x1920，在分类中却被归为了 360x640。这个分辨率和 CSS 中的 PX 是一致的。

\> 一些较新的自适应 API：

#### 2. 兼容策略

\> 浏览器兼容策略：

国内 XP 用户还有 3.29%，XP 用户既升级不了 IE9，也无法安装新版本 Chrome 和 Firefox 。而 IE 用户还有 5.65%，考虑到 Windows 用户为 87%，所以 IE9 + 的份额应该要少于 5.65%-3.29%*87%=2.79%。也就是说 IE8 以下的用户要多于 IE8 以上的用户。所以支持单独支持 IE9+ 浏览器没有实际意义，要么支持 IE6，要么不支持 IE，。


\> 兼容 IE 的建议：

- 建议不做任何兼容，IE6~11 直接显示升级浏览器按钮。

- 如果一定要兼容，后端返回 IE 专用页面，至少兼容 IE8。


\> 屏幕分辨率兼容策略：

&nbsp;&nbsp;&nbsp;&nbsp; 屏幕分辨率最少要考虑兼容便携屏幕和移动屏幕两种。可以参考去哪儿网的做法，把内容分成三类：移动端主菜单与导航栏；主要内容；扩展内容。屏幕分辨率高于 480，显示主要内容、扩展内容。屏幕分辨率低于 480，显示移动端主菜单与导航栏、主要内容。

&nbsp;&nbsp;&nbsp;&nbsp; 如果你的应用是管理软件，则最好考虑兼容桌面屏幕、便携屏幕和移动屏幕三种。Bootstrap5 新增了超超大屏幕，则就是基于这种考虑。这时候，可以加入侧边栏自动隐藏 / 打开，主要内容用 Flex 方式组织，可以在页面中并排显示多页（类似于 Word 的页面视图）。

\> 跨平台兼容策略：

&nbsp;&nbsp;&nbsp;&nbsp; 大型网站，手机网站与桌面网站是不同的入口，因此不存在兼容，是两个单独的应用程序。对于流量较小的网站，平台的兼容策略主要是应用响应式框架，加上移动端主菜单与导航栏即可，其次可以选用跨平台框架来实现在不同平台的差异化体验。没有这些框架对于 Web 网站来说不造成大的体验下降。而如果需要开发混合移动、桌面应用，则需要认真考虑这些框架，毕竟用户对本地应用的体验期待要高很多。

#### 3. 常见浏览器兼容处理方法

\> 一些常用的浏览器兼容框架：

在前端发展的初期，大多数开发最关注的问题就是浏览器兼容问题，迫切需要兼容所有浏览器的 JS 和 CSS 框架。这阶段除了横空出世的 jQuery，还有一些其它方面的兼容框架。

- normalize.css：让不同的浏览器在渲染网页元素的时候形式更统一。

- html5shiv.js：IE6~IE8 识别 HTML5 标签，并且可以添加 CSS 样式。

- respond.js：使 IE6~IE8 浏览器支持媒体查询。

\>  常见的兼容写法：

- XHR 请求创建的兼容写法 (惰性载入)
```js
function createXHR(){
   if(typeof XMLHttpRequest != "undefined"){//XMLHttpRequest
       createXHR = function(){
           return new XMLHttpRequest();
       };
   }else if(typeof ActiveXObject!="undefined"){//IE ActiveXObject
       createXHR = function(){
           if(typeof arguments.callee.activeXString!="string"){
               var versions=["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", "MSXML2.XMLHttp"],//IE
                   i,len;
                for(i=0,len=versions.length;i<len;i++){
                   try{
                       new ActiveXObject(versions[i]);
                       arguments.callee.activeXString=version[i];
                       break;
                   }catch(ex){}
                }

           }
           return new ActiveXObject(arguments.callee.activeXString);
       };
   }else{
       createXHR = function(){
           throw new Error("fail");
       }
   }

   return createXHR();
}
```
- 事件监听器的兼容写法
  ```js
   var eventUtil={

    addEventHandler: function (obj, eventName, handler) {
        if (document.attachEvent) {//IE
            obj.attachEvent("on" + eventName, handler);
        } else if (document.addEventListener) {//DOM2 级
            obj.addEventListener(eventName, handler, false);//false- 默认。事件句柄在冒泡阶段执行
        }
        else{//DOM0 级
            obj['on'+eventName]=handler;
        }
    },

    removeEventHandler:function(obj, eventName, handler){
        if (document.attachEvent) {//IE
            obj.detachEvent("on" + eventName, handler);
        } else if (document.addEventListener) {//DOM2 级
            obj.removeEventListener(eventName, handler, false);
        }
        else{//DOM0 级
            obj['on'+eventName]=null;
        }
    },
    // 获取 event 对象的引用，取到事件的所有信息，确保随时能使用 event；
    getEvent: function (e) {
        var ev = e || window.event;
        if (!ev) {
            var c = this.getEvent.caller;
            while (c) {
                ev = c.arguments[0];
                if (ev && Event == ev.constructor) {
                    break;
                }
                c = c.caller;
            }
        }
        return ev;
    },
    // 事件类型
    getType: function (e) {
        return e.type;

    },
    // 调用事件的元素
    getElement: function (e) {
        return e.target|| e.srcElement;
    },
    // 阻止默认事件
    preventDefault: function (e) {
        e = this.getEvent(e);
        if(e.preventDefault){
            e.preventDefault();
        }
        else {
            return e.returnValue=false;//IE
        }
    },
    // 阻止冒泡
    stopPropagation:function(e) {
      if(e.stopPropagation){
          e.stopPropagation();
      }
        else {
          e.cancelBubble=true;//IE
      }

    },
    // 键盘事件键盘的编号
    getCharCode:function (e){
        if(typeof e.charCode=="number") return e.charCode;
        else return e.keyCode;
    },
    // 获取剪贴板的文本
    getClipbordText:function(e){
        var clipboardData=(e.clipboardData||window.clipboardData);
        return clipboardData.getData("text");
    },
    // 设置剪贴板文本
    setClipboardText:function(e,value){
        if(e.clipboardData){
            return e.clipboardData.setData("text/plain",value);
        }else if(window.clipboardData){
            return window.clipboardData.setData("text",value);
        }
    },

  }
  ```

- 浏览器事件对象的兼容
```js
   function getActivatedObject(e) {
      var obj;
      if (!e) {
          // early version of IE
          obj = window.event.srcElement;
      } else if (e.srcElement) {
          // IE 7 or later
          obj = e.srcElement;
      } else {
          // DOM Level 2 browser
          obj = e.target;
      }
      return obj;
    }
```
- requestAnimationFrame 兼容写法
- 获取页面视口大小的兼容写法
   ```js
   var pageWidth=window.innerWidth,
   pageHeight=window.innerHeight;
   if(typeof pageHeight!="number"){
       if(document.compatMode=="CSS1Compat"){// 标准模式
           pageHeight=window.documentElement.clientHeight;
           pageWidth=window.documentElement.clientWidth;
       }
       else {//BackCompat
           pageHeight=window.body.clientHeight;
           pageWidth=window.body.clientWidth;
       }
   }
   ```
- 获取 CSS 样式
   ```js
   function getStyle(obj,attr){
      if(obj.currentStyle) {//IE 浏览器
          return obj.currentStyle[attr];
      }else{//Firefox 浏览器
          return getComputedStyle(obj,false)[attr];
      }
    }
   ```

#### 3. 工程化兼容方法：babel
&nbsp;&nbsp;&nbsp;&nbsp; babel 默认只转换一些我们最新的 ES 语法，比如：箭头函数、Class 等，一些新的 API 方法，比如：Generator、Iterator、Set、Map、Proxy、Reflect、Symbol、Promise、Object.assgin、Array.from 等都不会做转换，可以使用 babel polyfill 插件制定兼容方案。

\> 1) 使用 `babel-plugin-transform-xxx` 内联定向兼容一些 API 方法：

比如使用 `babel-plugin-transform-object-assign` 插件单独兼容 `Object.assign`：

```bash
npm i babel-plugin-transform-object-assign

# in .babelrc
{
  "presets": ["latest"],
  "plugins": ["transform-object-assign"]
}
```

代码会被转化为如下：
```js
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var foo = exports.foo = function foo(a, b) {
  return _extends(a, b);
};
```

** 缺点是 **：该插件可能在每个代码块中重复插入 polyfill 处理，造成重复的不必要引入

\> 2) 使用 `babel-plugin-transform-runtime` 进行模块级自动兼容：

plugin-transform 的引用是 module 级别的，意味着在多个 module 使用时会重复的引用，但是不会污染全局变量。

```js
npm i -D babel-plugin-transform-runtime
npm i babel-runtime

# .babelrc
{
  "presets": ["latest"],
  "plugins": ["transform-runtime"]
}
```

** 缺点是：** 只会兼容原型方法，实例对象上的方法无效，比如 `var a = {}; a.assgin()` 没法被正确转换。

\> 3) 源码引入 `babel-polyfill` 来进行全局兼容：

babel 提供了通过改变全局来兼容 es2015 所有方法的 babel-polyfill，安装 babel-polyfill 后你只需要在 main.js 加一句 import 引入它即可，如果使用了 webpack 也可以直接在 entry 中添加 babel-polyfill 的入口。

```js
import 'babel-polyfill';
```

** 缺点：** 会污染全局变量，并且增加了引入文件体积，未使用的 API polyfill 也会被引入，可以将其抽离成一个 common module，放在项目的静态 dll 库中，或者抽成一个文件放在 cdn 上。

\> 4) 使用 polyfill.io 针对使用者浏览器版本进行定向兼容：

以上兼容方法都会忽略较新版本浏览器的兼容情况，可能将用户浏览器已经兼容的 API 都给引入覆盖了，`polyfill.io` 提供一种更加智能化的方式：不同的浏览器下请求 https://cdn.polyfill.io/v2/polyfill.js 这个文件，服务器会判断浏览器 UA 返回不同的 polyfill 文件，你所要做的仅仅是在页面上使用 `script` 标签引入这个文件。

并且 `polyfill.io` 不旦提供了 cdn 的服务，也开源了自己的实现方案 [polyfill-service](https://github.com/Financial-Times/polyfill-service)，用户可以根据实际项目情况自行选择。

** 缺点：** polyfill.io 面对复杂的浏览器 UA 可能识别不准确，面对这种情况时需要有替补解决方案。

#### 4. 工具兼容方法：css 前缀

&nbsp;&nbsp;&nbsp;&nbsp; 有时候为了兼容一些较新的 css 语法，比如：`display: flex`，我们需要针对各个浏览器添加很多前缀声明：
```css
.container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
```

手动进行适配兼容肯定是个很大的工作量，可以使用 vscode 插件 `Autoprefixer
` 进行自动添加，它会根据 [Can I Use](https://caniuse.com/) 网站统计的浏览器兼容版本进行自动前缀添加。注意使用 `v2.2.0` 版本，最新的版本会无效，安装好之后需要去 vscode config.json 里进行配置：

```json
{
  ...
  "autoprefixer.browsers": [
        "last 5 versions",
        "> 5%"
    ],
}
```

## ➣ webpack/rollup 一些区别

- webpack 不支持导出 es6 module 规范，rollup 支持导出 es6 module
- webpack 打包后代码很多冗余无法直接看，rollup 打包后的代码简洁，可读，像源码
- webpack 可以进行代码分割，静态资源处理，HRM，rollup 专注于 es module，tree-shaking 更加强大的，精简

## ➣ webpack loader 和 plugin 区别

1. loader，它是一个转换器，将 A 文件进行编译成 B 文件，比如：将 A.less 转换为 A.css，单纯的文件转换过程。
2. plugin 是一个扩展器，它丰富了 webpack 本身，针对是 loader 结束后，webpack 打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听 webpack 打包过程中的某些节点，执行广泛的任务

## ➣ 前端沙箱 SandBox 的实现方式

> iframe 方式有很多缺点，不建议采用

### 1. 基于 window diff / recover 快照的方式

在不支持代理的浏览器中，我们可以通过 diff 的方式实习沙箱。在应用运行的时候保存一个快照 window 对象，将当前 window 对象的全部属性都复制到快照对象上，子应用卸载的时候将 window 对象修改做个 diff，将不同的属性用个 modifyMap 保存起来，再次挂载的时候再加上这些修改的属性。代码如下：

```javascript
class DiffSandbox {
  constructor(name) {
    this.name = name;
    this.modifyMap = {}; // 存放修改的属性
    this.windowSnapshot = {};
  }
  active() {
    // 缓存 active 状态的沙箱
    this.windowSnapshot = {};
    for (const item in window) {
      this.windowSnapshot[item] = window[item];
    }

    Object.keys(this.modifyMap).forEach(p => {
      window[p] = this.modifyMap[p];
    })

  }

  inactive() {
    for (const item in window) {
      if (this.windowSnapshot[item] !== window[item]) {
        // 记录变更
        this.modifyMap[item] = window[item];
        // 还原 window
        window[item] = this.windowSnapshot[item];
      }
    }
  }
}

const diffSandbox = new DiffSandbox('diff 沙箱');
diffSandbox.active();  // 激活沙箱
window.a = '1'
console.log('开启沙箱：', window.a);
diffSandbox.inactive(); // 失活沙箱
console.log('失活沙箱：', window.a);
diffSandbox.active();   // 重新激活
console.log('再次激活', window.a);
```

### 2. 基于 Proxy 的方式 (单沙箱实例)

在 ES6 当中，我们可以通过代理 (Proxy) 实现对象的劫持。基本实录也是通过 window 对象的修改进行记录，在卸载时删除这些记录，在应用再次激活时恢复这些记录，来达到模拟沙箱环境的目的。代码如下

```javascript
// 修改 window 属性的公共方法
const updateWindowProp = (prop, value, isDel) => {
    if (value === undefined || isDel) {
        delete window[prop];
    } else {
        window[prop] = value;
    }
}

class ProxySandbox {

    active() {
        // 根据记录还原沙箱
        this.currentUpdatedPropsValueMap.forEach((v, p) => updateWindowProp(p, v));
    }
    inactive() {
        // 1 将沙箱期间修改的属性还原为原先的属性
        this.modifiedPropsMap.forEach((v, p) => updateWindowProp(p, v));
        // 2 将沙箱期间新增的全局变量消除
        this.addedPropsMap.forEach((_, p) => updateWindowProp(p, undefined, true));
    }

    constructor(name) {
        this.name = name;
        this.proxy = null;
        // 存放新增的全局变量
        this.addedPropsMap  = new Map();
        // 存放沙箱期间更新的全局变量
        this.modifiedPropsMap = new Map();
        // 存在新增和修改的全局变量，在沙箱激活的时候使用
        this.currentUpdatedPropsValueMap = new Map();

        const {addedPropsMap, currentUpdatedPropsValueMap, modifiedPropsMap} = this;
        const fakeWindow = Object.create(null);
        const proxy = new Proxy(fakeWindow, {
            set(target, prop, value) {
                if (!window.hasOwnProperty(prop)) {
                    // 如果 window 上没有的属性，记录到新增属性里
                    // debugger;
                    addedPropsMap.set(prop, value);
                } else if (!modifiedPropsMap.has(prop)) {
                    // 如果当前 window 对象有该属性，且未更新过，则记录该属性在 window 上的初始值
                    const originalValue = window[prop];
                    modifiedPropsMap.set(prop, originalValue);
                }
                // 记录修改属性以及修改后的值
                currentUpdatedPropsValueMap.set(prop, value);
                // 设置值到全局 window 上
                updateWindowProp(prop, value);
                return true;
            },
            get(target, prop) {
                return window[prop];
            },
        });
        this.proxy = proxy;
    }
}


const newSandBox = new ProxySandbox('代理沙箱');
const proxyWindow = newSandBox.proxy;
proxyWindow.a = '1'
console.log('开启沙箱：', proxyWindow.a, window.a);
newSandBox.inactive(); // 失活沙箱
console.log('失活沙箱：', proxyWindow.a, window.a);
newSandBox.active(); // 失活沙箱
console.log('重新激活沙箱：', proxyWindow.a, window.a);
```

### 3. 基于 Proxy 的方式 (多沙箱实例)

在单实例的场景总，我们的 fakeWindow 是一个空的对象，其没有任何储存变量的功能，微应用创建的变量最终实际都是挂载在 window 上的，这就限制了同一时刻不能有两个激活的微应用。

```javascript
class MultipleProxySandbox {

    active() {
        this.sandboxRunning = true;
    }
    inactive() {
        this.sandboxRunning = false;
    }

    /**
     * 构造函数
     * @param {*} name 沙箱名称
     * @param {*} context 共享的上下文
     * @returns
     */
    constructor(name, context = {}) {
        this.name = name;
        this.proxy = null;
        const fakeWindow = Object.create({});
        const proxy = new Proxy(fakeWindow, {
            set: (target, name, value) => {
                if (this.sandboxRunning) {
                    if (Object.keys(context).includes(name)) {
                        context[name] = value;
                    }
                    target[name] = value;
                }
            },
            get: (target, name) => {
                // 优先使用共享对象
                if (Object.keys(context).includes(name)) {
                    return context[name];
                }
                return target[name];
            }
        })
        this.proxy = proxy;
    }
}

const context = {document: window.document};

const newSandBox1 = new MultipleProxySandbox('代理沙箱 1', context);
newSandBox1.active();
const proxyWindow1 = newSandBox1.proxy;

const newSandBox2 = new MultipleProxySandbox('代理沙箱 2', context);
newSandBox2.active();
const proxyWindow2 = newSandBox2.proxy;
console.log('共享对象是否相等', window.document === proxyWindow1.document, window.document ===  proxyWindow2.document);

proxyWindow1.a = '1'; // 设置代理 1 的值
proxyWindow2.a = '2'; // 设置代理 2 的值
window.a = '3';  // 设置 window 的值
console.log('打印输出的值', proxyWindow1.a, proxyWindow2.a, window.a);


newSandBox1.inactive(); newSandBox2.inactive(); // 两个沙箱都失活

proxyWindow1.a = '4'; // 设置代理 1 的值
proxyWindow2.a = '4'; // 设置代理 2 的值
window.a = '4';  // 设置 window 的值
console.log('失活后打印输出的值', proxyWindow1.a, proxyWindow2.a, window.a);

newSandBox1.active(); newSandBox2.active(); // 再次激活

proxyWindow1.a = '4'; // 设置代理 1 的值
proxyWindow2.a = '4'; // 设置代理 2 的值
window.a = '4';  // 设置 window 的值
console.log('失活后打印输出的值', proxyWindow1.a, proxyWindow2.a, window.a);
```

## ➣ 前端 SEO 优化

### SPA 应用 SEO 的优化方式

SSG - 服务端是指客户端向服务器发出请求，然后运行时动态生成 html 内容并返回给客户端。
SSR - 静态站点的解析是在构建时执行的，当发出请求时，html 将静态存储，直接发送回客户端。

下文讲的所有优化方式都建立在网站爬虫能够正确读取到页面结构和网页内容的基础上，单页 SPA 应用因为网页内容使用 Js 脚本生成，爬虫不能正确读取，因此需要 `SSR/SSG` 等渲染方式进行服务端预处理。

### SEO 的目的

让网站更利于各大搜索引擎抓取和收录，增加对搜索引擎的友好度，使得用户在搜索对应关键词时网站时能排在前面，增加产品的曝光率和流量。

### SEO 的优化方式

#### 网页 TDK 标签声明

- title：当前页面的标题（强调重点即可，每个页面的 title 尽量不要相同）
- description：当前页面的描述（列举几个关键词即可，不要过分堆积）
- keywords：当前页面的关键词（高度概括网页内容）

#### 使用语义化标签

根据内容的结构化，选择合适的 HTML5 标签尽量让代码语义化，如使用 header，footer，section，aside，article，nav 等等语义化标签可以让爬虫更好的解析。

#### 合理使用文本结构标签 `h1-h6`

一个页面中只能最多出现一次 h1 标签，h2 标签通常作为二级标题或文章的小标题。其余 h3-h6 标签如要使用应按顺序层层嵌套下去，不可以断层或反序。比如通常在首页的 logo 上加 h1 标签。

#### 图片 Alt 标签

一般来说，除非是图片仅仅是纯展示类没有任何实际信息的话，alt 属性可以为空。否则使用 img 标签都要添加 alt 属性，使 "蜘蛛" 可以抓取到图片的信息。
当网络加载不出来或者图片地址失效时，alt 属性的内容才会代替图片呈现出来，

#### a 标签 title

a 标签的 title 属性其实就是提示文字作用，当鼠标移动到该超链接上时，就会有提示文字的出现。通过添加该属性也有微小的作用利于 SEO。

#### 404 页面

404 页面首先是用户体验良好，不会莫名报一些其他提示。其次对蜘蛛也友好，不会因为页面错误而停止抓取，可以返回抓取网站其他页面。

#### 扁平化目录层次

#### 优化网站结构布局

#### nofollow 忽略跟踪

- nofollow 有两种用法：

1. 用于 meta 元标签，告诉爬虫该页面上所有链接都无需追踪。

```abnf
<meta name="robots" content="nofollow" />
```

2. 用于 a 标签，告诉爬虫该页面无需追踪。

```livecodeserver
<a href="https://www.xxxx?login" rel="nofollow"> 登录 / 注册 </a>
```

通常用在 a 标签比较多，它主要有三个作用：

1. "蜘蛛" 分配到每个页面的权重是一定的，为了集中网页权重并将权重分给其他必要的链接，就设置 `rel='nofollow'` 告诉 "蜘蛛" 不要爬，来避免爬虫抓取一些无意义的页面，影响爬虫抓取的效率；而且一旦 "蜘蛛" 爬了外部链接，就不会再回来了。
2. 付费链接：为了防止付费链接影响 Google 的搜索结果排名，Google 建议使用 nofollow 属性。
3. 防止不可信的内容，最常见的是博客上的垃圾留言与评论中为了获取外链的垃圾链接，为了防止页面指向一些拉圾页面和站点。

#### 建立 robots.txt 文件

> robots.txt 文件由一条或多条规则组成。每条规则可禁止（或允许）特定抓取工具抓取相应网站中的指定文件路径。

```awk
User-agent: *
Disallow:/admin/
SiteMap: http://www.xxxx.com/sitemap.xml
```

关键词：

1. User-agent 表示网页抓取工具的名称
2. Disallow 表示不应抓取的目录或网页
3. Allow 应抓取的目录或网页
4. Sitemap 网站的站点地图的位置

- `User-agent: *` 表示对所有的搜索引擎有效
- `User-agent: Baiduspider` 表示百度搜索引擎，还有谷歌 Googlebot 等等搜索引擎名称，通过这些可以设置不同搜索引擎访问的内容

robots 文件是搜索引擎访问网站时第一个访问的，然后根据文件里面设置的规则，进行网站内容的爬取。通过设置 `Allow` 和 `Disallow` 访问目录和文件，引导爬虫抓取网站的信息。

它主要用于使你的网站避免收到过多请求，告诉搜索引擎应该与不应抓取哪些页面。如果你不希望网站的某些页面被抓取，这些页面可能对用户无用，就通过 `Disallow` 设置。实现定向 SEO 优化，曝光有用的链接给爬虫，将敏感无用的文件保护起来。

即使网站上面所有内容都希望被搜索引擎抓取到，也要设置一个空的 robot 文件。因为当蜘蛛抓取网站内容时，第一个抓取的文件 robot 文件，如果该文件不存在，那么蜘蛛访问时，服务器上就会有一条 404 的错误日志，多个搜索引擎抓取页面信息时，就会产生多个的 404 错误，故一般都要创建一个 robots.txt 文件到网站根目录下。

空 robots.txt 文件

```makefile
User-agent: *
Disallow:
```

## ➣ 常见的构建工具及对比

构建工具职责：

- 代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。
- 文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。
- 代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。
- 模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。
- 自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。
- 代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。
- 自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。

构建其实是工程化、自动化思想在前端开发中的体现，把一系列流程用代码去实现，让代码自动化地执行这一系列复杂的流程。 构建给前端开发注入了更大的活力，解放了我们的生产力。

### 一、Grunt

Grunt 和 Npm Script 类似，也是一个任务执行者。Grunt 有大量现成的插件封装了常见的任务，也能管理任务之间的依赖关系，自动化执行依赖的任务，每个任务的具体执行代码和依赖关系写在配置文件 Gruntfile.js 里，例如：

```javascript
module.exports = function(grunt) {
  // 所有插件的配置信息
  grunt.initConfig({
    // uglify 插件的配置信息
    uglify: {
      app_task: {
        files: {
          'build/app.min.js': ['lib/index.js', 'lib/test.js']
        }
      }
    },
    // watch 插件的配置信息
    watch: {
      another: {
          files: ['lib/*.js'],
      }
    }
  });

  // 告诉 grunt 我们将使用这些插件
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 告诉 grunt 当我们在终端中启动 grunt 时需要执行哪些任务
  grunt.registerTask('dev', ['uglify','watch']);
};
```

在项目根目录下执行命令 grunt dev 就会启动 JavaScript 文件压缩和自动刷新功能。

Grunt 的优点是：

- 灵活，它只负责执行你定义的任务；
- 大量的可复用插件封装好了常见的构建任务。

Grunt 的缺点是集成度不高，要写很多配置后才可以用，无法做到开箱即用。

Grunt 相当于进化版的 Npm Script，它的诞生其实是为了弥补 Npm Script 的不足。

### 二、Gulp

Gulp 是一个基于流的自动化构建工具。 除了可以管理和执行任务，还支持监听文件、读写文件。Gulp 被设计得非常简单，只通过下面 5 个方法就可以胜任几乎所有构建场景：

- 通过 gulp.task 注册一个任务；
- 通过 gulp.run 执行任务；
- 通过 gulp.watch 监听文件变化；
- 通过 gulp.src 读取文件；
- 通过 gulp.dest 写文件。

Gulp 的最大特点是引入了流的概念，同时提供了一系列常用的插件去处理流，流可以在插件之间传递，大致使用如下：

```javascript
// 引入 Gulp
var gulp = require('gulp');
// 引入插件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// 编译 SCSS 任务
gulp.task('sass', function() {
  // 读取文件通过管道喂给插件
  gulp.src('./scss/*.scss')
    // SCSS 插件把 scss 文件编译成 CSS 文件
    .pipe(sass())
    // 输出文件
    .pipe(gulp.dest('./css'));
});

// 合并压缩 JS
gulp.task('scripts', function() {
  gulp.src('./js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

// 监听文件变化
gulp.task('watch', function(){
  // 当 scss 文件被编辑时执行 SCSS 任务
  gulp.watch('./scss/*.scss', ['sass']);
  gulp.watch('./js/*.js', ['scripts']);
});
```

Gulp 的优点是好用又不失灵活，既可以单独完成构建也可以和其它工具搭配使用。其缺点是和 Grunt 类似，集成度不高，要写很多配置后才可以用，无法做到开箱即用。

可以将 Gulp 看作 Grunt 的加强版。相对于 Grunt，Gulp 增加了监听文件、读写文件、流式处理的功能。

### 三、Webpack

Webpack 是一个打包模块化 JavaScript 的工具，在 Webpack 里一切文件皆模块，通过 Loader 转换文件，通过 Plugin 注入钩子，最后输出由多个模块组合成的文件。Webpack 专注于构建模块化项目。

一切文件：JavaScript、CSS、SCSS、图片、模板，在 Webpack 眼中都是一个个模块，这样的好处是能清晰的描述出各个模块之间的依赖关系，以方便 Webpack 对模块进行组合和打包。 经过 Webpack 的处理，最终会输出浏览器能使用的静态资源。

Webpack 具有很大的灵活性，能配置如何处理文件，大致使用如下：

```javascript
module.exports = {
  // 所有模块的入口，Webpack 从入口开始递归解析出所有依赖的模块
  entry: './app.js',
  output: {
    // 把入口所依赖的所有模块打包成一个文件 bundle.js 输出
    filename: 'bundle.js'
  }
}
```

Webpack 的优点是：

- 专注于处理模块化的项目，能做到开箱即用一步到位；
- 通过 Plugin 扩展，完整好用又不失灵活；
- 使用场景不仅限于 Web 开发；
- 社区庞大活跃，经常引入紧跟时代发展的新特性，能为大多数场景找到已有的开源扩展；
- 良好的开发体验。

Webpack 的缺点是只能用于采用模块化开发的项目。

### 四、Rollup

Rollup 是一个和 Webpack 很类似但专注于 ES6 的模块打包工具。 Rollup 的亮点在于能针对 ES6 源码进行 Tree Shaking 以去除那些已被定义但没被使用的代码，以及 Scope Hoisting 以减小输出文件大小提升运行性能。 然而 Rollup 的这些亮点随后就被 Webpack 模仿和实现。 由于 Rollup 的使用和 Webpack 差不多，这里就不详细介绍如何使用了，而是详细说明它们的差别：

- Rollup 是在 Webpack 流行后出现的替代品；
- Rollup 生态链还不完善，体验不如 Webpack；
- Rollup 功能不如 Webpack 完善，但其配置和使用更加简单；
- Rollup 不支持 Code Spliting，但好处是打包出来的代码中没有 Webpack 那段模块的加载、执行和缓存的代码。

Rollup 在用于打包 JavaScript 库时比 Webpack 更加有优势，因为其打包出来的代码更小更快。 但功能不够完善，很多场景都找不到现成的解决方案。

### 五、Snowpack

Snowpack 是一个用在现代 Web 应用上的，快如闪电的前端构建工具。 在你的开发工作流程中，它可以替代更重、更复杂的打包工具，如 webpack 或 Parcel。 Snowpack 利用了 JavaScript 的本地模块系统 (ESM) 以避免不必要的工作，无论你的项目膨胀地多大，它都能保持快速。

Snowpack 是一个用于提升 Web 开发效率的轻量级新型构建工具。传统的 JavaScript 构建工具如 Webpack 和 Parcel，在你每次保存一个文件时都需要重建和打包整个应用程序。这个重建步骤会在保存修改和浏览器响应之间产生明显滞后。

在开发过程中，Snowpack 为你的项目提供了免打包式 (unbundled development) 的服务。每个文件只需构建一次就被永远缓存起来。当文件发生变化时，Snowpack 重新构建发生变化的文件然后在浏览器中直接更新，而没有在重新打包上浪费时间 (通过模块热替换 (HMR) 实现)。

Snowpack 的免打包式工具仍支持你在生产中所习惯的打包式构建。当你为生产环境构建项目时，你可以通过 Webpack 或 Rollup（即将推出）的官方 Snowpack 插件插入你喜欢的打包器。由于 Snowpack 已经处理了构建，所以不需要复杂的打包器配置。

Snowpack 为你带来了两全其美的效果: 快速、免打包式的开发，以及打包式生产构建中的优化性能。

## ➣ 中间层框架 Express / Next / Nest 的定位和区别

### 一、Express

Express 是最流行的 Node 框架，是许多其它流行 Node 框架 的底层库。它提供了以下机制：

- 为不同 URL 路径中使用不同 HTTP 路由处理程序。
- 集成了 “视图” 渲染引擎，以便通过将数据插入模板来生成响应，比如：Ejs 和 Jade 等。
- 在请求处理管道的任何位置添加额外的请求处理 “中间件”。

虽然 Express 本身是极简风格的，但是开发人员通过创建各类兼容的中间件包解决了几乎所有的 web 开发问题。这些库可以实现 cookie、会话、用户登录、URL 参数、POST 数据、安全头等功能。可在 Express 中间件 网页中找到由 Express 团队维护的中间件软件包列表（还有一张流行的第三方软件包列表）。

### 二、Next

要从头开始使用 React 构建一个完整的 Web 应用程序，需要考虑许多重要的细节：

- 必须使用打包程序（例如 webpack）打包代码，并使用 Babel 等编译器进行代码转换。
- 你需要针对生产环境进行优化，例如代码拆分。
- 你可能需要对一些页面进行预先渲染以提高页面性能和 SEO。你可能还希望使用服务器端渲染或客户端渲染。
- 你可能必须编写一些服务器端代码才能将 React 应用程序连接到数据存储。

Next.js 是一个同构 React 开发框架。Next.js 为上述所有问题提供了解决方案。

Next.js 具有同类框架中最佳的 “开发人员体验” 和许多内置功能。列举其中一些如下：

- 直观的、 基于页面 的路由系统（并支持 动态路由）
- 预渲染。支持在页面级的 静态生成 (SSG) 和 服务器端渲染 (SSR)
- 自动代码拆分，提升页面加载速度
- 具有经过优化的预取功能的 客户端路由
- 内置 CSS 和 Sass 的支持，并支持任何 CSS-in-JS 库
- 开发环境支持快速刷新
- 利用 Serverless Functions 及 API 路由 构建 API 功能
- 完全可扩展

### 三、Nest

在底层，Nest 构建在强大的 HTTP 服务器框架上，如 Express。由于直接暴露了底层框架的 API，因此它天然享有 Express 丰富的第三方插件。

Nest 内置并完全支持 TypeScript 并结合了 OOP（面向对象编程），FP（函数式编程）和 FRP（函数式响应编程）的元素。

Nest 提供了一个开箱即用的应用程序体系结构，允许开发者及其团队创建高度可测试、可扩展、松散耦合且易于维护的应用。

- Controllers：控制器负责处理传入的请求并将响应返回给客户端。
- Providers：

## ➣ 前端错误捕获和上报

### 一、错误类型

#### Js 执行错误

- 语法错误。
- 运行时同步错误。
- 普通异步任务错误，比如回调函数。
- Promise 任务错误。
- async 异步任务任务错误，比如定时器。

#### 资源加载错误

- img
- script
- link
- audio
- video
- iframe

### 二、错误捕获

#### 1. 浏览器端

| 捕获方式                              | 同步任务 | 普通异步任务 | Promise 任务 | Async 任务 | 资源加载 | 语法错误 |
|---------------------------------------|----------|--------------|--------------|------------|----------|----------|
| try...catch                           | √        | ×            | ×            | ×          | ×        | ×        |
| onerror()                             | √        | √            | ×            | ×          | ×        | ×        |
| addEventListener('error')             | √        | √            | ×            | √          | √        | ×        |
| addEventListener('unhandlerejection') | ×        | ×            | √            | ×          | ×        | ×        |

表格说明：

- 语法错误无法捕获，语法错误应该在编译阶段解决，不应该出现在生产环境中。
- 一般的同步错误可以直接通过内联 try...catch 捕获，也可以通过统一的全局处理时间捕获。
- Promise 任务可以通过 .then / .catch 捕获，未添加处理语句的 Promise 可以通过全局 `unhandlerejection` 事件捕获。
- 异步任务比如定时器、回调函数等可以通过 `addEventListener('error')` 捕获。
- 资源加载错误可以通过 `addEventListener('error')` 捕获。
- 异步任务无法被 try...catch 捕获的原因不是异步任务发生在其它线程，而是异步任务由于事件循环机制不是和同步代码一起执行的，也就无法由同步代码捕获，异步任务中回调函数执行也同样是在主线程。

#### 2. Node 服务端

在 Node 服务端的收集其实和客户端上大同小异，只是一些方法上的区别：

uncaughtException：

通过 Node 的全局处理，捕获所有未被处理的错误, 这是最后一层关卡，兜底的操作，如果还不处理的话往往会导致程序崩溃。

```javascript
process.on('uncaughtException', err => {
  //do something
});
```

unhandledRejection：

```javascript
process.on('unhandledRejection', err => {
  //do something
});
```

在 Node 中，Promise 中的错误同样不能被 try...catch 和 uncaughtException 捕获。这时候我们就需要 unhandledRejection 来帮我们捕获这部分错误。


### 三、错误上报

#### 1. XMLHttpRequest

我们想要将数据传回服务器，最通用的方式当然就是 ajax 请求，通过浏览器的 XMLHttpRequest（这里我们不讨论 IE）的 send 方法，发送 post 请求数据给服务端，这里我们不再给出实现。

其缺点也很明显：

- 有严格的跨域限制、携带 cookie 问题。
- 上报请求可能会阻塞业务。
- 请求容易丢失（被浏览器强制 cancel）。

#### 2. Image 方式

由于浏览器对资源文件的区别对待，为了解决上面的几个问题，我们可以通过创建一个 1x1 大小的图片进行异步加载的方式来上报。图片天然可跨域，又能兼容所有的浏览器，而 js 和 css 等其他资源文件则可能出现安全拦截和跨域加载问题。

```javascript
var img = new Image();
img.width = 1;
img.height = 1;
img.src = 'https://domain.com/api/report?data=xxx';
```

但由于是一个 get 请求，上报的数据量在不同的浏览器下上限不一致（2kb-8kb），这就可能出现超出长度限制而无法上报完整数据的情况。因此，图片上报也是一个 “不安全” 的方式。

#### 3. SendBeacon

这个方法天生就是为了数据统计而设计的，它解决了 XMLHttpRequest 和图片上报的绝大部分弊端：

- 没有跨域问题。
- 不阻塞页面刷新 / 跳转等操作，甚至能在页面 unload 阶段 (页面关闭) 继续发送数据，完美地解决了普通请求在 unload 阶段被 cancel 导致丢数据的问题。
- 浏览器将 Beacon 请求排队让它在空闲的时候执行并立即返回控制
- navigator 在 web worker 中也能使用，因此使用场景很广泛。
- IE 并不支持。

```javascript
// 创建一个新的 FormData 并添加一个键值对
let data = new FormData();
data.append('hello', 'world');
let result = navigator.sendBeacon('./src', data);
if (result) {
  console.log('请求成功排队 等待执行');
} else {
  console.log('失败');
}
```

这里需要注意的是，sendBeacon 并不像 XMLHttpRequest 一样可以直接指定 Content-Type，且不支持 application/json 等常见格式。data 的数据类型必须是 ArrayBufferView 或 Blob, DOMString 或者 FormData 类型的。这里给出 Blob 类型的示例。

#### 错误上报方式总结

于以上 3 种上报方式，我们可以基本总结出，上报数据建议优先使用 sendBeacon 的方式，不支持的浏览器（例如 IE）则降级使用图片上报，尽量避免直接使用 XMLHttpRequest 进行上报。

## ➣ 前端监控平台

前端监控平台可用于一些监控和数据统计追踪，比如：日活跃、用户行为记录、访问日志、JS错误日志、API请求详情、访问性能评估，开发者必须关心的各种运营数据等。

### 一、监控内容

> 待完善

#### 1. 日活跃 PV/UV

#### 2. 用户行为记录

#### 3. 访问日志

#### 3. 错误日志

#### 4. API请求详情

#### 5. 性能评估

### 二、资源采集方式

> 待完善

#### 1. Web 端性能采集

通过 `window.performance` 来获取 `Performance` 对象实现对浏览器内部性能统计对象的访问。

```js
window.performance
// Performance {
//   timeOrigin: 1611749316627.347, 
//   onresourcetimingbufferfull: null, 
//   eventCounts: EventCounts, 
//   timing: PerformanceTiming, 
//   navigation: PerformanceNavigation, 
//   ...
// }
```

1）使用 PerformanceTiming 对象评估页面各阶段响应时间

表格描述了从用户开始路由到这个页面，到这个页面完全加载完成，总过经历的所有过程，根据图片，我们可以划分出各个有意义的考察性能的时间节点：

| 时间段                                        | 描述                                                                                                                                                                                                            |
|-----------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `navigationStart` ~ `unloadEventEnd`          | 上一页面的卸载耗时                                                                                                                                                                                              |
| `fetchStart` ~ `domainLookupStart`            | 查询 app DNS 缓存耗时                                                                                                                                                                                           |
| `domainLookupStart` ~ `domainLookupEnd`       | dns 查询耗时                                                                                                                                                                                                    |
| `connectStart` ~ `connectEnd`                 | TCP 连接耗时                                                                                                                                                                                                    |
| `connectEnd` ~ `secureConnectionStart`        | 针对 https 协议，在 tcp 握手后，传输真正的内容前，建立安全连接的耗时                                                                                                                                               |
| `fetchStart` ~ `responseStart`                | `TTFB`（time to first byte）, 即首包时长（从用户代理发出第一个请求开始，到页面读取到第一个字节的耗时）。在一个 web 程序中，用户代理发送的第一个 get 请求一般是 index.html，即接收到这个 html 文件的第一个字节的耗费时间 |
| `responseStart` ~ `responseEnd`               | 内容响应时长                                                                                                                                                                                                    |
| `domLoading` ~ `domInteractive`               | dom 解析完成，即 `DOM` 树构建完成的时长                                                                                                                                                                          |
| `domContentLoadedEventEnd` ~ `loadEventStart` | 渲染时长，`domContentLoaded` 表示 `DOM`，`CSSOM` 均准备就绪（`CSSOM` 就绪意味着没有样式表阻止 js 脚本执行），开始构建渲染树                                                                                          |
| `navigationStart` ~ `domLoading`              | `FPT`（first paint time）, 即首次渲染时间，或白屏时间，从用户打开页面开始，到第一次渲染出可见元素为止                                                                                                                |
| `navigationStart` ~ `domInteractive`          | `TTI`（time to interact），首次可交互时间                                                                                                                                                                          |
| `fetchStart` ~ `domContentLoadedEventEnd`     | `html` 加载完成时间，此时 `DOM` 已经解析完成                                                                                                                                                                     |
| `navigationStart` ~ `loadEventStart`          | 页面完全加载完成的时间                                                                                                                                                                                          |

2）使用 lighthouse 校本化运行性能测试并生成评估报告

lighthouse 可以分析 Web 应用程序和网页，收集有关开发人员最佳实践的现代性能指标和见解。

在浏览器端，可以直接从浏览器 Devtools 打开 lighthouse 标签页运行页面测试，也可以命令行 npm 安装 lighthouse 使用 cli 脚本配置化运行测试脚本然后生成规定格式的统计报告。

#### 2. Node.js 服务端性能采集

使用 perf_hooks 可以访问 Node 应用性能事件节点。

加入性能时间轴的第一类PerformanceEntry条目叫作性能重要事件节点(Performance Milestones)，类型是节点。这种特殊类型的条目记录了Node.js进程启动过程中重要事件发生的时间点。要读取这个特殊类型的条目有几种方法，但最快的是用perf_hooks.performance.nodeTime属性。

> perf_hooks.performance.nodeTiming

```javascript
PerformanceNodeTiming {
  duration: 4512.380027,
  startTime: 158745518.63114,
  entryType: 'node',
  name: 'node',
  arguments: 158745518.756349,
  initialize: 158745519.09161,
  inspectorStart: 158745522.408488,
  loopStart: 158745613.442409,
  loopExit: 0,
  loopFrame: 158749857.025862,
  bootstrapComplete: 158745613.439273,
  third_party_main_start: 0,
  third_party_main_end: 0,
  cluster_setup_start: 0,
  cluster_setup_end: 0,
  module_load_start: 158745583.850295,
  module_load_end: 158745583.851643,
  preload_modules_load_start: 158745583.852331,
  preload_modules_load_end: 158745583.879369 }
```

目前这种类型条目支持的属性包括这些：

- 时长`duration`：处于活动状态下的进程持续时间，单位是毫秒。
- 参数`arguments`：命令行参数处理结束的时间点。
- 初始化`initialize`：Node.js平台完成初始化的时间点。
- 检查工具开始`inspectorStart`：Node.js检查工具启动完成的时间点。
- 循环开始`loopStart`：Node.js事件循环开始的时间点。
- 循环退出`loopExit`：Node.js事件循环退出的时间点。
- 循环帧`loopFrame`：Node.js事件循环中当前一轮循环开始的时间点。
- 引导程序完成`bootstrapComplete`：Node.js引导程序完成的时间点。
- 第三方主启动`third_party_main_start`：第三方主模块处理过程启动的时间点。
- 第三方主完结`third_party_main_end` : 第三方主模块处理过程完成的时间点。
- 进程簇设置开始`cluster_setup_start` : 进程簇中子进程设置开始的时间。
- 进程簇设置结束`cluster_setup_end`：进程簇中子进程设置结束的时间点。
- 模块载入开始`module_load_start` : 本模块载入开始的时间点。
- 模块载入结束`module_load_end` : 本模块载入结束的时间点。
- 预载入模块的载入开始`preload_modules_load_start`：预载入模块载入开始的时间点。
- 预载入模块的载入结束`preload_modules_load_end`：预载入模块载入结束的时间点。

#### 3. Web 端错误捕获

#### 4. Node.js 端错误捕获

### 三、资源上报方式

> 待完善

#### 1. Web 端

#### 2. Node.js 端

### 四、可视化监控平台

> 待完善

#### 1. 数据可视化展示

#### 2. 监控数据实时传输方式

## ➣ Redux 和 Mobx 状态管理库

### 一、状态管理库出现的原因

当我们使用 React 开发 web 应用程序时，在 React 组件内，可以使用 `this.setState()` 和 `this.state` 处理或访问组件内状态，但是随着项目变大，状态变复杂，通常需要考虑组件间通信问题。

主要包括以下两点：

1. 某一个状态需要在多个组件间共享（访问，更新）；
2. 某组件内交互需要触发其他组件的状态更新；

关于这些问题，React 组件开发实践推荐将公用组件状态提升，通常多组件需要处理同一状态，我们推荐将共享状态提升至他们的共同最近祖先组件内。

当项目越发复杂时，我们发现仅仅是提升状态已经无法适应如此复杂的状态管理了，程序状态变得比较难同步，操作，到处是回调，发布，订阅，这意味着我们需要更好的状态管理方式，于是就引入了状态管理库，如：Redux，Mobx 等。

### 二、状态管理库的特点

状态管理库，无论是 Redux，还是 Mobx 这些，其本质都是为了解决状态管理混乱，无法有效同步的问题，它们都支持：

- 统一维护管理应用状态；
- 某一状态只有一个可信数据来源（通常命名为 store，指状态容器）；
- 操作更新状态方式统一，并且可控（通常以 action 方式提供更新状态的途径）；
- 支持将 store 与 React 组件连接，如 `react-redux`，`mobx-react`；

通常使用状态管理库后，我们将 React 组件从业务上划分为两类：
- 容器组件（Container Components）：负责处理具体业务和状态数据，将业务或状态处理函数传入展示型组件；
- 展示型组件（Presentation Components）：负责展示视图，视图交互回调内调用传入的处理函数；

### 三、Redux 和 Mobx

#### 1. Redux

而 Redux 更多的是遵循 Flux 模式的一种实现，是一个 JavaScript 库，它关注点主要是以下几方面：

- __Action__：一个 JavaScript 对象，描述动作相关信息，主要包含 type 属性和 payload 属性：
    - type：action 类型；
    - payload：负载数据；
- __Reducer__：定义应用状态如何响应不同动作（action），如何更新状态；
- __Store__：管理 action 和 reducer 及其关系的对象，主要提供以下功能：
    - 维护应用状态并支持访问状态（getState()）；
    - 支持监听 action 的分发，更新状态（dispatch(action)）；
    - 支持订阅 store 的变更（subscribe(listener)）；
- __异步流__：由于 Redux 所有对 store 状态的变更，都应该通过 action 触发，异步任务（通常都是业务或获取数据任务）也不例外，而为了不将业务或数据相关的任务混入 React 组件中，就需要使用其他框架配合管理异步任务流程，如 `redux-thunk`，`redux-saga` 等；

#### 2. Mobx

Mobx 是一个透明函数响应式编程（Transparently Functional Reactive Programming，TFRP）的状态管理库，它使得状态管理简单可伸缩：

- __Action__：定义改变状态的动作函数，包括如何变更状态；

- __Store__：集中管理模块状态（State）和动作（action）；

- __Derivation__（衍生）：从应用状态中派生而出，且没有任何其他影响的数据，我们称为 derivation（衍生），衍生在以下情况下存在：
    - 用户界面；
    - 衍生数据，衍生主要有两种：
        - Computed Values（计算值）：计算值总是可以使用纯函数（pure function）从当前可观察状态中获取；
        - Reactions（反应）：反应指状态变更时需要自动发生的副作用，这种情况下，我们需要实现其读写操作；

#### 3. 区别和应用场景

1）store 的组织

store 是应用管理数据的地方，在 Redux 应用中，我们总是将所有共享的应用数据集中在一个大的 store 中。

Mobx 则通常按功能模块将应用状态划分为多个领域 store，在多个独立的 store 中管理，并且多个领域 store 也可以通过一定的方式组织起来。

2）设计思想

Redux 更多的是遵循函数式编程（Functional Programming, FP）思想，需要手动追踪所有状态对象的变更。其中 Reducer 是一个纯函数，接受输入，然后输出结果，除此之外不会有任何影响，也包括不会影响接收的参数，对于相同的输入总是输出相同的结果。

Mobx 则更多从面向对象角度考虑问题，状态都是响应式的，我们直接更改状态对象，然后衍生的 computed value 和 reactions 会自动被触发执行。状态对象的依赖收集和触发更新都是框架内部自动处理的。

3）连接 React 应用

- react-redux
    - Provider：负责将 Store 注入 React 应用；
    - connect：负责将 store state 注入容器组件，并选择特定状态作为容器组件 props 传递；

- mobx-react
    - Provider：使用 mobx-react 提供的 Provider 将所有 stores 注入应用；
    - 使用 inject 将特定 store 注入某组件，store 可以传递状态或 action，然后使用 observer 保证组件能响应 store 中的可观察对象（observable）变更，即 store 更新，组件视图响应式更新。

4）其它

- Redux 模板代码较多，相对的 Mobx 可以使用注解的方式引入，模板代码较少，并且设计理念相对简单，学习成本小；
- Redux 函数式编程，Mobx 面向对象编程；
- Redux 提供编写规范和一些模板代码，相对规范程度更高。Mobx 编写灵活自由，比较适用于中小型项目，如果是针对大型应用需要特别注意 Store 编写的可扩展性和可维护性。
- 如果使用 Redux，我们需要另外添加 redux-thunk 或 redux-saga 以支持异步 action，这就需要另外添加配置并编写模板代码。而 Mobx 无须额外配置，我们对状态对象的更改逻辑可以位于同步和异步代码中。