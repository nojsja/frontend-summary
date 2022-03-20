import{c as n}from"./app.0b9cca17.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},e=n(`<h2 id="\u27A3-node-js-\u7684\u4F18\u52BF\u548C\u52A3\u52BF" tabindex="-1"><a class="header-anchor" href="#\u27A3-node-js-\u7684\u4F18\u52BF\u548C\u52A3\u52BF" aria-hidden="true">#</a> \u27A3 Node.js \u7684\u4F18\u52BF\u548C\u52A3\u52BF</h2><p>** \u4F18\u52BF\uFF1A** \u5904\u7406 I/O \u5BC6\u96C6\u7684\u4EFB\u52A1\uFF0C\u4E3B\u8981\u5728\u4E8E Node \u5229\u7528\u4E8B\u4EF6\u5FAA\u73AF\u7684\u5904\u7406\u80FD\u529B\uFF0C\u800C\u4E0D\u662F\u542F\u52A8\u4E00\u4E2A\u7EBF\u7A0B\u4E3A\u6BCF\u4E00\u4E2A\u8BF7\u6C42\u670D\u52A1\uFF0C\u4E0D\u7528\u5904\u7406\u7EBF\u7A0B\u95F4\u7684\u5207\u6362\uFF0C\u8D44\u6E90\u5360\u7528\u6781\u5C11\u3002</p><p>** \u52A3\u52BF\uFF1A** \u5904\u7406 CPU \u5BC6\u96C6\u578B\u7684\u4EFB\u52A1\uFF0C\u7531\u4E8E JS \u5355\u7EBF\u7A0B\u7684\u539F\u56E0\uFF0C\u5982\u679C\u6709\u957F\u65F6\u95F4\u8FD0\u884C\u7684\u8BA1\u7B97\uFF0C\u5C06\u4F1A\u5BFC\u81F4 CPU \u65F6\u95F4\u7247\u5F97\u4E0D\u5230\u91CA\u653E\uFF0C\u4F7F\u5F97\u540E\u7EED\u7684 I/O \u4EFB\u52A1\u65E0\u6CD5\u53D1\u8D77\u3002\u56E0\u6B64\u5E94\u8BE5\u8003\u8651\u9002\u5F53\u8C03\u6574\u548C\u5206\u89E3\u5927\u578B\u8FD0\u7B97\u4EFB\u52A1\u4E3A\u591A\u4E2A\u5C0F\u4EFB\u52A1\uFF0C\u4F7F\u5F97\u8FD0\u7B97\u80FD\u591F\u9002\u65F6\u91CA\u653E\uFF0C\u5145\u5206\u5229\u7528 CPU\uFF0C\u53C8\u4E0D\u963B\u585E I/O \u8C03\u7528\u7684\u53D1\u8D77\u3002</p><h2 id="\u27A3-nodejs-\u4F7F\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#\u27A3-nodejs-\u4F7F\u7528\u573A\u666F" aria-hidden="true">#</a> \u27A3 Nodejs \u4F7F\u7528\u573A\u666F</h2><p>Nodejs \u662F\u5355\u7EBF\u7A0B\uFF0C\u975E\u963B\u585E I/O\uFF0C\u4E8B\u4EF6\u9A71\u52A8\uFF0C\u4E0D\u9002\u7528\u4E8E CPU \u5BC6\u96C6\u8FD0\u7B97\u7684\u4EFB\u52A1\u3002\u5B83\u7684\u7279\u70B9\u51B3\u5B9A\u4E86\u5B83\u9002\u5408\u505A\u4E00\u4E9B\u5927\u91CF I/O \u7684\u4E1C\u897F\uFF0C\u6BD4\u5982\uFF0C\u804A\u5929\u5BA4\uFF0C\u8868\u5355\u63D0\u4EA4\u7B49\u4E0D\u9700\u8981\u5927\u91CF\u8BA1\u7B97\u7684\u529F\u80FD\u3002\u505A\u4E00\u4E9B\u5FAE\u4FE1\u540E\u7AEF\u5F00\u53D1\uFF0C\u6216\u8005\u505A\u6D88\u606F\u7CFB\u7EDF\u7B49\u3002\u53EF\u4EE5\u6574\u4E2A\u9879\u76EE\u7528\uFF0C \u4E5F\u53EF\u4EE5\u6839\u636E\u5B83\u7684\u7279\u70B9\u5728\u67D0\u4E2A\u6A21\u5757\u4F7F\u7528\uFF0C\u6BD4\u5982 socketio\uFF0C\u6253\u9020\u4E00\u4E2A\u6D88\u606F\u7CFB\u7EDF\u7B49\u3002</p><h2 id="\u27A3-nodejs-\u4E2D\u7684-stream-\u548C-buffer-\u6709\u4EC0\u4E48\u533A\u522B" tabindex="-1"><a class="header-anchor" href="#\u27A3-nodejs-\u4E2D\u7684-stream-\u548C-buffer-\u6709\u4EC0\u4E48\u533A\u522B" aria-hidden="true">#</a> \u27A3 Nodejs \u4E2D\u7684 Stream \u548C Buffer \u6709\u4EC0\u4E48\u533A\u522B?</h2><p>Buffer\uFF1A\u4E3A\u6570\u636E\u7F13\u51B2\u5BF9\u8C61\uFF0C\u662F\u4E00\u4E2A\u7C7B\u4F3C\u6570\u7EC4\u7ED3\u6784\u7684\u5BF9\u8C61\uFF0C\u53EF\u4EE5\u901A\u8FC7\u6307\u5B9A\u5F00\u59CB\u5199\u5165\u7684\u4F4D\u7F6E\u53CA\u5199\u5165\u7684\u6570\u636E\u957F\u5EA6\uFF0C\u5F80\u5176\u4E2D\u5199\u5165\u4E8C\u8FDB\u5236\u6570\u636E\u3002Stream\uFF1A\u662F\u5BF9 buffer \u5BF9\u8C61\u7684\u9AD8\u7EA7\u5C01\u88C5\uFF0C\u5176\u64CD\u4F5C\u7684\u5E95\u5C42\u8FD8\u662F buffer \u5BF9\u8C61\uFF0C stream \u53EF\u4EE5\u8BBE\u7F6E\u4E3A\u53EF\u8BFB\u3001\u53EF\u5199\uFF0C\u6216\u8005\u5373\u53EF\u8BFB\u4E5F\u53EF\u5199\uFF0C\u5728 nodejs \u4E2D\u7EE7\u627F\u4E86 EventEmitter \u63A5\u53E3\uFF0C\u53EF\u4EE5\u76D1\u542C\u8BFB\u5165\u3001\u5199\u5165\u7684\u8FC7\u7A0B\u3002\u5177\u4F53\u5B9E\u73B0\u6709\u6587\u4EF6\u6D41\uFF0Chttpresponse \u7B49\u3002</p><h2 id="\u27A3-node-js-\u548C-webpack-\u5BF9\u6A21\u5757\u5FAA\u73AF\u4F9D\u8D56\u7684\u5904\u7406" tabindex="-1"><a class="header-anchor" href="#\u27A3-node-js-\u548C-webpack-\u5BF9\u6A21\u5757\u5FAA\u73AF\u4F9D\u8D56\u7684\u5904\u7406" aria-hidden="true">#</a> \u27A3 Node.js \u548C Webpack \u5BF9\u6A21\u5757\u5FAA\u73AF\u4F9D\u8D56\u7684\u5904\u7406</h2><p>\u4E3E\u4F8B\uFF0CA \u548C B \u76F8\u4E92\u4F9D\u8D56\uFF0C\u6211\u4EEC\u8FD0\u884C A.js\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// A.js:</span>
<span class="token keyword">let</span> b <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./B&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token constant">A</span><span class="token operator">:</span> <span class="token string">&#39;this is a Object&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>


