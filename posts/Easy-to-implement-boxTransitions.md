---
title: 'Easy to use transition'
date: 'July, 14, 2022'
excerpt: 'Make an easy box transition with jquery or React'
cover_image: '/images/posts/img7.jpg'
category: 'Styles'
author: 'Parth Tomar'
author_image: ''
---
[Author Stack Overflow](https://stackoverflow.com/users/9144424/parth-tomar)

# How it looks
> Basically the way this works is divs will alternate coming in from the left and right of the screen. This is something you have probably seen on many high quality websites and though of it as difficult but it is actually very easy I will show you both a jQuery version as well as a React version.

## Jquery code
## This is an alternating side coming in transform
_I regularly use this code in my applications to add a little motion to the page, but I obviously can't use Jquery in react so I will also show a react version below_

----------------

> **Html Code**

>```html
><div class="box-wrapper loading"><div class="box"></div></div>
><div class="box-wrapper loading"><div class="box"></div></div>
>```

> **CSS Code**

>```css
>body {
>  overflow-x: hidden;
>}
>.box-wrapper {
>  -webkit-transition-duration: 600ms;
>  transition-duration: 600ms;
>}
>.box-wrapper.loading:nth-child(odd) {
>  transform: translate(100%);
>}
>.box-wrapper.loading:nth-child(even) {
>  transform: translate(-100%);
>}
>```

> **Javascript Code**

>```javascript
>$(".box-wrapper").each(function (index, element) {
>  setTimeout(function () {
>    element.classList.remove("loading");
>  }, index * 600);
>});
>```

## React Code

**javascript**

```javascript
// Your entry component: App

import React, { useEffect, useState } from "react";

const App = () => {
  const boxArray = ["Box1", "Box2"];
  return (
    <>
      {boxArray.map((box, index) => {
        return <WrapperItem box={box} timeout={index * 600} key={index} />;
      })}
    </>
  );
};

const WrapperItem = ({ box, timeout }) => {
  const [loadingClass, setLoadingClass] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoadingClass(false);
    }, timeout);
  }, [timeout]);

  return (
    <div className={`boxWrapper ${loadingClass ? "loading" : ""}`}>
      <div className="box">
        <p>{box}</p>
      </div>
    </div>
  );
};

export default App;
```

**css**

```css
/* Place this in index.css */

body {
  overflow-x: hidden;
}
.boxWrapper {
  -webkit-transition-duration: 600ms;
  transition-duration: 600ms;
}
.boxWrapper.loading:nth-child(odd) {
  transform: translate(100%);
}
.boxWrapper.loading:nth-child(even) {
  transform: translate(-100%);
}
```



