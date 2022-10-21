---
title: 'SEO Tips'
date: 'September 19, 2022'
excerpt: 'Here are some SEO tips'
cover_image: ''
category: 'UsefulTips'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---



# General SEO tips
> - Bounce rate and if they click on multiple links are very important
> - Put most important content in **article tags** and header priority *(h1 more important than h2)*
> - Make sure to use alt tags when needed
> - ### Important Header *You can add meta tags to your header to control how your site looks when shared on platforms*
> - if you want your site to be shared on social look up their meta tags ie. facebook Insta and twitter *Use twitter card validator*

> ```html
>         <meta property="og:site_name" content="This is site name">
>         <meta property="og:url" content="theURL">
>         <meta property="og:title" content="This is title">
>         <meta property="og:image" content="theImage src or https">
>         <meta property="og:description" content="This describes us">
> ```

> - Make sure your title accurately describes why someone might click on your site        
> - Use schema.org to add meta attributes to all different html elements
> - Get your page to load fast
> - Use outbound links to other good sites that are related to your content

# Making a dynamic sitemap with nextJS
**Credit:** [Leigh Halliday's video](https://www.youtube.com/watch?v=fOoH9Z5adrg)
1. Install next-sitemap
2. Add *"postbuild" : "next-sitemap"* to you build scripts
3. add next-sitemap.config.js file to root of project

```javascript

        const siteUrl = "https://wrestlingtournaments.com";

        module.exports = {
            siteUrl,
            generateRobotsTxt: true,
            robotsTxtOptions: {
                additionalSitemaps: [
                    `${siteUrl}/server-sitemap.xml`,
                ],
            },
        }
```

4. Add your sitmaps to git ignore *this is because they will be generated at build*

```
        public/robots.txt
        public/sitemap.xml
        public/sitemap-0.xml
```

5. If you need to generate dynamic Pages make a folder called server-sitemap.xml in it index.js or index.jsx file

```javascript
        
        export default function SiteMap() {
        }

        import { getServerSideSitemap } from "next-sitemap";
        import { API_URL } from '@/config/index'
        //  http://localhost:3000/events/grappling-industries-connecticut
        export const getServerSideProps = async (ctx) => {
        
            const res = await fetch(`${API_URL}/api/events?sort=date&pagination[pageSize]=1000&populate=*`)
            const datas = await res.json();

            // destructure data into an array of objects
            const { data } = datas;



            const feilds = data.map(event => (
                {
                    loc: `https://www.wrestlingtournaments.com/events/${event.attributes.slug}`,
                    lastmod: new Date().toISOString(),
                }
            )
            );

            return getServerSideSitemap(ctx, feilds);


        }
```
*This generates your URL names*
