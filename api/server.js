'use strict'

const express = require('express');

const app = express();

const port = 3000;
const bodyParse = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const config = require('./config');
const schema = require('./graphql/schema');
const ShowConnector = require('./graphql/shows-tv/connector');

const mongoose = require('mongoose');
const Promise = require('bluebird');

const PostStorage = require('./graphql/posts/storage');

app.use(bodyParse.json());

app.get('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

mongoose.Promise = Promise;
const conn = mongoose.createConnection(config.db);

app.use('/graphql', graphqlExpress(req => {
    return {
        schema,
        context: {
            showConnector: new ShowConnector(config.tvMazeUrl),
            postStorage: new PostStorage(conn)
        }
    }
}));



app.listen(port, () => console.log(`Server is now running on http://localhost:${port}`));