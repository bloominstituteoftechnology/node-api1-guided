# Lambda Animal Shelter Web API

Guided project for **Node API 1** Module.

In this project we will learn how to create a simple Web API using `Node.js` and `Express`, and cover the basics of server-side routing using global middleware.

## Prerequisites

- an HTTP client like [Postman](https://www.getpostman.com/downloads/) or [Insomnia](https://insomnia.rest/download/).

## Project Setup

- [ ] Clone this repository.
- [ ] Open the project folder in VSCode.

## Assignment

Build a RESTful Web API for an animal shelter to Create, Read, Update and Delete _"Dogs"_ .

A Dog has:

- a unique `id`.
- a `name`.
- a `weight`.

### Features

The Web API must provide a set of `endpoints` to fulfill the following needs:

- add a new Dog.
- view a list of existing Dogs.
- view the details of a single Dog.
- update the information of an existing Dog.
- remove a Dog.

Here is a table with the `endpoint` descriptions:

| Action                | URL                | Method | Response          |
| :-------------------- | :----------------- | :----- | :---------------- |
| Add a Dog             | /api/dogs          | POST   | the new Dog       |
| View list of Dogs     | /api/dogs          | GET    | array of Dogs     |
| View Dog details      | /api/dogs/{id}     | GET    | a Dog             |
| Update Dog            | /api/dogs/{id}     | PUT    | updated Dog       |
| Remove a Dog          | /api/dogs/{id}     | DELETE | deleted Dog       |
