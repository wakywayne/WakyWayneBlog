---
title: 'How to turn your web app into a PWA'
date: 'September, 12, 2022'
excerpt: 'Companies like twitter understand the value of making there website a pwa learn more about this topic here'
cover_image: '/images/posts/img7.jpg'
category: 'Utilities'
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
2. Use pwa generator website for manifest.json and icon sizes [link here](https://www.simicart.com/manifest-generator.html/)
3. Next make your manifest.json file and paste in the code you got from previous site
```javascript
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
                    "src": "/icon-142x142.png",
                    "sizes": "142x142",
                    "type": "image/png"
                }, 
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
```javascript
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
```html
        <link rel='manifest' href='/manifest.json' />
        <meta name="theme-color" content="#f90c08" />
        <link rel='apple-touch-icon' href='/icon.png' />
```
6. Making a custom Clickable button
```javascript
        import React, { useState, useEffect } from 'react';


        const PwaInstallButton = () => {
            const [supportsPWA, setSupportsPWA] = useState(false);
            const [promptInstall, setPromptInstall] = useState(null);

            useEffect(() => {
                console.log('in use')// I see in the console
                const handler = e => {
                    console.log('in handler') // I do not see in the console
                    e.preventDefault();
                    setSupportsPWA(true);
                    setPromptInstall(e);
                };
                window.addEventListener("beforeinstallprompt", handler);
                return () => window.removeEventListener("transitionend", handler);
            }, []);

            const onClick = e => {
                e.preventDefault();
                if (promptInstall) {
                    promptInstall.prompt();
                } else {
                    return;
                };
            };

            return (
                promptInstall && (<button className='pwaButton' onClick={(e) => onClick(e)}>Install Our App</button>)
            )
        };

        export default PwaInstallButton;
```
7. Prompting the user to reload if there is an available update
```javascript
    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
            const wb = window.workbox


            // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
            // NOTE: MUST set skipWaiting to false in next.config.js pwa object
            // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
            const promptNewVersionAvailable = event => {
                // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
                // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
                // You may want to customize the UI prompt accordingly.
                if (confirm('A newer version of this web app is available, reload to update?')) {
                    wb.addEventListener('controlling', event => {
                        window.location.reload()
                    })

                    // Send a message to the waiting service worker, instructing it to activate.
                    wb.messageSkipWaiting()
                } else {
                    console.log(
                        'User rejected to reload the web app, keep using old version. New version will be automatically load when user open the app next time.'
                    )
                }
            }

            wb.addEventListener('waiting', promptNewVersionAvailable)

            // never forget to call register as auto register is turned off in next.config.js
            wb.register()
        }
    }, [])
```