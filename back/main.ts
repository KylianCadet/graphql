import './knex'
import express from "express";
import { createHandler } from "graphql-http/lib/use/express"
import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql"
import { ruruHTML } from 'ruru/server'
import { db } from './database';
import { UserObject } from './user.type';

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve() {
          return 'world';
        },
      },
      sum: {
        args: {
          'num1': {
            type: new GraphQLNonNull(GraphQLInt),
          },
          'num2': {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        type: GraphQLInt,
        resolve(_, { num1, num2 }: { num1: number; num2: number }): number {
          return num1 + num2;
        }
      },
      user: {
        args: {
          'id': {
            type: new GraphQLNonNull(GraphQLInt)
          }
        },
        type: UserObject,
        async resolve(_, { id }: { id: number }) {
          const users = await db.table('user').select('*').where('id', id)
          return users?.at(0);
        }
      }
    },
  }),
});

var app = express()

// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({
    schema: schema
  })
)

app.get("/graphiql", (_req, res) => {
  res.type("html")
  res.end(ruruHTML({ endpoint: "/graphql" }))
})

// Start the server at port
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")