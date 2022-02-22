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

### 微前端

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

## ➣ 微前端架构

### 基座应用

> 待完善

### 子应用

> 待完善

### 隔离机制

隔离机制是微前端架构中的一个关键部分，因为多应用渲染场景下需要避免子应用和主应用、子应用之间的相互影响，主要分为 JS 代码和 CSS样式之间的隔离。

#### 1. JS 隔离

每当微应用的 JavaScript 被加载并运行时，它的核心实际上是对全局对象 Window 的修改以及一些全局事件的改变，例如 jQuery 这个 js 运行后，会在 Window 上挂载一个 window.$ 对象，对于其他库 React，Vue 也不例外。为此，需要在加载和卸载每个微应用的同时，尽可能消除这种冲突和影响，最普遍的做法是采用沙箱机制（SandBox）。

沙箱机制的核心是让局部的 JavaScript 运行时，对外部对象的访问和修改处在可控的范围内，即无论内部怎么运行，都不会影响外部的对象。通常在 Node.js 端可以采用 vm 模块，而对于浏览器端的 JS 有这些方式实现沙箱：

- iframe (not recommended)：性能低、安全低、容易造成内存泄露。
- with 关键字 (not recommended)：性能低、安全低、容易造成全局变量污染。
- Proxy 代理：低版本浏览器兼容性差，功能强大。
- window diff / recover 快照机制：兼容性好，性能较 Proxy 方式弱，可以作为 polyfill 方案。

#### 2. 样式隔离

当主应用和微应用同屏渲染时，就可能会有一些样式会相互污染，如果要彻底隔离 CSS 污染，可以采用 CSS Module 或者命名空间的方式，给每个微应用模块以特定前缀，即可保证不会互相干扰，可以采用 webpack 的 postcss 插件，在打包时添加特定的前缀。

而对于微应用与微应用之间的 CSS 隔离就非常简单，在每次应用加载时，将该应用所有的 link 和 style 内容进行标记。在应用卸载后，同步卸载页面上对应的 link 和 style 即可。


## ➣ 前端网关

常用于路由认证，用户权限验证，解决办法有自定义请求头，cookie 格式校验， 签名验证

### 一、业务网关

> 待完善

### 二、API网关

> 待完善

## ➣ Webpack 插件化架构

Webpack 基于 `tapable` 开发，Tapable 合计提供了 10 种钩子，支持同步、异步、熔断、循环、waterfall等功能特性，以此支撑起 webpack 复杂的编译功能。

webpack 的插件体系是一种基于 Tapable 实现的强耦合架构，而并不只是单纯的 `发布/订阅` 模式。它在特定时机触发钩子时会附带上足够的上下文信息，插件定义的钩子回调中，能也只能与这些上下文背后的数据结构、接口交互产生 side effect，进而影响到编译状态和后续流程。

### 一、Tapable 钩子类型

Tabable 提供如下类型的钩子(统计数据来自 webpack@5.37.0)：

|     | 简介  | 统计  |
| --- | --- | --- |
| SyncHook | 同步钩子 | Webpack 共出现 86 次，如 Compiler.hooks.compilation |
| SyncBailHook | 同步熔断钩子 | Webpack 共出现 90 次，如 Compiler.hooks.shouldEmit |
| SyncWaterfallHook | 同步瀑布流钩子 | Webpack 共出现 26 次，如 Compilation.hooks.assetPath |
| SyncLoopHook | 同步循环钩子 | Webpack 中未使用 |
| AsyncParallelHook | 异步并行钩子 | Webpack 仅出现 6 次：Compiler.hooks.make |
| AsyncParallelBailHook | 异步并行熔断钩子 | Webpack 中未使用 |
| AsyncSeriesHook | 异步串行钩子 | Webpack 共出现 32 次，如 Compiler.hooks.done |
| AsyncSeriesBailHook | 异步串行熔断钩子 | Webpack 共出现 9 次，如 Compilation.hooks.optimizeChunkModules |
| AsyncSeriesLoopHook | 异步串行循环钩子 | Webpack 中未使用 |
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