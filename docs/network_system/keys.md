---
lang: zh-CN
title: ● 考点梳理
description: Network & System 的描述
---

## ➣ 常见的网页攻击方式，如何防范

##### 1. XSS：跨站脚本攻击(Cross-site scripting)
&nbsp;&nbsp;&nbsp;&nbsp; 它允许使用者恶将代码恶意注入到网页上，属于代码注入的一种攻击方式，常通过HTML和Javascript进行注入攻击成功后，攻击者可能获取网站更高的操作权限、私密网页信息、会话和cookie等各种内容。

1）常用的XSS攻击手段和目的有：

- 盗用cookie，获取敏感信息。
- 利用植入Flash，通过crossdomain权限设置进一步获取更高权限；或者利用Java等得到类似的操作。
- 利用iframe、frame、XMLHttpRequest或上述Flash等方式，以（被攻击）用户-的身份执行一些管理动作，或执行一些一般的如发微博、加好友、发私信等操作。
- 利用可被攻击的域受到其他域信任的特点，以受信任来源的身份请求一些平时不允许的操作，如进行不当的投票活动。
- 在访问量极大的一些页面上的XSS可以攻击一些小型网站，实现DoS攻击的效果。

2）防范手段：

- 将使用者所提供的内容进行过滤，许多语言都有提供对HTML的过滤：
>PHP的htmlentities()或是htmlspecialchars()；Python的cgi.escape()；
ASP的Server.HTMLEncode()；ASP.NET的Server.HtmlEncode()或功能更强的Microsoft Anti-Cross Site Scripting Library 页面存档备份，存于互联网档案馆；Java的xssprotect (Open Source Library) 页面存档备份，存于互联网档案馆；Node.js的node-validator。

- 很多时候可以使用HTTP头指定内容的类型，使得输出的内容避免被作为HTML解析。如在PH
```php
<?php
   header('Content-Type: text/javascript; charset=utf-8');
?>
```
##### 2. XSRF：跨站请求伪造(Cross-site request forgery)
&nbsp;&nbsp;&nbsp;&nbsp; 攻击者通过一些技术手段欺骗用户的浏览器去访问一个自己曾经认证过的网站并运行一些操作（如发邮件，发消息，甚至财产操作如转账和购买商品）。由于浏览器曾经认证过，所以被访问的网站会认为是真正的用户操作而去运行。

1）攻击示例：
- 假如一家银行用以运行转账操作的URL地址如下： https://bank.example.com/withdraw?account=AccoutName&amount=1000&for=PayeeName，
那么，一个恶意攻击者可以在另一个网站上放置如下代码：`<img src="https://bank.example.com/withdraw?account=Alice&amount=1000&for=Badman" />`。如果有账户名为Alice的用户访问了恶意站点，而她之前刚访问过银行不久，登录信息尚未过期，那么她就会损失1000资金。

2）防范措施：

- 令牌同步模式  
&nbsp;&nbsp;&nbsp;&nbsp; 令牌同步模式（英语：Synchronizer token pattern，简称STP）。原理是：当用户发送请求时，服务器端应用将令牌（英语：token，一个保密且唯一的值）嵌入HTML表格，并发送给客户端。客户端提交HTML表格时候，会将令牌发送到服务端，令牌的验证是由服务端实行的。令牌可以通过任何方式生成，只要确保随机性和唯一性。这样确保攻击者发送请求时候，由于没有该令牌而无法通过验证。  
&nbsp;&nbsp;&nbsp;&nbsp; STP能在HTML下运作顺利，但会导致服务端的复杂度升高，复杂度源于令牌的生成和验证。因为令牌是唯一且随机，如果每个表格都使用一个唯一的令牌，那么当页面过多时，服务器由于生产令牌而导致的负担也会增加。而使用session会话等级的令牌代替的话，服务器的负担将没有那么重。
Django框架默认带有STP功能：
```html
<form method="post">
    {% csrf_token %}
</form>
渲染后的效果如下：
<form method="post">
    <input type="hidden" name="csrfmiddlewaretoken" value="KbyUmhTLMpYj7CD2di7JKP1P3qmLlkPt" />
</form>
```

- 检查Referer字段  
&nbsp;&nbsp;&nbsp;&nbsp; HTTP头中有一个Referer字段，这个字段用以标明请求来源于哪个地址。在处理敏感数据请求时，通常来说，Referer字段应和请求的地址位于同一域名下。以上文银行操作为例，Referer字段地址通常应该是转账按钮所在的网页地址，应该也位于bank.example.com之下。而如果是CSRF攻击传来的请求，Referer字段会是包含恶意网址的地址，不会位于bank.example.com之下，这时候服务器就能识别出恶意的访问。  
这种办法简单易行，工作量低，仅需要在关键访问处增加一步校验。但这种办法也有其局限性，因其完全依赖浏览器发送正确的Referer字段。虽然http协议对此字段的内容有明确的规定，但并无法保证来访的浏览器的具体实现，亦无法保证浏览器没有安全漏洞影响到此字段。并且也存在攻击者攻击某些浏览器，篡改其Referer字段的可能。
 
