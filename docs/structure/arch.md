---
lang: zh-CN
title: ● 架构
description: structure 的描述
---

## ➣ 微前端概念

### 传统 SPA 项目

传统前端 SPA 应用中，各个子功能模块 (子应用) 在同一个代码仓库中进行开发迭代，每次迭代开发新功能时，从主代码分支中拉出一个 feature 特性分支，开发完成交付测试人员对功能验收完成后，再将特性分支合并到稳定的主分支代码中。

项目构建方面，由于没有做到子应用分离，因此每次都需要构建所有子应用和公用模块，大型项目会余的构建会越来越缓慢。在合并分支时也会浪费更多人力处理应用模块之间的冲突问题，比如样式文件的相互覆盖影响、公共模块等都成了棘手的问题。

技术栈方面，由于各个子应用和模块需要在一起构建生成最终项目的运行文件，因此技术栈无法隔离，比如一个 react 项目无法使用 vue 来开发一个子模块。限制了团队成员之间的协作灵活度，对技术人员的技术方向匹配度要求较高。

传统 SPA 架构适用于一些小型单体项目，这个场景模式下也具有构建流程简单、上手快速等优点。

### 微前端概念

微前端是应对大型项目现在主流的一种开发方式，它在应用级别进行解耦，子应用之间可以采用不同的技术栈、独立的构建和发布。

整个应用划分成了业务子应用、公共模块和基座应用，子应用在基座应用中注册后，可以做到在用户操作界面时，子模块按需从远程下载到本地执行并在隔离的界面容器中渲染。子应用理论上可以进行无限的横向扩展，并且基座模式下子应用之间具有天然的样式隔离和 JS 隔离特性，因此处理冲突的情况比传统 SPA 应用少了很多。

微前端架构的推进极大提高了应用的可维护性、扩展性以及团队的协作性

#### 1. 优点

- 技术栈无关：主框架不限制接入应用的技术栈，微应用具备完全自主权。
- 独立开发、独立部署：微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新。
- 团队自治：以功能划分团队，然后以团队为单位进行开发协作，减少了多个团队沟通成本。
- 增量升级：在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略。
- 独立运行时：每个微应用之间状态隔离，运行时状态不共享。

#### 2. 缺点

- 一个很简单的需求可能就需要同时发布多个应用，应用发布流程比较繁琐，所以很耗时间。
- 各应用之前切换时缓存的状态无法保留（keepAlive的页面失效）
- 一些公共组件和方法的在多个应用中复用较为麻烦，经常需要在各个应用中单独开发，这样使得维护成本升高，不过可以采用 webpack5.0 模块联邦辅助进行公共模块管理。
- 代码库的数量增加，管理维护成本增加，每一个微应用，可能都是一个单独的仓库。代码库之间的规范制定和落实都需要更加精确的控制。

#### 3. 一些实现方式

- 路由分发式：通过 HTTP 服务器的反向代理功能，来将请求路由到对应的应用上，多应用不可同时渲染，且强依赖于后端路由系统。
- 前端微服务化：在不同的框架之上设计通讯、加载机制，以在一个页面内加载对应的应用，应用之间都是独立开发、构建、部署的，多应用可以同时渲染在同一个界面。
- 微应用：通过软件工程的方式，在部署构建环境中，组合多个独立应用成一个单体应用。
- 微件化：开发一个新的构建系统，将部分业务功能构建成一个独立的 chunk 代码，使用时只需要远程加载即可。微前端也借用了微件化思想，子应用构建成独立的代码，其他应用可以按需从远程加载渲染。而传统的非 SPA 应用中微件化也比较容易，从远程加载来对应的 JavaScript 代码，在浏览器上执行，生成对应的组件嵌入到页面的相应部分。
- 前端容器化：通过将 iFrame 作为容器，来容纳其它前端应用，应用之间采用内部嵌套机制，拥有天然的隔离机制，各个应用也都是独立运行的，不过 iframe 有诸多缺点比如：性能差、有内存泄漏风险、不利于SEO、通信方式繁琐等。
- 应用组件化：借助于 Web Components 技术，允许开发者创建可重用的定制元素来构建跨框架的前端应用，不过目前浏览器兼容度不高。

## ➣ 微前端架构

微前端主要分为基座模式（管理式）、自组织式两种：

- 基座模式通过一个主应用，来管理其它应用。设计难度小，方便实践，但是通用度低。
- 自组织式应用之间是平等的，不存在相互管理的模式。设计难度大，不方便实施，但是通用度高。

这里主要探讨基座模式的架构设计，基座模式在前端框架中的方案也比较多，比如乾坤和 single-spa 等都是基于基座模式实现的。

而不论哪种方式,都需要提供一个查找应用的机制，在微前端中称为服务的注册表模式。和微服务架构相似，不论是哪种微前端方式，也都需要有一个应用注册表的服务，它可以是一个固定值的配置文件，如 JSON 文件，又或者是一个可动态更新的配置，又或者是一种动态的服务。它主要做这么一些内容：

- 应用发现：让主应用可以寻找到其它应用。
- 应用注册：即提供新的微前端应用，向应用注册表注册的功能。
- 第三方应用注册：即让第三方应用，可以接入到系统中。
- 访问权限等相关配置。

应用在部署的时候，便可以在注册表服务中注册。如果是基于注册表来管理应用，那么使用基座模式来开发比较方便。

### 一、基座应用

基座应用中需要注册子应用信息：

