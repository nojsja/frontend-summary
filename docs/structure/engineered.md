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

在开发过程中，Snowpack 为你的项目提供了免打包式 (unbundled development) 的服务。每个文件只需构建一次就被永远缓存起来。当文件发生变化时，Snowpack 重新构建发生变化的文件然后在浏览器中直接更新，而没有在重新打包上浪费时间(通过模块热替换(HMR) 实现)。

Snowpack 的免打包式工具仍支持你在生产中所习惯的打包式构建。当你为生产环境构建项目时，你可以通过 Webpack 或 Rollup（即将推出）的官方 Snowpack 插件插入你喜欢的打包器。由于 Snowpack 已经处理了构建，所以不需要复杂的打包器配置。

Snowpack 为你带来了两全其美的效果: 快速、免打包式的开发，以及打包式生产构建中的优化性能。