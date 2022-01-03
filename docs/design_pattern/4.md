---
lang: zh-CN
title: 装饰器模式
description: Design Pattern 的描述
---

#### The Decorator pattern(装饰者模式)
>装饰者模式 -- 动态地为某个对象添加一些额外的职责  

1. 在程序开发中我们许多时候都不希望某个类天生就非常庞大，一次性地包含许多职责，那个我们就可以使用装饰者模式，动态地为某个对象添加一些额外的职责，而不会影响从这个类派生的其它对象。  
传统面向对象语言中需要将要包装的操作封装成类，每个类的构造函数都接受一个被包装对象，被包装对象以一条链的方式进行引用，形成一个聚合对象。这些对象都拥有相同的接口，当请求达到链中的某个对象时，这个对象会执行自身的操作，随后把请求转发给链中的下一个对象。  

2. 代理模式和装饰者模式区别：
装饰者模式和代理模式有一定的相似性，最重要的区别在于他们的意图和设计目的。代理模式的目的是当直接访问本体不方便或者不符合需要时，为这个本体提供一个替代者，本体定义了关键的功能代理模式体现一种代理和本体之间的关系，这种关系是静态的，已经被预先确定，而装饰者模式使用于一开始不确定对象的全部功能，以黑盒似的将对象的功能表达做层层包裹，所以如果层次太多，会对性能造成影响。

面向对象语言的装饰者：
```js
  var Plane = function () {};
  Plane.prototype.fire = function () {
    console.log('发射普通子弹');
  };

  // 发射导弹装饰类
  var MissileDecorator = function (plane) {
    this.plane = plane;
  };
  MissileDecorator.prototype.fire = function () {
    this.plane.fire();
    console.log('发射导弹');
  };

  // 发射原子弹装饰类
  var AtomDecorator = function (plane) {
    this.plane = plane;
  };
  AtomDecorator.prototype.fire = function () {
    this.plane.fire();
    console.log('发射原子弹');
  };
```

基于原型模式的装饰者侵入式改造：
```js
  // 函数执行前
  Function.prototype.before = function (beforeFn) {
    // 保存对原始函数的引用
    var _self = this;

    return function () {
      // 里层this是调用function时的执行环境
      beforeFn.apply(this, arguments);
      _self.apply(this, arguments);
    };
  };

  // 函数执行后
  Function.prototype.after = function (afterFn) {
    // 保存对原始函数的引用
    var _self = this;

    return function () {
      // 里层this是调用function时的执行环境
      afterFn.apply(this, arguments);
      _self.apply(this, arguments);
    };
  };

  // 使用方式
  document.getElementById = document.getElementById.before(function () {
    console.log('正在执行getElementById');
  });
  var button = document.getElementById('buttonId');
```