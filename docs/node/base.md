---
lang: zh-CN
title: 基础知识
description: Node 的描述
---

### > Node.js的模块加载机制

分为内置模块、外部扩展模块和自定义模块

大致步骤：

![](http://nojsja.gitee.io/static-resources/images/interview/node-module.jpg)

1. 先计算模块路径

&nbsp;&nbsp;&nbsp;&nbsp; 将我们的相对路径和使用path方法生成的路径转换成一个绝对路径，无需转换的路径保留原始名字(比如内置模块和npm模块)。

2. 如果模块在缓存里面，取出缓存

&nbsp;&nbsp;&nbsp;&nbsp; 原生模块的缓存和其它模块的缓存区域不同，模块一经加载即会被缓存，下次加载时会直接从缓存中获取。

3. 查找模块

&nbsp;&nbsp;&nbsp;&nbsp; 内置原生模块会直接从node目录的libs目录下搜索；外部扩展模块即通过npm安装的模块，node会先从当前node_modules目录查找，然后是上层各个node_modules目录下查找，直到根目录；自定义模块我们一般会使用相对路径和绝对路径进行查找，如果没有扩展名node会依次按照['.js', '.node', '.json']进行匹配，自定义模块多为开发者根据commonJs规范编写的代码模块。

4. 加载模块

根据查找模块获取到的文件绝对路径定位到文件之后，node同步加载模块然后编译执行，将编译和执行之后的结果缓存到内存中，注意不同于浏览器仅仅缓存文件。

5. 输出模块的exports属性即可

```js
// require 其实内部调用 Module._load 方法
Module._load = function(request, parent, isMain) {
  //  计算绝对路径
  var filename = Module._resolveFilename(request, parent);

  //  第一步：如果有缓存，取出缓存
  var cachedModule = Module._cache[filename];
  if (cachedModule) {
    return cachedModule.exports;

  // 第二步：是否为内置模块
  if (NativeModule.exists(filename)) {
    return NativeModule.require(filename);
  }
  
  /********************************这里注意了**************************/
  // 第三步：生成模块实例，存入缓存
  // 这里的Module就是我们上面的1.1定义的Module
  var module = new Module(filename, parent);
  Module._cache[filename] = module;

  /********************************这里注意了**************************/
  // 第四步：加载模块
  // 下面的module.load实际上是Module原型上有一个方法叫Module.prototype.load
  try {
    module.load(filename);
    hadException = false;
  } finally {
    if (hadException) {
      delete Module._cache[filename];
    }
  }

  // 第五步：输出模块的exports属性
  return module.exports;
};
```

### > Node.js创建子进程方法异同

child_process 模块提供了衍生子进程的能力。 此功能主要由 child_process.spawn() 函数提供。

默认情况下， stdin、 stdout 和 stderr 的管道会在父 Node.js 进程和衍生的子进程之间建立。 这些管道具有有限的（且平台特定的）容量。 如果子进程写入 stdout 时超出该限制且没有捕获输出，则子进程会阻塞并等待管道缓冲区接受更多的数据。 这与 shell 中的管道的行为相同。 如果不消费输出，则使用 { stdio: 'ignore' } 选项。

如果 options 对象中有 options.env.PATH 环境变量，则使用它来执行命令查找。 否则，则使用 process.env.PATH。

在 Windows 上，环境变量不区分大小写。 Node.js 按字典顺序对 env 的键进行排序，并使用不区分大小写的第一个键。 只有第一个（按字典顺序）条目会被传给子流程。 当传给 env 选项的对象具有多个相同键名的变量时（例如 PATH 和 Path），在 Windows 上可能会出现问题。

child_process.spawn() 方法会异步地衍生子进程，且不阻塞 Node.js 事件循环。 child_process.spawnSync() 函数则以同步的方式提供了等效的功能，但会阻塞事件循环直到衍生的进程退出或被终止。对于某些用例，例如自动化的 shell 脚本，同步的方法可能更方便。 但是在大多数情况下，同步的方法会对性能产生重大的影响，因为会暂停事件循环直到衍生的进程完成。

为方便起见， child_process 模块提供了 child_process.spawn() 和 child_process.spawnSync() 的一些同步和异步的替代方法。 这些替代方法中的每一个都是基于 child_process.spawn() 或 child_process.spawnSync() 实现的：

- `child_process.exec(command[, options][, callback])`: 衍生 shell 并且在 shell 中运行命令，当完成时则将 stdout 和 stderr 传给回调函数。

  ![](http://nojsja.gitee.io/static-resources/images/interview/exec_options.png)

- `child_process.execFile(file[, args][, options][, callback])`: 类似于 exec()，但是默认情况下它会直接衍生命令而不先衍生shell。exec() 和 execFile() 之间区别的重要性可能因平台而异，在 Unix 类型的操作系统上，execFile() 可以更高效，因为默认情况下不会衍生 shell。但是在 Windows 上， .bat 和 .cmd 文件在没有终端的情况下不能自行执行，因此无法使用 execFile() 启动。当在 Windows 上运行时，要调用 .bat 和 .cmd 文件，可以使用设置了 shell 选项的 child_process.spawn()、child_process.exec() 或衍生 cmd.exe 并将 .bat 或 .cmd 文件作为参数传入（也就是 shell 选项和 child_process.exec() 所做的）

  ![](http://nojsja.gitee.io/static-resources/images/interview/execFile_options.png)

- `child_process.fork(modulePath[, args][, options])`: 衍生新的 Node.js 进程，并调用指定的模块，该模块已建立了 IPC 通信通道，可以在父进程与子进程之间发送消息。记住，衍生的 Node.js 子进程独立于父进程，但两者之间建立的 IPC 通信通道除外。 每个进程都有自己的内存，带有自己的 V8 实例。 由于需要额外的资源分配，因此不建议衍生大量的 Node.js 子进程。

  ![](http://nojsja.gitee.io/static-resources/images/interview/fork_options.png)

- `child_process.spawn(command[, args][, options])`：方法使用给定的 command 衍生新的进程，并传入 args 中的命令行参数，如果省略 args，则其默认为空数组。如果参数 options 选项 shell 为 true，则在 shell 中运行 command，在 Unix 上使用 '/bin/sh'，在 Windows 上使用 process.env.ComSpec。
  
  ![](http://nojsja.gitee.io/static-resources/images/interview/spawn_options.png)

### > Node.js创建子进程参数`stdio`的理解

options.stdio 选项用于配置在父进程和子进程之间建立的管道。 默认情况下，子进程的 stdin、 stdout 和 stderr 会被重定向到 ChildProcess 对象上相应的 subprocess.stdin、subprocess.stdout 和 subprocess.stderr 流。 这相当于将 options.stdio 设置为 ['pipe', 'pipe', 'pipe']。

为方便起见， options.stdio 可以是以下字符串之一：

- 'pipe'：相当于 ['pipe', 'pipe', 'pipe']（默认值）。
- 'ignore'：相当于 ['ignore', 'ignore', 'ignore']。
- 'inherit'：相当于 ['inherit', 'inherit', 'inherit'] 或 [0, 1, 2] 或 [process.stdin, process.stdout, process.stderr]。

否则， options.stdio 的值需是数组（其中每个索引对应于子进程中的文件描述符）。 文件描述符 0、1 和 2 分别对应于 stdin、stdout 和 stderr。 其他的文件描述符可以被指定用于在父进程和子进程之间创建其他的管道。 值可以是以下之一：

1. **'pipe'**：在子进程和父进程之间创建管道。 管道的父端作为 child_process 对象上的 subprocess.stdio[fd] 属性暴露给父进程。 为文件描述符 0、1 和 2 创建的管道也可分别作为 subprocess.stdin、subprocess.stdout 和 subprocess.stderr 使用。

2. **'ipc'**：创建 IPC 通道，用于在父进程和子进程之间传递消息或文件描述符。 一个 ChildProcess 最多可以有一个 IPC stdio 文件描述符。 设置此选项会启用 subprocess.send() 方法。 如果子进程是 Node.js 进程，则 IPC 通道的存在将会启用 process.send() 和 process.disconnect() 方法、以及子进程内的 'disconnect' 和 'message' 事件。以 process.send() 以外的任何方式访问 IPC 通道的文件描述符、或者在不是 Node.js 实例的子进程中使用 IPC 通道，都是不支持的。

3. **'ignore'**：指示 Node.js 忽略子进程中的文件描述符。 虽然 Node.js 将会始终为其衍生的进程打开文件描述符 0、1 和 2，但将文件描述符设置为 'ignore' 可以使 Node.js 打开 /dev/null 并将其附加到子进程的文件描述符。

4. **'inherit'**：将相应的 stdio 流传给父进程或从父进程传入。 在前三个位置中，这分别相当于 process.stdin、 process.stdout 和 process.stderr。 在任何其他位置中，则相当于 'ignore'。

5. **`<Stream>`** 对象：与子进程共享指向 tty、文件、 socket 或管道的可读或可写流。 流的底层文件描述符在子进程中会被复制到与 stdio 数组中的索引对应的文件描述符。 该流必须具有底层的描述符（文件流直到触发 'open' 事件才有）。

6. **正整数**：整数值会被解释为当前在父进程中打开的文件描述符。 它与子进程共享，类似于共享 `<Stream>`对象的方式。 在 Windows 上不支持传入 socket。

7. **null 或 undefined**：使用默认值。 对于 stdio 的文件描述符 0、1 和 2（换句话说，stdin、stdout 和 stderr），将会创建管道。 对于文件描述符 3 及更大的值，则默认为 'ignore'。

```js
const { spawn } = require('child_process');

// 子进程使用父进程的 stdio。
spawn('prg', [], { stdio: 'inherit' });

// 衍生的子进程只共享 stderr。
spawn('prg', [], { stdio: ['pipe', 'pipe', process.stderr] });

// 打开一个额外的 fd=4，与呈现启动式界面的程序进行交互。
spawn('prg', [], { stdio: ['pipe', null, null, null, 'pipe'] });
```
当在父进程和子进程之间建立 IPC 通道，并且子进程是 Node.js 进程时，则子进程启动时不会指向 IPC 通道（使用 unref()），直到子进程为 'disconnect' 事件或 'message' 事件注册了事件句柄。 这使得子进程可以正常退出而不需要通过开放的 IPC 通道保持打开该进程。

在类 Unix 操作系统上，child_process.spawn() 方法在将事件循环与子进程解耦之前会同步地执行内存操作。 具有大内存占用的应用程序可能会发现频繁的 child_process.spawn() 调用成为瓶颈。 详见 V8 问题 7381。


### > Nodejs使用场景
Nodejs 是单线程，非阻塞 I/O，事件驱动，不适用于CPU密集运算的任务。它的特点决定了它适合做一些大量 I/O 的东西，比如，聊天室，表单提交等不需要大量计算的功能。做一些微信后端开发，或者做消息系统等。可以整个项目用， 也可以根据它的特点在某个模块使用，比如 socketio，打造一个消息系统等。

### > Nodejs 中的 Stream 和 Buffer 有什么区别?
Buffer：为数据缓冲对象，是一个类似数组结构的对象，可以通过指定开始写入的位置及写入的数据长度，往其中写入二进制数据。Stream：是对 buffer 对象的高级封装，其操作的底层还是 buffer 对象， stream 可以设置为可读、可写，或者即可读也可写，在 nodejs 中继承了 EventEmitter 接口，可以监听读入、写入的过程。具体实现有文件流，httpresponse 等。

### > Node.js流的概念

流（stream）是 Node.js 中处理流式数据的抽象接口。 Node.js 提供了多种流对象。 例如，HTTP 服务器的请求和 process.stdout 都是流的实例。流可以是可读的、可写的、或者可读可写的，所有的流都是 EventEmitter 的实例。

##### 流的类型

Node.js 中有四种基本的流类型：

- Writable - 可写入数据的流（例如 fs.createWriteStream()）。
- Readable - 可读取数据的流（例如 fs.createReadStream()）。
- Duplex - 可读又可写的流（例如 net.Socket）。
- Transform - 在读写过程中可以修改或转换数据的 Duplex 流（例如 zlib.createDeflate()）。

##### 流的缓冲区

可写流和可读流都会在内部的缓冲器中存储数据，可以分别使用的 writable.writableBuffer 或 readable.readableBuffer 来获取。

可缓冲的数据大小取决于传入流构造函数的 highWaterMark 选项。 对于普通的流， highWaterMark 指定了字节的总数。 对于对象模式的流， highWaterMark 指定了对象的总数。

当调用 stream.push(chunk) 时，数据会被缓冲在可读流中。 如果流的消费者没有调用 stream.read()，则数据会保留在内部队列中直到被消费。

一旦内部的可读缓冲的总大小达到 highWaterMark 指定的阈值时，流会暂时停止从底层资源读取数据，直到当前缓冲的数据被消费 （也就是说，流会停止调用内部的用于填充可读缓冲的 readable._read()）。

当调用 writable.write(chunk) 时，数据会被缓冲在可写流中。 当内部的可写缓冲的总大小小于 highWaterMark 设置的阈值时，调用 writable.write() 会返回 true。 一旦内部缓冲的大小达到或超过 highWaterMark 时，则会返回 false。

stream API 的主要目标，特别是 stream.pipe()，是为了限制数据的缓冲到可接受的程度，也就是读写速度不一致的源头与目的地不会压垮内存。

因为 Duplex 和 Transform 都是可读又可写的，所以它们各自维护着两个相互独立的内部缓冲器用于读取和写入， 这使得它们在维护数据流时，读取和写入两边可以各自独立地运作。 例如，net.Socket 实例是 Duplex 流，它的可读端可以消费从 socket 接收的数据，而可写端则可以将数据写入到 socket。 因为数据写入到 socket 的速度可能比接收数据的速度快或者慢，所以读写两端应该独立地进行操作（或缓冲）。

##### 可写流

可写流是对数据要被写入的目的地的一种抽象。

常见的可写流包括：
- 客户端的 HTTP 请求
- 服务器的 HTTP 响应
- fs 的写入流
- zlib 流
- crypto 流
- TCP socket
- 子进程 stdin
- process.stdout、process.stderr

使用示例：
```js
const myStream = getWritableStreamSomehow();
myStream.write('一些数据');
myStream.write('更多数据');
myStream.end('完成写入数据');
```

常见事件：
- close: 当流或其底层资源（比如文件描述符）被关闭时触发。 表明不会再触发其他事件，也不会再发生操作。
- drain: 如果调用 stream.write(chunk) 返回 false，则当可以继续写入数据到流时会触发 'drain' 事件。
- error: 如果在写入或管道数据时发生错误，则会触发 'error' 事件，在 'error' 之后，除 'close' 事件外，不应再触发其他事件。
- 调用 stream.end() 且缓冲数据都已传给底层系统之后触发。
- pipe: 可写流被`stream.pipe()`连接

常见方法：

- writable.end([chunk[, encoding]][, callback]): 调用 writable.end() 表明已没有数据要被写入可写流。 可选的 chunk 和 encoding 参数可以在关闭流之前再写入一块数据。 如果传入了 callback 函数，则会做为监听器添加到 'finish' 事件和 'error' 事件。
- writable.write(chunk[, encoding][, callback]): writable.write() 写入数据到流，并在数据被完全处理之后调用 callback。 如果发生错误，则 callback 可能被调用也可能不被调用。 为了可靠地检测错误，可以为 'error' 事件添加监听器。 callback 会在触发 'error' 之前被异步地调用。在接收了 chunk 后，如果内部的缓冲小于创建流时配置的 highWaterMark，则返回 true 。 如果返回 false ，则应该停止向流写入数据，直到 'drain' 事件被触发。

##### 可读流
可读流运作于两种模式之一：流动模式（flowing）或暂停模式（paused）。 这些模式与对象模式分开。 无论是否处于流动模式或暂停模式，可读流都可以处于对象模式：
- 在流动模式中，数据自动从底层系统读取，并通过 EventEmitter 接口的事件尽可能快地被提供给应用程序。
- 在暂停模式中，必须显式调用 stream.read() 读取数据块。

所有可读流都开始于暂停模式，可以通过以下方式切换到流动模式：
- 添加 'data' 事件句柄。
- 调用 stream.resume() 方法。
- 调用 stream.pipe() 方法将数据发送到可写流。

可读流可以通过以下方式切换回暂停模式：
- 如果没有管道目标，则调用 stream.pause()。
- 如果有管道目标，则移除所有管道目标。调用 stream.unpipe() 可以移除多个管道目标。

只有提供了消费或忽略数据的机制后，可读流才会产生数据。 如果消费的机制被禁用或移除，则可读流会停止产生数据。

为了向后兼容，移除 'data' 事件句柄不会自动地暂停流。 如果有管道目标，一旦目标变为 drain 状态并请求接收数据时，则调用 stream.pause() 也不能保证流会保持暂停模式。

如果可读流切换到流动模式，且没有可用的消费者来处理数据，则数据将会丢失。 例如，当调用 readable.resume() 时，没有监听 'data' 事件或 'data' 事件句柄已移除。

添加 'readable' 事件句柄会使流自动停止流动，并通过 readable.read() 消费数据。 如果 'readable' 事件句柄被移除，且存在 'data' 事件句柄，则流会再次开始流动。

常见事件：

- close: 当流或其底层资源（比如文件描述符）被关闭时触发 'close' 事件。 该事件表明不会再触发其他事件，也不会再发生操作。
- data: 当流将数据块传送给消费者后触发。 当调用 readable.pipe()， readable.resume() 或绑定监听器到 'data' 事件时，流会转换到流动模式。 当调用 readable.read() 且有数据块返回时，也会触发 'data' 事件。
- end: 'end' 事件只有在数据被完全消费掉后才会触发。 要想触发该事件，可以将流转换到流动模式，或反复调用 stream.read() 直到数据被消费完。
- error: 'error' 事件可能随时由 Readable 实现触发。 通常，如果底层的流由于底层内部的故障而无法生成数据，或者流的实现尝试推送无效的数据块，则可能会发生这种情况。
- pause: 当调用 stream.pause() 并且 readsFlowing 不为 false 时，就会触发 'pause' 事件。
- readable: 当有数据可从流中读取时，就会触发 'readable' 事件。 在某些情况下，为 'readable' 事件附加监听器将会导致将一些数据读入内部缓冲区。
- resume: 当调用 stream.resume() 并且 readsFlowing 不为 true 时，将会触发 'resume' 事件。

常见方法:

- readable.pause:  方法使流动模式的流停止触发 'data' 事件，并切换出流动模式。 任何可用的数据都会保留在内部缓存中。
- readable.resume:  方法将被暂停的可读流恢复触发 'data' 事件，并将流切换到流动模式。
- readable.read([size]): 从内部缓冲拉取并返回数据。 如果没有可读的数据，则返回 null。 默认情况下， readable.read() 返回的数据是 Buffer 对象，除非使用 readable.setEncoding() 指定字符编码或流处于对象模式。如果没有指定 size 参数，则返回内部缓冲中的所有数据。
- readable.setEncoding(encoding): 方法为从可读流读取的数据设置字符编码。默认情况下没有设置字符编码，流数据返回的是 Buffer 对象。 如果设置了字符编码，则流数据返回指定编码的字符串。 例如，调用 readable.setEncoding('utf-8') 会将数据解析为 UTF-8 数据，并返回字符串。

##### 可读可写双向流
双工流（Duplex）是同时实现了 Readable 和 Writable 接口的流。

Duplex 流的例子包括：
- TCP socket
- zlib 流
- crypto 流
##### 转换流
转换流（Transform）是一种 Duplex 流，但它的输出与输入是相关联的。 与 Duplex 流一样， Transform 流也同时实现了 Readable 和 Writable 接口。

Transform 流的例子包括：
- zlib 流
- crypto 流