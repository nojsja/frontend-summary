---
lang: zh-CN
title: 状态模式
description: Design Pattern 的描述
---

#### The State Pattern(状态模式)
>状态模式 -- 当一个对象的内部状态发生改变时，会导致其行为的改变，这看起来像是改变了对象。  

1. 状态模式主要解决的是当控制一个对象状态的条件表达式过于复杂时的情况，把状态的判断逻辑转移到不同状态的一系列类中，可以把复杂的判断逻辑简化。主要是为了解决允许一个对象在其内部状态改变时改变它的行为。  
2. 适用场景:一个对象的行为取决于它的状态，并且必须在运行时根据 状态改变它的行为；一个操作中含有庞大的分支结构，并且这些分支决定于对象的状态。  

```js
/*
 * 状态模式
 */

/* -----------------------------------------------------------------------------
  实例：超级玛丽游戏，玛丽要吃蘑菇，那么它就会跳起，顶出砖头里的蘑菇；玛丽想飞到另一边也要跳起；
  玛丽想要避免被乌龟咬到，它就要开枪射击。
  玛丽的跳跃开枪奔跑等都是触发的一个个状态，如果用if和switch来写条件判断的话，会考虑很多种组合
  的情况，很难维护代码，修改起来十分麻烦。
  解决方案是使用状态模式，将运动的各个状态与调用操作分离开来。
----------------------------------------------------------------------------- */

/* ************************* 创建超级玛丽状态类 ************************* */
var MarrayState = function () {
  // 内部状态私有变量
  var _currentState = {},

    /* ------------------- 动作方法的映射 ------------------- */
    states = {
      jump: function () {
        console.log('jump');
      },
      move: function () {
        console.log('move');
      },
      shoot: function () {
        console.log('shoot');
      },
      squat: function () {
        console.log('squat');
      }
    },

    /* ------------------- 创建动作控制类 ------------------- */
    Action = {
      // 改变状态方法
      changeState: function () {
          // 动作组合通过传入多个参数
          var args = arguments;
          // 重置内部状态
          _currentState = {};
          if (args.length) {
            for(var i = 0, len = args.length; i < len; i++){
              // 向内部状态添加动作
              _currentState[args[i]] = true;
            }
          }
          // 返回动作控制类
          return this;
      },
      goes: function () {
        for(var item in _currentState){
          states[item] && states[item]();
        }

        return this;
      }

    };

  /* ************************* 返回调用 ************************* */
  return {
    change: Action.changeState,
    goes: Action.gose
  }
};

```