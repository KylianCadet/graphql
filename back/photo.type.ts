import { GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString, GraphQLTypeResolver, resolveObjMapThunk } from "graphql"
import { db } from "./database";


const PhotoObject = new GraphQLObjectType({
  name: 'Photo',
  fields: () => {
    const UserObject = require('./user.type').UserObject;
    return {
      id: { type: new GraphQLNonNull(GraphQLInt) },
      user_id: { type: new GraphQLNonNull(GraphQLInt) },
      user: { type: UserObject, resolve: ({ user_id }) => db.table('user').where('id', user_id).first() },
      data: { type: GraphQLString }
    }
  }
});

export { PhotoObject };