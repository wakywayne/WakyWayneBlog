---
title: 'Add protection when dangerously setting html'
date: 'September, 14, 2022'
excerpt: 'This will show you how to use one of the most under used npm packages out there'
cover_image: '/images/posts/img7.jpg'
category: 'Utilities'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# Heres how it works
[npm page](https://www.npmjs.com/package/isomorphic-dompurify)

```javascript
import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';


export default function EventPage({ evt}) {

  var clean = DOMPurify.sanitize(evt.description);

  return (
    <>
        <h3>Info:</h3>
        <div>{parse(clean)}</div>
    </>
  )
```

### This is an easy one thankfully they do all the work for you