---
lang: zh-CN
title: ● http 优化
description: optimization 的描述
---

## ➣ 使用资源预取技术

### 一、Preload

Preload 是一个新的控制特定资源如何被加载的新的 Web 标准，这是已经在 2016 年 1 月废弃的 subresource prefetch 的升级版。这个指令可以在 `<link>` 中使用，比如 `<link rel="preload">`。一般来说，最好使用 preload 来加载你最重要的资源，比如图像，CSS，JavaScript 和字体文件。这不要与浏览器预加载混淆，浏览器预加载只预先加载在HTML中声明的资源。preload 指令事实上克服了这个限制并且 **允许预加载在 CSS 和 JavaScript 中定义的资源，并允许决定何时应用每个资源。**

Preload 与 Prefetch 不同的地方就是它专注于 **当前的页面**，并以 **高优先级** 加载资源，Prefetch 专注于下一个页面将要加载的资源并以低优先级加载。同时也要注意 preload 并不会阻塞 window 的 `onload` 事件。

```html
<link rel="preload" href="/path/to/style.css" as="style">
```

#### 使用 Preload 的好处

使用 preload 指令的好处包括：

- 允许浏览器来**设定资源加载的优先级**因此可以允许前端开发者来优化指定资源的加载。
- 赋予浏览器**决定资源类型**的能力，因此它能分辨这个资源在以后是否可以重复利用。
- 浏览器可以通过指定 `as` 属性来决定这个**请求是否符合 [content security policy](https://www.keycdn.com/support/content-security-policy)**。
- 浏览器可以基于资源的类型（比如 image/webp）来发送适当的 `accept` 头。

不过需要注意的是：用 “preload” 和 “prefetch” 等预载方式，如果资源不能被缓存，那么都有可能浪费一部分带宽，在移动端请慎用。没有用到的 preload 资源在 Chrome 的 console 里会在 onload 事件 3s 后发生警告。
#### 举例

这里有一个非常基本的预加载图像的例子：

```
<link rel="preload" href="image.png">
```

这里有一个预加载字体的例子，记住：如果你的预加载需要 CORS 的跨域请求，那么也要加上 crossorigin 的属性。

```
<link rel="preload" href="https://example.com/fonts/font.woff" as="font" crossorigin>
```

这里有一个通过 HTML 和 JavaScript 预加载样式表的例子：

```
<!-- Via markup -->
<link rel="preload" href="/css/mystyles.css" as="style">
```

```
<!-- Via JavaScript --> 
<script> var res = document.createElement("link"); 
res.rel = "preload"; 
res.as = "style"; 
res.href = "css/mystyles.css"; 
document.head.appendChild(res); </script>
```

来自 filament group 的 Scott Jehl 也有了一些相关研究并写了 [async loaded styles using markup](https://link.juejin.cn?target=http%3A%2F%2Ffilamentgroup.github.io%2FloadCSS%2Ftest%2Fpreload.html "http://filamentgroup.github.io/loadCSS/test/preload.html") 说明了 preload 是不阻塞页面渲染的！

#### 浏览器对 Preload 的支持

Chrome 50 在 2016 年 4 月添加了对 Preload 的支持，Opera 37 等浏览器也支持它。不过目前 Mozilla Firefox 还没有确定要支持，Microsoft Edge 开发者版似乎要支持。

### 二、Prefetch

Prefetch 是一个低优先级的资源提示，允许**浏览器在后台（空闲时）**获取将来可能用得到的资源，并且将他们**存储在浏览器的缓存中**。一旦一个页面加载完毕就会开始下载其他的资源，然后当用户点击了一个带有 prefetched 的连接，它将可以立刻从缓存中加载内容。有三种不同的 prefetch 的类型，link，DNS 和 prerendering，下面来详细分析。

#### 1. Link Prefetching

像上面提到的，link prefetching 假设用户将请求它们，所以**允许浏览器获取资源并将他们存储在缓存中**。浏览器会寻找 HTML `<link>` 元素中的 prefetch 或者 HTTP 头中如下的 Link：

- HTML: `<link rel="prefetch" href="/uploads/images/pic.png">`
- HTTP Header: `Link: </uploads/images/pic.png>; rel=prefetch`

"这项技术有为很多有交互网站提速的潜力，但并不会应用在所有地方。对于某些站点来说，太难猜测用户下一步的动向，对于另一些站点，提前获取资源可能导致数据过期失效。还有很重要的一点，不要过早进行 prefetch，否则会降低你当前浏览的页面的加载速度 —— Google Developers"

除了 Safari， iOS Safari 和 Opera Mini，现代浏览器已经支持了 link Prefetch，Chrome 和 Firefox 还会在网络面板上显示这些 prefetched 资源。

#### 2. DNS Prefetching

DNS prefetching 允许浏览器在用户浏览页面时**在后台运行 DNS 的解析**。如此一来，DNS 的解析在用户点击一个链接时已经完成，所以可以减少延迟。可以在一个 link 标签的属性中添加 `rel="dns-prefetch'` 来对指定的 URL 进行 DNS prefetching，我们建议对 Google fonts，Google Analytics 和 CDN 进行处理。

"DNS 请求在带宽方面流量非常小，可是延迟会很高，尤其是在移动设备上。通过 prefetching 指定的 DNS 可以在特定的场景显著的减小延迟，比如用户点击链接的时候。有些时候，甚至可以减小一秒钟的延迟 —— Mozilla Developer Network"

这也对需要重定向的资源很有用，如下：

```
<!-- Prefetch DNS for external assets -->
 <link rel="dns-prefetch" href="//fonts.googleapis.com">
 <link rel="dns-prefetch" href="//www.google-analytics.com"> 
 <link rel="dns-prefetch" href="//opensource.keycdn.com">
 <link rel="dns-prefetch" href="//cdn.domain.com">
```

不过要注意的是 Chrome 已经在敲击地址栏的时候做了类似的事情，比如 DNS preresolve 和 TCP preconnect，这些措施太酷了！你可以通过 `chrome://dns/` 来查看你的优化列表。

DNS prefetch 已经被除了 Opera Mini 之外的所有现代浏览器支持了。

#### 3. Prerendering

Prerendering 和 prefetching 非常相似，它们都优化了可能导航到的下一页上的资源的加载，区别是 prerendering 在**后台渲染了整个页面**，整个页面所有的资源。如下：

```
<link rel="prerender" href="https://www.keycdn.com">
```

`prerender` 提示可以用来指示将要导航到的下一个 HTML：用户代理将作为一个 HTML 的响应来获取和处理资源，要使用适当的 content-types 获取其他内容类型，或者不需要 HTML 预处理，可以使用 `prefetch`。


要小心的使用 prerender，因为它将会加载很多资源并且可能造成带宽的浪费，尤其是在移动设备上。还要注意的是，你无法在 Chrome DevTools 中进行测试，而是在 `chrome://net-internals/#prerender` 中看是否有页面被 prerendered 了，你也可以在 [prerender-test.appspot.com](https://link.juejin.cn?target=http%3A%2F%2Fprerender-test.appspot.com%2F "http://prerender-test.appspot.com/") 进行测试。

除了 Mozilla Firefox，Safari，iOS Safari，Opera Mini 和 Android 浏览器外的一些现代浏览器已经支持了 prerendering。

除了多余的资源加载外，使用 prefetch 还有一切 [额外的副作用](https://link.juejin.cn?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FLink_prefetching%23Issues_and_criticisms "https://en.wikipedia.org/wiki/Link_prefetching#Issues_and_criticisms")，比如对隐私的损害：

- Web 统计将会收到影响而变大，尽管 Google 说已经限制了这个标签。看看这个关于页面分析将会被影响而在一次点击时产生两个 session 的 [文章](https://link.juejin.cn?target=http%3A%2F%2Fwww.scl.com%2Finsights%2Fblog%2Fgoogle-chrome-prefetchprerender-inflating-web-analytics-stats%2F "http://www.scl.com/insights/blog/google-chrome-prefetchprerender-inflating-web-analytics-stats/")。
- 由于可能从未访问的站点下载了更多的页面（尤其是隐匿下载正在变得更加先进和多样化），用户的安全将面临更多的风险。
- 如果预取访问未经授权的内容，用户可能违反其网络或组织的可接受使用策略。

### 三、Preconnect

本文介绍的最后一个资源提示是 preconnect，preconnect 允许浏览器在一个 **HTTP 请求正式发给服务器前预先执行一些操作**，这包括 DNS 解析，TLS 协商，TCP 握手，这消除了往返延迟并为用户节省了时间。

Preconnect 是优化的重要手段，它可以减少很多请求中的往返路径 —— 在某些情况下可以减少数百或者数千毫秒的延迟。

Preconnect 可以直接添加到 HTML 中 link 标签的属性中，也可以写在 HTTP 头中或者通过 JavaScript 生成，如下是一个为 CDN 使用 preconnect 的例子：

```
<link href="https://cdn.domain.com" rel="preconnect" crossorigin>
```

如下是为 Google Fonts 使用 preconnect 的例子，通过给 `fonts.gstatic.com` 加入 preconnect 提示，浏览器将立刻发起请求，和 CSS 请求并行执行。在这个场景下，**preconnect 从关键路径中消除了三个 RTTs（Round-Trip Time）** 并**减少了超过半秒的延迟**，lya Grigorik 的 [eliminating RTTS with preconnect](https://link.juejin.cn?target=https%3A%2F%2Fwww.igvita.com%2F2015%2F08%2F17%2Feliminating-roundtrips-with-preconnect%2F "https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/") 一文中有更详细的分析。

![](https://nojsja.gitee.io/static-resources/images/interview/preconnect.png)

使用 preconnect 是个有效而且克制的资源优化方法，它不仅可以优化页面并且可以防止资源利用的浪费。除了 Internet Explorer，Safari，IOS Safari 和 Opera Mini 的现代浏览器已经支持了 preconnect。