console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;A: before log b&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;A: after log b&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// B.js:</span>

<span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./A&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token constant">B</span><span class="token operator">:</span> <span class="token string">&#39;this is b Object&#39;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;B: before log a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;B: after log a&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br></div></div><h3 id="\u4E00\u3001node-js-\u7684\u5904\u7406" tabindex="-1"><a class="header-anchor" href="#\u4E00\u3001node-js-\u7684\u5904\u7406" aria-hidden="true">#</a> \u4E00\u3001Node.js \u7684\u5904\u7406</h3><h4 id="_1-\u5DE5\u4F5C\u65B9\u5F0F" tabindex="-1"><a class="header-anchor" href="#_1-\u5DE5\u4F5C\u65B9\u5F0F" aria-hidden="true">#</a> 1. \u5DE5\u4F5C\u65B9\u5F0F</h4><p>Node.js \u5177\u6709\u4E24\u4E2A\u7279\u6027\uFF1A<strong>\u8FD0\u884C\u65F6\u52A0\u8F7D\u548C\u7F13\u5B58\u5DF2\u52A0\u8F7D\u6A21\u5757</strong>\u3002</p><p>\u4E3A\u4E86\u907F\u514D\u65E0\u9650\u5FAA\u73AF\u7684\u6A21\u5757\u4F9D\u8D56\uFF0C\u5728 Node.js \u8FD0\u884C A.js \u4E4B\u540E\uFF0C\u5B83\u5C31\u88AB\u7F13\u5B58\u4E86\uFF0C\u4F46\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u6B64\u65F6\u7F13\u5B58\u7684\u4EC5\u4EC5\u662F\u4E00\u4E2A\u672A\u5B8C\u5DE5\u7684 A.js\uFF08an unfinished copy of the a.js\uFF09\u3002\u6240\u4EE5\u5728 B.js require A.js \u65F6\uFF0C\u5F97\u5230\u7684\u4EC5\u4EC5\u662F\u7F13\u5B58\u4E2D\u4E00\u4E2A\u672A\u5B8C\u5DE5\u7684 A.js\uFF0C\u5177\u4F53\u6765\u8BF4\uFF0C\u5B83\u5E76\u6CA1\u6709\u660E\u786E\u88AB\u5BFC\u51FA\u7684\u5177\u4F53\u5185\u5BB9\uFF08A.js \u5C3E\u7AEF\uFF09\u3002\u6240\u4EE5 B.js \u4E2D\u8F93\u51FA\u7684 a \u662F\u4E00\u4E2A\u7A7A\u5BF9\u8C61\u3002\u4E4B\u540E\uFF0CB.js \u987A\u5229\u6267\u884C\u5B8C\uFF0C\u56DE\u5230 A.js \u7684 require \u8BED\u53E5\u4E4B\u540E\uFF0C\u7EE7\u7EED\u6267\u884C\u5B8C\u6210\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// a.js</span>
module<span class="token punctuation">.</span>exports<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">var</span> b <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./b&#39;</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports<span class="token punctuation">.</span>a <span class="token operator">=</span> <span class="token number">2</span>

