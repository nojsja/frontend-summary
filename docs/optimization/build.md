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
- ModuleConcatenationPlugin：作用域提升 (scope hosting)，预编译功能，提升或者预编译所有模块到一个闭包中，提升代码在浏览器中的执行速度。
- NoEmitOnErrorsPlugin：在输出阶段时，遇到编译错误跳过。
- OccurrenceOrderPlugin：通过模块调用次数给模块分配 ids，常用的 ids 就会分配更短的 id，使 ids 可预测，减小文件大小。
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

#### 1. sourcemap 的作用

sourcemap 其实就是一个映射文件，里面储存着位置信息。转换后的代码的每一个位置，所对应的转换前的位置。
有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码。

sourcemap 技术底层可以参考：[阮一峰博客 - SourceMap](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html)。

#### 2. webpack 中 sourcemap 的常见配置项

- eval：生成代码，每个模块都被 eval 执行，并且存在 @sourceURL
- cheap-eval-source-map：转换代码（行内），每个模块被 eval 执行，并且 sourcemap 作为 eval 的一个 dataurl。
- cheap-module-eval-source-map：原始代码（只有行内），同样道理，但是更高的质量和更低的性能。
- eval-source-map：原始代码，同样道理，但是最高的质量和最低的性能
- cheap-source-map：转换代码（行内），生成的 sourcemap 没有列映射，从 loaders 生成的 sourcemap 没有被使用。
- cheap-module-source-map：原始代码（只有行内），与上面一样除了每行特点的从 loader 中进行映射。
- source-map： 原始代码，最好的 sourcemap 质量有完整的结果，但是会很慢。

看似配置项很多， 其实只是五个关键字 eval，source-map，cheap，module，inline 的任意组合。这五个关键字每一项都代表一个特性， 这四种特性可以任意组合。它们分别代表以下五种特性：

- eval：使用 eval 包裹模块代码。
- source-map：产生 .map 文件。
- cheap：不包含列信息（关于列信息的解释下面会有详细介绍)，也不包含 loader 的 sourcemap。
- module：包含 loader 的 sourcemap（比如 jsx to js ，babel 的 sourcemap）
- inline：将 .map 作为 DataURI 嵌入，不单独生成 .map 文件。

eval 和 source-map 都是 webpack 中 devtool 的配置选项， eval 模式是使用 `eval` 将 webpack 中每个模块包裹，然后在模块末尾添加模块来源 `//# souceURL`， 依靠 souceURL 找到原始代码的位置。包含 eval 关键字的配置项并不单独产生 .map 文件（eval 模式有点特殊， 它和其他模式不一样的地方是它依靠 sourceURL 来定位原始代码， 而其他所有选项都使用 .map 文件的方式来定位）。

包含 source-map 关键字的配置项都会产生一个. map 文件，该文件保存有原始代码与运行代码的映射关系，浏览器可以通过它找到原始代码的位置。（注：包含 inline 关键字的配置项也会产生 .map 文件，但是这个 map 文件是经过 base64 编码作为 DataURI 嵌入），举个栗子：eval-source-map 是 eval 和 source-map 的组合，可知使用 eval 语句包括模块，也产生了 .map 文件。

webpack 将 .map 文件作为 DataURI 替换 eval 模式中末尾的 `//# souceURL`。eval 和 .map 文件都是 sourcemap 实现的不同方式，虽然大部分 sourcemap 的实现是通过产生 .map 文件。

#### 3. 总结

eval 性能最好，source-map 性能最低，但就我自身的实践来看大多用的是最完整的 source-map，该模式对于不管是 js 还是 css，scss 等都能很好的覆盖， 相反其他模式都不完整，开发环境下重构性能似乎比不上功能的完善。需要补充的是 module 关键字， 当加上 module 关键字 webpack 将会添加 loader 的 sourcemap。

### > webpack：提高模块查找效率

