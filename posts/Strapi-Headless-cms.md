---
title: 'Strapi'
date: 'September 22, 2022'
excerpt: 'Strapi is an excellent headless cms great for any simple app you want to get off the ground quickly'
cover_image: ''
category: 'FrameWorks'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# Strapi

## Integrate Cloudinary
1. yarn add strapi-provider-upload-cloudinary
2. make a plugins.js file in config folder
  - ```javascript
      module.exports = ({ env }) => ({
          upload: {
              config: {
                  provider: 'cloudinary',
                  providerOptions: {
                      cloud_name: env('CLOUDINARY_NAME'),
                      api_key: env('CLOUDINARY_KEY'),
                      api_secret: env('CLOUDINARY_SECRET'),
                  },
                  actionOptions: {
                      upload: {},
                      delete: {},
                  },
              },
          },
          <!-- This is for the slugify package -->
          slugify: {
              enabled: true,
              config: {
                  contentTypes: {
                      event: {
                          field: 'slug',
                          references: 'name',
                      },
                  },
              },
          },
      });
    ```
3. Go to cloudinary and add the env variables to strapi in .env

## Doing a Search for Multiple Queries
**Switch contains to containsi for a non case sensitive search**
```javascript
export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    filters: {
      $or: [
        {
          name: {
            $contains: term,
          }
        },
        {
          performers: {
            $contains: term,
          }
        },
        {
          description: {
            $contains: term,
          }
        },
        {
          venue: {
            $contains: term,
          }
        },
      ]
    }
  })
```
## Creating Own Api Route in Strapi
> **In backend go to _/src/api/events/routes/custom-event.js_** *I believe yo can name the last route anything*
> ```javascript
> "use strict";
>  
> /**
>  * custom router.
>  */
>  
> module.exports = {
>   routes: [
>     {
>       method: "GET",
>       path: "/events/me",
>       handler: "event.me",
>       config: {},
>     },
>   ],
> };
> ```
> *This handler should be in the format of the controller's  __"[file name].[method name]"__*
> <hr/>
> 
> **Now in _[ /src/api/events/controllers/event.js ]_**
> ```javascript
> "use strict";
>  
> /**
>  *  event controller
>  */
>  
> const { createCoreController } = require("@strapi/strapi").factories;
>  
> module.exports = createCoreController("api::event.event", ({ strapi }) => ({
>   // Get logged in users
>   async me(ctx) {
>     const user = ctx.state.user;
>  
>     if (!user) {
>       return ctx.badRequest(null, [
>         { message: "No authorization header was found" },
>       ]);
>     }
>  
>     const data = await strapi.db.query("api::event.event").findMany({
>       where: {
>         user: { id: user.id },
>       },
>       populate: { user: true, image: true },
>     });
>     if (!data) {
>       return ctx.notFound();
>     }
>  
>     const res = await this.sanitizeOutput(data, ctx);
>     return res;
>   },
> }));
> ```
> *Make sure you restart backend and allow the necessary permissions for your new route*

## GET
- ?populate=* *This will populate everything (can also specify felids) __Seems to be placed at end of query generally__*
  - To populate deep into table references use Strapi [plugin populate-deep](https://forum.strapi.io/t/strapi-populate-not-working/18681)
- ?fields=name,publishedAt *This will get only these two things*
- ?fields=name,publishedAt&populate=image *This is how you do multiple queries*


## Parameters
> ### Sort
> - ?sort[0]=name:desc&sort[1]=createdAt *This is how you sort first name then createdAt, remove desc to do ascend*
> 
> ### Filtering
> **GET /api/:pluralApiId?filters[field][operator]=value**
> _(Strapi Docs)[https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#filtering]_
> - ?filters[avgPrice][$lte]=30 *This gets all the restaurants that are less than or equal to 30*
> 
> ### Pagination
> **When using pagination your response object stores page, pageSize, pageCount, and total under meta**
> - ?pagination[page]=${pageNumber}&pagination[pageSize]=${resultsPerPage}&populate=*

## POST
- body: JSON.stringify({ data: values })
- to auto gen slugs go on backend
    1. install *strapi-plugin-slugify*
    2. Settings > Roles > Public > Slugify (checkbox findSlug)
    3. In config/plugins.js
        - ```javascript
            module.exports = ({ env }) => ({
                slugify: {
                    enabled: true,
                    config: {
                        contentTypes: {
                            article: {
                                field: 'slug',
                                references: 'title',
                            },
                        },
                    },
                },
            });
            ```
- uploading images to content type
    - ```javascript
            const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('files', image)
        // This will just upload the image into your strapi library not a specific event 
        formData.append('refId', evtId)
        // This is the specific id in that collection you want to upload to
        formData.append('ref', 'api::event.event')
        // This is the collection type you want to use
        // Not sure why you have to put event twice
        formData.append('field', 'image')
        // This is the field name you want to upload to

        console.log(formData)

        const res = await fetch(`${API_URL}/api/upload`, {
            method: 'POST',
            // headers: {
            //     Authorization: `Bearer ${token}`,
            // },
            body: formData
        })
        }
        ```

## PUT
- body: JSON.stringify({ data: values })
## DELETE
- fetch(`${API_URL}/api/event-videos/${videoId}`)
# Authentication
**Hit route _api/auth/local/register_**
## Object that you send
```javascript
{
    "username": "name",
    "email": "theEmail",
    "password": "thePassword",
}
```

# graphQL
1. run yarn strapi install graphql
2. localhost:1337/graphql

# deployment to heroku
1. Add package lock.json to git ignore *i am not sure if you should do the same for the yarn.lock
2. heroku create (name-of-heroku-project*we will use this as example*)
3. heroku git:remote -a (name-of-heroku-project)
4. heroku addons:create heroku-postgresql:hobby-dev --app (name-of-heroku-project)
  - heroku config *this will show you database url*
5. yarn add pg-connection-string pg
6. In config folder create file structure env/production/database.js *the database folder in root is for local only*
  - ```javascript
      const parse = require('pg-connection-string').parse;
      const config = parse(process.env.DATABASE_URL);
      module.exports = ({ env }) => ({
          connection: {
              client: 'postgres',
              connection: {
                  host: config.host,
                  port: config.port,
                  database: config.database,
                  user: config.user,
                  password: config.password,
                  ssl: {
                      rejectUnauthorized: false
                  },
              },
              debug: false,
          },
      });
    ```
7. In the same folder as database.js make a server.js file
  - ```javascript
      module.exports = ({ env }) => ({
        proxy: true,
        url: env('MY_HEROKU_URL'),
        app: {
            keys: env.array('APP_KEYS')
        },
      })
    ```
8. heroku config:set NODE_ENV=production
9. heroku config:set MY_HEROKU_URL=$(heroku info -s | grep web_url | cut -d= -f2)
  - *This sets MY_HEROKU_URL to what the web url is*
10. **IMPORTANT** In .env you will see APP_KEYS copy the value and paste one at a time into config/server.js
  - *Should look something like this*
  - ```javascript
        module.exports = ({ env }) => ({
        host: env('HOST', '0.0.0.0'),
        port: env.int('PORT', 1337),
        app: {
          keys: env.array('APP_KEYS', ['ksjhfdkjhdjfhsdkfjh==', 'kjhkjhkjhdsfs==', 'hjfksdhfksjaue==', 'hjkfhslkajdhfueuhfc==']),
        },
      });
    ```
11. You must reset the permissions in the production database
