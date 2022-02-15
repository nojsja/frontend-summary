---
lang: zh-CN
title: ● 项目架构梳理
description: project 的描述
---

## ➣ 前公司 dview 项目的整体构成 (dt)

dview 是一个聚合服务云平台，内部包含很多子服务：

#### 1. 数据存储相关服务

- 对象存储服务：基于 ceph s3 的对象存储服务，支持桶管理和桶内数据管理。
- 文件系统服务：文件系统的创建、挂载、卸载。
- 卷管理服务：也就是硬盘或者分区的管理，支持卷的快照、克隆、拷贝、删除等。
- 数据湖：基于对象存储，相比于对象存储，提升了架构扩展性：以集群服务节点为基本单位，可添加和移除多个集群的服务节点，每个节点内的对象存储桶作为基础存储单元，并辅以数据搜索引擎支持。提供桶内对象版本管理、桶对象查看、桶详情设置、桶对象元数据扩展这些功能。
- 存储池：基于卷存储，一个存储池以集群服务节点为基本单位，各个节点的卷作为基本存储单元，支持存储池扩容和所容和多种数据校验策略，各节点间会进行数据自动同步。

#### 2. 用户相关服务

基于 keycloak 的用户认证和管理服务，有多租户的概念。

#### 3. 网络设置相关服务

网络部分分为：内网、数据同步网、外部网络。内网就是内部接口些用的网，web 访问也是这个；数据同步就是我们的集群节点之间互相同步数据用的；外部网络，就是业务网，上面说的高可用 IP 就是这个网，NAS 对象存储 SAN 都可以配置。

- 节点管理服务：节点 ip、网卡设置。
- 高可用服务：保证集群节点在宕机后仍然能提供正常的服务，集群会进行 ip 漂移。

#### 4. 监控相关服务

- 节点管理服务：查看节点资源占用和基本设置等。
- 运维服务：支持节点重启、关机、服务状态、服务重启等。
- 日志服务：分为操作日志、审计日志、运行日志等。

## ➣ 前公司 dview 项目的前端部分架构 (dt)

重构之前

前端外层 nginx 负责客户端的访问控制，同时 nginx 作为 node 访问后端服务时的 router。

#### 前端

web static -> nginx -> node proxy -> cluster nodes

#### 后端

云平台微服务

## ➣ 前公司 dview 项目采用 node.js 作为底层架构的理论依据 (dt)

nodejs 作为前端的静态资源的托管和网关、规范 API，还有就是前端在对象存储和数据湖也是充当了网关的功能，前端访问 nodejs 再访问对象存储。

mock 数据、请求日志、跨域通过 ip 直接调用。

## ➣ 前公司 cicd 系统的架构和原理 (hz)

1. 底层基于 k8s 容器化，生产环境的应用可以在线缩容扩容服务节点，版本发布时可以做到无下线热替换。
2. 有一个 k8s 服务创建界面，可以创建 `Java / Nodejs / Nodejs_static / Python / Static_web` 服务，之后这里创建的服务需要绑定到构建流水线。
3. 每个项目可以创建自己的流水线并绑定之前创建的 k8s 微服务，流水线分为 `dev / test / preview / prod` 流水线。每次流水线构建完成之后会将打包结果生成为一个镜像，与应用绑定的 k8s 容器会引用这个最新的构建镜像。
4. 有一个 nginx 配置系统，外层多个 nginx 服务指向不同的环境：`dev / test / preview / prod`，各个环境配置可以进行同步，并且每个环境下的可以配置很多子域名指向各个 k8s 应用。示例说明：一个不依赖于 Node 的 Static_web 前端项目 ，需要在某个环境下的 nginx 主域名下指定一个 ` 子域名 ` 与其绑定，具体操作就是将这个子域名 nginx 配置里面的 root 路径 `location /` 指向一个 nginx `upstream` 上游配置，这个上游配置即 k8s 内部 `Static_web` 服务对应集群容器内部 IP。另外可以配置 ` 子域名 / api` 指向后端另一个 service 网关之类的微服务用于接口调用。
5. 单个 k8s 实例容器内部可以自定义 nginx 的 `static file` 路径和其它配置等。

## ➣ IM 系统 前端 SDK 的设计要点 (hz)

### 一、整体设计

