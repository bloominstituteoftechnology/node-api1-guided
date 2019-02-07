# webapi-hubs

Guided project for **Web API I** module.

In this project students will learn how to create a very simple Web API using `Node.js` and `Express`. They will be introduced to server-side `routing` and how to use global `middleware`.

The whole demo will be written in a single file for simplicity. We'll see ways to structure an API to make it more maintainable in upcoming lectures.

## Prerequisites

- [Postman](https://www.getpostman.com/downloads/) installed.

## Starter Code

The starter code for this example is configured to run the server by typing `yarn server` or `npm run server`. The server will restart automatically on changes.

Data for the API will be stored in memory using an array.

## Create Basic Express Server

Add an `index.js` file to the root folder with the following code:

```js
const express = require('express');

const server = express();

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
```

1. use yarn or npm to install `express`.
1. run the server.
1. note the logged message in the terminal.
1. navigate to `http://localhost:4000` in a browser.
1. note server responds `Cannot GET /`.
1. stop the server. Explain how to stop the server with `ctrl + c`.
1. refresh the browser window. Note that the response is different, there is no server responding to requests on that address.
1. start the server and refresh the browser window. The server is trying to process the request, but we haven't written any code to send a response, we'll do that next.

Keep the server running.

## Add `GET /` Endpoint

Add the following lines after `const server = express();`:

```js
server.get('/', (req, res) => {
  res.send('Hello World!');
});
```

Refresh browser.

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

Time for students to practice what they have learned.

### You Do (estimated 5m to complete)

Ask students to write another _endpoint_ that will handle GET requests to `/now` and send back today's date and time as a string.

One of many possible solutions:

```js
server.get('/now', (req, res) => {
  const now = new Date().toISOString();
  res.send(now);
});
```

Up to this point we have been responding with strings, this is good as a quick demo, but most APIs respond with data formatted as JSON. The following endpoints will do just that.

Next, we'll learn how to retrieve (the `R` in CRUD) a list of hubs.

## Add `GET /hubs` Endpoint

This endpoint will return a list of hubs as a JSON formatted array. The data comes from an **in-memory array that gets reset every time the server restarts**.

The file `./data/db.js` works as a data layer. It has methods for manipulating the array of hubs. Please read through the code to get familiar with it.

**All methods from the data layer return a promise**.

When an operation fails, the data layer returns an object with an HTTP status `code` and a `message`.

1. require data layer: `const db = require('./data/db.js');`. No need to make change to this file.
2. add `GET /hubs` endpoint:

```js
server.get('/hubs', (req, res) => {
  const hubs = db.hubs
    .find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(({ code, message }) => {
      res.status(code).json({
        success: false,
        message,
      });
    });
});
```

3. visit `/hubs` in the browser.
4. refresh browsers a few times to see it fail when seconds hold an even value.

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

Next, we'll learn how to add (the `C` in CRUD) a new hub.

## Add `POST /hubs` Endpoint

This endpoint expects an object with the `name` for the hub and returns the newly created hub. The data layer adds a new `id` and `createdAt` properties automatically to every new hub.

We can easily make GET request with a web browser, but other HTTP Methods like POST we need a REST client, we will use [Postman](https://www.getpostman.com/downloads/)

Add the endpoint:

```js
server.post('/hubs', (req, res) => {
  const hubInfo = req.body;

  db.hubs
    .add(hubInfo)
    .then(hub => {
      res.status(201).json({ success: true, hub });
    })
    .catch(({ code, message }) => {
      res.status(code).json({
        success: false,
        message,
      });
    });
});
```

Explain how to make POST requests using postman. Remember to **set body to raw and select JSON from the body type dropdown**, it defaults to TEXT.

1. make a POST request with `{ "name": "db 1" }` as the body.
1. we should get an error because express doesn't know how to parse JSON from the body.
1. add `express.json()` middleware and explain what it does. Tell students we'll know more about how `middleware` works in the _middleware module_.
1. send the POST request again. Note that the hub we get back has `id` and `createdAt` fields. This is similar to what happens when using a real database.

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

Next, we'll learn how to remove (the `D` in CRUD) a hub.

## Add `DELETE /hubs/:id` Endpoint

Add the endpoint:

```js
server.delete('/hubs/:id', (req, res) => {
  const id = req.params.id;

  db.hubs
    .remove(id)
    .then(deleted => {
      res.status(204).end();
    })
    .catch(({ code, message }) => {
      res.status(code).json({
        success: false,
        message,
      });
    });
});
```

1. make a `GET` request to `/hubs`, show the list of existing hubs.
1. try deleting with id `abc`. Should fail with a `400` error.
1. use a valid `id` to delete a hub
1. make a `GET` request to `/hubs`. Note that the hub was deleted.

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

At this point we have seen how to read information from the request `body` and `url parameters`.

Next, wepll bring it all together to update (the `U` in CRUD) a hub.

## Add `PUT /hubs/:id` Endpoint

If a hub with the provided `id` exists, this endpoint will update it and return the updated hub. If there is no hub with the provided `id`, the endpoint will respond with at `404` status code and an object with an informative `message`.

Add the enpoint:

```js
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
```

1. try updating with an invalid `id`. Should fail with a `400` error.
1. try to change the `id` of an existing hub. Should fail with a `400` error.
1. make a `GET` to `/hubs` and show that the hub was NOT updated.
1. try updating without providing a `name`. Should fail with a `400` error.
1. make a `GET` to `/hubs` and show that the hub was NOT updated.
1. try updating with valid `id` and `name`. Should get a `200` and updated hub.
1. make a `GET` to `/hubs` and show that the hub was updated.

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

Time for students to practice what they have learned.

### You Do (estimated 10m to complete)

1. add `GET /hubs/:id` Endpoint that uses `db.hubs.findById(id)` and returns the hub with the provided `id` if one is found.
1. if the hub is not found for that `id`, return status code `404` and this object: `{ success: false, message: 'We couldn't find a hub with the provided id' }`.

One possible solution:

```js
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
```

1. try the endpoint with an invalid `id`. Should fail with `400` error.
1. try the endpoint with the `id` of a non existing hub. Should fail with a `404`.
1. try the endpoint with the `id` of a existing hub. Should get a `200` and the hub.

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**
