---
lang: zh-CN
title: ● 考点梳理
description: structure 的描述
---

## ➣ 前公司 dview 项目的整体构成

dview 是一个聚合服务云平台，内部包含很多子服务：

#### 数据存储相关服务

- 对象存储服务：基于 ceph s3 的对象存储服务，支持桶管理和桶内数据管理。
- 文件系统服务：文件系统的创建、挂载、卸载。
- 卷管理服务：也就是硬盘或者分区的管理，支持卷的快照、克隆、拷贝、删除等。
- 数据湖：基于对象存储，相比于对象存储，提升了架构扩展性：以集群服务节点为基本单位，可添加和移除多个集群的服务节点，每个节点内的对象存储桶作为基础存储单元，并辅以数据搜索引擎支持。提供桶内对象版本管理、桶对象查看、桶详情设置、桶对象元数据扩展这些功能。
- 存储池：基于卷存储，一个存储池以集群服务节点为基本单位，各个节点的卷作为基本存储单元，支持存储池扩容和所容和多种数据校验策略，各节点间会进行数据自动同步。

#### 用户相关服务

基于 keycloak 的用户认证和管理服务，有多租户的概念。

#### 网络设置相关服务

网络部分分为：内网、数据同步网、外部网络。内网就是内部接口些用的网，web 访问也是这个；数据同步就是我们的集群节点之间互相同步数据用的；外部网络，就是业务网，上面说的高可用 IP 就是这个网，NAS 对象存储 SAN 都可以配置。

- 节点管理服务：节点 ip、网卡设置。
- 高可用服务：保证集群节点在宕机后仍然能提供正常的服务，集群会进行 ip 漂移。

#### 监控相关服务

- 节点管理服务：查看节点资源占用和基本设置等。
- 运维服务：支持节点重启、关机、服务状态、服务重启等。
- 日志服务：分为操作日志、审计日志、运行日志等。

## ➣ 前公司 dview 项目的前端部分架构

重构之前

前端外层 nginx 负责客户端的访问控制，同时 nginx 作为 node 访问后端服务时的 router。

#### 前端

web static -> nginx -> node proxy -> cluster nodes

web static -> nginx -> node proxy -> cluster nodes

#### 后端

云平台

## ➣ 前公司 dview 项目采用 node.js 作为底层架构的理论依据

nodejs 作为前端的静态资源的托管和网关、规范 API，还有就是前端在对象存储和数据湖也是充当了网关的功能，前端访问 nodejs 再访问对象存储。

mock 数据、请求日志、跨域通过 ip 直接调用。

## ➣ 前端网关的应用

路由认证，用户权限验证，解决办法有自定义请求头，cookie 格式校验， 签名验证

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

## ➣ ts 自己的看法，和应用

## ➣ webpack loader 和 plugin 区别
1. loader，它是一个转换器，将 A 文件进行编译成 B 文件，比如：将 A.less 转换为 A.css，单纯的文件转换过程。
2. plugin 是一个扩展器，它丰富了 webpack 本身，针对是 loader 结束后，webpack 打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听 webpack 打包过程中的某些节点，执行广泛的任务

## ➣ 前端组件设计原则