---
title: 'How to make an iframe responsive?'
date: 'May 15, 2022'
excerpt: 'Do you ever struggle to make your iframes look good and be responsive?'
cover_image: ''
category: 'Styles'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# How to make an iframe responses
*Do you ever struggle to make your iframes look good and be responsive?*

## Just apply the above css to a div that wraps your iframe

```css
        .iframeContainer {
            overflow: hidden;
            padding-top: 56.25%;
            position: relative;
            border: 1.2px solid red;
            background-color: red;
        }

        .iframeContainer iframe {
            height: 100%;
            left: 0;
            position: absolute;
            top: 0;
            width: 100%;
            border: 0;
        }
```