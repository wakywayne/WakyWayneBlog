---
title: "Compare two arrays for equality"
date: "July 21, 2023"
excerpt: "Arrays are refernce type objects so testing equality can be difficult"
cover_image: "/images/posts/img8.jpg"
category: "Utilities"
author: "WayneCarl"
author_image: ""
---

# Code

```javascript
export default function arraysEqual(a: Array<any>, b: Array<any>) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
```
