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

## ➣ 中文 ascii 编码

取值范围是0～127

在字符编码方面，ASCII码为标准符号、数字、英文等进行了保留，取值范围是0～127，还有一部分作为扩展ASCII码128～255

当操作系统采用非ASCII编码时(比如汉字编码)，一般用扩展ASCII码来进行，约定用128～255范围的编码连续2～3甚至4个来进行汉字编码，(比如国标用连续两个128～255的编码表示1个汉字，分别是区码和位码的编码；UTF-8可以用3个连续的数来表示一个汉字)，具体编码规则要看具体定义，一般不相同的。

因此，在处理字符串时，如果是有符号字符串，遇到小于0的字符，会结合后面紧跟的字符来组成一个汉字，大于0的为标准西文字符；如果是无符号的，则可以判断是否大于127。

ascii码是目前计算机中用得最广泛的字符集及其编码，是由美国国家标准局(ANSI)制定的ASCII码（American Standard Code for Information Interchange，美国标准信息交换码），它已被国际标准化组织（ISO）定为国际标准，称为ISO 646标准。适用于所有拉丁文字字母，ASCII码有7位码和8位码两种形式。