<span class="token comment">// b.js</span>
module<span class="token punctuation">.</span>exports<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">11</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./a&#39;</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
module<span class="token punctuation">.</span>exports<span class="token punctuation">.</span>b <span class="token operator">=</span> <span class="token number">22</span>

<span class="token comment">//main.js</span>
<span class="token keyword">var</span> a <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./a&#39;</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br></div></div><h4 id="_2-\u6267\u884C\u8FC7\u7A0B" tabindex="-1"><a class="header-anchor" href="#_2-\u6267\u884C\u8FC7\u7A0B" aria-hidden="true">#</a> 2. \u6267\u884C\u8FC7\u7A0B</h4><ul><li>\u6267\u884C node main.js -&gt; \u7B2C\u4E00\u884C require(a.js)\uFF0C\uFF08node \u6267\u884C\u4E5F\u53EF\u4EE5\u7406\u89E3\u4E3A\u8C03\u7528\u4E86 require \u65B9\u6CD5\uFF0C\u6211\u4EEC\u7701\u7565 require(main.js) \u5185\u5BB9\uFF09</li><li>\u8FDB\u5165 require(a) \u65B9\u6CD5\uFF1A \u5224\u65AD\u7F13\u5B58\uFF08\u65E0\uFF09 -&gt; \u521D\u59CB\u5316\u4E00\u4E2A module -&gt; \u5C06 module \u52A0\u5165\u7F13\u5B58 -&gt; \u6267\u884C\u6A21\u5757 a.js \u5185\u5BB9\uFF0C\uFF08\u9700\u8981\u6CE8\u610F \u662F\u5148\u52A0\u5165\u7F13\u5B58\uFF0C \u540E\u6267\u884C\u6A21\u5757\u5185\u5BB9\uFF09</li><li>a.js\uFF1A \u7B2C\u4E00\u884C\u5BFC\u51FA a = 1 -&gt; \u7B2C\u4E8C\u884C require(b.js)\uFF08a \u53EA\u6267\u884C\u4E86\u7B2C\u4E00\u884C\uFF09</li><li>\u8FDB\u5165 require(b) \u5185 \u540C 1 -&gt; \u6267\u884C\u6A21\u5757 b.js \u5185\u5BB9</li><li>b.js\uFF1A \u7B2C\u4E00\u884C b = 11 -&gt; \u7B2C\u4E8C\u884C require(a.js)</li><li>require(a) \u6B64\u65F6 a.js \u662F\u7B2C\u4E8C\u6B21\u8C03\u7528 require -&gt; \u5224\u65AD\u7F13\u5B58\uFF08\u6709\uFF09-&gt; cachedModule.exports -&gt; \u56DE\u5230 b.js\uFF08\u56E0\u4E3A js \u5BF9\u8C61\u5F15\u7528\u95EE\u9898 \u6B64\u65F6\u7684 cachedModule.exports = { a: 1 }\uFF09</li><li>b.js\uFF1A\u7B2C\u4E09\u884C \u8F93\u51FA {a: 1} -&gt; \u7B2C\u56DB\u884C \u4FEE\u6539 b = 22 -&gt; \u6267\u884C\u5B8C\u6BD5\u56DE\u5230 a.js</li><li>a.js\uFF1A\u7B2C\u4E8C\u884C require \u5B8C\u6BD5 \u83B7\u53D6\u5230 b -&gt; \u7B2C\u4E09\u884C \u8F93\u51FA {b: 22} -&gt; \u7B2C\u56DB\u884C \u5BFC\u51FA a = 2 -&gt; \u6267\u884C\u5B8C\u6BD5\u56DE\u5230 main.js</li><li>main.js\uFF1A\u83B7\u53D6 a -&gt; \u7B2C\u4E8C\u884C \u8F93\u51FA {a: 2} -&gt; \u6267\u884C\u5B8C\u6BD5</li></ul><h4 id="_3-\u89E3\u51B3\u65B9\u6848" tabindex="-1"><a class="header-anchor" href="#_3-\u89E3\u51B3\u65B9\u6848" aria-hidden="true">#</a> 3. \u89E3\u51B3\u65B9\u6848</h4><p>\xA0\xA0\xA0\xA0 \u60F3\u8981\u89E3\u51B3\u8FD9\u4E2A\u95EE\u9898\u6709\u4E00\u4E2A\u5F88\u7B80\u660E\u7684\u65B9\u6CD5\uFF0C\u90A3\u5C31\u662F\u5728\u5FAA\u73AF\u4F9D\u8D56\u7684\u6BCF\u4E2A\u6A21\u5757\u4E2D\u5148\u5BFC\u51FA\u81EA\u8EAB\uFF0C\u7136\u540E\u518D\u5BFC\u5165\u5176\u4ED6\u6A21\u5757\uFF08\u5BF9\u4E8E\u672C\u6587\u7684\u4E3E\u4F8B\u6765\u8BF4\uFF0C\u5B9E\u9645\u53EA\u9700\u6539\u52A8 A.js\uFF0C\u5148\u4F7F\u7528 module.exports \u5BFC\u51FA\uFF0C\u7136\u540E\u518D require B.js\uFF09\u3002</p><h3 id="\u4E8C\u3001webpack-\u7684\u5904\u7406" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u3001webpack-\u7684\u5904\u7406" aria-hidden="true">#</a> \u4E8C\u3001Webpack \u7684\u5904\u7406</h3><h4 id="_1-\u5DE5\u4F5C\u65B9\u5F0F-1" tabindex="-1"><a class="header-anchor" href="#_1-\u5DE5\u4F5C\u65B9\u5F0F-1" aria-hidden="true">#</a> 1. \u5DE5\u4F5C\u65B9\u5F0F</h4><p><strong>ES Modules \u6A21\u5757\u8F93\u51FA\u7684\u662F\u503C\u7684\u5F15\u7528\uFF0C\u8F93\u51FA\u63A5\u53E3\u52A8\u6001\u7ED1\u5B9A\uFF0C\u5728\u7F16\u8BD1\u65F6\u6267\u884C\u3002</strong></p><p>webpack \u7684\u5934\u90E8\u542F\u52A8\u4EE3\u7801\u4E2D\uFF0C\u901A\u8FC7\u95ED\u5305\u4E2D\u7684 installedModules \u5BF9\u8C61\uFF0C\u5C06\u6A21\u5757\u540D\u6216\u8005 id \u4F5C\u4E3A\u5BF9\u8C61\u7684 key \u6765\u7F13\u5B58\u5404\u4E2A\u6A21\u5757\u7684 export \u7684\u503C\uFF0C\u901A\u8FC7\u5224\u65AD installedModules \u4E0A\u662F\u5426\u7F13\u5B58\u4E86\u5BF9\u5E94\u6A21\u5757\u7684 key \u6765\u5224\u65AD\u662F\u5426\u5DF2\u7ECF\u52A0\u8F7D\u4E86\u6A21\u5757\u3002</p><p>installedModules\uFF1A</p><div class="language-json ext-json line-numbers-mode"><pre class="language-json"><code><span class="token punctuation">{</span>
    moduleId <span class="token operator">:</span> <span class="token punctuation">{</span>
            exports <span class="token operator">:</span> <span class="token punctuation">{</span>\u4F60\u7684\u6A21\u5757\u5185\u5BB9<span class="token punctuation">}</span>\uFF0C
            loaded <span class="token operator">:</span> boolean<span class="token comment">// \u662F\u5426\u5DF2\u52A0\u8F7D\uFF0C</span>
            id <span class="token operator">:</span> moduleId
    <span class="token punctuation">}</span>
