---
lang: zh-CN
title: ● 性能优化
description: optimization 的描述
---

![](http://nojsja.github.io/static-resources/images/interview/frontend-optimization.png)

&nbsp;&nbsp;&nbsp;&nbsp; 前端性能优化是个很大的概念，涉及HTTP协议、浏览器渲染原理、操作系统和网络、前端工程化和Js底层原理等各个方面。通过建立思维导图可以让我们很好的将各个优化方面组织和联系起来。  
&nbsp;&nbsp;&nbsp;&nbsp; 按照优化原理的不同则可以将其分为`网络层面优化`和`渲染层面`的优化，网络层面的优化更多体现在资源加载时的优化，而渲染层的优化更多体现在运行时优化。  
&nbsp;&nbsp;&nbsp;&nbsp; 例如优化浏览器缓存策略以减少HTTP请求传输量、图片和其它静态资源的压缩、服务器端启用Gzip压缩、使用CDN、图片懒加载、延迟脚本Defer和异步脚本Async等属于网络层面的优化。另一方面，减少页面的回流和重绘、使用React.Fragment减少界面dom层级、使用骨架屏、函数节流和去抖、React长列表组件优化、通过事件冒泡机制实现事件委托等就属于渲染层面的优化。

[ >> 文章链接](https://nojsja.gitee.io/blogs/2021/02/07/%E5%89%8D%E7%AB%AF%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E6%8C%87%E5%8D%97-1/)