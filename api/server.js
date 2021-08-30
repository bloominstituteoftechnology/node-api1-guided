// IMPORTS AT THE TOP
const express = require('express')
// INSTANCE OF EXPRESS APP
const server = express()
// GLOBAL MIDDLEWARE

// ENDPOINTS

// [GET] / (Hello World endpoint)
server.get('/', (req, res) => {
  res.status(200).json({ message: 'hey there'})
})
// [GET] /api/dogs/:id (R of CRUD, fetch dog by :id)
// [GET] /api/dogs (R of CRUD, fetch all dogs)
// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)
// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)

// EXPOSING THE SERVER TO OTHER MODULES
module.exports = server
