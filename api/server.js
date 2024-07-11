// IMPORTS AT THE TOP

// INSTANCE OF EXPRESS APP

// GLOBAL MIDDLEWARE

// ENDPOINTS

// [GET]    /             (Hello World endpoint)
// [GET]    /api/dogs     (R of CRUD, fetch all dogs)
// [GET]    /api/dogs/:id (R of CRUD, fetch dog by :id)
// [POST]   /api/dogs     (C of CRUD, create new dog from JSON payload)
// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

// EXPOSING THE SERVER TO OTHER MODULES
const express = require('express'); // CommonJS module whereas we used import with react
const shortid = require('shortid'); // npm shortid

const server = express();

//this is the middleware
server.use(express.json()); // teaches express to read json from the body

let dogs = [
    {
        id: shortid.generate(),
        name: "Buddy",
        weight: 35,
    },
    {
        id: shortid.generate(),
        name: "Rudy",
        weight: 40,
    },
    {
        id: shortid.generate(),
        name: "Rush",
        weight: 50,
    }
];


server.get('/', (req, res) => {
    res.status(200).send('<h1>Hello World!</h1>')
})

server.get('/api/dogs', (req, res) => {
    res.status(200).json(dogs)
})

server.post('/api/dogs', (req, res) => {
    const newDog = req.body; // needs express.json() middleware

    newDog.id = shortid.generate();

    dogs.push(newDog);

    res.status(201).json(newDog);
})

server.delete('/api/dogs/:id', (req, res) => {
    const id = req.params.id;

    const deleted = dogs.find(d => d.id === id);
    dogs = dogs.filter(d => d.id !== id);

    res.status(200).json(deleted);
})

server.put('/api/dogs/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    let found = dogs.find(d => d.id === id);

    if (found) {
        Object.assign(found, changes);
        res.status(200).json(found);
    } else {
        res.status(404).json({ message: "Dog not found" });
    }



})


server.get('/api/dogs/:id', (req, res) => {
    const dogId = req.params.id;
    const dog = dogs.find(d => d.id === dogId);
    if (dog) {
        res.json(dog);
    } else {
        res.status(404).send('Dog not found');
    }
});

module.exports = { server }