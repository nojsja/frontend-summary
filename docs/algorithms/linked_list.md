---
lang: zh-CN
title: ● 链表
description: Algorithms 的描述
---

## ➣ 判断链表是否为回文链表

### 题目描述

给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。

```javascript
输入：head = [1,2,2,1]
输出：true

输入：head = [1,0,1]
输出：true

输入：head = [0]
输出：true

输入：head = [1,2]
输出：false
```

### 题解

通过 快、慢指针找链表中点，然后反转链表，依次比较两个链表两侧是否相等，来判断是否是回文链表。

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
  var right = reverse(findCenter(head));
  var left = head;

  while (left && right) {
    if (left.val === right.val) {
      left = left.next;
      right = right.next;
    } else {
      return false;
    }
  }

  return true;
};

/* 反转链表 */
var reverse = function(node) {
  var pre = null, cur = node, next;

  while (cur) {
    next = cur.next;
    cur.next = pre;
    node = cur;
    pre = cur;
    cur = next;
  }

  return node;
};

/* 找到链表中点 */
var findCenter = function(node) {
  var fast = slow = node;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // 奇数链表 slow 往后移动一位
  if (fast !== null)
    slow = slow.next; 

  return slow;
};
```