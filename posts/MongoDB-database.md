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
3. *Use Compass to view your data* Link Compass to your database
    - Under Overview click connect and then compass
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
- Text can be as long as you want - the limit is the 16mb restriction for the overall document

- text
- boolean
- numbers
  - *These will be different for every programming language that you use*
  - **If you are incrementing a certain type you must make sure the number you are incrementing by is wrapped in that same type**
  - NumberInt("29") *Integer 32bits can hold a maximum value of +-2,147,483,647*
  - NumberLong("74837") *Integer 64 bits can hold +-9,223,372,036,854*
  - Doubles *Javascript default Long decimal with rounding (64bit)*
  - NumberDecimal("0.3") *Long decimal without rounding up to 34 decimal digits (128bit)*
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
**You can test query time by db.collection.find().explain("executionStats")**
- db.collection.findOne({
    "title": "blacksmith scene"
}
- db.collection.find({
"year":2010
}); *find all instances that match* 
**This actually just returns a cursor**
- find().toArray() *This will actually return all of them*

## Nested querying
db.collection.find({**"**feildOne.nestedFeild **"** : 12})
### Arrays
- db.collection.find({keyWithArrayAsValue: "ContainsValue"})
- db.collection.find({keyWithArrayAsValue: ["ContainsValue"]})
- *The second one will return only exact equality. If an array has additional values besides "ContainsValue" it will not be returned*
  - find({genre: {__$all__: ["action", "thriller"]}}) *This ignores the order of the array, but requires both items to be in it*
- You can query arrays of nested documents as if they are a map db.collection.find({"arrayOfDocs.aKeyOnThedoc": "this will test if the key on the doc equals this"})
- $size *Matches size of array*
- $elemMatch: {} **Acts as and on it's own** 
  - *This makes sure that when mapping through nested objects the condition you are testing for must be object specific* **If you do not use elemMatch your conditions can mix and match between documents in the array**


## Operators
### Query Operators
**Help Locate Data**
- $gt: 1000 *greater than 1000*
- $lte: *less than or equal to*
- $ne *not equal*
- $in & $nin
  - {$in: [30, 42]} *This will pull up if any of the values in the array __nin__ does the opposite*
  
---
**Logical Operators**
- {$or:[ {"feildOne.nestedFeild": {$lt:5} }, {"feildOne.nestedFeild": {$gt:5} } ]}
- $nor *Opposite of or*
- $and *Similar to or*
  - *Short hand syntax:* db.collection.find({"rating.average": {$gte: 9}, genres: "Drama"}) 
  - *Note you should not use the shorthand if you are testing multiple values for the same key __find({"genre": {$gte: 9}, genres: "Drama"})__*
- $not 

---
**Element Operators**
- $exists: true *determines if the field exists*
- $type *Make sure the value is in quotes*
  - Can accept an array of types 
- $regex: {/musical/} *Will find all felids where this text exists
- $expr: {$gt: ["$volume", "$target"]} *This will find all the docs where volume is greater than target*
- $cond: {if: {something}, then:{somethindElse}, else: "$field"}
  - **Example**
```javascript
db.sales.find({$expr:{$gt: [{$cond: {if:{$gte: ["$volume", 190]}, then: {$subtract: ["$volume", 30]}, else: "$volume"}}, "$target"]}}).pretty()
```


## Cursor
**db.collection.find().next()**
> The cursor returns a pointer to the collections you have to control the cursor so you can view documents

### Attach Queries
**can add .countDocuments() after the parenthesis to countDocuments**

- Sort
db.movies.find().sort({"rating.average": 1, runtime: -1}).pretty()
**This code will first sort by the average in ascending order and next by the runTime in descending order**

- Skip
**skip a certain number of entries**

- Limit 
**Limits the number of entries**

## Projection
- db.collection.find({}, {feildIwantReturned: 1, anotherField: 1, _id: 0})
- db.collection.find({genres: "Drama}, {genres: {$elemMatch:{$eq:"Horror"}}})
  - This will return only items that have the genre of drama, but it will only return the Horror field, so if they only had Drama it won't even return the drama field for that item.
- $slice operator 
  - db.collection.find({}, {feildIwantReturned: {$slice: 2}}) *This returns only the first two results alternatively you can make an array and then the first parameter is a skip and the second is the number of results*
- 

# Advanced querying with aggregation Queries
**Every stage receives the output of the previous stage REMEMBER THIS! YOU CAN'T ACCESS VARIABLES YOU HAVEN'T PASSED DOWN**
*Look up all potential stages on the mongoDB Aggregation Pipeline Stages docs*

## $match
```javascript
db.people.aggregate([
  {$match: {gender:'female'}}
])
```
*Returns all females*

---

## $sort
```javascript
db.people.aggregate([
  {$match: {gender:'female'}},
  {$group:{_id: {state:"$location.state"}, totalPersons:{$sum: 1}}},
  {$sort: {totalPersons: -1}}
])
```
---

## $group
**You must keep in mind that you are performing operations they are being performed on each group created by the first field group**
*You must pass an id as a document that will describe what feild will be grouped*
*totalPersons is a field that we made that will give us the the number of documents that we merged*
```javascript
db.people.aggregate([
  {$match: {gender:'female'}},
  {$group:{_id: {state:"$location.state"}, totalPersons:{$sum: 1}, theAvgAge:{$avg:"dob.age"}}}
])
```

```javascript
{ _id: { state: 'alaska' }, totalPersons: 4 }
{ _id: { state: 'rio grande do norte' }, totalPersons: 8 }
```
---

## $project
**Performs the operations on each specific document**
```javascript
db.people.aggregate([
{$project:{_id:0, name:1, gender:1, email:1,dob:1, location:{type:"Point", coordinates:[
    {$convert:{input:"$location.coordinates.longitude", to:"double", onError:0.0, onNull:0.0}},
    {$convert:{input:"$location.coordinates.latitude", to:"double", onError:0.0, onNull:0.0}}
]}}},
{$project: { gender: 1,email:1, location:1, dob:1,  fullName: {$concat: [
  {$toUpper: {$substrCP: ['$name.first', 0, 1]}},
  {$substrCP: ['$name.first', 1, {$subtract: [{$strLenCP:"$name.first"}, 1]}]}, 
   " ", 
  {$toUpper: {$substrCP: ['$name.last', 0, 1]}},
  {$substrCP: ['$name.last', 1, {$subtract: [{$strLenCP:"$name.last"}, 1]}]}
]
}}},
{$project:{ gender: 1, email:1, location:1, fullName:1,  age: "$dob.age", birthdate: {$convert: {input: "$dob.date", to: "date", onError: "Error During Aggregation", onNull: "No Birthdate"}}}}
])
```

```javascript
{ gender: 'female',
  location: { type: 'Point', coordinates: [ 78.0207, -84.1572 ] },
  email: 'anne.ruiz@example.com',
  fullName: 'Anne Ruiz',
  birthdate: 1982-10-09T12:10:42.000Z }
```
---

## Distinction between group and project
> When grouping you are taking multiple documents and turning them into one (sum, count, average, build an array). When you are making a projection you are altering each document individually (Include, Exclude, and  Transform fields). If you want to know something about an overall collection you will probably use $group. If on the other hand you want to know something about a specific document you will probably use $project

## $skip
**skip must come before limit**
*{$skip: 10}*

## $limit
*{$limit: 10}*

## Aggregation Operators
- $sum
- $avg
- $convert *$convert: {input: "$dob.date", to: "date", onError: "Error During Aggregation", onNull: "No Birthdate"}*
  - Short hand conversions
    - $toDate: '$date'
    - 
- $concat
- $toUpper
- $substrCP
- $strLenCP
- $first *takes the first value*
- $max & $min

- ## Merging references
```javascript
db.customers.aggregate([
{$lookup:{
        from:"books",
   //     *The other collection*
        localField:"favBooks",
   //     *In the current collection \customers in this case\ where can the other references by found*
        foreignField:"_id",
   //     *In the other collection what is the __localField__ supposed to equal*
        as: "favBookData"
    }}
])
```

## Aggregation and Arrays
### Combining array values
```javascript
db.friends.aggregate([
  {$group: {_id:{age: "$age"}, allHobbiesNameIMadeUp: {$push:"$hobbies"}}}
])
```
- The problem with the above code is that if hobbies is an array 'Which it is in this case'. The allHobbiesNameIMadeUp feild will be an ugly array of arrays, which we don't want

**Solution: $unwind aggregation stage**
*The below code will map through each item in the array and make a new document with one value for hobbies*
```javascript
db.friends.aggregate([
  {$unwind: "$hobbies"}
])
```

```javascript
db.friends.aggregate([
  {$unwind: "$hobbies"}, 
  {$group: {_id:{age: "$age"}, allHobbiesNameIMadeUp: {$push:"$hobbies"}, sum: {$sum: 1}}}
])
```

#### The Above Returns:
```javascript
{ _id: { age: 29 },
  allHobbiesNameIMadeUp: [ 'Sports', 'Cooking', 'Cooking', 'Skiing' ],
  sum: 4 }
{ _id: { age: 30 },
  allHobbiesNameIMadeUp: [ 'Eating', 'Data Analytics' ],
  sum: 2 }
```

### Eliminating duplicate values
*$addToSet*
```javascript
db.friends.aggregate([
  {$unwind: "$hobbies"}, 
  {$group: {_id:{age: "$age"}, allHobbiesNameIMadeUp: {$addToSet:"$hobbies"}, sum: {$sum: 1}}}
])
```

### Array Projections
- **$slice: [anArray, howManyElementsYouWant]**
- **$slice: [anArray, startingPosition, numberOfElementsYouWantAfterTheStartingPosition]**
```javascript
db.friends.aggregate([
{$project: {_id:0, examScore: {$slice: ["$examScores", -1]}}}
])
```

- **$filter**
```javascript
db.friends.aggregate([
{$project: {_id:0, score: {$filter:{input: "$examScores", as: "sc", cond: {$gt: ["$$sc.score", 60]}}}}}
])
```

- *Example*: **Getting the highest score for each user only**
```javascript
db.friends.aggregate([
  {$unwind: "$examScores"}, 
  {$project: {_id:1, name:1, age:1, score:"$examScores.score"}}, 
  {$sort: {score: -1}}, 
  {$group: {_id: "$_id", name: {$first: "$name"}, maxScore: {$max: "$score"}}}, 
  {$sort: {maxScore: -1}}
])
```

## $geoNear
**Must be the first stage in the pipeline if you want to use it**
```javascript
db.friends.aggregate([
{$geoNear:{
  near:{
    type: 'Point',
    coordinates: [-18.4, -42.8]
  },
  maxDistance: 100000,
  num: 10,
  // limit number of results
  query: {gender: 'female'},
  // basically a match step
  distanceField:"distance"
  // name of field that will hold the distance from the point
}}
])
```

## $bucket 
```javascript
db.people.aggregate([
  {
    $bucket:{
      groupBy: '$dob.age',
      boundaries:[0,18,30,50,80,120],
      output:{
        numPerson:{$sum:1},
        averageAge: {$avg:"$dob.age"}
      }
    }
  }
])
```

```javascript
{ _id: 18, numPerson: 868, averageAge: 25.101382488479263 }
{ _id: 30, numPerson: 1828, averageAge: 39.4917943107221 }
{ _id: 50, numPerson: 2304, averageAge: 61.46440972222222 }
```

### $bucketAuto
```javascript
db.people.aggregate([
  {$bucketAuto:{
      groupBy: '$dob.age',
      buckets: 5,
      output:{
        numPerson:{$sum:1},
        averageAge: {$avg:"$dob.age"}
      }
  }}
])
```

# Taking your pipeline result into a new collection:

```javascript
db.friends.aggregate([
  {$unwind: "$examScores"}, 
  {$project: {_id:1, name:1, age:1, score:"$examScores.score"}}, 
  {$sort: {score: -1}}, 
  {$group: {_id: "$_id", name: {$first: "$name"}, maxScore: {$max: "$score"}}}, 
  {$sort: {maxScore: -1}},
  // This is the line where the magic happens
  {$out: "transformedPersons"}
])
```


# Indexes
*MongoDB creates an _id index for every collection by default_. An index is basically taking one field from every document and separating it from the original document so it can be queried faster*
- **DURING THE CREATION OF THE INDEX THE COLLECTION WILL BE LOCKED see _background_ below to avoid this issue**
- **Keep in mind don't over due this, it speeds finds, but slows down puts because you need to update the index whenever you make a new item**
- **Also if your query will return most of the documents it will also likely be faster to not use an index because you will skip that step**
- **Queries on true or false/ one or the other fields alone also probably won't speed up your queries _See compound indexes below to see when it might make sense_**
- **Multikey indexes:** 
  - An index on array stores each value in the array as it's own index entry
  - Because of this you can not do Compound indexes that contain two arrays
  - If the index is an array that holds objects it will only use the index on top level object queries

## How mongoDB determines the winning index
- ### When a query is ran it determines the fastest way to execute and then caches that as the winning query *It will "re-race" to find the winner when:*
  1. 1,000 documents have been added to the collection
  2. The index that was the winner is re-built
  3. Other Indexes are added or removed
  4. MongoDB server is restarted

---

## Index and compound indexes
- db.collection.createIndex({"dob.age": 1}) *The number determines ascending or descending order*
- **What does an index look like?** Something like this (for the "age" field *the numbers are the age*):
  - (29, "address in memory/ collection a1")
  - (30, "address in memory/ collection a2")
  - (33, "address in memory/ collection a3")
- The documents in the collection would be at the "addresses" a1, a2 and a3. The order does not have to match the order in the index (and most likely, it indeed won't).
- Compound index **order matters your compound index will only be used if you are at least searching for the first field _but also not that the order in find query doesn't matter because mongoDB can switch it around if it will allow it to use an index_**
  - db.collection.createIndex({"dob.age": 1, gender: 1})

## Covered Query State
*This is when you can fullfil a query using just the index this is incredibly fast and should be considered whenever possible*
- db.customers.find({name: "Max"}, {_id:0, name: 1})

## Sorting using indexes
**With large data sets you might need to use and index just to be able to sort** *The below assumes we have created the index above*
- db.collection.find({"dob.age":37}).sort({gender:1})

## Using indexes to make unique fields
- db.collection.createIndex({"dob.age": 1}, {unique: true}) 
- **db.collection.createIndex({"dob.age": 1}, {unique: true, partialFilterExpression: {$exists: true}})**
  - MongoDB counts empty as a value, so if you have two docs with an empty age field it will throw an error. By adding the $exists: true we ignore non existent values


## Partial indexes
*An example of a time that you might want to use a partial index is a retirement software, where you only query for people who are male*
- db.collection.createIndex({"dob.age":1}, {partialFilterExpression: {gender: "male"}})
- **If your find query doesn't specify only male it won't use the index scan**

## TTL indexes
**Deletes documents after a certain amount of time from a key with a date field(new Date()), won't delete past documents UNTIL a new doc is created, as this triggers the search**
- db.collection.createIndex({createdAt:1}, {expireAfterSeconds: 10}) 

## Text Indexes
**To drop a text index you need to drop it by it's name**
- db.collection.createIndex({description: "text"}) 
- db.collection.createIndex( { "$**": "text" } ) _this will add every field that has string data_
- Adding more then word is an or statement **db.collection.find({$text: {$search:"some text"}})** *this searches for the word some or text*
  - **To search for a phrase:**  db.collection.find({$text: {$search:"\"some text\""}})
- to use this index: *db.products.find({$text:{$search: "awesome"}})*
  1. You don't need to specify the fields because you can only have one text index per collection
  2. Searches are case sensitive by default. *To change this: db.collection.find({$text: {$search:"Word", $caseSensitive: true}})*
- **Sorting Text indexes** *MongoDB has meta data on text index searches such as __"textScore"__*
  - db.collection.find({$text: {$search:"some text"}}, {score: {$meta:"textScore}}).sort({score:{$meta:"textScore"}})
  - We added a score feild to the results I don't think we needed to do this **Apparently we did**
- Making multiple felids into one text index
  - db.collection.createIndex({description: "text", title: "text"}) 
  - Changing the weight of these merged fields: *db.collection.createIndex({description: "text", title: "text"}, {weights: {title: 10, description: 1}})* 
- Excluding words
  - db.collection.find({$text: {$search: "awesome -t-shirt"}}) *This will only return documents that contain awesome and don't have the word t-shirt*
- Setting Default Language
  - db.collection.createIndex({description: "text", title: "text"}, {default_language: "german"}) *This changes the kinds of words that are omitted like is becomes ist for german* 

## background
  - db.collection.createIndex({description: "text", title: "text"}, {background: true})

## Search index
*Different from a text index*
**When you are using search you definitely want to use limit right after search if you are planning on limiting your results**
**We have meta data that is useful when we implement the search feature**
```javascript
{
      $search:{
        text:{
          query: "the text that was typed in",
          path:{
            'wildcard': '*'
            // this searches for all fields alternatively you can:
            // path: "title"
          },
          fuzzy:{}, // this makes is equivalent to fuzzy: {maxEdits: 2}
          // Which determines the degree that it will alow mistakes not the actual number
        },
      },
      highlight: {path: 'fullplot'}
      // I believe plot is just the field that it should highlight
      }
```

**Note you can now access $meta in the projection phase**

```javascript
'score': {$meta: 'searchScore'},
highlights: {$meta: 'searchHighlights'}
 // This will return an array of objects where if the type is hit you should highlight 
```


# Geospatial Data
**Must have location sub doc, with {type: "Point", coordinates: [longitude, latitude]} _You can look up correct GeoJSON format_**
- db.places.find({location:{**$near**:{$geometry: {type:"Point", coordinates:[long, lat]}, $maxDistance:40, $minDistance: 5}}}) *Max and Min are in meters*
  - To use the near query you need a GeoSpacial index
- *GeoSpacial Index*: db.places.createIndex({location: "2dsphere"})
- Finding places in a grid
  - db.places.find({location:{**$geoWithin**:{$geometry:{type:"Polygon", coordinates: [[ p1,p2,p3,p4,p1 ]]}}}})
  - each p is a [long, lat] array
-  Finding if a point intersects a polygon (*you would run the query in a collection of polygons where we pass in the point value*)
  - db.areas.find({area:{**$geoIntersects**:{$geometry:{type: "Point", coordinates:[-122.49089, 37.76992]}}}})
  - The inverse query looks like this: *db.places.find({location:{$geoIntersects:{$geometry:{type: "Polygon", coordinates:[[ p1,p2,p3,p4,p1 ]]}}}})*
- Another way to search for a radius around the user
  - db.places.find({location:{$geoWithin:{$centerSphere: [[ -122.46203, 37.77286], 1/6378.1]}}})
  - *The default unit is radians by dividing we converted to kilometers, to convert to miles use 3,963.2*



# Writing data
- db.collectionName.insertOneF({"myStuff": "heres the stuff", "otherStuff": "here it si"})
- inertMany([{},{},{},{},{},],{ordered: false}) *This makes it so that if there is an error adding one item it will continue through the array and add any items that don't have an error*
## The Write concern
*{w:1, j: undefined}* The w represents the number of instances we want to write to, j represents the journal which is just a list of queries incase the server goes down it can pick up were it left off.
*{w:1, wtimeout: 200, j:true} *If it takes 2secs to write it will timeout and now it will write to the journal b4 it wasn't*
**If you set w to 0 the server will not wait for a response so it will be inserted really fast, but you won't get id's back and you won't know if your data got through**

# Updating data
*Must use a $ denoted operator like $set*
- update(filter, {thisWillOverWriteEverything: "*this will be the only thing left in the document don't worry the others don't do this*" })
    - **Better to not use this one**
- updateOne(filter, {$set:{var: "the var"}}, options)
- updateMany(filter, {$set:{var: "the var"}}, options)
- replaceOne(filter, {$set:{var: "the var"}}, options)

## Operators
- $set
- **$inc** *Increasing Numbers*
  - updateOne({name: "Manuel"}, {$inc: {age: 1}}) *This will increase his age by one*
- $min, $max, $mul
  - *min only changes if the new value you are trying to set is larger than the existing value vise versa for max*
  - $ mul is multiply
- $unset *get rid of the feild*
  - .updateOne({}, {$unset: {theFieldName:""}})
- $rename: {age: "newAgeField"}
- upsert *This makes it so that if a documents filter dosen't exists it will add the document with the filter and the parameters you searched for 
  - updateOne(filter, {$set:{var: "the var"}}, {upsert: true}) 

## Updating nested arrays
- db.users.updateMany({hobbies: {$elemMatch: {title: "Sports", frequency: {$gte:3}}}}, {$set:{"hobbies.$.newField": }})
  - *The $ makes it so that it updates fields that match the query only. It basically represents the element that matches the array query*
- *To update every item in an array you can use $[]* 
- **To test elements in the array use $[el]** *You can name el anything you want* 
  - updateMany({"hobbies.frequency": {$gt:2}}, {$set: {"hobbies.$[el].goodFrequency":true}}, {arrayFilters:["el.frequency":{$gt:2}}]})
- $push *Added a new element to an array*
- $pull *removes element from an array*
- $pop *removes the last item*
- $addToSet **adds unique values only**


# Deleting data
- deleteOne(filter, options)
- deleteMany(filter, options) 
- deleteMany({})
- db.collection.drop()
- db.dropDatabase()

# Working with numbers


# Administration/ Auth
1. ## Authentication and Authorization
### Common Roles
- Admin
  - Manage database config, create, users, etc
  - Does not need to insert or fetch data
- Developer/ or the App
  - CRUD
  - Does not need to create users
- Data Scientist
  - Needs to fetch data only
### Built in Roles
*Database User*
- read
- readWrite
*Database Admin*
- dbAdmin
- userAdmin
- dbOwner
*All Database Roles*
- readAnyDatabase
- readWriteAntDatabase
- userAdminAnyDatabase
- dbAdminAnyDatabase
*Cluster Admin*
- clusterManager
- clusterMonitor
- hostManager
- clusterAdmin
*Backup/ Restore*
- backup
- restore
*Super User*
- dbOwner (admin)
- userAdmin(admin)
- userAdminAnyDatabase
- root



2. ## Transport Encryption
**SSL transport encryption**
3. Encryption at REST
**mongoDB enterprise has an option for this**
hashing a password is different you have to do that like you have done in the past
4. Auditing
5. Server & Network security
6. Backups 

# Performance
## What influences performance?
- Queries, indexes, database structure, capping, sharding, and 

## Capped Collections
**Capped collections always return in inserted order by default**
*db.createCollection("myDB", {capped: trie, size: 10000, max:3})*
- size is in bytes
- max means max # of documents
**when you add a 4th document it will delete the oldest one**

## Replica Sets
*A node is basically an instance of your mongoDB server by default you have one*
> replica sets allow you to automatically make copies of your database whenever queries are done in case your main node fails for some reason you can switch to a secondary node you can also use the replica set to improve read performance

## Sharding
**Horizontal scaling different servers score different sets of data**
*To achieve this you use mongos router and a shard key on every document*

## Deployment
- under the atlas alert tab you can set up email alerts if something happens

## Transactions
**How you insure you delete things linked to a user or anything for that matter when you delete the user document**
```javascript
const variable = db.getMongo().startSession()

variable.startTransaction()

const usersC = variable.gerDatabase("blog").users

const postsC = variable.gerDatabase("blog").posts

usersC.deleteOne({_id: ObjectId("kldsjf847589437fjkdj")})
postsC.deleteMany({usersId: ObjectId("kldsjf847589437fjkdj")})
// these do not run until you run the following command

variable.commitTransaction()
```

# Drivers

# *Node*
## Initializing Connection
```javascript
const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri =
    "You will receive this string when you log into your atlas account and click connect db to app";

let _db;


const mongoConnect = (callback) => {
    if (_db) {
        return callback(null, _db);

    } else {

        const client = new MongoClient(uri);

        if (client) {
            _db = client
            // You cannot do this: _db = client.db('shop'); as this will make it so you don't use connection cooling which is a feature of the MongoDB driver.
            // Allowing for you to use multiple connection for one connections.
            return callback(null, _db);
        } else {
            return callback("error in connecting mongo", null);
        }
    }
}



const getDb = () => {

    if (!_db) {
        throw new Error('No database found');
    }

    return _db;
}


module.exports = {
    initDB: mongoConnect,
    getDb
}
```

## Making queries
**Important you can not use regular syntax in javascript**
```javascript
    // const result = await database.collection('products').updateOne({ _id: ObjectId(req.params.id) }, { $set: { updatedProduct } });
    // You cannot use $set with an object. You need to use $set with a key value pair. Javascript uses short hand object syntax here
    // So basically it looks like this: { $set: updatedProduct: { updatedProduct: {
    //     name: any;
    //     description: any;
    //     price: Decimal128;
    //     image: any;
    // } }}
    const result = await database.collection('products').updateOne({ _id: ObjectId(req.params.id) }, { $set: updatedProduct });
```
### Interesting Result Options
```javascript
    const result = await database.collection('yourCollectionName').insertOne(item);
    console.log(`item added: ${result.insertedId}`);
    // result.matchedCount;
    // result.modifiedCount;
```

---

```javascript
const db = require('../db');
// import Decimal128 from 'mongodb';
const { Decimal128 } = require('mongodb');


router.get('/', async (req, res, next) => {
  try {
    const database = db.getDb().db('shop');
    const products = [];

    await database.collection('yourCollectionName').find().forEach((item) => {

      item.price = item.price.toString();
      products.push(item);
    }).then((result) => {

      res.status(200).json(products);
    });

  } catch (e) {
    console.error(e);
  } 
  // finally {
    // Apparently we don't need this when we use the single connection trick that we set up in "Initializing Connection"
    // Ensures that the database will close when you finish/error
    // await database.close();
  // }
});
```

## Pagination
```javascript
 const queryPage = +req.query.page
  const pageSize = 2;


  try {
    const database = db.getDb().db('store');
    const products = [];

    await database.collection('products').find().skip((queryPage - 1) * pageSize).limit(pageSize).forEach((item) => {

      item.price = item.price.toString();
      products.push(item);
    }).then((result) => {

      res.status(200).json(products);
    });

  } catch (e) {
    console.error(e);
  }
```

## Authentication
- Make sure you hash and salt variables for passwords 
- Use status 401 conditionals on the front end to properly handle login errors

## Realm 
*used to be called Stitch*
**Serverless Platform for Building Applications**
- Set up realm linked to your database
- Then set up rules for your collections
- Then set up your authentication
- Then you add your collections *I am not sure if you need to do this*
- Then Make your functions
```javascript
exports = function(arg){

    let collection = context.services.get("mongodb-atlas").db("store").collection("products");

  return collection.findOne({_id: BSON.ObjectId(arg)});
};
```
- yarn add realm-web *import * as Realm from realm-web*
- In your app useEffect
- **Keep in mind requests might return ObjectType or int128 types that javascript does not know how to handle**
```javascript
  useEffect(async () => {
    // add your Realm App Id to the .env.local file
    const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
    const app = new Realm.App({ id: REALM_APP_ID });
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn(credentials);
      const allProducts = await user.functions.getAllProducts();
      // You make this function on the serer side ^^^
      setProducts(allProducts);
    } catch (error) {
      console.error(error);
    }
  }, []);
```

### Search 
*Different from a text index search* You can set up a serverless function search
1. You make a search index via atlas
2. Make a new function that looks like this
```javascript
exports = function(arg){

    let collection = context.services.get("mongodb-atlas").db("store").collection("products");
    
    let pipeline=[
      {
      $search:{
        index:"searchProducts",
        text:{
          query: arg,
          path:{
            'wildcard': '*'
          },
          fuzzy:{}, // this makes it so it will count misspellings and etc
        },
      },
      },
      ];

  return collection.aggregate(pipeline);
};
```

### Email/Password auth with email confirmation
1. You must enable this setting in authorization **Make sure you set up the confirmation and reset url's _will explain later_**
2. Register User
```javascript
import { useState, useEffect } from 'react';
import * as Realm from 'realm-web';


export default function Register() {

    // make a register form for the user to register with monogodb realm email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
            const app = new Realm.App({ id: REALM_APP_ID });

            // const email = "coachwayne80@gmail.com";
            // const password = "Pa55w0rd";
            await app.emailPasswordAuth.registerUser({ email, password });
            console.log("Success!");
        } catch (err) {
            console.log(err)
            setError("Failed to register, please try again.");
        }
    };

   
    
    const logout = async () => {
        const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
        const app = new Realm.App({ id: REALM_APP_ID });
        await app.currentUser.logOut();
        console.log("Successfully logged out!");
    };




    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} style={{ backgroundColor: "pink", padding: "5px" }}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}
```
3. Email Confirmation
```javascript
import { useState, useEffect } from 'react';
import * as Realm from 'realm-web';
import { useRouter } from 'next/router';



export default function Confirm() {
    // make a function to accept the token and email from the url
    // and then call the confirm function from the emailPasswordAuth
    // and then redirect to the login page

    const router = useRouter();
    const { token, tokenId } = router.query;

    const [error, setError] = useState("");

    const confirm = async (token, tokenId) => {
        const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
        const app = new Realm.App({ id: REALM_APP_ID });
        try {
            await app.emailPasswordAuth.confirmUser({ token, tokenId });
            console.log("Successfully confirmed!");
            router.push("/login");
        } catch (err) {
            console.error("Failed to confirm user", err);
            setError("Failed to confirm user, please try again.");
        }
    };

    useEffect(() => {
        if (token && tokenId) {
            confirm(token, tokenId);
        }
    }, [token, tokenId]);



    if (!error) { return <div>Confirmed</div> }
    else { return <div>{error}</div> }

}
```
4. Login
```javascript
import { useState, useEffect } from 'react';
import * as Realm from 'realm-web';


export default function Login() {


    // make a register form for the user to register with monogodb realm email and password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function loginEmailPassword(email, password) {
        // Create an anonymous credential
        const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
        const credentials = Realm.Credentials.emailPassword(email, password);
        const app = new Realm.App({ id: REALM_APP_ID });
        try {
            // Authenticate the user
            const user = await app.logIn(credentials);
            // `App.currentUser` updates to match the logged in user
            console.assert(user.id === app.currentUser.id);
            return user;
        } catch (err) {
            console.error("Failed to log in", err);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await loginEmailPassword(email, password);
        console.log("Successfully logged in!", user);

        if (user) {
            alert("Success!");
        } else {
            setError("Failed to login, please try again.");
        }
    };


    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}
```
5. Making certain Functions only available to authenticated users



# Some Extra Resources
- checkout the blog posts
- mongodb university
- mongodb developer community forum