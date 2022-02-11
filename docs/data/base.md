---
lang: zh-CN
title: ● 基础知识
description: data 的描述
---

## ➣ JavaScript ArrayBuffer 的概念和应用

JS 里的 Array，因为有很多功能，而且是不限制类型的，或者它还可能是稀疏的…… 总之这个 Array 是相当于只是一个代理对象，它内部有比较复杂的实现。

而如果你从 XHR、File API、Canvas 等等各种地方，读取了一大串字节流，如果用 JS 里的 Array 去存，又浪费，又低效。于是为了配合这些新的 API 增强 JS 的二进制处理能力，就有了 ArrayBuffer。

ArrayBuffer 简单说是一片内存，但是你不能 (也不方便) 直接用它。这就好比你在 C 里面，malloc 一片内存出来，你也会把它转换成 unsigned_int32 或者 int16 这些你需要的实际类型的数组 / 指针来用。

这就是 JS 里的 TypedArray 的作用，那些 Uint32Array 也好，Int16Array 也好，都是给 ArrayBuffer 提供了一个 `View`，MDN 上的原话叫做 `Multiple views on the same data`，对它们进行下标读写，最终都会反应到它所建立在的 ArrayBuffer 之上。除了 TypedArray 以外，也可以使用 DataView 来读写 ArrayBuffer，这样会麻烦一些，但也更灵活。DataView 能更自由的选择字节序，对于对齐的要求也更低。