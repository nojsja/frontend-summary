import{c as e}from"./app.0b9cca17.js";import{_ as i}from"./plugin-vue_export-helper.21dcd24c.js";const p={},l=e('<h2 id="\u27A3-https-\u6982\u5FF5" tabindex="-1"><a class="header-anchor" href="#\u27A3-https-\u6982\u5FF5" aria-hidden="true">#</a> \u27A3 HTTPS \u6982\u5FF5</h2><p><img src="https://nojsja.gitee.io/static-resources/images/interview/http-ssl.png" alt=""></p><p>HTTPS \u662F\u8EAB\u62AB SSL \u5916\u58F3\u7684 HTTP HTTPS \u5E76\u975E\u662F\u5E94\u7528\u5C42\u7684\u4E00\u79CD\u65B0\u534F\u8BAE\u3002\u53EA\u662F HTTP \u901A\u4FE1\u63A5\u53E3\u90E8\u5206\u7528 SSL\uFF08Secure Socket Layer\uFF09\u548C TLS\uFF08Transport Layer Security\uFF09\u534F\u8BAE\u4EE3\u66FF\u800C\u5DF2\u3002</p><p>\u901A\u5E38\uFF0CHTTP \u76F4\u63A5\u548C TCP \u901A\u4FE1\u3002\u5F53\u4F7F\u7528 SSL \u65F6\uFF0C\u5219\u6F14\u53D8\u6210\u5148\u548C SSL \u901A\u4FE1\uFF0C\u518D\u7531 SSL \u548C TCP \u901A\u4FE1\u4E86\u3002\u7B80\u8A00\u4E4B\uFF0C\u6240\u8C13 HTTPS\uFF0C\u5176\u5B9E\u5C31\u662F\u8EAB\u62AB SSL \u534F\u8BAE\u8FD9\u5C42\u5916\u58F3\u7684 HTTP\u3002</p><p>\u5728\u91C7\u7528 SSL \u540E\uFF0CHTTP \u5C31\u62E5\u6709\u4E86 HTTPS \u7684\u52A0\u5BC6\u3001\u8BC1\u4E66\u548C\u5B8C\u6574\u6027\u4FDD\u62A4\u8FD9\u4E9B\u529F\u80FD\u3002 SSL \u662F\u72EC\u7ACB\u4E8E HTTP \u7684\u534F\u8BAE\uFF0C\u6240\u4EE5\u4E0D\u5149\u662F HTTP \u534F\u8BAE\uFF0C\u5176\u4ED6\u8FD0\u884C\u5728\u5E94\u7528\u5C42\u7684 SMTP \u548C Telnet \u7B49\u534F\u8BAE\u5747\u53EF\u914D\u5408 SSL \u534F\u8BAE\u4F7F\u7528\u3002\u53EF\u4EE5\u8BF4 SSL \u662F\u5F53\u4ECA\u4E16\u754C\u4E0A\u5E94\u7528\u6700\u4E3A\u5E7F\u6CDB\u7684\u7F51\u7EDC\u5B89\u5168\u6280\u672F\u3002</p><p>HTTPS \u5177\u6709\u4E09\u4E2A\u7279\u6027\uFF1A</p><ul><li>\u4FDD\u5BC6\u6027\uFF1A\u91C7\u7528\u5BF9\u79F0\u52A0\u5BC6\u7B97\u6CD5\u548C\u4E0D\u5BF9\u79F0\u52A0\u5BC6\u7B97\u6CD5\u8FDB\u884C\u62A5\u6587\u901A\u4FE1\uFF0C\u975E\u660E\u6587\u4F20\u8F93\uFF0C\u901A\u4FE1\u8FC7\u7A0B\u5177\u6709\u4FDD\u5BC6\u6027\u3002</li><li>\u5B8C\u6574\u6027\uFF1A\u4F7F\u7528\u6458\u8981\u7B97\u6CD5\u751F\u6210\u6458\u8981\u4EE5\u4F9B\u901A\u4FE1\u63A5\u6536\u7AEF\u9A8C\u8BC1\u6570\u636E\u5B8C\u6574\u6027\u3002</li><li>\u8EAB\u4EFD\u8BA4\u8BC1\uFF1A\u4F7F\u7528\u6570\u5B57\u8BC1\u4E66\u9A8C\u8BC1\u670D\u52A1\u7AEF\u7684\u771F\u5B9E\u8EAB\u4EFD\u548C\u670D\u52A1\u7AEF\u516C\u5171\u5BC6\u94A5\u7684\u6B63\u786E\u6027\u3002</li></ul><h2 id="\u27A3-https-\u6570\u5B57\u8BC1\u4E66\u4E1A\u52A1\u6D41\u7A0B" tabindex="-1"><a class="header-anchor" href="#\u27A3-https-\u6570\u5B57\u8BC1\u4E66\u4E1A\u52A1\u6D41\u7A0B" aria-hidden="true">#</a> \u27A3 HTTPS \u6570\u5B57\u8BC1\u4E66\u4E1A\u52A1\u6D41\u7A0B</h2><p><img src="https://nojsja.gitee.io/static-resources/images/interview/https-process.jpg" alt=""></p><p><strong>1. \u6570\u5B57\u8BC1\u4E66\u8BA4\u8BC1\u673A\u6784\u7684\u4E1A\u52A1\u6D41\u7A0B</strong></p><p>\u9996\u5148\uFF0C\u670D\u52A1\u5668\u7684\u8FD0\u8425\u4EBA\u5458\u5411\u6570\u5B57\u8BC1\u4E66\u8BA4\u8BC1\u673A\u6784\u63D0\u51FA\u516C\u5F00\u5BC6\u94A5\u7684\u7533\u8BF7\u3002\u6570\u5B57\u8BC1\u4E66\u8BA4\u8BC1\u673A\u6784\u5728\u5224\u660E\u63D0\u51FA\u7533\u8BF7\u8005\u7684\u8EAB\u4EFD\u4E4B\u540E\uFF0C\u5C06\u7533\u8BF7\u8005\u7684\u516C\u94A5\u7ECF\u8FC7\u6570\u5B57\u6458\u8981\u7B97\u6CD5\u751F\u6210\u6570\u5B57\u6307\u7EB9\uFF0C\u7136\u540E\u7528\u81EA\u5DF1\u7684\u79C1\u94A5\u52A0\u5BC6\u6570\u5B57\u6307\u7EB9\u751F\u6210\u6570\u5B57\u7B7E\u540D\uFF0C\u6700\u540E\u5C06 <code>\u6570\u5B57\u7B7E\u540D</code> + <code>\u670D\u52A1\u5668\u516C\u94A5</code> \u653E\u5165\u516C\u94A5\u8BC1\u4E66\u540E\u7ED1\u5B9A\u5728\u4E00\u8D77\u3002</p><p>\u670D\u52A1\u5668\u4F1A\u5C06\u8FD9\u4EFD\u7531\u6570\u5B57\u8BC1\u4E66\u8BA4\u8BC1\u673A\u6784\u9881\u53D1\u7684\u516C\u94A5\u8BC1\u4E66\u53D1\u9001\u7ED9\u5BA2\u6237\u7AEF\uFF0C\u4EE5\u8FDB\u884C\u516C\u5F00\u5BC6\u94A5\u52A0\u5BC6\u65B9\u5F0F\u901A\u4FE1\u3002\u516C\u94A5\u8BC1\u4E66\u4E5F\u53EF\u53EB\u505A\u6570\u5B57\u8BC1\u4E66\u6216\u76F4\u63A5\u79F0\u4E3A\u8BC1\u4E66\u3002</p><p>\u63A5\u5230\u8BC1\u4E66\u7684\u5BA2\u6237\u7AEF\u53EF\u4F7F\u7528\u6570\u5B57\u8BC1\u4E66\u8BA4\u8BC1\u673A\u6784\u7684\u516C\u5F00\u5BC6\u94A5\uFF0C\u5BF9\u90A3\u5F20\u8BC1\u4E66\u4E0A\u7684\u6570\u5B57\u7B7E\u540D\u8FDB\u884C\u9A8C\u8BC1\uFF0C\u4E00\u65E6\u9A8C\u8BC1\u901A\u8FC7\uFF0C\u5BA2\u6237\u7AEF\u4FBF\u53EF\u660E\u786E\u4E24\u4EF6\u4E8B\uFF1A</p><ul><li>\u8BA4\u8BC1\u670D\u52A1\u5668\u7684\u516C\u5F00\u5BC6\u94A5\u7684\u662F\u771F\u5B9E\u6709\u6548\u7684\u6570\u5B57\u8BC1\u4E66\u8BA4\u8BC1\u673A\u6784\uFF1B</li><li>\u670D\u52A1\u5668\u7684\u516C\u5F00\u5BC6\u94A5\u662F\u503C\u5F97\u4FE1\u8D56\u7684\uFF0C\u6B64\u5904\u8BA4\u8BC1\u673A\u5173\u7684\u516C\u5F00\u5BC6\u94A5\u5FC5\u987B\u5B89\u5168\u5730\u8F6C\u4EA4\u7ED9\u5BA2\u6237\u7AEF\uFF1B</li></ul><p>\u4F7F\u7528\u8BE5\u901A\u4FE1\u65B9\u5F0F\u65F6\uFF0C\u5982\u4F55\u5B89\u5168\u8F6C\u4EA4\u8BA4\u8BC1\u673A\u5173\u7684\u516C\u5F00\u5BC6\u94A5\u662F\u4E00\u4EF6\u5F88\u56F0\u96BE\u7684\u4E8B\uFF0C\u56E0\u6B64\uFF0C\u591A\u6570\u6D4F\u89C8\u5668\u5F00\u53D1\u5546\u53D1\u5E03\u7248\u672C\u65F6\uFF0C\u4F1A\u4E8B\u5148\u5728\u5185\u90E8\u690D\u5165\u5E38\u7528\u8BA4\u8BC1\u673A\u5173\u7684\u516C\u5F00\u5BC6\u94A5\u3002</p><p><strong>2. https \u4E2D\u5BA2\u6237\u7AEF\u9A8C\u8BC1\u516C\u94A5\u8BC1\u4E66\u7684\u8FC7\u7A0B</strong></p><blockquote><p>\u670D\u52A1\u5668\u5C06\u516C\u94A5\u8BC1\u4E66\u53D1\u9001\u7ED9\u5BA2\u6237\u7AEF\uFF0C\u5BA2\u6237\u7AEF\u9A8C\u8BC1\u516C\u94A5\u8BC1\u4E66\uFF0C\u4ECE\u800C\u786E\u4FDD\u516C\u94A5\u7684\u5408\u6CD5\u6027\u3002</p></blockquote><ul><li>\u5BA2\u6237\u7AEF\u53D6\u51FA\u63D0\u524D\u5185\u7F6E\u5728\u6D4F\u89C8\u5668\u5185\u90E8\u7684\u8BA4\u8BC1\u673A\u6784\u7684\u516C\u94A5\u3002</li><li>\u7528\u8BA4\u8BC1\u673A\u6784\u7684\u516C\u94A5\u53BB\u89E3\u5BC6\u516C\u94A5\u8BC1\u4E66\u91CC\u7684<code>\u6570\u5B57\u7B7E\u540D</code>\uFF0C\u4ECE\u800C\u5F97\u5230<code>\u6570\u5B57\u6307\u7EB9</code>\u3002</li><li>\u5BA2\u6237\u7AEF\u5BF9\u516C\u94A5\u8BC1\u4E66\u7684\u670D\u52A1\u5668\u516C\u94A5\u8FDB\u884C<code>\u6570\u5B57\u6458\u8981\u7B97\u6CD5</code>\uFF0C\u4ECE\u800C\u751F\u6210<code>\u6570\u5B57\u6307\u7EB9</code>\u3002</li><li>\u5BF9\u6BD4\u5BA2\u6237\u7AEF\u81EA\u5DF1\u751F\u6210\u7684\u6570\u5B57\u6307\u7EB9\u548C\u89E3\u5BC6\u5F97\u5230\u7684\u6570\u5B57\u6307\u7EB9\u662F\u5426\u4E00\u81F4\uFF0C\u5982\u679C\u4E00\u81F4\u5219\u516C\u94A5\u8BC1\u4E66\u9A8C\u8BC1\u901A\u8FC7\uFF0C\u5C31\u53EF\u4EE5\u5F00\u59CB\u8FDB\u884C https \u63E1\u624B\u6B65\u9AA4\u4E86\u3002</li></ul><h2 id="\u27A3-https-\u901A\u4FE1\u6B65\u9AA4" tabindex="-1"><a class="header-anchor" href="#\u27A3-https-\u901A\u4FE1\u6B65\u9AA4" aria-hidden="true">#</a> \u27A3 HTTPS \u901A\u4FE1\u6B65\u9AA4</h2><p>\u4E3A\u4E86\u66F4\u597D\u5730\u7406\u89E3 HTTPS\uFF0C\u6211\u4EEC\u6765\u89C2\u5BDF\u4E00\u4E0B HTTPS \u7684\u901A\u4FE1\u6B65\u9AA4\uFF1A</p><ol><li><p>\u901A\u4FE1\u6B65\u9AA4 \u5BA2\u6237\u7AEF\u901A\u8FC7\u53D1\u9001 Client Hello \u62A5\u6587\u5F00\u59CB SSL \u901A\u4FE1\u3002\u62A5\u6587\u4E2D\u5305\u542B\u5BA2\u6237\u7AEF\u652F\u6301\u7684 SSL \u7684\u6307\u5B9A\u7248\u672C\u3001\u52A0\u5BC6\u7EC4\u4EF6\uFF08Cipher Suite\uFF09\u5217\u8868\uFF08\u6240\u4F7F\u7528\u7684\u52A0\u5BC6\u7B97\u6CD5\u53CA\u5BC6\u94A5\u957F\u5EA6\u7B49\uFF09\u3002</p></li><li><p>\u670D\u52A1\u5668\u53EF\u8FDB\u884C SSL \u901A\u4FE1\u65F6\uFF0C\u4F1A\u4EE5 Server Hello \u62A5\u6587\u4F5C\u4E3A\u5E94\u7B54\u3002\u548C\u5BA2\u6237\u7AEF\u4E00\u6837\uFF0C\u5728\u62A5\u6587\u4E2D\u5305\u542B SSL \u7248\u672C\u4EE5\u53CA\u52A0\u5BC6\u7EC4\u4EF6\u3002\u670D\u52A1\u5668\u7684\u52A0\u5BC6\u7EC4\u4EF6\u5185\u5BB9\u662F\u4ECE\u63A5\u6536\u5230\u7684\u5BA2\u6237\u7AEF\u52A0\u5BC6\u7EC4\u4EF6\u5185\u7B5B\u9009\u51FA\u6765\u7684\u3002</p></li><li><p>\u4E4B\u540E\u670D\u52A1\u5668\u53D1\u9001 Certificate \u62A5\u6587\u3002\u62A5\u6587\u4E2D\u5305\u542B\u516C\u5F00\u5BC6\u94A5\u8BC1\u4E66\u3002</p></li><li><p>\u6700\u540E\u670D\u52A1\u5668\u53D1\u9001 Server Hello Done \u62A5\u6587\u901A\u77E5\u5BA2\u6237\u7AEF\uFF0C\u6700\u521D\u9636\u6BB5\u7684 SSL \u63E1\u624B\u534F\u5546\u90E8\u5206\u7ED3\u675F\u3002</p></li><li><p>SSL \u7B2C\u4E00\u6B21\u63E1\u624B\u7ED3\u675F\u4E4B\u540E\uFF0C\u5BA2\u6237\u7AEF\u4EE5 Client Key Exchange \u62A5\u6587\u4F5C\u4E3A\u56DE\u5E94\u3002\u62A5\u6587\u4E2D\u5305\u542B\u901A\u4FE1\u52A0\u5BC6\u4E2D\u4F7F\u7528\u7684\u4E00\u79CD\u88AB\u79F0\u4E3A Pre- master secret \u7684\u968F\u673A\u5BC6\u7801\u4E32\u3002\u8BE5\u62A5\u6587\u5DF2\u7528\u6B65\u9AA4 3 \u4E2D\u7684\u516C\u5F00\u5BC6\u94A5\u8FDB\u884C\u52A0\u5BC6\u3002</p></li><li><p>\u63A5\u7740\u5BA2\u6237\u7AEF\u7EE7\u7EED\u53D1\u9001 Change Cipher Spec \u62A5\u6587\u3002\u8BE5\u62A5\u6587\u4F1A\u63D0\u793A\u670D\u52A1\u5668\uFF0C\u5728\u6B64\u62A5\u6587\u4E4B\u540E\u7684\u901A\u4FE1\u4F1A\u91C7\u7528 Pre- master secret \u5BC6\u94A5\u52A0\u5BC6\u3002</p></li><li><p>\u5BA2\u6237\u7AEF\u53D1\u9001 Finished \u62A5\u6587\u3002\u8BE5\u62A5\u6587\u5305\u542B\u8FDE\u63A5\u81F3\u4ECA\u5168\u90E8\u62A5\u6587\u7684\u6574\u4F53\u6821\u9A8C\u503C\u3002\u8FD9\u6B21\u63E1\u624B\u534F\u5546\u662F\u5426\u80FD\u591F\u6210\u529F\uFF0C\u8981\u4EE5\u670D\u52A1\u5668\u662F\u5426\u80FD\u591F\u6B63\u786E\u89E3\u5BC6\u8BE5\u62A5\u6587\u4F5C\u4E3A\u5224\u5B9A\u6807\u51C6\u3002</p></li><li><p>\u670D\u52A1\u5668\u540C\u6837\u53D1\u9001 Change Cipher Spec \u62A5\u6587\u3002</p></li><li><p>\u670D\u52A1\u5668\u540C\u6837\u53D1\u9001 Finished \u62A5\u6587\u3002</p></li><li><p>\u670D\u52A1\u5668\u548C\u5BA2\u6237\u7AEF\u7684 Finished \u62A5\u6587\u4EA4\u6362\u5B8C\u6BD5\u4E4B\u540E\uFF0CSSL \u8FDE\u63A5\u5C31\u7B97\u5EFA\u7ACB\u5B8C\u6210\u3002\u5F53\u7136\uFF0C\u901A\u4FE1\u4F1A\u53D7\u5230 SSL \u7684\u4FDD\u62A4\u3002\u4ECE\u6B64\u5904\u5F00\u59CB\u8FDB\u884C\u5E94\u7528\u5C42\u534F\u8BAE\u7684\u901A\u4FE1\uFF0C\u5373\u53D1\u9001 HTTP \u8BF7\u6C42\u3002</p></li><li><p>\u5E94\u7528\u5C42\u534F\u8BAE\u901A\u4FE1\uFF0C\u5373\u53D1\u9001 HTTP \u54CD\u5E94\u3002</p></li><li><p>\u6700\u540E\u7531\u5BA2\u6237\u7AEF\u65AD\u5F00\u8FDE\u63A5\u3002\u65AD\u5F00\u8FDE\u63A5\u65F6\uFF0C\u53D1\u9001 close_ notify \u62A5\u6587\u3002</p></li></ol><p>\u5728\u4EE5\u4E0A\u6D41\u7A0B\u4E2D\uFF0C\u5E94\u7528\u5C42\u53D1\u9001\u6570\u636E\u65F6\u4F1A\u9644\u52A0\u4E00\u79CD\u53EB\u505A MAC\uFF08Message Authentication Code\uFF09\u7684\u62A5\u6587\u6458\u8981\uFF0C\u6458\u8981\u5728\u53D1\u9001\u4E4B\u524D\u4F1A\u88AB\u5171\u4EAB\u5BC6\u94A5\u52A0\u5BC6\uFF0C\u901A\u4FE1\u5BF9\u65B9\u6536\u5230\u4E4B\u540E\u4F1A\u4F7F\u7528\u5171\u4EAB\u5BC6\u94A5\u89E3\u5BC6\uFF0C\u7136\u540E\u518D\u8FD0\u884C\u4E00\u4E0B\u6458\u8981\u751F\u6210\u7B97\u6CD5\uFF0C\u5BF9\u6BD4\u751F\u6210\u7684\u6458\u8981\u548C\u6536\u5230\u7684\u89E3\u5BC6\u7684\u6458\u8981\u662F\u5426\u4E00\u81F4\u3002MAC \u80FD\u591F\u67E5\u77E5\u62A5\u6587\u662F\u5426\u906D\u5230\u7BE1\u6539\uFF0C\u4ECE\u800C\u4FDD\u8BC1\u62A5\u6587\u7684\u5B8C\u6574\u6027\u3002</p><h2 id="\u27A3-https-\u52A0\u5BC6" tabindex="-1"><a class="header-anchor" href="#\u27A3-https-\u52A0\u5BC6" aria-hidden="true">#</a> \u27A3 HTTPS \u52A0\u5BC6</h2><p>HTTPS \u91C7\u7528\u5171\u4EAB\u5BC6\u94A5\u52A0\u5BC6\u548C\u516C\u5F00\u5BC6\u94A5\u52A0\u5BC6\u4E24\u8005\u5E76\u7528\u7684\u6DF7\u5408\u52A0\u5BC6\u673A\u5236\u3002\u82E5\u5BC6\u94A5\u80FD\u591F\u5B9E\u73B0\u5B89\u5168\u4EA4\u6362\uFF0C\u90A3\u4E48\u6709\u53EF\u80FD\u4F1A\u8003\u8651\u4EC5\u4F7F\u7528\u516C\u5F00\u5BC6\u94A5\u52A0\u5BC6\u6765\u901A\u4FE1\u3002\u4F46\u662F\u516C\u5F00\u5BC6\u94A5\u52A0\u5BC6\u4E0E\u5171\u4EAB\u5BC6\u94A5\u52A0\u5BC6\u76F8\u6BD4\uFF0C\u5176\u5904\u7406\u901F\u5EA6\u8981\u6162\u3002\u6240\u4EE5\u5E94\u5145\u5206\u5229\u7528\u4E24\u8005\u5404\u81EA\u7684\u4F18\u52BF\uFF0C\u5C06\u591A\u79CD\u65B9\u6CD5\u7EC4\u5408\u8D77\u6765\u7528\u4E8E\u901A\u4FE1\u3002\u5728\u4EA4\u6362\u5BC6\u94A5\u73AF\u8282\u4F7F\u7528\u516C\u5F00\u5BC6\u94A5\u52A0\u5BC6\u65B9\u5F0F\uFF0C\u4E4B\u540E\u7684\u5EFA\u7ACB\u901A\u4FE1\u4EA4\u6362\u62A5\u6587\u9636\u6BB5\u5219\u4F7F\u7528\u5171\u4EAB\u5BC6\u94A5\u52A0\u5BC6\u65B9\u5F0F\u3002</p><h4 id="\u5BF9\u79F0\u52A0\u5BC6\u7B97\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u5BF9\u79F0\u52A0\u5BC6\u7B97\u6CD5" aria-hidden="true">#</a> \u5BF9\u79F0\u52A0\u5BC6\u7B97\u6CD5</h4><p>\u5C31\u662F\u52A0\u5BC6\u548C\u89E3\u5BC6\u4F7F\u7528\u540C\u4E00\u4E2A\u5BC6\u94A5\u3002\u5982 AES\u3001DES\u3002\u52A0\u89E3\u5BC6\u8FC7\u7A0B\uFF1A</p><ul><li>\u6D4F\u89C8\u5668\u7ED9\u670D\u52A1\u5668\u53D1\u9001\u4E00\u4E2A\u968F\u673A\u6570 client-random \u548C\u4E00\u4E2A\u652F\u6301\u7684\u52A0\u5BC6\u65B9\u6CD5\u5217\u8868\uFF1B</li><li>\u670D\u52A1\u5668\u7ED9\u6D4F\u89C8\u5668\u8FD4\u56DE\u53E6\u4E00\u4E2A\u968F\u673A\u6570 server-random \u548C\u53CC\u65B9\u90FD\u652F\u6301\u7684\u52A0\u5BC6\u65B9\u6CD5\uFF1B</li><li>\u7136\u540E\u4E24\u8005\u7528\u52A0\u5BC6\u65B9\u6CD5\u5C06\u4E24\u4E2A\u968F\u673A\u6570\u6DF7\u5408\u751F\u6210\u5BC6\u94A5\uFF0C\u8FD9\u5C31\u662F\u901A\u4FE1\u53CC\u4E0A\u52A0\u89E3\u5BC6\u7684\u5BC6\u94A5\uFF1B</li></ul><p>\u95EE\u9898\u662F\u53CC\u65B9\u5982\u4F55\u5B89\u5168\u7684\u4F20\u9012\u4E24\u4E2A\u968F\u673A\u6570\u548C\u52A0\u5BC6\u65B9\u6CD5\uFF0C\u76F4\u63A5\u4F20\u7ED9\u5BA2\u6237\u7AEF\uFF0C\u90A3\u8FC7\u7A0B\u4E2D\u5C31\u5F88\u53EF\u80FD\u88AB\u7A83\u53D6\uFF0C\u522B\u4EBA\u5C31\u80FD\u6210\u529F\u89E3\u5BC6\u62FF\u5230\u6570\u636E\u3002</p><h4 id="\u4E0D\u5BF9\u79F0\u52A0\u5BC6\u7B97\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u4E0D\u5BF9\u79F0\u52A0\u5BC6\u7B97\u6CD5" aria-hidden="true">#</a> \u4E0D\u5BF9\u79F0\u52A0\u5BC6\u7B97\u6CD5</h4><p>\u5C31\u662F\u4E00\u5BF9\u5BC6\u94A5\uFF0C\u6709\u516C\u94A5 (public key) \u548C\u79C1\u94A5 (private key)\uFF0C\u5176\u4E2D\u4E00\u4E2A\u5BC6\u94A5\u52A0\u5BC6\u540E\u7684\u6570\u636E\uFF0C\u53EA\u80FD\u8BA9\u53E6\u4E00\u4E2A\u5BC6\u94A5\u8FDB\u884C\u89E3\u5BC6\u3002\u5982 RSA\u3001ECDHE\u3002\u52A0\u89E3\u5BC6\u8FC7\u7A0B\uFF1A</p><ul><li>\u6D4F\u89C8\u5668\u7ED9\u670D\u52A1\u5668\u53D1\u9001\u4E00\u4E2A\u968F\u673A\u6570 client-random \u548C\u4E00\u4E2A\u652F\u6301\u7684\u52A0\u5BC6\u65B9\u6CD5\u5217\u8868\uFF1B</li><li>\u670D\u52A1\u5668\u628A\u53E6\u4E00\u4E2A\u968F\u673A\u6570 server-random\u3001\u52A0\u5BC6\u65B9\u6CD5\u3001\u516C\u94A5\u4F20\u7ED9\u6D4F\u89C8\u5668\uFF1B</li><li>\u7136\u540E\u6D4F\u89C8\u5668\u7528\u516C\u94A5\u5C06\u4E24\u4E2A\u968F\u673A\u6570\u52A0\u5BC6\uFF0C\u751F\u6210\u5BC6\u94A5\uFF0C\u8FD9\u4E2A\u5BC6\u94A5\u53EA\u80FD\u7528\u79C1\u94A5\u89E3\u5BC6\uFF1B</li></ul><p>\u4F7F\u7528\u516C\u94A5\u53CD\u63A8\u51FA\u79C1\u94A5\u662F\u975E\u5E38\u56F0\u96BE\uFF0C\u4F46\u4E0D\u662F\u505A\u4E0D\u5230\uFF0C\u968F\u7740\u8BA1\u7B97\u673A\u8FD0\u7B97\u80FD\u529B\u63D0\u9AD8\uFF0C\u975E\u5BF9\u79F0\u5BC6\u94A5\u81F3\u5C11\u8981 2048 \u4F4D\u624D\u80FD\u4FDD\u8BC1\u5B89\u5168\u6027\uFF0C\u8FD9\u5C31\u5BFC\u81F4\u6027\u80FD\u4E0A\u8981\u6BD4\u5BF9\u79F0\u52A0\u5BC6\u8981\u5DEE\u5F88\u591A</p><p>TLS \u5B9E\u9645\u7528\u7684\u662F\u4E24\u79CD\u7B97\u6CD5\u7684\u6DF7\u5408\u52A0\u5BC6\u3002\u901A\u8FC7 \u975E\u5BF9\u79F0\u52A0\u5BC6\u7B97\u6CD5 \u4EA4\u6362 \u5BF9\u79F0\u52A0\u5BC6\u7B97\u6CD5 \u7684\u5BC6\u94A5\uFF0C\u4EA4\u6362\u5B8C\u6210\u540E\uFF0C\u518D\u4F7F\u7528\u5BF9\u79F0\u52A0\u5BC6\u8FDB\u884C\u52A0\u89E3\u5BC6\u4F20\u8F93\u6570\u636E\u3002\u8FD9\u6837\u5C31\u4FDD\u8BC1\u4E86\u4F1A\u8BDD\u7684\u673A\u5BC6\u6027\u3002\u8FC7\u7A0B\u5982\u4E0B\uFF1A</p><ul><li>\u6D4F\u89C8\u5668\u7ED9\u670D\u52A1\u5668\u53D1\u9001\u4E00\u4E2A\u968F\u673A\u6570 client-random \u548C\u4E00\u4E2A\u652F\u6301\u7684\u52A0\u5BC6\u65B9\u6CD5\u5217\u8868\uFF1B</li><li>\u670D\u52A1\u5668\u628A\u53E6\u4E00\u4E2A\u968F\u673A\u6570 server-random\u3001\u52A0\u5BC6\u65B9\u6CD5\u3001\u516C\u94A5\u4F20\u7ED9\u6D4F\u89C8\u5668\uFF1B</li><li>\u6D4F\u89C8\u5668\u53C8\u751F\u6210\u53E6\u4E00\u4E2A\u968F\u673A\u6570 pre-random\uFF0C\u5E76\u7528\u516C\u94A5\u52A0\u5BC6\u540E\u4F20\u7ED9\u670D\u52A1\u5668\uFF1B</li><li>\u670D\u52A1\u5668\u518D\u7528\u79C1\u94A5\u89E3\u5BC6\uFF0C\u5F97\u5230 pre-random\uFF1B</li><li>\u6D4F\u89C8\u5668\u548C\u670D\u52A1\u5668\u90FD\u5C06\u4E09\u4E2A\u968F\u673A\u6570\u7528\u52A0\u5BC6\u65B9\u6CD5\u6DF7\u5408\u751F\u6210\u6700\u7EC8\u5BC6\u94A5\uFF1B</li></ul><p>\u8FD9\u6837\u5373\u4FBF\u88AB\u52AB\u6301\uFF0C\u4E2D\u95F4\u4EBA\u6CA1\u6709\u79C1\u94A5\u5C31\u62FF\u4E0D\u5230 pre-random\uFF0C\u5C31\u65E0\u6CD5\u751F\u6210\u6700\u7EC8\u5BC6\u94A5\u3002</p><p>\u53EF\u53C8\u6709\u95EE\u9898\u6765\u4E86\uFF0C\u5982\u679C\u4E00\u5F00\u59CB\u5C31\u88AB DNS \u622A\u6301\uFF0C\u6211\u4EEC\u62FF\u5230\u7684\u516C\u94A5\u662F\u4E2D\u95F4\u4EBA\u7684\uFF0C\u800C\u4E0D\u662F\u670D\u52A1\u5668\u7684\uFF0C\u6570\u636E\u8FD8\u662F\u4F1A\u88AB\u7A83\u53D6\uFF0C\u6240\u4EE5\u4F1A\u4F7F\u7528\u6570\u5B57\u8BC1\u4E66\u8FDB\u884C\u8EAB\u4EFD\u8BC1\u548C\u516C\u94A5\u9A8C\u8BC1\u3002</p><h4 id="\u6458\u8981\u7B97\u6CD5" tabindex="-1"><a class="header-anchor" href="#\u6458\u8981\u7B97\u6CD5" aria-hidden="true">#</a> \u6458\u8981\u7B97\u6CD5</h4><p>\u4E3B\u8981\u7528\u4E8E\u4FDD\u8BC1\u4FE1\u606F\u7684\u5B8C\u6574\u6027\u3002\u5E38\u89C1\u7684 MD5 \u7B97\u6CD5\u3001\u6563\u5217\u51FD\u6570\u3001\u54C8\u5E0C\u51FD\u6570\u90FD\u5C5E\u4E8E\u8FD9\u7C7B\u7B97\u6CD5\uFF0C\u5176\u7279\u70B9\u5C31\u662F\u5355\u5411\u6027\u3001\u65E0\u6CD5\u53CD\u63A8\u539F\u6587\u3002</p><p>\u5047\u5982\u4FE1\u606F\u88AB\u52AB\u6301\uFF0C\u5E76\u91CD\u65B0\u751F\u6210\u4E86\u6458\u8981\uFF0C\u8FD9\u65F6\u5019\u5C31\u5224\u65AD\u4E0D\u51FA\u6765\u662F\u5426\u88AB\u7BE1\u6539\u4E86\uFF0C\u6240\u4EE5\u9700\u8981\u7ED9\u6458\u8981\u4E5F\u901A\u8FC7\u4F1A\u8BDD\u5BC6\u94A5\u8FDB\u884C\u52A0\u5BC6\uFF0C\u8FD9\u6837\u5C31\u770B\u4E0D\u5230\u660E\u6587\u4FE1\u606F\uFF0C\u4FDD\u8BC1\u4E86\u5B89\u5168\u6027\uFF0C\u540C\u65F6\u4E5F\u4FDD\u8BC1\u4E86\u5B8C\u6574\u6027\u3002</p>',39);function r(t,a){return l}var o=i(p,[["render",r]]);export{o as default};