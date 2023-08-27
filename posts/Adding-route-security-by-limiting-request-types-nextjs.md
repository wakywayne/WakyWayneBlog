---
title: "Limiting request options in nextJS for added security"
date: "September, 12, 2022"
excerpt: "By limiting req types you can add additional security to your app"
cover_image: "/images/posts/img7.jpg"
category: "ServerSide"
author: "WayneCarl"
author_image: "/images/wayneswildworldImages/waterfall.jpg"
---

# Limiting request options in nextJS for added security and better response handling

**You cannot use next export with api routes**
**Use the standard req, res syntax in the api**

To allow or limit the kind of request you can use, simply add this code to your api/ server file in you nextJS application (_These are the files in your /api folder_)

```javascript
            export default (req, res)=> {
                if (req.method === 'GET'){
                    res.status(200).json(theDataThatWasReq)
                }else{
                    res.setHeader('Allow', ['GET']) res.status(405)
                    res.status(405).json({message:`Method ${req.method} is not allowed, nice try tho`})
                }
            }
```

**The above code makes it so that you can only make a GET request to the current route**
