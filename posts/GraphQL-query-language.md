---
title: 'GraphQL'
date: 'September 22, 2022'
excerpt: 'GraphQL is an excellent way to make your database queries more efficient'
cover_image: ''
category: 'FrameWorks'
author: 'WayneCarl'
author_image: '/images/wayneswildworldImages/waterfall.jpg'
---

# Graph QL
## Setting up
### Installs
- "express-graphql": "^0.12.0",
- "graphql": "^15.8.0",
- "mongoose": "^6.4.0"

### Server

```javascript
app.use('/graphql', graphqlHTTP({
    schema: require('./schema/schema.js'),
    graphiql: process.env.NODE_ENV == 'development'
}));
```

### Schemas and Stuff

```javascript
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
} = require('graphql');

// Mongoose Models
const Project = require('../models/Project');
const Client = require('../models/Client');
```

## Types
**This is like the schema**

```javascript
// Project Type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Client.findById(parent.clientId);
            },
        },
    }),
});

// Client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
});
```

## Queries
**Important note Client and Project refer to our mongoose schemas**

```javascript
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find();
            },
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Project.findById(args.id);
            },
        },
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find();
            },
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Client.findById(args.id);
            },
        },
    },
});
```

## Mutations

```javascript
// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Add a client
        addClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });

                return client.save();
            },
        },
        // Delete a client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                Project.find({ clientId: args.id }).then((projects) => {
                    projects.forEach((project) => {
                        project.remove();
                    });
                });

                return Client.findByIdAndRemove(args.id);
            },
        },
        // Add a project
        addProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            new: { value: 'Not Started' },
                            progress: { value: 'In Progress' },
                            completed: { value: 'Completed' },
                        },
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId,
                });

                return project.save();
            },
        },
        // Delete a project
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args) {
                return Project.findByIdAndRemove(args.id);
            },
        },
        // Update a project
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        // names must be unique so we can't use ProjectStatus again
                        values: {
                            new: { value: 'Not Started' },
                            progress: { value: 'In Progress' },
                            completed: { value: 'Completed' },
                        },
                    }),
                },
            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status,
                        },
                    },
                    { new: true }
                    // If this item doesn't exist it will just make a new project
                );
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
});
```

# Frontend
## Setting up the provider

```javascript
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  // cache: new InMemoryCache();
  // ^^^ We were using this because we didn't have any memory cache uses at first
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Header />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/projects/:id' element={<Project />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}
```

## Making Queries

```javascript
import { gql } from '@apollo/client';

const GET_CLIENTS = gql`
query getClients{
    clients {
    id
    name
    email
    phone
}
}
`;

export {
    GET_CLIENTS
}
```

## Using Queries in Your Component

```javascript
import { useQuery } from '@apollo/client';
import { GET_PROJECT } from '../queries/projectQueries';

export default function Project() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PROJECT, { variables: { id } });

    if (loading) return <Spinner />;
    if (error) return <p>Something Went Wrong</p>;

    return (
        <>
            {!loading && !error && (
                <div className='mx-auto w-75 card p-5'>
                    <Link to='/' className='btn btn-light btn-sm w-25 d-inline ms-auto'>
                        Back
                    </Link>

                    <h1>{data.project.name}</h1>
                    <p>{data.project.description}</p>

                    <h5 className='mt-3'>Project Status</h5>
                    <p className='lead'>{data.project.status}</p>

                    <ClientInfo client={data.project.client} />

                    <EditProjectForm project={data.project} />

                    <DeleteProjectButton projectId={data.project.id} />
                </div>
            )}
        </>
    );
}
```

## Using Mutations in your component

```javascript
import { FaTrash } from 'react-icons/fa';
import { useMutation } from '@apollo/client';
import { DELETE_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { GET_PROJECTS } from '../queries/projectQueries';

export default function ClientRow({ client }) {
    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: { id: client.id },
        // refetchQueries: [{ query: GET_CLIENTS }, { query: GET_PROJECTS }],
        // ^^^^^ This is refetching the clients and projects queries.
        update(cache, { data: { deleteClient } }) {
        const { clients } = cache.readQuery({ query: GET_CLIENTS });
        // ^^^This is not refetching it is just looking at the cached results from the chosen query
        cache.writeQuery({
        query: GET_CLIENTS,
        data: col-md-4{
        clients: clients.filter((client) => client.id !== deleteClient.id),
        },
        });
        },
        // ^^^ This is updating the cache, but causes small console error we need to add cache to app js
        // The second method is faster because we actually aren't fetching the database making it almost instant
    });

    return (
        <tr>
            <td>{client.name}</td>
            <td>{client.email}</td>
            <td>{client.phone}</td>
            <td>
                <button className='btn btn-danger btn-sm' onClick={deleteClient}>
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
}
```