\uFF5D
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><p>\u6A21\u5757\u52A0\u8F7D\u65F6\u4ECE installModules \u627E\u662F\u4E0D\u662F\u5B58\u5728 moduleId \u8FD9\u4E2A\u6A21\u5757\uFF0C\u627E\u5230\u4E86\u5C31\u76F4\u63A5\u8FD4\u56DE\u8FD9\u4E2A module \u7684 exports \u5185\u5BB9\uFF0C\u627E\u4E0D\u5230\u5C31\u65B0\u5EFA\u4E00\u4E2A\u7A7A\u7684\u6A21\u5757\u5185\u5BB9\uFF0C\u7136\u540E\u653E\u5728 installModules \u4E2D\u3002\u6A21\u5757\u52A0\u8F7D\u8FC7\u7A0B\u5C31\u662F\u8C03\u7528\u8BB0\u5F55\u5728 modules \u4E2D\u4E0B\u6807\u4E3A moduleId \u7684\u51FD\u6570\uFF0C\u6240\u4EE5 webpack \u9700\u8981\u5C06\u6211\u4EEC\u7684\u6A21\u5757\u90FD\u5305\u88C5\u6210\u4E00\u4E2A\u53EF\u4EE5\u94FE\u63A5\u6267\u884C\u7684\u51FD\u6570\u3002\u52A0\u8F7D\u7ED3\u675F\u540E\uFF0C\u5C06 loaded \u6807\u4E3A true\uFF0C\u5E76\u8FD4\u56DE module.exports\u3002</p><h4 id="_2-\u89E3\u51B3\u65B9\u6848" tabindex="-1"><a class="header-anchor" href="#_2-\u89E3\u51B3\u65B9\u6848" aria-hidden="true">#</a> 2. \u89E3\u51B3\u65B9\u6848</h4><ul><li>1\uFF09webpack \u7684\u6A21\u5757\u7F13\u5B58\u673A\u5236\u5C1A\u672A\u5B8C\u5168\u89E3\u51B3\u5FAA\u73AF\u4F9D\u8D56\u95EE\u9898\uFF0C\u6253\u5305\u4E0D\u62A5\u9519\u7684\u60C5\u51B5\u4E0B\uFF0C\u751F\u4EA7\u73AF\u5883\u4E0B\u53EF\u80FD\u51FA\u73B0\u5404\u79CD undefined \u53D8\u91CF\u9519\u8BEF\u3002\u53EF\u4EE5\u4F7F\u7528 circular-dependency-plugin \u63D2\u4EF6\u8FDB\u884C\u5FAA\u4F9D\u8D56\u68C0\u6D4B\uFF0C\u51CF\u5C11 debug \u65F6\u95F4\u3002</li><li>2\uFF09\u6253\u7834\u6587\u4EF6\u95F4\u7684\u4F9D\u8D56\u5173\u7CFB\u7684\u95ED\u73AF\u3002</li><li>3\uFF09\u4F9D\u8D56\u5173\u7CFB\u95ED\u73AF\u7684\u60C5\u51B5\u4E0B\uFF0C\u5C06\u53D8\u91CF\u6539\u4E3A function \u5BFC\u51FA\uFF0C\u5229\u7528 function \u7684\u53D8\u91CF\u63D0\u5347\u673A\u5236\u3002</li></ul><h2 id="\u27A3-webpack-\u600E\u4E48\u5904\u7406-require-\u548C-import-\u8BED\u6CD5\u6DF7\u7528\u7684" tabindex="-1"><a class="header-anchor" href="#\u27A3-webpack-\u600E\u4E48\u5904\u7406-require-\u548C-import-\u8BED\u6CD5\u6DF7\u7528\u7684" aria-hidden="true">#</a> \u27A3 Webpack \u600E\u4E48\u5904\u7406 require \u548C import \u8BED\u6CD5\u6DF7\u7528\u7684</h2><p>\u5BF9\u4E8E es6 \u89C4\u8303\u548C commonJs \u89C4\u8303\u6765\u8BF4\uFF0C\u7ECF\u8FC7 babel \u7F16\u8BD1\u4EE5\u540E\uFF0C\u90FD\u4F1A\u8F6C\u5316\u6210 commonJs \u89C4\u8303\uFF0C\u7136\u540E\u5728\u6B64\u57FA\u7840\u4E0A\uFF0C\u7528__esModule \u533A\u5206\u4E86\u662F\u5C5E\u4E8E es6 \u6A21\u5757\u8FD8\u662F commonJs \u6A21\u5757\u3002\u5E76\u5207\u4E3A\u4E86\u4FDD\u8BC1 es6 \u89C4\u8303\u7528 import \u5BFC\u5165\u503C\u7684\u6B63\u786E\u6027\u548C\u7EDF\u4E00\u6027\uFF0Cbabel \u8FD8\u505A\u4E86\u4E00\u4E9B\u7B56\u7565\u53BB\u5904\u7406\u8FD9\u4E24\u8005\u4E4B\u524D\u7684\u5DEE\u5F02\u3002</p><h2 id="\u27A3-\u524D\u7AEF\u6A21\u5757\u5316\u5386\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u27A3-\u524D\u7AEF\u6A21\u5757\u5316\u5386\u7A0B" aria-hidden="true">#</a> \u27A3 \u524D\u7AEF\u6A21\u5757\u5316\u5386\u7A0B</h2><p>\u6A21\u5757\u5316\u4E3B\u8981\u662F\u7528\u6765\u62BD\u79BB\u516C\u5171\u4EE3\u7801\uFF0C\u9694\u79BB\u4F5C\u7528\u57DF\uFF0C\u907F\u514D\u53D8\u91CF\u51B2\u7A81\u7B49\u3002</p><h5 id="_1-iife-\u7ACB\u5373\u6267\u884C\u51FD\u6570" tabindex="-1"><a class="header-anchor" href="#_1-iife-\u7ACB\u5373\u6267\u884C\u51FD\u6570" aria-hidden="true">#</a> 1. IIFE - \u7ACB\u5373\u6267\u884C\u51FD\u6570</h5><p>\u4F7F\u7528\u81EA\u6267\u884C\u51FD\u6570\u6765\u7F16\u5199\u6A21\u5757\u5316\uFF0C\u7279\u70B9\uFF1A\u5728\u4E00\u4E2A\u5355\u72EC\u7684\u51FD\u6570\u4F5C\u7528\u57DF\u4E2D\u6267\u884C\u4EE3\u7801\uFF0C\u907F\u514D\u53D8\u91CF\u51B2\u7A81\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token punctuation">{</span>
	<span class="token literal-property property">data</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div><h5 id="_2-amd-requirejs" tabindex="-1"><a class="header-anchor" href="#_2-amd-requirejs" aria-hidden="true">#</a> 2. AMD - requireJs</h5><p>\u6A21\u5757\u4F9D\u8D56\u9700\u8981\u63D0\u524D\u58F0\u660E\u597D\uFF0C\u4E0D\u652F\u6301\u52A8\u6001\u8BBE\u7F6E\u4F9D\u8D56</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">define</span><span class="token punctuation">(</span><span class="token string">&#39;./index.js&#39;</span><span class="token punctuation">,</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">code</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
	<span class="token comment">// code \u5C31\u662F index.js \u8FD4\u56DE\u7684\u5185\u5BB9</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h5 id="_3-cmd-seajs" tabindex="-1"><a class="header-anchor" href="#_3-cmd-seajs" aria-hidden="true">#</a> 3. CMD - seaJs</h5><p>\u652F\u6301\u52A8\u6001\u4F9D\u8D56\u8BBE\u7F6E</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token function">define</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">require<span class="token punctuation">,</span> exports<span class="token punctuation">,</span> module</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> indexCode <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;./index.js&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h5 id="_4-commonjs-node-js-\u6A21\u5757\u89C4\u8303" tabindex="-1"><a class="header-anchor" href="#_4-commonjs-node-js-\u6A21\u5757\u89C4\u8303" aria-hidden="true">#</a> 4. commonJs - Node.js \u6A21\u5757\u89C4\u8303</h5><p>\xA0\xA0\xA0\xA0 \u5C5E\u4E8E\u52A8\u6001\u5BFC\u5165\u89C4\u8303\uFF0C\u53EF\u4EE5\u5728\u6761\u4EF6\u8BED\u53E5\u4E2D\u5BFC\u5165\u5176\u5B83\u6A21\u5757\uFF0C\u7279\u70B9: require\u3001module.exports\u3001exports\u3002commonJs \u4E00\u822C\u7528\u5728\u670D\u52A1\u7AEF\u6216\u8005 Node \u7528\u6765\u540C\u6B65\u52A0\u8F7D\u6A21\u5757\uFF0C\u5B83\u5BF9\u4E8E\u6A21\u5757\u7684\u4F9D\u8D56\u53D1\u751F\u5728\u4EE3\u7801\u8FD0\u884C\u9636\u6BB5\uFF0C\u4E0D\u9002\u5408\u5728\u6D4F\u89C8\u5668\u7AEF\u505A\u5F02\u6B65\u52A0\u8F7D\u3002exports \u5B9E\u9645\u4E0A\u662F\u4E00\u4E2A\u5BF9 module.exports \u7684\u5F15\u7528\uFF0C\u4E0D\u80FD\u7ED9 exports \u8D4B\u503C\uFF0C\u5426\u5219\u4F1A\u65AD\u5F00\u4E0E module.exports \u7684\u8FDE\u63A5\uFF1A</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>  exports<span class="token punctuation">.</span><span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">add</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">/* \u65B9\u6CD5 */</span><span class="token punctuation">}</span>
    <span class="token comment">// \u7B49\u540C\u4E8E</span>
  module<span class="token punctuation">.</span>exports<span class="token punctuation">.</span><span class="token function-variable function">add</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token function">add</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span><span class="token comment">/* \u65B9\u6CD5 */</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br></div></div><h5 id="_5-es-module-\u6D4F\u89C8\u5668\u6A21\u5757\u7CFB\u7EDF" tabindex="-1"><a class="header-anchor" href="#_5-es-module-\u6D4F\u89C8\u5668\u6A21\u5757\u7CFB\u7EDF" aria-hidden="true">#</a> 5. ES Module - \u6D4F\u89C8\u5668\u6A21\u5757\u7CFB\u7EDF</h5><p>\xA0\xA0\xA0\xA0 \u5C5E\u4E8E\u9759\u6001\u5BFC\u5165\u89C4\u8303\uFF0Cimport\u3001export ES6 \u6A21\u5757\u5316\u4E0D\u662F\u5BF9\u8C61\uFF0Cimport \u4F1A\u5728 JavaScript \u5F15\u64CE\u9759\u6001\u5206\u6790\uFF0C\u5728\u7F16\u8BD1\u65F6\u5C31\u5F15\u5165\u6A21\u5757\u4EE3\u7801\uFF0C\u800C\u5E76\u975E\u5728\u4EE3\u7801\u8FD0\u884C\u65F6\u52A0\u8F7D\uFF0C\u56E0\u6B64\u4E5F\u4E0D\u9002\u5408\u5F02\u6B65\u52A0\u8F7D\u3002</p><p>\u9759\u6001\u7684\u8BED\u6CD5\u610F\u5473\u7740\u53EF\u4EE5\u5728\u7F16\u8BD1\u65F6\u786E\u5B9A\u5BFC\u5165\u548C\u5BFC\u51FA\uFF0C\u66F4\u52A0\u5FEB\u901F\u7684\u67E5\u627E\u4F9D\u8D56\uFF0C\u53EF\u4EE5\u4F7F\u7528 lint \u5DE5\u5177\u5BF9\u6A21\u5757\u4F9D\u8D56\u8FDB\u884C\u68C0\u67E5\uFF0C\u53EF\u4EE5\u5BF9\u5BFC\u5165\u5BFC\u51FA\u52A0\u4E0A\u7C7B\u578B\u4FE1\u606F\u8FDB\u884C\u9759\u6001\u7684\u7C7B\u578B\u68C0\u67E5</p><p><strong>ESModule \u7684\u4F18\u52BF\uFF1A</strong></p><ul><li>\u6B7B\u4EE3\u7801\u68C0\u6D4B\u548C\u6392\u9664\u3002\u6211\u4EEC\u53EF\u4EE5\u7528\u9759\u6001\u5206\u6790\u5DE5\u5177\u68C0\u6D4B\u51FA\u54EA\u4E9B\u6A21\u5757\u6CA1\u6709\u88AB\u8C03\u7528\u8FC7\u3002\u6BD4\u5982\uFF0C\u5728\u5F15\u5165\u5DE5\u5177\u7C7B\u5E93\u65F6\uFF0C\u5DE5\u7A0B\u4E2D\u5F80\u5F80\u53EA\u7528\u5230\u4E86\u5176\u4E2D\u4E00\u90E8\u5206\u7EC4\u4EF6\u6216\u63A5\u53E3\uFF0C\u4F46\u6709\u53EF\u80FD\u4F1A\u5C06\u5176\u4EE3\u7801\u5B8C\u6574\u5730\u52A0\u8F7D\u8FDB\u6765\u3002\u672A\u88AB\u8C03\u7528\u5230\u7684\u6A21\u5757\u4EE3\u7801\u6C38\u8FDC\u4E0D\u4F1A\u88AB\u6267\u884C\uFF0C\u4E5F\u5C31\u6210\u4E3A\u4E86\u6B7B\u4EE3\u7801\u3002\u901A\u8FC7\u9759\u6001\u5206\u6790\u53EF\u4EE5\u5728\u6253\u5305\u65F6\u53BB\u6389\u8FD9\u4E9B\u672A\u66FE\u4F7F\u7528\u8FC7\u7684\u6A21\u5757\uFF0C\u4EE5\u51CF\u5C0F\u6253\u5305\u8D44\u6E90\u4F53\u79EF\u3002</li><li>\u6A21\u5757\u53D8\u91CF\u7C7B\u578B\u68C0\u67E5\u3002JavaScript \u5C5E\u4E8E\u52A8\u6001\u7C7B\u578B\u8BED\u8A00\uFF0C\u4E0D\u4F1A\u5728\u4EE3\u7801\u6267\u884C\u524D\u68C0\u67E5\u7C7B\u578B\u9519\u8BEF\uFF08\u6BD4\u5982\u5BF9\u4E00\u4E2A\u5B57\u7B26\u4E32\u7C7B\u578B\u7684\u503C\u8FDB\u884C\u51FD\u6570\u8C03\u7528\uFF09\u3002ES6 Module \u7684\u9759\u6001\u6A21\u5757\u7ED3\u6784\u6709\u52A9\u4E8E\u786E\u4FDD\u6A21\u5757\u4E4B\u95F4\u4F20\u9012\u7684\u503C\u6216\u63A5\u53E3\u7C7B\u578B\u662F\u6B63\u786E\u7684\u3002</li><li>\u7F16\u8BD1\u5668\u4F18\u5316\u3002\u5728 commonJs \u7B49\u52A8\u6001\u6A21\u5757\u7CFB\u7EDF\u4E2D\uFF0C\u65E0\u8BBA\u91C7\u7528\u54EA\u79CD\u65B9\u5F0F\uFF0C\u672C\u8D28\u4E0A\u5BFC\u5165\u7684\u90FD\u662F\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u800C ES6 Module \u652F\u6301\u76F4\u63A5\u5BFC\u5165\u53D8\u91CF\uFF0C\u51CF\u5C11\u4E86\u5F15\u7528\u5C42\u7EA7\uFF0C\u7A0B\u5E8F\u6548\u7387\u66F4\u9AD8\u3002</li></ul><p><strong>ESModule \u5BFC\u51FA\u7684\u503C\u662F\u5F15\u7528\u7684\u4F8B\u5B50\uFF1A</strong></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// es6 module \u4E2D\u57FA\u672C\u7C7B\u578B\u4E5F\u6309\u5F15\u7528\u4F20\u9012</span>
