import { GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql"
import { db } from "./database";

const UserObject = new GraphQLObjectType({
  name: 'User',
  fields: () => {
    const PhotoObject = require('./photo.type').PhotoObject;
    return {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      name: { type: new GraphQLNonNull(GraphQLString) },
      photos: {
        type: new GraphQLList(PhotoObject), resolve: ({ id }) => db.table('photo').select().where('user_id', id)
      }
    }
  }
});


export { UserObject };