---
lang: zh-CN
title: 基础知识
description: 基础知识梳理
---

### > position各个属性的作用

- **static(默认值)**：浏览器会按照源码的顺序，决定每个元素的位置，这称为"正常的页面流"。
- **relative**：表示元素相对于默认位置（即static时的位置）进行偏移，即定位基点是元素的默认位置。需要搭配top、bottom、left、right这四个属性一起使用，用来指定偏移的方向和距离，例如`top: 20px;`表示`元素从默认位置向下偏移20px`。
- **fixed**：表示元素相对于视口（viewport，浏览器窗口）进行偏移，即定位基点是浏览器窗口。这会导致元素的位置不随页面滚动而变化，好像固定在网页上一样。例如`top:0`表示元素在视口顶部。
- **absolute**：absolute表示，相对于上级元素（一般是父元素）进行偏移，即定位基点是父元素。不过定位基点（一般是父元素）不能是static定位，否则定位基点就会变成整个网页的根元素html，另外，absolute定位也必须搭配top、bottom、left、right这四个属性一起使用。
- **sticky**：sticky跟前面四个属性值都不一样，它会产生动态效果，很像relative和fixed的结合：一些时候是relative定位（定位基点是自身默认位置），另一些时候自动变成fixed定位（定位基点是视口），需要搭配`top、bottom、left、right`使用。它的具体规则是，当页面滚动，父元素开始脱离视口时（即部分不可见），只要与sticky元素的距离达到生效门槛，relative定位自动切换为fixed定位；等到父元素完全脱离视口时（即完全不可见），fixed定位自动切换回relative定位。

### > display各个属性作用

&nbsp;&nbsp;&nbsp;&nbsp; display属性可以设置元素的内部和外部显示类型，元素的外部显示类型将决定该元素在流式布局中的表现，例如块级或内联元素，元素的内部显示类型可以控制其子元素的布局，例如grid或flex。目前所有浏览器都支持display属性，但是对于属性值的兼容性仍需注意。

##### 1. 外部显示

&nbsp;&nbsp;&nbsp;&nbsp; 这些值指定了元素的外部显示类型，实际上就是其在流式布局中的角色，即在流式布局中的表现。

- display: **none**  
display: none;是CSS1规范，无兼容性问题，该属性值表示此元素不会被显示，依照词义是真正隐藏元素，使用这个属性，被隐藏的元素不占据任何空间，用户交互操作例如点击事件都不会生效，读屏软件也不会读到元素的内容，这个元素的任何子元素也会同时被隐藏。当使用该属性将元素从显示状态切换为隐藏状态时，元素不占据原本的空间，会触发浏览器的重绘与回流。为这个属性添加过渡动画是无效的，他的任何不同状态值之间的切换总是会立即生效。这种方式产生的效果就像元素完全不存在，但在DOM中依然可以访问到这个元素，也可以通过DOM来操作它。

- display: **block**  
display: block;是CSS1规范，无兼容性问题，该属性值表示此元素将显示为块级元素，此元素前后会带有换行符，元素独占一行，封闭后自动换行，默认宽度为100%，可以指定宽度和高度，内外边距对于四个方向有效。

- display: **inline**  
display: inline;是CSS1规范，无兼容性问题，该属性值表示此元素会被显示为内联元素，元素会生成一个或多个内联元素框，这些框不会在自身之前或之后产生换行符，在正常流中，如果有空间，则下一个元素将在同一行上，元素排在一行，封闭后不会自动换行，不能指定高度与宽度，可以使用line-height来指定行高，外边距对于水平方向有效，垂直方向无效，内边距对于水平方向和垂直方向正常有效，对其他元素无任何影响。

- display: **inline-block**  
display: inline-block;是CSS2规范，无兼容性问题，该属性值表示此元素将显示为内联块元素，该元素生成一个块元素框，该框将随周围的内容一起流动，就好像它是单个内联框一样，与被替换的元素非常相似，它等效于内联流根inline flow-root，可以指定宽度和高度，内外边距对于四个方向有效元素排在一行，但是在回车后会有空白缝隙。

- display: **run-in**  
display: run-in;是CSS2规范，绝大部分浏览器都不兼容，目前这是个实验性属性值，不应该用作生产环境，该属性值表示此元素会根据上下文决定对象是内联对象还是块级对象，如果它后一个元素是block那么它会变成inline并和后一个元素并排，如果它后一个元素是inline那么它会变成block。

