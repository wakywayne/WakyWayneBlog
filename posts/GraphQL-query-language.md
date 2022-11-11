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

# How it works


# Server with Pothos and Yoga Server

## The server

```typescript
import { createServer } from '@graphql-yoga/node'
import SchemaBuilder from "@pothos/core"

builder = new SchemaBuilder<{}>({})

const server = createServer({
    endpoint: '/api',
    schema: builder.toSchema()
})
```

## Making Object types

1. You define the class that will describe the object

```typescript
export class User {
    id: string;
    name: string;
    email: string;

    constructor(id: string, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }
}
```

2. You build the class in your server file

```typescript
// In your server file you import this class from your other file
builder.objectType(User, {
    name: 'User',
    fields: (t) => ({
        id: t.exposeID('id', {}),
        name: t.exposeString('name', {}),
        email: t.exposeString('email', {}),
    }),
});

// if the object needs a resolver
builder.objectType(CartItem, {
    name: "CartItem",
    description: "A cart item",
    fields: (t) => ({
        id: t.exposeString('id', {}),
        name: t.exposeString('name', {}),
        price: t.exposeInt('price', {}),
        quantity: t.exposeInt('quantity', {}),
        lineTotal: t.field({
            type: "Int",
            resolve: (item) => item.price * item.quantity,
        }),
        unitTotal: t.field({
            type: "Int",
            resolve: (item) => item.price,
        })
    }),
});
```

### Reference Type

1. The **Money** class

```typescript
export class Money {
    amount: number;
    formatted: string;

    constructor(amount: number, formatted: string) {
        this.amount = amount;
        this.formatted = formatted;

    }
}
```

2. Both object types

```typescript
builder.objectType(Money, {
    name: "Money",
    description: "A money",
    fields: (t) => ({
        amount: t.exposeInt("amount", {}),
        formatted: t.field({
            type: "String",
            // Notice how this type is in a string because it is not one of our classes
            resolve: (money) =>
                new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                }).format(money.amount),
        }),
    }),
});


builder.objectType(Cart, {
    name: "Cart",
    description: "A cart",
    fields: (t) => ({
        id: t.exposeString('id', {}),
        items: t.field({
            type: [CartItem],
            resolve: (cart) => cart.items ?? [],
        }),
        // This is the field that we want to USE TO REFERENCE
        subTotal: t.field({
            type: Money,
            resolve: (cart) => {
                const total = cart.items?.reduce((acc, item) => acc + item.price * item.quantity, 0) ?? 0;
                return new Money(total, `$${total}`);
            }
        })
    }),
});
```

## Plugins

### with-input & auth scopes
```typescript
import ScopeAuthPlugin from '@pothos/plugin-scope-auth';
import WithInputPlugin from "@pothos/plugin-with-input"

const builder = new SchemaBuilder<{
    Context: {
        currentUser: User;
    }

    AuthScopes: {
        public: boolean,
        user: boolean,
        admin: boolean,
    }
}>({
    plugins: [
        // must list scope auth first so it has priority
        ScopeAuthPlugin,
        WithInputPlugin
    ],
    authScopes: async (context) => ({
        // If this is true it allows the user to access the query with that level of scope
        public: true,
        user: context.currentUser.id === '1',
        // evaluated when used 
        admin: false
    }),
    withInput: {
        // Go over this
        typeOptions: {
            // default options for Input object types created by this plugin
        },
        argOptions: {
            // set required: false to override default behavior
        },
    },
});
```

**Auth**
> In some rare edge cases, you may have some additional logic added to your application that clones or mutates the context object throughout the execution of a request. To ensure that all plugins work correctly even if the context object is cloned, wrapped, or modified in a way that does not preserve its identity, you can manually initialize the context cache and attach it to the context object:

```javascript
import { initContextCache } from '@pothos/core';

const server = createServer({
  schema: builder.toSchema(),
  context: async ({ req }) => ({
    // Adding this will prevent any issues if you server implementation
    // copies or extends the context object before passing it to your resolvers
    ...initContextCache(),

    currentUser: await getUserFromAuthHeader(req.headers.authorization),
  }),
});

server.start();
```