<span class="token comment">// foo.js</span>
<span class="token keyword">export</span> <span class="token keyword">let</span> a <span class="token operator">=</span> <span class="token number">1</span>
<span class="token keyword">export</span> <span class="token keyword">function</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
  a<span class="token operator">++</span>
<span class="token punctuation">}</span>

<span class="token comment">// main.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span>a<span class="token punctuation">,</span> count<span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;./foo&#39;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token comment">//1</span>
<span class="token function">count</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span> <span class="token comment">//2</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br></div></div><p><strong>ESModule \u548C commonJs \u5DEE\u5F02\uFF1A</strong></p><ul><li>commonJs \u6A21\u5757\u5BFC\u5165\u540E\u662F\u4E00\u4E2A\u503C\u7684\u62F7\u8D1D\uFF0C\u4E00\u65E6\u8F93\u51FA\u4E4B\u540E\uFF0C\u65E0\u8BBA\u6A21\u5757\u5185\u90E8\u600E\u4E48\u53D8\u5316\uFF0C\u90FD\u65E0\u6CD5\u5F71\u54CD\u4E4B\u524D\u7684\u5F15\u7528\uFF1B\u800C ESModule \u5BFC\u5165\u540E\u662F\u4E00\u4E2A\u5F15\u7528\u503C\u7684\u52A8\u6001\u6620\u5C04\uFF0C\u5E76\u4E14\u8FD9\u4E2A\u6620\u5C04\u662F\u53EA\u8BFB\u7684\u3002</li><li>ESModule \u662F\u5F15\u64CE\u4F1A\u5728\u9047\u5230 import \u540E\u751F\u6210\u4E00\u4E2A\u5F15\u7528\u94FE\u63A5\uFF0C\u5728\u811A\u672C\u771F\u6B63\u6267\u884C\u65F6\u624D\u4F1A\u6839\u636E\u8FD9\u4E2A\u5F15\u7528\u94FE\u63A5\u53BB\u6A21\u5757\u91CC\u9762\u53D6\u503C\uFF0C\u6A21\u5757\u5185\u90E8\u7684\u539F\u59CB\u503C\u53D8\u4E86 import \u52A0\u8F7D\u7684\u6A21\u5757\u4E5F\u4F1A\u53D8\u3002</li><li>commonJs \u8FD0\u884C\u65F6\u52A0\u8F7D\uFF0CESModule \u7F16\u8BD1\u9636\u6BB5\u5F15\u7528\u3002commonJs \u5728\u5F15\u5165\u65F6\u662F\u52A0\u8F7D\u8FD0\u884C\u6574\u4E2A\u6A21\u5757\uFF0C\u751F\u6210\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u5148\u628A\u8FD9\u4E2A\u5BF9\u8C61\u52A0\u5165\u6A21\u5757\u7F13\u5B58\uFF0C\u7136\u540E\u518D\u4ECE\u8FD9\u4E2A\u751F\u6210\u7684\u5BF9\u8C61\u4E0A\u8BFB\u53D6\u65B9\u6CD5\u548C\u5C5E\u6027\u3002\u5982\u679C\u4E00\u4E2A\u6A21\u5757\u88AB\u5176\u5B83\u6A21\u5757\u5F15\u5165\u540E\u4EBA\u4E3A\u7684\u4FEE\u6539\u4E86\u5176\u5BFC\u51FA\u5BF9\u8C61 <code>module.exports</code> \u4E0A\u7684\u5C5E\u6027\u65F6\uFF0C\u4E5F\u4F1A\u5F71\u54CD\u5230\u5176\u5B83\u9700\u8981\u5F15\u5165\u6B64\u6A21\u5757\u7684\u6A21\u5757\uFF0C\u56E0\u4E3A\u76F8\u5F53\u4E8E\u4FEE\u6539\u4E86\u6B64\u6A21\u5757\u7684\u7F13\u5B58\u5BF9\u8C61\uFF0C\u800C\u4E00\u4E2A\u6A21\u5757\u88AB\u91CD\u590D\u52A0\u8F7D\u65F6\uFF0C\u4F1A\u9996\u5148\u547D\u4E2D\u5E76\u52A0\u8F7D\u7F13\u5B58\u5BF9\u8C61\u3002</li><li>ESModule \u4E0D\u662F\u5BF9\u8C61\uFF0C\u800C\u662F\u901A\u8FC7 export \u66B4\u9732\u51FA\u8981\u8F93\u51FA\u7684\u4EE3\u7801\u5757\uFF0C\u5728 import \u65F6\u4F7F\u7528\u9759\u6001\u547D\u4EE4\u7684\u65B9\u6CD5\u5F15\u7528\u6307\u5B9A\u7684\u8F93\u51FA\u4EE3\u7801\u5757\uFF0C\u5E76\u5728 import \u8BED\u53E5\u5904\u6267\u884C\u8FD9\u4E2A\u8981\u8F93\u51FA\u7684\u4EE3\u7801\uFF0C\u800C\u4E0D\u662F\u76F4\u63A5\u52A0\u8F7D\u6574\u4E2A\u6A21\u5757\u3002</li></ul><h2 id="\u27A3-\u8C08\u8C08-node-\u5B50\u8FDB\u7A0B-child-process-\u548C\u5B9E\u9645\u4F7F\u7528\u573A\u666F" tabindex="-1"><a class="header-anchor" href="#\u27A3-\u8C08\u8C08-node-\u5B50\u8FDB\u7A0B-child-process-\u548C\u5B9E\u9645\u4F7F\u7528\u573A\u666F" aria-hidden="true">#</a> \u27A3 \u8C08\u8C08 node \u5B50\u8FDB\u7A0B child_process \u548C\u5B9E\u9645\u4F7F\u7528\u573A\u666F</h2><ol><li>\u7528\u6765\u5916\u90E8\u6267\u884C\u811A\u672C\u548C\u547D\u4EE4\u7B49\uFF0C\u5E38\u89C1\u4E8E\u4E00\u4E9B cli \u811A\u672C\u6216\u662F\u67D0\u4E9B\u4E1A\u52A1\u903B\u8F91\u9700\u8981\u4F7F\u7528\u5916\u90E8\u7B2C\u4E09\u65B9\u7A0B\u5E8F\u6267\u884C\u7684\u573A\u666F\u3002</li><li>\u53EF\u4EE5\u4F7F\u7528 child_process \u5C01\u88C5\u4E00\u4E2A\u7B80\u5355\u7684\u8FDB\u7A0B\u6C60\u7528\u4E8E\u5E76\u884C\u6267\u884C\u4E00\u4E9B\u9700\u8981\u8017\u8D39 CPU \u7684\u91CD\u8BA1\u7B97\u578B\u4EFB\u52A1\uFF0C\u4F8B\u5982\uFF1A\u56FE\u7247\u50CF\u7D20\u5904\u7406\uFF0C\u6587\u4EF6\u538B\u7F29\u7B49\u3002</li></ol><h2 id="\u27A3-node-\u662F-io-\u5BC6\u96C6\u578B\u4F53\u73B0\u5728\u54EA\u91CC" tabindex="-1"><a class="header-anchor" href="#\u27A3-node-\u662F-io-\u5BC6\u96C6\u578B\u4F53\u73B0\u5728\u54EA\u91CC" aria-hidden="true">#</a> \u27A3 node \u662F IO \u5BC6\u96C6\u578B\u4F53\u73B0\u5728\u54EA\u91CC</h2>`,56);function p(t,o){return e}var r=s(a,[["render",p]]);export{r as default};
