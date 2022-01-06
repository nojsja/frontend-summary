---
lang: zh-CN
title: ● 策略模式
description: Design Pattern 的描述
---

#### The Strategy Pattern(策略模式)
>策略模式 -- 定义一系列算法封装，讲算法的使用和算法的实现分离出来，并切使它们可以相互替换  

一个基于策略模式的程序至少由两部分组成。第一部分是策略类(Strategy)，它负责具体的算法，负责具体的计算过程；第二部分是环境类(Context)，环境类接受客户的一个请求，并把请求委托给一个策略类。所有Context类中会维持某个对象的引用。

```js
/**
 * 策略模式 -- 表单提交验证
 */


/**
 * 策略对象 strategies
 * isNonEmpty 验证是否为空
 * minLength 验证是否超过长度
 * isMobile 验证是否是手机号
 * isEmail 验证是否是邮箱
 */
var Strategies = {
        isNonEmpty: function(value, errorMsg) {
            return value === '' ?
                errorMsg : false;
        },
        minLength: function(value, length, errorMsg) {
            return value.length < length ?
                errorMsg : false;
        },
        isMobile: function(value, errorMsg) {
            return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value) ?
                errorMsg : false;
        },
        isEmail: function(value, errorMsg) {
            return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ?
                errorMsg : false;
        }
};

/**
 * Validator类
 */
function Validator(){
    this.cache = [];
}

// 对象方法 添加一条验证
Validator.prototype.add = function(dom, rules) {
    var that = this;
    for (var i = 0; i < rules.length; i++) {
            (function(i){
                var strategyAry = rule[i].strategy.split(':'); //例如['minLength',6]
                var errorMsg = rule[i].errorMsg; //'用户名不能为空'

                // 把所有方法缓存起来统一调用
                that.cache.push(function(){
                    var strategy = strategyAry.shift() //用户挑选的strategy
                    strategyAry.unshift(dom.value) //把input的value添加进参数列表
                    strategyAry.push(errorMsg) //把errorMsg添加进参数列表，[dom.value,6,errorMsg]
                    return strategies[strategy].apply(dom, strategyAry)
                });
            })(i);
    }
};

// 对象方法 开始所有验证
Validator.prototype.start = function(){
    for (var i = 0; i < this.cache.length; i++) {
        var validatorFunc = this.cache[i];
        var errorMsg = validatorFunc()  //开始校验，并取得校验后的返回信息
        if (errorMsg) {  //如果有确切返回值，说明校验没有通过
            return errorMsg;
        }

    }
};

/**
 * 客户端调用代码
 */
/*客户端调用代码*/
var registerForm = document.querySelector('#registerForm');
var validatorFunc = function () {
    var validator = new Validator();

    validator.add(registerForm.userName, [{
        strategy: 'isNonEmpty',
        errorMsg: '用户名不能为空！'
    }, {
        strategy: 'minLength:6',
        errorMsg: '用户名长度不能小于6位！'
    }]);

    validator.add(registerForm.passWord, [{
        strategy: 'isNonEmpty',
        errorMsg: '密码不能为空！'
    }, {
        strategy: 'minLength:6',
        errorMsg: '密码长度不能小于6位！'
    }]);

    validator.add(registerForm.phoneNumber, [{
        strategy: 'isNonEmpty',
        errorMsg: '手机号码不能为空！'
    }, {
        strategy: 'isMoblie',
        errorMsg: '手机号码格式不正确！'
    }]);

    validator.add(registerForm.emailAddress, [{
        strategy: 'isNonEmpty',
        errorMsg: '邮箱地址不能为空！'
    }, {
        strategy: 'isEmail',
        errorMsg: '邮箱地址格式不正确！'
    }]);
    let errorMsg = validator.start();
    return errorMsg;
};

// 检查触发代码
registerForm.addEventListener('submit', function() {
    let errorMsg = validatorFunc();
    if (errorMsg) {
        alert(errorMsg)
        return false;
    }
}, false);

```