---
title: "Making Array only have 1 of each items"
date: 'May 7, 2022'
excerpt: 'This is an easy 1 liner for making an array only unique values'
cover_image: ''
category: 'Styles'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# Making Array only have 1 of each items
**uniqueCategories should be the name of the array** 
```javascript
      const uniqueCategories = [...new Set(categories)]
```