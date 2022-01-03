---
lang: zh-CN
title: 代理模式
description: Design Pattern 的描述
---

#### The Proxy pattern(代理模式)
>代理模式 -- 代理模式是为一个对象提供一个待用品或占位符，使用替身对象预处理移交给主对象的请求，以控制对对象的访问  

1. 代理模式是一种非常有意义的模式，生活中有很多使用代理模式的场景：比如明星都是用经纪人作为代理，如果想请明星开演唱会就得联系其经纪人来进行相关安排。  
2. 代理模式的关键时当客户不方便直接访问一个对象或是不满足需要的时候，提供一个替身对象来控制对对象的访问，客户实际上访问的是替身对象，替身对象对请求做出一些处理后再把请求转交给本体对象。  
3. 保护代理和虚拟代理：  
1）保护代理：用户控制不同权限的对象对目标对象的访问，但在JavaScript中不容易实现保护代理，因为无法判断谁访问了某个对象。  
2）虚拟代理：如果在目标对象中有一些很消耗时间和性能的操作，那么可以把这些操作委托给代理来控制执行，当代理对象中满足某个一特定情况后才执行这些操作。

保护代理示例：小明送花 
```js
// 对象花
var Flower = function () {};

// 追求mm的小明
var XiaoMing = {
  isRich: false,
  sendFlower: function (target) {
    var flower = new Flower();
    target.recieveFlower(flower);
  }
};

// mm的闺蜜
var GuiMi = {
  recieveFlower: function (flower) {
    // 如果小明有钱的花就送
    // 闺蜜会了解MM心情好不好
    if (XiaoMing.isRich) {
      MM.listenGoodMood(function () {
        MM.recieveFlower(flower);
      });
    }
  }
};

// mm
var MM = {
  recieveFlower: function (flower) {
    console.log('recieved flower!');
  },
  listenGoodMood: function (fn) {
    setTimeout(fn, 1000);
  }
};

XiaoMing.sendFlower(Guimi);
```

虚拟代理示例：图片延迟加载 
```js
// 本体对象
var myImage = (function () {
  var image = document.createElement('img');
  document.body.appendChild(image);

  return {
    setSrc: function (address) {
      image.src = address;
    }
  };

})();

// 代理对象
var proxyImage = (function () {
  var img = document.createElement('img');
  img.onload = function () {
    myImage.setSrc(this.src);
  };

  return {
    setSrc: function (address) {
      myImage.setSrc('/path/to/loading.png');
      img.src = address;
    }
  };
})();
```