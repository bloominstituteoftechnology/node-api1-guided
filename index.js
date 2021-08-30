// import the server and start it
const express = require('express') // import express from 'express' // ES6 modules

const server = express() // instance of an express app

server.get('/hello', (req, res) => {
  // pull info of interest out of the req
  res.json({ message: 'web 45 rocks'}) // sending back a response
})

server.listen(5000, () => {
  console.log('listening on port 5000')
})
