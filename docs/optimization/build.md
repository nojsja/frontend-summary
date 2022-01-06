---
lang: zh-CN
title: ● 构建优化
description: optimization 的描述
---

### > webpack：区分打包环境

webpack 提供 mode 配置选项，告知 webpack 使用相应模式的内置优化。

配置文件中：

```js
module.exports = {
  mode: 'production',
  ...
};
```

webpack 对于这两种模式会分别启用一些插件:

__development 模式：__

- NamedModulesPlugin：当开启 HMR 的时候使用该插件后，被替换的模块在控制台会显示模块的相对路径和完整的文件名，而不只是看到一个文件 id。
- NamedChunksPlugin：它和 NamedModulesPlugin 作用类似。有了它，不仅模块能看到名字，chunk 也能。

如果不使用这两个插件，当添加和删除依赖时，打包输出中模块 id 会改变，因为它是根据模块顺序生成的。模块 id 的变动会导致文件哈希值的变化，即使这些文件使用的模块本身并没有改变。

使用 NamedModulesPlugin 和 NamedChunksPlugin 两个插件有利于优化浏览器的文件缓存问题。以下是使用和不使用两种情况打包输出的区别：

```javascript
/* 未使用该插件优化 */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{
  /***/ 6:
  (...) // code1.js module output code

  /***/ 7:
  (...) // code2.js module output code
]);

/* 已使用该插件优化 */
(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["utilities~main"],{
  /***/ "./path/to/code1.js":
  (...), // divide.js module output code

  /***/ "./path/to/code2.js":
  (...) // substract.js module output code
]);
```



__production 模式：__

- FlagDependencyUsagePlugin：编译时标记依赖。
- FlagIncludedChunksPlugin：标记子 chunks，防子 chunks 多次加载。
- ModuleConcatenationPlugin：作用域提升(scope hosting)，预编译功能，提升或者预编译所有模块到一个闭包中，提升代码在浏览器中的执行速度。
- NoEmitOnErrorsPlugin：在输出阶段时，遇到编译错误跳过。
- OccurrenceOrderPlugin：通过模块调用次数给模块分配ids，常用的ids就会分配更短的id，使ids可预测，减小文件大小。
- SideEffectsFlagPlugin：识别 package.json 或者 module.rules 的 sideEffects 标志（纯的 ES2015 模块)，安全地删除未用到的 export 导出。
- UglifyJsPlugin：js 代码压缩

以上是 webpack 在两个构建环境下默认启用的优化，由于 development/production 已经成为一个约定俗成的规则，很多组件和插件开发者也会使用这个参数进行组件或插件内部的优化，因此正确声明他们很重要。可以直接编写多种 webpack 配置文件应用不同的配置，比如：`webpack.dev.js` 和 `webpack.prod.js`。

### > webpack：正确设置 SourceMap

```js
module.exports = {
  devtools: 'source-map',
  ...
};
```

sourcemap 是为了解决开发代码与实际运行代码不一致时协助我们进行开发代码调试的技术。尤其是如今前端开发中大部分的代码都经过编译，打包等工程化转换。

sourcemap 其实就是一个映射文件，里面储存着位置信息。转换后的代码的每一个位置，所对应的转换前的位置。
有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。

sourcemap 技术底层可以参考：[阮一峰博客-SourceMap](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)。

webpack 中的 sourcemap 有这些常见的可选配置项：

- eval：生成代码，每个模块都被 eval 执行，并且存在 @sourceURL
- cheap-eval-source-map：转换代码（行内），每个模块被 eval 执行，并且 sourcemap 作为 eval 的一个dataurl。
- cheap-module-eval-source-map：原始代码（只有行内），同样道理，但是更高的质量和更低的性能。
- eval-source-map：原始代码，同样道理，但是最高的质量和最低的性能
- cheap-source-map：转换代码（行内），生成的 sourcemap 没有列映射，从 loaders 生成的 sourcemap 没有被使用。
- cheap-module-source-map：原始代码（只有行内），与上面一样除了每行特点的从 loader 中进行映射。
- source-map： 原始代码，最好的 sourcemap 质量有完整的结果，但是会很慢。

看似配置项很多， 其实只是五个关键字eval，source-map，cheap，module，inline的任意组合。这五个关键字每一项都代表一个特性， 这四种特性可以任意组合。它们分别代表以下五种特性：

