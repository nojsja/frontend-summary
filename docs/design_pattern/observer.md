---
lang: zh-CN
title: ● 观察者模式
description: Design Pattern 的描述
---

#### The Observer Pattern(观察者模式)
>观察者模式 -- 定义对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖它的对象都将得到通知  

在JavaScript中观察者模式是用事件模型来实现的，观察者模式广泛应用于异步编程中，这是一种替代传统回调函数的解决方案，比如我们可以订阅ajax请求的error，success事件。使用观察者模式，我们就无需关注对象在异步运行期间的状态，而只需要订阅感兴趣的事件发生点。  
使用观察者模式可以取代对象之间硬编码的通知机制，一个对象不再显式调用另一个对象的接口，对象之间松散耦合，只要维持之间约定的事件名，发布者和订阅者的内部改变就完全是独立、互不影响的。  

```js
/* -----------------------------------------------------------------------------
  观察者模式：
  1. 全局的观察者模式对象，所有事件的订阅、触发、移除都由这个全局对象处理，适用于需要创建大量
  观察者对象。
  2. 构建观察者模式类，使用时可以实例化一个观察者对象，适用于需要创建少量的观察者对象。
----------------------------------------------------------------------------- */

function EventEmitter() {
  this.maxListeners = 100;
  this.listeners = {};
  this.onceMap = {};
}

EventEmitter.prototype.setMaxListeners = function(num) {
  if (typeof num !== 'number' || !Number.isInteger(num) || num <= 0)
    throw new Error('setMaxListeners #### param num must be a positive integer!');
  this.maxListeners = num;
}

EventEmitter.prototype.on = function(type, func) {
  if (!type || !func instanceof Function) return;
  if (this.listeners[type]) {
    if (this.listeners[type].length > this.maxListeners) 
      return console.error('The max listeners limitation: ', this.maxListeners);
    this.listeners[type].push(func);
  } else {
    this.listeners[type] = [func];
  }
  this.onceMap[type] = false;
}

EventEmitter.prototype.once = function(type, func) {
  if (!type || !func instanceof Function) return;
  this.on(type, func);
  this.onceMap[type] = true;
}

EventEmitter.prototype.off = function(type, func) {
  if (!type || !func) return;
  if (this.listeners[type]) {
    this.listeners[type] =
      this.listeners[type].filter(function(fn) { return fn !== func; });
  }
}

EventEmitter.prototype.emit = function(type) {
  (this.listeners[type] || []).forEach(function(fn) {
    fn();
  });
  if (this.onceMap[type]) delete this.listeners[type];
  delete this.onceMap[type];
}

```
