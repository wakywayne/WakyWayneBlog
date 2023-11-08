---
title: 'SQL'
date: 'September 22, 2022'
excerpt: 'SQL is the gold standard in databases should be every noobies first database'
cover_image: ''
category: 'Database'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

**Important**
_To call database of new user must write this as root in the new database_
**ALTER USER 'suggesteventuser' IDENTIFIED WITH mysql_native_password BY 'thisfakepassword'; flush privileges;**
**Important**

# SQL "CRUD"

# Create

> ## Create~ create tables or objects
>
> ```sql
> CREATE TABLE users(
>   id int not null auto_increment primary key,
>   location int null,
>   name varchar(50) not null,
>   age int null,
>   _created datetime default current_timestamp
> )
> ```
>
> ```sql
>   CREATE TABLE locations(
>    id int not null auto_increment primary key,
>   name varchar(50) not null,
>   _created datetime default current_timestamp
> )
> ```
>
> ## Alter~ change tables or object
>
> ```sql
> ALTER TABLE users
> ADD CONSTRAINT fk_locations
> FOREIGN KEY (locationid)
> REFERENCES locations(id)
> ```
>
> ## Insert~ create rows

# Read

> ## Select~ retrieve rows
>
> ```sql
> SELECT
> name,
> _created
> FROM users
> WHERE id = 1
> ```
>
> ## Like
>
> ```sql
> SELECT *
> FROM users
> WHERE name like '%att%'
> ```
>
> ## Join
>
> ```sql
> select
> u.name as name,
> l.name as location
> FROM users u
> JOIN locations l on u.locationid = l.id
> ```

# Update

> ## Update~ update rows
>
> ```sql
> UPDATE users
> SET name = 'Matt'
> WHERE id = 1
> ```

# Delete

> ## Delete~ delete rows
>
> ```sql
> DELETE
> FROM users
> WHERE name = 'Matt'
> ```
>
> ## Drop~ delete table/object

# Data Types

> ## int
>
> ### big int~ longer number
>
> ## decimal
>
> ## varchar~ string with max length
>
> ## text~ string no maximum
>
> ## datetime~ date and time
>
> ## bit~ boolean(1 or 0)

# Procedures

**Save a select statement to reuse in your code**

# Functions

**Return a variable ie string or number**

# Securing Databases

**How you allow others to work on your code**

# Node to MySQL

- createConnection({})
  - Defines the connection configuration: host, user, password, database
- connection()
  - Establish a connection to the my SQL server
- query(string, callback)
  - Execute query and receive the results through a callback
- end()
  - Terminates the connection with MySQL
