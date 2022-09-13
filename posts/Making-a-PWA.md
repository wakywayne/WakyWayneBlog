---
title: 'How to use a tenancy model'
date: 'September, 12, 2022'
excerpt: 'Ever wonder how to group users based on a shared use case?'
cover_image: '/images/posts/img7.jpg'
category: 'Database'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# Why make your web app a PWA
1. It makes it so users can download your website locally on both mobile and pc
2. It allows you to unlock new features
    - You can add shortcuts to your app *just add a shortcut array to manifest.json*
    - You can get access to contacts so you can encourage people to easily share your app with friends
    - You can get access to device motion (*enable sensors panel in chrome dev tools*)
    - Geo location (*enable sensors panel in chrome dev tools*)
    - Bluetooth (*download BLE Peripheral Simulator app*)
    - Idle detection
    - Local filesystem
    - Hopefully you will be able to send **push notifications** soon
3. You are able to prompt your user to download the app with your own custom button

# How to start?
1. Install next-pwa package
2. Use pwa generator website for manifest.json and icon sizes
3. Next make your manifest.json file and paste in the code you got from previous site
    - ```javascript
        {
            "theme_color": "#f90c08",
            "id": "https://www.wrestlingtournaments.com/",
            "background_color": "#ffffff",
            "display": "standalone",
            "scope": "/",
            "start_url": "/",
            "name": "wrestlingtournaments.com",
            "short_name": "Wrestling Tournaments",
            "icons": [
                {
                    "src": "/icon-192x192.png",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "/icon-256x256.png",
                    "sizes": "256x256",
                    "type": "image/png"
                },
                {
                    "src": "/icon-384x384.png",
                    "sizes": "384x384",
                    "type": "image/png"
                },
                {
                    "src": "/icon-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png"
                }
            ]
        }
        ```
4. Then add to next.config.json
    - ```javascript
        const withPWA = require('next-pwa')({
          dest: 'public',
          register: true,
          skipWaiting: true,
          disable: process.env.NODE_ENV === 'development',
        })

        module.exports = withPWA({
          reactStrictMode: true,

            // You can put any other dependencies like image origins here
        });
        ```
5. Add the following to the Head in your *_document.js*
    - ```html
        <link rel='manifest' href='/manifest.json' />
        <meta name="theme-color" content="#f90c08" />
        <link rel='apple-touch-icon' href='/icon.png' />
        ```