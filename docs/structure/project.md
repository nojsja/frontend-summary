---
lang: zh-CN
title: ● 前项目梳理
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

## ➣ 前公司 Electron/Node.js 项目的监控上报方案 (dt / hz)

### 一、德拓 RhinoDisk 文件管理工具监控上报

#### 1. 错误上报平台

使用开源产品 __sentry__ 来监控 Electron 项目，sentry 的调用端 sdk 可以直接使用，一键引入并自动捕获。服务端 sdk 支持私有化部署，公司使用内部服务器部署。

#### 2. 性能分析日志

因为 Electron 平台应用在用户端的表现相似，因此可以直接由开发人员在测试机上进行性能定位，测试机可以选用多组具有特定特性的 PC，比如有些 PC 内存小，另一些 CPU 速度慢。

具体性能分析日志捕获方面，使用 `v8-inspect-profiler` 捕获主进程在一段时间内的 cpu 活动记录，并生成 `.cpuprofile` 文件。 `cpuprofile` 文件可以被浏览器 devtools 工具导入解析，解析后可以度量代码中每个操作具体占用的时间量，是一种有效的时间占用量化方式。

另外个人开发了一个用于 Electron 进程性能和日志监控的辅助工具 [electron-re](https://github.com/nojsja/electron-re)，它可以用于开发者在生产环境和开发环境之间观察主进程、渲染进程、子进程的 CPU / Memory 占用情况。工具提供一种一键开启 Service 服务的机制，Service 中可以存放占用CPU的代码。工具还提供了一个支持负载均衡的 Node.js 进程池，方便一些需要多进程架构支持的应用使用。同时借助工具提供的 MessageChannel 请求发送函数也能实现 Service / Main Process / Renderer Process 相互通信。

#### 3. 持续构建

在个人 Electron 项目中会使用 github `workflow` (actions) 进行自动构建和发布。

每个项目可以通过一个 `.workflow` 文件指定需要运行打包命令的 __操作系统版本__ (并行打包，容器机制)、指定打包环境的 __安装脚本__、指定具体的 __打包流程命令__。打包完成后可以通过 electron-builder 的 publish 命令自动发布到 github releases (draft)。

正式发布前，可以自行下载 draft releases 中的安装包进行测试，测试通过后点击发布，填写发布说明即可。

#### 4. 应用更新

在个人 Electron 项目中，使用 `electron-updater` 进行自动。`electron-updater` 依赖于之前构建时自动上传的 `release-info`，`electron-updater` 会自动对比应用本地版本和服务器版本，并且自动下载更新文件。

如果觉得 github 作为 release 服务器太慢也可以在使用 `electron-updater` 时传入自定义静态服务器地址，所有打包后的文件和版本信息同样需要上传到自定义服务器中。

### 二、慧择 Node.js 中间层监控上报

公司有自研的错误上报 sdk 端以及 后端服务，包含接口调用日志、自定义错误和自动捕获的错误上报。错误捕获后会发送给公司的告警平台，操作人员收到告警后可以登录错误上报平台查看日志和定位错误，管理者可以将错误分派给开发人员进行定位解决。

除了一般的错误信息也支持前端界面 Performance 性能信息的上报，比如：页面打开速度、页面渲染情况、DSN 连接速度、HTTP 握手速度等。

## ➣ 前公司 dview 项目的前端部分架构 (dt)

重构之前

前端外层 nginx 负责客户端的访问控制，同时 nginx 作为 node 访问后端服务时的 router。

#### 前端

web static -> nginx -> node proxy -> cluster nodes

#### 后端

云平台微服务

## ➣ 前公司 dview 项目采用 Node.js 作为网关代理的原因 (dt)

web 静态资源由主机的 nginx 托管，提供给用户静态页面服务。

nodejs 作为一个业务网关的角色，相当于一个聚合服务，面向网页端提供统一的接口访问和权限控制。后端各个服务可能访问方式和返回的数据格式存在不统一性，因此 Node.js 这边还会进行一下统一处理，以规范网页端的 API 调用。

在对象存储和数据湖子项目中，Node.js 会承担请求签名的职责，前端通过 nodejs 来访问对象存储原生接口。

Node.js 在中间层也可以进入 mock 模式，将前端的接口转发到 yapi 接口模拟服务上，前端可以做到无缝开发和接口对接。

另一方面，该分布式存储产品大部分场景下，是以封闭的本地集群模式来访问的，不对外提供平台服务。因此需要支持 IP 直接访问集群节点的模式，因此 Node.js 也在这个场景下作为一个跳板机，解决了一些前端跨域访问的问题。

在其它方面，中间层还提供近期请求日志记录功能可以用于紧急排查问题。

## ➣ 前公司中间层使用 lerna 进行 mono repo 改造的原因 (dt)

首先这个中间层作为聚合服务云平台的业务网关，它承担着多个子项目的网关角色。

为了对多个子项目和公共项目的版本解耦，我们把这些子项目 + 公共项目的代码拆分为多个 npm 仓库，同时为了更好的管理这些子项目，采用了 mono repo 方式。不解耦前各个发布的大版本都只能对应固定最新版本的子应用，现在可以做到子应用版本分离，子应用和 runtime 环境任意组合。

使用 lerna 后在开发调试时就不用手动进行 npm link 操作，发布版本时也无需手动更新版本依赖。同时 npm 项目依赖模块的安装也在同一个仓库下，减少了重复安装的情况。

同时值得说明的是，生产环境下中间层在 linux 主机上运行着多个实例，服务意外宕机后可以由 pm2 自动重启。而一个本地存储集群对应着多个 linux 主机，单个主机宕机后可以访问其它主机。

虽然进行了仓库拆分，但是运行环境却是一个，也就是采用了微件化思想，将多个子项目和公用项目通过 ncc 编译成一些代码 trunk，实现代码层面的拆分。

正式发布一个版本 release 时，通过将打包后的各个子项目的 trunk 文件组合在一起放到基座项目(runtime)的指定目录下才能发布完整包。生产环境中，通过 pm2 运行多个 node.js 实例，基座项目启动起来后会加载指定目录下的各个子项目代码。

## ➣ 前公司 cicd 改造 (dt)

jenkens 服务端监控 git 分支内容变更，然后拉取远程分支，jenkens 服务端上有打包 bash 脚本，然后就自动构建 rpm 包，构建完成后将最新的 rpm 包复制到其他环境，运维人员到其他环境上取 rpm 包。
## ➣ 前公司多文件分片上传项目 (dt)

涉及多文件分片上传的总共有 2 个项目，一个是集群对象存储的文件分片上传 Web 端，另一个是集群 smb 存储的文件分片上传 Electron 端。

### 一、对象存储文件分片上传 Web 端

集群有个对象存储服务，用户访问对象存储服务的 Client 端，使用 access_key 和 access_token 进行登录，登录之后可以访问到多个对象存储桶，设置桶的基本信息、访问权限、桶内文件多版本处理、桶的生命周期等。进入到某个对象存储桶之后，可以查看文件列表、上传文件、删除文件、下载文件等操作。

#### 1. 文件分片上传的原理

使用 `<Input />` 标签获取用户选择的多个文件对象 `File`，File 对象是特殊类型的 Blob，且可以用在任意的 Blob 类型的 context 中。比如说：FileReader, URL.createObjectURL(), createImageBitmap(), 及 XMLHttpRequest.send() 都能处理 Blob 和 File。

每个文件上传对象有一些自己的属性，比如 `name`、`size`、`lastModified`、`lastModifiedDate`、`webkitRelativePath`，这些属性都是可以获取到的。

获取到 `FileList` 之后可以创建多个文件上传任务对象放入文件上传队列中，每个文件上传任务包含以下属性：

- type: 文件类型, 如 `image/jpeg`，从 File 对象中拿到的 mime type 属性。
- name：文件名，从 File 对象中拿到的 name 属性。
- size：文件大小，从 File 对象中拿到的 size 属性。
- blockSize: 文件分片大小，外部设置的分片大小，默认可以设置为4-8M。
- index：文件分片索引，从 0 开始，每个文件分片上传任务都有一个唯一的索引，指代当前上传到了第几个分片。
- date：任务创建时间，初始化文件分片上传任务时设置。
- speed：任务上传速度，根据每个分片上传的事件和分片大小计算出来，值会动态变化。
- hash: 文件分片的哈希值数组，每个分片上传成功后会返回到web端，web端将其存储在 hash 数组中，最后合并分片为一个完整文件时会用于校验文件分片是否完整。
- origin：原始文件对象，从用户选择的文件列表中拿到的原始文件对象，用于调用其进行原始文件切割。

文件分片是通过 `Blob.slice([start[, end[, contentType]]])` API，返回一个新的 Blob 对象，它包含有源 Blob 对象中指定范围内的数据。

文件分片通过一个 HTTP 请求上传，请求编码使用 `multipart/form-data`，分片上传完成后 服务端会返回一个分片的 md5 值，web端再通过 `spark.md5` 库计算当前分片的 md5 值是否和服务端返回的一致。一致的话当前分片上传成功，将 md5 值放入 hash 数组，同时上传索引值加一，继续上传下一个分片。

#### 2. 文件断点续传的原理

如果未刷新界面，遇到文件上传错误的情况，可以直接点击续传，因为每个分片任务里存储了分片上传的索引值，重传时根据索引值和分片大小计算出上传的起始位置，从上次上传失败的位置开始上传。

如果刷新了界面，未上传完成的任务可以通过任务列表获取。当我们重新选择的文件进行上传任务初始化时，如果这个文件的 md5 值和之前未上传完成的文件 md5 值一致的话，那么服务端就会认为这个文件之前已经上传过一部分，执行续传逻辑，服务端会返回这个文件之前上传过得分片 hash 信息、分片索引以及其它任务信息。否则服务端会认为这个文件上传任务是全新的，需要从文件起始位置开始上传。

### 二、smb 存储文件分片上传 Web 端

集群的 smb 存储服务本身只是一个简单的文件存储服务，它不支持断点续传，所以我们需要自己实现断点续传。

我首先调研了 npm 仓库有没有想关的 smb 协议分片上传的库，发现目前还没有这种库，因此我们换了一种思路将集群远端的 smb 共享挂载到操作系统的本地目录。挂载到本地之后，就可以直接使用 Node.js 的 `File` 操作将本地目录中的某个文件直接拷贝到本地的 smb 共享目录中。

拷贝到远程目录这个操作虽然看似只是文件操作，但是底层还是会经过远程发送请求这个过程。因此在 Electron 端仍然需要自己来实现断点续传和分片校验。

Electron 端因为可以直接支持本地数据持久化，因此所有的文件分片上传任务都会最终持久化存储到磁盘中，这样就可以在下次启动时直接从磁盘中读取上传任务，进行断点续传。但是文件上传任务会首先在内存中创建，在某个阶段的任务上传完毕后，内存中的任务会逐个同步到磁盘中。

单个文件上传任务分为文件任务初始化、文件任务上传、文件任务完成三个阶段：
- 文件任务初始化：对于磁盘中已存在的文件，前端会给出提示是否覆盖。对于重复上传未完成的文件，会进行自动续传。对于需要新上传文件，会初始化一个全新的文件上传任务。
- 文件任务上传：根据分片索引和分片大小进行递归的文件递增写入操作，直到文件写入完成。
- 文件任务完成：文件写入完成后，会将所有文件分片的 md5 值进行校验，如果校验失败，则会告诉前端哪个分片上传失败了需要重传。

## ➣ 前公司投保系统后台系统的 React 组件优化点

项目采用 Antd-pro 框架，Antd-pro 框架使用了 [rc-field-form](https://github.com/react-component/field-form) 开源表单组件，表单方面遵循其编写方式，可以实现表单的联动控制、错误提示、错误校验等。

### 一、JSON 配置化头部搜索条件组件实现原理

很多数据查询页面会有一个头部搜索条件组件，用户通过这个条件组件自由选择很多搜索条件组合，以用于查找不同的检索结果。

我将搜索条件渲染整体封装成了高阶组件，支持传入一段 JSON 配置，每个配置项都有一个 type 类型，对应一个预先封装好的搜索组合项，比如：input + label，select + label，checkbox + label，radio + label 等等。这个高阶组件负责将 JSON 配置渲染为完整的搜索头部组件。

各个搜索条件项组件之间支持简单的联动控制，因为使用了 Antd 的 FormItem，支持给每个 FormItem 传入 deps 依赖，组件数据更新时 Antd 会进行简单的联动渲染。

同时为了满足稍微复杂的应用场景，组件支持外部传入 formRef 进行 form 字段的自定义更新，开发者通过 onChange 监听函数监听某个字段更新，然后使用外部 formRef.setFieldsValue联动更新另个字段的值。

如果要针对复杂数据流的更新的话，需要做进一步封装，使用拓扑排序算法，计算每个数据节点的入度和出度，然后按照入度出度排序，最后按照排序的顺序依次更新数据，防止不必要的组件多次渲染。

### 二、重复页面复用性优化原理

产品中存在多个类似的保单搜索界面，比如：异常单、批单、投保单、待出单、已出单等。各个保单界面主要有一下几部分组成：
- 头部搜索条件组件
- 保单表格组件
- 保单每行的 action 组件，用于操作当前行数据，比如：查看、编辑、删除等等。

头部搜索组件通过上诉说明已经可以实现自由配置组合。保单表格组件中每一行数据会有大量的重复字段，比如：保单号、保单状态、投保人、被保人、时间、费率等等，如果完全手写也是不小的工作量，且编写方式不灵活。因此我考虑将各个重复字段也抽离到 json 映射中，开发人员通过在 json 数组就可以组合一个表格所需要的字段，以此实现灵活配置。

表格数据配置化后，每个表格项的操作 Action 组件也被单独抽离和封装在一起，不同的 pageType 页面类型使用不同的 Action 组件。

以上实现了整个页面的完全配置化重组。

### 三、JSON 配置化表单组件实现原理

保单界面有很多静态展示字段，字段之间没有联动。封装了一个公用渲染组件，使用方式可以是直接传入一段 JSON 配置，配置里有很多键值对，每个键值对都是一个表单字段。组件可以将 JSON 配置映射为 React 代码，减少了前端 ctrl-c / ctrl-v 的负担。

同时这个组件也向外部暴露了 header / body 等结构性组件，外部可以自定义传入自己编写的组件到 header / body 中实现样式的统一。

### 四、富文本编辑组件的渲染优化

有些界面需要对表格中多个字段进行富文本编辑，表格渲染的元素任意一个用户操作太多时会导致页面卡顿。

使用了一下渲染优化方案：

- 使用 React.memo 进行组件的重复无效渲染优化。
- 使用高阶组件的形式，并以非可控模式（不使用父组件的 state 来控制子组件的 state）对富文本组件进行一层装饰封装。非可控模式下富文本组件的性能更好，并且封装后也能满足业务需求。
- 使用函数去抖思想减少快速录入字符时的频繁渲染。

## ➣ 前公司 cicd 系统的架构和原理 (hz)

1. 底层基于 k8s 容器化，生产环境的应用可以在线缩容扩容服务节点，版本发布时可以做到无下线热替换。
2. 有一个 k8s 服务创建界面，可以创建 `Java / Nodejs / Nodejs_static / Python / Static_web` 服务，之后这里创建的服务需要绑定到构建流水线。
3. 每个项目可以创建自己的流水线并绑定之前创建的 k8s 微服务，流水线分为 `dev / test / preview / prod` 流水线。每次流水线构建完成之后会将打包结果生成为一个镜像，与应用绑定的 k8s 容器会引用这个最新的构建镜像。
4. 有一个 nginx 配置系统，外层多个 nginx 服务指向不同的环境：`dev / test / preview / prod`，各个环境 nginx 配置可以进行同步。公司有一些已经备案的主域名，并且每个环境 nginx 配置下的可以配置很多子域名 (无需备案) 指向各个 k8s 应用，外部使用子域名访问网关时，网关就会根据域名将用户导航到相应的应用上。单个 k8s 容器实例内部可以自定义内部 nginx 的 `static file` 路径和其它配置比如：为了适配 React 的 BrowserRouter 可以设置 `location /` - `try_files $uri $uri/ /index.html`，这样子以非根路由访问 React 网页时，如果路由在服务端没有映射到一个静态文件上，那么就会直接返回 index.html，客户端 Router 就可以根据路由路径正确渲染配置的单页应用的指定界面。
5. 示例说明：一个不依赖于 Node 的 Static_web 前端项目 ，需要在某个环境下的 nginx 主域名下指定一个 ` 子域名 ` 与其绑定，具体操作就是将这个子域名 nginx 配置里面的 root 路径 `location /` 指向一个 nginx `upstream` 上游配置，这个上游配置即 k8s 内部 `Static_web` 服务对应集群容器外部部 IP。另外可以配置 ` 子域名 / api` 指向后端另一个 service 微服务网关之类的服务用于接口调用。

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

每个通信消息都由 header + body 编码方式 + body 构成，采用二进制字节流进行传输：

- __header__：用于运算的 int8 数字，header 部分采用自定义算法进行编解码。header 即一个 `int8` 数字 (占 8bit，范围 0-255) 表示各种具有不同参数的 header 实例。位于消息体第一个字节。

- __编码方式__：用于表示 body 体具体使用的 protobuf 编码方式，因为可能同一种消息存在多个编码方式，比如 QueryAckMessage 可能会根据 QueryMessage 指定的内容返回会话列表、新消息列表或历史消息列表等等。位于消息体第二个字节。

- __body__：二进制字节流数据，会使用某种 protobuf 编码方式解析。与常见的 xml 和 json 数据类型不同，xml 和 json 只会把具有一定内容组织的数据格式编码成字符串，然后把明文字符串交给底层的加密层、传输层进行处理和分包之类的。而 Protobuf 是把数据通过独特的 key 映射方式压缩成更短的 byte 流再交给传输层进行传输。

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

#### 11. Ack 响应消息是怎样和请求消息的处理流程建立联系的

首先理清一个概念，messageId 和 messageUId，messageId 是前端需要的一个临时性的唯一 Id，在用户登录到 IM 软件到退出会话的整个流程中需要保证是唯一的。而 messageUId 是后端具体存储的可以用于指代和查询某条消息的唯一真实 ID，在后端存储中它也是唯一不可重复的。

通常 SDK 发出一个查询消息，后端之后会异步返回另一条消息来送回查询数据，这整个过程是完全独立的，而不是像 Axios 请求库一样，发出请求后拿到一个 Promise 响应后拿到请求结果。Websocket 是全双工的，消息之间不能根据顺序进行一一对应，因此前端的 messageId 是用于建立两条相互关联的请求 / 响应消息的脐带。换而言之后端在返回数据的响应中也会有之前请求的 messageId，他们值是相同的。

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

## ➣ Electron 进程管理器的架构和亮点

架构：

![electron-re](http://nojsja.gitee.io/static-resources/images/electron-re/electron-re_arch.png)

### 一、ProcessManager

进程管理中心，一方面调用外部库 `pidusage` 进行各个已监听进程的资源循环采集，另一方面负责和 UI 部分通信，响应 UI 部分的控制逻辑比如：关闭进程、打开渲染进程 DevTools。同时 ProcessManager 还会将自己采集到的 Memory/CPU 资源占用数据发送给 UI 部分，以便 UI 部分进行即时渲染。

### 二、MessageChannel

主进程 MessageChannel 用于注册 Service 和提供 Service 查询服务。子进程的 MessageChannel 会向主进程 MessageChannel 查询注册的 Service ID，然后在子进程中可以通过 Service ID 和对应的 Service 通信。

### 三、BrowserService

BrowserService 中能放入一些独立于主进程的比较占用 CPU 的代码逻辑，当然也可以单纯基于业务进行 Service 代码划分。有了 BrowserService 就不用我们手动创建多个隐藏的 BrowserWindow 实例来运行部分业务代码了。

底层实现为一个允许 Node 注入和远程调用的 BrowserWindow 实例。只不过采用了 dataURL 的方式将 js 脚本注入到页面模板中，从而不必手动声明 .html 文件。

开发环境下内部通过 `inject scripts` 的方式注入了一些代码和主进程的 file watcher 通信，以实现代码更新后 Service 重启。

利用了 `remote.require` 的方式让 Service 中的脚本可以无缝调用主进程方法。因为用到了 Electron Renderer Process 远程调用的特性，因此在 Service 内部对 remote 进行了 polyfill，以便在高于 13 版本的 Electron 中能正常运行 BrowserService。

### 四、ChildProcessPool

一个基于 Node.js `ChildProcess.fork` 实现的多进程池逻辑，内部支持多种负载均衡算法：比如权重、随机、轮询、加权轮询、加权随机等，子进程在创建后一段时间未使用时会自动进行 sleep 睡眠状态，有新消息时会自动被唤醒。

子进程使用一个 js 文件创建，内部可以和 `ProcessHost` 通信，而不必直接使用 process.send 和 process.on('message') 来进行消息通信。

`ProcessHost` 相当于一个事件注册中心，以观察者模式提供服务，子进程向自己的 ProcessHost 注册时间，然后主进程向子进程发送消息时 ProcessHost 感知并进行捕获 `message` 事件，然后将传递的数据发送给监听者。

#### 1. 进程睡眠的实现

每个进程池有自己的生命周期实例：`ProcessLifeCycle`，进程池在向子进程发送消息时会实时更新实例上子进程的被调用时间。实例中维持着一个 30s 的定时器，定期检查所有子进程是否在超时时间内，超时时间即子进程未被主进程调用的最大空闲时间，如果超时触发 `sleep` 事件，进程池作为事件监听者会执行对应子进程的睡眠逻辑。

睡眠的实现依赖操作系统的 `SIGSTOP` 进程信号，子进程收到该信号后会被冻结，直到下次收到消息时会再次被唤醒然后处理新消息。

#### 2. 负载均衡策略


- 支持的策略：
  - POLLING - 轮询：子进程轮流处理请求
  - WEIGHTS - 权重：子进程根据设置的权重来处理请求
  - RANDOM - 随机：子进程随机处理请求
  - SPECIFY - 指定：子进程根据指定的进程 id 处理请求
  - WEIGHTS_POLLING - 权重轮询：权重轮询策略与轮询策略类似，但是权重轮询策略会根据权重来计算子进程的轮询次数，从而稳定每个子进程的平均处理请求数量。
  - WEIGHTS_RANDOM - 权重随机：权重随机策略与随机策略类似，但是权重随机策略会根据权重来计算子进程的随机次数，从而稳定每个子进程的平均处理请求数量。
  - MINIMUM_CONNECTION - 最小连接数：选择子进程上具有最小连接活动数量的子进程处理请求。
  - WEIGHTS_MINIMUM_CONNECTION - 权重最小连接数：权重最小连接数策略与最小连接数策略类似，不过各个子进程被选中的概率由连接数和权重共同决定。

- 实现：
  - 轮询策略 (POLLING)：索引值递增，每次调用时会自动加 1，超出任务数组长度时会自动取模，保证平均调用。时间复杂度 O(n) = 1。
  - 权重策略 (WEIGHTS)：每个进程根据 (权重值 + (权重总和 * 随机因子)) 生成最终计算值，最终计算值中的最大值被命中。时间复杂度 O(n) = n。
  - 随机策略 (RANDOM)：随机函数在 [0, length) 中任意选取一个索引即可。时间复杂度 O(n) = 1。
  - 权重轮询策略 (WEIGHTS_POLLING)：类似轮询策略，不过轮询的区间为：[最小权重值, 权重总和]，根据各项权重累加值进行命中区间计算。每次调用时权重索引会自动加 1，超出权重总和时会自动取模。时间复杂度 O(n) = n。
  - 权重随机策略 (WEIGHTS_RANDOM)：由 (权重总和 * 随机因子) 产生计算值，将各项权重值与其相减，第一个不大于零的最终值即被命中。时间复杂度 O(n) = n。
  - 最小连接数策略 (MINIMUM_CONNECTION)：直接选择当前连接数最小的项即可。时间复杂度 O(n) = n。
  - 权重最小连接数 (WEIGHTS_MINIMUM_CONNECTION)：权重 + ( 随机因子 * 权重总和 ) + ( 连接数占比 * 权重总和 ) 三个因子，计算出最终值，根据最终值的大小进行比较，最小值所代表项即被命中。
  时间复杂度 O(n) = n。

- 用于负载均衡器 LoadBalancer 计算的参数：
  - 权重值：每个子进程的权重值，创建进程池时可以指定 `weights` 数组，默认为 1。
  - 索引值：用于轮询相关的策略，均衡器内部会在每次执行负载均衡计算后更新索引，索引会被索引最大值取模，索引最大值可以为权重和、子进程数量。
  - CPU/Memory：负载均衡器作为监听者监听 `ProcessManager` 的 `refresh` 事件更新各个子进程的资源占用情况。
  - 子进程正在处理的任务数量（连接数）：由于此值无法精确度量，因此借用进程池 `send` 方法 和 `message` 事件粗率估计子进程中实时进行的任务数量，调用 send ，task 数量加 1，收到子进程 message 事件，task 数量减 1。

#### 3. 进程互斥基本原理

AsyncLock 对象需要在子进程中引入，创建 AsyncLock 的构造函数中有一个参数 sab 需要注意。这个参数是一个 SharedArrayBuffer 共享数据块，这个共享数据快需要在主进程创建，然后通过 IPC 通信发送到各个子进程，通常 IPC 通信会序列化一般的诸如 Object / Array 等数据，导致消息接受者和消息发送者拿到的不是同一个对象，但是经由 IPC 发送的 SharedArrayBuffer 对象却会指向同一个内存块。

在子进程中使用 SharedArrayBuffer 数据创建 AsyncLock 实例后，任意一个子进程对共享数据的修改都会导致其它进程内指向这块内存的 SharedArrayBuffer 数据内容变化，这就是我们使用它实现进程锁的基本要点。

先对 Atomic API 做个简单说明：

- __Atomics.compareExchange(typedArray, index, expectedValue, newValue)__：Atomics.compareExchange() 静态方法会在数组的值与期望值相等的时候，将给定的替换值替换掉数组上的值，然后返回旧值。此原子操作保证在写上修改的值之前不会发生其他写操作。
- __Atomics.waitAsync(typedArray, index, value[, timeout])__：静态方法 Atomics.wait() 确保了一个在 Int32Array 数组中给定位置的值没有发生变化且仍然是给定的值时进程将会睡眠，直到被唤醒或超时。该方法返回一个字符串，值为 "ok", “not-equal”, 或 “timed-out” 之一。
- __Atomics.notify(typedArray, index[, count])__：静态方法 Atomics.notify() 唤醒指定数量的在等待队列中休眠的进程，不指定 count 时默认唤醒所有。

AsyncLock 即异步锁，等待锁释放的时候不会阻塞主线程。主要关注 executeAfterLocked() 这个方法，调用该方法并传入回调函数，该回调函数会在锁被获取后执行，并且在执行完毕后自动释放锁。其中一步的关键就是 tryGetLock() 函数，它返回了一个 Promise 对象，因此我们等待锁释放的逻辑在微任务队列中执行而并不阻塞主线程。

### 五、BrowserWindow

原生 BrowserWindow 实例，可以使用 MessageChannel 来替代原生 IPC 通信。

### 六、UI 监控界面

UI 部分主要用于显示各个在 ProcessManager 中注册的进程的资源占用情况，比如：Memory/CPU 使用情况、进程类型、查看进程控制台、查看 MessageChannel 的通信记录、杀死子进程、打开渲染进程 Devtools 等功能。

进程类型包括几种：BroserServer、渲染进程 BroserWindow、主进程、进程池子进程 ChildProcess。如果开启了 Devtools 还会显示 Devtools 对应的进程。

## ➣ shadowsocks-electron 代理软件的难点和亮点

一个跨平台网络代理工具，基于 shadowsocks 通信库实现，可实现网络 socks5 代理、http(s) 代理、系统代理设置、服务器配置二维码导入。

### 一、功能亮点

- 使用 React / Typescript / Material UI 开发。
- 跨平台，支持 Windows、Mac、Linux。
- 利用 Node.js `http` 模块 实现了 http / https 代理
- 利用 Node.js `net` 模块实现了 server ping 功能。
- 利用 Node.js `net.Socket` 模块实现了端口号占用检测功能。
- 一键设置系统 Proxy 和 PAC 模式。
- 利用 Electron 截图 API 获取了图片像素数组并进行分析实现了屏幕二维码读取并导入服务器配置功能。
- SSR / SS 代理功能是通过子进程的方式调用平台原生 bin 文件实现的，Electron 层做了代理封装，以处理各种异常情况和启停控制。

### 二、难点解析

#### 1. http / https 代理的实现原理

Node.js 使用 http 模块创建个代理服务器，代理服务器可视为隧道网关。它通过监听来自客户端的 `connect` 请求事件，解析出目标服务器地址和端口信息，然后建立 TCP 连接到目标服务器。一旦建立了 TCP 连接，就将服务端连接的 Socket 对象通过 `pipe` 管道的方式连接到客户端响应的 Socket 对象上。代理服务器然后向服务器端 Socket 写入客户端请求的 header 数据，同时向客户端 Socket 写入一条 `HTTP 200 Connection Established` 响应来通知客户端连接成功。最后，HTTP 隧道就在客户端和目标服务器端建立起来了。

之后，客户端通过 HTTP 代理服务器的所有数据都会被直接转发给 HTTP 隧道，服务器发送的所有数据都会通过 HTTP 隧道转发给客户端。

由于 HTTP 隧道工作在传输层，整个流程中转服务器不需要加密 / 解密客户端的请求携带数据，只需要通过 TCP Socket 转发数据即可，因此可以绕过 HTTPS 请求的安全层 TLS/SSL 进行数据盲转。

```javascript
/**
    * connect [HTTP CONNECT method for https proxy]
    * @author nojsja
    * @param  {http.IncomingMessage} request [request]
    * @param  {Duplex} cSocket [cSocket]
    * @param  {Buffer} head [head]
    * @return {void}
    */
  private connect = (request: http.IncomingMessage, cSocket: Duplex, head: Buffer) => {
    const u = url.parse('http://' + request.url)
    const {agentConf} = this;
    const options = {
      command: 'connect',
      proxy: agentConf,
      target: {host: u.hostname, port: u.port},
    };

    socks.createConnection(options, (error: Error | null, pSocket: Duplex) => {
      if (error) {
        cSocket.write(`HTTP/${request.httpVersion} 500 Connection error\r\n\r\n`);
        return;
      }
      pSocket.pipe(cSocket);
      cSocket.pipe(pSocket);
      pSocket.write(head);
      cSocket.write(`HTTP/${request.httpVersion} 200 Connection established\r\n\r\n`)
      pSocket.resume();
    });

    /* 不使用外部 socks5 协议绕过流量检测版本代码
      const serverSocket = net.connect(port || 80, hostname, () => {
        clientSocket.write('HTTP/1.1 200 Connection Established\r\n' +
                        'Proxy-agent: Node.js-Proxy\r\n' +
                        '\r\n');
        serverSocket.write(head);
        serverSocket.pipe(pSocket);
        pSocket.pipe(serverSocket);
      });
    */
  }

```

#### 2. 截屏读取二维码导入配置的原理

扫描屏幕二维码导入功能实现起来稍复杂些。

第一步：先使用 Electron 自带 desktopCapture API 获取桌面截图文件：

```javascript
import {desktopCapturer} from 'electron';
...
/* 获取桌面截图 */
export function getScreenCapturedResources(): Promise<Electron.DesktopCapturerSource[]> {
  return desktopCapturer.getSources({
    types: ['screen'],
    thumbnailSize: {
      width: window.screen.width * window.devicePixelRatio,
      height: window.screen.height * window.devicePixelRatio
    }
  });
}
```

第二步：将截图数据转换成 bitmap 位图格式 (存储像素点颜色和透明度的数组 [r,g,b,a …])，然后使用 jsqr 库解析位图中的二维码信息，最终会得到二维码位于屏幕中的坐标、宽度和文本值等信息：


```javascript
/* 解析位图数据 */
export const getQrCodeFromScreenResources = (callback?: (added: boolean) => void): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch) => {
    getScreenCapturedResources().then((resources: Electron.DesktopCapturerSource[]) => {
      // 可能有多个屏幕资源
      if (resources && resources.length) {
        const qrs: {x: number, y: number, width: number, height: number}[] = [];
        const values: string[] = [];
        resources.forEach(resource => {
          const size = resource.thumbnail.getSize();
          // 使用截图的位图信息进行解析
          const capturedData = jsqr(resource.thumbnail.getBitmap() as any, size.width, size.height);
          if (capturedData && capturedData.data) {
            values.push(capturedData.data);
            // 保存多个二维码的坐标、宽高和文本值信息
            qrs.push({
              x: capturedData.location.topLeftCorner.x,
              y: capturedData.location.topLeftCorner.y,
              width: capturedData.location.topRightCorner.x - capturedData.location.topLeftCorner.x,
              height: capturedData.location.bottomLeftCorner.y - capturedData.location.topLeftCorner.y,
            });
          }
        });
        // 保存 qrs 二维码数据并发送数据到主进程进行其它操作
        ...
        callback && callback(!!qrs.length);
      } else {
        callback && callback(false);
      }
    });
  }
};
```

第三步：发送二维码数据到主进程，主进程根据坐标和宽高信息生成办透明的全屏窗口 (截图遮罩层)，并在透明窗口加载的 js 文件中根据二维码坐标信息用 canvas 绘制高亮捕获区域：

```javascript
/* ------ 主进程中创建透明窗口 ------ */
import {app, BrowserWindow screen} from "electron";
const screenSize = screen.getPrimaryDisplay().workAreaSize;
const twin = new BrowserWindow({
    width: screenSize.width,
    height: screenSize.height,
    transparent: true, // 透明
    alwaysOnTop: true, // 置顶
    fullscreen: true, // 全屏
    frame: false, // 无边框
    titleBarStyle: 'hidden', // 隐藏标题栏
    ...
});
twin.loadURL('path/to/html');


/* ------ 渲染进程中绘制高亮二维码区域 ------ */
const {ipcRenderer} = require('electron');
const screenWidth = window.screen.availWidth * window.devicePixelRatio;
const screenHeight = window.screen.availHeight * window.devicePixelRatio;
const $drawer = document.querySelector('#drawer');
$drawer.width = screenWidth;
$drawer.height = screenHeight;
if (!drawer) return;

const ctx = drawer.getContext('2d');
const {x, y, width, height} = p;
if (ctx) {
  // 全屏填充半透明背景色
  ctx.fillStyle = 'rgba(0, 0, 0, .3)';
  ctx.fillRect(0, 0, drawer.width, drawer.height);
  // 高亮二维码捕获区域
  ctx.fillStyle = 'rgba(255, 0, 0, .4)';
  ctx.fillRect(x, y, width, height);
}
```

#### 3. 端口占用检测逻辑的原理

使用 `net.Socket` API 尝试建立一条到目标 `host:port` 的 socket 连接，如果成功连接上了表明端口被占用，如果连接错误或超时表明端口未被占用。

```javascript
import net from 'net';

const {Socket} = net;

type ReturnType = {
  isInUse: boolean,
  error: string | null
};

const socketConnect = (port: number, host: string, timeout: number = 1e3): Promise<ReturnType> => {
  return new Promise(resolve => {
    const socket = new Socket();
    let status = '';
    let isInUse = false;

    socket.setTimeout(timeout)
    socket.on('timeout', () => {
      socket.destroy();
    });
    socket.on('error', (err: { code: string}) => {
      isInUse = false;
    });

    socket.on('connect', function () {
      isInUse = true;
      socket.destroy();
    });

    socket.on('close', () => {
      if (status) {
        resolve({
          isInUse,
          error: status
        });
      } else {
        resolve({
          isInUse,
          error: null
        });
      }
    });

    socket.connect({
      port,
      host
    });
  });
}

const checkPortInUse = (
  ports: number[], host: string, timeout?: number
): Promise<ReturnType[]> => {
  return Promise.all(
    ports.map(port => socketConnect(port, host, timeout))
  );
};

export default checkPortInUse;
```

#### 4. tcp ping 逻辑的实现原理

封装一个 `tcpConnect` 方法，内部使用 `net.createConnection` API 创建一个到目标服务器的 TCP 连接。连接成功后使用 `process.hrtime` 获取连接建立所需的高精度时间，最后关闭这次打开的 TCP 连接。

调用 10 次 `tcpConnect` 方法发送多个 TCP 连接请求，所有请求均返回后计算平均连接时间，并返回结果。

```javascript
const net = require('net');

...

const tcpPing = (options: pingOptions): Promise<[pingResult, connectResult[]]> => {
  const results: connectResult[] = [];
  const result: pingResult = {
    max: 0, min: 0, ave: 0, failed: 0
  };

  const count = options.count ?? 8;

  return new Promise(resolve => {
    const callback = (error: Error | null, delay: number) => {
      results.push({
        error, delay
      });

      if (results.length === count) {
        results.forEach((item, index) => {
          if (item.error) {
            result.failed += 1
          } else {
            result.ave += item.delay;
            if (item.delay> result.max) result.max = item.delay;
            if (item.delay < result.min || result.min === 0) result.min = item.delay;
          }

          if (index === count - 1) {
            result.ave = +(result.ave / (count - result.failed)).toFixed(0);
            resolve([result, results]);
          }

        });
      }
    };

    new Array(count).fill(0).forEach((_, i) => {
      setTimeout(() => {
        tcpConnect(options, callback)
      }, i * 100);
    });
  });

};

const tcpConnect = (options: pingOptions, callback: (error: Error | null, delay: number) => void) => {
  const startTime = process.hrtime();
  let timer: NodeJS.Timeout;
  let isEnd = false;

  const client = net.createConnection({host: options.host, port: options.port}, () => {
    isEnd = true;
    clearTimeout(timer);
    client.end();
    callback(null, Math.round(process.hrtime(startTime)[1] / 1e6))
  });
  timer = setTimeout(() => {
    client.end();
    callback(new Error('Timeout'), 0)
  }, options.timeout ?? 500);
  client.on('data', () => {
    client.end();
  });
  client.on('error', (err: Error) => {
    if (!isEnd) {
      callback(err, 0);
    }
  });
  client.on('end', () => {
    isEnd = true;
  });
};

export default tcpPing;
```