&nbsp;&nbsp;&nbsp;&nbsp; 当我们启动 webpack 时，它会从配置的入口文件开始解析，遇到导入的模块再进行递归解析该模块直到项目中所有的模块都被解析完成。在遇到导入语句时 webpack 会做两件事情：
- 根据导入语句去寻找对应的要导入的文件。例如 `require('react')` 最终被解析到对应的文件 `./node_modules/react/index.js`，`require('./util')` 则被解析到 `./util.js`。
- 根据找到的要导入文件的后缀，使用配置文件中声明的针对特定文件类型的 `loader` 去处理文件，将其也打包成模块。例如 `.jsx` 文件会使用 babel-loader 进行处理。

根据以上过程，我们可以从 ` 模块文件的查找 ` 这一方面入手来着手进行优化：

#### 1. 提高 loader 的匹配精确度

&nbsp;&nbsp;&nbsp;&nbsp; 由于 Loader 对文件的转换操作很耗时，需要让尽可能少的文件被 Loader 处理。在使用 Loader 时可以通过 `test` 、`include`、`exclude` 三个配置项来命中 Loader 要应用规则的文件。为了尽可能少的让文件被 Loader 处理，可以通过 include 去命中只有哪些文件需要被处理。
以采用 ES6 的项目为例，在配置 babel-loader 时，可以这样：
- 通过 loader 的 `test` 正则规则正确匹配需要被处理的文件类型
- 必要情况下可以使用 `include` 参数可以精确锁定 loader 的作用范围
- 当 `include` 参数不适用时反向使用 `exclude` 文件排除法也可以达到范围限定效果
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

#### 2. 限制 `module` 模块系统查找范围

&nbsp;&nbsp;&nbsp;&nbsp; `resolve.modules` 可用于配置 webpack 去哪些目录下寻找我们通过 `npm install` 安装的第三方模块。其默认值：`['node_modules']` 表示 node 应该先去当前目录下的 `./node_modules` 目录下去搜索目标模块，如果没找到就依次去上层目录：`../node_modules, ../../node_modules` 中找，直到所有上层目录都搜索完成。

&nbsp;&nbsp;&nbsp;&nbsp; 如果我们能确定项目所需的所有模块都能从当前 `./node_modules` 下面找到，就没有必要让 node 按照默认的方式去一层层的寻找，可以指明存放第三方模块的绝对路径，以减少寻找，配置如下：
```js
module.exports = {
  resolve: {
    // 其中 __dirname 表示当前工作目录，也就是项目根目录
    modules: [path.resolve(__dirname, 'node_modules')]
  },
};
```

#### 3. 通过 `alias` 直接指定模块加载地址

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

&nbsp;&nbsp;&nbsp;&nbsp; 除此之外，我们也可以使用 `alias` 来声明项目中的已有目录，然后直接使用这些目录作为起始路径名，就能够正确解析到该目录下的文件，在一些目录层级较深的项目中比较实用：
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
const {toString} = require('../../../utils/index.js');
// 使用后
const {toString} = require('utils/index.js');
```

** 注意：** 我们通常在一些整体性比较强的库上采用此优化方法，比如 `react`，而像 `lodash` 这种库可能项目中只会用到一小部分其中的工具函数，使用 `alias` 优化后，可能造成 `tree-shaking` 去除无效代码的优化效果失效。

### > webpack：优化 `module.extensions` 配置

但我们使用 import 或 require 引入模块时，webpack 会按照搜索规则在目录层级中查找文件，查找时会按照 extensions 中的后缀进行逐个匹配尝试。比如 `require('./a')` 会尝试搜索 `./a.js`、`./a.json`、`./a.node` 等文件。

我们可以通过这些方式进行匹配优化：

- 使用频率高的后缀放在数组前面。
- 减少 extensions 中声明的后缀数量。

```json
{
    resolve: {
        extensions: ['.js', '.json']
    }
}
```

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
** 注意：** 被忽略掉的文件里不应该包含 import 、 require 、 define 等模块化语句，不然会导致构建出的代码中包含无法在浏览器环境下执行的模块化语句。

#### 2. 使用 `module.externals` 排除不需要本地编译的文件

一些外部库模块我们会采用 cdn 的方式进行加载，这样就不需要在本地编译了，使用 `externals` 来声明不需要本地编译的模块。

index.html
```html
<!-- dev -->
<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
<!-- prod -->
<script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script>
```

webpack.config.js

```js
/* dev */
module.exports = {
  mode: "development",
  externals: {
    react: "React",
  },
  ...
};

