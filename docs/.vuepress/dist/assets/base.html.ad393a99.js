import{c as e}from"./app.490278ba.js";import{_ as l}from"./plugin-vue_export-helper.21dcd24c.js";const t={},i=e(`<h2 id="\u27A3-position\u5404\u4E2A\u5C5E\u6027\u7684\u4F5C\u7528" tabindex="-1"><a class="header-anchor" href="#\u27A3-position\u5404\u4E2A\u5C5E\u6027\u7684\u4F5C\u7528" aria-hidden="true">#</a> \u27A3 position\u5404\u4E2A\u5C5E\u6027\u7684\u4F5C\u7528</h2><ul><li><strong>static(\u9ED8\u8BA4\u503C)</strong>\uFF1A\u6D4F\u89C8\u5668\u4F1A\u6309\u7167\u6E90\u7801\u7684\u987A\u5E8F\uFF0C\u51B3\u5B9A\u6BCF\u4E2A\u5143\u7D20\u7684\u4F4D\u7F6E\uFF0C\u8FD9\u79F0\u4E3A&quot;\u6B63\u5E38\u7684\u9875\u9762\u6D41&quot;\u3002</li><li><strong>relative</strong>\uFF1A\u8868\u793A\u5143\u7D20\u76F8\u5BF9\u4E8E\u9ED8\u8BA4\u4F4D\u7F6E\uFF08\u5373static\u65F6\u7684\u4F4D\u7F6E\uFF09\u8FDB\u884C\u504F\u79FB\uFF0C\u5373\u5B9A\u4F4D\u57FA\u70B9\u662F\u5143\u7D20\u7684\u9ED8\u8BA4\u4F4D\u7F6E\u3002\u9700\u8981\u642D\u914Dtop\u3001bottom\u3001left\u3001right\u8FD9\u56DB\u4E2A\u5C5E\u6027\u4E00\u8D77\u4F7F\u7528\uFF0C\u7528\u6765\u6307\u5B9A\u504F\u79FB\u7684\u65B9\u5411\u548C\u8DDD\u79BB\uFF0C\u4F8B\u5982<code>top: 20px;</code>\u8868\u793A<code>\u5143\u7D20\u4ECE\u9ED8\u8BA4\u4F4D\u7F6E\u5411\u4E0B\u504F\u79FB20px</code>\u3002</li><li><strong>fixed</strong>\uFF1A\u8868\u793A\u5143\u7D20\u76F8\u5BF9\u4E8E\u89C6\u53E3\uFF08viewport\uFF0C\u6D4F\u89C8\u5668\u7A97\u53E3\uFF09\u8FDB\u884C\u504F\u79FB\uFF0C\u5373\u5B9A\u4F4D\u57FA\u70B9\u662F\u6D4F\u89C8\u5668\u7A97\u53E3\u3002\u8FD9\u4F1A\u5BFC\u81F4\u5143\u7D20\u7684\u4F4D\u7F6E\u4E0D\u968F\u9875\u9762\u6EDA\u52A8\u800C\u53D8\u5316\uFF0C\u597D\u50CF\u56FA\u5B9A\u5728\u7F51\u9875\u4E0A\u4E00\u6837\u3002\u4F8B\u5982<code>top:0</code>\u8868\u793A\u5143\u7D20\u5728\u89C6\u53E3\u9876\u90E8\u3002</li><li><strong>absolute</strong>\uFF1Aabsolute\u8868\u793A\uFF0C\u76F8\u5BF9\u4E8E\u4E0A\u7EA7\u5143\u7D20\uFF08\u4E00\u822C\u662F\u7236\u5143\u7D20\uFF09\u8FDB\u884C\u504F\u79FB\uFF0C\u5373\u5B9A\u4F4D\u57FA\u70B9\u662F\u7236\u5143\u7D20\u3002\u4E0D\u8FC7\u5B9A\u4F4D\u57FA\u70B9\uFF08\u4E00\u822C\u662F\u7236\u5143\u7D20\uFF09\u4E0D\u80FD\u662Fstatic\u5B9A\u4F4D\uFF0C\u5426\u5219\u5B9A\u4F4D\u57FA\u70B9\u5C31\u4F1A\u53D8\u6210\u6574\u4E2A\u7F51\u9875\u7684\u6839\u5143\u7D20html\uFF0C\u53E6\u5916\uFF0Cabsolute\u5B9A\u4F4D\u4E5F\u5FC5\u987B\u642D\u914Dtop\u3001bottom\u3001left\u3001right\u8FD9\u56DB\u4E2A\u5C5E\u6027\u4E00\u8D77\u4F7F\u7528\u3002</li><li><strong>sticky</strong>\uFF1Asticky\u8DDF\u524D\u9762\u56DB\u4E2A\u5C5E\u6027\u503C\u90FD\u4E0D\u4E00\u6837\uFF0C\u5B83\u4F1A\u4EA7\u751F\u52A8\u6001\u6548\u679C\uFF0C\u5F88\u50CFrelative\u548Cfixed\u7684\u7ED3\u5408\uFF1A\u4E00\u4E9B\u65F6\u5019\u662Frelative\u5B9A\u4F4D\uFF08\u5B9A\u4F4D\u57FA\u70B9\u662F\u81EA\u8EAB\u9ED8\u8BA4\u4F4D\u7F6E\uFF09\uFF0C\u53E6\u4E00\u4E9B\u65F6\u5019\u81EA\u52A8\u53D8\u6210fixed\u5B9A\u4F4D\uFF08\u5B9A\u4F4D\u57FA\u70B9\u662F\u89C6\u53E3\uFF09\uFF0C\u9700\u8981\u642D\u914D<code>top\u3001bottom\u3001left\u3001right</code>\u4F7F\u7528\u3002\u5B83\u7684\u5177\u4F53\u89C4\u5219\u662F\uFF0C\u5F53\u9875\u9762\u6EDA\u52A8\uFF0C\u7236\u5143\u7D20\u5F00\u59CB\u8131\u79BB\u89C6\u53E3\u65F6\uFF08\u5373\u90E8\u5206\u4E0D\u53EF\u89C1\uFF09\uFF0C\u53EA\u8981\u4E0Esticky\u5143\u7D20\u7684\u8DDD\u79BB\u8FBE\u5230\u751F\u6548\u95E8\u69DB\uFF0Crelative\u5B9A\u4F4D\u81EA\u52A8\u5207\u6362\u4E3Afixed\u5B9A\u4F4D\uFF1B\u7B49\u5230\u7236\u5143\u7D20\u5B8C\u5168\u8131\u79BB\u89C6\u53E3\u65F6\uFF08\u5373\u5B8C\u5168\u4E0D\u53EF\u89C1\uFF09\uFF0Cfixed\u5B9A\u4F4D\u81EA\u52A8\u5207\u6362\u56DErelative\u5B9A\u4F4D\u3002</li></ul><h2 id="\u27A3-display\u5404\u4E2A\u5C5E\u6027\u4F5C\u7528" tabindex="-1"><a class="header-anchor" href="#\u27A3-display\u5404\u4E2A\u5C5E\u6027\u4F5C\u7528" aria-hidden="true">#</a> \u27A3 display\u5404\u4E2A\u5C5E\u6027\u4F5C\u7528</h2><p>\xA0\xA0\xA0\xA0 display\u5C5E\u6027\u53EF\u4EE5\u8BBE\u7F6E\u5143\u7D20\u7684\u5185\u90E8\u548C\u5916\u90E8\u663E\u793A\u7C7B\u578B\uFF0C\u5143\u7D20\u7684\u5916\u90E8\u663E\u793A\u7C7B\u578B\u5C06\u51B3\u5B9A\u8BE5\u5143\u7D20\u5728\u6D41\u5F0F\u5E03\u5C40\u4E2D\u7684\u8868\u73B0\uFF0C\u4F8B\u5982\u5757\u7EA7\u6216\u5185\u8054\u5143\u7D20\uFF0C\u5143\u7D20\u7684\u5185\u90E8\u663E\u793A\u7C7B\u578B\u53EF\u4EE5\u63A7\u5236\u5176\u5B50\u5143\u7D20\u7684\u5E03\u5C40\uFF0C\u4F8B\u5982grid\u6216flex\u3002\u76EE\u524D\u6240\u6709\u6D4F\u89C8\u5668\u90FD\u652F\u6301display\u5C5E\u6027\uFF0C\u4F46\u662F\u5BF9\u4E8E\u5C5E\u6027\u503C\u7684\u517C\u5BB9\u6027\u4ECD\u9700\u6CE8\u610F\u3002</p><h3 id="_1-\u5916\u90E8\u663E\u793A" tabindex="-1"><a class="header-anchor" href="#_1-\u5916\u90E8\u663E\u793A" aria-hidden="true">#</a> 1. \u5916\u90E8\u663E\u793A</h3><p>\xA0\xA0\xA0\xA0 \u8FD9\u4E9B\u503C\u6307\u5B9A\u4E86\u5143\u7D20\u7684\u5916\u90E8\u663E\u793A\u7C7B\u578B\uFF0C\u5B9E\u9645\u4E0A\u5C31\u662F\u5176\u5728\u6D41\u5F0F\u5E03\u5C40\u4E2D\u7684\u89D2\u8272\uFF0C\u5373\u5728\u6D41\u5F0F\u5E03\u5C40\u4E2D\u7684\u8868\u73B0\u3002</p><ul><li><p>display: <strong>none</strong><br> display: none;\u662FCSS1\u89C4\u8303\uFF0C\u65E0\u517C\u5BB9\u6027\u95EE\u9898\uFF0C\u8BE5\u5C5E\u6027\u503C\u8868\u793A\u6B64\u5143\u7D20\u4E0D\u4F1A\u88AB\u663E\u793A\uFF0C\u4F9D\u7167\u8BCD\u4E49\u662F\u771F\u6B63\u9690\u85CF\u5143\u7D20\uFF0C\u4F7F\u7528\u8FD9\u4E2A\u5C5E\u6027\uFF0C\u88AB\u9690\u85CF\u7684\u5143\u7D20\u4E0D\u5360\u636E\u4EFB\u4F55\u7A7A\u95F4\uFF0C\u7528\u6237\u4EA4\u4E92\u64CD\u4F5C\u4F8B\u5982\u70B9\u51FB\u4E8B\u4EF6\u90FD\u4E0D\u4F1A\u751F\u6548\uFF0C\u8BFB\u5C4F\u8F6F\u4EF6\u4E5F\u4E0D\u4F1A\u8BFB\u5230\u5143\u7D20\u7684\u5185\u5BB9\uFF0C\u8FD9\u4E2A\u5143\u7D20\u7684\u4EFB\u4F55\u5B50\u5143\u7D20\u4E5F\u4F1A\u540C\u65F6\u88AB\u9690\u85CF\u3002\u5F53\u4F7F\u7528\u8BE5\u5C5E\u6027\u5C06\u5143\u7D20\u4ECE\u663E\u793A\u72B6\u6001\u5207\u6362\u4E3A\u9690\u85CF\u72B6\u6001\u65F6\uFF0C\u5143\u7D20\u4E0D\u5360\u636E\u539F\u672C\u7684\u7A7A\u95F4\uFF0C\u4F1A\u89E6\u53D1\u6D4F\u89C8\u5668\u7684\u91CD\u7ED8\u4E0E\u56DE\u6D41\u3002\u4E3A\u8FD9\u4E2A\u5C5E\u6027\u6DFB\u52A0\u8FC7\u6E21\u52A8\u753B\u662F\u65E0\u6548\u7684\uFF0C\u4ED6\u7684\u4EFB\u4F55\u4E0D\u540C\u72B6\u6001\u503C\u4E4B\u95F4\u7684\u5207\u6362\u603B\u662F\u4F1A\u7ACB\u5373\u751F\u6548\u3002\u8FD9\u79CD\u65B9\u5F0F\u4EA7\u751F\u7684\u6548\u679C\u5C31\u50CF\u5143\u7D20\u5B8C\u5168\u4E0D\u5B58\u5728\uFF0C\u4F46\u5728DOM\u4E2D\u4F9D\u7136\u53EF\u4EE5\u8BBF\u95EE\u5230\u8FD9\u4E2A\u5143\u7D20\uFF0C\u4E5F\u53EF\u4EE5\u901A\u8FC7DOM\u6765\u64CD\u4F5C\u5B83\u3002</p></li><li><p>display: <strong>block</strong><br> display: block;\u662FCSS1\u89C4\u8303\uFF0C\u65E0\u517C\u5BB9\u6027\u95EE\u9898\uFF0C\u8BE5\u5C5E\u6027\u503C\u8868\u793A\u6B64\u5143\u7D20\u5C06\u663E\u793A\u4E3A\u5757\u7EA7\u5143\u7D20\uFF0C\u6B64\u5143\u7D20\u524D\u540E\u4F1A\u5E26\u6709\u6362\u884C\u7B26\uFF0C\u5143\u7D20\u72EC\u5360\u4E00\u884C\uFF0C\u5C01\u95ED\u540E\u81EA\u52A8\u6362\u884C\uFF0C\u9ED8\u8BA4\u5BBD\u5EA6\u4E3A100%\uFF0C\u53EF\u4EE5\u6307\u5B9A\u5BBD\u5EA6\u548C\u9AD8\u5EA6\uFF0C\u5185\u5916\u8FB9\u8DDD\u5BF9\u4E8E\u56DB\u4E2A\u65B9\u5411\u6709\u6548\u3002</p></li><li><p>display: <strong>inline</strong><br> display: inline;\u662FCSS1\u89C4\u8303\uFF0C\u65E0\u517C\u5BB9\u6027\u95EE\u9898\uFF0C\u8BE5\u5C5E\u6027\u503C\u8868\u793A\u6B64\u5143\u7D20\u4F1A\u88AB\u663E\u793A\u4E3A\u5185\u8054\u5143\u7D20\uFF0C\u5143\u7D20\u4F1A\u751F\u6210\u4E00\u4E2A\u6216\u591A\u4E2A\u5185\u8054\u5143\u7D20\u6846\uFF0C\u8FD9\u4E9B\u6846\u4E0D\u4F1A\u5728\u81EA\u8EAB\u4E4B\u524D\u6216\u4E4B\u540E\u4EA7\u751F\u6362\u884C\u7B26\uFF0C\u5728\u6B63\u5E38\u6D41\u4E2D\uFF0C\u5982\u679C\u6709\u7A7A\u95F4\uFF0C\u5219\u4E0B\u4E00\u4E2A\u5143\u7D20\u5C06\u5728\u540C\u4E00\u884C\u4E0A\uFF0C\u5143\u7D20\u6392\u5728\u4E00\u884C\uFF0C\u5C01\u95ED\u540E\u4E0D\u4F1A\u81EA\u52A8\u6362\u884C\uFF0C\u4E0D\u80FD\u6307\u5B9A\u9AD8\u5EA6\u4E0E\u5BBD\u5EA6\uFF0C\u53EF\u4EE5\u4F7F\u7528line-height\u6765\u6307\u5B9A\u884C\u9AD8\uFF0C\u5916\u8FB9\u8DDD\u5BF9\u4E8E\u6C34\u5E73\u65B9\u5411\u6709\u6548\uFF0C\u5782\u76F4\u65B9\u5411\u65E0\u6548\uFF0C\u5185\u8FB9\u8DDD\u5BF9\u4E8E\u6C34\u5E73\u65B9\u5411\u548C\u5782\u76F4\u65B9\u5411\u6B63\u5E38\u6709\u6548\uFF0C\u5BF9\u5176\u4ED6\u5143\u7D20\u65E0\u4EFB\u4F55\u5F71\u54CD\u3002</p></li><li><p>display: <strong>inline-block</strong><br> display: inline-block;\u662FCSS2\u89C4\u8303\uFF0C\u65E0\u517C\u5BB9\u6027\u95EE\u9898\uFF0C\u8BE5\u5C5E\u6027\u503C\u8868\u793A\u6B64\u5143\u7D20\u5C06\u663E\u793A\u4E3A\u5185\u8054\u5757\u5143\u7D20\uFF0C\u8BE5\u5143\u7D20\u751F\u6210\u4E00\u4E2A\u5757\u5143\u7D20\u6846\uFF0C\u8BE5\u6846\u5C06\u968F\u5468\u56F4\u7684\u5185\u5BB9\u4E00\u8D77\u6D41\u52A8\uFF0C\u5C31\u597D\u50CF\u5B83\u662F\u5355\u4E2A\u5185\u8054\u6846\u4E00\u6837\uFF0C\u4E0E\u88AB\u66FF\u6362\u7684\u5143\u7D20\u975E\u5E38\u76F8\u4F3C\uFF0C\u5B83\u7B49\u6548\u4E8E\u5185\u8054\u6D41\u6839inline flow-root\uFF0C\u53EF\u4EE5\u6307\u5B9A\u5BBD\u5EA6\u548C\u9AD8\u5EA6\uFF0C\u5185\u5916\u8FB9\u8DDD\u5BF9\u4E8E\u56DB\u4E2A\u65B9\u5411\u6709\u6548\u5143\u7D20\u6392\u5728\u4E00\u884C\uFF0C\u4F46\u662F\u5728\u56DE\u8F66\u540E\u4F1A\u6709\u7A7A\u767D\u7F1D\u9699\u3002</p></li><li><p>display: <strong>run-in</strong><br> display: run-in;\u662FCSS2\u89C4\u8303\uFF0C\u7EDD\u5927\u90E8\u5206\u6D4F\u89C8\u5668\u90FD\u4E0D\u517C\u5BB9\uFF0C\u76EE\u524D\u8FD9\u662F\u4E2A\u5B9E\u9A8C\u6027\u5C5E\u6027\u503C\uFF0C\u4E0D\u5E94\u8BE5\u7528\u4F5C\u751F\u4EA7\u73AF\u5883\uFF0C\u8BE5\u5C5E\u6027\u503C\u8868\u793A\u6B64\u5143\u7D20\u4F1A\u6839\u636E\u4E0A\u4E0B\u6587\u51B3\u5B9A\u5BF9\u8C61\u662F\u5185\u8054\u5BF9\u8C61\u8FD8\u662F\u5757\u7EA7\u5BF9\u8C61\uFF0C\u5982\u679C\u5B83\u540E\u4E00\u4E2A\u5143\u7D20\u662Fblock\u90A3\u4E48\u5B83\u4F1A\u53D8\u6210inline\u5E76\u548C\u540E\u4E00\u4E2A\u5143\u7D20\u5E76\u6392\uFF0C\u5982\u679C\u5B83\u540E\u4E00\u4E2A\u5143\u7D20\u662Finline\u90A3\u4E48\u5B83\u4F1A\u53D8\u6210block\u3002</p></li></ul><h3 id="_2-\u5185\u90E8\u663E\u793A" tabindex="-1"><a class="header-anchor" href="#_2-\u5185\u90E8\u663E\u793A" aria-hidden="true">#</a> 2. \u5185\u90E8\u663E\u793A</h3><p>\xA0\xA0\xA0\xA0 \u8FD9\u4E9B\u5173\u952E\u5B57\u6307\u5B9A\u4E86\u5143\u7D20\u7684\u5185\u90E8\u663E\u793A\u7C7B\u578B\uFF0C\u5B83\u4EEC\u5B9A\u4E49\u4E86\u8BE5\u5143\u7D20\u5185\u90E8\u5185\u5BB9\u7684\u5E03\u5C40\u65B9\u5F0F\uFF0C\u9700\u8981\u5047\u5B9A\u8BE5\u5143\u7D20\u4E3A\u975E\u66FF\u6362\u5143\u7D20\u3002</p><ul><li><p>display: <strong>flow-root</strong><br> display: flow-root;\u662FCSS3\u89C4\u8303\uFF0C\u517C\u5BB9\u6027\u4E00\u822C\uFF0C\u8BE5\u5C5E\u6027\u503C\u8868\u793A\u6B64\u5143\u7D20\u4F1A\u751F\u6210\u4E00\u4E2A\u5757\u5143\u7D20\u76D2\u5B50\uFF0C\u8BE5\u5143\u7D20\u76D2\u5B50\u53EF\u5EFA\u7ACB\u4E00\u4E2A\u65B0\u7684\u5757\u683C\u5F0F\u5316\u4E0A\u4E0B\u6587BFC\uFF0C\u5B9A\u4E49\u683C\u5F0F\u5316\u6839\u6240\u5728\u7684\u4F4D\u7F6E\u3002</p></li><li><p>display: <strong>table</strong><br> display: table;\u662FCSS2\u89C4\u8303\uFF0C\u517C\u5BB9\u6027\u826F\u597D\uFF0C\u8BE5\u5C5E\u6027\u503C\u8868\u793A\u6B64\u5143\u7D20\u4F1A\u4F5C\u4E3A\u5757\u7EA7\u8868\u683C\u6765\u663E\u793A\uFF0C\u7C7B\u4F3C<code>&lt;table&gt;</code>\uFF0C\u8868\u683C\u524D\u540E\u5E26\u6709\u6362\u884C\u7B26\u3002</p></li><li><p>display: <strong>flex</strong><br> display: flex;\u662FCSS3\u89C4\u8303\uFF0C\u76EE\u524D\u4E3B\u6D41\u6D4F\u89C8\u5668\u90FD\u5DF2\u652F\u6301\uFF0C\u662F\u5E03\u5C40\u7684\u9996\u9009\u65B9\u6848\uFF0C\u8BE5\u5C5E\u6027\u503C\u8868\u793A\u6B64\u5143\u7D20\u4F1A\u4F5C\u4E3A\u5F39\u6027\u76D2\u5B50\u663E\u793A\uFF0C\u5728\u5916\u90E8\u8868\u73B0\u4E3Ablock\uFF0C\u5185\u90E8\u4F5C\u4E3A\u5F39\u6027\u76D2\u5B50\u4F7F\u7528\uFF0C\u5F39\u6027\u5E03\u5C40\u53EF\u4EE5\u4E3A\u76D2\u72B6\u6A21\u578B\u63D0\u4F9B\u6700\u5927\u7684\u7075\u6D3B\u6027\u3002\u5728\u517C\u5BB9\u79FB\u52A8\u7AEF\u6D4F\u89C8\u5668\u7684\u65B9\u6848\u4E0A\uFF0C\u6709\u53EF\u80FD\u9700\u8981\u4F7F\u7528display:-webkit-box;\uFF0C\u4E5F\u5C31\u662F\u5185\u6838\u524D\u7F00-box\uFF0C\u540C\u6837\u90FD\u662F\u5F39\u6027\u76D2\u5B50\uFF0C\u7531\u4E8E\u5404\u9636\u6BB5\u8349\u6848\u547D\u540D\u7684\u539F\u56E0\uFF0C\u5176\u547D\u540D\u4ECEbox\u66F4\u6539\u4E3Aflex\uFF0Cflex\u662F\u65B0\u7684\u89C4\u8303\u5C5E\u6027\uFF0C\u6B64\u5916flex\u5E76\u4E0D\u80FD\u5B8C\u5168\u66FF\u4EE3box\uFF0C\u4F7F\u7528\u8FD9\u4E24\u79CD\u65B9\u5F0F\u5728\u5B9E\u9645\u5E03\u5C40\u4E2D\u4F1A\u5B58\u5728\u5DEE\u5F02\u3002</p></li><li><p>display: <strong>grid</strong><br> display: grid;\u662FCSS3\u89C4\u8303\uFF0C\u76EE\u524D\u4E3B\u6D41\u6D4F\u89C8\u5668\u90FD\u5DF2\u652F\u6301\uFF0C\u8BE5\u5C5E\u6027\u503C\u8868\u793A\u5C06\u5143\u7D20\u5206\u4E3A\u4E00\u4E2A\u4E2A\u7F51\u683C\uFF0C\u7136\u540E\u5229\u7528\u8FD9\u4E9B\u7F51\u683C\u7EC4\u5408\u505A\u51FA\u5404\u79CD\u5404\u6837\u7684\u5E03\u5C40\u3002Grid\u5E03\u5C40\u4E0EFlex\u5E03\u5C40\u6709\u4E00\u5B9A\u7684\u76F8\u4F3C\u6027\uFF0C\u90FD\u53EF\u4EE5\u6307\u5B9A\u5BB9\u5668\u5185\u90E8\u591A\u4E2A\u6210\u5458\u7684\u4F4D\u7F6E\u3002\u4E0D\u540C\u4E4B\u5904\u5728\u4E8E\uFF0CFlex\u5E03\u5C40\u662F\u8F74\u7EBF\u5E03\u5C40\uFF0C\u53EA\u80FD\u6307\u5B9A\u6210\u5458\u9488\u5BF9\u8F74\u7EBF\u7684\u4F4D\u7F6E\uFF0C\u53EF\u4EE5\u770B\u4F5C\u662F\u4E00\u7EF4\u5E03\u5C40\u3002Grid\u5E03\u5C40\u5219\u662F\u5C06\u5BB9\u5668\u5212\u5206\u6210\u884C\u548C\u5217\uFF0C\u4EA7\u751F\u5355\u5143\u683C\uFF0C\u7136\u540E\u6307\u5B9A\u6210\u5458\u6240\u5728\u7684\u5355\u5143\u683C\uFF0C\u53EF\u4EE5\u770B\u4F5C\u662F\u4E8C\u7EF4\u5E03\u5C40\u3002</p></li><li><p>display: <strong>inline-table</strong><br> display: inline-table;\u662FCSS2\u89C4\u8303\uFF0C\u517C\u5BB9\u6027\u826F\u597D\uFF0C\u8BE5\u5C5E\u6027\u503C\u4E0Edisplay: table;\u5728\u5143\u7D20\u5185\u90E8\u8868\u73B0\u76F8\u540C\uFF0C\u5728\u5143\u7D20\u5916\u90E8\u663E\u793A\u8868\u73B0\u4E3Ainline\u3002</p></li><li><p>display: <strong>inline-flex</strong><br> display: inline-flex;\u662FCSS3\u89C4\u8303\uFF0C\u76EE\u524D\u4E3B\u6D41\u6D4F\u89C8\u5668\u90FD\u5DF2\u652F\u6301\uFF0C\u8BE5\u5C5E\u6027\u503C\u4E0Edisplay: flex;\u5728\u5143\u7D20\u5185\u90E8\u8868\u73B0\u76F8\u540C\uFF0C\u5728\u5143\u7D20\u5916\u90E8\u663E\u793A\u8868\u73B0\u4E3Ainline\u3002</p></li><li><p>display: <strong>inline-grid</strong><br> display: inline-grid;\u662FCSS3\u89C4\u8303\uFF0C\u76EE\u524D\u4E3B\u6D41\u6D4F\u89C8\u5668\u90FD\u5DF2\u652F\u6301\uFF0C\u8BE5\u5C5E\u6027\u503C\u4E0Edisplay: grid;\u5728\u5143\u7D20\u5185\u90E8\u8868\u73B0\u76F8\u540C\uFF0C\u5728\u5143\u7D20\u5916\u90E8\u663E\u793A\u8868\u73B0\u4E3Ainline\u3002</p></li><li><p>display: <strong>list-item</strong><br> display: list-item;\u662FCSS1\u89C4\u8303\uFF0C\u65E0\u517C\u5BB9\u6027\u95EE\u9898\uFF0C\u8BE5\u5C5E\u6027\u503C\u8868\u793A\u5C06\u5143\u7D20\u7684\u5916\u90E8\u663E\u793A\u7C7B\u578B\u53D8\u4E3Ablock\u76D2\u6A21\u578B\uFF0C\u5E76\u5C06\u5185\u90E8\u663E\u793A\u7C7B\u578B\u53D8\u4E3A\u591A\u4E2Alist-item inline\u76D2\u6A21\u578B\u3002</p></li></ul><h3 id="_3-\u5185\u90E8\u8868\u73B0" tabindex="-1"><a class="header-anchor" href="#_3-\u5185\u90E8\u8868\u73B0" aria-hidden="true">#</a> 3. \u5185\u90E8\u8868\u73B0</h3><p>\xA0\xA0\xA0\xA0 table\u5E03\u5C40\u6A21\u578B\u6709\u7740\u76F8\u5BF9\u590D\u6742\u7684\u5185\u90E8\u7ED3\u6784\uFF0C\u56E0\u6B64\u5B83\u4EEC\u7684\u5B50\u5143\u7D20\u53EF\u80FD\u626E\u6F14\u7740\u4E0D\u540C\u7684\u89D2\u8272\uFF0C\u8FD9\u4E00\u7C7B\u5173\u952E\u5B57\u5C31\u662F\u7528\u6765\u5B9A\u4E49\u8FD9\u4E9B\u5185\u90E8\u663E\u793A\u7C7B\u578B\uFF0C\u5E76\u4E14\u53EA\u6709\u5728\u8FD9\u4E9B\u7279\u5B9A\u7684\u5E03\u5C40\u6A21\u578B\u4E2D\u624D\u6709\u610F\u4E49\u3002</p><ul><li><p>display: <strong>table-row-group</strong><br> display: table-row-group;\u662FCSS2\u89C4\u8303\uFF0C\u517C\u5BB9\u6027\u826F\u597D\uFF0C\u8BE5\u5C5E\u6027\u503C\u8868\u793A\u6B64\u5143\u7D20\u4F1A\u4F5C\u4E3A\u4E00\u4E2A\u6216\u591A\u4E2A\u884C\u7684\u5206\u7EC4\u6765\u663E\u793A\uFF0C\u7C7B\u4F3C\u4E8E<code>&lt;tbody&gt;</code>\u3002</p></li><li><p>display: <strong>table-header-group</strong><br> display: table-header-group;\u662FCSS2\u89C4\u8303\uFF0C\u517C\u5BB9\u6027\u826F\u597D\uFF0C\u8BE5\u5C5E\u6027\u503C\u8868\u793A\u6B64\u5143\u7D20\u4F1A\u4F5C\u4E3A\u4E00\u4E2A\u6216\u591A\u4E2A\u884C\u7684\u5206\u7EC4\u6765\u663E\u793A\uFF0C\u7C7B\u4F3C\u4E8E<code>&lt;thead&gt;</code>\u3002</p></li><li><p>display: <strong>table-footer-group</strong><br> display: table-footer-group;\u662FCSS2\u89C4\u8303\uFF0C\u517C\u5BB9\u6027\u826F\u597D\uFF0C\u8BE5\u5C5E\u6027\u503C\u8868\u793A\u6B64\u5143\u7D20\u4F1A\u4F5C\u4E3A\u4E00\u4E2A\u6216\u591A\u4E2A\u884C\u7684\u5206\u7EC4\u6765\u663E\u793A\uFF0C\u7C7B\u4F3C\u4E8E<code>&lt;tfoot&gt;</code>\u3002</p></li><li><p>display: <strong>table-row</strong><br> display: table-row;\u662FCSS2\u89C4\u8303\uFF0C\u517C\u5BB9\u6027\u826F\u597D\uFF0C\u8BE5\u5C5E\u6027\u503C\u8868\u793A\u6B64\u5143\u7D20\u4F1A\u4F5C\u4E3A\u4E00\u4E2A\u8868\u683C\u884C\u663E\u793A\uFF0C\u7C7B\u4F3C\u4E8E<code>&lt;tr&gt;</code>\u3002</p></li><li><p>display: <strong>table-column-group</strong><br> display: table-column-group;\u662FCSS2\u89C4\u8303\uFF0C\u517C\u5BB9\u6027\u826F\u597D\uFF0C\u8BE5\u5C5E\u6027\u503C\u8868\u793A\u6B64\u5143\u7D20\u4F1A\u4F5C\u4E3A\u4E00\u4E2A\u6216\u591A\u4E2A\u5217\u7684\u5206\u7EC4\u6765\u663E\u793A\uFF0C\u7C7B\u4F3C\u4E8E<code>&lt;colgroup&gt;</code>\u3002</p></li><li><p>display: <strong>table-column</strong><br> display: table-column;\u662FCSS2\u89C4\u8303\uFF0C\u517C\u5BB9\u6027\u826F\u597D\uFF0C\u8BE5\u5C5E\u6027\u503C\u8868\u793A\u6B64\u5143\u7D20\u4F1A\u4F5C\u4E3A\u4E00\u4E2A\u5355\u5143\u683C\u5217\u663E\u793A\uFF0C\u7C7B\u4F3C\u4E8E<code>&lt;col&gt;</code>\u3002</p></li><li><p>display: <strong>table-cell</strong><br> display: table-cell;\u662FCSS2\u89C4\u8303\uFF0C\u517C\u5BB9\u6027\u826F\u597D\uFF0C\u8BE5\u5C5E\u6027\u503C\u8868\u793A\u6B64\u5143\u7D20\u4F1A\u4F5C\u4E3A\u4E00\u4E2A\u8868\u683C\u5355\u5143\u683C\u663E\u793A\uFF0C\u7C7B\u4F3C\u4E8E<code>&lt;td&gt;\u548C&lt;th&gt;</code>\u3002</p></li><li><p>display: <strong>table-caption</strong><br> display: table-caption;\u662FCSS2\u89C4\u8303\uFF0C\u517C\u5BB9\u6027\u826F\u597D\uFF0C\u8BE5\u5C5E\u6027\u503C\u8868\u793A\u6B64\u5143\u7D20\u4F1A\u4F5C\u4E3A\u4E00\u4E2A\u8868\u683C\u6807\u9898\u663E\u793A\uFF0C\u7C7B\u4F3C\u4E8E<code>&lt;caption&gt;</code>\u3002</p></li></ul><h2 id="\u27A3-grid\u5E03\u5C40" tabindex="-1"><a class="header-anchor" href="#\u27A3-grid\u5E03\u5C40" aria-hidden="true">#</a> \u27A3 grid\u5E03\u5C40</h2><p>\xA0\xA0\xA0\xA0 \u8BB2\u5230\u5E03\u5C40\uFF0C\u6211\u4EEC\u5C31\u4F1A\u60F3\u5230 flex \u5E03\u5C40\uFF0C\u751A\u81F3\u6709\u4EBA\u8BA4\u4E3A\u7ADF\u7136\u6709 flex \u5E03\u5C40\u4E86\uFF0C\u4F3C\u4E4E\u6CA1\u6709\u5FC5\u8981\u53BB\u4E86\u89E3 Grid \u5E03\u5C40\u3002\u4F46 flex \u5E03\u5C40\u548C Grid \u5E03\u5C40\u6709\u5B9E\u8D28\u7684\u533A\u522B\uFF0C\u90A3\u5C31\u662F flex \u5E03\u5C40\u662F\u4E00\u7EF4\u5E03\u5C40\uFF0CGrid \u5E03\u5C40\u662F\u4E8C\u7EF4\u5E03\u5C40\u3002flex \u5E03\u5C40\u4E00\u6B21\u53EA\u80FD\u5904\u7406\u4E00\u4E2A\u7EF4\u5EA6\u4E0A\u7684\u5143\u7D20\u5E03\u5C40\uFF0C\u4E00\u884C\u6216\u8005\u4E00\u5217\u3002Grid \u5E03\u5C40\u662F\u5C06\u5BB9\u5668\u5212\u5206\u6210\u4E86\u201C\u884C\u201D\u548C\u201C\u5217\u201D\uFF0C\u4EA7\u751F\u4E86\u4E00\u4E2A\u4E2A\u7684\u7F51\u683C\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5C06\u7F51\u683C\u5143\u7D20\u653E\u5728\u4E0E\u8FD9\u4E9B\u884C\u548C\u5217\u76F8\u5173\u7684\u4F4D\u7F6E\u4E0A\uFF0C\u4ECE\u800C\u8FBE\u5230\u6211\u4EEC\u5E03\u5C40\u7684\u76EE\u7684\u3002</p><h3 id="_1-\u5BB9\u5668\u5143\u7D20" tabindex="-1"><a class="header-anchor" href="#_1-\u5BB9\u5668\u5143\u7D20" aria-hidden="true">#</a> 1. \u5BB9\u5668\u5143\u7D20</h3><ul><li>\u9700\u8981\u8BBE\u7F6E\uFF1A<code>display: grid;</code></li><li><strong>grid-template-columns</strong>\uFF1A\u5C5E\u6027\u5B9A\u4E49\u6BCF\u4E00\u5217\u7684\u5217\u5BBD\u3002\u6BD4\u5982<code>100px 100px 100px</code>\u6307\u5B9A\u4E09\u5217\uFF0C\u5217\u5BBD100px\uFF0C\u4E5F\u53EF\u4F7F\u7528\u767E\u5206\u6BD4\u5355\u4F4D\uFF1B\u642D\u914D<code>repeat</code>\u51FD\u6570\u53EF\u4EE5\u7B80\u5316\u4E66\u5199\uFF1A<code>repeat(3, 33.33%);</code>\u3002repeat\u91CD\u590D\u67D0\u79CD\u6A21\u5F0F\u4E5F\u662F\u53EF\u4EE5\u7684\uFF0C\u6BD4\u5982\uFF1A<code>repeat(2, 100px 20px 80px)</code>\uFF1B\u5982\u679C\u8981\u5B9E\u73B0\u4E0D\u56FA\u5B9A\u5217\u6570\uFF0C\u81EA\u52A8\u586B\u5145\u7684\u8BDD\u4F7F\u7528<code>auto-fill</code>\u5373\u53EF\uFF0C\u4F1A\u6839\u636E\u5217\u5BBD\u548C\u5BB9\u5668\u52A8\u6001\u5BBD\u5EA6\u81EA\u52A8\u8FDB\u884C\u8BA1\u7B97\uFF1A<code>repeat(auto-fill, 100px)</code>\uFF1B\u4E3A\u4E86\u65B9\u4FBF\u8868\u793A\u5217\u5BBD\u5EA6\u4E4B\u95F4\u7684\u6BD4\u4F8B\u5173\u7CFB\uFF0C\u53EF\u4EE5\u4F7F\u7528fr\u5173\u952E\u5B57\uFF0C\u6BD4\u5982\u4E24\u5217\u7684\u5BBD\u5EA6\u5206\u522B\u4E3A1fr\u548C2fr\uFF0C\u5C31\u8868\u793A\u540E\u8005\u662F\u524D\u8005\u7684\u4E24\u500D\uFF0C\u5206\u522B\u53601/3\u548C2/3\uFF0C<code>grid-template-columns: 1fr 2fr</code>\u3002fr\u548Cpx\u53EF\u6DF7\u7528\uFF0C<code>150px 1fr 2fr</code>\uFF1B\u4F7F\u7528auto\u5173\u952E\u5B57\u8868\u793A\u7531\u6D4F\u89C8\u5668\u81EA\u5DF1\u51B3\u5B9A\u957F\u5EA6\uFF1A<code>grid-template-columns: 100px auto 100px;</code>\u3002</li><li><strong>grid-template-rows</strong>\uFF1A\u5C5E\u6027\u5B9A\u4E49\u6BCF\u4E00\u884C\u7684\u884C\u9AD8\uFF0C\u7528\u6CD5\u540C\u4E0A\u3002</li><li><strong>grid-gap</strong>\uFF1Agrid-row-gap\u548Cgrid-columns-gap\u7684\u5408\u5E76\u7B80\u5199\u5F62\u5F0F\uFF0C\u8868\u793A\u884C\u95F4\u8DDD\u548C\u5217\u95F4\u8DDD\uFF0C\u53EA\u5199\u4E00\u4E2A\u503C\u8868\u793A\u4E24\u4E2A\u503C\u76F8\u540C\u3002</li><li><strong>grid-template-areas</strong>\uFF1A\u7F51\u683C\u5E03\u5C40\u5141\u8BB8\u6307\u5B9A&quot;\u533A\u57DF&quot;\uFF08area\uFF09\uFF0C\u4E00\u4E2A\u533A\u57DF\u7531\u5355\u4E2A\u6216\u591A\u4E2A\u5355\u5143\u683C\u7EC4\u6210\uFF0C\u4E0B\u9762\u4EE3\u7801\u5148\u5212\u5206\u51FA9\u4E2A\u5355\u5143\u683C\uFF0C\u7136\u540E\u5C06\u5176\u5B9A\u540D\u4E3Aa\u5230i\u7684\u4E5D\u4E2A\u533A\u57DF\uFF0C\u5206\u522B\u5BF9\u5E94\u8FD9\u4E5D\u4E2A\u5355\u5143\u683C\u3002\uFF1A</li></ul><div class="language-css ext-css line-numbers-mode"><pre class="language-css"><code><span class="token selector">.container</span> <span class="token punctuation">{</span>
  <span class="token property">display</span><span class="token punctuation">:</span> grid<span class="token punctuation">;</span>
  <span class="token property">grid-template-columns</span><span class="token punctuation">:</span> 100px 100px 100px<span class="token punctuation">;</span>
  <span class="token property">grid-template-rows</span><span class="token punctuation">:</span> 100px 100px 100px<span class="token punctuation">;</span>
  <span class="token property">grid-template-areas</span><span class="token punctuation">:</span> <span class="token string">&#39;a b c&#39;</span>
                       <span class="token string">&#39;d e f&#39;</span>
                       <span class="token string">&#39;g h i&#39;</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br></div></div><ul><li><strong>grid-auto-flow</strong>\uFF1A\u5212\u5206\u7F51\u683C\u4EE5\u540E\uFF0C\u5BB9\u5668\u7684\u5B50\u5143\u7D20\u4F1A\u6309\u7167\u987A\u5E8F\uFF0C\u81EA\u52A8\u653E\u7F6E\u5728\u6BCF\u4E00\u4E2A\u7F51\u683C\u3002\u9ED8\u8BA4\u7684\u653E\u7F6E\u987A\u5E8F\u662F&quot;\u5148\u884C\u540E\u5217&quot;\uFF0C\u5373\u5148\u586B\u6EE1\u7B2C\u4E00\u884C\uFF0C\u518D\u5F00\u59CB\u653E\u5165\u7B2C\u4E8C\u884C\u3002\u8FD9\u4E2A\u987A\u5E8F\u7531grid-auto-flow\u5C5E\u6027\u51B3\u5B9A\uFF0C\u9ED8\u8BA4\u503C\u662Frow\uFF0C\u5373&quot;\u5148\u884C\u540E\u5217&quot;\u3002\u4E5F\u53EF\u4EE5\u5C06\u5B83\u8BBE\u6210column\uFF0C\u53D8\u6210&quot;\u5148\u5217\u540E\u884C&quot;\u3002\u8FD8\u53EF\u4EE5\u8BBE\u6210<code>row dense</code>\u548C<code>column dense</code>\uFF0C\u8FD9\u4E24\u4E2A\u503C\u4E3B\u8981\u7528\u4E8E\uFF0C\u67D0\u4E9B\u9879\u76EE\u6307\u5B9A\u4F4D\u7F6E\u4EE5\u540E\uFF0C\u5269\u4E0B\u7684\u9879\u76EE\u5C3D\u53EF\u80FD\u7D27\u5BC6\u586B\u6EE1\uFF0C\u5C3D\u91CF\u4E0D\u51FA\u73B0\u7A7A\u683C\u3002</li><li><strong>justify-items</strong>: \u5C5E\u6027\u8BBE\u7F6E\u5355\u5143\u683C\u4E2D\u5185\u5BB9\u7684\u6C34\u5E73\u4F4D\u7F6E\uFF08\u5DE6\u4E2D\u53F3\uFF09\uFF1A<code>start | end | center | stretch(\u62C9\u4F38);</code>\u3002</li><li><strong>align-items</strong>: \u5C5E\u6027\u8BBE\u7F6E\u5355\u5143\u683C\u5185\u5BB9\u7684\u5782\u76F4\u4F4D\u7F6E\uFF08\u4E0A\u4E2D\u4E0B\uFF09\uFF1A<code>start | end | center | stretch;</code>\u3002</li><li><strong>justify-content</strong>\uFF1A\u5C5E\u6027\u6307\u5B9A\u6574\u4E2A\u5185\u5BB9\u533A\u57DF\u5728\u5BB9\u5668\u91CC\u9762\u7684\u6C34\u5E73\u4F4D\u7F6E\uFF08\u5DE6\u4E2D\u53F3\uFF09\uFF1A<code>start | end | center | stretch | space-around(item\u95F4\u9694\u5747\u5206) | space-between | space-evenly(\u8FB9\u6846\u548Citem\u5B8C\u5168\u5E73\u5747\u5206\u5E03);</code>\u3002</li><li><strong>align-content</strong>\uFF1A\u5C5E\u6027\u6307\u5B9A\u6574\u4E2A\u5185\u5BB9\u533A\u57DF\u7684\u5782\u76F4\u4F4D\u7F6E\uFF08\u4E0A\u4E2D\u4E0B\uFF09\uFF1A<code>start | end | center | stretch | space-around(item\u95F4\u9694\u5747\u5206) | space-between | space-evenly(\u8FB9\u6846\u548Citem\u5B8C\u5168\u5E73\u5747\u5206\u5E03);</code>\u3002</li></ul><h3 id="_2-\u5B50\u5143\u7D20" tabindex="-1"><a class="header-anchor" href="#_2-\u5B50\u5143\u7D20" aria-hidden="true">#</a> 2. \u5B50\u5143\u7D20</h3><ul><li><strong>grid-area</strong>\uFF1A\u5C5E\u6027\u6307\u5B9A\u9879\u76EE\u653E\u5728\u54EA\u4E00\u4E2A\u533A\u57DF\uFF0C\u4E0E<code>grid-template-area</code>\u642D\u914D\u4F7F\u7528\uFF1A<code>grid-area: e;</code>\u3002</li><li><strong>justify-self</strong>\uFF1A\u5C5E\u6027\u8BBE\u7F6E\u5355\u5143\u683C\u5185\u5BB9\u7684\u6C34\u5E73\u4F4D\u7F6E\uFF08\u5DE6\u4E2D\u53F3\uFF09\uFF0C\u8DDFjustify-items\u5C5E\u6027\u7684\u7528\u6CD5\u5B8C\u5168\u4E00\u81F4\uFF0C\u4F46\u53EA\u4F5C\u7528\u4E8E\u5355\u4E2A\u9879\u76EE\uFF1A<code>start | end | center | stretch;</code>\u3002</li><li><strong>align-self</strong>\uFF1A\u5C5E\u6027\u8BBE\u7F6E\u5355\u5143\u683C\u5185\u5BB9\u7684\u5782\u76F4\u4F4D\u7F6E\uFF08\u4E0A\u4E2D\u4E0B\uFF09\uFF0C\u8DDFalign-items\u5C5E\u6027\u7684\u7528\u6CD5\u5B8C\u5168\u4E00\u81F4\uFF0C\u4E5F\u662F\u53EA\u4F5C\u7528\u4E8E\u5355\u4E2A\u9879\u76EE\uFF1A<code>start | end | center | stretch;</code>\u3002</li></ul><h2 id="\u27A3-flex\u5E03\u5C40" tabindex="-1"><a class="header-anchor" href="#\u27A3-flex\u5E03\u5C40" aria-hidden="true">#</a> \u27A3 flex\u5E03\u5C40</h2><h3 id="_1-\u5BB9\u5668\u5143\u7D20-1" tabindex="-1"><a class="header-anchor" href="#_1-\u5BB9\u5668\u5143\u7D20-1" aria-hidden="true">#</a> 1. \u5BB9\u5668\u5143\u7D20</h3><ul><li>\u9700\u8981\u8BBE\u7F6E\uFF1A<code>display: flex;</code></li><li>flex-direction\uFF1A\u5C5E\u6027\u51B3\u5B9A\u4E3B\u8F74\u7684\u65B9\u5411\uFF08\u5373\u9879\u76EE\u7684\u6392\u5217\u65B9\u5411\uFF09\uFF1A <code>row(\u9ED8\u8BA4) | row-reverse | column | column-reverse</code>\u3002</li><li>flex-wrap\uFF1A\u51B3\u5B9Aitems\u5728\u4E00\u6761\u8F74\u7EBF\u6392\u4E0D\u4E0B\u65F6\u5982\u4F55\u6362\u884C\uFF0C<code>nowrap | wrap | wrap-reverse(\u6362\u884C\uFF0C\u7B2C\u4E00\u884C\u5728\u4E0B\u65B9)</code></li><li>flex-flow\uFF1Aflex-direction + flex-wrap \u7B80\u5199\u5F62\u5F0F\u3002</li><li>justify-content\uFF1Aitems\u5728\u4E3B\u8F74\u4E0A\u7684\u5BF9\u9F50\u65B9\u5F0F\uFF1A<code>flex-start | flex-end | center | space-between | space-around(\u5143\u7D20\u95F4\u9694\u5747\u5300)</code>\u3002</li><li>align-items\uFF1A\u5B9A\u4E49items\u5728\u4EA4\u53C9\u8F74\u4E0A\u5982\u4F55\u5BF9\u9F50\uFF1A<code>flex-start | flex-end | center | baseline(\u7B2C\u4E00\u884C\u6587\u672C\u57FA\u7EBF) | stretch(\u62C9\u4F38)</code>\u3002</li><li>align-content\uFF1A\u5B9A\u4E49\u4E86\u591A\u6839\u4E3B\u8F74\u7EBF\u7684\u5BF9\u9F50\u65B9\u5F0F\uFF0C\u5982\u679C\u9879\u76EE\u53EA\u6709\u4E00\u6839\u8F74\u7EBF\uFF0C\u8BE5\u5C5E\u6027\u4E0D\u8D77\u4F5C\u7528\uFF1A<code>flex-start | flex-end | center | space-between | space-around | stretch</code>\u3002</li></ul><h3 id="_2-\u5B50\u5143\u7D20-1" tabindex="-1"><a class="header-anchor" href="#_2-\u5B50\u5143\u7D20-1" aria-hidden="true">#</a> 2. \u5B50\u5143\u7D20</h3><ul><li>order\uFF1A\u5B9A\u4E49item\u7684\u6392\u5217\u987A\u5E8F\uFF0C\u6570\u503C\u8D8A\u5C0F\uFF0C\u6392\u5217\u8D8A\u9760\u524D\uFF0C\u9ED8\u8BA4\u4E3A0\u3002</li><li>flex-grow\uFF1A\u5B9A\u4E49item\u7684\u653E\u5927\u6BD4\u4F8B\uFF0C\u9ED8\u8BA4\u4E3A0\uFF0C\u5373\u5982\u679C\u5B58\u5728\u5269\u4F59\u7A7A\u95F4\uFF0C\u4E5F\u4E0D\u653E\u5927\u3002</li><li>flex-shrink\uFF1A\u5B9A\u4E49\u4E86item\u7684\u7F29\u5C0F\u6BD4\u4F8B\uFF0C\u9ED8\u8BA4\u4E3A1\uFF0C\u5373\u5982\u679C\u7A7A\u95F4\u4E0D\u8DB3\uFF0C\u8BE5\u9879\u76EE\u5C06\u7F29\u5C0F\u3002</li><li>flex-basis\uFF1A\u5C5E\u6027\u5B9A\u4E49\u4E86\u5728\u5206\u914D\u591A\u4F59\u7A7A\u95F4\u4E4B\u524D\uFF0Citem\u5360\u636E\u7684\u4E3B\u8F74\u7A7A\u95F4\uFF08main size\uFF09\u3002\u6839\u636E\u8FD9\u4E2A\u5C5E\u6027\uFF0C\u8BA1\u7B97\u4E3B\u8F74\u662F\u5426\u6709\u591A\u4F59\u7A7A\u95F4\u3002\u5B83\u7684\u9ED8\u8BA4\u503C\u4E3Aauto\uFF0C\u5373\u9879\u76EE\u7684\u672C\u6765\u5927\u5C0F\u3002</li><li>flex\uFF1A\u5C5E\u6027\u662Fflex-grow, flex-shrink \u548C flex-basis\u7684\u7B80\u5199\uFF0C\u9ED8\u8BA4\u503C\u4E3A<code>0 1 auto</code>\u3002\u8BE5\u5C5E\u6027\u6709\u4E24\u4E2A\u5FEB\u6377\u503C\uFF1Aauto (<code>1 1 auto</code>) \u548C none (<code>0 0 auto</code>)\u3002</li><li>align-self\uFF1Aalign-self\u5C5E\u6027\u5141\u8BB8\u5355\u4E2Aitem\u6709\u4E0E\u5176\u4ED6item\u4E0D\u4E00\u6837\u7684\u5BF9\u9F50\u65B9\u5F0F\uFF0C\u53EF\u8986\u76D6align-items\u5C5E\u6027\u3002\u9ED8\u8BA4\u503C\u4E3Aauto\uFF0C\u8868\u793A\u7EE7\u627F\u7236\u5143\u7D20\u7684align-items\u5C5E\u6027\uFF0C\u5982\u679C\u6CA1\u6709\u7236\u5143\u7D20\uFF0C\u5219\u7B49\u540C\u4E8Estretch\u3002</li></ul>`,26);function a(s,n){return i}var d=l(t,[["render",a]]);export{d as default};
