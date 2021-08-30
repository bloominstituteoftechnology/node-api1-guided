// import the server and start it
const express = require('express') // import express from 'express' // ES6 modules

const server = express() // instance of an express app

server.get('/hello', (req, res) => {
  // pull info of interest out of the req
  res.json({ message: 'web 45 rocks'}) // sending back a response
})

server.use('*', (req, res) => {
  res.status(404).json({ message: 'sorry, not found!'})
})

server.listen(5000, () => { // only one program can hog 5000 at a time
  console.log('listening on port 5000') // success callback
})
