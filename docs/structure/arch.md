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

流程图：

![](https://nojsja.gitee.io/static-resources/images/webpack/webpack-process.png)

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

![](https://nojsja.gitee.io/static-resources/images/webpack/webpack-loader.png)