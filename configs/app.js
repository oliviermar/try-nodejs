const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');

module.exports = function () {
    let server = express(),
        create,
        start;

    create = (config, db) => {
        // set all the server things
        server.set('env', config.env);
        server.set('port', config.port);
        server.set('hostname', config.hostname);
        
        // add middleware to parse the json
        server.use(bodyParser.json());
        server.use(bodyParser.urlencoded({
            extended: false
        }));

        let schema = require('../src/App/schema');
        
        server.use('/graphql', graphqlHTTP({
            schema,
            graphiql: true,
        }));

        //connect the database
        mongoose.connect(
            db.database,
            { 
                useNewUrlParser: true,
                useCreateIndex: true,
                autoReconnect: true
            }
        ).then(() => console.log('MongoDB Connected'))
        .catch(err => console.log(err));
    };

    start = () => {
        let hostname = server.get('hostname'),
            port = server.get('port');

        server.listen(port, function () {
            console.log('Express server listening on - http://' + hostname + ':' + port);
        });
    };
    return {
        create: create,
        start: start
    };
};