/* prod */
module.exports = {
  mode: "production",
  externals: {
    react: "React",
  },
  ...
};
```

### > webpack：使用 sideEffects + treeShaking 减少代码体积

![treeShaking](http://nojsja.gitee.io/static-resources/images/interview/treeShaking.png)

#### 1. treeShaking 配置

treeShaking 字面意思上可以理解为 `树摇`。webpack 做的事儿其实就是从入口文件开始递归地查找和解析模块，可以将入口文档当成是树的树干，然后分布在文件中的各个模块就是树的树枝和树叶。treeShaking 这个特性就是用于将一些没有与树干有关系的叶子模块去掉，即已在模块文件中定义，但是没被我们实际导入使用的模块。

使用 treeShaking，开发环境 development 下，需要启用 `optimization.usedExports`，生产环境则会被自动启用，无须手动配置。

```js
/* dev */
module.exports = {
 mode: 'development',
 optimization: {
   usedExports: true,
 }
};

/* prod */
module.exports = {
 mode: 'production',
};
```

#### 2. 更高效的 sideEffects

除了 `usedExports` 这一配置项，还要注意 `sideEffects` 副作用：

副作用可以被理解为：
>模块在被导入时会执行特殊行为的代码，而不是仅仅暴露一个或多个 export。比如一些 `polyfill` 库，它们通常影响全局作用域，修改 window 属性或修改其它原生对象，并且可能不会提供 export。

_注意：大多数模块其实都是没有副作用的，这个副作用并非是指导出的模块本身能不能被独立使用，而是指上面提到的对 js 运行环境造成的一些全局的额外的影响。_


sideEffects 和 treeShaking 的联系：

- sideEffects 和 usedExports（treeShaking）是两种不同的优化方式。sideEffects 更为有效，它允许跳过整个模块/文件和整个文件子树。

- usedExports 依赖于 terser 去检测语句中的副作用。它是一个 JavaScript 任务而且没有像 sideEffects 一样简单直接。单独使用它会造成 “树摇” 不彻底的情况，因此理解 `sideEffects` 并配合使用为最佳实践。

sideEffects 通常是外部模块 package.json 中的一个字段，它表示模块是否具有副作用，以下是两种情况的说明：

package.json

```json
{
  // 声明有副作用的子模块
  "sideEffects": [
    "**/*.css",
    "**/*.scss",
    "./esnext/index.js",
    "./esnext/configure.js"
  ],
  // 指明当前模块完全没有副作用
  "sideEffects": false,
}
```

除了依赖被导入外部模块的 package.json 文件中 `sideEffects` 属性的被动提供，我们也能在项目 `webpack.config.js` loader 配置文件中主动指明模块的副作用：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
        sideEffects: false /* or [] */
      }
    ]
  },
};
```

webpack 在编译就会去读取这个 sideEffects 字段，如果有的话，它就会将所有引用这个包的副作用代码或者自身具有副作用的业务代码给去除掉。

另一方面，当我们开发了一个公共模块发布到模块仓库中，如果 package.json 的 "sideEffects" 属性值为 `false`，则向编译器表明项目中的这些模块是 "pure(纯正 ES2015 模块)"，由此可以安全地删除文件中未使用的部分。这样别人在项目中启用 treeShaking 特性的时候，我们发布的这个模块被引入之后就能按照 treeShaking 的模式正常工作。

#### 3. 总结

为了利用 tree shaking 的优势，需要：

- 使用 ES2015 模块语法（即 import 和 export）。
- 确保没有编译器将您的 ES2015 模块语法转换为 CommonJS 的（顺带一提，这是现在常用的 @babel/preset-env 的默认行为，详细信息请参阅文档）。
- 作为模块发布者，在项目的 package.json 文件中，添加 "sideEffects" 属性。
- 使用 mode 为 "production" 的配置项以启用更多优化项，包括压缩代码与 tree shaking。

