---
title: 'Only have to login to github once a day'
date: 'July 21, 2023'
excerpt: 'With this code you will be able to save your git login for a set period of time'
cover_image: '/images/posts/img5.jpg'
category: 'UsefulTips'
author: 'WayneCarl'
author_image: ''
---

# Use the following commands to store your credentials for a set amount of time

## Setting Passwords:

```git config --global credential.helper store```

```git config --global credential.helper 'cache --timeout=32400'```

*The above makes it so you only have to put it in once every working day*

**Unsetting Saved Passwords and store:**
git config --global --unset credential.helper
