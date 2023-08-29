---
title: "Dealing with dates in javascript"
date: "September 12, 2022"
excerpt: "What you need to know before dealing with dates in Javascript"
cover_image: ""
category: "UsefulTips"
author: "dcode"
author_image: ""
---

# Dealing With Dates

First, let's establish some general ground rules for date storage. When dealing with dates, it's crucial to store them in either a Unix timestamp, which represents the number of milliseconds since January 1, 1970, or a UTC timestamp. UTC, or Coordinated Universal Time, is a 24-hour time standard that is based on the current Gregorian year and is located at 0 degrees latitude, known as the Prime Meridian.

Now, you might be wondering why it's so important to store dates in this specific time format. Well, the reason is rooted in how JavaScript handles dates by default. When you create a date object using new Date(), it generates a date based on the user's current timezone. This means that the time for a user in the U.S. won't be the same as the time for a user in London, for example. To ensure consistency in your data, it's imperative to always convert times into UTC before storing them in your database, as UTC time remains the same everywhere in the world.

## Steps to get UTC timestamp

```javascript
// This gets the date in the users current timezone based on their local machine
let ndate = new Date();

// This gets the time as a Unix timestamp (milliseconds from 1/1/1970)
let udate = new Date().getTime();

// This will get us the UTC string timestamp
let isoDate = new Date().toISOString();
```

Now that we understand why it's essential to convert timestamps to UTC before storing them in our database for consistency, it's equally important to remember that most users are not familiar with UTC and don't expect to see times presented in that format. Therefore, we must ensure that we convert the stored UTC times back into the user's local timezone before displaying them. The good news is that JavaScript's default behavior for handling dates makes this process relatively straightforward.

```javascript
let UTCdateString = await fetch("/api/myDateStoredInUtc");

let dateBasedOnUsersCurrentTimezone = new Date(UTCdateString);
```

> Yep it's that easy the date is now in the users timezone

## For some more tips and tricks on working with dates in JavaScript I highly recommend watching the following YouTube video

<a href="https://www.youtube.com/watch?v=-eRsWqwcPuk&t=559s" target="_blank">Here is a useful video from dcode on the topic</a>

## Useful Code snippets from the video

> When you are dealing with calculations with dates you should convert dates to unix standard time and do all your calculations. The last thing you should do with your dates is convert them back to date time format. _Examples Below_

## IMPORTANT

**If you want to crate a date without any time**

```javascript
d = new Date("2022-08-02");
// This will give you Mon Aug 01 2022 20:00:00 GMT-0400 (Eastern Daylight Time)
// As you can see there is a time after the date which will cause a lot of issues and inconsistencies as the date will not act as you expect
```

**The solution to the above issue is..**

```javascript
let example2 = (d = new Date("2022-08-02 "));
// By adding a space to the end of date you will now get
// Tue Aug 02 2022 00:00:00 GMT-0400 (Eastern Daylight Time)
// Now the time is zero'd out and will act as expected
```

## Example of getting yesterdays date in utc format

```javascript
let today = new Date();
let yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
console.log(yesterday);
// on 9/12/2022 This logs: Sun Sep 11 2022 12:47:15 GMT -0400 (Eastern Daylight Time)
```

## Creating date objects

```javascript
// Current Date And Time
d = new Date();
// Number of millie seconds from unix Standard Time
d = new Date(1168753113425);
// Date time string *Not Recommended
d = new Date("2022-08-02T11:30:00+10:00");
// Pass in each part months are 0 based (So january is 0) last number is millie seconds
// If you don't provide one of the options it will default to the first value
d = new Date(2022, 7, 2, 11, 30, 27, 0);
```

## Getters

**When you use a getter it is in the devices local timezone _Keep this in mind_**

```javascript
d.toString();
d.getFullYear();
d.getMonth();
d.getUTCHours(4);
// This^ Changes the Format
d.toLocalString("en-US", {
  timeZone: "America/Los_Angeles",
});
// ^ The above code first sets the date order and then the timezone
```

For example some countries list the year first, _that's what the "en-US" determines_
