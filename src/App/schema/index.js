const { 
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLBoolean,
    GraphQLID
 } = require('graphql');
const findAll = require('../../../src/UI/actions/users/findAll');
const find = require('../../../src/UI/actions/users/find');
const create = require('../../../src/UI/actions/users/create');
const update = require('../../../src/UI/actions/users/update');
const deleteUser = require('../../../src/UI/actions/users/delete');

const userType = new GraphQLObjectType({
    name: 'User',
    description: 'Query for get user information.',
    fields: {
        id: {
            type: GraphQLID,
            description: 'Identifier of user'
        },
        name: {
            type: GraphQLString,
            description: 'Name of user'
        },
        email: {
            type: GraphQLString,
            description: 'Email of user'
        }
    }
})

const userInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'name of user',
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'email of user'
        }
    }
});

const mutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'The root mutation type',
    fields: {
        createUser: {
            type: userType,
            args: {
                user: {
                    type: new GraphQLNonNull(userInputType)
                }
            },
            resolve: (_, args) => {
                return create(args.user);
            }    
        },
        updateUser: {
            type: userType,
            args: {
                id: {
                    type: GraphQLID,
                    description: 'Id of user to update'
                },
                name: {
                    type: GraphQLString,
                    description: 'Name of user'
                },
                email: {
                    type: GraphQLString,
                    description: 'Email of user'
                }
            },
            resolve: (_, args) => {
                return update(args);
            }
        },
        deleteUser: {
            type: GraphQLBoolean,
            args: {
                id: {
                    type: GraphQLID,
                    description: 'Id of user to remove'
                }
            },
            resolve: (_, args) => {
                return deleteUser(args.id);
            }
        }
    }
});

const queryType = new GraphQLObjectType({
    name: 'queryType',
    description: 'root query type',
    fields: {
        user: {
            type: userType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'Id of the user'
                }
            },
            resolve: (_, args) => {
                return find(args.id);
            },
        },
        users: {
            type: new GraphQLList(userType),
            resolve: findAll,
        }
    }
});

const schema = new GraphQLSchema({
    query: queryType,
    mutation: mutationType
});

module.exports = schema;