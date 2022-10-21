---
title: 'How to stop an element from triggering mouse events'
date: 'August 4, 2022'
excerpt: 'Is your mouse event targeting the wrong element?'
cover_image: ''
category: 'ClientSide'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# How to stop an element from triggering mouse events

```css
    button>* {
        pointer-events: none;
    }
```

> Sometimes your event target comes up as a child of the element and not the element that you are expecting, this can mess up your onClick events. *In this case just set the above css to the parent element class and all it's children will not be able to be registered as an event target*. 

> This is also very useful for when you have an element inside another element that's mouse event isn't getting targeted because the e.target is coming up as the parent element. *In this case you would want to make the above css applied only to the parent and not the children*.

