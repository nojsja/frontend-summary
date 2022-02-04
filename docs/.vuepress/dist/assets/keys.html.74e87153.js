import{c as a}from"./app.490278ba.js";import{_ as n}from"./plugin-vue_export-helper.21dcd24c.js";const s={},e=a(`<h2 id="\u27A3-bfc\u53CA\u5176\u5E94\u7528" tabindex="-1"><a class="header-anchor" href="#\u27A3-bfc\u53CA\u5176\u5E94\u7528" aria-hidden="true">#</a> \u27A3 BFC\u53CA\u5176\u5E94\u7528</h2><ol><li><p>BFC \u5C31\u662F\u5757\u7EA7\u683C\u5F0F\u4E0A\u4E0B\u6587\uFF0C\u662F\u9875\u9762\u76D2\u6A21\u578B\u5E03\u5C40\u4E2D\u7684\u4E00\u79CD CSS \u6E32\u67D3\u6A21\u5F0F\uFF0C \u76F8\u5F53\u4E8E\u4E00\u4E2A\u72EC\u7ACB\u7684\u5BB9\u5668\uFF0C\u91CC\u9762\u7684\u5143\u7D20\u548C\u5916\u90E8\u7684\u5143\u7D20\u76F8\u4E92\u4E0D\u5F71\u54CD\u3002\u521B\u5EFA BFC \u7684\u65B9\u5F0F\u6709\uFF1A</p><ul><li>html \u6839\u5143\u7D20</li><li>float \u6D6E\u52A8</li><li>overflow \u4E3A hidden\u3001auto\u3001scroll</li><li>position\u503C\u4E3Afixed\u3001absolute\u3001sticky</li><li>display \u4E3ATable\u5E03\u5C40\u3001Flex\u5E03\u5C40\u3001inline-block\u3001Grid\u5E03\u5C40</li></ul></li><li><p>BFC \u4E3B\u8981\u7684\u4F5C\u7528\u662F\uFF1A</p><ul><li>\u6E05\u9664\u6D6E\u52A8\uFF08\u4E0D\u4F1A\u548C\u6D6E\u52A8\u5143\u7D20\u91CD\u53E0\uFF09</li><li>\u9632\u6B62\u540C\u4E00 BFC \u5BB9\u5668\u4E2D\u7684\u76F8\u90BB\u5143\u7D20\u95F4\u7684\u5916\u8FB9\u8DDD\u91CD\u53E0\u95EE\u9898</li><li>\u591A\u5217\u5E03\u5C40</li></ul></li><li><p>BFC \u8868\u73B0</p><ul><li>\u5185\u90E8\u7684Box\u4F1A\u5728\u5782\u76F4\u65B9\u5411\u4E0A\u4E00\u4E2A\u63A5\u4E00\u4E2A\u653E\u7F6E</li><li>Box\u5782\u76F4\u65B9\u5411\u7684\u8DDD\u79BB\u7531margin\u51B3\u5B9A\uFF0C\u5C5E\u4E8E\u540C\u4E00\u4E2ABFC\u7684\u4E24\u4E2A\u76F8\u90BBBox\u7684margin\u4F1A\u53D1\u751F\u91CD\u53E0</li><li>\u6BCF\u4E2A\u5143\u7D20\u7684 margin box \u7684\u5DE6\u8FB9\uFF0C\u4E0E\u5305\u542B\u5757 border box \u7684\u5DE6\u8FB9\u76F8\u63A5\u89E6</li><li>BFC\u7684\u533A\u57DF\u4E0D\u4F1A\u4E0Efloat box\u91CD\u53E0</li><li>BFC\u662F\u9875\u9762\u4E0A\u7684\u4E00\u4E2A\u9694\u79BB\u7684\u72EC\u7ACB\u5BB9\u5668\uFF0C\u5BB9\u5668\u91CC\u9762\u7684\u5B50\u5143\u7D20\u4E0D\u4F1A\u5F71\u54CD\u5230\u5916\u9762\u7684\u5143\u7D20</li><li>BFC\u53EF\u4EE5\u6B63\u786E\u5305\u542B\u6D6E\u52A8\u5143\u7D20\uFF0C\u8BA1\u7B97BFC\u7684\u9AD8\u5EA6\u65F6\uFF0C\u6D6E\u52A8\u5143\u7D20\u4E5F\u4F1A\u53C2\u4E0E\u8BA1\u7B97</li></ul></li></ol><h2 id="\u27A3-\u600E\u6837\u5B9E\u73B0\u4E00\u4E2A\u4E0D\u5B9A\u5BBD\u9AD8\u7684div\u6C34\u5E73\u5782\u76F4\u5C45\u4E2D" tabindex="-1"><a class="header-anchor" href="#\u27A3-\u600E\u6837\u5B9E\u73B0\u4E00\u4E2A\u4E0D\u5B9A\u5BBD\u9AD8\u7684div\u6C34\u5E73\u5782\u76F4\u5C45\u4E2D" aria-hidden="true">#</a> \u27A3 \u600E\u6837\u5B9E\u73B0\u4E00\u4E2A\u4E0D\u5B9A\u5BBD\u9AD8\u7684div\u6C34\u5E73\u5782\u76F4\u5C45\u4E2D</h2><ul><li>\u53EA\u9700\u8981\u5728\u7236\u76D2\u5B50\u8BBE\u7F6E\uFF1A<code>display: flex; justify-content: center;align-items: center;</code></li><li>\u4F7F\u7528 CSS3 transform\uFF0C\u7236\u76D2\u5B50\u8BBE\u7F6E: <code>display:relative Div \u8BBE\u7F6E: transform: translate(-50%\uFF0C-50%);position: absolute;top: 50%;left: 50%;</code></li><li>\u4F7F\u7528 display:table-cell \u65B9\u6CD5\uFF0C\u7236\u76D2\u5B50\u8BBE\u7F6E:<code>display:table-cell; text-align:center;vertical-align:middle;</code>\uFF0CDiv \u8BBE\u7F6E: <code>display:inline-block;vertical-align:middle;</code>\u3002</li></ul><h2 id="\u27A3-box-sizing\u662F\u4EC0\u4E48" tabindex="-1"><a class="header-anchor" href="#\u27A3-box-sizing\u662F\u4EC0\u4E48" aria-hidden="true">#</a> \u27A3 box-sizing\u662F\u4EC0\u4E48</h2><p>\u8BBE\u7F6ECSS\u76D2\u6A21\u578B\u4E3A\u6807\u51C6\u6A21\u578B\u6216IE\u6A21\u578B\u3002\u6807\u51C6\u6A21\u578B\u7684\u5BBD\u5EA6\u53EA\u5305\u62ECcontent\uFF0C\u4E8CIE\u6A21\u578B\u5305\u62ECborder\u548Cpadding\u3002</p><p>box-sizing\u5C5E\u6027\u53EF\u4EE5\u4E3A\u4E09\u4E2A\u503C\u4E4B\u4E00\uFF1A</p><ul><li>content-box\uFF0C\u9ED8\u8BA4\u503C\uFF0C\u53EA\u8BA1\u7B97\u5185\u5BB9\u7684\u5BBD\u5EA6\uFF0Cborder\u548Cpadding\u4E0D\u8BA1\u7B97\u5165width\u4E4B\u5185</li><li>padding-box\uFF0Cpadding\u8BA1\u7B97\u5165\u5BBD\u5EA6\u5185</li><li>border-box\uFF0Cborder\u548Cpadding\u8BA1\u7B97\u5165\u5BBD\u5EA6\u4E4B\u5185</li></ul><h2 id="\u27A3-\u6D4F\u89C8\u5668\u56DE\u6D41\u548C\u91CD\u7ED8" tabindex="-1"><a class="header-anchor" href="#\u27A3-\u6D4F\u89C8\u5668\u56DE\u6D41\u548C\u91CD\u7ED8" aria-hidden="true">#</a> \u27A3 \u6D4F\u89C8\u5668\u56DE\u6D41\u548C\u91CD\u7ED8</h2><p>\xA0\xA0\xA0\xA0 \u4ECE\u4E0A\u9762\u8FD9\u4E2A\u56FE\u4E0A\uFF0C\u6211\u4EEC\u53EF\u4EE5\u770B\u5230\uFF0C\u6D4F\u89C8\u5668\u6E32\u67D3\u8FC7\u7A0B\u5982\u4E0B\uFF1A</p><ul><li>\u89E3\u6790HTML\uFF0C\u751F\u6210DOM\u6811\uFF0C\u89E3\u6790CSS\uFF0C\u751F\u6210CSSOM\u6811</li><li>\u5C06DOM\u6811\u548CCSSOM\u6811\u7ED3\u5408\uFF0C\u751F\u6210\u6E32\u67D3\u6811(Render Tree)</li><li>Layout(\u56DE\u6D41):\u6839\u636E\u751F\u6210\u7684\u6E32\u67D3\u6811\uFF0C\u8FDB\u884C\u56DE\u6D41(Layout)\uFF0C\u5F97\u5230\u8282\u70B9\u7684\u51E0\u4F55\u4FE1\u606F\uFF08\u4F4D\u7F6E\uFF0C\u5927\u5C0F\uFF09</li><li>Painting(\u91CD\u7ED8):\u6839\u636E\u6E32\u67D3\u6811\u4EE5\u53CA\u56DE\u6D41\u5F97\u5230\u7684\u51E0\u4F55\u4FE1\u606F\uFF0C\u5F97\u5230\u8282\u70B9\u7684\u7EDD\u5BF9\u50CF\u7D20</li><li>Display:\u5C06\u50CF\u7D20\u53D1\u9001\u7ED9GPU\uFF0C\u5C55\u793A\u5728\u9875\u9762\u4E0A\u3002</li></ul><h2 id="\u27A3-\u4E24\u5217\u5E03\u5C40\u5B9E\u73B0" tabindex="-1"><a class="header-anchor" href="#\u27A3-\u4E24\u5217\u5E03\u5C40\u5B9E\u73B0" aria-hidden="true">#</a> \u27A3 \u4E24\u5217\u5E03\u5C40\u5B9E\u73B0</h2><ol><li>\u4F7F\u7528float\u6D6E\u52A8\u5143\u7D20\u540C\u65F6\u8BBE\u7F6E\u5143\u7D20\u5BBD\u5EA6\u4E3A100/\u5217\u6570 %</li><li>\u4F7F\u7528inline-block\u5B9E\u73B0\u65B9\u5F0F\u540C1</li><li>\u4F7F\u7528css\u5C5E\u6027column-count\u5B9E\u73B0</li><li>\u4F7F\u7528flex\u5E03\u5C40\u3001grid\u5E03\u5C40</li></ol><h2 id="\u27A3-1px\u95EE\u9898" tabindex="-1"><a class="header-anchor" href="#\u27A3-1px\u95EE\u9898" aria-hidden="true">#</a> \u27A3 1px\u95EE\u9898</h2><ol><li>\u6D89\u53CA\u5230css\u50CF\u7D20\u6BD4 device pixel/css pixel = devicePixelRatio(DPR)</li><li>\u89E3\u51B3\u65B9\u6CD5\u4E00<br> \u4F2A\u5143\u7D20\u8BBE\u7F6Eheight\u6A21\u62DF\u8FB9\u6846\uFF1A</li></ol><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>  <span class="token punctuation">.</span>setBorderAll<span class="token punctuation">{</span>
     position<span class="token operator">:</span> relative<span class="token punctuation">;</span>
       <span class="token operator">&amp;</span><span class="token operator">:</span>after<span class="token punctuation">{</span>
           content<span class="token operator">:</span><span class="token string">&quot; &quot;</span><span class="token punctuation">;</span>
           position<span class="token operator">:</span>absolute<span class="token punctuation">;</span>
           top<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
           left<span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">;</span>
           width<span class="token operator">:</span> <span class="token number">200</span><span class="token operator">%</span><span class="token punctuation">;</span>
           height<span class="token operator">:</span> <span class="token number">200</span><span class="token operator">%</span><span class="token punctuation">;</span>
           transform<span class="token operator">:</span> <span class="token function">scale</span><span class="token punctuation">(</span><span class="token number">0.5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
           transform<span class="token operator">-</span>origin<span class="token operator">:</span> left top<span class="token punctuation">;</span>
           box<span class="token operator">-</span>sizing<span class="token operator">:</span> border<span class="token operator">-</span>box<span class="token punctuation">;</span>
           border<span class="token operator">:</span> <span class="token number">1</span>px solid #<span class="token constant">E5E5E5</span><span class="token punctuation">;</span>
           border<span class="token operator">-</span>radius<span class="token operator">:</span> <span class="token number">4</span>px<span class="token punctuation">;</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br></div></div><ol start="3"><li>\u89E3\u51B3\u65B9\u6CD5\u4E8C<br> \u8BBE\u7F6E\u76D2\u5B50\u9634\u5F71\uFF1A</li></ol><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code>  <span class="token property">box-shadow</span><span class="token punctuation">:</span> 0  -1px 1px -1px #e5e5e5<span class="token punctuation">,</span>   //\u4E0A\u8FB9\u7EBF
            1px  0  1px -1px #e5e5e5<span class="token punctuation">,</span>   //\u53F3\u8FB9\u7EBF
            0  1px  1px -1px #e5e5e5<span class="token punctuation">,</span>   //\u4E0B\u8FB9\u7EBF
            -1px 0  1px -1px #e5e5e5<span class="token punctuation">;</span>   //\u5DE6\u8FB9\u7EBF
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><h2 id="\u27A3-\u6D6E\u52A8\u5E03\u5C40\u76F8\u5173" tabindex="-1"><a class="header-anchor" href="#\u27A3-\u6D6E\u52A8\u5E03\u5C40\u76F8\u5173" aria-hidden="true">#</a> \u27A3 \u6D6E\u52A8\u5E03\u5C40\u76F8\u5173</h2><ol><li>\u6E05\u9664\u6D6E\u52A8\u7684\u5C5E\u6027<br> \u6D6E\u52A8\u5143\u7D20\u5C3E\u90E8\u90A3\u4E2A\u4E0D\u8DDF\u968F\u6D6E\u52A8\u7684\u5143\u7D20\u8BBE\u7F6E<code>clear:both</code></li><li>\u6491\u8D77\u6D6E\u52A8\u5BB9\u5668\u5143\u7D20\u7684\u65B9\u6CD5\u4E00<br> \u5728\u6D6E\u52A8\u5143\u7D20\u7684\u6700\u540E\u63D2\u5165\u4E00\u4E2A\u58F0\u660E\u4E86<code>clear:both</code>\u7684\u5757\u7EA7\u5143\u7D20</li><li>\u6491\u8D77\u6D6E\u52A8\u5BB9\u5668\u5143\u7D20\u7684\u65B9\u6CD5\u4E8C<br> \u5728\u6D6E\u52A8\u5BB9\u5668\u5143\u7D20\u540E\u4F7F\u7528\u4F2A\u5143\u7D20\uFF1A</li></ol><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code>  <span class="token selector">.container:after</span> <span class="token punctuation">{</span>
    <span class="token property">content</span><span class="token punctuation">:</span> <span class="token string">&#39;&#39;</span><span class="token punctuation">;</span>
    <span class="token property">height</span><span class="token punctuation">:</span> 0<span class="token punctuation">;</span>
    <span class="token property">display</span><span class="token punctuation">:</span> block<span class="token punctuation">;</span>
    <span class="token property">clear</span><span class="token punctuation">:</span> both<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><ol start="4"><li>\u6491\u8D77\u6D6E\u52A8\u5BB9\u5668\u5143\u7D20\u7684\u65B9\u6CD5\u4E09<br> \u5229\u7528BFC\u7279\u6027\uFF0C\u8BBE\u7F6E\u6D6E\u52A8\u5BB9\u5668\u5143\u7D20\u7684<code>overflow</code>\u4E3Ascroll\u3001auto\u3001hidden</li></ol><h2 id="\u27A3-\u4F4D\u56FE\u548C\u77E2\u91CF\u56FE\u7684\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#\u27A3-\u4F4D\u56FE\u548C\u77E2\u91CF\u56FE\u7684\u533A\u522B" aria-hidden="true">#</a> \u27A3 \u4F4D\u56FE\u548C\u77E2\u91CF\u56FE\u7684\u533A\u522B</h2><ol><li>\u4F4D\u56FE\u4E5F\u53EB\u50CF\u7D20\u56FE\uFF0C\u6BCF\u4E2A\u70B9\u53EF\u4EE5\u7528\u4E8C\u8FDB\u5236\u63CF\u8FF0\u989C\u8272\u548C\u4EAE\u5EA6\u4FE1\u606F\uFF0C\u8272\u5F69\u8868\u73B0\u4E30\u5BCC\uFF0C\u5360\u7528\u7A7A\u95F4\u5927\uFF0C\u7F29\u653E\u5931\u771F</li><li>\u77E2\u91CF\u56FE\u4F7F\u7528\u8BA1\u7B97\u673A\u6307\u4EE4\u7ED8\u5236\u800C\u6210\uFF0C\u7531\u70B9\u7EBF\u9762\u6784\u6210\uFF0C\u8272\u5F69\u4E0D\u4E30\u5BCC\uFF0C\u5360\u7528\u7A7A\u95F4\u5C0F\uFF0C\u7F29\u653E\u4E0D\u5931\u771F</li></ol><h2 id="\u27A3-opacity-0\u3001visibility-hidden\u3001display-none-\u7684\u5F02\u540C" tabindex="-1"><a class="header-anchor" href="#\u27A3-opacity-0\u3001visibility-hidden\u3001display-none-\u7684\u5F02\u540C" aria-hidden="true">#</a> \u27A3 opacity: 0\u3001visibility: hidden\u3001display: none \u7684\u5F02\u540C</h2><p>\xA0\xA0\xA0\xA0 \u8FD9\u51E0\u4E2A\u5C5E\u6027\u5B83\u4EEC\u90FD\u80FD\u8BA9\u5143\u7D20\u4E0D\u53EF\u89C1</p><ul><li><p>\u7ED3\u6784\uFF1A display:none: \u4F1A\u8BA9\u5143\u7D20\u5B8C\u5168\u4ECE\u6E32\u67D3\u6811\u4E2D\u6D88\u5931\uFF0C\u6E32\u67D3\u7684\u65F6\u5019\u4E0D\u5360\u636E\u4EFB\u4F55\u7A7A\u95F4, \u4E0D\u80FD\u70B9\u51FB\uFF0C visibility: hidden:\u4E0D\u4F1A\u8BA9\u5143\u7D20\u4ECE\u6E32\u67D3\u6811\u6D88\u5931\uFF0C\u6E32\u67D3\u5143\u7D20\u7EE7\u7EED\u5360\u636E\u7A7A\u95F4\uFF0C\u53EA\u662F\u5185\u5BB9\u4E0D\u53EF\u89C1\uFF0C\u4E0D\u80FD\u70B9\u51FB opacity: 0: \u4E0D\u4F1A\u8BA9\u5143\u7D20\u4ECE\u6E32\u67D3\u6811\u6D88\u5931\uFF0C\u6E32\u67D3\u5143\u7D20\u7EE7\u7EED\u5360\u636E\u7A7A\u95F4\uFF0C\u53EA\u662F\u5185\u5BB9\u4E0D\u53EF\u89C1\uFF0C\u53EF\u4EE5\u70B9\u51FB</p></li><li><p>\u7EE7\u627F\uFF1A display: none\u548Copacity: 0\uFF1A\u662F\u975E\u7EE7\u627F\u5C5E\u6027\uFF0C\u5B50\u5B59\u8282\u70B9\u6D88\u5931\u7531\u4E8E\u5143\u7D20\u4ECE\u6E32\u67D3\u6811\u6D88\u5931\u9020\u6210\uFF0C\u901A\u8FC7\u4FEE\u6539\u5B50\u5B59\u8282\u70B9\u5C5E\u6027\u65E0\u6CD5\u663E\u793A\u3002 visibility: hidden\uFF1A\u662F\u7EE7\u627F\u5C5E\u6027\uFF0C\u5B50\u5B59\u8282\u70B9\u6D88\u5931\u7531\u4E8E\u7EE7\u627F\u4E86hidden\uFF0C\u901A\u8FC7\u8BBE\u7F6Evisibility: visible;\u53EF\u4EE5\u8BA9\u5B50\u5B59\u8282\u70B9\u663E\u5F0F\u3002</p></li><li><p>\u6027\u80FD\uFF1A displa:none : \u4FEE\u6539\u5143\u7D20\u4F1A\u9020\u6210\u6587\u6863\u56DE\u6D41,\u8BFB\u5C4F\u5668\u4E0D\u4F1A\u8BFB\u53D6\uFF0C\u6027\u80FD\u6D88\u8017\u8F83\u5927\uFF1Bvisibility:hidden: \u4FEE\u6539\u5143\u7D20\u53EA\u4F1A\u9020\u6210\u672C\u5143\u7D20\u7684\u91CD\u7ED8, \u6027\u80FD\u6D88\u8017\u8F83\u5C11\uFF0C\u8BFB\u5C4F\u5668\u80FD\u8BFB\u53D6\uFF1B\uFF1Bopacity: 0 \uFF1A \u4FEE\u6539\u5143\u7D20\u4F1A\u9020\u6210\u91CD\u7ED8\uFF0C\u6027\u80FD\u6D88\u8017\u8F83\u5C11\uFF0C\u8BFB\u5C4F\u5668\u80FD\u8BFB\u53D6\u3002</p></li></ul><h2 id="\u27A3-\u591A\u7AEF\u9002\u914D" tabindex="-1"><a class="header-anchor" href="#\u27A3-\u591A\u7AEF\u9002\u914D" aria-hidden="true">#</a> \u27A3 \u591A\u7AEF\u9002\u914D</h2><h5 id="_1-\u5173\u4E8E\u89C6\u53E3" tabindex="-1"><a class="header-anchor" href="#_1-\u5173\u4E8E\u89C6\u53E3" aria-hidden="true">#</a> 1. \u5173\u4E8E\u89C6\u53E3</h5><p>\u79FB\u52A8\u7AEF\u6D4F\u89C8\u5668\u901A\u5E38\u5BBD\u5EA6\u662F 240px~640px\uFF0C\u800C\u5927\u591A\u6570\u4E3A PC \u7AEF\u8BBE\u8BA1\u7684\u7F51\u7AD9\u5BBD\u5EA6\u81F3\u5C11\u4E3A 800px\uFF0C\u5982\u679C\u4ECD\u4EE5\u6D4F\u89C8\u5668\u7A97\u53E3\u4F5C\u4E3A\u89C6\u53E3\u7684\u8BDD\uFF0C\u7F51\u7AD9\u5185\u5BB9\u5728\u624B\u673A\u4E0A\u770B\u8D77\u6765\u4F1A\u975E\u5E38\u7A84\u3002</p><p>\u56E0\u6B64\uFF0C\u5F15\u5165\u4E86\u5E03\u5C40\u89C6\u53E3\u3001\u89C6\u89C9\u89C6\u53E3\u548C\u7406\u60F3\u89C6\u53E3\u4E09\u4E2A\u6982\u5FF5\uFF0C\u4F7F\u5F97\u79FB\u52A8\u7AEF\u4E2D\u7684\u89C6\u53E3\u4E0E\u6D4F\u89C8\u5668\u5BBD\u5EA6\u4E0D\u518D\u76F8\u5173\u8054\u3002</p><ul><li>1\uFF09\u5E03\u5C40\u89C6\u53E3\uFF08layout viewport\uFF09</li></ul><p><img src="http://nojsja.gitee.io/static-resources/images/interview/layout_viewport.png" alt=""></p><p>\u4E00\u822C\u79FB\u52A8\u8BBE\u5907\u7684\u6D4F\u89C8\u5668\u90FD\u9ED8\u8BA4\u8BBE\u7F6E\u4E86\u4E00\u4E2A viewport \u5143\u6807\u7B7E\uFF0C\u5B9A\u4E49\u4E00\u4E2A\u865A\u62DF\u7684\u5E03\u5C40\u89C6\u53E3\uFF08layout viewport\uFF09\uFF0C\u7528\u4E8E\u89E3\u51B3\u65E9\u671F\u7684\u9875\u9762\u5728\u624B\u673A\u4E0A\u663E\u793A\u7684\u95EE\u9898\u3002iOS, Android \u57FA\u672C\u90FD\u5C06\u8FD9\u4E2A\u89C6\u53E3\u5206\u8FA8\u7387\u8BBE\u7F6E\u4E3A 980px\uFF0C\u6240\u4EE5 PC \u4E0A\u7684\u7F51\u9875\u57FA\u672C\u80FD\u5728\u624B\u673A\u4E0A\u5448\u73B0\uFF0C\u53EA\u4E0D\u8FC7\u5143\u7D20\u770B\u4E0A\u53BB\u5F88\u5C0F\uFF0C\u4E00\u822C\u9ED8\u8BA4\u53EF\u4EE5\u901A\u8FC7\u624B\u52A8\u7F29\u653E\u7F51\u9875\u3002</p><p>\u5E03\u5C40\u89C6\u53E3\u7684\u5BBD\u5EA6/\u9AD8\u5EA6\u53EF\u4EE5\u901A\u8FC7 <code>document.documentElement.clientWidth / Height</code> \u83B7\u53D6\u3002\u5E03\u5C40\u89C6\u53E3\u4F7F\u89C6\u53E3\u4E0E\u79FB\u52A8\u7AEF\u6D4F\u89C8\u5668\u5C4F\u5E55\u5BBD\u5EA6\u5B8C\u5168\u72EC\u7ACB\u5F00\u3002CSS \u5E03\u5C40\u5C06\u4F1A\u6839\u636E\u5B83\u6765\u8FDB\u884C\u8BA1\u7B97\uFF0C\u5E76\u88AB\u5B83\u7EA6\u675F\u3002</p><ul><li>2\uFF09\u89C6\u89C9\u89C6\u53E3\uFF08visual viewport\uFF09</li></ul><p><img src="http://nojsja.gitee.io/static-resources/images/interview/visual_viewport.png" alt=""></p><p>\u89C6\u89C9\u89C6\u53E3\u662F\u7528\u6237\u5F53\u524D\u770B\u5230\u7684\u533A\u57DF\uFF0C\u7528\u6237\u53EF\u4EE5\u901A\u8FC7\u7F29\u653E\u64CD\u4F5C\u89C6\u89C9\u89C6\u53E3\uFF0C\u540C\u65F6\u4E0D\u4F1A\u5F71\u54CD\u5E03\u5C40\u89C6\u53E3\u3002</p><p>\u89C6\u89C9\u89C6\u53E3\u548C\u7F29\u653E\u6BD4\u4F8B\u7684\u5173\u7CFB\u4E3A\uFF1A<code>\u5F53\u524D\u7F29\u653E\u503C = \u7406\u60F3\u89C6\u53E3\u5BBD\u5EA6 / \u89C6\u89C9\u89C6\u53E3\u5BBD\u5EA6</code>\u3002\u6240\u4EE5\uFF0C\u5F53\u7528\u6237\u653E\u5927\u65F6\uFF0C\u89C6\u89C9\u89C6\u53E3\u5C06\u4F1A\u53D8\u5C0F\uFF0C\u4E00\u4E2ACSS \u50CF\u7D20\u5C06\u663E\u793A\u66F4\u591A\u7684\u7269\u7406\u50CF\u7D20\u3002</p><ul><li>3\uFF09\u7406\u60F3\u89C6\u53E3\uFF08ideal viewport\uFF09</li></ul><p>\u5E03\u5C40\u89C6\u53E3\u7684\u9ED8\u8BA4\u5BBD\u5EA6\u5E76\u4E0D\u662F\u4E00\u4E2A\u7406\u60F3\u7684\u5BBD\u5EA6\uFF0C\u4E8E\u662F Apple \u548C\u5176\u4ED6\u6D4F\u89C8\u5668\u5382\u5546\u5F15\u5165\u4E86\u7406\u60F3\u89C6\u53E3\u7684\u6982\u5FF5\uFF0C\u5B83\u5BF9\u8BBE\u5907\u800C\u8A00\u662F\u6700\u7406\u60F3\u7684\u5E03\u5C40\u89C6\u53E3\u5C3A\u5BF8\u3002\u663E\u793A\u5728\u7406\u60F3\u89C6\u53E3\u4E2D\u7684\u7F51\u7AD9\u5177\u6709\u6700\u7406\u60F3\u7684\u5BBD\u5EA6\uFF0C\u7528\u6237\u65E0\u9700\u8FDB\u884C\u7F29\u653E\u3002</p><p>\u7406\u60F3\u89C6\u53E3\u7684\u503C\u5176\u5B9E\u5C31\u662F\u5C4F\u5E55\u5206\u8FA8\u7387\u7684\u503C\uFF0C\u5B83\u5BF9\u5E94\u7684\u50CF\u7D20\u53EB\u505A\u8BBE\u5907\u903B\u8F91\u50CF\u7D20\uFF08device independent pixel, dip\uFF09\u3002dip \u548C\u8BBE\u5907\u7684\u7269\u7406\u50CF\u7D20\u65E0\u5173\uFF0C\u4E00\u4E2A dip \u5728\u4EFB\u610F\u50CF\u7D20\u5BC6\u5EA6\u7684\u8BBE\u5907\u5C4F\u5E55\u4E0A\u90FD\u5360\u636E\u76F8\u540C\u7684\u7A7A\u95F4\u3002\u5982\u679C\u7528\u6237\u6CA1\u6709\u8FDB\u884C\u7F29\u653E\uFF0C\u90A3\u4E48\u4E00\u4E2A CSS \u50CF\u7D20\u5C31\u7B49\u4E8E\u4E00\u4E2A dip\u3002</p><p>\u7528\u4E0B\u9762\u7684\u65B9\u6CD5\u53EF\u4EE5\u4F7F\u5E03\u5C40\u89C6\u53E3\u4E0E\u7406\u60F3\u89C6\u53E3\u7684\u5BBD\u5EA6\u4E00\u81F4\uFF1A<code>&lt;meta name=&quot;viewport&quot; content=&quot;width=device-width&quot;&gt;</code></p><ul><li><p>4\uFF09\u6CE8\u610F\uFF1A</p><ul><li><p>viewport \u6807\u7B7E\u53EA\u5BF9\u79FB\u52A8\u7AEF\u6D4F\u89C8\u5668\u6709\u6548\uFF0C\u5BF9 PC \u7AEF\u6D4F\u89C8\u5668\u662F\u65E0\u6548\u7684</p></li><li><p>\u5F53\u7F29\u653E\u6BD4\u4F8B\u4E3A 100% \u65F6\uFF0Cdip \u5BBD\u5EA6 = CSS \u50CF\u7D20\u5BBD\u5EA6 = \u7406\u60F3\u89C6\u53E3\u7684\u5BBD\u5EA6 = \u5E03\u5C40\u89C6\u53E3\u7684\u5BBD\u5EA6</p></li><li><p>\u5355\u72EC\u8BBE\u7F6E initial-scale \u6216 width \u90FD\u4F1A\u6709\u517C\u5BB9\u6027\u95EE\u9898\uFF0C\u6240\u4EE5\u8BBE\u7F6E\u5E03\u5C40\u89C6\u53E3\u4E3A\u7406\u60F3\u89C6\u53E3\u7684\u6700\u4F73\u65B9\u6CD5\u662F\u540C\u65F6\u8BBE\u7F6E\u8FD9\u4E24\u4E2A\u5C5E\u6027</p></li><li><p>\u5373\u4F7F\u8BBE\u7F6E\u4E86 user-scalable = no\uFF0C\u5728 Android Chrome \u6D4F\u89C8\u5668\u4E2D\u4E5F\u53EF\u4EE5\u5F3A\u5236\u542F\u7528\u624B\u52A8\u7F29\u653E</p></li></ul></li></ul><h5 id="_2-\u5173\u4E8E\u591A\u500D\u56FE" tabindex="-1"><a class="header-anchor" href="#_2-\u5173\u4E8E\u591A\u500D\u56FE" aria-hidden="true">#</a> 2. \u5173\u4E8E\u591A\u500D\u56FE</h5><p>MacBook Pro \u89C6\u7F51\u819C\u5C4F\uFF08Retina\uFF09\u663E\u793A\u5668\u786C\u4EF6\u50CF\u7D20\u662F 2880px 1800px\u3002\u5F53\u8BBE\u7F6E\u5C4F\u5E55\u5206\u8FA8\u7387\u4E3A 1920px 1200px \u7684\u65F6\u5019\uFF0C\u7406\u60F3\u89C6\u53E3\u7684\u5BBD\u5EA6\u503C\u662F 1920px\uFF0C \u90A3\u4E48 dip \u7684\u5BBD\u5EA6\u503C\u5C31\u662F 1920px\u3002\u5176\u4E0E\u7406\u60F3\u89C6\u53E3\u5BBD\u5EA6\u7684\u6BD4\u503C\u4E3A1.5\uFF082880/1920\uFF09\uFF0C\u8FD9\u4E2A\u6BD4\u503C\u53EB\u505A\u8BBE\u5907\u50CF\u7D20\u6BD4\uFF1A<code>\u903B\u8F91\u50CF\u7D20\u5BBD\u5EA6 * dpr = \u7269\u7406\u50CF\u7D20\u5BBD\u5EA6</code>\u3002</p><p>\u8BBE\u5907\u50CF\u7D20\u6BD4\u53EF\u4EE5\u901A\u8FC7 window.devicePixelRatio \u6765\u83B7\u53D6\uFF0C\u6216\u8005\u4F7F\u7528 CSS \u4E2D\u7684 device-pixel-ratio\u3002</p><p>\u4E0B\u9762\u662F\u5E38\u89C1\u7684\u8BBE\u5907\u50CF\u7D20\u6BD4\uFF1A</p><ul><li>\u666E\u901A\u5BC6\u5EA6\u684C\u9762\u663E\u793A\u5C4F\uFF1AdevicePixelRatio = 1</li><li>\u9AD8\u5BC6\u5EA6\u684C\u9762\u663E\u793A\u5C4F(Mac Retina)\uFF1AdevicePixelRatio = 2</li><li>\u4E3B\u6D41\u624B\u673A\u663E\u793A\u5C4F\uFF1AdevicePixelRatio = 2 or 3</li></ul><p>\u5BF9\u4E8E\u4E00\u5F20 100px * 100px \u7684\u56FE\u7247\uFF0C\u901A\u8FC7 CSS \u8BBE\u7F6E\u5176\u5BBD\u9AD8\uFF1A</p><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token punctuation">{</span>
  <span class="token property">width</span><span class="token punctuation">:</span>100px<span class="token punctuation">;</span>
  <span class="token property">height</span><span class="token punctuation">:</span>100px<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br></div></div><p>\u5728\u666E\u901A\u663E\u793A\u5C4F\u7684\u7535\u8111\u4E2D\u6253\u5F00\u662F\u6B63\u5E38\u7684\uFF0C\u4F46\u5047\u8BBE\u5728\u624B\u673A\u6216 Retina \u5C4F\u4E2D\u6253\u5F00\uFF0C\u6309\u7167\u903B\u8F91\u5206\u8FA8\u7387\u6765\u6E32\u67D3\uFF0C\u4ED6\u4EEC\u7684 devicePixelRatio = 2\uFF0C\u90A3\u4E48\u5C31\u76F8\u5F53\u4E8E\u62FF 4 \u4E2A\u7269\u7406\u50CF\u7D20\u6765\u63CF\u7ED8 1 \u4E2A\u7535\u5B50\u50CF\u7D20\u3002\u8FD9\u7B49\u4E8E\u62FF\u4E00\u4E2A2\u500D\u7684\u653E\u5927\u955C\u53BB\u770B\u56FE\u7247\uFF0C\u56FE\u7247\u5C31\u4F1A\u53D8\u5F97\u6A21\u7CCA\u3002\u8FD9\u65F6\uFF0C\u5C31\u9700\u8981\u4F7F\u7528 @2x \u751A\u81F3 @3x \u56FE\u6765\u907F\u514D\u56FE\u7247\u7684\u5931\u771F\u3002</p><h2 id="\u27A3-get-post\u8BF7\u6C42\u4F20\u53C2\u957F\u5EA6\u6709\u4EC0\u4E48\u7279\u70B9" tabindex="-1"><a class="header-anchor" href="#\u27A3-get-post\u8BF7\u6C42\u4F20\u53C2\u957F\u5EA6\u6709\u4EC0\u4E48\u7279\u70B9" aria-hidden="true">#</a> \u27A3 Get/Post\u8BF7\u6C42\u4F20\u53C2\u957F\u5EA6\u6709\u4EC0\u4E48\u7279\u70B9</h2><p>\u6211\u4EEC\u7ECF\u5E38\u8BF4get\u8BF7\u6C42\u53C2\u6570\u7684\u5927\u5C0F\u5B58\u5728\u9650\u5236\uFF0C\u800Cpost\u8BF7\u6C42\u7684\u53C2\u6570\u5927\u5C0F\u662F\u65E0\u9650\u5236\u7684\u3002\u8FD9\u662F\u4E00\u4E2A\u9519\u8BEF\u7684\u8BF4\u6CD5\uFF0C\u5B9E\u9645\u4E0AHTTP \u534F\u8BAE\u4ECE\u672A\u89C4\u5B9A GET/POST \u7684\u8BF7\u6C42\u957F\u5EA6\u9650\u5236\u662F\u591A\u5C11\u3002\u5BF9get\u8BF7\u6C42\u53C2\u6570\u7684\u9650\u5236\u662F\u6765\u6E90\u4E0E\u6D4F\u89C8\u5668\u6216web\u670D\u52A1\u5668\uFF0C\u6D4F\u89C8\u5668\u6216web\u670D\u52A1\u5668\u9650\u5236\u4E86url\u7684\u957F\u5EA6\u3002\u4E3A\u4E86\u660E\u786E\u8FD9\u4E2A\u6982\u5FF5\uFF0C\u6211\u4EEC\u5FC5\u987B\u518D\u6B21\u5F3A\u8C03\u4E0B\u9762\u51E0\u70B9:</p><p>HTTP \u534F\u8BAE \u672A\u89C4\u5B9A GET \u548CPOST\u7684\u957F\u5EA6\u9650\u5236</p><p>GET\u7684\u6700\u5927\u957F\u5EA6\u663E\u793A\u662F\u56E0\u4E3A \u6D4F\u89C8\u5668\u548C web\u670D\u52A1\u5668\u9650\u5236\u4E86 URI\u7684\u957F\u5EA6</p><p>\u4E0D\u540C\u7684\u6D4F\u89C8\u5668\u548CWEB\u670D\u52A1\u5668\uFF0C\u9650\u5236\u7684\u6700\u5927\u957F\u5EA6\u4E0D\u4E00\u6837</p><p>\u8981\u652F\u6301IE\uFF0C\u5219\u6700\u5927\u957F\u5EA6\u4E3A2083byte\uFF0C\u82E5\u53EA\u652F\u6301Chrome\uFF0C\u5219\u6700\u5927\u957F\u5EA6 8182byte</p><h2 id="\u27A3-\u524D\u7AEF\u9700\u8981\u6CE8\u610F\u54EA\u4E9B-seo" tabindex="-1"><a class="header-anchor" href="#\u27A3-\u524D\u7AEF\u9700\u8981\u6CE8\u610F\u54EA\u4E9B-seo" aria-hidden="true">#</a> \u27A3 \u524D\u7AEF\u9700\u8981\u6CE8\u610F\u54EA\u4E9B SEO</h2><ul><li><p>\u5408\u7406\u7684 title\u3001description\u3001keywords\uFF1A\u641C\u7D22\u5BF9\u7740\u4E09\u9879\u7684\u6743\u91CD\u9010\u4E2A\u51CF\u5C0F\uFF0Ctitle \u503C\u5F3A\u8C03\u91CD\u70B9\u5373\u53EF\uFF0C\u91CD\u8981\u5173\u952E\u8BCD\u51FA\u73B0\u4E0D\u8981\u8D85\u8FC7 2 \u6B21\uFF0C\u800C\u4E14\u8981\u9760\u524D\uFF0C\u4E0D\u540C\u9875\u9762 title \u8981\u6709\u6240\u4E0D\u540C\uFF1Bdescription \u628A\u9875\u9762\u5185\u5BB9\u9AD8\u5EA6\u6982\u62EC\uFF0C\u957F\u5EA6\u5408\u9002\uFF0C\u4E0D\u53EF\u8FC7\u5206\u5806\u780C\u5173\u952E\u8BCD\uFF0C\u4E0D\u540C\u9875\u9762 description \u6709\u6240\u4E0D\u540C\uFF1Bkeywords \u5217\u4E3E\u51FA\u91CD\u8981\u5173\u952E\u8BCD\u5373\u53EF\u3002</p></li><li><p>\u8BED\u4E49\u5316\u7684 HTML \u4EE3\u7801\uFF0C\u7B26\u5408 W3C \u89C4\u8303\uFF1A\u8BED\u4E49\u5316\u4EE3\u7801\u8BA9\u641C\u7D22\u5F15\u64CE\u5BB9\u6613\u7406\u89E3\u7F51\u9875</p></li><li><p>\u91CD\u8981\u5185\u5BB9 HTML \u4EE3\u7801\u653E\u5728\u6700\u524D\uFF1A\u641C\u7D22\u5F15\u64CE\u6293\u53D6 HTML \u987A\u5E8F\u662F\u4ECE\u4E0A\u5230\u4E0B\uFF0C\u6709\u7684\u641C\u7D22\u5F15\u64CE\u5BF9\u6293\u53D6\u957F\u5EA6\u6709\u9650\u5236\uFF0C\u4FDD\u8BC1\u91CD\u8981\u5185\u5BB9\u4E00\u5B9A\u4F1A\u88AB\u6293\u53D6</p></li><li><p>\u91CD\u8981\u5185\u5BB9\u4E0D\u8981\u7528 js \u8F93\u51FA\uFF1A\u722C\u866B\u4E0D\u4F1A\u6267\u884C js \u83B7\u53D6\u5185\u5BB9</p></li><li><p>\u5C11\u7528 iframe(\u641C\u7D22\u5F15\u64CE\u4E0D\u4F1A\u6293\u53D6 iframe \u4E2D\u7684\u5185\u5BB9)</p></li><li><p>\u975E\u88C5\u9970\u6027\u56FE\u7247\u5FC5\u987B\u52A0 alt</p></li><li><p>\u63D0\u9AD8\u7F51\u7AD9\u901F\u5EA6(\u7F51\u7AD9\u901F\u5EA6\u662F\u641C\u7D22\u5F15\u64CE\u6392\u5E8F\u7684\u4E00\u4E2A\u91CD\u8981\u6307\u6807)</p></li></ul><h2 id="\u27A3-\u5B9E\u73B0\u4E00\u4E2A\u9875\u9762\u64CD\u4F5C\u4E0D\u4F1A\u6574\u9875\u5237\u65B0\u7684\u7F51\u7AD9-\u5E76\u4E14\u80FD\u5728\u6D4F\u89C8\u5668\u524D\u8FDB\u3001\u540E-\u9000\u65F6\u6B63\u786E\u54CD\u5E94\u3002\u7ED9\u51FA\u4F60\u7684\u6280\u672F\u5B9E\u73B0\u65B9\u6848" tabindex="-1"><a class="header-anchor" href="#\u27A3-\u5B9E\u73B0\u4E00\u4E2A\u9875\u9762\u64CD\u4F5C\u4E0D\u4F1A\u6574\u9875\u5237\u65B0\u7684\u7F51\u7AD9-\u5E76\u4E14\u80FD\u5728\u6D4F\u89C8\u5668\u524D\u8FDB\u3001\u540E-\u9000\u65F6\u6B63\u786E\u54CD\u5E94\u3002\u7ED9\u51FA\u4F60\u7684\u6280\u672F\u5B9E\u73B0\u65B9\u6848" aria-hidden="true">#</a> \u27A3 \u5B9E\u73B0\u4E00\u4E2A\u9875\u9762\u64CD\u4F5C\u4E0D\u4F1A\u6574\u9875\u5237\u65B0\u7684\u7F51\u7AD9\uFF0C\u5E76\u4E14\u80FD\u5728\u6D4F\u89C8\u5668\u524D\u8FDB\u3001\u540E \u9000\u65F6\u6B63\u786E\u54CD\u5E94\u3002\u7ED9\u51FA\u4F60\u7684\u6280\u672F\u5B9E\u73B0\u65B9\u6848\uFF1F</h2><p>\u7B2C\u4E00\u6B65\uFF0C\u901A\u8FC7\u4F7F\u7528 pushState + ajax \u5B9E\u73B0\u6D4F\u89C8\u5668\u65E0\u5237\u65B0\u524D\u8FDB\u540E\u9000\uFF0C\u5F53\u4E00\u6B21 ajax \u8C03\u7528\u6210\u529F\u540E\u6211\u4EEC\u5C06\u4E00 \u6761 state \u8BB0\u5F55\u52A0\u5165\u5230 history \u5BF9\u8C61\u4E2D\u3002</p><p>\u7B2C\u4E8C\u6B65\uFF0C\u4E00\u6761 state \u8BB0\u5F55\u5305\u542B\u4E86 url\u3001title \u548C content \u5C5E\u6027\uFF0C\u5728 popstate \u4E8B\u4EF6\u4E2D\u53EF\u4EE5 \u83B7\u53D6\u5230\u8FD9\u4E2A state \u5BF9\u8C61\uFF0C\u6211\u4EEC\u53EF \u4EE5\u4F7F\u7528 content \u6765\u4F20\u9012\u6570\u636E\u3002\u7B2C\u4E09\u6B65\uFF0C\u6211\u4EEC\u901A\u8FC7\u5BF9 window.onpopstate \u4E8B\u4EF6\u76D1\u542C\u6765\u54CD\u5E94\u6D4F\u89C8\u5668 \u7684\u524D\u8FDB\u540E\u9000\u64CD\u4F5C\u3002</p><p>\u4F7F\u7528 pushState \u6765\u5B9E\u73B0\u6709\u4E24\u4E2A\u95EE\u9898\uFF0C\u4E00\u4E2A\u662F\u6253\u5F00\u9996\u9875\u65F6\u6CA1\u6709\u8BB0\u5F55\uFF0C\u6211\u4EEC\u53EF\u4EE5\u4F7F\u7528 replaceState \u6765\u5C06\u9996\u9875\u7684\u8BB0\u5F55\u66FF\u6362\uFF0C\u53E6\u4E00\u4E2A\u95EE \u9898\u662F\u5F53\u4E00\u4E2A\u9875\u9762\u5237\u65B0\u7684\u65F6\u5019\uFF0C\u4ECD\u7136\u4F1A\u5411\u670D\u52A1\u5668\u7AEF\u8BF7\u6C42\u6570\u636E\uFF0C\u56E0\u6B64\u5982\u679C\u8BF7\u6C42\u7684 url \u9700\u8981\u540E\u7AEF\u7684\u914D \u5408\u5C06\u5176\u91CD\u5B9A\u5411\u5230\u4E00\u4E2A\u9875\u9762\u3002</p><p>\u66F4\u591A\u53C2\u8003\uFF1Ahttp://blog.chenxu.me/post/detail?id=ed4f0732-897f-48e4-9d4f-821e82f17fad</p><h2 id="\u27A3-reflect-\u5BF9\u8C61\u521B\u5EFA\u76EE\u7684" tabindex="-1"><a class="header-anchor" href="#\u27A3-reflect-\u5BF9\u8C61\u521B\u5EFA\u76EE\u7684" aria-hidden="true">#</a> \u27A3 Reflect \u5BF9\u8C61\u521B\u5EFA\u76EE\u7684\uFF1F</h2><p>\u5C06 Object \u5BF9 \u8C61 \u7684 \u4E00 \u4E9B \u660E \u663E \u5C5E \u4E8E \u8BED \u8A00 \u5185 \u90E8 \u7684 \u65B9 \u6CD5 \uFF08 \u6BD4 \u5982 Object.defineProperty\uFF0C\u653E\u5230 Reflect \u5BF9\u8C61\u4E0A\u3002</p><p>\u4FEE\u6539\u67D0\u4E9B Object \u65B9\u6CD5\u7684\u8FD4\u56DE\u7ED3\u679C\uFF0C\u8BA9\u5176\u53D8\u5F97\u66F4\u5408\u7406\u3002</p><p>\u8BA9 Object \u64CD\u4F5C\u90FD\u53D8\u6210\u51FD\u6570\u884C\u4E3A\u3002</p><p>Reflect \u5BF9\u8C61\u7684\u65B9\u6CD5\u4E0E Proxy \u5BF9\u8C61\u7684\u65B9\u6CD5\u4E00\u4E00\u5BF9\u5E94\uFF0C\u53EA\u8981\u662F Proxy \u5BF9\u8C61 \u7684\u65B9\u6CD5\uFF0C\u5C31\u80FD\u5728 Reflect \u5BF9\u8C61\u4E0A\u627E\u5230\u5BF9\u5E94\u7684\u65B9\u6CD5\u3002\u8FD9\u5C31\u8BA9 Proxy \u5BF9\u8C61\u53EF \u4EE5\u65B9\u4FBF\u5730\u8C03\u7528\u5BF9\u5E94\u7684 Reflect \u65B9\u6CD5\uFF0C\u5B8C\u6210\u9ED8\u8BA4\u884C\u4E3A\uFF0C\u4F5C\u4E3A\u4FEE\u6539\u884C\u4E3A\u7684\u57FA\u7840\u3002</p><p>\u4E5F\u5C31\u662F\u8BF4\uFF0C\u4E0D\u7BA1 Proxy \u600E\u4E48\u4FEE\u6539\u9ED8\u8BA4\u884C\u4E3A\uFF0C\u4F60\u603B\u53EF\u4EE5\u5728 Reflect \u4E0A\u83B7\u53D6 \u9ED8\u8BA4\u884C\u4E3A\u3002</p><h2 id="\u27A3-\u4F60\u662F\u600E\u4E48\u7406\u89E3html\u8BED\u4E49\u5316" tabindex="-1"><a class="header-anchor" href="#\u27A3-\u4F60\u662F\u600E\u4E48\u7406\u89E3html\u8BED\u4E49\u5316" aria-hidden="true">#</a> \u27A3 \u4F60\u662F\u600E\u4E48\u7406\u89E3HTML\u8BED\u4E49\u5316</h2><h2 id="\u27A3-\u5F85\u5B8C\u5584" tabindex="-1"><a class="header-anchor" href="#\u27A3-\u5F85\u5B8C\u5584" aria-hidden="true">#</a> \u27A3 \u5F85\u5B8C\u5584</h2><p>\u4F60\u7528\u8FC7\u54EA\u4E9BHTML5\u6807\u7B7E meta viewport \u662F\u505A\u4EC0\u4E48\u7528\u7684\uFF0C\u600E\u4E48\u5199 label\u6807\u7B7E\u7684\u4F5C\u7528 \u884C\u5185\u5143\u7D20\u6709\u54EA\u4E9B\uFF1F\u5757\u7EA7\u5143\u7D20\u6709\u54EA\u4E9B\uFF1F \u7A7A(void)\u5143\u7D20\u6709\u90A3\u4E9B\uFF1F a\u6807\u7B7E\u4E2D \u5982\u4F55\u7981\u7528href \u8DF3\u8F6C\u9875\u9762 \u6216 \u5B9A\u4F4D\u94FE\u63A5 canvas\u5728\u6807\u7B7E\u4E0A\u8BBE\u7F6E\u5BBD\u9AD8 \u548C\u5728style\u4E2D\u8BBE\u7F6E\u5BBD\u9AD8\u6709\u4EC0\u4E48\u533A\u522B \u4F60\u505A\u7684\u9875\u9762\u5728\u54EA\u4E9B\u6D41\u89C8\u5668\u6D4B\u8BD5\u8FC7\uFF1F\u8FD9\u4E9B\u6D4F\u89C8\u5668\u7684\u5185\u6838\u5206\u522B\u662F\u4EC0\u4E48? iframe\u6709\u54EA\u4E9B\u7F3A\u70B9\uFF1F HTML5\u65B0\u7279\u6027 HTML5\u79BB\u7EBF\u50A8\u5B58 \u6D4F\u89C8\u5668\u662F\u600E\u4E48\u5BF9HTML5\u7684\u79BB\u7EBF\u50A8\u5B58\u8D44\u6E90\u8FDB\u884C\u7BA1\u7406\u548C\u52A0\u8F7D\u7684\u5462 Doctype\u4F5C\u7528? \u4E25\u683C\u6A21\u5F0F\u4E0E\u6DF7\u6742\u6A21\u5F0F\u5982\u4F55\u533A\u5206\uFF1F\u5B83\u4EEC\u6709\u4F55\u610F\u4E49? HTML\u4E0EXHTML\u2014\u2014\u4E8C\u8005\u6709\u4EC0\u4E48\u533A\u522B</p><p>CSS: \u9875\u9762\u6E32\u67D3\u65F6\uFF0Cdom \u5143\u7D20\u6240\u91C7\u7528\u7684 \u5E03\u5C40\u6A21\u578B,\u53EF\u901A\u8FC7box-sizing\u8FDB\u884C\u8BBE\u7F6E\u3002\u6839\u636E\u8BA1\u7B97\u5BBD\u9AD8\u7684\u533A\u57DF\u53EF\u5206\u4E3A\uFF1A ie\u76D2\u6A21\u578B\u7B97\u4E0Aborder\u3001padding\u53CA\u81EA\u8EAB\uFF08\u4E0D\u7B97margin\uFF09\uFF0C\u6807\u51C6\u7684\u53EA\u7B97\u4E0A\u81EA\u8EAB\u7A97\u4F53\u7684\u5927\u5C0F css\u8BBE\u7F6E\u65B9\u6CD5\u5982\u4E0B\uFF1A \u51E0\u79CD\u83B7\u5F97\u5BBD\u9AD8\u7684\u65B9\u5F0F : \u62D3\u5C55\u5404\u79CD\u83B7\u5F97\u5BBD\u9AD8\u7684\u65B9\u5F0F : \u8FB9\u8DDD\u91CD\u53E0\u89E3\u51B3\u65B9\u6848(BFC) BFC\u539F\u7406 css reset\u548Cnormalize.css\u6709\u4EC0\u4E48\u533A\u522B \u5C45\u4E2D\u65B9\u6CD5\uFF1A css\u4F18\u5148\u786E\u5B9A\u7EA7: \u5982\u4F55\u6E05\u9664\u6D6E\u52A8\uFF1A \u81EA\u9002\u5E94\u5E03\u5C40\uFF1A link @import\u5BFC\u5165css: \u957F\u5BBD\u6BD4\u65B9\u6848: display\u76F8\u5173: CSS\u4F18\u5316\uFF1A CSS\u5F00\u542FGPU\u52A0\u901F \u5F00\u542FGPU\u786C\u4EF6\u52A0\u901F\u53EF\u80FD\u89E6\u53D1\u7684\u95EE\u9898\uFF1A CSS\u4E2Dlink\u4E0E@import\u7684\u533A\u522B\uFF1A CSS\u9009\u62E9\u5668\u5217\u8868\u4F18\u5148\u7EA7\u53CA\u6743\u91CD\uFF1A display:none\u548Cvisibility:hidden\u7684\u533A\u522B\uFF1A position\u7684absolute\u4E0Efixed\u5171\u540C\u70B9\u4E0E\u4E0D\u540C\u70B9\uFF1A \u4ECB\u7ECD\u4E00\u4E0BCSS\u7684\u76D2\u5B50\u6A21\u578B\uFF1A CSS\u9009\u62E9\u7B26\u6709\u54EA\u4E9B\uFF1F \u54EA\u4E9B\u5C5E\u6027\u53EF\u4EE5\u7EE7\u627F\uFF1F \u4F18\u5148\u7EA7\u7B97\u6CD5\u5982\u4F55\u8BA1\u7B97:</p>`,75);function i(p,l){return e}var r=n(s,[["render",i]]);export{r as default};
