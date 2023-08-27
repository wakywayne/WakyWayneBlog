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

<a href="https://www.youtube.com/watch?v=-eRsWqwcPuk&t=559s" target="_blank">Here is a useful video from dcode on the topic</a>

## Useful Tips

> When you are dealing with calculations with dates you should convert dates to unix standard time and do all your calculations. The last thing you should do with your dates is convert them back to date time format. _Examples Below_

### Examples of getting yesterdays date in utc format

```javascript
let today = new Date();
let yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);
console.log(yesterday);
// on 9/12/2022 This logs: Sun Sep 11 2022 12:47:15 GMT -0400 (Eastern Daylight Time)
let yesterdayUnix = Math.floor(yesterday.getTime() / 1000);
console.log(yesterdayUnix);
// This logs 1662914235
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
