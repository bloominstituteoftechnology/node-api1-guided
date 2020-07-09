//Boiler plate Node index.js set up //
const express = require("express");

const shortid = require("shortid");



const server = express();
let hubs = [];

// Create
// Read
// Update
//Delete
//CRUD


//GET/

server.use(express.json());

server.get('/', (req, res) => {
    res.json({hello: 'world'}); 
});

server.get('/hello', (req, res) => {
  res.json({hello: "Lambda School"});  
});

//Create/
server.post('/api/hubs', (req, res) => {
    const hubInfo = req.body;
    hubInfo.id = shortid.generate();
     
    hubs.push(hubInfo);
    res.status(201).json(hubInfo);

})


// Read

server.get('/api/hubs', (req, res) => {
   res.json(hubs);
})

// Delete

server.delete('/api/hubs/:id', (req, res) => {
  const {id} = req.params;

  const deleted = hubs.find(hub => hubs.id ===id);

  if (deleted) {
      hubs = hubs.filter(hub => hub.id !== id);
      res.status(200).json(deleted);
  }
  else {
   res.status(404).json({message: 'Hub not found'});
  }
})



//Update-change

server.patch('/api/hubs/:id', (req, res)  => {
  const {id} = req.params;
  const changes =req.body;

  let found = hubs.find(hub => hub.id === id);
  if (found) {
    Object.assign(found, changes);
    res.status(200).json(found);

  } else {
    res.status(404).json({message: 'Hub not found'});
  }
})



//update-replace

const PORT = 5000;
server.listen(PORT, () => {
  console.log('Listening on localhost:', PORT);
})