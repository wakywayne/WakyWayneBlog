---
title: "How to turn your web app into a PWA"
date: "September, 12, 2022"
excerpt: "Companies like twitter understand the value of making there website a pwa learn more about this topic here"
cover_image: "/images/posts/img7.jpg"
category: "Utilities"
author: "WayneCarl"
author_image: "/images/wayneswildworldImages/waterfall.jpg"
---

# Why make your web app a PWA

1. It makes it so users can download your website locally on both mobile and pc
2. It allows you to unlock new features
   - You can add shortcuts to your app _just add a shortcut array to manifest.json_
   - You can get access to contacts so you can encourage people to easily share your app with friends
   - You can get access to device motion (_enable sensors panel in chrome dev tools_)
   - Geo location (_enable sensors panel in chrome dev tools_)
   - Bluetooth (_download BLE Peripheral Simulator app_)
   - Idle detection
   - Local filesystem
   - Hopefully you will be able to send **push notifications** soon
3. You are able to prompt your user to download the app with your own custom button

# How to start?

## Method 1) Use next-pwa

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
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

module.exports = withPWA({
  reactStrictMode: true,

  // You can put any other dependencies like image origins here
});
```

5. Add the following to the Head in your _\_document.js_

```html
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#f90c08" />
<link rel="apple-touch-icon" href="/icon.png" />
```

6. Making a custom Clickable button

```javascript
import React, { useState, useEffect } from "react";

const PwaInstallButton = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    console.log("in use"); // I see in the console
    const handler = (e) => {
      console.log("in handler"); // I do not see in the console
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (e) => {
    e.preventDefault();
    if (promptInstall) {
      promptInstall.prompt();
    } else {
      return;
    }
  };

  return (
    promptInstall && (
      <button className="pwaButton" onClick={(e) => onClick(e)}>
        Install Our App
      </button>
    )
  );
};

