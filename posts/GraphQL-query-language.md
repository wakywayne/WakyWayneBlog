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