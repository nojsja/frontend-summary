---
lang: zh-CN
title: ● HTTP 2.0
description: 网络协议
---


## ➣ HTTP 发展史

正式讲 HTTP2 之前我们先讲一下 HTTP 的发展史。

![](https://nojsja.gitee.io/static-resources/images/http/http-http2.0.png)

- HTTP/0.9 - 单行协议
    HTTP 于 1990 年问世，那时候 HTTP 非常简单：只支持 GET 方法；没有首部；只能获取纯文本。
- HTTP/1.0 - 搭建协议的框架
    1996 年，HTTP 正式被作为标准公布，版本为 HTTP/1.0。1.0 版本增加了首部、状态码、权限、缓存、长连接（默认短连接）等规范，可以说搭建了协议的基本框架。
- HTTP/1.1 - 进一步完善
    1997 年，1.1 版本接踵而至。1.1 版本的重大改进在于默认长连接；强制客户端提供 Host 首部；管线化；Cache-Control、ETag 等缓存的相关扩展。

## ➣ 目前存在的问题

现在我们先不聊 HTTP2, 看一下 HTTP 发展到 1.1 存在有哪些问题：

1.  线头阻塞：TCP 连接上只能发送一个请求，前面的请求未完成前，后续的请求都在排队等待。
2.  多个 TCP 连接
    虽然 HTTP/1.1 管线化可以支持请求并发，但是浏览器很难实现，chrome、firefox 等都禁用了管线化。所以 1.1 版本请求并发依赖于多个 TCP 连接，建立 TCP 连接成本很高，还会存在慢启动的问题。
3.  头部冗余，采用文本格式
    HTTP/1.X 版本是采用文本格式，首部未压缩，而且每一个请求都会带上 cookie、user-agent 等完全相同的首部。
4.  客户端需要主动请求

## ➣ HTTP/2.0 的时代来了

先来一个 demo 感受一下吊炸天的 HTTP/2.0，这个 demo 是加载 379 张图片，来对比 HTTP/1.1 和 HTTP/2.0 的性能。 [HTTP/1.1 与 2.0 性能比较](https://http2.akamai.com/demo)

理论上 HTTP/2.0 会比 HTTP/1.1 有一倍多的性能提升，弱网环境下，性能提升会更加明显。 接下来我们正式开始聊聊 2.0。看看 2.0 相比与 1.1 的一些重大改进。

### 二进制分帧层

HTTP2 性能提升的核心就在于二进制分帧层。HTTP2 是二进制协议，他采用二进制格式传输数据而不是 1.x 的文本格式。

![](https://nojsja.gitee.io/static-resources/images/http/http2.0.png)

看图吧！很清晰的表达了 HTTP/1.1 的响应和 2.0 的区别。1.1 响应是文本格式，而 2.0 把响应划分成了两个帧，图中的 HEADERS（首部）和 DATA（消息负载） 是帧的类型。[了解更多帧的类型](https://www.ibm.com/developerworks/cn/web/wa-http2-under-the-hood/index.html) 也就是说一条 HTTP 响应，划分成了两个帧来传输，并且采用二进制来编码。

这里我们来提三个概念。

- 流（Stream）：已建立的 TCP 连接上的双向字节流，可以承载一个或多个消息。
- 消息（Message）：一个完整的 HTTP 请求或响应，由一个或多个帧组成。特定消息的帧在同一个流上发送，这意味着一个 HTTP 请求或响应只能在一个流上发送。
- 帧（Frame）：通信的基本单位。
    一个 TCP 连接上可以有任意数量的流。


### 多路复用

上面提到 HTTP/1.1 的线头阻塞和多个 TCP 连接的问题，HTTP2 的多路复用完美解决。HTTP2 让所有的通信都在一个 TCP 连接上完成，真正实现了请求的并发。我们来看一下 HTTP2 具体是怎么实现的：

![](https://nojsja.gitee.io/static-resources/images/http/http2.0-stream.png)

HTTP2 建立一个 TCP 连接，一个连接上面可以有任意多个流（stream），消息分割成一个或多个帧在流里面传输。帧传输过去以后，再进行重组，形成一个完整的请求或响应。这使得所有的请求或响应都无法阻塞。 我们再来回看上面的那个 demo:


需要注意的是：虽然一个 TCP 连接可以有任意数量的流，也就是同时可以并发任意数量的请求，但是浏览器还是会有请求发送排队的情况。原因就是请求太多时，浏览器或服务器会受不了，这超出了它的处理能力。流控制帮我们解决了这个问题，流控制会管理数据的传输，允许接收者停止或减少发送的数据量，免得接收方不堪重负。所以请求太多时，还是会存在排队等待的问题，因为不管是客户端或服务器端，能同时处理请求或响应都是有限的。

### 头部压缩

头部压缩也是 HTTP2 的一大亮点。在 1.X 版本中，首部用文本格式传输，通常会给每个传输增加 500-800 字节的开销。现在打开一个网页上百个请求已是常态，而每个请求带的一些首部字段都是相同的，例如 cookie、user-agent 等。HTTP2 为此采用 HPACK 压缩格式来压缩首部。头部压缩需要在浏览器和服务器端之间：

- 维护一份相同的静态字典，包含常见的头部名称，以及常见的头部名称和值的组合
- 维护一份相同的动态字典，可以动态的添加内容
- 通过静态 Huffman 编码对传输的首部字段进行编码

HTTP2 的静态字典是长这个样子的（只截取了部分，[完整表格在这里](https://httpwg.org/specs/rfc7541.html#static.table.definition)）：

![](https://nojsja.gitee.io/static-resources/images/http/http2.0-headers.png)

所以我们在传输首部字段的时候，例如要传输 method:GET, 那我们只需要传输静态字典里面 method:GET 对应的索引值就可以了，一个字节搞定。像 user-agent、cookie 这种静态字典里面只有首部名称而没有值的首部，第一次传输需要 user-agent 在静态字典中的索引以及他的值，值会采用静态 Huffman 编码来减小体积。

第一次传输过 user-agent 之后呢，浏览器和服务器端就会把它添加到自己的动态字典中。后续传输就可以传输索引了，一个字节搞定。

### 服务器端推送

服务器端推送使得服务器可以预测客户端需要的资源，主动推送到客户端。
例如：客户端请求 index.html，服务器端能够额外推送 script.js 和 style.css。 实现原理就是客户端发出页面请求时，服务器端能够分析这个页面所依赖的其他资源，主动推送到客户端的缓存，当客户端收到原始网页的请求时，它需要的资源已经位于缓存。

针对每一个希望发送的资源，服务器会发送一个 PUSH\_PROMISE 帧，客户端可以通过发送 RST\_STREAM 帧来拒绝推送（当资源已经位于缓存）。这一步的操作先于父响应（index.html），客户端了解到服务器端打算推送哪些资源，就不会再为这些资源创建重复请求。当客户端收到 index.html 的响应时，script.js 和 style.css 已经位于缓存。

## ➣ 参考文章

- [HTTP/2 简介](https://link.juejin.cn?target=https%3A%2F%2Fdevelopers.google.com%2Fweb%2Ffundamentals%2Fperformance%2Fhttp2%2F%3Fhl%3Dzh-cn%23_8 "https://developers.google.com/web/fundamentals/performance/http2/?hl=zh-cn#_8")
- [HTTP/2 幕后原理](https://link.juejin.cn?target=https%3A%2F%2Fwww.ibm.com%2Fdeveloperworks%2Fcn%2Fweb%2Fwa-http2-under-the-hood%2Findex.html "https://www.ibm.com/developerworks/cn/web/wa-http2-under-the-hood/index.html")
- [HTTP/2 头部压缩技术介绍](https://link.juejin.cn?target=https%3A%2F%2Fimququ.com%2Fpost%2Fheader-compression-in-http2.html "https://imququ.com/post/header-compression-in-http2.html")
- [使用 Wireshark 调试 HTTP/2 流量](https://link.juejin.cn?target=https%3A%2F%2Fimququ.com%2Fpost%2Fhttp2-traffic-in-wireshark.html "https://imququ.com/post/http2-traffic-in-wireshark.html")
- [HTTP/2.0 相比 1.0 有哪些重大改进？](https://link.juejin.cn?target=https%3A%2F%2Fwww.zhihu.com%2Fquestion%2F34074946%2Fanswer%2F75364178 "https://www.zhihu.com/question/34074946/answer/75364178")
- [HTTP/2 新特性浅析](https://link.juejin.cn?target=http%3A%2F%2Fio.upyun.com%2F2015%2F05%2F13%2Fhttp2%2F "http://io.upyun.com/2015/05/13/http2/")