- 添加校验token  
&nbsp;&nbsp;&nbsp;&nbsp; 由于CSRF的本质在于攻击者欺骗用户去访问自己设置的地址，所以如果要求在访问敏感数据请求时，要求用户浏览器提供不保存在cookie中，并且攻击者无法伪造的数据作为校验，那么攻击者就无法再运行CSRF攻击。这种数据通常是窗体中的一个数据项。服务器将其生成并附加在窗体中，其内容是一个伪随机数。当客户端通过窗体提交请求时，这个伪随机数也一并提交上去以供校验。正常的访问时，客户端浏览器能够正确得到并传回这个伪随机数，而通过CSRF传来的欺骗性攻击中，攻击者无从事先得知这个伪随机数的值，服务端就会因为校验token的值为空或者错误，拒绝这个可疑请求。

## ➣ Chrome 为什么要使用多进程架构?

在浏览器刚被设计出来的时候，那时的网页非常的简单，每个网页的资源占有率是非常低的，因此一个进程处理多个网页时可行的。

然后在今天，大量网页变得日益复杂。把所有网页都放进一个进程的浏览器面临在健壮性，响应速度，安全性方面的挑战。因为如果浏览器中的一个tab网页崩溃的话，将会导致其他被打开的网页应用。

另外相对于线程，进程之间是不共享资源和地址空间的，所以不会存在太多的安全问题，而由于多个线程共享着相同的地址空间和资源，所以会存在线程之间有可能会恶意修改或者获取非授权数据等复杂的安全问题。

## ➣ 操作系统进程和线程区别

进程是资源分配的最小单位，线程是CPU调度的最小单位。

### 1. 进程

学术上说，进程是一个具有一定独立功能的程序在一个数据集上的一次动态执行的过程，是操作系统进行资源分配和调度的一个独立单位，是应用程序运行的载体。我们这里将进程比喻为工厂的车间，它代表CPU所能处理的单个任务。任一时刻，CPU总是运行一个进程，其他进程处于非运行状态。

### 2. 线程

在早期的操作系统中并没有线程的概念，进程是能拥有资源和独立运行的最小单位，也是程序执行的最小单位。任务调度采用的是时间片轮转的抢占式调度方式，而进程是任务调度的最小单位，每个进程有各自独立的一块内存，使得各个进程之间内存地址相互隔离。后来，随着计算机的发展，对CPU的要求越来越高，进程之间的切换开销较大，已经无法满足越来越复杂的程序的要求了。于是就发明了线程，线程是程序执行中一个单一的顺序控制流程，是程序执行流的最小单元。这里把线程比喻一个车间的工人，即一个车间可以允许由多个工人协同完成一个任务。

### 3. 联系和区别

- 一个进程可以包含多个线程。
- 不同进程间数据很难共享，同一进程下不同线程间数据很易共享。
- 进程之间相互独立，但同一进程下的各个线程之间共享程序的内存空间(包括代码段、数据集、堆等)及一些进程级的资源(如打开文件和信号)。
- 进程要比线程消耗更多的计算机资源。
- 进程间不会相互影响，一个线程挂掉将导致整个进程挂掉。
- 进程可以拓展到多机，进程最多适合多核。
- 进程使用的内存地址可以上锁，即一个线程使用某些共享内存时，其他线程必须等它结束，才能使用这一块内存。－ "互斥锁"。
- 进程使用的内存地址可以限定使用量 － “信号量”。

## ➣ 多进程和多线程

- 多进程：多进程指的是在同一个时间里，同一个计算机系统中如果允许两个或两个以上的进程处于运行状态。多进程带来的好处是明显的，比如你可以听歌的同时，打开编辑器敲代码，编辑器和听歌软件的进程之间丝毫不会相互干扰。

- 多线程是指程序中包含多个执行流，即在一个程序中可以同时运行多个不同的线程来执行不同的任务，也就是说允许单个程序创建多个并行执行的线程来完成各自的任务。

## ➣ 2台计算机底层之间如何通信 socket IO通信实现

## ➣ 跨域和同源策略
&nbsp;&nbsp;&nbsp;&nbsp; 跨域是指一个域下的文档或脚本试图去请求另一个域下的资源，这里跨域是广义的，包括：
1. 资源跳转： a链接、重定向、表单提交
2. 资源嵌入： `<link>、<script>、<img>、<frame>`等dom标签，还有样式中`background:url()、@font-face()`等外链地址
3. 脚本请求： js发起的ajax请求、dom和js对象的跨域操作等