![web_sdk_structure](http://nojsja.gitee.io/static-resources/images/im/web_sdk_structure.png)

#### 1. Storage 存储

主要分为临时存储和持久化存储：

- 临时数据：SDK 云信过程中产生的临时数据，比如会话列表、各种时间戳、token 等。
- 持久化数据：比如群消息已读状态回执、历史连接过的 appId、sessionId、导航数据等等。下文有详细说明。

持久化存储方面也对低版本浏览器做了兼容：

- 优先使用 LocalStorage

- IE 早期版本采用 `Element#UserData` 方式兼容，原理就是浏览器将 DOM Element 作为存储容器，不过只是作为备用兼容方案，并不支持持久化。

- 兜底方案降级为 `MemoryStorage`，直接使用内存存储。这种方案下用户多次登录都需要重新获取所有数据，包括导航数据、自定义数据等，对用户的友好度降低。

#### 2. Service 业务和服务

- [01] __IM Client__：作为一个装饰器对象对外提供 SDK 接口，大部分接口功能会实际调用 `Data Access Provider` 和 `Bridge` ，相当于对内部整体逻辑做了一层装饰器处理。
- [02] __Data Access Provider__：负责大部分业务逻辑，会直接调用 Bridge 和 Storage。
- [03] __Bridge__：将 IM Client 和 Msg Client 连接起来，设置监听者，内部 Client 的调用 Handler。
  - ├─ Navigation：导航数据处理，获取用于建立服务器连接前的一些配置信息和定制化信息。
  - └─ Client：消息客户端，整个消息通信的中心，外部响应消息监听者，内部调用 Channel 通道进行消息通信。
    - ├─ MessageHandler：消息接收和处理
    - └─ Channel：消息通道逻辑，会注册 ` 连接状态监听者 ` 和 ` 消息监听者 `。
      - ├─ Socket：通信载体对象，底层会调用 `WebSocket` 或 `Long Polling` 传输对象进行数据发送和接收。
        - ├─ MessageOutputStream：在数据发送前会对明文请求消息数据进行 Header 定制和 `Stream` 流化编码处理。
        - └─ MessageInputStream：在数据接收前，会对 `Stream` 流化响应数据进行解码生成 SDK 直接使用的明文对象。
      - ├─ Listeners：连接状态监听器和消息监听器
        - ├─ ConnectionStatusListener: 连接状态监听者
        - └─ ReceiveMessageListener: 消息接收监听者

#### 3. Network 网络

> 以 WebSocket 作为主要通信协议，HTTP 长轮询作为兼容方案，上传文件、下载文件、获取导航信息等会用到 HTTP 短连接用于即时数据的获取。

需要注意的是整个通信过程中，Socket 传输的数据都是二进制数据，不会传明文，客户端发送消息时进行二进制编码，服务端接收消息时进行二进制解码。这样设计的目的一个是为了信息传送安全，另一个就是二进制数据有更好的传输性能。

### 二、通信协议

#### 1. 主要方案：WebSocket

全双工的通信协议

#### 2. 兼容方案：HTTP 长轮询

（1）说明 1： HTTP 长连接 / 短连接

在 HTTP/1.0 中默认使用 http 短连接。也就是说，客户端和服务器每进行一次 HTTP 操作，就建立一次连接，任务结束就中断连接。当客户端浏览器访问的某个 HTML 或其他类型的 Web 页中包含有其他的 Web 资源（如 JavaScript 文件、图像文件、CSS 文件等），每遇到这样一个 Web 资源，浏览器就会重新建立一个 HTTP 会话。

而从 HTTP/1.1 起，默认使用长连接，用以保持连接特性，提高传输的效率和减低服务器的开销。使用长连接的 HTTP 协议，会在响应头加入这行代码：

```bash
Connection:keep-alive
```

在使用长连接的情况下，当一个网页打开完成后，客户端和服务器之间用于传输 HTTP 数据的 TCP 连接不会关闭，客户端再次访问这个服务器时，会继续使用这一条已经建立的连接。Keep-Alive 不会永久保持连接，它有一个保持时间，可以在不同的服务器软件（如 Apache）中设定这个时间。实现长连接需要客户端和服务端都支持长连接。

HTTP 协议的长连接和短连接，实质上是 TCP 协议的长连接和短连接。

（2）说明 2：HTTP 长轮询

HTTP 长轮询是人为编程实现的一种通信方式，它在短轮询的基础上加入服务端的连接保持、连接超时和数据变化监听等功能。而 HTTP 长连接本质上是 http 协议的特性，主要用于优化客户端的连接重用，减少资源占用，不可人为编程。

#### 3. 通信数据格式

每个通信消息都由 header 和 body 构成，采用二进制字节流进行传输：

header：用于运算的 int8 数字，header 部分采用自定义算法进行编解码。header 即一个 `int8` 数字 (占 8bit，范围 0-255) 表示各种具有不同参数的 header 实例，位于消息体第一个字节。

body：二进制字节流数据，会使用 protobuf 规范解析。与常见的 xml 和 json 数据类型不同，他们是通过把数据转化成字符串再传输，而 Protobuf 是把数据通过独特的方式压缩成更短的 byte 流进行传输。

Protocol Buffer 在传输过程中其实只会传输四个信息，分别是：

- ** 类型（string, int...)**
- ** 字段映射的值（也就是 tag，也叫 key，在 proto 文件中定义）**
- **value 长度 **
- **value 本身 **

