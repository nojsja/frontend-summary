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

## ➣ 最长对称子串长度


### 题目描述

返回对称子串串的最大长度

```javascript
输入：ABBA
输出：4

输入：ABBBA
输出：5
```

### 题解

遍历字符，在每个字符位置向两边扩展计算对称子串长度，并记录最大值。注意的是对称子串为奇数和偶数的情况。

```javascript
function getMaxStringLength(str)
  let i = 0, length = str.length, max = 1;
  let pre, next;

  function getMax(p, n) {
      while (p >= 0 && n < length) {
          if (str[p] === str[n]) {
              max = Math.max(max, n - p + 1);
          } else {
              break;
          }
          n += 1;
          p -= 1;
      }
  }

  while (i < length - 1) {
      // 奇数
      pre = next = i;
      getMax(pre, next);
      // 偶数
      pre = i, next = i + 1;
      getMax(pre, next);
      i++;
  }

  return max;
```