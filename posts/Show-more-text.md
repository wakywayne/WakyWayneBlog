---
title: 'Show more button Jquery code'
date: 'September 22, 2022'
excerpt: 'To much text? You can hide some!'
cover_image: ''
category: 'Styles'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# Show more…
*If you have to much text to show you can hide some of it and show when the user clicks show more*

```javascript
let readMoreText = $(".read-more-text")[0];
const text = $(".text-to-show")[0];

$(readMoreText).click(() => {
  text.classList.toggle("hide");
  if (readMoreText.innerText === "show more...") {
    readMoreText.innerText = "show less";
  } else {
    readMoreText.innerText = "show more...";
  }
});
```