简要描述： `00001(tag/key) 111(type) 00000011 (length:3B) 3bytes(value)`，第一个字节 3bit 解析为数据类型 type (int/string...)，第一个字节前 5bit 使用算法解析为 proto 中定义的 各种 key；紧接着一个字节如果高位为 1，则表示后面紧接着的字节也表示 value 长度，如果紧接着的字节高位为 0 则当前字节表示 value 长度；最后根据前一步得到的 value 长度截取 value 值。

值得注意的是很多枚举类型的 value 值前后端也有一定的码值规则进行映射。protobuf 和 value 码值都起到了压缩消息体的作用，其实 header 也有压缩算法，可以参考以下说明。

![](https://nojsja.gitee.io/static-resources/images/interview/protobuf.jpg)

- [01] body 部分采用 `protobuf` 格式 (protocol buffer) 进行数据编码传输和解码
  - protobuf 是谷歌的一种开源、跨平台的序列化数据格式，其中 proto 文件用于描述数据结构，将冗长的明文字段映射为简短的值表示。
  - proto 文件内部会定义各种 message 结构体，每个结构体会有各个映射字段。比如 `optional int32 page_number = 2;` 表示可选的 int32 字段 page_number，映射值为 2，消息体解码的时候就会把 tag 位为 2 的数据解析为字段 page_number 并作为 key，然后紧接着再解码动态的 length 位，得到后面有多少个字节的 value 数据，最终 key / value 均被解析。
  - SDK 发送消息时每个消息体会存在多个 `key/value` 字段作为参数，各个映射字段的作用就是压缩通信过程中 `key/value` 键值对中 key 的明文定义，并且 value 部分包括中英文、数字、字符、特殊符号等也会根据 ascii 编码转化为二进制字节流传输。
  ```javascript
    message SearchRequest {
      required string query = 1;
      optional int32 page_number = 2;
      optional int32 result_per_page = 3;
    }
  ```
  - 公共定义的 `proto` 规则文件可以编译生成各个语言的 lib 库文件，包括生成前端需要的 js lib，SDK 客户端使用 lib 进行消息的编解码。
  - 值得注意的是每种类型的消息，有一些属于 SDK 内部使用的字段，他们会按照约定存放在 body 体靠前面数个字节中，这些字段值会先被解析出来，然后剩下的其余字节数据再交由 protobuf lib 库对消息内容本身进行解码。
  - 传输过程中使用 arraybuffer，客户端 SDK 拿到消息数据后，会使用 arraybuffer 生成 Uint8Array 即 8 位无符号整数数组，生成之后根据每种消息实例调用自身的 readMessage 来读取上面一条描述的内部消息字段。解码完内部消息字段后，具体消息内容会调用 protobuf lib 库进行解码。
  - Uint8Array 数组每一位数表示一个字节，需要先转化各位为 16 进制，再由 16 进制转化为其它 utf-8 字符或数字等。以我们在转化一个时间戳参数 timestrap 为例：时间戳由于很大一般由 8 个字节表示，因此读取 Uint8Array 中的 8 个数字，每个转换为 16 进制数，然后再把这些 16 进制连接为一个字符串，最后再把 16 进制数字符串 parseInt 转换为 10 进制的时间戳。其它大部分数据直接通过 utf-8 解码方式获取即可，utf-8 是一种变长的编码方式，是 unicode 编码的一种具体实现。
  - utf-8 编码的转换在 js 中需要使用两个方法：`String.fromCharCode()` 和 `String.prototype.charCodeAt()`。
  - 数据编码和转换原理就是：int8 数字一个占用一个字节，一个 int8 数字转换为一个 16 进制，多个 16 进制组合为一个大的 16 进制字符串， 16 进制字符串 ->  10 进制数字 -> 对应 unicode 编码对应的真实明文字符。比如："严" 的 unicode 编号 `('严').charCodeAt(0) === 20005`。
  - 整体流程表示为：` 明文 -> arraybuffer -> websoket 传输 -> arraybuffer -> Uint8Array -> defined parse step1 -> protobuf parser step2 -> 明文 `。

- [02] header 部分使用自定义算法进行编码解码

  - 每条消息的 header 通常会有一些标志位，比如：是否需要回执 (QOS)、客户端是否需要持久化、本条消息是否是重发消息、消息类型等。如果明文传输，通常会增加通信成本。我们制定了 header 标志位中每位的运算规则，然后用一个 int8 数字表示 header(占用一个字节)，header 数字经过各种约定的运算后在客户端和服务器端都可以生成一致的各标志位 value。
  - 运算规则：
  ```javascript
    const Qos = {

        AT_MOST_ONCE: 0, // 最多一次

        AT_LEAST_ONCE: 1, // 至少一次

        EXACTLY_ONCE: 2, // 必须一次

        DEFAULT: 3 // 默认
    };

    class Header {
        type = ''
        retain = ''
        qos = Qos.AT_LEAST_ONCE
        dup = ''
        syncMsg = ''
        constructor(_type, _retain, _qos, _dup) {
            if (_type && +_type == _type && arguments.length == 1) {
                this.decode(_type);
            } else {
                this.type = _type;
                this.retain = _retain;
                this.qos = _qos;
                this.dup = _dup;
            }
        }
        getSyncMsg() {
            return this.syncMsg;
        }
        getType() {
            return this.type;
        }
        decode(_type) {
            this.retain = (_type & 1) > 0; // 奇数
            this.qos = (_type & 6) >> 1; //
            this.dup = (_type & 8) > 0;
            this.type = (_type>> 4) & 15;
            this.syncMsg = (_type & 8) == 8;
        }
        encode() {
            var me = this;
            switch (this.qos) {
                case 'AT_MOST_ONCE':
                    me.qos = Qos.AT_MOST_ONCE; // 0
                    break;
                case 'AT_LEAST_ONCE':
                    me.qos = Qos.AT_LEAST_ONCE; // 1
                    break;
                case 'EXACTLY_ONCE':
                    me.qos = Qos.EXACTLY_ONCE; // 2
                    break;
                case 'DEFAULT':
                    me.qos = Qos.DEFAULT; // 3
                    break;
            }
            var _byte = (this.type << 4);
            _byte |= this.retain ? 1 : 0;
            _byte |= this.qos << 1;
            _byte |= this.dup ? 8 : 0;
            return _byte;
        }
        toString() {
            return "Header [type=" + this.type + ",retain=" + this.retain + ",qos=" + this.qos + ",dup=" + this.dup + "]";
        }
    }
  ```

#### 4. 数据加密流程

protobuf 自带一定的加密特性，并且传输过程中为非明文。

### 三、消息交互逻辑描述

SDK 内部消息类型定义：

- ConnectMessage：请求连接消息 (发向客户端)
- ConnAckMessage：连接应答消息类型，服务器连接成功后收到 (发向客户端)
- QueryAckMessage：请求查询消息应答 (发向客户端，携带查询结果)
- QueryConMessage：请求查询消息回执 (发向服务器，表明已收到查询结果)
- PingReqMessage：心跳请求消息信令 (双向，用于心跳检测和 Socket 验活)
- PingRespMessage：心跳响应消息信令 (发往客户端)
- DisconnectMessage：断开连接消息 (发往客户端)
- PublishMessage：聊天消息，客户端发布或收到此类消息 (双向)
  - s_ntf：系统通知消息
  - s_msg：聊天消息
  - s_stat：用户状态更新消息
  - s_cmd：聊天室消息
  - pp/pd/ch/pc：群组消息
- PubAckMessage: 发送聊天消息应答。某些消息发送之后要求服务端接收时回发回执消息，同样的收到某些消息后，客户端会往服务端发送回执消息。(双向)

#### 1. 历史消息 (会话)

历史消息是针对某一个会话的，根据会话中的某条消息时间戳，可以向上或向下查询历史消息。

#### 2. 离线消息 (全局)

> 离线消息就是用户不在线时，服务端存储的消息，需要在用户上线的时候由手动调用 SDK 拉取，SDK 会每隔 180s 向服务端发送消息拉取离线消息。

SDK 连接服务器成功后，会自动拉取一次离线消息 (`QueryMessage` - pullMsg)，客户端断开连接后重连时也会调用。

注意离线消息和历史消息不一样的是，历史消息是针对用户的，SDK 调用者在会话中会主动拉取历史消息。

而离线消息是 SDK 自发的一种消息机制，一方面防止网络波动和其它情况下的消息丢失，另一方面可以在用户上线时自动获取服务器的离线消息，它不属于用户 (SDK 调用者) 行为。

#### 3. 心跳消息

SDK 会每隔 30s 向服务端发送心跳包 `PingReqMessage`，用于保持连接。服务端需要回传 `PingRespMessage` 用于响应。同时服务器端也是通过这个过程来确定客户端是否在线，因为活跃的客户端一定会每隔 30s 向服务器发送心跳包，断线的用户收到的消息会被离线处理。

#### 4. 用户初次加载界面后

需要使用 `QueryMessage` - qryCon 拉取所有会话，每个会话都有未读消息数量和最后一条未读消息内容。

首次拉取离线消息和首次列举会话并不冲突，如果首次拉取的离线消息先到达，会先根据某些离线消息来创建某几个本地会话。而列举会话请求返回后也会直接利用前面创建的会话，属于 SDK 自发的逻辑。

之后 SDK 主动拉取离线消息 (消息心跳，需要区别于 ping 心跳) 或是收到消息通知后拉取在线消息时，SDK 调用者需要根据每条消息所属的会话对会话列表做更新。

#### 5. 聊天界面

1. 进入聊天界面：将最新的消息设置为已读 (通过 `PublishMessage` 的方式发送，同时会收到服务器端的发送回执 `PubAckMessage`)。
2. 输入信息：聚焦时发送 `sendTypingStatusMessage` 表明正在输入。
3. 点击发送文本：向后端发送 `PublishMessage` - ppMsgP 信息。

#### 6. 发送消息整体流程

1. 客户端向服务器发送 `PublishMessage` - ppMsgP 消息。
2. 服务端收到后向消息发送端发一条 `PubAckMessage` 消息表明消息发送成功。
3. 服务器开始进行消息转发，如果接收方不在线，则将消息存储为离线消息。如果接收方在线，则服务器先向接收端发送 `PublishMessage` - s_ntf 用于通知有消息到达。另一种情况时恰好此时接收端正在查询消息列表，那么此消息数据也可能由一条 `QueryAckMessage` 响应带回。
4. 消息接收端成功接收新消息通知 `PublishMessage` - s_ntf 后，再向服务端发送 `QueryMessage` - pullMsg 用于拉取消息，服务器端接收到拉取消息请求，将消息数据通过 `QueryAckMessage` 消息发送给消息接收端，然后消息接收端收到后向服务端发送 `QueryConMessage` 消息表明成功接收。
5. 另外如果此时接收端正在在聊天界面则会继续向服务器发送已读回执，回执通过 `PublishMessage` 格式发出 (参数见下方描述)。
6. 服务器端拿到已读回执做数据处理后，向消息接收端发出 `PubAckMessage` 消息表明已读回执已经成功处理，最后向消息发送端发送 `PublishMessage` 用于表示消息已经被接收端读取。
7. 消息发送端拿到最后的 `PublishMessage` 信息将本地的消息状态更新为对方已读，并向服务器发送 `PubAckMessage` - s_msg 表明已处理。

#### 7. 发送消息整体流程 (补充)

在处理消息转发的时候，会有一定的动态机制。当用户有很多消息积压时，服务端会下发通知让接收端一次性拉取消息，而不是直接向接收端发送 `PublishMessag` 逐条传输消息数据。

#### 8. 查询消息流程

1. 客户端向服务器发送 `QueryMessage` 消息 (离线消息 / 历史消息)。
2. 服务器统计消息数量，向消息查询客户端发送 `QueryAckMessage` 携带所有消息。
3. 某些消息客户端收到后，需要向服务端回发 `QueryConMessage` 表明所查询的消息已经成功接收。

#### 9. 发送方发消息流程

发送 `PublishMessage-ppMsgP` (私聊个人消息)，然后收到服务器 `PubAckMessage` 表明发送成功。

#### 10. 接收方收消息流程

1. 收到 `PublishMessage-s_ntf` 消息通知，接收方发出 `QueryMessage-pullMsg` 请求拉取消息。
2. 服务器向客户端发送 `QueryAckMessage` 用于传输消息数据
3. 客户端接收消息后向服务器发送 `QueryConMessage` 表示接收成功。
4. 如果用户在聊天界面，还会发出已读信息 `PublishMessag-s_msg` 将消息标注为已读，该消息内容为：

```javascript
{
    lastMessageSendTime: 1642668752031 // 被标注已读的消息发送时间
    messageName: "ReadReceiptMessage" // 固定
    messageUId: "BUEQ-NVP7-IQE6-81KB" // 被标注已读的消息发送时间 UID
    type: 1 // conversation type
}
```

### 五、SDK 整体使用流程

基础概念说明：

- appKey：应用的唯一标识 (可能不需要实现)
- userId ：用户的唯一标识
- token ：用户的通信凭证

#### 1. 获取应用的 appKey / appSecret

如果要作为一个云平台是公开对外公开提供服务的，类似于微信小程序的概念的话。appKey 可以用于区分云平台不同的开发者的应用，以提供每个开发者独立的服务。

早期简单实现可以只考虑一个开发者，也就是个 appKey / appSecret 固定，不用需要动态分发给不同的开发者。

#### 2. 前端通过 App 应用服务器接口获取 token

> 开发环境下，为了方便开发者调试，可以使用可用的测试 token。SDK 调用者固定传入测试 token，以测试正常流程。
>
token 作为用户使用 IM 系统时通信的凭证，用于验证用户身份，以及用户的消息接收和发送。

流程图：

![get_token](http://nojsja.gitee.io/static-resources/images/im/get_token.png)

（1）客户端向 __应用服务器__ 发送请求，请求携带 userId、appKey 等参数。

（2）应用服务器拿到请求后，使用步骤一拿到的 appSecret，根据签名算法使用 "__appSecret + 随机数 (从前端请求拿到) + timestrap(从前端请求拿到)__" 生成签名 __signature__，然后使用 `appKey + 随机数 + timestrap + signature` 作为参数向 __API 服务器__ 发送请求，获取用户 token。拿到 token 后应用服务器会将其存入数据库，最后 token 作为 http 请求结果并返回给客户端。（这里有个概念就是区分了 API 服务器和应用服务器，如果简化架构的话应用服务器和 API 服务器可以为同一个服务器）。

（3）客户端拿到的 token 后存储 token 数据，之后客户端直接使用 token 跟 IM 消息服务器通信，API 服务器只会用于用户的某次会话中最初的 token 获取。

（4）对于后续客户端获取 token 的请求，App 应用服务器直接从数据库中返回之前从 API 服务器拿到的 token。进而流程简化为：

![get_token_cache](http://nojsja.gitee.io/static-resources/images/im/get_token_cache.png)

#### 3. 客户端对 token 的本地化处理

客户端获取到 token 后，可以直接使用 token 跟应用服务器、消息服务器通信。对 token 做本地持久化存储支持后，客户端也可自行实现自动登录和登录过期逻辑。

![client_token](http://nojsja.gitee.io/static-resources/images/im/client_token.png)

#### 4. 客户端和 IM 消息服务端进行业务通信

##### （1）客户端初始化 sdk

```javascript
RongIMLib.RongIMClient.init(appkey, [options]);
```

##### （2）客户端设置状态监听器和消息监听器

必须设置监听器后，再连接 IM 消息服务器，示例代码如下：

```javascript
/* 连接状态监听器 */
RongIMClient.setConnectionStatusListener({
    onChanged: function (status) {
        // status 标识当前连接状态
        switch (status) {
            case RongIMLib.ConnectionStatus.CONNECTED:
                console.log('链接成功');
                break;
            case RongIMLib.ConnectionStatus.CONNECTING:
                console.log('正在链接');
                break;
            case RongIMLib.ConnectionStatus.DISCONNECTED:
                console.log('断开连接');
                break;
            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                console.log('其他设备登录');
                break;
            case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                console.log('域名不正确');
                break;
            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                console.log('网络不可用');
                break;
        }
    }
});

/* 消息监听器 */
RongIMClient.setOnReceiveMessageListener({
    // 接收到的消息
    onReceived: function (message) {
        // 判断消息类型
        switch(message.messageType){
            case RongIMClient.MessageType.TextMessage:
                // message.content.content => 文字内容
                break;
            case RongIMClient.MessageType.VoiceMessage:
                // message.content.content => 格式为 AMR 的音频 base64
                break;
            case RongIMClient.MessageType.ImageMessage:
                // message.content.content => 图片缩略图 base64
                // message.content.imageUri => 原图 URL
                break;
            case RongIMClient.MessageType.LocationMessage:
                // message.content.latiude => 纬度
                // message.content.longitude => 经度
                // message.content.content => 位置图片 base64
                break;
            case RongIMClient.MessageType.RichContentMessage:
                // message.content.content => 文本消息内容
                // message.content.imageUri => 图片 base64
                // message.content.url => 原图 URL
                break;
            case RongIMClient.MessageType.InformationNotificationMessage:
                // do something
                break;
            case RongIMClient.MessageType.ContactNotificationMessage:
                // do something
                break;
            case RongIMClient.MessageType.ProfileNotificationMessage:
                // do something
                break;
            case RongIMClient.MessageType.CommandNotificationMessage:
                // do something
                break;
            case RongIMClient.MessageType.CommandMessage:
                // do something
                break;
            case RongIMClient.MessageType.UnknownMessage:
                // do something
                break;
            default:
                // do something
        }
    }
});
```

##### （3）客户端连接服务器

连接消息服务器必须在执行 `RongIMLib.RongIMClient.init(appkey);` 之后调用，除监听以外所有方法都必须在调用 connect 连接服务器成功之后再调用。

- dev 开发环境下客户端可以直接写死 token 测试
- prod 生产环境下需要通过 ` 应用服务器 (App Server)` 获取 token

```javascript
// 本地调试写死或者通过应用服务器获取，dev/prod 的两种处理方式
var token = "mKmyKqTSf7aNDinwAFMnz7NXKILeV3X0+CAKgQ==";

RongIMClient.connect(token, {
    onSuccess: function(userId) {
        console.log('Connect successfully.' + userId);
    },
    onTokenIncorrect: function() {
        console.log('token 无效');
    },
    onError: function(errorCode){
        var info = '';
        switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
                info = '超时';
                break;
            case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
                info = '不可接受的协议版本';
                break;
            case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
                info = 'appkey 不正确';
                break;
            case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
                info = '服务器不可用';
                break;
        }
        console.log(info);
    }
});
```

##### （4）网络错误后客户端重新连接服务器

当网络不可用或网络断开导致客户端离线时，开发者可以手动通过 SDK 尝试重连。SDK 提供给开发者重连服务器方法 `reconnect` ，该功能内部采用定时器递归机制实现。

重连时提供两种方式，可以自行选择：

- 重连单次，调用该方法后 SDK 会尝试重连一次，如果重连成功，会触发 onSuccess 回调，如果重连失败会触发 onError 回调。
- 按照给定的重试频率数组进行自动重连，当给定的所有重试时间都用完后而服务器仍未连接上时，会携带 `NETWORK_UNAVAILABLE` 对应的错误码触发 onError 回调。

```javascript
var callback = {
    onSuccess: function(userId) {
        console.log('Reconnect successfully.' + userId);
    },
    onTokenIncorrect: function() {
        console.log('token 无效');
    },
    onError: function(errorCode){
        console.log(errorcode);
    }
};
var config = {
    // 默认 false, true 启用自动重连，启用则为必选参数
    auto: true,
    // 网络嗅探地址 [http(s)://]cdn.ronghub.com/RongIMLib-2.2.6.min.js 可选
    url: 'cdn.ronghub.com/RongIMLib-2.2.6.min.js',
    // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
    rate: [100, 1000, 3000, 6000, 10000]
};

RongIMClient.reconnect(callback, config);
```