---
title: 'How to make a go to top Button in react'
date: 'August 22, 2022'
excerpt: 'Sometimes messing with the window is tricky in react, but we can still get it done.'
cover_image: ''
category: 'ClientSide'
author: 'Gurjotlove Parmar'
author_image: ''
---

# How to make a go to top Button in react
> First off you will want to make your button and set it's position to *fixed*. This Will ensure that the button will stay in  the bottom left or right of the screen, I recommend the bottom right, but whatever you choose is fine.

> Then you will want to add an onClick event handler to your button and set it to run the following function.

```javascript
        const scrollToTop = () =>{
            window.scrollTo({
            top: 0, 
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
              in place of 'smooth' */
            });
        };
```

[Full article with code examples here](https://www.geeksforgeeks.org/how-to-create-a-scroll-to-top-button-in-react-js/)