```javascript
import { registerMicroApps, start } from 'qiankun';

registerMicroApps([
  {
    name: 'react app', // app name registered
    entry: '//localhost:7100',
    container: '#yourContainer',
    activeRule: '/yourActiveRule',
  },
  {
    name: 'vue app',
    entry: { scripts: ['//localhost:7100/main.js'] },
    container: '#yourContainer2',
    activeRule: '/yourActiveRule2',
  },
]);

start();
```

当微应用信息注册完之后，一旦浏览器的 url 发生变化，便会自动触发 qiankun 的匹配逻辑，所有 activeRule 规则匹配上的微应用就会被插入到指定的 container 中，同时依次调用微应用暴露出的生命周期钩子。

如果微应用不是直接跟路由关联的时候，比如如果想想在微应用中渲染微应用的时候，你也可以选择手动加载微应用的方式：

```javascript
import { loadMicroApp } from 'qiankun';

loadMicroApp({
  name: 'app',
  entry: '//localhost:7100',
  container: '#yourContainer',
});
```

#### 1. 生命周期

- beforeLoad：挂载子应用前。
- mounted：挂载子应用后。
- unmounted：卸载子应用后。

#### 2. 路由匹配渲染

可以参考 React-Router 的原理使用以下方式：

- history API + popState 事件
- url hash + hashChange 事件

另外可以使用 path-to-regexp 库辅助处理路由匹配。

### 二、子应用

微应用需要在自己的入口 js (通常就是你配置的 webpack 的 entry js) 导出 bootstrap、mount、unmount 三个生命周期钩子，以供主应用在适当的时机调用。

```javascript
/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react app bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  ReactDOM.render(<App />, props.container ? props.container.querySelector('#root') : document.getElementById('root'));
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  ReactDOM.unmountComponentAtNode(
    props.container ? props.container.querySelector('#root') : document.getElementById('root'),
  );
}

/**
 * 可选生命周期钩子，仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log('update props', props);
}
```

#### 1. 生命周期

- bootstrap：首次应用加载触发，常用于配置子应用全局信息。
- mount：应用挂载时触发，常用于渲染子应用。
- unmount：应用卸载时触发，常用于销毁子应用。

### 三、隔离机制

隔离机制是微前端架构中的一个关键部分，因为多应用渲染场景下需要避免子应用和主应用、子应用之间的相互影响，主要分为 JS 代码和 CSS样式之间的隔离。

#### 1. JS 隔离

每当微应用的 JavaScript 被加载并运行时，它的核心实际上是对全局对象 Window 的修改以及一些全局事件的改变，例如 jQuery 这个 js 运行后，会在 Window 上挂载一个 window.$ 对象，对于其他库 React，Vue 也不例外。为此，需要在加载和卸载每个微应用的同时，尽可能消除这种冲突和影响，最普遍的做法是采用沙箱机制（SandBox）。

沙箱机制的核心是让局部的 JavaScript 运行时，对外部对象的访问和修改处在可控的范围内，即无论内部怎么运行，都不会影响外部的对象。通常在 Node.js 端可以采用 vm 模块，而对于浏览器端的 JS 有这些方式实现沙箱：

- iframe (not recommended)：性能低、安全低、容易造成内存泄露。
- with 关键字 (not recommended)：性能低、安全低、容易造成全局变量污染。
- Proxy 代理：低版本浏览器兼容性差，功能强大。
- window diff / recover 快照机制：兼容性好，性能较 Proxy 方式弱，可以作为 polyfill 方案。

#### 2. 样式隔离

当主应用和微应用、微应用之间同屏渲染时，就可能会有一些样式会相互污染，如果要彻底隔离 CSS 污染，可以采用 CSS Module 或者命名空间的方式，给每个微应用模块以特定前缀，即可保证不会互相干扰，可以采用 webpack 的 postcss 插件，在打包时添加特定的前缀。

而对于不会同屏渲染的微应用与微应用之间的 CSS 隔离就非常简单，在每次应用加载时，将该应用所有的 link 和 style 内容进行标记。在应用卸载后，同步卸载页面上对应的 link 和 style 即可。

在乾坤框架中，当配置为 `{ strictStyleIsolation: true }` 时表示开启严格的样式隔离模式。这种模式下 qiankun 会为每个微应用的容器包裹上一个 `shadow dom` 节点，从而确保微应用的样式不会对全局造成影响，这种方式需要浏览器支持 Web Components 技术。

另外，如果配置 `{ experimentalStyleIsolation: true }` 时，qiankun 会改写子应用所添加的样式为所有样式规则增加一个特殊的选择器规则来限定其影响范围，因此改写后的代码会表达类似为如下结构：

```javascript
.app-main {
  font-size: 14px;
}

// react16 - 应用名
div[data-qiankun-react16] .app-main {
  font-size: 14px;
}
```

### 四、子应用之间的通信

微前端中微应用虽然是独立部署的，但是在基座应用模式下，当我们访问一个微前端项目页面时，页面中子应用的 Js dist 文件会被远程下载然后渲染到当前页面的一个指定元素下。微前端框架做了 js 和 css 的隔离，但是相对的，框架也能提供一些共享机制实现子应用之间的通信。这一点需要我们有所认识，SPA 应用的新型微前端机制和以前的 iframe 还是有些不同，iframe 相当于网页之间的嵌套，具有天然的脚本和样式隔离机制，iframe 之间可以通过 `window.parent.postMessage()` 和 `window.addEventListener()` 来实现通信。

