---
title: 'Visualizing Postman requests'
date: 'September 19, 2022'
excerpt: 'Few people know what the visualize tab does on postman this post will show you'
cover_image: ''
category: 'UsefulTips'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---


# Breakdown
1. I am showing you an example response so we can better understand what the code does
2. I will explain what the code we are writing does
3. I will show you the an example of the code we will be writing 
4. I will show you what our new visualized response will look like
----------

### What our regular example response will look like 

```json
{
    "items": [
        {
            "title": "Title 1",
            "array": [
                   {
                    "first": 1,
                    "second": 2
                },
                   {
                    "first": 3,
                    "second": 4
                }
            ],
        },
{
            "title": "Title 2",
            "array": [
                   {
                    "first": 5,
                    "second": 6
                },
                   {
                    "first": 7,
                    "second": 8
                }
            ],
        }
    ]
}
```

## Explanation
> The template variable is how your request will be displayed. We use the **#each** key word to let postman know we want to map through all of the  items in that array. If we have another array we want to map through we just use the **#each** key word again. 

## In the tests tab on postman request

```handlebars
let template = `
<ol>
{{#each response.items}}
<li>
{{title}}
<li/>
{{#each array}}
<li>
{{first}} and {{second}}
</li>
{{/each}}
{{/each}}
</ol>`

pm.visualizer.set(template, {response: pm.response.json()})
```



### What the visualized response will look like
1. Title 1
2. 1 and 2
3. 3 and 4
4. Title 2
5. 5 and 6
6. 7 and 8

> So there you have it you can now use the test tab to create visualized responses you you wanted to you can even **add a bootstrap import** to the test tab and add bootstrap classes to your html!

