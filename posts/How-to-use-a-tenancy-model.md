---
title: 'How to use a tenancy model'
date: 'September, 12, 2022'
excerpt: 'Ever wonder how to group users based on a shared use case?'
cover_image: '/images/posts/img7.jpg'
category: 'Database'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# Why use a tenancy Model?
> The reason why you would use a tenancy model is if you need to group users and only allow them to edit, view, or get updated based on a shared value like *team or *organization*. The way this works is every table or collection in your database that needs to be grouped will have a tenant value. This tenant value will be put on each user's token and you will then test for it before doing updates or showing data.
## Example
```javascript
router.get("/getUserMessages/:tenant", async (req, res) => {
  try {
    let tenant = req.params.tenant;
    let allPlansForUser = await lessonPlans.getUserMessages(tenant);
    res.json(allPlansForUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Then the get user messages function would look like this
const getUserMessages = async (tenant: string) => {
  return await Query(
    `
    SELECT * from messages where tenant = ?
    `,
    [tenant]
  );
};
```

