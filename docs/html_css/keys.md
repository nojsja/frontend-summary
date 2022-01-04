---
lang: zh-CN
title: 考点梳理
description: 考点梳理
---

### > BFC及其应用

1) BFC 就是块级格式上下文，是页面盒模型布局中的一种 CSS 渲染模式，
相当于一个独立的容器，里面的元素和外部的元素相互不影响。创建 BFC 的方式有：
   - html 根元素
   - float 浮动
   - overflow 为 hidden、auto、scroll
   - position值为fixed、absolute、sticky
   - display 为Table布局、Flex布局、inline-block、Grid布局

2) BFC 主要的作用是：
   - 清除浮动（不会和浮动元素重叠）
   - 防止同一 BFC 容器中的相邻元素间的外边距重叠问题
   - 多列布局

3) BFC 表现
   - 内部的Box会在垂直方向上一个接一个放置
   - Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠
   - 每个元素的 margin box 的左边，与包含块 border box 的左边相接触
   - BFC的区域不会与float box重叠
   - BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素
   - BFC可以正确包含浮动元素，计算BFC的高度时，浮动元素也会参与计算

### > 怎样实现一个不定宽高的div水平垂直居中

- 只需要在父盒子设置：`display: flex; justify-content: center;align-items: center;`
- 使用 CSS3 transform，父盒子设置: `display:relative
Div 设置: transform: translate(-50%，-50%);position: absolute;top: 50%;left: 50%;`
- 使用 display:table-cell 方法，父盒子设置:`display:table-cell; text-align:center;vertical-align:middle;`，Div 设置: `display:inline-block;vertical-align:middle;`。

### > box-sizing是什么
设置CSS盒模型为标准模型或IE模型。标准模型的宽度只包括content，二IE模型包括border和padding。

box-sizing属性可以为三个值之一：
- content-box，默认值，只计算内容的宽度，border和padding不计算入width之内
- padding-box，padding计算入宽度内
- border-box，border和padding计算入宽度之内

### > 浏览器回流和重绘

&nbsp;&nbsp;&nbsp;&nbsp; 从上面这个图上，我们可以看到，浏览器渲染过程如下：

- 解析HTML，生成DOM树，解析CSS，生成CSSOM树
- 将DOM树和CSSOM树结合，生成渲染树(Render Tree)
- Layout(回流):根据生成的渲染树，进行回流(Layout)，得到节点的几何信息（位置，大小）
- Painting(重绘):根据渲染树以及回流得到的几何信息，得到节点的绝对像素
- Display:将像素发送给GPU，展示在页面上。

### > 两列布局实现
1) 使用float浮动元素同时设置元素宽度为100/列数 %
2) 使用inline-block实现方式同1
3) 使用css属性column-count实现
4) 使用flex布局、grid布局

### > 1px问题
1. 涉及到css像素比 device pixel/css pixel = devicePixelRatio(DPR)  
2. 解决方法一  
伪元素设置height模拟边框：
```js
  .setBorderAll{
     position: relative;
       &:after{
           content:" ";
           position:absolute;
           top: 0;
           left: 0;
           width: 200%;
           height: 200%;
           transform: scale(0.5);
           transform-origin: left top;
           box-sizing: border-box;
           border: 1px solid #E5E5E5;
           border-radius: 4px;
      }
    }
  }
```
3. 解决方法二  
设置盒子阴影：
```css
  box-shadow: 0  -1px 1px -1px #e5e5e5,   //上边线
            1px  0  1px -1px #e5e5e5,   //右边线
            0  1px  1px -1px #e5e5e5,   //下边线
            -1px 0  1px -1px #e5e5e5;   //左边线
```
### > 浮动布局相关
1. 清除浮动的属性  
浮动元素尾部那个不跟随浮动的元素设置`clear:both`
2. 撑起浮动容器元素的方法一  
在浮动元素的最后插入一个声明了`clear:both`的块级元素
3. 撑起浮动容器元素的方法二  
在浮动容器元素后使用伪元素：
```css
  .container:after {
    content: '';
    height: 0;
    display: block;
    clear: both;
  }
```
4. 撑起浮动容器元素的方法三  
利用BFC特性，设置浮动容器元素的`overflow`为scroll、auto、hidden

### > 位图和矢量图的区别
1. 位图也叫像素图，每个点可以用二进制描述颜色和亮度信息，色彩表现丰富，占用空间大，缩放失真
2. 矢量图使用计算机指令绘制而成，由点线面构成，色彩不丰富，占用空间小，缩放不失真

