// IMPORTS AT THE TOP
const express = require('express');

// INSTANCE OF EXPRESS APP
const server = express();

// GLOBAL MIDDLEWARE

// ENDPOINTS
server.get('/test1', (req, res) => {
    res.send('test1!');
});

// [GET]    /             (Hello World endpoint)
server.get('/', (req, res) => {
    res.json({ hello: 'world' });
});

// [GET]    /api/dogs     (R of CRUD, fetch all dogs)
server.get('/api/dogs', (req, res) => {});

// [GET]    /api/dogs/:id (R of CRUD, fetch dog by :id)
server.get('/api/dogs/:id', (req, res) => {});

// [POST]   /api/dogs     (C of CRUD, create new dog from JSON payload)
server.post('/api/dogs', (req, res) => {});

// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put('/api/dogs/:id', (req, res) => {});

// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)
server.delete('/api/dogs/:id', (req, res) => {});


// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server
