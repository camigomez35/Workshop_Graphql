'use strict'

const merge = require('lodash.merge');
const { makeExecutableSchema } = require('graphql-tools');

const showSchema = require('./shows-tv/schema');
const showResolver = require('./shows-tv/resolver');
const postSchema = require('./posts/schema');
const postResolver = require('./posts/resolver');


const typeDefs = [
    ...showSchema,
    ...postSchema
];


const resolvers = merge(
    showResolver,
    postResolver
);

const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports = executableSchema;