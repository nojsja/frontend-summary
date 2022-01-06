---
lang: zh-CN
title: ● 享元模式
description: Design Pattern 的描述
---

#### The Flyweight Pattern(享元模式)
>享元模式 -- 运用共享技术来有效支持大量细粒度的对象  

一种用于性能优化的模式，_fly_ 是 _苍蝇_ 的意思，意为蝇量级,如果系统中因为很常见了大量类似的对象而导致内存占用过高，享元模式就非常有用了。  
假如有一个内衣工厂，生产了50种男款内衣和50女款内衣，每种内衣需要模特人穿上照相，一般的处理就会需要50+50个模特，如果提炼出相似点的话就只需要2个模特，男模特和女模特。  
享元模式要求将对象的属性划分为内部状态和外部状态，目的是为了尽量减少共享对象的数量。内部状态存储于对象内部，可以被一些对象共享，它独立与具体的场景，通常不会改变；外部状态取决于具体的场景，并根据场景而变化，外部状态不能被共享。最终内部状态相同的对象都指定为同一个共享对象，而外部对象可以从对象身上剥离开来存储在外部。  

未使用享元模式前需要创建很多对象：
```js
  var Upload = function (uploadType, fileName, fileSize) {
    this.uploadType = uploadType;
    this.fileName = fileName;
    this.fileSize = fileSize;
    this.dom = null;
  };

  Upload.prototype.init = function (id) {
    var that = this;
    this.id = id;
    this.dom = document.createElement('div');
    this.dom.innerHTML =
      '<span>文件名称：' + this.fileName + ', 文件大小：' + this.fileSize + '</span>' +
      '<button class="delFile">删除</button>';
    this.dom.querySelector('.delFile').onclick = function () {
      that.delFile();
    };
    document.appendChild( this.dom );
  };

  Upload.prototype.delFile = function () {
    if(this.fileSize < 3000){
      return this.dom.parentNode.removeChild(this.dom);
    }

    if (window.confirm('确定删除这个文件吗？'+this.fileName)) {
      return this.dom.parentNode.removeChild(this.dom);
    }
  }

  // 创建文件上传对象
  var id = 0;
  window.startUpload = function ( uploadType, files) {
    for (var i = 0, file; i < files.length, file = files[i]; i++) {
      var uploadObj = new Upload( uploadType, file.fileName, file.fileSize );
      uploadObj.init(id++);
    }
  };
```

使用享元模式后：
```js
  // 构造函数
  var Upload = function (uploadType) {
    this.uploadType = uploadType;
  }

  // init方法不再需要
  Upload.prototype.delFile = function (id) {
    // 结合外部状态
    uploadManager.setExternalState( id, this );

    if(this.fileSize < 3000){
      return this.dom.parentNode.removeChild(this.dom);
    }

    if (window.confirm('确定删除这个文件吗？'+this.fileName)) {
      return this.dom.parentNode.removeChild(this.dom);
    }
  };

  // 工厂进行对象实例化
  var UploadFactory = (function () {
    var createdFlyweightObjs = {};

    return {
      create: function ( uploadType ) {
        if( createdFlyweightObjs[ uploadType ] ){
          return createdFlyweightObjs[ uploadType ];
        }

        return createdFlyweightObjs[ uploadType ] = new Upload( uploadType );
      }
    };
  })();

  // 管理器封装外部状态
  var uploadManager = (function () {
    var uploadDatabase = {};

    return {
      // 添加一个共享对象
      add: function ( id, uploadType, fileName, fileSize ) {
        var flyweightObj = UploadFactory.create( uploadType );

        var dom = document.createElement('div');
        dom.innerHTML =
          '<span>文件名称：' + fileName + ', 文件大小：' + fileSize + '</span>' +
          '<button class="delFile">删除</button>';
        dom.querySelector('.delFile').onclick = function () {
          flyweightObj.delFile(id);
        };

        document.body.appendChild(dom);
        uploadDatabase[id] = {
          fileName: fileName,
          fileSize: fileSize,
          dom: dom
        };

        return flyweightObj;
      },
      // 共享对象需要用到外部主状态的时候执行组装
      setExternalState: function (id, flyweightObj) {
        var uploadData = uploadDatabase[id];
        for(var attr in uploadData){
          flyweightObj[attr] = uploadData[attr];
        }
      }
    }
  })();

  // 文件上传操作
  var id = 0;
  window.startUpload = function ( uploadType, files ) {
    for (var i = 0, file; i < files.length, file = files[i]; i++) {
      var uploadObj = uploadManager.add(id++, uploadType, file.fileName, file.fileSize);
    }
  }
```