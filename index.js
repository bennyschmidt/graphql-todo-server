/*
 * * * * * * * * *
 * GraphQL Server *
 * * * * * * * * *
 */

/*
 * Dependencies
 */

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

/*
 * Store
 */

const store = {
  "1629686387174": {
    id: 1629686387174,
    title: "Walk the dog",
    description: "Don't forget to play fetch.",
    isComplete: false
  },
  "1629686387175": {
    id: 1629686387175,
    title: "Walk the cat",
    description: "",
    isComplete: false
  },
  "1629686387176": {
    id: 1629686387176,
    title: "Milk the cow",
    description: "",
    isComplete: true
  }
};

/*
 * Schema
 */

const schema = buildSchema(`
  type Todo {
    id: ID
    title: String
    description: String
    isComplete: Boolean
  }

  type Query {
    todo(id: ID): Todo,
    todos: [Todo],
    saveTodo: Todo
  }
`);

/*
 * Resolver
 */

const root = {
  todo: ({ id }) => store[`${id}`],
  todos: () => Object.values(store),
  saveTodo: ({ todo }) => store[todo.id] = todo
};

/*
 * Server
 */

const server = express();
const cors = require('cors');

server.use(cors());

server.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

server.listen(4000);

console.log('Running a GraphQL API server at localhost:4000/graphql');
