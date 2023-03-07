---
title: 'Make text have an image as its color'
date: 'September 22, 2022'
excerpt: 'This code allows you to use a nice looking image as a texts color/background'
cover_image: ''
category: 'Styles'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# Text Color Image

```css
h1{
  background-image:url('Stuff');
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```