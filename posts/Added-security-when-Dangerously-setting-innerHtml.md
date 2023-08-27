---
title: "Add protection when dangerously setting html in React"
date: "September, 14, 2022"
excerpt: "This will show you how to use one of the most under used npm packages out there"
cover_image: "/images/posts/img7.jpg"
category: "Utilities"
author: "WayneCarl"
author_image: "/images/wayneswildworldImages/waterfall.jpg"
---

# How to insert an html string into actual html in a React application SAFELY

If you need to insert html code into your react application you are going to want to make sure that it is first purified. This prevents malicious actors from injecting into your code.

The recommended solution is to use DOMPurify, however I like using the isomorphic-dompurify package because it adds a wrapper around DOMPurify so that you can also use it on the backend.

<a href="https://github.com/kkomelin/isomorphic-dompurify" target="_blank">_Here is the explanation of how it work on git hub_ </a>

<a href="https://www.npmjs.com/package/isomorphic-dompurify/" target="_blank">Here is the npm page</a>

We also use parse which will parse the html from a string in case you are storing it in a database or something

```jsx
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

