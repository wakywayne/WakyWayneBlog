---
title: 'Axios, a Better Way to Fetch'
date: 'October 22, 2022'
excerpt: 'Axios is becoming the more popular alternative to plain old fetch'
cover_image: ''
category: 'Utilities'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# axios

## get request (*default*)

```javascript
import axios from 'axios';

const GetRequest =() =>{
    const fetchData = async () =>{
        try{
            const response =await axios(url);
            const data = response.data;
            // axios puts response on the data key
        }catch(error){
            console.log(error.response)
        }
    }
}
```

## Request Headers


```javascript
import axios from 'axios';

const GetRequest =() =>{
    const fetchData = async () =>{
        try{
            const response =await axios(url, {
                headers: {
                    Accept: 'application/json',
                },
            });
            const data = response.data;
            // axios puts response on the data key
        }catch(error){
            console.log(error.response)
        }
    }
}
```

## Post Request

```javascript
import axios from 'axios';

const GetRequest =() =>{
    const fetchData = async () =>{
        try{
            const response =await axios(url, { name, email}, {/*request headers will go hear*/});
            const data = response.data;
            // axios puts response on the data key
        }catch(error){
            console.log(error.response)
        }
    }
}
```

## Setting Up Global axios
*In a file axios/global.js for example __Note there are other things you can set globally__*

```javascript
import axios from 'axios';

axios.defaults.headers.common['Accept']= 'application/json';
```

__*Then just import this file *No export needed just the file* to your root file__ 


## Interceptors
**Need to learn**
