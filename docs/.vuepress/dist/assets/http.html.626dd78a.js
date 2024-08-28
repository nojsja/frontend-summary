import{r as o,o as a,a as i,b as e,d as s,F as l,c as r,e as t}from"./app.eecdc8e8.js";import{_ as c}from"./plugin-vue_export-helper.21dcd24c.js";const p={},d=r(`<h2 id="\u27A3-\u4F7F\u7528\u8D44\u6E90\u9884\u53D6\u6280\u672F" tabindex="-1"><a class="header-anchor" href="#\u27A3-\u4F7F\u7528\u8D44\u6E90\u9884\u53D6\u6280\u672F" aria-hidden="true">#</a> \u27A3 \u4F7F\u7528\u8D44\u6E90\u9884\u53D6\u6280\u672F</h2><h3 id="\u4E00\u3001preload" tabindex="-1"><a class="header-anchor" href="#\u4E00\u3001preload" aria-hidden="true">#</a> \u4E00\u3001Preload</h3><p>Preload \u662F\u4E00\u4E2A\u65B0\u7684\u63A7\u5236\u7279\u5B9A\u8D44\u6E90\u5982\u4F55\u88AB\u52A0\u8F7D\u7684\u65B0\u7684 Web \u6807\u51C6\uFF0C\u8FD9\u662F\u5DF2\u7ECF\u5728 2016 \u5E74 1 \u6708\u5E9F\u5F03\u7684 subresource prefetch \u7684\u5347\u7EA7\u7248\u3002\u8FD9\u4E2A\u6307\u4EE4\u53EF\u4EE5\u5728 <code>&lt;link&gt;</code> \u4E2D\u4F7F\u7528\uFF0C\u6BD4\u5982 <code>&lt;link rel=&quot;preload&quot;&gt;</code>\u3002\u4E00\u822C\u6765\u8BF4\uFF0C\u6700\u597D\u4F7F\u7528 preload \u6765\u52A0\u8F7D\u4F60\u6700\u91CD\u8981\u7684\u8D44\u6E90\uFF0C\u6BD4\u5982\u56FE\u50CF\uFF0CCSS\uFF0CJavaScript \u548C\u5B57\u4F53\u6587\u4EF6\u3002\u8FD9\u4E0D\u8981\u4E0E\u6D4F\u89C8\u5668\u9884\u52A0\u8F7D\u6DF7\u6DC6\uFF0C\u6D4F\u89C8\u5668\u9884\u52A0\u8F7D\u53EA\u9884\u5148\u52A0\u8F7D\u5728HTML\u4E2D\u58F0\u660E\u7684\u8D44\u6E90\u3002preload \u6307\u4EE4\u4E8B\u5B9E\u4E0A\u514B\u670D\u4E86\u8FD9\u4E2A\u9650\u5236\u5E76\u4E14 <strong>\u5141\u8BB8\u9884\u52A0\u8F7D\u5728 CSS \u548C JavaScript \u4E2D\u5B9A\u4E49\u7684\u8D44\u6E90\uFF0C\u5E76\u5141\u8BB8\u51B3\u5B9A\u4F55\u65F6\u5E94\u7528\u6BCF\u4E2A\u8D44\u6E90\u3002</strong></p><p>Preload \u4E0E Prefetch \u4E0D\u540C\u7684\u5730\u65B9\u5C31\u662F\u5B83\u4E13\u6CE8\u4E8E <strong>\u5F53\u524D\u7684\u9875\u9762</strong>\uFF0C\u5E76\u4EE5 <strong>\u9AD8\u4F18\u5148\u7EA7</strong> \u52A0\u8F7D\u8D44\u6E90\uFF0CPrefetch \u4E13\u6CE8\u4E8E\u4E0B\u4E00\u4E2A\u9875\u9762\u5C06\u8981\u52A0\u8F7D\u7684\u8D44\u6E90\u5E76\u4EE5\u4F4E\u4F18\u5148\u7EA7\u52A0\u8F7D\u3002\u540C\u65F6\u4E5F\u8981\u6CE8\u610F preload \u5E76\u4E0D\u4F1A\u963B\u585E window \u7684 <code>onload</code> \u4E8B\u4EF6\u3002</p><div class="language-html ext-html line-numbers-mode"><pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>link</span> <span class="token attr-name">rel</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>preload<span class="token punctuation">&quot;</span></span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>/path/to/style.css<span class="token punctuation">&quot;</span></span> <span class="token attr-name">as</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>style<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><h4 id="\u4F7F\u7528-preload-\u7684\u597D\u5904" tabindex="-1"><a class="header-anchor" href="#\u4F7F\u7528-preload-\u7684\u597D\u5904" aria-hidden="true">#</a> \u4F7F\u7528 Preload \u7684\u597D\u5904</h4><p>\u4F7F\u7528 preload \u6307\u4EE4\u7684\u597D\u5904\u5305\u62EC\uFF1A</p>`,7),u=e("li",null,[t("\u5141\u8BB8\u6D4F\u89C8\u5668\u6765"),e("strong",null,"\u8BBE\u5B9A\u8D44\u6E90\u52A0\u8F7D\u7684\u4F18\u5148\u7EA7"),t("\u56E0\u6B64\u53EF\u4EE5\u5141\u8BB8\u524D\u7AEF\u5F00\u53D1\u8005\u6765\u4F18\u5316\u6307\u5B9A\u8D44\u6E90\u7684\u52A0\u8F7D\u3002")],-1),h=e("li",null,[t("\u8D4B\u4E88\u6D4F\u89C8\u5668"),e("strong",null,"\u51B3\u5B9A\u8D44\u6E90\u7C7B\u578B"),t("\u7684\u80FD\u529B\uFF0C\u56E0\u6B64\u5B83\u80FD\u5206\u8FA8\u8FD9\u4E2A\u8D44\u6E90\u5728\u4EE5\u540E\u662F\u5426\u53EF\u4EE5\u91CD\u590D\u5229\u7528\u3002")],-1),g=t("\u6D4F\u89C8\u5668\u53EF\u4EE5\u901A\u8FC7\u6307\u5B9A "),_=e("code",null,"as",-1),m=t(" \u5C5E\u6027\u6765\u51B3\u5B9A\u8FD9\u4E2A"),f=t("\u8BF7\u6C42\u662F\u5426\u7B26\u5408 "),b={href:"https://www.keycdn.com/support/content-security-policy",target:"_blank",rel:"noopener noreferrer"},k=t("content security policy"),q=t("\u3002"),x=e("li",null,[t("\u6D4F\u89C8\u5668\u53EF\u4EE5\u57FA\u4E8E\u8D44\u6E90\u7684\u7C7B\u578B\uFF08\u6BD4\u5982 image/webp\uFF09\u6765\u53D1\u9001\u9002\u5F53\u7684 "),e("code",null,"accept"),t(" \u5934\u3002")],-1),v=r(`<p>\u4E0D\u8FC7\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF1A\u7528 \u201Cpreload\u201D \u548C \u201Cprefetch\u201D \u7B49\u9884\u8F7D\u65B9\u5F0F\uFF0C\u5982\u679C\u8D44\u6E90\u4E0D\u80FD\u88AB\u7F13\u5B58\uFF0C\u90A3\u4E48\u90FD\u6709\u53EF\u80FD\u6D6A\u8D39\u4E00\u90E8\u5206\u5E26\u5BBD\uFF0C\u5728\u79FB\u52A8\u7AEF\u8BF7\u614E\u7528\u3002\u6CA1\u6709\u7528\u5230\u7684 preload \u8D44\u6E90\u5728 Chrome \u7684 console \u91CC\u4F1A\u5728 onload \u4E8B\u4EF6 3s \u540E\u53D1\u751F\u8B66\u544A\u3002</p><h4 id="\u4E3E\u4F8B" tabindex="-1"><a class="header-anchor" href="#\u4E3E\u4F8B" aria-hidden="true">#</a> \u4E3E\u4F8B</h4><p>\u8FD9\u91CC\u6709\u4E00\u4E2A\u975E\u5E38\u57FA\u672C\u7684\u9884\u52A0\u8F7D\u56FE\u50CF\u7684\u4F8B\u5B50\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;link rel=&quot;preload&quot; href=&quot;image.png&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u8FD9\u91CC\u6709\u4E00\u4E2A\u9884\u52A0\u8F7D\u5B57\u4F53\u7684\u4F8B\u5B50\uFF0C\u8BB0\u4F4F\uFF1A\u5982\u679C\u4F60\u7684\u9884\u52A0\u8F7D\u9700\u8981 CORS \u7684\u8DE8\u57DF\u8BF7\u6C42\uFF0C\u90A3\u4E48\u4E5F\u8981\u52A0\u4E0A crossorigin \u7684\u5C5E\u6027\u3002</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;link rel=&quot;preload&quot; href=&quot;https://example.com/fonts/font.woff&quot; as=&quot;font&quot; crossorigin&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p>\u8FD9\u91CC\u6709\u4E00\u4E2A\u901A\u8FC7 HTML \u548C JavaScript \u9884\u52A0\u8F7D\u6837\u5F0F\u8868\u7684\u4F8B\u5B50\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;!-- Via markup --&gt;
&lt;link rel=&quot;preload&quot; href=&quot;/css/mystyles.css&quot; as=&quot;style&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;!-- Via JavaScript --&gt; 
&lt;script&gt; var res = document.createElement(&quot;link&quot;); 
res.rel = &quot;preload&quot;; 
res.as = &quot;style&quot;; 
res.href = &quot;css/mystyles.css&quot;; 
document.head.appendChild(res); &lt;/script&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br></div></div>`,9),S=t("\u6765\u81EA filament group \u7684 Scott Jehl \u4E5F\u6709\u4E86\u4E00\u4E9B\u76F8\u5173\u7814\u7A76\u5E76\u5199\u4E86 "),w={href:"https://link.juejin.cn?target=http%3A%2F%2Ffilamentgroup.github.io%2FloadCSS%2Ftest%2Fpreload.html",title:"http://filamentgroup.github.io/loadCSS/test/preload.html",target:"_blank",rel:"noopener noreferrer"},F=t("async loaded styles using markup"),T=t(" \u8BF4\u660E\u4E86 preload \u662F\u4E0D\u963B\u585E\u9875\u9762\u6E32\u67D3\u7684\uFF01"),P=r(`<h4 id="\u6D4F\u89C8\u5668\u5BF9-preload-\u7684\u652F\u6301" tabindex="-1"><a class="header-anchor" href="#\u6D4F\u89C8\u5668\u5BF9-preload-\u7684\u652F\u6301" aria-hidden="true">#</a> \u6D4F\u89C8\u5668\u5BF9 Preload \u7684\u652F\u6301</h4><p>Chrome 50 \u5728 2016 \u5E74 4 \u6708\u6DFB\u52A0\u4E86\u5BF9 Preload \u7684\u652F\u6301\uFF0COpera 37 \u7B49\u6D4F\u89C8\u5668\u4E5F\u652F\u6301\u5B83\u3002\u4E0D\u8FC7\u76EE\u524D Mozilla Firefox \u8FD8\u6CA1\u6709\u786E\u5B9A\u8981\u652F\u6301\uFF0CMicrosoft Edge \u5F00\u53D1\u8005\u7248\u4F3C\u4E4E\u8981\u652F\u6301\u3002</p><h3 id="\u4E8C\u3001prefetch" tabindex="-1"><a class="header-anchor" href="#\u4E8C\u3001prefetch" aria-hidden="true">#</a> \u4E8C\u3001Prefetch</h3><p>Prefetch \u662F\u4E00\u4E2A\u4F4E\u4F18\u5148\u7EA7\u7684\u8D44\u6E90\u63D0\u793A\uFF0C\u5141\u8BB8<strong>\u6D4F\u89C8\u5668\u5728\u540E\u53F0\uFF08\u7A7A\u95F2\u65F6\uFF09<strong>\u83B7\u53D6\u5C06\u6765\u53EF\u80FD\u7528\u5F97\u5230\u7684\u8D44\u6E90\uFF0C\u5E76\u4E14\u5C06\u4ED6\u4EEC</strong>\u5B58\u50A8\u5728\u6D4F\u89C8\u5668\u7684\u7F13\u5B58\u4E2D</strong>\u3002\u4E00\u65E6\u4E00\u4E2A\u9875\u9762\u52A0\u8F7D\u5B8C\u6BD5\u5C31\u4F1A\u5F00\u59CB\u4E0B\u8F7D\u5176\u4ED6\u7684\u8D44\u6E90\uFF0C\u7136\u540E\u5F53\u7528\u6237\u70B9\u51FB\u4E86\u4E00\u4E2A\u5E26\u6709 prefetched \u7684\u8FDE\u63A5\uFF0C\u5B83\u5C06\u53EF\u4EE5\u7ACB\u523B\u4ECE\u7F13\u5B58\u4E2D\u52A0\u8F7D\u5185\u5BB9\u3002\u6709\u4E09\u79CD\u4E0D\u540C\u7684 prefetch \u7684\u7C7B\u578B\uFF0Clink\uFF0CDNS \u548C prerendering\uFF0C\u4E0B\u9762\u6765\u8BE6\u7EC6\u5206\u6790\u3002</p><h4 id="_1-link-prefetching" tabindex="-1"><a class="header-anchor" href="#_1-link-prefetching" aria-hidden="true">#</a> 1. Link Prefetching</h4><p>\u50CF\u4E0A\u9762\u63D0\u5230\u7684\uFF0Clink prefetching \u5047\u8BBE\u7528\u6237\u5C06\u8BF7\u6C42\u5B83\u4EEC\uFF0C\u6240\u4EE5<strong>\u5141\u8BB8\u6D4F\u89C8\u5668\u83B7\u53D6\u8D44\u6E90\u5E76\u5C06\u4ED6\u4EEC\u5B58\u50A8\u5728\u7F13\u5B58\u4E2D</strong>\u3002\u6D4F\u89C8\u5668\u4F1A\u5BFB\u627E HTML <code>&lt;link&gt;</code> \u5143\u7D20\u4E2D\u7684 prefetch \u6216\u8005 HTTP \u5934\u4E2D\u5982\u4E0B\u7684 Link\uFF1A</p><ul><li>HTML: <code>&lt;link rel=&quot;prefetch&quot; href=&quot;/uploads/images/pic.png&quot;&gt;</code></li><li>HTTP Header: <code>Link: &lt;/uploads/images/pic.png&gt;; rel=prefetch</code></li></ul><p>&quot;\u8FD9\u9879\u6280\u672F\u6709\u4E3A\u5F88\u591A\u6709\u4EA4\u4E92\u7F51\u7AD9\u63D0\u901F\u7684\u6F5C\u529B\uFF0C\u4F46\u5E76\u4E0D\u4F1A\u5E94\u7528\u5728\u6240\u6709\u5730\u65B9\u3002\u5BF9\u4E8E\u67D0\u4E9B\u7AD9\u70B9\u6765\u8BF4\uFF0C\u592A\u96BE\u731C\u6D4B\u7528\u6237\u4E0B\u4E00\u6B65\u7684\u52A8\u5411\uFF0C\u5BF9\u4E8E\u53E6\u4E00\u4E9B\u7AD9\u70B9\uFF0C\u63D0\u524D\u83B7\u53D6\u8D44\u6E90\u53EF\u80FD\u5BFC\u81F4\u6570\u636E\u8FC7\u671F\u5931\u6548\u3002\u8FD8\u6709\u5F88\u91CD\u8981\u7684\u4E00\u70B9\uFF0C\u4E0D\u8981\u8FC7\u65E9\u8FDB\u884C prefetch\uFF0C\u5426\u5219\u4F1A\u964D\u4F4E\u4F60\u5F53\u524D\u6D4F\u89C8\u7684\u9875\u9762\u7684\u52A0\u8F7D\u901F\u5EA6 \u2014\u2014 Google Developers&quot;</p><p>\u9664\u4E86 Safari\uFF0C iOS Safari \u548C Opera Mini\uFF0C\u73B0\u4EE3\u6D4F\u89C8\u5668\u5DF2\u7ECF\u652F\u6301\u4E86 link Prefetch\uFF0CChrome \u548C Firefox \u8FD8\u4F1A\u5728\u7F51\u7EDC\u9762\u677F\u4E0A\u663E\u793A\u8FD9\u4E9B prefetched \u8D44\u6E90\u3002</p><h4 id="_2-dns-prefetching" tabindex="-1"><a class="header-anchor" href="#_2-dns-prefetching" aria-hidden="true">#</a> 2. DNS Prefetching</h4><p>DNS prefetching \u5141\u8BB8\u6D4F\u89C8\u5668\u5728\u7528\u6237\u6D4F\u89C8\u9875\u9762\u65F6<strong>\u5728\u540E\u53F0\u8FD0\u884C DNS \u7684\u89E3\u6790</strong>\u3002\u5982\u6B64\u4E00\u6765\uFF0CDNS \u7684\u89E3\u6790\u5728\u7528\u6237\u70B9\u51FB\u4E00\u4E2A\u94FE\u63A5\u65F6\u5DF2\u7ECF\u5B8C\u6210\uFF0C\u6240\u4EE5\u53EF\u4EE5\u51CF\u5C11\u5EF6\u8FDF\u3002\u53EF\u4EE5\u5728\u4E00\u4E2A link \u6807\u7B7E\u7684\u5C5E\u6027\u4E2D\u6DFB\u52A0 <code>rel=&quot;dns-prefetch&#39;</code> \u6765\u5BF9\u6307\u5B9A\u7684 URL \u8FDB\u884C DNS prefetching\uFF0C\u6211\u4EEC\u5EFA\u8BAE\u5BF9 Google fonts\uFF0CGoogle Analytics \u548C CDN \u8FDB\u884C\u5904\u7406\u3002</p><p>&quot;DNS \u8BF7\u6C42\u5728\u5E26\u5BBD\u65B9\u9762\u6D41\u91CF\u975E\u5E38\u5C0F\uFF0C\u53EF\u662F\u5EF6\u8FDF\u4F1A\u5F88\u9AD8\uFF0C\u5C24\u5176\u662F\u5728\u79FB\u52A8\u8BBE\u5907\u4E0A\u3002\u901A\u8FC7 prefetching \u6307\u5B9A\u7684 DNS \u53EF\u4EE5\u5728\u7279\u5B9A\u7684\u573A\u666F\u663E\u8457\u7684\u51CF\u5C0F\u5EF6\u8FDF\uFF0C\u6BD4\u5982\u7528\u6237\u70B9\u51FB\u94FE\u63A5\u7684\u65F6\u5019\u3002\u6709\u4E9B\u65F6\u5019\uFF0C\u751A\u81F3\u53EF\u4EE5\u51CF\u5C0F\u4E00\u79D2\u949F\u7684\u5EF6\u8FDF \u2014\u2014 Mozilla Developer Network&quot;</p><p>\u8FD9\u4E5F\u5BF9\u9700\u8981\u91CD\u5B9A\u5411\u7684\u8D44\u6E90\u5F88\u6709\u7528\uFF0C\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;!-- Prefetch DNS for external assets --&gt;
 &lt;link rel=&quot;dns-prefetch&quot; href=&quot;//fonts.googleapis.com&quot;&gt;
 &lt;link rel=&quot;dns-prefetch&quot; href=&quot;//www.google-analytics.com&quot;&gt; 
 &lt;link rel=&quot;dns-prefetch&quot; href=&quot;//opensource.keycdn.com&quot;&gt;
 &lt;link rel=&quot;dns-prefetch&quot; href=&quot;//cdn.domain.com&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br></div></div><p>\u4E0D\u8FC7\u8981\u6CE8\u610F\u7684\u662F Chrome \u5DF2\u7ECF\u5728\u6572\u51FB\u5730\u5740\u680F\u7684\u65F6\u5019\u505A\u4E86\u7C7B\u4F3C\u7684\u4E8B\u60C5\uFF0C\u6BD4\u5982 DNS preresolve \u548C TCP preconnect\uFF0C\u8FD9\u4E9B\u63AA\u65BD\u592A\u9177\u4E86\uFF01\u4F60\u53EF\u4EE5\u901A\u8FC7 <code>chrome://dns/</code> \u6765\u67E5\u770B\u4F60\u7684\u4F18\u5316\u5217\u8868\u3002</p><p>DNS prefetch \u5DF2\u7ECF\u88AB\u9664\u4E86 Opera Mini \u4E4B\u5916\u7684\u6240\u6709\u73B0\u4EE3\u6D4F\u89C8\u5668\u652F\u6301\u4E86\u3002</p><h4 id="_3-prerendering" tabindex="-1"><a class="header-anchor" href="#_3-prerendering" aria-hidden="true">#</a> 3. Prerendering</h4><p>Prerendering \u548C prefetching \u975E\u5E38\u76F8\u4F3C\uFF0C\u5B83\u4EEC\u90FD\u4F18\u5316\u4E86\u53EF\u80FD\u5BFC\u822A\u5230\u7684\u4E0B\u4E00\u9875\u4E0A\u7684\u8D44\u6E90\u7684\u52A0\u8F7D\uFF0C\u533A\u522B\u662F prerendering \u5728<strong>\u540E\u53F0\u6E32\u67D3\u4E86\u6574\u4E2A\u9875\u9762</strong>\uFF0C\u6574\u4E2A\u9875\u9762\u6240\u6709\u7684\u8D44\u6E90\u3002\u5982\u4E0B\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;link rel=&quot;prerender&quot; href=&quot;https://www.keycdn.com&quot;&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div><p><code>prerender</code> \u63D0\u793A\u53EF\u4EE5\u7528\u6765\u6307\u793A\u5C06\u8981\u5BFC\u822A\u5230\u7684\u4E0B\u4E00\u4E2A HTML\uFF1A\u7528\u6237\u4EE3\u7406\u5C06\u4F5C\u4E3A\u4E00\u4E2A HTML \u7684\u54CD\u5E94\u6765\u83B7\u53D6\u548C\u5904\u7406\u8D44\u6E90\uFF0C\u8981\u4F7F\u7528\u9002\u5F53\u7684 content-types \u83B7\u53D6\u5176\u4ED6\u5185\u5BB9\u7C7B\u578B\uFF0C\u6216\u8005\u4E0D\u9700\u8981 HTML \u9884\u5904\u7406\uFF0C\u53EF\u4EE5\u4F7F\u7528 <code>prefetch</code>\u3002</p>`,20),y=t("\u8981\u5C0F\u5FC3\u7684\u4F7F\u7528 prerender\uFF0C\u56E0\u4E3A\u5B83\u5C06\u4F1A\u52A0\u8F7D\u5F88\u591A\u8D44\u6E90\u5E76\u4E14\u53EF\u80FD\u9020\u6210\u5E26\u5BBD\u7684\u6D6A\u8D39\uFF0C\u5C24\u5176\u662F\u5728\u79FB\u52A8\u8BBE\u5907\u4E0A\u3002\u8FD8\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u4F60\u65E0\u6CD5\u5728 Chrome DevTools \u4E2D\u8FDB\u884C\u6D4B\u8BD5\uFF0C\u800C\u662F\u5728 "),N=e("code",null,"chrome://net-internals/#prerender",-1),C=t(" \u4E2D\u770B\u662F\u5426\u6709\u9875\u9762\u88AB prerendered \u4E86\uFF0C\u4F60\u4E5F\u53EF\u4EE5\u5728 "),D={href:"https://link.juejin.cn?target=http%3A%2F%2Fprerender-test.appspot.com%2F",title:"http://prerender-test.appspot.com/",target:"_blank",rel:"noopener noreferrer"},L=t("prerender-test.appspot.com"),M=t(" \u8FDB\u884C\u6D4B\u8BD5\u3002"),H=e("p",null,"\u9664\u4E86 Mozilla Firefox\uFF0CSafari\uFF0CiOS Safari\uFF0COpera Mini \u548C Android \u6D4F\u89C8\u5668\u5916\u7684\u4E00\u4E9B\u73B0\u4EE3\u6D4F\u89C8\u5668\u5DF2\u7ECF\u652F\u6301\u4E86 prerendering\u3002",-1),j=t("\u9664\u4E86\u591A\u4F59\u7684\u8D44\u6E90\u52A0\u8F7D\u5916\uFF0C\u4F7F\u7528 prefetch \u8FD8\u6709\u4E00\u5207 "),O={href:"https://link.juejin.cn?target=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FLink_prefetching%23Issues_and_criticisms",title:"https://en.wikipedia.org/wiki/Link_prefetching#Issues_and_criticisms",target:"_blank",rel:"noopener noreferrer"},A=t("\u989D\u5916\u7684\u526F\u4F5C\u7528"),E=t("\uFF0C\u6BD4\u5982\u5BF9\u9690\u79C1\u7684\u635F\u5BB3\uFF1A"),G=t("Web \u7EDF\u8BA1\u5C06\u4F1A\u6536\u5230\u5F71\u54CD\u800C\u53D8\u5927\uFF0C\u5C3D\u7BA1 Google \u8BF4\u5DF2\u7ECF\u9650\u5236\u4E86\u8FD9\u4E2A\u6807\u7B7E\u3002\u770B\u770B\u8FD9\u4E2A\u5173\u4E8E\u9875\u9762\u5206\u6790\u5C06\u4F1A\u88AB\u5F71\u54CD\u800C\u5728\u4E00\u6B21\u70B9\u51FB\u65F6\u4EA7\u751F\u4E24\u4E2A session \u7684 "),I={href:"https://link.juejin.cn?target=http%3A%2F%2Fwww.scl.com%2Finsights%2Fblog%2Fgoogle-chrome-prefetchprerender-inflating-web-analytics-stats%2F",title:"http://www.scl.com/insights/blog/google-chrome-prefetchprerender-inflating-web-analytics-stats/",target:"_blank",rel:"noopener noreferrer"},J=t("\u6587\u7AE0"),V=t("\u3002"),R=e("li",null,"\u7531\u4E8E\u53EF\u80FD\u4ECE\u672A\u8BBF\u95EE\u7684\u7AD9\u70B9\u4E0B\u8F7D\u4E86\u66F4\u591A\u7684\u9875\u9762\uFF08\u5C24\u5176\u662F\u9690\u533F\u4E0B\u8F7D\u6B63\u5728\u53D8\u5F97\u66F4\u52A0\u5148\u8FDB\u548C\u591A\u6837\u5316\uFF09\uFF0C\u7528\u6237\u7684\u5B89\u5168\u5C06\u9762\u4E34\u66F4\u591A\u7684\u98CE\u9669\u3002",-1),z=e("li",null,"\u5982\u679C\u9884\u53D6\u8BBF\u95EE\u672A\u7ECF\u6388\u6743\u7684\u5185\u5BB9\uFF0C\u7528\u6237\u53EF\u80FD\u8FDD\u53CD\u5176\u7F51\u7EDC\u6216\u7EC4\u7EC7\u7684\u53EF\u63A5\u53D7\u4F7F\u7528\u7B56\u7565\u3002",-1),B=r(`<h3 id="\u4E09\u3001preconnect" tabindex="-1"><a class="header-anchor" href="#\u4E09\u3001preconnect" aria-hidden="true">#</a> \u4E09\u3001Preconnect</h3><p>\u672C\u6587\u4ECB\u7ECD\u7684\u6700\u540E\u4E00\u4E2A\u8D44\u6E90\u63D0\u793A\u662F preconnect\uFF0Cpreconnect \u5141\u8BB8\u6D4F\u89C8\u5668\u5728\u4E00\u4E2A <strong>HTTP \u8BF7\u6C42\u6B63\u5F0F\u53D1\u7ED9\u670D\u52A1\u5668\u524D\u9884\u5148\u6267\u884C\u4E00\u4E9B\u64CD\u4F5C</strong>\uFF0C\u8FD9\u5305\u62EC DNS \u89E3\u6790\uFF0CTLS \u534F\u5546\uFF0CTCP \u63E1\u624B\uFF0C\u8FD9\u6D88\u9664\u4E86\u5F80\u8FD4\u5EF6\u8FDF\u5E76\u4E3A\u7528\u6237\u8282\u7701\u4E86\u65F6\u95F4\u3002</p><p>Preconnect \u662F\u4F18\u5316\u7684\u91CD\u8981\u624B\u6BB5\uFF0C\u5B83\u53EF\u4EE5\u51CF\u5C11\u5F88\u591A\u8BF7\u6C42\u4E2D\u7684\u5F80\u8FD4\u8DEF\u5F84 \u2014\u2014 \u5728\u67D0\u4E9B\u60C5\u51B5\u4E0B\u53EF\u4EE5\u51CF\u5C11\u6570\u767E\u6216\u8005\u6570\u5343\u6BEB\u79D2\u7684\u5EF6\u8FDF\u3002</p><p>Preconnect \u53EF\u4EE5\u76F4\u63A5\u6DFB\u52A0\u5230 HTML \u4E2D link \u6807\u7B7E\u7684\u5C5E\u6027\u4E2D\uFF0C\u4E5F\u53EF\u4EE5\u5199\u5728 HTTP \u5934\u4E2D\u6216\u8005\u901A\u8FC7 JavaScript \u751F\u6210\uFF0C\u5982\u4E0B\u662F\u4E00\u4E2A\u4E3A CDN \u4F7F\u7528 preconnect \u7684\u4F8B\u5B50\uFF1A</p><div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>&lt;link href=&quot;https://cdn.domain.com&quot; rel=&quot;preconnect&quot; crossorigin&gt;
</code></pre><div class="line-numbers" aria-hidden="true"><span class="line-number">1</span><br></div></div>`,5),W=t("\u5982\u4E0B\u662F\u4E3A Google Fonts \u4F7F\u7528 preconnect \u7684\u4F8B\u5B50\uFF0C\u901A\u8FC7\u7ED9 "),U=e("code",null,"fonts.gstatic.com",-1),K=t(" \u52A0\u5165 preconnect \u63D0\u793A\uFF0C\u6D4F\u89C8\u5668\u5C06\u7ACB\u523B\u53D1\u8D77\u8BF7\u6C42\uFF0C\u548C CSS \u8BF7\u6C42\u5E76\u884C\u6267\u884C\u3002\u5728\u8FD9\u4E2A\u573A\u666F\u4E0B\uFF0C"),Q=e("strong",null,"preconnect \u4ECE\u5173\u952E\u8DEF\u5F84\u4E2D\u6D88\u9664\u4E86\u4E09\u4E2A RTTs\uFF08Round-Trip Time\uFF09",-1),X=t(" \u5E76"),Y=e("strong",null,"\u51CF\u5C11\u4E86\u8D85\u8FC7\u534A\u79D2\u7684\u5EF6\u8FDF",-1),Z=t("\uFF0Clya Grigorik \u7684 "),$={href:"https://link.juejin.cn?target=https%3A%2F%2Fwww.igvita.com%2F2015%2F08%2F17%2Feliminating-roundtrips-with-preconnect%2F",title:"https://www.igvita.com/2015/08/17/eliminating-roundtrips-with-preconnect/",target:"_blank",rel:"noopener noreferrer"},ee=t("eliminating RTTS with preconnect"),te=t(" \u4E00\u6587\u4E2D\u6709\u66F4\u8BE6\u7EC6\u7684\u5206\u6790\u3002"),ne=e("p",null,[e("img",{src:"https://nojsja.github.io/static-resources/images/interview/preconnect.png",alt:""})],-1),se=e("p",null,"\u4F7F\u7528 preconnect \u662F\u4E2A\u6709\u6548\u800C\u4E14\u514B\u5236\u7684\u8D44\u6E90\u4F18\u5316\u65B9\u6CD5\uFF0C\u5B83\u4E0D\u4EC5\u53EF\u4EE5\u4F18\u5316\u9875\u9762\u5E76\u4E14\u53EF\u4EE5\u9632\u6B62\u8D44\u6E90\u5229\u7528\u7684\u6D6A\u8D39\u3002\u9664\u4E86 Internet Explorer\uFF0CSafari\uFF0CIOS Safari \u548C Opera Mini \u7684\u73B0\u4EE3\u6D4F\u89C8\u5668\u5DF2\u7ECF\u652F\u6301\u4E86 preconnect\u3002",-1);function re(oe,ae){const n=o("ExternalLinkIcon");return a(),i(l,null,[d,e("ul",null,[u,h,e("li",null,[g,_,m,e("strong",null,[f,e("a",b,[k,s(n)])]),q]),x]),v,e("p",null,[S,e("a",w,[F,s(n)]),T]),P,e("p",null,[y,N,C,e("a",D,[L,s(n)]),M]),H,e("p",null,[j,e("a",O,[A,s(n)]),E]),e("ul",null,[e("li",null,[G,e("a",I,[J,s(n)]),V]),R,z]),B,e("p",null,[W,U,K,Q,X,Y,Z,e("a",$,[ee,s(n)]),te]),ne,se],64)}var ce=c(p,[["render",re]]);export{ce as default};