#### How the input plugin works
```javascript
builder.mutationType({
    fields: (t) => ({
        addItem: t.fieldWithInput({
            input: {
                cartId: t.input.string({ required: true }),
                id: t.input.string({ required: true }),
                name: t.input.string({ required: true }),
                price: t.input.int({ required: true }),
                quantity: t.input.int({ required: true, defaultValue: 1 }),
            },
            type: Cart,
            resolve: (_, { input: { cartId, ...input } }) => {
                const cart = CARTS.find((cart) => cart.id === cartId);

                if (!cart) {
                    throw new Error(`Cart with id ${cartId} not found`)
                }

                return {
                    id: cartId,
                    items: [...cart?.items, input]
                }
            }
        }),
    }),
})
```

*The above code returns a schema that looks like this:*
> The input name will default to ${ParentType.name}${Field.name}Input.

```typescript
type Mutation {
  addItem(input: MutationAddItemInput!): Cart
}

input MutationAddItemInput {
    cartId: String!
    id: String!
    name: String!
    price: Int!
    quantity: Int!
    // Not sure how to express the default value
}
```

#### How the global auth plugin works

```typescript
// The whole internal message query will require these auth scopes
builder.queryType({
  fields: (t) => ({
    internalMessage: t.string({
      authScopes: {
        employee: true,
      },
      resolve: () => 'hi',
    }),
  }),
});

// Just the field will require authentication
builder.objectType(Article, {
  fields: (t) => ({
    title: t.exposeString('title', {
      authScopes: {
        employee: true,
      },
    }),
  }),
});
```

### Context
**In order to use auth you will likely need to use context as well _context is the third parameter that comes into a resolver function_**

```typescript
// Using the above server with context prop
// You will take in the token through the header and apply it to context
// I found it best to handle any logic in a different route and then parse it here

const server = createServer({
    endpoint: '/api',
    schema: builder.toSchema(),
    context: async ({ req }) => {

        if (req.headers.user) {
            const user = await fetchUser(`${apiUrl}/api/auth/return/${req.headers.user}`);
            const parsedUser = JSON.parse(user);
            console.log({ parsedUser });

            return {
                currentUser: parsedUser
            }
        } else {
            null
        }
    }
})


export default server;
```

# Frontend with Apollo

## Setting up the server

```javascript
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

  const cache = new InMemoryCache({
    // By defining these type policies you protect yourself from potential mishaps
    typePolicies: {
      Mutation: {
        fields: {
          addItem: {
            merge(existing, incoming) {
              return incoming;
            }
          }
        }
      }
    }
  });

  const client = new ApolloClient({
    uri: `${apiUrl}/api`,
    cache
  });

<ApolloProvider client={client}>
{...YourApp}
</ApolloProvider>
```

## Making a Query, Mutation, and Updating Data in the cache
```typescript

    const GET_CARTS = gql`
query {
carts{
id
items{
id
name
}}} `;


    const MUTATION = gql`
  mutation AddItem($input:MutationAddItemInput!) {
    addItem(input: $input){
            items{
                id
                name
            }
        }
    }
`;




    const { loading, error, data } = useQuery(GET_CARTS)

    const [addItem] = useMutation(MUTATION, {

        // refetchQueries: [{ query: GET_CARTS }]


        update(cache, { data: { addItem } }) {
            // addItem is the response of the query of add item function         
            console.log({ addItem });
            // @ts-ignore
            let { carts } = cache.readQuery({ query: GET_CARTS });

            console.log({ carts })

            //   make a new array out of the carts array and add the new item to the array if the id of the cart is 2
            let newCarts = carts.map((cart: Cart) => {
                if (cart.id === "2") {
                    return { ...cart, items: [...addItem.items] }

                } else {
                    return cart
                }
            })


            console.log({ newCarts });

            cache.writeQuery({
                query: GET_CARTS,
                data: { carts: newCarts }
                // data: { carts: [{ id: "1", items: [{ id: "2", name: "an item" }] }] }
            })
        }
    })



    function AddTodo() {
        let theInput = {
            cartId: "2",
            id: "21",
            name: "New Item!",
            price: 1900,
            quantity: 2
        }

        let req = JSON.stringify(theInput);
        // @ts-ignore
        addItem({ variables: { input: theInput } });
        console.log("Added Item");
    };
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

# Server With Mongoose and Express
*Please make sure this code is not out of date before you try and implement it*

---


# GraphQL Mongoose
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








