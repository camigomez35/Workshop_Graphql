'use strict'

const merge = require('lodash.merge');
const { makeExecutableSchema } = require('graphql-tools');

const showSchema = require('./shows-tv/schema');
const showResolver = require('./shows-tv/resolver');


const typeDefs = [
    ...showSchema
];


const resolvers = merge(
    showResolver
);


const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports = executableSchema;