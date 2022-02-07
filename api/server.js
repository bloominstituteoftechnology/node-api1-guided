const express = require('express');
const dogModel = require('./dog-model');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    console.log('received get request!');
    res.json("hello world!");
});

server.get('/api/dogs', (req, res) => {
    dogModel.findAll()
        .then(dogs => {
            throw new Error();
            // res.json(dogs);
        })
        .catch(() => {
            res.status(500).json({ message: "could not get the dogs!" });
        });
});

// [GET]    /api/dogs     (R of CRUD, fetch all dogs)
// [GET]    /api/dogs/:id (R of CRUD, fetch dog by :id)
// [POST]   /api/dogs     (C of CRUD, create new dog from JSON payload)
// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

module.exports = server;