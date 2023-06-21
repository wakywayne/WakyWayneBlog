
---
title: "Stop apple from messing with styles"
date: "June 21, 2023"
excerpt: "Use this for those times your app is messed up on IOS"
cover_image: ""
category: "Styles"
author: "WayneCarl"
author_image: "/images/wayneswildworldImages/waterfall.jpg"
---

# Stop Apple From Styling

```
-webkit-apearance: none;
```

### Example that stops apple from messing with inputs

```css
textarea,
input.text,
input[type="text"],
input[type="button"],
input[type="submit"],
input[type="email"],
input[type="number"],
input[type="tel"],
.input-checkbox {
  -webkit-appearance: none;
  /* border-radius: 0; */
}
```

# Stop Apple From Messing With Screen Size

```css
body {
  min-height: 100vh;
  min-height: -webkit-fill-available;
}
```

# Stop Apple From Messing With z-index

```css
/* On element that should be on top */

-webkit-transform: translate3d(0,0,0);
```

# Final Remarks

> Why does apple think that they should change the way css works? I've pondered the question for many hours; do they like watching us struggle to find esoteric solutions to their weird browser behaivore? 
> Maybe, but I think it is more complicated than that. Apple has a sense of entitlement that can only come from the fact that almost everyone buys their phone. Even tho it has been steadily improving 
> less and less from one year to the next. So what does this teach them? "Obviously I don't need to try and improve I just need to be me.  Whether I improve or not doesen't change how many people use my phones so why do it in my web browser?"
> What can we as developers and consumbers take from this lesson? It's quite simple actually... FOR THE LOVE OF GOD OR WHATEVER YOU BELIEVE IN PLEASE USE CHROME! 

*Thank you for reading my rant hope it was entertaining :)*
