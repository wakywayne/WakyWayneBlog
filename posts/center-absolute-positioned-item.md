---
title: 'Center absolutely positioned element'
date: 'September 19, 2022'
excerpt: 'The CSS3 way of centering absolutely positioned elements'
cover_image: ''
category: 'UsefulTips'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

## Please note this won't work on older browsers
```css
#somelement {
position: absolute;
left: 50%;
-webkit-transform: translateX(-50%);
transform: translateX(-50%)
}
```