### The above mentioned app.js code

```javascript
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});


const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  // cache: new InMemoryCache();
  // ^^^ We were using this because we didn't have any memory cache uses at first
  cache,
});
```

# What and Why GraphQL Exists

# Basic Set Up

```javascript
// server 
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./schema/schema");

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
}));

// ./schema/schema

const graphiql = require('graphql');
const axios = require('axios');
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphiql;



const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:1337/users/${args.id}`)
                // graphQL automatically detects that this is a promise
                    .then(resp => resp.data);
                // we have to do this because axios puts response under a data key
            }

        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
```


# Building Queries

### Root Query
*This is the entry point into our data*

```javascript
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            // We give the required argument of id of user and it returns us the user
                resolve(parentValue, args) {
                    // the args above is an object with the key id that is the same args that we passed in above
                return _.find(users, { id: args.id });
            }
        }
    }
});
```

## Useful Things to know
1. You can name your queries *This is useful when you are on the front end*

```javascript
query theQuery{
company(id: "1"){
  id,
  name,
  users{
    id,
    firstName
  }
}
}
```

2. You can do multiple queries in one **Note you must rename the keys so they are unique**

```javascript
{
company(id: "1"){
  id,
  name,
  users{
    id,
    firstName
  }
}

anotherCompany: 
company(id: "1"){
  id,
  name,
  users{
    id,
    firstName
  }
}
}
```

3. You can create fragments to prevent repeating variables

```javascript
{
company(id: "1"){
  ...companyDetails
}

anotherCompany: 
company(id: "1"){
...companyDetails
}
}

fragment companyDetails on Company{
    id,
    name,
    users{
        id,
        firstName
    }
}
```

## Query Types

## Relational queries (*when you are referencing another schema*) do not need the same name
**This is because you have to use a resolve to describe the relation you are trying to get**

### One to one relation

```javascript
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
    }
});


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            // In the actual data code, the field is companyId
            type: CompanyType,
            resolve(parentValue, args) {
                //   parentValue is the user object fetched fro the instance of UserType in the RootQuery
                //   args is the arguments passed in
                console.log(parentValue, args);
                return axios.get(`http://localhost:1337/companies/${parentValue.companyId}`)
                    .then(res => res.data);
            }
        }
    }
});
```

### Bidirectional Relation  
*A problem arrases because you must reference one of your types first and that type needs to reference the one that comes later in the code. So basically we need to reference a variable before it has been defined (__circular reference__)*

#### To solve this we use an arrow function

```javascript
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue, args) {
                return axios.get(`http://localhost:1337/companies/${parentValue.id}/users`)
                    .then(res => res.data);
            }
        }
    })
});


const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            // In the actual data code, the field is companyId
            type: CompanyType,
            resolve(parentValue, args) {
                //   parentValue is the user object
                //   args is the arguments passed in
                console.log(parentValue, args);
                return axios.get(`http://localhost:1337/companies/${parentValue.companyId}`)
                    .then(res => res.data);
            }
        },
    })
});
```


# Mutations

```javascript
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: UserType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, { firstName, age }) {
                return axios.post('http://localhost:1337/users', { firstName, age })
                    .then(res => res.data);
            }
        },
        deleteUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, { id }) {
                return axios.delete(`http://localhost:1337/users/${id}`)
                    .then(res => res.data);
            }
        },
        editUser: {
            type: UserType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: GraphQLString },
                age: { type: GraphQLInt },
                companyId: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axios.patch(`http://localhost:1337/users/${args.id}`, args)
                    .then(res => res.data);
            }
        }
    }
});
// mutation{
//   addUser(firstName: "stephan", age: 23){
//     id,
//     firstName,
//     age
//   }
// }
```

# Client
*Relay is extremely complex, but really fast for mobile especially use by fb*

graphQL passes data to the Apollo store which then passes it to the apollo provider which is connected to our app. It is worth noting that the Apollo store know nothing about the framework we are using it essentially doesn't know that we are connected to a front end