&nbsp;&nbsp;&nbsp;&nbsp; 同源策略/SOP（Same origin policy）是一种约束，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。所谓同源是指当前访问页和目标请求页的"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。

\> **同源策略限制以下几种行为：**

1. Cookie、LocalStorage 和 IndexDB 无法读取
2. DOM 和 Js对象无法获得
3. AJAX 请求不能发送

\> **跨域解决方案：**
1. 通过jsonp跨域

&nbsp;&nbsp;&nbsp;&nbsp; 通常为了减轻web服务器的负载，我们把js、css，img等静态资源分离到另一台独立域名的服务器上，在html页面中再通过相应的标签从不同域名下加载静态资源，而被浏览器允许，基于此原理，我们可以通过动态创建script，再请求一个带参网址实现跨域通信。

&nbsp;&nbsp;&nbsp;&nbsp; 浏览器端：
```js
 <script>
    var script = document.createElement('script');
    script.type = 'text/javascript';

    /* 传参一个回调函数名给后端，方便后端返回时执行这个在前端定义的回调函数 */
    script.src = 'http://www.domain2.com:8080/login?user=admin&callback=handleCallback';
    document.head.appendChild(script);

    /* 回调执行函数 */
    function handleCallback(res) {
        alert(JSON.stringify(res));
    }

    /* jquery ajax 跨域 */
    $.ajax({
      url: 'http://www.domain2.com:8080/login',
      type: 'get',
      dataType: 'jsonp',  // 请求方式为jsonp
      jsonpCallback: "handleCallback",    // 自定义回调函数名
      data: {}
    });
 </script>
```
&nbsp;&nbsp;&nbsp;&nbsp; Node中间层：
```js
var querystring = require('querystring');
var http = require('http');
var server = http.createServer();

server.on('request', function(req, res) {
    var params = qs.parse(req.url.split('?')[1]);
    var fn = params.callback;

    // jsonp返回设置
    res.writeHead(200, { 'Content-Type': 'text/javascript' });
    res.write(fn + '(' + JSON.stringify(params) + ')');

    res.end();
});

server.listen('8080');
console.log('Server is running at port 8080...');
```

2. postMessage跨域

&nbsp;&nbsp;&nbsp;&nbsp; postMessage是HTML5 XMLHttpRequest Level 2中的API，且是为数不多可以跨域操作的window属性之一，它可用于解决以下方面的问题：

- 页面和其打开的新窗口的数据传递
- 多窗口之间消息传递
-  页面与嵌套的iframe消息传递

&nbsp;&nbsp;&nbsp;&nbsp; 用法：postMessage(data,origin)方法接受两个参数：
- 1）data： html5规范支持任意基本类型或可复制的对象，但部分浏览器只支持字符串，所以传参时最好用JSON.stringify()序列化。
- 2）origin： 协议+主机+端口号，也可以设置为"*"，表示可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。

1.）a.html：(http://www.domain1.com/a.html)
```js
<iframe id="iframe" src="http://www.domain2.com/b.html" style="display:none;"></iframe>
<script>       
    var iframe = document.getElementById('iframe');
    iframe.onload = function() {
        var data = {
            name: 'aym'
        };
        // 向domain2传送跨域数据
        iframe.contentWindow.postMessage(JSON.stringify(data), 'http://www.domain2.com');
    };

    // 接受domain2返回数据
    window.addEventListener('message', function(e) {
        alert('data from domain2 ---> ' + e.data);
    }, false);
</script>
```

2.）b.html：(http://www.domain2.com/b.html)
```js
<script>
    // 接收domain1的数据
    window.addEventListener('message', function(e) {
        alert('data from domain1 ---> ' + e.data);

        var data = JSON.parse(e.data);
        if (data) {
            data.number = 16;

            // 处理后再发回domain1
            window.parent.postMessage(JSON.stringify(data), 'http://www.domain1.com');
        }
    }, false);
</script>
```
3. 跨域资源共享（CORS

&nbsp;&nbsp;&nbsp;&nbsp; 普通跨域请求：只服务端设置Access-Control-Allow-Origin即可，前端无须设置，若要带cookie请求：前后端都需要设置。

&nbsp;&nbsp;&nbsp;&nbsp; 需注意的是：由于同源策略的限制，所读取的cookie为跨域请求接口所在域的cookie，而非当前页。

&nbsp;&nbsp;&nbsp;&nbsp; 目前，所有浏览器都支持该功能(IE8+：IE8/9需要使用XDomainRequest对象来支持CORS）)，CORS也已经成为主流的跨域解决方案。

4. nginx代理跨域
5. nodejs中间件代理跨域
6. WebSocket协议跨域

## ➣ preload / prefetch / preconnect 资源预取技术

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