这里以微前端框架乾坤为例，讲讲两种其提供的通信方式：`Actions` 和 `Shared` 方式。

#### 1. Actions

我们先介绍官方提供的应用间通信方式 - `Actions` 通信，这种通信方式比较适合业务划分清晰，应用间通信较少的微前端应用场景。

`qiankun` 内部提供了 `initGlobalState` 方法用于注册 `MicroAppStateActions` 实例用于通信，该实例有三个方法，分别是：

- `setGlobalState`：设置 `globalState` - 设置新的值时，内部将执行 `浅检查`，如果检查到 `globalState` 发生改变则触发通知，通知到所有的 `观察者` 函数。
- `onGlobalStateChange`：注册 `观察者` 函数 - 响应 `globalState` 变化，在 `globalState` 发生改变时触发该 `观察者` 函数。
- `offGlobalStateChange`：取消 `观察者` 函数 - 该实例不再响应 `globalState` 变化。

![](https://nojsja.gitee.io/static-resources/images/arch/micro-frontend-actions.png)

我们从上图可以看出，我们可以先注册 `观察者` 到观察者池中，然后通过修改 `globalState` 可以触发所有的 `观察者` 函数，从而达到组件间通信的效果。

#### 2. Shared

官方提供的 `Actions` 通信方案是通过全局状态池和观察者函数进行应用间通信，该通信方式适合大部分的场景。

`Actions` 通信方案也存在一些优缺点，优点如下：

- 使用简单；
- 官方支持性高；
- 适合通信较少的业务场景；

缺点如下：

- 子应用独立运行时，需要额外配置无 `Actions` 时的逻辑；
- 子应用需要先了解状态池的细节，再进行通信；
- 由于状态池无法跟踪，通信场景较多时，容易出现状态混乱、维护困难等问题；

如果你的应用通信场景较多，希望子应用具备完全独立运行能力，希望主应用能够更好的管理子应用，那么可以考虑 `Shared` 通信方案。

`Shared` 通信方案的原理就是，主应用基于 `redux` 维护一个状态池，通过 `shared` 实例暴露一些方法给子应用使用。同时，子应用需要单独维护一份 `shared` 实例，在独立运行时使用自身的 `shared` 实例，在嵌入主应用时使用主应用的 `shared` 实例，这样就可以保证在使用和表现上的一致性。

`Shared` 通信方案需要自行维护状态池，这样会增加项目的复杂度。好处是可以使用市面上比较成熟的状态管理工具，如 `redux`、`mobx`，可以有更好的状态管理追踪和一些工具集。

`Shared` 通信方案要求父子应用都各自维护一份属于自己的 `shared` 实例，同样会增加项目的复杂度。好处是子应用可以完全独立于父应用运行（不依赖状态池），子应用也能以最小的改动被嵌入到其他 `第三方应用` 中。

`Shared` 通信方案也可以帮助主应用更好的管控子应用。子应用只可以通过 `shared` 实例来操作状态池，可以避免子应用对状态池随意操作引发的一系列问题。主应用的 `Shared` 相对于子应用来说是一个黑箱，子应用只需要了解 `Shared` 所暴露的 `API` 而无需关心实现细节。

### 五、子应用部署

具体查看乾坤文档：[子应用部署](https://qiankun.umijs.org/zh/cookbook#%E5%A6%82%E4%BD%95%E9%83%A8%E7%BD%B2)

#### 场景 1：主应用和微应用部署到同一个服务器（同一个 IP 和端口）

如果服务器数量有限，或不能跨域等原因需要把主应用和微应用部署到一起。

通常的做法是主应用部署在一级目录，微应用部署在二/三级目录。

微应用想部署在非根目录，在微应用打包之前需要做两件事：

- 必须配置 webpack 构建时的 publicPath 为目录名称，更多信息请看 webpack 官方说明 和 vue-cli3 的官方说明

- history 路由的微应用需要设置 base ，值为目录名称，用于独立访问时使用。

部署之后注意三点：

- activeRule 不能和微应用的真实访问路径一样，否则在主应用页面刷新会直接变成微应用页面。
- 微应用的真实访问路径就是微应用的 entry，entry 可以为相对路径。
- 微应用的 entry 路径最后面的 / 不可省略，否则 publicPath 会设置错误，例如子项的访问路径是 http://localhost:8080/app1,那么 entry 就是 http://localhost:8080/app1/。

#### 场景 2：主应用和微应用部署在不同的服务器，使用 Nginx 代理访问

一般这么做是因为不允许主应用跨域访问微应用，做法就是将主应用服务器上一个特殊路径的请求全部转发到微应用的服务器上，即通过代理实现“微应用部署在主应用服务器上”的效果。

例如，主应用在 A 服务器，微应用在 B 服务器，使用路径 /app1 来区分微应用，即 A 服务器上所有 /app1 开头的请求都转发到 B 服务器上。

此时主应用的 Nginx 代理配置为：

```javascript
/app1/ {
  proxy_pass http://www.b.com/app1/;
  proxy_set_header Host $host:$server_port;
}
```

主应用注册微应用时，entry 可以为相对路径，activeRule 不可以和 entry 一样（否则主应用页面刷新就变成微应用）：

```javascript
registerMicroApps([
  {
    name: 'app1',
    entry: '/app1/', // http://localhost:8080/app1/
    container: '#container',
    activeRule: '/child-app1',
  },
]);
```

对于 webpack 构建的微应用，微应用的 webpack 打包的 publicPath 需要配置成 /app1/，否则微应用的 index.html 能正确请求，但是微应用 index.html 里面的 js/css 路径不会带上 /app1/。
```javascript
module.exports = {
  output: {
    publicPath: `/app1/`,
  },
};
```

微应用打包的 publicPath 加上 /app1/ 之后，必须部署在 /app1 目录，否则无法独立访问。

## ➣ 前端网关

常用于路由认证，用户权限验证，解决办法有自定义请求头，cookie 格式校验， 签名验证

### 一、业务网关

- 相当于一个聚合服务，面向网页端提供统一的接口访问和权限控制。

### 二、API网关

- 解耦合，API 网关有一个重要的功能，就是将用户的请求转发给后端的服务器，微服务进行重构时，只需要改 API 网关中的映射关系即可，无需修改前端代码。
- 前端代码易于维护。引入 API 网关以后，所有的前端接口都请求至 API 网关，由网关负责具体请求的服务器，而无需维护大量的 URL。
- 日志，所有的请求都是由网关处理，日志比较完善，比如接口耗时、请求方式、请求 IP、参数等。同时，还可以使用 traceId，追踪整个链路的调用，方便排查问题。
- 其他一些，比如限流和缓存等，在 API Gateway 也可以实现。

## ➣ Webpack 插件化架构

Webpack 基于 `tapable` 开发，Tapable 合计提供了 10 种钩子，支持同步、异步、熔断、循环、waterfall等功能特性，以此支撑起 webpack 复杂的编译功能。

webpack 的插件体系是一种基于 Tapable 实现的强耦合架构，而并不只是单纯的 `发布/订阅` 模式。它在特定时机触发钩子时会附带上足够的上下文信息，插件定义的钩子回调中，能也只能与这些上下文背后的数据结构、接口交互产生 side effect，进而影响到编译状态和后续流程。

### 一、Tapable 钩子类型

Tabable 提供如下类型的钩子(统计数据来自 webpack@5.37.0)：

|                          | 简介               | 统计                                                            |
|--------------------------|------------------|---------------------------------------------------------------|
| SyncHook                 | 同步钩子           | Webpack 共出现 86 次，如 Compiler.hooks.compilation              |
| SyncBailHook             | 同步熔断钩子       | Webpack 共出现 90 次，如 Compiler.hooks.shouldEmit               |
| SyncWaterfallHook        | 同步瀑布流钩子     | Webpack 共出现 26 次，如 Compilation.hooks.assetPath             |
| SyncLoopHook             | 同步循环钩子       | Webpack 中未使用                                                |
| AsyncParallelHook        | 异步并行钩子       | Webpack 仅出现 6 次：Compiler.hooks.make                         |
| AsyncParallelBailHook    | 异步并行熔断钩子   | Webpack 中未使用                                                |
| AsyncSeriesHook          | 异步串行钩子       | Webpack 共出现 32 次，如 Compiler.hooks.done                     |
| AsyncSeriesBailHook      | 异步串行熔断钩子   | Webpack 共出现 9 次，如 Compilation.hooks.optimizeChunkModules   |
| AsyncSeriesLoopHook      | 异步串行循环钩子   | Webpack 中未使用                                                |
| AsyncSeriesWaterfallHook | 异步串行瀑布流钩子 | Webpack 共出现 3 次，如 ContextModuleFactory.hooks.beforeResolve |

### 二、Webpack 插件架构

前端社区里很多有名的框架都各自有一套插件架构，例如 axios、quill、vscode、webpack、vue、rollup 等等。插件架构灵活性高，扩展性强，但是通常需要非常强的架构能力，需要至少解决三个方面的问题：

- 「接口」：需要提供一套逻辑接入方法，让开发者能够将逻辑在特定时机插入特定位置
- 「输入」：如何将上下文信息高效传导给插件
- 「输出」：插件内部通过何种方式影响整套运行体系

针对这些问题，webpack 为开发者提供了基于 tapable 钩子的插件方案：

编译过程的特定节点以钩子形式，通知插件此刻正在发生什么事情；通过 tapable 提供的回调机制，以参数方式传递上下文信息；在上下文参数对象中附带了很多存在 side effect 的交互接口，插件可以通过这些接口改变。

这一切实现都离不开 tapable，例如：

```javascript
class Compiler {
  // 在构造函数中，先初始化钩子对象
  constructor() {
    this.hooks = {
      thisCompilation: new SyncHook(["compilation", "params"]),
    };
  }

  compile() {
    // 特定时机触发特定钩子
    const compilation = new Compilation();
    this.hooks.thisCompilation.call(compilation);
  }
}
```

Compiler 类型内部定义了 thisCompilation 钩子，并在 compilation 创建完毕后发布事件消息，插件开发者就可以基于这个钩子获取到最新创建出的 compilation 对象：

```javascript
class SomePlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("SomePlugin", (compilation, params) => {
        // 上下文信息： compilation、params
    });
  }
}
```

钩子回调传递的 compilation/params 参数就是 webpack 希望传递给插件的上下文信息，也是插件能拿到的输入。不同钩子会传递不同的上下文对象，这一点在钩子被创建的时候就定下来了，比如：

```javascript
class Compiler {
    constructor() {
        this.hooks = {
            /** @type {SyncBailHook<Compilation>} */
            shouldEmit: new SyncBailHook(["compilation"]),
            /** @type {AsyncSeriesHook<Stats>} */
            done: new AsyncSeriesHook(["stats"]),
            /** @type {AsyncSeriesHook<>} */
            additionalPass: new AsyncSeriesHook([]),
            /** @type {AsyncSeriesHook<Compiler>} */
            beforeRun: new AsyncSeriesHook(["compiler"]),
            /** @type {AsyncSeriesHook<Compiler>} */
            run: new AsyncSeriesHook(["compiler"]),
            /** @type {AsyncSeriesHook<Compilation>} */
            emit: new AsyncSeriesHook(["compilation"]),
            /** @type {AsyncSeriesHook<string, Buffer>} */
            assetEmitted: new AsyncSeriesHook(["file", "content"]),
            /** @type {AsyncSeriesHook<Compilation>} */
            afterEmit: new AsyncSeriesHook(["compilation"]),
        };
    }
}
```

shouldEmit 会被传入 compilation 参数；done 会被传入 stats 参数；addtionalPass 没有参数
...

常见的参数对象有 `compilation/module/stats/compiler/file/chunks` 等，在钩子回调中可以通过改变这些对象的状态，影响 webpack 的编译逻辑。

## ➣ Webpack 编译流程

本质上,webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。

webpack 就像一条生产线，要经过一系列处理流程后才能将源文件转换成输出结果。这条生产线上的每个处理流程的职责都是单一的，多个流程之间有存在依赖关系，只有完成当前处理后才能交给下一个流程去处理。插件就像是一个插入到生产线中的一个功能，在特定的时机对生产线上的资源做处理。

webpack 通过 Tapable 来组织这条复杂的生产线。 webpack 在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条生产线中，去改变生产线的运作。 webpack 的事件流机制保证了插件的有序性，使得整个系统扩展性很好。

![](https://nojsja.gitee.io/static-resources/images/webpack/webpack-process.png)

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程 :

- 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数。
- 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译。
- 确定入口：根据配置中的 entry 找出所有的入口文件。
- 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
- 完成模块编译：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会。
- 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。

在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。

### 一、构建的核心流程

这个过程核心完成了 内容转换 + 资源合并 两种功能，实现上包含三个阶段：

- [01] 初始化阶段：
  - 初始化参数：从配置文件、 配置对象、Shell 参数中读取，与默认配置结合得出最终的参数
  - 创建编译器对象：用上一步得到的参数创建 Compiler 对象
  - 初始化编译环境：包括注入内置插件、注册各种模块工厂、初始化 RuleSet 集合、加载配置的插件等
  - 开始编译：执行 compiler 对象的 run 方法
  - 确定入口：根据配置中的 entry 找出所有的入口文件，调用 compilition.addEntry 将入口文件转换为 dependence 对象

- [02] 构建阶段：
  - 编译模块(make)：根据 entry 对应的 dependence 创建 module 对象，调用 loader 将模块转译为标准 JS 内容，调用 JS 解释器将内容转换为 AST 对象，从中找出该模块依赖的模块，再 递归 本步骤直到所有入口依赖的文件都经过了本步骤的处理
  - 完成模块编译：上一步递归处理所有能触达到的模块后，得到了每个模块被翻译后的内容以及它们之间的 依赖关系图

- [03] 生成阶段：
  - 输出资源(seal)：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
  - 写入文件系统(emitAssets)：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

单次构建过程自上而下按顺序执行，下面会展开聊聊细节，在此之前，对上述提及的各类技术名词不太熟悉的同学，可以先看看简介：

1. Entry：编译入口，webpack 编译的起点。
2. Compiler：编译管理器，webpack 启动后会创建 compiler 对象，该对象一直存活知道结束退出。
3. Compilation：单次编辑过程的管理器，比如 watch = true 时，运行过程中只有一个 compiler 但每次文件变更触发重新编译时，都会创建一个新的 compilation 对象。
4. Dependence：依赖对象，webpack 基于该类型记录模块间依赖关系。
5. Module：webpack 内部所有资源都会以“module”对象形式存在，所有关于资源的操作、转译、合并都是以 “module” 为基本单位进行的。
6. Chunk：编译完成准备输出时，webpack 会将 module 按特定的规则组织成一个一个的 chunk，这些 chunk 某种程度上跟最终输出一一对应。
7. Loader：资源内容转换器，其实就是实现从内容 A 转换 B 的转换器。
8. Plugin：webpack构建过程中，会在特定的时机广播对应的事件，插件监听这些事件，在特定时间点介入编译过程。

#### 初始化阶段

![](https://nojsja.gitee.io/static-resources/images/webpack/webpack-initial.png)

解释：

1.  将 `process.args + webpack.config.js` 合并成用户配置
2.  调用 `validateSchema` 校验配置
3.  调用 `getNormalizedWebpackOptions + applyWebpackOptionsBaseDefaults` 合并出最终配置
4.  创建 `compiler` 对象
5.  遍历用户定义的 `plugins` 集合，执行插件的 `apply` 方法
6.  调用 `new WebpackOptionsApply().process` 方法，加载各种内置插件

主要逻辑集中在 `WebpackOptionsApply` 类，webpack 内置了数百个插件，这些插件并不需要我们手动配置，`WebpackOptionsApply` 会在初始化阶段根据配置内容动态注入对应的插件，包括：

- 注入 `EntryOptionPlugin` 插件，处理 `entry` 配置
- 根据 `devtool` 值判断后续用那个插件处理 `sourcemap`，可选值：`EvalSourceMapDevToolPlugin`、`SourceMapDevToolPlugin`、`EvalDevToolModulePlugin`
- 注入 `RuntimePlugin` ，用于根据代码内容动态注入 webpack 运行时

到这里，`compiler` 实例就被创建出来了，相应的环境参数也预设好了，紧接着开始调用 `compiler.compile` 函数：

```js
// 取自 webpack/lib/compiler.js 
compile(callback) {
    const params = this.newCompilationParams();
    this.hooks.beforeCompile.callAsync(params, err => {
      // ...
      const compilation = this.newCompilation(params);
      this.hooks.make.callAsync(compilation, err => {
        // ...
        this.hooks.finishMake.callAsync(compilation, err => {
          // ...
          process.nextTick(() => {
            compilation.finish(err => {
              compilation.seal(err => {...});
            });
          });
        });
      });
    });
  }
```

Webpack 架构很灵活，但代价是牺牲了源码的直观性，比如说上面说的初始化流程，从创建 `compiler` 实例到调用 `make` 钩子，逻辑链路很长：

- 启动 webpack ，触发 `lib/webpack.js` 文件中 `createCompiler` 方法
- `createCompiler` 方法内部调用 `WebpackOptionsApply` 插件
- `WebpackOptionsApply` 定义在 `lib/WebpackOptionsApply.js` 文件，内部根据 `entry` 配置决定注入 `entry` 相关的插件，包括：`DllEntryPlugin`、`DynamicEntryPlugin`、`EntryPlugin`、`PrefetchPlugin`、`ProgressPlugin`、`ContainerPlugin`
- `Entry` 相关插件，如 `lib/EntryPlugin.js` 的 `EntryPlugin` 监听 `compiler.make` 钩子
- `lib/compiler.js` 的 `compile` 函数内调用 `this.hooks.make.callAsync`
- 触发 `EntryPlugin` 的 `make` 回调，在回调中执行 `compilation.addEntry` 函数
- `compilation.addEntry` 函数内部经过一坨与主流程无关的 `hook` 之后，再调用 `handleModuleCreate` 函数，正式开始构建内容

#### 构建阶段

构建阶段从 entry 开始递归解析资源与资源的依赖，在 compilation 对象内逐步构建出 module 集合以及 module 之间的依赖关系，核心流程：

![](https://nojsja.gitee.io/static-resources/images/webpack/webpack-build.png)

构建阶段从入口文件开始：

1. 调用 `handleModuleCreate` ，根据文件类型构建 `module` 子类
2. 调用 [loader-runner](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/loader-runner) 仓库的 `runLoaders` 转译 `module` 内容，通常是从各类资源类型转译为 JavaScript 文本
3. 调用 [acorn](https://link.zhihu.com/?target=https%3A//www.npmjs.com/package/acorn) 将 JS 文本解析为AST
4. 遍历 AST，触发各种钩子
5. 在 `HarmonyExportDependencyParserPlugin` 插件监听 `exportImportSpecifier` 钩子，解读 JS 文本对应的资源依赖
6. 调用 `module` 对象的 `addDependency` 将依赖对象加入到 `module` 依赖列表中
7. AST 遍历完毕后，调用 `module.handleParseResult` 处理模块依赖
8. 对于 `module` 新增的依赖，调用 `handleModuleCreate` ，控制流回到第一步
9. 所有依赖都解析完毕后，构建阶段结束

这个过程中数据流 `module => ast => dependences => module` ，先转 AST 再从 AST 找依赖。这就要求 `loaders` 处理完的最后结果必须是可以被 acorn 处理的标准 JavaScript 语法，比如说对于图片，需要从图像二进制转换成类似于 `export default "data:image/png;base64,xxx"` 这类 base64 格式或者 `export default "http://xxx"` 这类 url 格式。

`compilation` 按这个流程递归处理，逐步解析出每个模块的内容以及 `module` 依赖关系，后续就可以根据这些内容打包输出。

#### 生成阶段

构建阶段围绕 `module` 展开，生成阶段则围绕 `chunks` 展开。经过构建阶段之后，webpack 得到足够的模块内容与模块关系信息，接下来开始生成最终资源了。代码层面，就是开始执行 `compilation.seal` 函数：

```js
// 取自 webpack/lib/compiler.js 
compile(callback) {
    const params = this.newCompilationParams();
    this.hooks.beforeCompile.callAsync(params, err => {
      // ...
      const compilation = this.newCompilation(params);
      this.hooks.make.callAsync(compilation, err => {
        // ...
        this.hooks.finishMake.callAsync(compilation, err => {
          // ...
          process.nextTick(() => {
            compilation.finish(err => {
              **compilation.seal**(err => {...});
            });
          });
        });
      });
    });
  }
```

`seal` 原意密封、上锁，我个人理解在 webpack 语境下接近于 **“将模块装进蜜罐”** 。`seal` 函数主要完成从 `module` 到 `chunks` 的转化，核心流程：

![](https://nojsja.gitee.io/static-resources/images/webpack/webpack-output.png)

简单梳理一下：

1.  构建本次编译的 `ChunkGraph` 对象；
2.  遍历 `compilation.modules` 集合，将 `module` 按 `entry/动态引入` 的规则分配给不同的 `Chunk` 对象；
3.  `compilation.modules` 集合遍历完毕后，得到完整的 `chunks` 集合对象，调用 `createXxxAssets` 方法
4.  `createXxxAssets` 遍历 `module/chunk` ，调用 `compilation.emitAssets` 方法将资 `assets` 信息记录到 `compilation.assets` 对象中
5.  触发 `seal` 回调，控制流回到 `compiler` 对象

这一步的关键逻辑是将 `module` 按规则组织成 `chunks` ，webpack 内置的 `chunk` 封装规则比较简单：

- `entry` 及 entry 触达到的模块，组合成一个 `chunk`
- 使用动态引入语句引入的模块，各自组合成一个 `chunk`

`chunk` 是输出的基本单位，默认情况下这些 `chunks` 与最终输出的资源一一对应，那按上面的规则大致上可以推导出一个 `entry` 会对应打包出一个资源，而通过动态引入语句引入的模块，也对应会打包出相应的资源，我们来看个示例。

`seal` 结束之后，紧接着调用 `compiler.emitAssets` 函数，函数内部调用 `compiler.outputFileSystem.writeFile` 方法将 `assets` 集合写入文件系统。

### 二、plugin 的工作原理

学习插件架构，需要理解三个关键问题：

- WHAT: 什么是插件？
- WHEN: 什么时间点会有什么钩子被触发？
- HOW: 在钩子回调中，如何影响编译状态？

关于编写插件，可以查看：[官网](https://www.webpackjs.com/contribute/writing-a-plugin/)

#### 1. What: 什么是插件

从形态上看，插件通常是一个带有 `apply` 函数的类：

```js
class SomePlugin {
    apply(compiler) {
    }
}
```

`apply` 函数运行时会得到参数 `compiler` ，以此为起点可以调用 `hook` 对象注册各种钩子回调，例如： `compiler.hooks.make.tapAsync` ，这里面 `make` 是钩子名称，`tapAsync` 定义了钩子的调用方式，webpack 的插件架构基于这种模式构建而成，插件开发者可以使用这种模式在钩子回调中，插入特定代码。webpack 各种内置对象都带有 `hooks` 属性，比如 `compilation` 对象：

```js
class SomePlugin {
    apply(compiler) {
        compiler.hooks.thisCompilation.tap('SomePlugin', (compilation) => {
            compilation.hooks.optimizeChunkAssets.tapAsync('SomePlugin', ()=>{});
        })
    }
}
```

钩子的核心逻辑定义在 [Tapable](https://link.zhihu.com/?target=https%3A//github.com/webpack/tapable) 仓库，内部定义了如下类型的钩子：

```js
const {
        SyncHook,
        SyncBailHook,
        SyncWaterfallHook,
        SyncLoopHook,
        AsyncParallelHook,
        AsyncParallelBailHook,
        AsyncSeriesHook,
        AsyncSeriesBailHook,
        AsyncSeriesWaterfallHook
 } = require("tapable");
```

不同类型的钩子根据其并行度、熔断方式、同步异步，调用方式会略有不同，插件开发者需要根据这些的特性，编写不同的交互逻辑，这部分内容也特别多，回头展开聊聊。

#### 2. When: 什么时候会触发钩子

了解 webpack 插件的基本形态之后，接下来需要弄清楚一个问题：webpack 会在什么时间节点触发什么钩子？这一块我认为是知识量最大的一部分，毕竟源码里面有237个钩子，但官网只介绍了不到100个，且官网对每个钩子的说明都太简短，就我个人而言看完并没有太大收获，所以有必要展开聊一下这个话题。先看几个例子：

- `compiler.hooks.compilation` ：

  - 时机：启动编译创建出 compilation 对象后触发
  - 参数：当前编译的 compilation 对象
  - 示例：很多插件基于此事件获取 compilation 实例

- `compiler.hooks.make`：

  - 时机：正式开始编译时触发
  - 参数：同样是当前编译的 `compilation` 对象
  - 示例：webpack 内置的 `EntryPlugin` 基于此钩子实现 `entry` 模块的初始化

- `compilation.hooks.optimizeChunks` ：

  - 时机： `seal` 函数中，`chunk` 集合构建完毕后触发
  - 参数：`chunks` 集合与 `chunkGroups` 集合
  - 示例： `SplitChunksPlugin` 插件基于此钩子实现 `chunk` 拆分优化

- `compiler.hooks.done`：

  - 时机：编译完成后触发
  - 参数： `stats` 对象，包含编译过程中的各类统计信息
  - 示例： `webpack-bundle-analyzer` 插件基于此钩子实现打包分析

这是我总结的钩子的三个学习要素：触发时机、传递参数、示例代码。

#### 3. 触发时机

触发时机与 webpack 工作过程紧密相关，大体上从启动到结束，`compiler` 对象逐次触发如下钩子：

![](https://nojsja.gitee.io/static-resources/images/webpack/webpack-compiler.png)

而 `compilation` 对象逐次触发：

![](https://nojsja.gitee.io/static-resources/images/webpack/webpack-compilation.png)

所以，理解清楚前面说的 webpack 工作的主流程，基本上就可以捋清楚“什么时候会触发什么钩子”。

### 三、loader 的作用

流程图中， runLoaders 会调用用户所配置的 loader 集合读取、转译资源，此前的内容可以千奇百怪，但转译之后理论上应该输出标准 JavaScript 文本或者 AST 对象，webpack 才能继续处理模块依赖。
理解了这个基本逻辑之后，loader 的职责就比较清晰了，不外乎是将内容 A 转化为内容 B，但是在具体用法层面还挺多讲究的，有 pitch、pre、post、inline 等概念用于应对各种场景。

关于编写 loader，可以查看：[官网](https://www.webpackjs.com/contribute/writing-a-loader/)

![](https://nojsja.gitee.io/static-resources/images/webpack/webpack-loader.png)


## ➣ Webpack Plugin 和 Loader 编写

### 一、Plugin 编写

在插件开发中最重要的两个资源就是 compiler 和 compilation 对象。理解它们的角色是扩展 webpack 引擎重要的第一步，这两个组件是任何 webpack 插件不可或缺的部分（特别是 compilation）：

- compiler 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。

- compilation 对象代表了一次资源版本构建。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用。

#### 1. 基本插件架构
插件是由「具有 apply 方法的 prototype 对象」所实例化出来的。这个 apply 方法在安装插件时，会被 webpack compiler 调用一次。apply 方法可以接收一个 webpack compiler 对象的引用，从而可以在回调函数中访问到 compiler 对象。一个简单的插件结构如下：

```javascript
function HelloWorldPlugin(options) {
  // 使用 options 设置插件实例……
}

HelloWorldPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    console.log('Hello World!');
  });
};

module.exports = HelloWorldPlugin;
```

然后，要安装这个插件，只需要在你的 webpack 配置的 plugin 数组中添加一个实例：

```javascript
var HelloWorldPlugin = require('hello-world');

var webpackConfig = {
  // ... 这里是其他配置 ...
  plugins: [
    new HelloWorldPlugin({options: true})
  ]
};
```

#### 2. 访问 compilation 对象

使用 compiler 对象时，你可以绑定提供了编译 compilation 引用的回调函数，然后拿到每次新的 compilation 对象。这些 compilation 对象提供了一些钩子函数，来钩入到构建流程的很多步骤中。

```javascript
function HelloCompilationPlugin(options) {}

HelloCompilationPlugin.prototype.apply = function(compiler) {

  // 设置回调来访问 compilation 对象：
  compiler.plugin("compilation", function(compilation) {

    // 现在，设置回调来访问 compilation 中的步骤：
    compilation.plugin("optimize", function() {
      console.log("Assets are being optimized.");
    });
  });
};

module.exports = HelloCompilationPlugin;
```

关于 compiler，compilation 的可用回调，和其它重要的对象的更多信息，请查看 插件 文档。

#### 3. 异步编译插件

有一些编译插件中的步骤是异步的，这样就需要额外传入一个 callback 回调函数，并且在插件运行结束时，_必须_调用这个回调函数。

```javascript
function HelloAsyncPlugin(options) {}

HelloAsyncPlugin.prototype.apply = function(compiler) {
  compiler.plugin("emit", function(compilation, callback) {

    // 做一些异步处理……
    setTimeout(function() {
      console.log("Done with async work...");
      callback();
    }, 1000);

  });
};

module.exports = HelloAsyncPlugin;
```

#### 4. 插件的不同类型

webpack 插件可以按照它所注册的事件分成不同的类型。每一个事件钩子决定了它该如何应用插件的注册。

- 同步(synchronous) Tapable 实例应用插件时会使用：

  ```javascript
  applyPlugins(name: string, args: any...)
  applyPluginsBailResult(name: string, args: any...)

  ```
  这意味着每个插件回调，都会被特定的 args 一个接一个地调用。 这是插件的最基本形式。许多有用的事件（例如 "compile", "this-compilation"），预期插件会同步执行。

- 瀑布流(waterfall) 插件应用时会使用：

  ```javascript
  applyPluginsWaterfall(name: string, init: any, args: any...)
  ```
  这种类型，每个插件都在其他插件依次调用之后调用，前一个插件调用的返回值，作为参数传入后一个插件。这类插件必须考虑其执行顺序。 必须等前一个插件执行后，才能接收参数。第一个插件的值是初始值(init)。这个模式用在与 webpack 模板相关的 Tapable 实例中（例如 ModuleTemplate, ChunkTemplate 等）。

- 异步(asynchronous)

  ```javascript
  applyPluginsAsync(name: string, args: any..., callback: (err?: Error) -> void)
  ```
  这种类型，插件处理函数在调用时，会传入所有的参数和一个签名为 (err?: Error) -> void 的回调函数。处理函数按注册时的顺序调用。在调用完所有处理程序后，才会调用 callback。 这也是 "emit", "run" 等事件的常用模式。

- 异步瀑布流(async waterfall) 插件将以瀑布方式异步应用。

  ```javascript
  applyPluginsAsyncWaterfall(name: string, init: any, callback: (err: Error, result: any) -> void)
  ```
  这种类型，插件处理函数在调用时，会传入当前值(current value)和一个带有签名为 (err: Error, nextValue: any) -> void. 的回调函数。当调用的 nextValue 是下一个处理函数的当前值(current value)时，第一个处理程序的当前值是 init。在调用完所有处理函数之后，才会调用 callback，并将最后一个值传入。如果其中任何一个处理函数传入一个 err 值，则会调用此 callback 并将此 error 对象传入，并且不再调用其他处理函数。 这种插件模式适用于像 "before-resolve" 和 "after-resolve" 这样的事件。

- 异步串联(async series)
  ```javascript
  applyPluginsAsyncSeries(name: string, args: any..., callback: (err: Error, result: any) -> void)
  ```
  它与异步(asynchronous)相同，但如果任何插件注册失败，则不再调用其他插件。

- 并行(parallel)

  ```javascript
  applyPluginsParallel(name: string, args: any..., callback: (err?: Error) -> void)
  applyPluginsParallelBailResult(name: string, args: any..., callback: (err: Error, result: any) -> void)
  ```

### 二、Loader 编写