### > webpack：使用多进程打包

当引入的模块和库太多，webpack 打包速度会变的很慢，可能一个构建需要五六分钟，这时候可以考虑使用 happypack 用来加速打包。

本质上， happypack 是用通过 js 的多进程来实现打包加速，需要注意的是，创建子进程和子进程和主进程之间通信也是有开销的，当你的 loader 很慢的时候，不要盲目为了优化而优化，否则可能导致编译的更慢！

配置方式：

```javascript
// @file: webpack.config.js
const HappyPack = require('happypack');

module.exports = {
  module: {
    rules: [
      ...
      {
        test: /.js$/,
        // loaders: [ 'babel-loader?presets[]=es2015' ],
        use: 'happypack/loader',
        include: [ /* ... */ ],
        exclude: [ /* ... */ ]
      }
    ]
  },
  plugins: [
    ...
    new HappyPack({
      threads: 4, // 4 processes
      loaders: [ 'babel-loader?presets[]=es2015' ]
    })
  ]
}
```

它还支持一些高级配置，比如使用多个进程池实例、共享进程池等等，具体可以参考 [github](https://github.com/amireh/happypack) 文档。

### > webpack：使用 dll 链接库

DLLPlugin 和 DLLReferencePlugin 用某种方法实现了拆分 bundles，同时还大大提升了构建的速度。

#### DllPlugin

使用 DllPlugin 为更改不频繁的代码生成单独的编译结果。这可以提高应用程序的编译速度，尽管它增加了构建过程的复杂度。

这个插件需要我们独立创建一个 webpack 配置文件，比如 `webpack.dll.js`，它用于创建一个或多个只有 dll 的 bundle(dll-only-bundle)，这些 dll 通常在开发过程中是不会改变的(react/react-router/antd等)，因此单独把他们抽离出来，防止多次重复构建他们。 这个插件会生成一个名为 manifest.json 的文件，DLLReferencePlugin 会读取这个文件，当我们 import 的模块时 webpack 会根据模块映射从之前抽离的 dll bundle 中读取。

#### DLLReferencePlugin

这个插件是在 webpack 主配置文件中设置的， 这个插件把只有 dll 的 bundle(们)(dll-only-bundle(s)) 引用到需要的预编译的依赖。

它的一些配置项：

- context: (绝对路径) manifest (或者是内容属性)中请求的上下文
- manifest: 包含 content 和 name 的对象，或者在编译时(compilation)的一个用于加载的 JSON manifest 绝对路径
- content (optional): 请求到模块 id 的映射 (默认值为 manifest.content)
- name (optional): dll 暴露的地方的名称 (默认值为 manifest.name) (可参考 externals)
- scope (optional): dll 中内容的前缀
- sourceType (optional): dll 是如何暴露的 (详见[libraryTarget](https://www.webpackjs.com/configuration/output/#output-librarytarget))

#### 配置示例

在实际项目中，我们需要先使用 `webpack.dll.js` 生成 dll bundles，然后使用 `webpack.config.js` 启动开发环境或生产环境。

```javascript
/* webpack.dll.js */
module.exports = {
  ...
  plugins: [
    ...
    new webpack.DllPlugin({
      context: __dirname,
      name: "[name]_[hash]",
      path: path.join(__dirname, "manifest.json"),
    })
  ]
}

/* webpack.config.js */
module.exports = {
  ...
  plugins: [
    ...
    new webpack.DllReferencePlugin({
  context: __dirname,
  manifest: require("./manifest.json"),
  name: "./my-dll.js",
  scope: "xyz",
  sourceType: "commonjs2"
})
  ]
}
```

### > webpack：代码分离

代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，会极大影响加载时间。

常用的代码分离方法有三种：

- 入口起点：使用多个 entry 配置手动地分离代码(不推荐)。
- 防止重复：使用 Entry dependencies 或者 SplitChunksPlugin 去重和分离 chunk。
- 动态导入：通过模块的内联函数调用来分离代码。

#### 1. 入口起点

webpack.config.js

```js
 const path = require('path');

 module.exports = {
  entry: './src/index.js',
  mode: 'development',
  entry: { // 配置多个 entry 入口
    index: './src/index.js',
    another: './src/another-module.js',
  },
   output: {
    filename: 'main.js',
    filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
   },
 };
```

最终打包结果，`another-module` 被分割成为了一个独立的模块：

```bash
...
[webpack-cli] Compilation finished
asset index.bundle.js 553 KiB [emitted] (name: index)
asset another.bundle.js 553 KiB [emitted] (name: another)
runtime modules 2.49 KiB 12 modules
cacheable modules 530 KiB
  ./src/index.js 257 bytes [built] [code generated]
  ./src/another-module.js 84 bytes [built] [code generated]
  ./node_modules/lodash/lodash.js 530 KiB [built] [code generated]
webpack 5.4.0 compiled successfully in 245 ms
```

这种方式存在一些隐患：

- 如果入口 chunk 之间包含一些重复的模块，那些重复模块都会被引入到各个 bundle 中。
- 这种方法不够灵活，并且不能动态地将核心应用程序逻辑中的代码拆分出来。

#### 2. 防止重复

##### （1）方式一：设置入口依赖

根据方法1提到的隐患，设置 `dependOn: 'shared-modules' 可以解决多入口模块重复打包代码的问题。

webpack.config.js

```js
 const path = require('path');

 module.exports = {
  entry: './src/index.js',
  mode: 'development',
  entry: { // 配置多个 entry 入口
    index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    another: {
      import: './src/another-module.js',
      dependOn: 'shared',
    },
     shared: 'lodash',
  },
  output: {
    filename: 'main.js',
    filename: '[name].bundle.js',
     path: path.resolve(__dirname, 'dist'),
  },
   optimization: {
    // 多入口打包需要设置
    runtimeChunk: 'single',
  },
 };
```

打包后会生成：

- shared.bundle.js
- index.bundle.js
- another.bundle.js
- runtime.bundle.js

尽管可以在 webpack 中允许每个页面使用多入口，应尽可能避免使用多入口的入口：entry: { page: ['./analytics', './app'] }。如此，在使用 async 脚本标签时，会有更好的优化以及一致的执行顺序。

##### （2）方式二：splitChunks 分离公共依赖模块

> 4.0 之前的老版本使用 commonTrunksPlugin 来达到类似效果

项目中的模块一般分为：

- __外部库__：react, react-dom, lodash, axios 等，他们通常位于 `node_modules` 目录中。这些库是项目中占用打包 size 最多的部分。拆分他们防止 webpack 直接将其打入一个 bundle，利用浏览器加载时的 http 并行下载能力，提高单个 bundle 的加载速度，加快整体页面的生成。
- __项目成员编写的公共部分代码__：通常我们会在项目中编写一些全局使用的公共方法、函数或组件等，将他们提取出来，和我们的业务代码分离。
- __项目成员编写的业务代码__：业务代码是驱动业务系统的一些逻辑代码，通常这些代码不具有可复用性或复用性较低。

使用 splitChunks 配置可以将公共的可复用模块提取到一个或多个 chunk 文件中。

默认情况下，它只会影响到按需加载的 chunks，因为修改 initial chunks 会影响到项目的 HTML 文件中的脚本标签。

webpack 将根据以下条件自动拆分 chunks：

- 新的 chunk 可以被共享，或者模块来自于 node_modules 文件夹
- 新的 chunk 体积大于 20kb（在进行 min+gz 之前的体积）
- 当按需加载 chunks 时，并行请求的最大数量小于或等于 30
- 当加载初始化页面时，并发请求的最大数量小于或等于 30
- 当尝试满足最后两个条件时，最好使用较大的 chunks。

以下是其对应的内置默认配置：

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
```

主要配置说明，可以根据：

#### 3. 动态导入

### > webpack：理解模块联邦

> 完善中

### > webpack：善用打包分析工具

> 完善中