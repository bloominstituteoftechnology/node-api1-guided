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
// [GET]    /api/dogs     (R of CRUD, fetch all dogs)
// [GET]    /api/dogs/:id (R of CRUD, fetch dog by :id)
// [POST]   /api/dogs     (C of CRUD, create new dog from JSON payload)
// [PUT]    /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server