- eval：使用 eval 包裹模块代码。
- source-map：产生 .map 文件。
- cheap：不包含列信息（关于列信息的解释下面会有详细介绍)，也不包含 loader 的 sourcemap。
- module：包含 loader 的 sourcemap（比如jsx to js ，babel的sourcemap）
- inline：将 .map 作为 DataURI 嵌入，不单独生成 .map 文件。

eval 和 source-map 都是 webpack 中 devtool 的配置选项， eval 模式是使用 `eval` 将 webpack 中每个模块包裹，然后在模块末尾添加模块来源 `//# souceURL`， 依靠 souceURL 找到原始代码的位置。包含 eval 关键字的配置项并不单独产生 .map 文件（eval 模式有点特殊， 它和其他模式不一样的地方是它依靠 sourceURL 来定位原始代码， 而其他所有选项都使用 .map 文件的方式来定位）。包含 source-map 关键字的配置项都会产生一个.map文件，该文件保存有原始代码与运行代码的映射关系，浏览器可以通过它找到原始代码的位置。（注：包含 inline 关键字的配置项也会产生 .map 文件，但是这个 map 文件是经过 base64 编码作为 DataURI 嵌入），举个栗子：eval-source-map 是 eval 和 source-map 的组合，可知使用 eval 语句包括模块，也产生了 .map 文件。webpack 将 .map 文件作为 DataURI 替换 eval 模式中末尾的`//# souceURL`。eval 和 .map 文件都是 sourcemap 实现的不同方式，虽然大部分 sourcemap 的实现是通过产生 .map 文件。

总结：eval 性能最好，source-map 性能最低，但就我自身的实践来看大多用的是最完整的 source-map，该模式对于不管是js还是 css，scss 等都能很好的覆盖， 相反其他模式都不完整，开发环境下重构性能似乎比不上功能的完善。需要补充的是module 关键字， 当加上 module 关键字 webpack 将会添加 loader 的 sourcemap。

### > webpack：提高模块查找效率

&nbsp;&nbsp;&nbsp;&nbsp; 当我们启动webpack时，它会从配置的入口文件开始解析，遇到导入的模块再进行递归解析该模块直到项目中所有的模块都被解析完成。在遇到导入语句时 webpack 会做两件事情：
- 根据导入语句去寻找对应的要导入的文件。例如 `require('react')` 最终被解析到对应的文件 `./node_modules/react/index.js`，`require('./util')` 则被解析到 `./util.js`。
- 根据找到的要导入文件的后缀，使用配置文件中声明的针对特定文件类型的 `loader` 去处理文件，将其也打包成模块。例如`.jsx`文件会使用 babel-loader 进行处理。

根据以上过程，我们可以从`模块文件的查找`这一方面入手来着手进行优化：

#### 1. 提高 loader 的匹配精确度  

&nbsp;&nbsp;&nbsp;&nbsp; 由于 Loader 对文件的转换操作很耗时，需要让尽可能少的文件被 Loader 处理。在使用 Loader 时可以通过 `test` 、`include`、`exclude` 三个配置项来命中 Loader 要应用规则的文件。为了尽可能少的让文件被 Loader 处理，可以通过 include 去命中只有哪些文件需要被处理。  
以采用 ES6 的项目为例，在配置 babel-loader 时，可以这样：
- 通过loader的`test`正则规则正确匹配需要被处理的文件类型
- 必要情况下可以使用`include`参数可以精确锁定loader的作用范围
- 当`include`参数不适用时反向使用`exclude`文件排除法也可以达到范围限定效果
```js
module.exports = {
  module: {
    rules: [
      {
        // 如果项目源码中只有 js 文件就不要写成 /\.jsx?$/，提升正则表达式性能
        test: /\.js$/,
        // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
        use: ['babel-loader?cacheDirectory'],
        // 只对项目根目录下的 src 目录中的文件采用 babel-loader
        include: path.resolve(__dirname, 'src'),
        // or 或者可以采用排除法来筛选一些不需要使用的目录
        // exclude: /(node_modules|bower_components)/,
      },
    ]
  },
};
```

#### 2. 限制`module`模块系统查找范围  

&nbsp;&nbsp;&nbsp;&nbsp; `resolve.modules` 可用于配置webpack去哪些目录下寻找我们通过`npm install`安装的第三方模块。其默认值：`['node_modules']`表示node应该先去当前目录下的 `./node_modules` 目录下去搜索目标模块，如果没找到就依次去上层目录：`../node_modules, ../../node_modules` 中找，直到所有上层目录都搜索完成。