##### 2. 内部显示
&nbsp;&nbsp;&nbsp;&nbsp; 这些关键字指定了元素的内部显示类型，它们定义了该元素内部内容的布局方式，需要假定该元素为非替换元素。

- display: **flow-root**  
display: flow-root;是CSS3规范，兼容性一般，该属性值表示此元素会生成一个块元素盒子，该元素盒子可建立一个新的块格式化上下文BFC，定义格式化根所在的位置。

- display: **table**  
display: table;是CSS2规范，兼容性良好，该属性值表示此元素会作为块级表格来显示，类似`<table>`，表格前后带有换行符。

- display: **flex**  
display: flex;是CSS3规范，目前主流浏览器都已支持，是布局的首选方案，该属性值表示此元素会作为弹性盒子显示，在外部表现为block，内部作为弹性盒子使用，弹性布局可以为盒状模型提供最大的灵活性。在兼容移动端浏览器的方案上，有可能需要使用display:-webkit-box;，也就是内核前缀-box，同样都是弹性盒子，由于各阶段草案命名的原因，其命名从box更改为flex，flex是新的规范属性，此外flex并不能完全替代box，使用这两种方式在实际布局中会存在差异。

- display: **grid**  
display: grid;是CSS3规范，目前主流浏览器都已支持，该属性值表示将元素分为一个个网格，然后利用这些网格组合做出各种各样的布局。Grid布局与Flex布局有一定的相似性，都可以指定容器内部多个成员的位置。不同之处在于，Flex布局是轴线布局，只能指定成员针对轴线的位置，可以看作是一维布局。Grid布局则是将容器划分成行和列，产生单元格，然后指定成员所在的单元格，可以看作是二维布局。

- display: **inline-table**  
display: inline-table;是CSS2规范，兼容性良好，该属性值与display: table;在元素内部表现相同，在元素外部显示表现为inline。

- display: **inline-flex**  
display: inline-flex;是CSS3规范，目前主流浏览器都已支持，该属性值与display: flex;在元素内部表现相同，在元素外部显示表现为inline。

- display: **inline-grid**  
display: inline-grid;是CSS3规范，目前主流浏览器都已支持，该属性值与display: grid;在元素内部表现相同，在元素外部显示表现为inline。

- display: **list-item**  
display: list-item;是CSS1规范，无兼容性问题，该属性值表示将元素的外部显示类型变为block盒模型，并将内部显示类型变为多个list-item inline盒模型。

##### 3. 内部表现
&nbsp;&nbsp;&nbsp;&nbsp; table布局模型有着相对复杂的内部结构，因此它们的子元素可能扮演着不同的角色，这一类关键字就是用来定义这些内部显示类型，并且只有在这些特定的布局模型中才有意义。

- display: **table-row-group**  
display: table-row-group;是CSS2规范，兼容性良好，该属性值表示此元素会作为一个或多个行的分组来显示，类似于`<tbody>`。

- display: **table-header-group**  
display: table-header-group;是CSS2规范，兼容性良好，该属性值表示此元素会作为一个或多个行的分组来显示，类似于`<thead>`。

- display: **table-footer-group**  
display: table-footer-group;是CSS2规范，兼容性良好，该属性值表示此元素会作为一个或多个行的分组来显示，类似于`<tfoot>`。

- display: **table-row**  
display: table-row;是CSS2规范，兼容性良好，该属性值表示此元素会作为一个表格行显示，类似于`<tr>`。

- display: **table-column-group**  
display: table-column-group;是CSS2规范，兼容性良好，该属性值表示此元素会作为一个或多个列的分组来显示，类似于`<colgroup>`。

- display: **table-column**  
display: table-column;是CSS2规范，兼容性良好，该属性值表示此元素会作为一个单元格列显示，类似于`<col>`。

- display: **table-cell**  
display: table-cell;是CSS2规范，兼容性良好，该属性值表示此元素会作为一个表格单元格显示，类似于`<td>和<th>`。

- display: **table-caption**  
display: table-caption;是CSS2规范，兼容性良好，该属性值表示此元素会作为一个表格标题显示，类似于`<caption>`。

### > grid布局
&nbsp;&nbsp;&nbsp;&nbsp; 讲到布局，我们就会想到 flex 布局，甚至有人认为竟然有 flex 布局了，似乎没有必要去了解 Grid 布局。但 flex 布局和 Grid 布局有实质的区别，那就是 flex 布局是一维布局，Grid 布局是二维布局。flex 布局一次只能处理一个维度上的元素布局，一行或者一列。Grid 布局是将容器划分成了“行”和“列”，产生了一个个的网格，我们可以将网格元素放在与这些行和列相关的位置上，从而达到我们布局的目的。

