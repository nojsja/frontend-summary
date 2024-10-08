---
lang: zh-CN
title: ● HTTP 协议
description: 网络协议
---

## ➣ HTTP 的特点和缺点

**特点**：`无连接`、`无状态`、`灵活`、`简单快速`

- **无连接**：每一次请求都要连接一次，请求结束就会断掉，不会保持连接
- **无状态**：每一次请求都是独立的，请求结束不会记录连接的任何信息(**提起裤子就不认人的意思**)，减少了网络开销，这`是优点也是缺点`
- **灵活**：通过http协议中头部的`Content-Type`标记，可以传输任意数据类型的数据对象(文本、图片、视频等等)，非常灵活
- **简单快速**：发送请求访问某个资源时，只需传送请求方法和URL就可以了，使用简单，正由于http协议简单，使得http服务器的程序规模小，因而通信速度很快

**缺点**：`无状态`、`不安全`、`明文传输`、`队头阻塞`

- **无状态**：请求不会记录任何连接信息，没有记忆，就无法区分多个请求发起者身份是不是同一个客户端的，意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大
- **不安全**：`明文传输`可能被窃听不安全，缺少`身份认证`也可能遭遇伪装，还有缺少`报文完整性验证`可能遭到篡改
- **明文传输**：报文(header部分)使用的是明文，直接将信息暴露给了外界，`WIFI陷阱`就是复用明文传输的特点，诱导你连上热点，然后疯狂抓取你的流量，从而拿到你的敏感信息
- **队头阻塞**：开启`长连接`(下面有讲)时，只建立一个TCP连接，同一时刻只能处理一个请求，那么当请求耗时过长时，其他请求就只能阻塞状态(如何解决下面有讲)

## ➣ HTTP 报文组成部分

**http报文**：由`请求报文`和`响应报文`组成

**请求报文**：由`请求行`、`请求头`、`空行`、`请求体`四部分组成

**响应报文**：由`状态行`、`响应头`、`空行`、`响应体`四部分组成

