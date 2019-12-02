// import express from "express"; // ES Modules

// In NodeJS we import files using this syntax
const express = require('express');
const db = require('./data/hubs-model');
const server = express();
const port = 4000;

// Express can not parse json from the body of the request. We use this so we can parse the information needed
server.use(express.json());

server.get('/', (req, res) => {
  // The send is smart enough and will return back a JSON object that the end user can use
  res.send({api: 'Up and running...'});
});

// List of hubs GET /hubs
server.get('/hubs', (req, res) => {
  // obtain the list of hubs from the database

  // This will return the promise. When we return the promise, we need the bros (.then & .catch)
  db.find()
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      console.log('Error on GET /hubs', error);
      // We use JSON to return to the developer a message that we want to return to them
      res.status(500).json({errorMessage: `Error obtaining list of hubs from database`});
    });
});

// Add a hub
server.post('/hubs', (req, res) => {
  // get the data the client sends from the body of the request
  // express does not know how to parse JSON, so we use it above
  const hubData = req.body;

  // call the DB and then insert the hub
  db.add(hubData)
    .then(newHub => res.status(201).json(newHub))
    .catch(error => {
      console.log('Error on POST /hubs', error);
      // We use JSON to return to the developer a message that we want to return to them
      res.status(500).json({errorMessage: `Error adding the hub to the database`});
    });

});

// Remove a hub by it's id
server.delete('/hubs/:id', (req, res) => {
  // all dynamic ids will be obtainable by an object
  const id = req.params.id;

  db.remove(id)
    .then(removed => {
      // if this object is found, then we can remove it, else, pass in an error message
      if (removed) {
        // their was no hub with that id
        res.status(200).json({message: "Hub successfully removed"});
      } else {
        res.status(404).json({message: "Hub not found"});
      }
    })
    .catch(error => {
      console.log('Error on POST /hubs', error);
      // We use JSON to return to the developer a message that we want to return to them
      res.status(500).json({errorMessage: `Error deleting the hub from database`});
    });
});

// Update a hub, passing in the id and the changes

server.listen(port, () => console.log(`\n***Server running on port ${port}***\n`));