&nbsp;&nbsp;&nbsp;&nbsp; 如果我们能确定项目所需的所有模块都能从当前`./node_modules`下面找到，就没有必要让node按照默认的方式去一层层的寻找，可以指明存放第三方模块的绝对路径，以减少寻找，配置如下：
```js
module.exports = {
  resolve: {
    // 其中 __dirname 表示当前工作目录，也就是项目根目录
    modules: [path.resolve(__dirname, 'node_modules')]
  },
};
```

#### 3. 通过`alias`直接指定模块加载地址

&nbsp;&nbsp;&nbsp;&nbsp; `resolve.alias` 配置项通过别名来把原导入路径映射成一个新的导入路径。
在实战项目中经常会依赖一些庞大的第三方模块，以 React 库为例，安装到 node_modules 目录下的 React 库的目录结构如下：
```js
├── dist
│   ├── react.js
│   └── react.min.js
├── lib
│   ...
│   ├── LinkedStateMixin.js
│   ├── createClass.js
│   └── React.js
├── package.json
└── react.js
```
可以看到发布出去的 React 库中包含两套代码：
- 一套是采用 CommonJS 规范的模块化代码，这些文件都放在 lib 目录下，以 package.json 中指定的入口文件 react.js 为模块的入口。
- 一套是把 React 所有相关的代码打包好的完整代码放到一个单独的文件中，这些代码没有采用模块化可以直接执行。其中 `dist/react.js` 是用于开发环境，里面包含检查和警告的代码。`dist/react.min.js` 是用于线上环境，被最小化了。

&nbsp;&nbsp;&nbsp;&nbsp; 默认情况下 Webpack 会从入口文件 ./node_modules/react/react.js 开始递归的解析和处理依赖的几十个文件，这会时一个耗时的操作。 通过配置 resolve.alias 可以让 Webpack 在处理 React 库时，直接使用单独完整的 react.min.js 文件，从而跳过耗时的递归解析操作。
```js
module.exports = {
  resolve: {
    alias: {
      'react': path.resolve(__dirname, './node_modules/react/dist/react.min.js'), 
    }
  },
};
```

&nbsp;&nbsp;&nbsp;&nbsp; 除此之外，我们也可以使用`alias`来声明项目中的已有目录，然后直接使用这些目录作为起始路径名，就能够正确解析到该目录下的文件，在一些目录层级较深的项目中比较实用：
```js
module.exports = {
  resolve: {
    alias: {
      utils: path.resolve(__dirname, 'app/utils'),
    }
  },
};

/* -------------- other-module.js -------------- */
// 使用前
const { toString } = require('../../../utils/index.js');
// 使用后
const { toString } = require('utils/index.js');
```

**注意：** 我们通常在一些整体性比较强的库上采用此优化方法，比如`react`，而像`lodash`这种库可能项目中只会用到一小部分其中的工具函数，使用`alias`优化后，可能造成`tree-shaking`去除无效代码的优化效果失效。

### > webpack：避免不必要的模块解析

#### 1. 使用 `module.noParse` 忽略非模块化规范文件的处理

&nbsp;&nbsp;&nbsp;&nbsp; `module.noParse` 配置项可以让 Webpack 忽略对部分没采用模块化的文件的递归解析处理，这样做的好处是能提高构建性能。 原因是一些库，例如 jQuery 、ChartJS， 它们庞大又没有采用模块化标准，让 Webpack 去解析这些文件耗时又没有意义。

在上面的 优化 resolve.alias 配置 中讲到单独完整的 react.min.js 文件就没有采用模块化，让我们来通过配置 module.noParse 忽略对 react.min.js 文件的递归解析处理， 相关 Webpack 配置如下：
```js
module.exports = {
  module: {
    noParse: [/react\.min\.js$/],
  },
};
```
**注意：** 被忽略掉的文件里不应该包含 import 、 require 、 define 等模块化语句，不然会导致构建出的代码中包含无法在浏览器环境下执行的模块化语句。

### > webpack：使用 tree shaking

> 完善中

### > webpack：使用 sideEffects

> 完善中

### > webpack：使用多线程打包

> 完善中

### > webpack：使用 dll 链接库

> 完善中

### > webpack：动态引入模块

> 完善中

### > webpack：提取公共代码

> 完善中

### > webpack：理解模块联邦

### > webpack：善用打包分析工具