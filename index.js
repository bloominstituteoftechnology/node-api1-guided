const express = require('express');

const Hubs = require('./data/hubs-model')

const server = express();

server.get('/', (req, res) =>{
    res.json({hello: 'web 26'})
})

// view a list of hubs
server.get('/api/hubs', (req, res) => {
    // got and get the hubs from the database
    Hubs.find().then(hubs =>{
        res.status(200).json(hubs);
    }).catch(err =>{
        console.log(err);
        res.status(500).json({ errorMessage: 'Oopsi Daisies'})
    });
})


const port = 5000;
server.listen(port, () => console.log(`\n API on port ${port}`))