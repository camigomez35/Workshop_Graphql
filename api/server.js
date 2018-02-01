'use strict'

const express = require('express');

const app = express();

const port = 3000;

const bodyParse = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');

const config = require('./config');
const schema = require('./graphql/schema');
const ShowConnector = require('./graphql/shows-tv/connector');

app.use(bodyParse.json());

app.use('/graphql', graphqlExpress(req => {
    return {
        // Scheme global 
        schema,
        context: {
            // Le pasamos el conector para que sea utilizado
            showConnector: new ShowConnector(config.tvMazeUrl)
        }
    }
}));

app.get('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));



app.listen(port, () => console.log(`Server is now running on http://localhost:${port}`));