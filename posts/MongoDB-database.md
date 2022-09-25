---
title: 'MongoDB'
date: 'September 22, 2022'
excerpt: "MongoDB is an excellent noSQL database it's a must learn"
cover_image: ''
category: 'FrameWorks'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---


# What is MongoDB
> 
> ## What is a document
> - When you are working with a document in the mongoDB shell you are working in JSON
> - Draw back to JSON parsing string is very slow
> - BSON
>     - A binary version of storing JSON
>     - It adds types as well
> ## MongoDB scaling
> **Note mongoDB has two hard limits: 1. A single document can not exceed 16MB, 2. A document can not have over a hundred levels of document nesting**
> - Vertical Scaling
>     - refers to increasing the processing power of a single server or cluster. Both relational and non-relational databases can scale up, but eventually, there will be a limit in terms of maximum processing power and throughput. Additionally, there are increased costs with scaling up to high-performing hardware, as costs do not scale linearly.
> 
> - Horizontal scaling
>     - also known as scale-out, refers to bringing on additional nodes to share the load. This is difficult with relational databases due to the difficulty in spreading out related data across nodes. With non-relational databases, this is made simpler since collections are self-contained and not coupled relationally. This allows them to be distributed across nodes more simply, as queries do not have to “join” them together across nodes. *Scaling MongoDB horizontally is achieved through sharding (preferred) and replica sets.*
> 
> ### Sharding
> **While sharding happens automatically in MongoDB Atlas, it is still up to us to configure the shard key** 
> - *Ranged Sharding*. Documents are partitioned across shards according to the shard key value. Documents with shard key values close to one another are likely to be co-located on the same shard. This approach is well suited for applications that need to optimize range based queries, such as co-locating data for all customers in a specific region on a specific shard.
> 
> - *Hashed Sharding*. Documents are distributed according to an MD5 hash of the shard key value. This approach guarantees a uniform distribution of writes across shards, which is often optimal for ingesting streams of time-series and event data.
> 
> - *Zoned Sharding*. Provides the ability for developers to define specific rules governing data placement in a sharded cluster. (For example the country the entry came from)
----------------------------


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
```javascript
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

# Structuring your data
## Data Types
**Important data type limits are:**
- Normal integers (int32) can hold a maximum value of +-2,147,483,647
- Long integers (int64) can hold a maximum value of +-9,223,372,036,854,775,807
- Text can be as long as you want - the limit is the 16mb restriction for the overall document

- text
- boolean
- numbers
    - NumberInt() *Integer 32bits*
    - NumberLong() *64bits I think this is the default?*
    - NumberDecimal() *Long decimal without rounding*
- ObjectId()
- ISODate
- Timestamp

## Relations
**When thinking about your data you want to think about how you are going to use it and what collections are going to have the most branches coming of of it(References)**

### If there is a strong one to one relationship between two values it is best to use a nested document
> *The contingency here is how large this data will be, for example if you want to store the people that live in a city that will be millions of sub documents, although it is a strong one to one relationship it will still be better for you to make two separate collections and use a reference type*

### If you plan on using the two pieces of data independently often it's probably worth it to link them via reference types
> *This will make it easy to fetch the independent data that you want as well as get both sets of data in one fetch if you want.* 

### Many to many relationship
> *Keep in mind that you might want to have both a reference type and a nested document, for example if you have products and customers you might want to have a reference type on the customers for products, but you might want a snapshot of the price the customer paid for it. Meaning a nested document that references the product ID and has a price key*

> *An example of where you will definitely want to use a reference type going both ways is if you want to track projects mad at a school and students that participated. You can mix and match multiple students and projects. Whoever, if a student get's married and there name changes you will very likely want to have there name updated. If you use the nesting method you will have to change the data in both collections. The same is true for the project if the project grows and maybe has it's name changed you would have to change it in both collections. So this is a double reference type example.*

## Validation
*If you wanted to change a collection after it has been created then you would use db.runCommand with a callMod*
```javascript
db.createCollection('posts', {
  validator: {
    $jsonSchema: {
        // used to be other options now we just use this one
      bsonType: 'object',
    //   Everything that gets added to the posts collection should be a valid object this is kinda a duh... because a collection will alway have documents
      required: ['title', 'text', 'creator', 'comments'],
    //   these are the required key in the posts
      properties: {
        // Allows you to assign a type to the keys and describe them
        title: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        text: {
          bsonType: 'string',
          description: 'must be a string and is required'
        },
        creator: {
          bsonType: 'objectId',
          description: 'must be an objectid and is required'
        },
        comments: {
          bsonType: 'array',
          description: 'must be an array and is required',
          items: {
            // Describes the items in the array 
            bsonType: 'object',
            required: ['text', 'author'],
            // Describes the required keys of the objects in the array
            properties: {
              text: {
                bsonType: 'string',
                description: 'must be a string and is required'
              },
              author: {
                bsonType: 'objectId',
                description: 'must be an objectid and is required'
              }
            }
          }
        }
      }
    }
  }
});
```

# Querying data
- db.collection.findOne({
    "title": "blacksmith scene"
}
- db.collection.find({
"year":2010
}); *find all instances that match* 
**This actually just returns a cursor**
- find().toArray() *This will actually return all of them*

### Operators
- $gt: 1000 *greater than 1000*

## Attach Queries
**can add .countDocuments() after the parenthesis to countDocuments**

## Advanced querying with aggregation Queries

- ### Merging references
```javascript
db.customers.aggregate([
{$lookup:{
        from:"books",
        *The other collection*
        localField:"favBooks",
        *In the current collection where can the other references by found*
        foreignField:"_id",
        *In the other collection what is the __localField__ supposed to equal*
        as: "favBookData"
    }}
])
```

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


# Writing data
- db.collectionName.insertOneF({"myStuff": "heres the stuff", "otherStuff": "here it si"})
- inertMany([{},{},{},{},{},],{ordered: false}) *This makes it so that if there is an error adding one item it will continue through the array and add any items that don't have an error*

# Updating data
*Must use a $ denoted operator like $set*
- update(filter, {thisWillOverWriteEverything: "*this will be the only thing left in the document don't worry the others don't do this*" })
    - **Better to not use this one**
- updateOne(filter, {$set:{var: "the var"}}, options)
- updateMany(filter, {$set:{var: "the var"}}, options)
- replaceOne(filter, {$set:{var: "the var"}}, options)

# Deleting data
- deleteOne(filter, options)
- deleteMany(filter, options)

# Administration commands
- db.dropDatabase()
