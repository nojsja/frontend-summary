import{c as n}from"./app.6cd025e2.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},p=n(`<h4 id="the-observer-pattern-\u89C2\u5BDF\u8005\u6A21\u5F0F" tabindex="-1"><a class="header-anchor" href="#the-observer-pattern-\u89C2\u5BDF\u8005\u6A21\u5F0F" aria-hidden="true">#</a> The Observer Pattern(\u89C2\u5BDF\u8005\u6A21\u5F0F)</h4><blockquote><p>\u89C2\u5BDF\u8005\u6A21\u5F0F -- \u5B9A\u4E49\u5BF9\u8C61\u95F4\u7684\u4E00\u79CD\u4E00\u5BF9\u591A\u7684\u4F9D\u8D56\u5173\u7CFB\uFF0C\u5F53\u4E00\u4E2A\u5BF9\u8C61\u7684\u72B6\u6001\u53D1\u751F\u6539\u53D8\u65F6\uFF0C\u6240\u6709\u4F9D\u8D56\u5B83\u7684\u5BF9\u8C61\u90FD\u5C06\u5F97\u5230\u901A\u77E5</p></blockquote><p>\u5728JavaScript\u4E2D\u89C2\u5BDF\u8005\u6A21\u5F0F\u662F\u7528\u4E8B\u4EF6\u6A21\u578B\u6765\u5B9E\u73B0\u7684\uFF0C\u89C2\u5BDF\u8005\u6A21\u5F0F\u5E7F\u6CDB\u5E94\u7528\u4E8E\u5F02\u6B65\u7F16\u7A0B\u4E2D\uFF0C\u8FD9\u662F\u4E00\u79CD\u66FF\u4EE3\u4F20\u7EDF\u56DE\u8C03\u51FD\u6570\u7684\u89E3\u51B3\u65B9\u6848\uFF0C\u6BD4\u5982\u6211\u4EEC\u53EF\u4EE5\u8BA2\u9605ajax\u8BF7\u6C42\u7684error\uFF0Csuccess\u4E8B\u4EF6\u3002\u4F7F\u7528\u89C2\u5BDF\u8005\u6A21\u5F0F\uFF0C\u6211\u4EEC\u5C31\u65E0\u9700\u5173\u6CE8\u5BF9\u8C61\u5728\u5F02\u6B65\u8FD0\u884C\u671F\u95F4\u7684\u72B6\u6001\uFF0C\u800C\u53EA\u9700\u8981\u8BA2\u9605\u611F\u5174\u8DA3\u7684\u4E8B\u4EF6\u53D1\u751F\u70B9\u3002<br> \u4F7F\u7528\u89C2\u5BDF\u8005\u6A21\u5F0F\u53EF\u4EE5\u53D6\u4EE3\u5BF9\u8C61\u4E4B\u95F4\u786C\u7F16\u7801\u7684\u901A\u77E5\u673A\u5236\uFF0C\u4E00\u4E2A\u5BF9\u8C61\u4E0D\u518D\u663E\u5F0F\u8C03\u7528\u53E6\u4E00\u4E2A\u5BF9\u8C61\u7684\u63A5\u53E3\uFF0C\u5BF9\u8C61\u4E4B\u95F4\u677E\u6563\u8026\u5408\uFF0C\u53EA\u8981\u7EF4\u6301\u4E4B\u95F4\u7EA6\u5B9A\u7684\u4E8B\u4EF6\u540D\uFF0C\u53D1\u5E03\u8005\u548C\u8BA2\u9605\u8005\u7684\u5185\u90E8\u6539\u53D8\u5C31\u5B8C\u5168\u662F\u72EC\u7ACB\u3001\u4E92\u4E0D\u5F71\u54CD\u7684\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">/* -----------------------------------------------------------------------------
  \u89C2\u5BDF\u8005\u6A21\u5F0F\uFF1A
  1. \u5168\u5C40\u7684\u89C2\u5BDF\u8005\u6A21\u5F0F\u5BF9\u8C61\uFF0C\u6240\u6709\u4E8B\u4EF6\u7684\u8BA2\u9605\u3001\u89E6\u53D1\u3001\u79FB\u9664\u90FD\u7531\u8FD9\u4E2A\u5168\u5C40\u5BF9\u8C61\u5904\u7406\uFF0C\u9002\u7528\u4E8E\u9700\u8981\u521B\u5EFA\u5927\u91CF
  \u89C2\u5BDF\u8005\u5BF9\u8C61\u3002
  2. \u6784\u5EFA\u89C2\u5BDF\u8005\u6A21\u5F0F\u7C7B\uFF0C\u4F7F\u7528\u65F6\u53EF\u4EE5\u5B9E\u4F8B\u5316\u4E00\u4E2A\u89C2\u5BDF\u8005\u5BF9\u8C61\uFF0C\u9002\u7528\u4E8E\u9700\u8981\u521B\u5EFA\u5C11\u91CF\u7684\u89C2\u5BDF\u8005\u5BF9\u8C61\u3002
----------------------------------------------------------------------------- */</span>

<span class="token keyword">function</span> <span class="token function">EventEmitter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>maxListeners <span class="token operator">=</span> <span class="token number">100</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>listeners <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>onceMap <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">EventEmitter</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">setMaxListeners</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">num</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">typeof</span> num <span class="token operator">!==</span> <span class="token string">&#39;number&#39;</span> <span class="token operator">||</span> <span class="token operator">!</span>Number<span class="token punctuation">.</span><span class="token function">isInteger</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span> <span class="token operator">||</span> num <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">)</span>
    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">Error</span><span class="token punctuation">(</span><span class="token string">&#39;setMaxListeners #### param num must be a positive integer!&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>maxListeners <span class="token operator">=</span> num<span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">EventEmitter</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">on</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> func</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>type <span class="token operator">||</span> <span class="token operator">!</span>func <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>listeners<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>listeners<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">.</span>length <span class="token operator">&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>maxListeners<span class="token punctuation">)</span> 
      <span class="token keyword">return</span> console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&#39;The max listeners limitation: &#39;</span><span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>maxListeners<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>listeners<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">push</span><span class="token punctuation">(</span>func<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>listeners<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token punctuation">[</span>func<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>onceMap<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">EventEmitter</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">once</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> func</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>type <span class="token operator">||</span> <span class="token operator">!</span>func <span class="token keyword">instanceof</span> <span class="token class-name">Function</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">on</span><span class="token punctuation">(</span>type<span class="token punctuation">,</span> func<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">this</span><span class="token punctuation">.</span>onceMap<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token class-name">EventEmitter</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">off</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">type<span class="token punctuation">,</span> func</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>type <span class="token operator">||</span> <span class="token operator">!</span>func<span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>listeners<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>listeners<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">=</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>listeners<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">filter</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> fn <span class="token operator">!==</span> func<span class="token punctuation">;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token class-name">EventEmitter</span><span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">emit</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">type</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>listeners<span class="token punctuation">[</span>type<span class="token punctuation">]</span> <span class="token operator">||</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">fn</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">fn</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>onceMap<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>listeners<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token keyword">delete</span> <span class="token keyword">this</span><span class="token punctuation">.</span>onceMap<span class="token punctuation">[</span>type<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br></div></div>`,4);function t(e,o){return p}var l=s(a,[["render",t]]);export{l as default};