- **请求行**：包含http方法，请求地址，http协议以及版本
- **请求头/响应头**：就是一些key:value来告诉服务端我要哪些内容，要注意什么类型等，[请求头/响应头每一个字段详解](https://link.juejin.cn?target=https%3A%2F%2Fkb.cnblogs.com%2Fpage%2F92320%2F "https://kb.cnblogs.com/page/92320/")
- **空行**：用来区分首部与实体，因为请求头都是key:value的格式，当解析遇到空行时，服务端就知道下一个不再是请求头部分，就该当作请求体来解析了
- **请求体**：请求的参数
- **状态行**：包含http协议及版本、数字状态码、状态码英文名称
- **响应体**：服务端返回的数据

## ➣ HTTP 请求方法(9种)

**HTTP1.0：** `GET`、`POST`、`HEAD`

**HTTP1.1：** `PUT`、`PATCH`、`DELETE`、`OPTIONS`、`TRACE`、`CONNECT`

| 方法  | 描述  |
| --- | --- |
| GET | 获取资源 |
| POST | 传输资源，通常会造成服务器资源的修改 |
| HEAD | 获得报文首部 |
| PUT | 更新资源 |
| PATCH | 对PUT的补充，对已知资源部分更新 [菜鸟](https://link.juejin.cn?target=https%3A%2F%2Fwww.runoob.com%2Fhttp%2Fhttp-methods.html "https://www.runoob.com/http/http-methods.html") |
| DELETE | 删除资源 |
| OPTIONS | 列出请求资源支持的请求方法，用来跨域请求 |
| TRACE | 追踪请求/响应路径，用于测试或诊断 |
| CONNECT | 将连接改为管道方式用于代理服务器(`隧道代理`下面有讲) |

## ➣ GET 和 POST 的区别

- `GET`在浏览器回退时是无害的，而`POST`会再次发起请求
- `GET`请求会被浏览器主动缓存，而`POST`不会，除非手动设置
- `GET`请求参数会被安逗保留在浏览器历史记录里，而`POST`中的参数不会被保留
- `GET`请求在`URL`中传递的参数有长度限制(浏览器限制大小不同)，而`POST`没有限制
- `GET`参数通过`URL`传递，`POST`放在`Request body`中
- `GET`产生的URL地址可以被收藏，而`POST`不可以
- `GET`没有`POST`安全，因为`GET`请求参数直接暴露在`URL`上，所以不能用来传递敏感信息
- `GET`请求只能进行`URL`编码，而`POST`支持多种编码方式
- 对参数的数据类型，`GET`只接受`ASCII`字符，而`POST`没有限制
- `GET`产生一个TCP数据包，`POST`产生两个数据包(Firefox只发一次)。GET浏览器把 http header和data一起发出去，响应成功200，POST先发送header，响应100 continue，再发送data，响应成功200

## ➣ 常见 HTTP 状态码

**1xx: 指示信息——表示请求已接收，继续处理**

**2xx: 成功——表示请求已被成功接收**

**3xx: 重定向——表示要完成请求必须进行进一步操作**

**4xx: 客户端错误——表示请求有语法错误或请求无法实现**

**5xx: 服务端错误——表示服务器未能实现合法的请求**

常见状态码：

| 状态码 | 描述  |
| --- | --- |
| 200 | 请求成功 |
| 206 | 已完成指定范围的请求(带Range头的GET请求),场景如video,audio播放文件较大,文件分片时 |
| 301 | 永久重定向 |
| 302 | 临时重定向 |
| 304 | 请求资源未修改，可以使用缓存的资源，不用在服务器取 |
| 400 | 请求有语法错误 |
| 401 | 没有权限访问 |
| 403 | 服务器拒绝执行请求，场景如不允许直接访问，只能通过服务器访问时 |
| 404 | 请求资源不存在 |
| 500 | 服务器内部错误，无法完成请求 |
| 503 | 请求未完成，因服务器过载、宕机或维护等 |

## ➣ 关于长连接、短连接、长轮询

#### 1.  HTTP 长连接 / 短连接

在 HTTP/1.0 中默认使用 http 短连接。也就是说，客户端和服务器每进行一次 HTTP 操作，就建立一次连接，任务结束就中断连接。当客户端浏览器访问的某个 HTML 或其他类型的 Web 页中包含有其他的 Web 资源（如 JavaScript 文件、图像文件、CSS 文件等），每遇到这样一个 Web 资源，浏览器就会重新建立一个 HTTP 会话。

而从 HTTP/1.1 起，默认使用长连接，用以保持连接特性，提高传输的效率和减低服务器的开销。使用长连接的 HTTP 协议，会在响应头加入这行代码：

```sh
Connection:keep-alive
```

在使用长连接的情况下，当一个网页打开完成后，客户端和服务器之间用于传输 HTTP 数据的 TCP 连接不会关闭，客户端再次访问这个服务器时，会继续使用这一条已经建立的连接。Keep-Alive 不会永久保持连接，它有一个保持时间，可以在不同的服务器软件（如 Apache）中设定这个时间。实现长连接需要客户端和服务端都支持长连接。

HTTP 协议的长连接和短连接，实质上是 TCP 协议的长连接和短连接。

#### 2. HTTP 长轮询

HTTP 长轮询是人为编程实现的一种通信方式，它在短轮询的基础上加入服务端的连接保持、连接超时和数据变化监听等功能。而 HTTP 长连接本质上是 http 协议的特性，主要用于优化客户端的连接重用，减少资源占用，不可人为编程。

#### 3. 长连接优缺点

优点：

- `减少CPU及内存的使用`，因为不需要经常建立和关闭连接；
- `支持管道化`的请求及响应模式；
- `减少网络堵塞`，因为减少了TCP请求；
- `减少了后续请求的响应时间`，因为不需要等待建立TCP、握手、挥手、关闭TCP的过程；
- 发生错误时，也`可在不关闭连接的情况下进行错误提示`；

缺点：

一个长连接建立后，如果一直保持连接，对服务器来说是多么的浪费资源呀，而且长连接时间的长短，直接影响到服务器的并发数

还有就是可能造成`队头堵塞`(下面有讲)，造成信息延迟。

#### 4. 如何避免长连接资源浪费？

- **客户端请求头声明**：`Connection: close`，本次通信后就关闭连接；
- **服务端配置**：如Nginx，设置`keepalive_timeout`设置长连接超时时间，`keepalive_requests`设置长连接请求次数上限；
- **系统内核参数设置**：
    - `net.ipv4.tcp_keepalive_time = 60`，连接闲置60秒后，服务端尝试向客户端发送侦测包，判断TCP连接状态，如果没有收到ack反馈就在
    - `net.ipv4.tcp_keepalive_intvl = 10`，就在10秒后再次尝试发送侦测包，直到收到ack反馈，一共会
    - `net.ipv4.tcp_keepalive_probes = 5`，一共会尝试5次，要是都没有收到就关闭这个TCP连接了

## ➣ 什么是管线化(管道化)

`http1.1`在使用`长连接`的情况下，建立一个连接通道后，连接上消息的传递类似于

> 请求1 -> 响应1 -> 请求2 -> 响应2 -> 请求3 -> 响应3

`管理化`连接的消息就变成了类似这样

> 请求1 -> 请求2 -> 请求3 -> 响应1 -> 响应2 -> 响应3

`管线化`是在同一个TCP连接里**发一个请求后不必等其回来就可以继续发请求出去**，这可以减少整体的响应时间，但是服务器还是**会按照请求的顺序响应**请求，所以如果有许多请求，而前面的请求响应很慢，就产生一个著名的问题`队头堵塞`(下面有讲解决方法)

管线化的特点：

- 管线化机制通过持久连接完成，在`http1.1`版本才支持；
- 只有`GET`请求和`HEAD`请求才可以进行管线化，而`POST`有所限制；
- 初次创建连接时不应启动管线化机制，因为服务器不一定支持http1.1版本的协议；
- 管线化不会影响响应到来的顺序，如上面的例子所示，响应返回的顺序就是请求的顺序；
- 要求`客户端`和`服务端`都支持管线化，但并不要求服务端也对响应进行管线化处理，只是要求对于管线化的请求不失败即可；
- 由于上面提到的服务端问题，开户管线化很可能并不会带来大幅度的性能提升，而且很多服务端和代理程序对管线化的支持并不好，因为浏览器(Chrome/Firefox)默认并未开启管线化支持；

## ➣ 如何解决 HTTP 的队头阻塞问题

`http1.0`协议采用的是`请求-应答`模式，报文必须是`一发一收`，就形成了一个`先进先出`的串行队列，没有轻重缓急的优先级，只有入队的先后顺序，排在最前面的请求最先处理，就导致如果队首的请求耗时过长，后面的请求就只能处于阻塞状态，这就是著名的`队头阻塞`问题。解决如下：

#### 并发连接

因为一个域名允许分配多个长连接，就相当于增加了任务队列，不至于一个队列里的任务阻塞了其他全部任务。以前在RFC2616中规定过客户端最多只能并发2个连接，但是现实是很多浏览器不按套路出牌，就是遵守这个标准T_T，所以在RFC7230把这个规定取消掉了，现在的浏览器标准中一个域名`并发连接`可以有`6~8`个，记住是6~8个，不是6个(**Chrome6个/Firefox8个**)。

#### 域名分片

一个域名最多可以并发6~8个，比如a.baidu.com，b.baidu.com，c.baidu.com，多准备几个`二级域名`，当我们访问baidu.com时，可以让不同的资源从不同的二域名中获取，而它们都指向同一台服务器，这样能够并发更多的长连接了。

而在`HTTP2.0`下，可以一瞬间加载出来很多资源，因为支持多路复用，可以在一个TCP连接中发送多个请求。

## ➣ HTTPS

`HTTPS` 是超文本传输安全协议，即`HTTP + SSL/TLS`。说白了，就是一个加强版的HTTP

![](https://nojsja.github.io/static-resources/images/interview/http-ssl.png)

HTTP本文开始讲了，所以我们要理解HTTPS的精华，就要先弄清楚这个`SSL/TLS`了

### SSL/TLS

TLS是SSL的升级版，而且TLS1.2版本以下都已废弃，目前主要用的是`TLS 1.2`和`TLS 1.3`。而**OpenSSL**则是**开源版本**的

那么它到底是个啥呢？

浏览器和服务器通信之前会先协商，选出它们都支持的`加密套件`，用来实现安全的通信。[常见加密套件](https://link.juejin.cn?target=https%3A%2F%2Fciphersuite.info%2Fcs%2F%3Fsoftware%3Dopenssl%26singlepage%3Dtrue "https://ciphersuite.info/cs/?software=openssl&singlepage=true")

随便拿出一个加密套件举例，如：**RSA-PSK-AES128-GCM-SHA256**，就是长这样，代表什么意思呢，我们看图

![](https://nojsja.github.io/static-resources/images/interview/http-suit.png)

- **`RSA`**：表示握手时用RSA算法交换密钥
- **`PSK`**：表示使用PSK算法签名
- **`AES128-GCM`**：表示使用AES256对称加密算法通信，密钥长度128，分组模式GCM。TLS 1.3中只剩下称加密算法有**AES**和**CHACHA20**，分组模式只剩下**GCM**和**POLY1305**
- **`SHA256`**：表示使用SHA256算法验证信息完整性并生成随机数。TLS 1.3中哈希摘要算法只剩下**SHA256**和**SHA384**了

为什么需要用到这么多算法呢？

为了保证安全，TLS需要保证信息的：`机密性`、`可用性`、`完整性`、`认证性`、`不可否认性`，每一种算法都有其特定的用处
简单说就是简化了握手过程，只有三步，把原来的两个RTT打包成一个发送了，所以减少了传输次数。这种握手方式也叫`1-RTT`握手
​
这种握手方还有优化空间吗？
​
有的，用会话复用
​
### 会话复用
​
会话复用有两种方式：`Session ID` 和 `Session Ticket`
​
**`Session ID`**：就是客户端和服务器首次连接手各自保存会话ID，并存储会话密钥，下次再连接时，客户端发送ID过来，服务器这边再查找ID，如果找到了就直接复用会话，密钥也不用重新生成。

可是这样的话，在客户端数量庞大的时候，对服务器的存储压力可就大了，所以出来了第二种方式 **`Session Ticket`**：就是双方连接成功后服务器加密会话信息，用Session Ticket消息发给客户端存储起来，下次再连接时就把这个Session Ticket解密，验证有没有过期，如果没有过期就复用会话。原理就是把存储压力分给客户端。

这样也存在安全问题，因为每次要用一个固定的密钥来解密Session Ticket，一旦密钥被窃取，那所有历史记录也就被破解了，所以只能尽量避免这种问题`定期更换密钥`。毕竟节省了不少生成会话密钥和这些算法的耗时，性能还是提升了嘛。

那刚说了`1-RTT`，那能不能优化到`0-RTT`呢
​
还真可以，做法就是发送Session Ticket的时候带上应用数据，不用等服务端确认。这种方式被称为`PSK`(Pre-Shared Key)​

这样万无一失了吗？
​
尴了个尬，还是不行。这PSK要是被窃取，人家不断向服务器重发，就直接增加了服务器被攻击的风险
​
虽然不是绝对安全，但是现行架构下最安全的解决文案了，大大增加了中间人的攻击成本
​
## ➣ HTTP 的发展

1991年HTTP 0.9版，只有一个GET，而且只支持纯文本内容，早已过时就不讲了

#### HTTP 1.0(1996年)

- 任意数据类型都可以发送
- 有GET、POST、HEAD三种方法
- 无法复用TCP连接(长连接)
- 有丰富的请求响应头信息。以header中的`Last-Modified`/`If-Modified-Since`和`Expires`作为缓存标识

#### HTTP 1.1(1997年)

- 引入更多的请求方法类型`PUT`、`PATCH`、`DELETE`、`OPTIONS`、`TRACE`、`CONNECT`
- 引入长连接，就是TCP连接默认不关闭，可以被多个请求复用，通过请求头connection:keep-alive设置
- 引入管道连接机制，可以在同一TCP连接里，`同时发送`多个请求
- 强化了缓存管理和控制`Cache-Control`、`ETag`/`If-None-Match`
- 支持分块响应，断点续传，利于大文件传输，能过请求头中的`Range`实现
- 使用了`虚拟网络`，在一台物理服务器上可以存在多个虚拟主机，并且共享一个IP地址

**缺点**：主要是连接缓慢，服务器只能按顺序响应，如果某个请求花了很长时间，就会出现请求队头阻塞

虽然出了很多优化技巧：为了增加并发请求，做域名拆分、资源合并、精灵图、资源预取...等等

最终为了推进从协议上进行优化，Google跳出来，推出`SPDY`协议

#### SPDY(2009年)

SPDY（读作“SPeeDY”）是Google开发的基于TCP的`会话层协议`

主要通过帧、多路复用、请求优先级、HTTP报头压缩、服务器推送以最小化网络延迟，提升网络速度，优化用户的网络使用体验

原理是在SSL层上增加一个SPDY会话层，以在一个TCP连接中实现并发流。通常的HTTP GET和POST格式仍然是一样的，然而SPDY为编码和传输数据设计了一个新的帧格式。因为流是双向的，所以可以在客户端和服务端启动

虽然诞生后很快被所有主流浏览器所采用，并且服务器和代理也提供了支持，但是SPDY核心人员后来都参加到HTTP 2.0开发中去了，自HTTP2.0开发完成就不再支持SPDY协议了，并在Chrome 51中删掉了SPDY的支持

#### HTTP 2.0(2015年)

说出http2中至少三个新特性？

- 使用新的`二进制协议`，不再是纯文本，避免文本歧义，缩小了请求体积
- `多路复用`，同域名下所有通信都是在单链接(双向数据流)完成，提高连接的复用率，在拥塞控制方面有更好的能力提升
- 使用`HPACK算法将头部压缩`，用`哈夫曼编码`建立索表，传送索引大大节约了带宽
- 允许`服务端主动推送`数据给客户端
- 增加了安全性，使用HTTP 2.0，要求必须至少TLS 1.2
- 使用虚拟的流传输消息，解决了应用层的队头阻塞问题

**缺点**

- TCP以及TCP+TLS建立连接的延时，HTTP2使用TCP协议来传输的，而如果使用HTTPS的话，还需要TLS协议进行安全传输，而使用TLS也需要一个握手过程，在传输数据之前，导致我们花掉3~4个RTT
- TCP的队头阻塞并没有彻底解决。在HTTP2中，多个请求跑在一个TCP管道中，但当HTTP2出现丢包时，整个TCP都要开始等待重传，那么就会阻塞该TCP连接中的所有请求

#### SPDY 和 HTTP2 的区别

- 头部压缩算法，SPDY是通用的`deflate算法`，HTTP2是专门为压缩头部设计的`HPACK算法`
- SPDY必须在`TLS上`运行，HTTP2可在`TCP`上直接使用，因为增加了HTTP1.1的Upgrade机制
- SPDY更加完善的协议商讨和确认流程
- SPDY更加完善的Server Push流程
- SPDY增加控制帧的种类，并对帧的格式考虑的更细致

#### HTTP1 和 HTTP2

- HTTP2是一个`二进制协议`，HTTP1是`超文本协议`，传输的内容都不是一样的
- HTTP2报头压缩，可以使用HPACK进行`头部压缩`，HTTP1则不论什么请求都会发送
- HTTP2`服务端推送`(Server push)，允许服务器预先将网页所需要的资源push到浏览器的内存当中
- HTTP2遵循`多路复用`，代替同一域名下的内容，只建立一次连接，HTTP1.x不是，对域名有6~8个连接限制
- HTTP2引入`二进制数据帧`和`流`的概念，其中帧对数据进行顺序标识，这样浏览器收到数据之后，就可以按照序列对数据进行合并，而不会出现合并后数据错乱的情况，同样是因为有了序列，服务器就可以并行的传输数据，这就是流所做的事情。HTTP2对同一域名下所有请求都是基于流的，也就是说同一域名下不管访问多少文件，只建立一次连接

#### HTTP 3.0/QUIC

由于HTTP 2.0依赖于TCP，TCP有什么问题那HTTP2就会有什么问题。最主要的还是队头阻塞，在应用层的问题解决了，可是在TCP协议层的队头阻塞还没有解决。

TCP在丢包的时候会进行重传，前面有一个包没收到，就只能把后面的包放到缓冲区，应用层是无法取数据的，也就是说HTTP2的多路复用并行性对于TCP的丢失恢复机制不管用，因此丢失或重新排序的数据都会导致交互挂掉

为了解决这个问题，Google又发明了`QUIC协议`

并在2018年11月将QUIC正式改名为`HTTP 3.0`

**特点**：

- 在传输层直接干掉TCP，用`UDP`替代
- 实现了一套新的`拥塞控制算法`，彻底解决TCP中队头阻塞的问题
- 实现了类似TCP的`流量控制`、传输可靠性的功能。虽然UDP不提供可靠性的传输，但QUIC在UDP的基础之上增加了一层来保证数据可靠性传输。它提供了数据包重传、拥塞控制以及其他一些TCP中存在的特性
- 实现了`快速握手`功能。由于QUIC是基于UDP的，所以QUIC可以实现使用0-RTT或者1-RTT来建立连接，这意味着QUIC可以用最快的速度来发送和接收数据。
- 集成了TLS加密功能。目前QUIC使用的是TLS1.3

## ➣ HTTPS优缺点

#### 优点
- 内容加密，中间无法查看原始内容；
- 身份认证，保证用户访问正确。如访问百度，即使DNS被劫持到第三方站点，也会提醒用户没有访问百度服务，可能被劫持；
- 数据完整性，防止内容被第三方冒充或篡改；
- 虽然不是绝对安全，但是现行架构下最安全的解决文案了，大大增加了中间人的攻击成本；
​
#### 缺点

- 要钱，功能越强大的证书费用越贵；
- 证书需要绑定IP，不能在同一个IP上绑定多个域名；
- https双方加解密，耗费更多服务器资源；
- https握手更耗时，降低一定用户访问速度(优化好就不是缺点了)；
​
## ➣ HTTP 和 HTTPS 的区别

- HTTP是`明文传输`，不安全的，HTTPS是`加密传输`，安全的多；
- HTTP标准端口是`80`，HTTPS标准端口是`443`；
- HTTP不用认证证书`免费`，HTTPS需要认证证书`要钱`；
- `连接方式不同`，HTTP三次握手，HTTPS中TLS1.2版本7次，TLS1.3版本6次；
- HTTP在OSI网络模型中是在`应用层`，而HTTPS的TLS是在`传输层`；
- HTTP是`无状态`的，HTTPS是`有状态`的；