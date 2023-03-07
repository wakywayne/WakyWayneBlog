---
title: 'Handling Database Disconnects'
date: 'September, 12, 2022'
excerpt: 'This code saved me when I was having trouble connecting my database with heroku'
cover_image: ''
category: 'Database'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# Here is code that I use to handle potential database disconnects
**I used this on heroku, but you could probably use it for other database hosting providers**

```javascript
import * as mysql from "mysql";
import config from "../config";

var connection;

function handleDisconnect() {
  connection = mysql.createConnection({
    host: config.mysql.host,
    port: Number(config.mysql.port),
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
  });

  connection.connect(function (err) {
    // The server is either down
    // or restarting (takes a while sometimes).
    if (err) {
      console.log("error when connecting to db:", err);
      setTimeout(handleDisconnect, 2000);
    }
  });
  // We introduce a delay before attempting to reconnect,
  // to avoid a hot loop, and to allow our node script to
  // process asynchronous requests in the meantime. 
  // If you're also serving http, display a 503 error.
  connection.on("error", function (err) {
    console.log("db error", err.code);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      // lost due to either server restart, or a
      // connection idle timeout 
      // (the wait_timeout server variable configures this)
      handleDisconnect();
    } else {

      throw err;
    }
  });
}

handleDisconnect();

export const Query = (query: string, values?: any) => {
  console.log("query connecting");
  return new Promise<Array<any>>((resolve, reject) => {
    connection.query(query, values, (err: any, results: any) => {
      if (err) console.log("ERRERERERERE In Queary code", err);
      return resolve(results);
    });
  });
};
```