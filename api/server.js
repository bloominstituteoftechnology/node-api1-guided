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
    let body = req.body;
    if(!body.name) {
        res.status(500).json({ message: `name is required` });
    } else if(!body.weight) {
        res.status(500).json({ message: `weight is required` });
    } else {
        dogModel.create(body)
            .then(dog => {
                res.status(201).json(dog);
            })
            .catch(() => {
                res.status(500).json({ message: `could not create dog!` });
            });
    }
});

server.put('/api/dogs/:id', async (req, res) => {
    let { id } = req.params;
    try {
        // let dog = await dogModel.findById(id);
        // if(dog == null) {
        //     res.status(404).json({ message: `dog ${id} not found!` });
        //     return;
        // }

        let body = req.body;
        if(!body.name) {
            res.status(500).json({ message: `name is required` });
            return;
        } else if(!body.weight) {
            res.status(500).json({ message: `weight is required` });
            return;
        } else {
            let newDog = await dogModel.update(id, body);
            console.log(newDog);
            if(newDog == null) {
                res.status(404).json({ message: `dog ${id} not found!` });
                return;
            } else {
                res.status(200).json(newDog);
            }
        }
    } catch(e) {
        res.status(500).json({ message: `could not update dog!` });
    }
});

server.delete('/api/dogs/:id', (req, res) => {
    let { id } = req.params;
    dogModel.delete(id)
        .then(dog => {
            if(dog == null) {
                res.status(404).json({ message: `dog ${id} not found!` });
                return;
            }

            res.status(200).json(dog);
        })
        .catch(() => {
            res.status(500).json({ message: `could not delete dog!` });
        });
});

// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

module.exports = server;