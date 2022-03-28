import{c as n}from"./app.0b07b652.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},p=n(`<h2 id="\u27A3-\u5224\u65AD\u94FE\u8868\u662F\u5426\u4E3A\u56DE\u6587\u94FE\u8868" tabindex="-1"><a class="header-anchor" href="#\u27A3-\u5224\u65AD\u94FE\u8868\u662F\u5426\u4E3A\u56DE\u6587\u94FE\u8868" aria-hidden="true">#</a> \u27A3 \u5224\u65AD\u94FE\u8868\u662F\u5426\u4E3A\u56DE\u6587\u94FE\u8868</h2><h3 id="\u9898\u76EE\u63CF\u8FF0" tabindex="-1"><a class="header-anchor" href="#\u9898\u76EE\u63CF\u8FF0" aria-hidden="true">#</a> \u9898\u76EE\u63CF\u8FF0</h3><p>\u7ED9\u4F60\u4E00\u4E2A\u5355\u94FE\u8868\u7684\u5934\u8282\u70B9 head \uFF0C\u8BF7\u4F60\u5224\u65AD\u8BE5\u94FE\u8868\u662F\u5426\u4E3A\u56DE\u6587\u94FE\u8868\u3002\u5982\u679C\u662F\uFF0C\u8FD4\u56DE true \uFF1B\u5426\u5219\uFF0C\u8FD4\u56DE false \u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code>\u8F93\u5165\uFF1Ahead <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span>
\u8F93\u51FA\uFF1A<span class="token boolean">true</span>

\u8F93\u5165\uFF1Ahead <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">0</span><span class="token punctuation">,</span><span class="token number">1</span><span class="token punctuation">]</span>
\u8F93\u51FA\uFF1A<span class="token boolean">true</span>

\u8F93\u5165\uFF1Ahead <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span>
\u8F93\u51FA\uFF1A<span class="token boolean">true</span>

\u8F93\u5165\uFF1Ahead <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">]</span>
\u8F93\u51FA\uFF1A<span class="token boolean">false</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br></div></div><h3 id="\u9898\u89E3" tabindex="-1"><a class="header-anchor" href="#\u9898\u89E3" aria-hidden="true">#</a> \u9898\u89E3</h3><p>\u901A\u8FC7 \u5FEB\u3001\u6162\u6307\u9488\u627E\u94FE\u8868\u4E2D\u70B9\uFF0C\u7136\u540E\u53CD\u8F6C\u94FE\u8868\uFF0C\u4F9D\u6B21\u6BD4\u8F83\u4E24\u4E2A\u94FE\u8868\u4E24\u4FA7\u662F\u5426\u76F8\u7B49\uFF0C\u6765\u5224\u65AD\u662F\u5426\u662F\u56DE\u6587\u94FE\u8868\u3002</p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token doc-comment comment">/**
 * Definition for singly-linked list.
 * function ListNode(val, next) <span class="token punctuation">{</span>
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * <span class="token punctuation">}</span>
 */</span>
<span class="token doc-comment comment">/**
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>ListNode<span class="token punctuation">}</span></span> <span class="token parameter">head</span>
 * <span class="token keyword">@return</span> <span class="token class-name"><span class="token punctuation">{</span>boolean<span class="token punctuation">}</span></span>
 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">isPalindrome</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">head</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> right <span class="token operator">=</span> <span class="token function">reverse</span><span class="token punctuation">(</span><span class="token function">findCenter</span><span class="token punctuation">(</span>head<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">var</span> left <span class="token operator">=</span> head<span class="token punctuation">;</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span>left <span class="token operator">&amp;&amp;</span> right<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>left<span class="token punctuation">.</span>val <span class="token operator">===</span> right<span class="token punctuation">.</span>val<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      left <span class="token operator">=</span> left<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
      right <span class="token operator">=</span> right<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">/* \u53CD\u8F6C\u94FE\u8868 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">reverse</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">node</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> pre <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">,</span> cur <span class="token operator">=</span> node<span class="token punctuation">,</span> next<span class="token punctuation">;</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span>cur<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    next <span class="token operator">=</span> cur<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    cur<span class="token punctuation">.</span>next <span class="token operator">=</span> pre<span class="token punctuation">;</span>
    node <span class="token operator">=</span> cur<span class="token punctuation">;</span>
    pre <span class="token operator">=</span> cur<span class="token punctuation">;</span>
    cur <span class="token operator">=</span> next<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">return</span> node<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>

<span class="token comment">/* \u627E\u5230\u94FE\u8868\u4E2D\u70B9 */</span>
<span class="token keyword">var</span> <span class="token function-variable function">findCenter</span> <span class="token operator">=</span> <span class="token keyword">function</span><span class="token punctuation">(</span><span class="token parameter">node</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">var</span> fast <span class="token operator">=</span> slow <span class="token operator">=</span> node<span class="token punctuation">;</span>

  <span class="token keyword">while</span> <span class="token punctuation">(</span>fast <span class="token operator">&amp;&amp;</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
    fast <span class="token operator">=</span> fast<span class="token punctuation">.</span>next<span class="token punctuation">.</span>next<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token comment">// \u5947\u6570\u94FE\u8868 slow \u5F80\u540E\u79FB\u52A8\u4E00\u4F4D</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>fast <span class="token operator">!==</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
    slow <span class="token operator">=</span> slow<span class="token punctuation">.</span>next<span class="token punctuation">;</span> 

  <span class="token keyword">return</span> slow<span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br><span class="line-number">15</span><br><span class="line-number">16</span><br><span class="line-number">17</span><br><span class="line-number">18</span><br><span class="line-number">19</span><br><span class="line-number">20</span><br><span class="line-number">21</span><br><span class="line-number">22</span><br><span class="line-number">23</span><br><span class="line-number">24</span><br><span class="line-number">25</span><br><span class="line-number">26</span><br><span class="line-number">27</span><br><span class="line-number">28</span><br><span class="line-number">29</span><br><span class="line-number">30</span><br><span class="line-number">31</span><br><span class="line-number">32</span><br><span class="line-number">33</span><br><span class="line-number">34</span><br><span class="line-number">35</span><br><span class="line-number">36</span><br><span class="line-number">37</span><br><span class="line-number">38</span><br><span class="line-number">39</span><br><span class="line-number">40</span><br><span class="line-number">41</span><br><span class="line-number">42</span><br><span class="line-number">43</span><br><span class="line-number">44</span><br><span class="line-number">45</span><br><span class="line-number">46</span><br><span class="line-number">47</span><br><span class="line-number">48</span><br><span class="line-number">49</span><br><span class="line-number">50</span><br><span class="line-number">51</span><br><span class="line-number">52</span><br><span class="line-number">53</span><br><span class="line-number">54</span><br><span class="line-number">55</span><br><span class="line-number">56</span><br><span class="line-number">57</span><br></div></div>`,7);function e(t,o){return p}var r=s(a,[["render",e]]);export{r as default};
