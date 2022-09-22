---
title: 'MongoDB'
date: 'September 22, 2022'
excerpt: "MongoDB is an excellent noSQL database it's a must learn"
cover_image: ''
category: 'FrameWorks'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# MongoDB

## Set Up
1. create a cluster
2. add ip 
3. *Use Compass to veiw your data* Link Compass to your database
    - Under Overview click cinnect and then compass
    - Paste the link into compass replace test at the end with name of your database 
    - And put your password in *remove the carrots*
4. Then you also connect to your app
    - Go back to connect
    - Store link in env
    - Replace question mark at the end with your data base
    - Create Config folder for your database connection
    - ```javascript
        const mongoose = require('mongoose');

        const connectionString = String(process.env.MONGO_URI);

        const connectDB = async () => {
            try {
                await mongoose.connect(connectionString);
                //     {
                //     useNewUrlParser: true,
                //     useUnifiedTopology: true,
                //     useCreateIndex: true
                // }

                console.log('MongoDB Connected...');
            } catch (err) {
                console.error(err.message);
                process.exit(1);
            }
        }

        module.exports = connectDB;
        // import to server file will look like this: const connectDB= require(./config/db.js)
        // connectDB();
    ```

## Creating Models
*Each Model should be named singular and it's on file*
```javascript
// file name is models/Client.js
const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    }
}
);

module.exports = mongoose.model('Client', ClientSchema);
```

```javascript
// file name is models/Project.js
const mongoose = require('mongoose');


const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        // this says that the clientId should relate to the client model
    },
});

module.exports = mongoose.model('Project', ProjectSchema);
```

# Querying
- db.collection.findOne({
    "title": "blacksmith scene"
},
{
    "title": 1,
    "year" :2
}); *Match a single document*
- db.collection.find({
"year":2010
}); *find all instances that match* 

## Attach Queries
**can add .countDocuments() after the parenthesis to countDocuments**

## Advanced querying with aggregation Queries

- db.movies.aggregate([{
   "$match": {"tear":2010} 
},{
    "$project":{
        *missed stuff here*
    }
},])

### Operators
- $match
    - 
- $project
    - 
- $sort
    - 
- $limit
    - 
- $group
    - 
- $bucket
    - 

### Using variables as functions

## Advanced querying with aggregation Queries in Atlas/Compass

## Aggregation stages
- 
- 
- 
- 
- 
- 
- 

# Indexes
*indexes have to be queried in order*

## Searching through arrays

## WildCard Indexes


# Some Extra Resources
- checkout the blog posts
- mongodb university
- mongodb developer comunity forum