### > opacity: 0、visibility: hidden、display: none 的异同
&nbsp;&nbsp;&nbsp;&nbsp; 这几个属性它们都能让元素不可见

- 结构： display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击， visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击 opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

- 继承： display: none和opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。 visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。

- 性能： displa:none : 修改元素会造成文档回流,读屏器不会读取，性能消耗较大；visibility:hidden: 修改元素只会造成本元素的重绘, 性能消耗较少，读屏器能读取；；opacity: 0 ： 修改元素会造成重绘，性能消耗较少，读屏器能读取。

### > 多端适配

##### 1. 关于视口

移动端浏览器通常宽度是 240px~640px，而大多数为 PC 端设计的网站宽度至少为 800px，如果仍以浏览器窗口作为视口的话，网站内容在手机上看起来会非常窄。

因此，引入了布局视口、视觉视口和理想视口三个概念，使得移动端中的视口与浏览器宽度不再相关联。

- 1）布局视口（layout viewport）

![](http://nojsja.gitee.io/static-resources/images/interview/layout_viewport.png)

一般移动设备的浏览器都默认设置了一个 viewport 元标签，定义一个虚拟的布局视口（layout viewport），用于解决早期的页面在手机上显示的问题。iOS, Android 基本都将这个视口分辨率设置为 980px，所以 PC 上的网页基本能在手机上呈现，只不过元素看上去很小，一般默认可以通过手动缩放网页。

布局视口的宽度/高度可以通过 `document.documentElement.clientWidth / Height` 获取。布局视口使视口与移动端浏览器屏幕宽度完全独立开。CSS 布局将会根据它来进行计算，并被它约束。

- 2）视觉视口（visual viewport）

![](http://nojsja.gitee.io/static-resources/images/interview/visual_viewport.png)

视觉视口是用户当前看到的区域，用户可以通过缩放操作视觉视口，同时不会影响布局视口。

视觉视口和缩放比例的关系为：`当前缩放值 = 理想视口宽度 / 视觉视口宽度`。所以，当用户放大时，视觉视口将会变小，一个CSS 像素将显示更多的物理像素。

- 3）理想视口（ideal viewport）

布局视口的默认宽度并不是一个理想的宽度，于是 Apple 和其他浏览器厂商引入了理想视口的概念，它对设备而言是最理想的布局视口尺寸。显示在理想视口中的网站具有最理想的宽度，用户无需进行缩放。

理想视口的值其实就是屏幕分辨率的值，它对应的像素叫做设备逻辑像素（device independent pixel, dip）。dip 和设备的物理像素无关，一个 dip 在任意像素密度的设备屏幕上都占据相同的空间。如果用户没有进行缩放，那么一个 CSS 像素就等于一个 dip。

用下面的方法可以使布局视口与理想视口的宽度一致：`<meta name="viewport" content="width=device-width">`

- 4）注意：

    - viewport 标签只对移动端浏览器有效，对 PC 端浏览器是无效的

    - 当缩放比例为 100% 时，dip 宽度 = CSS 像素宽度 = 理想视口的宽度 = 布局视口的宽度

    - 单独设置 initial-scale 或 width 都会有兼容性问题，所以设置布局视口为理想视口的最佳方法是同时设置这两个属性

    - 即使设置了 user-scalable = no，在 Android Chrome 浏览器中也可以强制启用手动缩放

##### 2. 关于多倍图

MacBook Pro 视网膜屏（Retina）显示器硬件像素是 2880px 1800px。当设置屏幕分辨率为 1920px 1200px 的时候，理想视口的宽度值是 1920px， 那么 dip 的宽度值就是 1920px。其与理想视口宽度的比值为1.5（2880/1920），这个比值叫做设备像素比：`逻辑像素宽度 * dpr = 物理像素宽度`。

设备像素比可以通过 window.devicePixelRatio 来获取，或者使用 CSS 中的 device-pixel-ratio。

下面是常见的设备像素比：

- 普通密度桌面显示屏：devicePixelRatio = 1
- 高密度桌面显示屏(Mac Retina)：devicePixelRatio = 2
- 主流手机显示屏：devicePixelRatio = 2 or 3

对于一张 100px * 100px 的图片，通过 CSS 设置其宽高：
```css
{
  width:100px;
  height:100px;
}
```

在普通显示屏的电脑中打开是正常的，但假设在手机或 Retina 屏中打开，按照逻辑分辨率来渲染，他们的 devicePixelRatio = 2，那么就相当于拿 4 个物理像素来描绘 1 个电子像素。这等于拿一个2倍的放大镜去看图片，图片就会变得模糊。这时，就需要使用 @2x 甚至 @3x 图来避免图片的失真。
