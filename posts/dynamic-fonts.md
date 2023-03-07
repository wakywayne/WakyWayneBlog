---
title: 'Dynamic Font Sizing'
date: 'September 22, 2022'
excerpt: 'This code will have your fonts dynamically size with your screen sizes'
cover_image: ''
category: 'Styles'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

### This code will have your fonts dynamically size with your screen sizes *I use it in almost every one of my projects*

# Dynamic Fonts

```css
body{
  background-color: ;
  font-size: calc(15px + 0.5vw);
  line-height: calc(22px + 0.6vw);
}

h1{
font-size: 1.6em; 
line-height: calc(30px + 1vw);
}

h2{
font-size: 1.4em;
line-height: calc(26px + 1vw);

} 
h3 {
font-size: 1.2em; 
line-height: calc(24px + 1vw);
}

h1, h2, h3 { 
margin: 0 0 calc(16px+ 1vw) 0; 
/* text-transform: capitalize; 
font-weight: 700; */
}
```