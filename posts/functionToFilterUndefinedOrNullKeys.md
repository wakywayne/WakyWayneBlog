---
title: "Function to filter undefined or null keys"
date: "March 24, 2023"
excerpt: "A usefule function for removing rendundent data from an object"
cover_image: ""
category: "Utilities"
author: ""
author_image: ""
---


```typescript
export const cleanUndefinedOrNullKeys = <T>(obj: Object) => (
    Object.fromEntries(
        Object.entries(obj).filter(([k, v]) => v != null || v != undefined)
    )) as T;
```


