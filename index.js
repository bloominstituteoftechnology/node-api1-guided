// introduce the `CommonJS` way of importing packages as you _require_ `express`.
const express = require('express'); // npm module, needs to be installed
// equivalent to import express from 'express';

// import data helpers
const db = require('./data/db.js');

const server = express(); // creates an http web server

// Middleware
server.use(express.json()); // teaches express how to parse JSON from the request body

// Endpoints

// introduce `routing` and explain how requests are routed to the correct
// `request handler function` based on the URL and HTTP verb on the request.
// Explain what `req` and `res` are.
server.get('/', (req, res) => {
  // name is not important (could be request, response), position is.
  res.send('Hello World!');
  // .send() is a helper method that is part of the response object
});

server.get('/now', (req, res) => {
  const now = new Date().toISOString();
  res.send(now);
});

server.get('/hubs', (req, res) => {
  // .hubs.find() returns a promise that resolves to a list of existing hubs
  // it fails if the server's clock seconds hold an odd value. Done to simulate failures.
  // (ie. fails at 9:02:03 and 9:02:05, succeeds at 9:02:02 and 9:02:04)
  const hubs = db.hubs
    .find()
    .then(hubs => {
      // introduce res.status() and res.json()
      res.status(200).json(hubs);
    })
    .catch(({ code, message }) => {
      // we ran into an error getting the hubs
      // notice we are destructuring the error sent back by the data layer
      // alternatively .catch(err => { res.status(err.code).json({ success: true, message: err.message })});
      res.status(code).json({
        success: false,
        message,
      });
    });
});

server.post('/hubs', (req, res) => {
  // one way a client can send information is in the request body
  const hubInfo = req.body; // needs use express.json() middleware

  // we are not validating the data sent by the client for now to keep the code simpler, but we should.
  db.hubs
    .add(hubInfo)
    .then(hub => {
      // hub was added successfully
      res.status(201).json({ success: true, hub });
    })
    .catch(({ code, message }) => {
      // we ran into an error adding the hub
      // notice we are destructuring the error sent back by the data layer
      // alternatively .catch(err => { res.status(err.code).json({ success: true, message: err.message })});
      res.status(code).json({
        success: false,
        message,
      });
    });
});

server.delete('/hubs/:id', (req, res) => {
  // introduce req.params
  const id = req.params.id;

  db.hubs
    .remove(id)
    .then(deleted => {
      // the data layer returns the deleted record, but we won't use it
      // explain .end(). It ends the request and sends a response with the specified status code
      // 204 (no content) is commonly used for DELETE as there is no need to send anything back.
      res.status(204).end();
    })
    .catch(({ code, message }) => {
      // we ran into an error adding the hub
      // notice we are destructuring the error sent back by the data layer
      // alternatively .catch(err => { res.status(err.code).json({ success: true, message: err.message })});
      res.status(code).json({
        success: false,
        message,
      });
    });
});

server.put('/hubs/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.hubs
    .update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json({ success: true, updated });
      } else {
        res.status(404).json({
          success: false,
          message: 'I cannot find the hub you are looking for',
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({
        success: false,
        message,
      });
    });
});

server.get('/hubs/:id', (req, res) => {
  db.hubs
    .findById(req.params.id)
    .then(hub => {
      if (hub) {
        res.status(200).json({
          success: true,
          hub,
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'We cannot find the hub you are looking for',
        });
      }
    })
    .catch(({ code, message }) => {
      res.status(code).json({
        success: false,
        message,
      });
    });
});

// makes the web server listen for incoming traffic on port 4000
server.listen(4000, () => {
  // this callback function runs after the server starts sucessfully
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
