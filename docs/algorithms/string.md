---
lang: zh-CN
title: ● 字符串处理
description: Algorithms 的描述
---

## ➣ 单词倒排

### 题目描述

对字符串中的所有单词进行倒排：

- 每个单词是以26个大写或小写英文字母构成。
- 非构成单词的字符均视为单词间隔符。
- 要求倒排后的单词间隔符以一个空格表示；如果原字符串中相邻单词间有多个间隔符时，倒排转换后也只允许出现一个空格间隔符。
- 每个单词最长20个字母。

```javascript
输入： I am a student
输出： student a am I
```

### 题解

```javascript
function reverseWords(string) {
  var words = string.match(/[A-Za-z]+/g);
  
  return words.reverse().join(' ');
}
```