---
title: 'Nice Table Styling'
date: 'September 22, 2022'
excerpt: 'This is a great starter for styling you tables'
cover_image: ''
category: 'Styles'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# This is a great starter for styling you tables
```css
.upcoming-table {
  margin: 25px 0;
  font-size: 0.9em;
  min-width: 400px;
  border-collapse: collapse;
  border-top: solid #ff7824 4px;
  border-radius: 5px 5px 0 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.upcoming-table thead {
  color: black;
  background-color: #fd6e16;
  font-size: 1.2em;
}

.upcoming-table tbody tr:last-of-type {
  border-bottom: 3px solid #ff7824;
}
```