export default PwaInstallButton;
```

7. Prompting the user to reload if there is an available update

```javascript
useEffect(() => {
  if (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    window.workbox !== undefined
  ) {
    const wb = window.workbox;

    // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
    // NOTE: MUST set skipWaiting to false in next.config.js pwa object
    // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
    const promptNewVersionAvailable = (event) => {
      // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
      // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
      // You may want to customize the UI prompt accordingly.
      if (
        confirm(
          "A newer version of this web app is available, reload to update?"
        )
      ) {
        wb.addEventListener("controlling", (event) => {
          window.location.reload();
        });

        // Send a message to the waiting service worker, instructing it to activate.
        wb.messageSkipWaiting();
      } else {
        console.log(
          "User rejected to reload the web app, keep using old version. New version will be automatically load when user open the app next time."
        );
      }
    };

    wb.addEventListener("waiting", promptNewVersionAvailable);

    // never forget to call register as auto register is turned off in next.config.js
    wb.register();
  }
}, []);
```

## Method 2) From Scratch

### Manifest.json in public root

```json
{
  "theme_color": "#f69435",
  "background_color": "#f4ede8",
  "display": "standalone",
  "scope": "/",
  "start_url": "/index.html",
  "description": "The number one solution for bracketed events",
  "name": "Rapid Brackets All-in-one Tournament Solution ",
  "short_name": "Rapid Brackets",
  "orientation": "portrait-primary",
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
    },
    {
      "src": "/maskable_icon.png",
      "sizes": "196x196",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ]
}
```

### sw.js file also in public root

```javascript
const staticCacheName = "rapid-static-v2";
const dynamicCacheName = "rapid-dynamic-v2";
const assets = ["/offline.html"];

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener("install", (evt) => {
  //console.log("service worker installed");
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      //console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (evt) => {
  //console.log("service worker activated");
  evt.waitUntil(
    caches.keys().then((keys) => {
      //console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && key !== dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch events
self.addEventListener("fetch", (evt) => {
  if (evt.request.url.indexOf("8080") === -1) {
    evt.respondWith(
      caches
        .match(evt.request)
        .then((cacheRes) => {
          //console.log("cacheRes", cacheRes);
          return (
            cacheRes || fetch(evt.request).then((res) => res) /*||
            fetch(evt.request).then((fetchRes) => {
              return caches.open(dynamicCacheName).then((cache) => {
                cache.put(evt.request.url, fetchRes.clone());
                // check cached items size
                limitCacheSize(dynamicCacheName, 15);
                return fetchRes;
              });
            })*/
          );
        })
        .catch(() => {
          console.log("offline", evt.request.url);
          if (
            evt.request.url.indexOf("5173") > -1 &&
            evt.request.url.indexOf("4173") === -1
          ) {
            return caches.match("/offline.html");
          }
        })
    );
  }
});

// push notification events
self.addEventListener("push", (event) => {
  console.log("hit sw push event");
  const notificationData = event.data.json();
  const options = {
    body: notificationData.message,
    icon: "./icon-192x192.png",
    actions: [
      { action: "action1", title: "Action 1" },
      { action: "action2", title: "Action 2" },
    ],
  };

  event
    .waitUntil(
      self.registration.showNotification(notificationData.title, options)
    )
    .then(() => {
      alert("Notification shown");
    });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  // Define the behavior when a user clicks on the notification
  if (event.action === "action1") {
    alert("Action 1 clicked");
  } else if (event.action === "action2") {
    alert("Action 2 clicked");
  } else {
    // Handle notification click
    alert("Notification clicked");
  }
});
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link
      rel="icon"
      type="image/svg+xml"
      href="https://i.ibb.co/H4Rh4SC/Rapid-Brackets-Logo-Transparent.png"
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="manifest" href="/manifest.json" />
    <!-- ios support -->
    <link rel="apple-touch-icon" href="/icon-192x192.png" />
    <meta name="apple-mobile-web-app-status-bar" content="#f4ede8" />
    <meta name="theme-color" content="#f69435" />
    <title>WrestlingTournaments.com</title>
  </head>

  <body>
    <div id="root"></div>
    <script>
      const PVK =
        "BNca5DwctSv0GDmFUNvykpL6th8GzHnxJzz7GO4ByR6R4Z6xjl_A3AMoz4-qkT6lvefVkPwmCYI21w_avaXRLSk";
      // Register service worker to control making site work offline
      if ("serviceWorker" in navigator) {
        window.addEventListener("load", async () => {
          navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => {
              // Register push on service serviceWorker
              return registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(PVK),
              });
            })
            .then((subscription) => {
              //console.log("success on sub", subscription);
              // fetch(
              //"https://rapid-brackets-v5-server-production.up.railway.app/api/notifications/send",
              // "https://rapid-brackets-v5-client-production.up.railway.app/api/notifications/send",
              //  "http://localhost:8080/api/notifications/send",
              // {
              //  method: "POST",
              // headers: {
              //  "Content-Type": "application/json",
              // },
              // body: JSON.stringify(subscription),
              // }
              //  )
              //   .catch((err) => alert("err on fetch for notification", err))
              //   .then((res) => console.log("success on noti fetch", res));
            })
            .catch((registrationError) => {
              console.log("SW registration failed: ", registrationError);
            });
          // Check if push messaging is supported
          //Notification.requestPermission().then((permission) => {
          //console.log(permission);
          //if (permission === "denied") {
          //alert(
          //"You have disabled push notifications. Please see the head table for assistance."
          //);
          //}
          //});
        });
      }

      // Convert the base64-encoded string to an ArrayBuffer Uint8Array
      function urlBase64ToUint8Array(base64String) {
        const padding = "=".repeat((4 - (base64String.Length % 4)) % 4);

        const base64 = (base64String + padding)
          .replace(/\-/g, "+")
          .replace(/_/g, "/");

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
      }
    </script>
    <script type="module" src="/src/index.tsx"></script>
  </body>
</html>
```
