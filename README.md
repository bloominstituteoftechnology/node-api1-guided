# Hubs Web API

Guided project for **Web API I** module.

In this project we will learn how to create a very simple Web API using `Node.js` and `Express`, and cover the basics of `server-side routing` and using global `middleware`.

The code for the guided project will be written in a single file for simplicity. We'll see ways to structure an API to make it more maintainable in upcoming lectures.

## Prerequisites

- [Postman](https://www.getpostman.com/downloads/) installed.

## Project Setup

- [ ] fork and clone this repository.
- [ ] **CD into the folder** where you cloned **your fork**.
- [ ] type `yarn` or `npm i` to download dependencies.

Please follow along as the instructor builds the API step by step.

## Database access

Database access will be done using the `db.js` file included inside the `data` folder. This file publishes the following methods:

- `find()`: calling find returns a promise that resolves to an array of all the hubs. This method randomly fails 50% of the time. 
- `findById()`: this method expects an `id` as it's only parameter and returns a promise that resolves to the hub corresponding to the `id` provided.
- `add()`: calling add and passing it a hub object will store that hub and resolves with the inserted hub.
- `update()`: accepts two arguments, the first is the `id` of the hub to update and the second is an object with the `changes` to apply. It resolves with the updated hub.
- `remove()`: the remove method accepts an `id` as a parameter and upon successfully deleting the hub it resolves to the removed hub.
- `clear()`: removes all hubs currently stored