##### 1. 容器元素

- 需要设置：`display: grid;`
- **grid-template-columns**：属性定义每一列的列宽。比如`100px 100px 100px`指定三列，列宽100px，也可使用百分比单位；搭配`repeat`函数可以简化书写：`repeat(3, 33.33%);`。repeat重复某种模式也是可以的，比如：`repeat(2, 100px 20px 80px)`；如果要实现不固定列数，自动填充的话使用`auto-fill`即可，会根据列宽和容器动态宽度自动进行计算：`repeat(auto-fill, 100px)`；为了方便表示列宽度之间的比例关系，可以使用fr关键字，比如两列的宽度分别为1fr和2fr，就表示后者是前者的两倍，分别占1/3和2/3，`grid-template-columns: 1fr 2fr`。fr和px可混用，`150px 1fr 2fr`；使用auto关键字表示由浏览器自己决定长度：`grid-template-columns: 100px auto 100px;`。
- **grid-template-rows**：属性定义每一行的行高，用法同上。
- **grid-gap**：grid-row-gap和grid-columns-gap的合并简写形式，表示行间距和列间距，只写一个值表示两个值相同。
- **grid-template-areas**：网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成，下面代码先划分出9个单元格，然后将其定名为a到i的九个区域，分别对应这九个单元格。：
```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a b c'
                       'd e f'
                       'g h i';
}
```
- **grid-auto-flow**：划分网格以后，容器的子元素会按照顺序，自动放置在每一个网格。默认的放置顺序是"先行后列"，即先填满第一行，再开始放入第二行。这个顺序由grid-auto-flow属性决定，默认值是row，即"先行后列"。也可以将它设成column，变成"先列后行"。还可以设成`row dense`和`column dense`，这两个值主要用于，某些项目指定位置以后，剩下的项目尽可能紧密填满，尽量不出现空格。
- **justify-items**: 属性设置单元格中内容的水平位置（左中右）：`start | end | center | stretch(拉伸);`。
- **align-items**: 属性设置单元格内容的垂直位置（上中下）：`start | end | center | stretch;`。
- **justify-content**：属性指定整个内容区域在容器里面的水平位置（左中右）：`start | end | center | stretch | space-around(item间隔均分) | space-between | space-evenly(边框和item完全平均分布);`。
- **align-content**：属性指定整个内容区域的垂直位置（上中下）：`start | end | center | stretch | space-around(item间隔均分) | space-between | space-evenly(边框和item完全平均分布);`。

##### 2. 子元素

- **grid-area**：属性指定项目放在哪一个区域，与`grid-template-area`搭配使用：`grid-area: e;`。
- **justify-self**：属性设置单元格内容的水平位置（左中右），跟justify-items属性的用法完全一致，但只作用于单个项目：`start | end | center | stretch;`。
- **align-self**：属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目：`start | end | center | stretch;`。

### > flex布局

##### 1. 容器元素

- 需要设置：`display: flex;`
- flex-direction：属性决定主轴的方向（即项目的排列方向）： `row(默认) | row-reverse | column | column-reverse`。
- flex-wrap：决定items在一条轴线排不下时如何换行，`nowrap | wrap | wrap-reverse(换行，第一行在下方)`
- flex-flow：flex-direction + flex-wrap 简写形式。
- justify-content：items在主轴上的对齐方式：`flex-start | flex-end | center | space-between | space-around(元素间隔均匀)`。
- align-items：定义items在交叉轴上如何对齐：`flex-start | flex-end | center | baseline(第一行文本基线) | stretch(拉伸)`。
- align-content：定义了多根主轴线的对齐方式，如果项目只有一根轴线，该属性不起作用：`flex-start | flex-end | center | space-between | space-around | stretch`。

##### 2. 子元素

- order：定义item的排列顺序，数值越小，排列越靠前，默认为0。
- flex-grow：定义item的放大比例，默认为0，即如果存在剩余空间，也不放大。
- flex-shrink：定义了item的缩小比例，默认为1，即如果空间不足，该项目将缩小。
- flex-basis：属性定义了在分配多余空间之前，item占据的主轴空间（main size）。根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
- flex：属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为`0 1 auto`。该属性有两个快捷值：auto (`1 1 auto`) 和 none (`0 0 auto`)。
- align-self：align-self属性允许单个item有与其他item不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。