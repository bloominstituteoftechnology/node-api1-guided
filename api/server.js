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
            res.json(dogs);
        })
        .catch(() => {
            res.status(500).json({ message: "could not get the dogs!" });
        });
});

server.get('/api/dogs/:id', (req, res) => {
    let { id } = req.params;
    dogModel.findById(id)
        .then(dog => {
            console.log(dog);
            if(dog == null) {
                res.status(404).json({ message: `dog ${id} not found!` });
            } else {
                res.json(dog);
            }
        })
        .catch(() => {
            res.status(500).json({ message: `could not get dog!` });
        });
})

server.post('/api/dogs', (req, res) => {
    console.log(req.body);
});

// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

module.exports = server;