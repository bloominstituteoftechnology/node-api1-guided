# Lambda Adopters Web API

Guided project for **Node API 1** Module.

In this project we will learn how to create a very simple Web API using `Node.js` and `Express`, and cover the basics of `server-side routing` and using global `middleware`.

The code for the guided project will be written in a single file for simplicity. We'll see ways to structure an API to make it more maintainable in upcoming lectures.

## Prerequisites

- an HTTP client like [Postman](https://www.getpostman.com/downloads/) or [Insomnia](https://insomnia.rest/download/).

## Project Setup

- [ ] Clone this repository.
- [ ] Open the project folder in VSCode.

## Assignment

Build a RESTful Web API to manage _"Dogs"_ and _"Adopters"_ for an animal shelter. Each Dog can have just one Adopter, but an Adopter can rescue any number of Dogs.

A Dog has:

- a unique `id`.
- a `name`.
- a `weight`.
- an `adopter_id` (with a value of `null` until the Dog gets adopted).

An Adopter has:

- a unique `id`.
- a `first_name`.
- a `last_name`.
- an `email`.
- a `phone_number`.

### Features

The Web API must provide a set of `endpoints` to fulfill the following needs:

- add a new Dog.
- view a list of existing Dogs.
- view the details of a single Dog.
- update the information of an existing Dog.
- remove a Dog.
- add a new Adopter.
- view a list of existing Adopters.
- view the details of a single Adopter.
- update the information of an existing Adopter.
- remove a Adopter.

Here is a table with the `endpoint` descriptions:

| Action                | URL                | Method | Response          |
| :-------------------- | :----------------- | :----- | :---------------- |
| Add a Dog             | /api/dogs          | POST   | the new Dog       |
| View list of Dogs     | /api/dogs          | GET    | array of Dogs     |
| View Dog details      | /api/dogs/{id}     | GET    | a Dog             |
| Update Dog            | /api/dogs/{id}     | PUT    | updated Dog       |
| Remove a Dog          | /api/dogs/{id}     | DELETE | deleted Dog       |
| Add a Adopter         | /api/adopters      | POST   | the new Adopter   |
| View list of Adopters | /api/adopters      | GET    | array of Adopters |
| View Adopter details  | /api/adopters/{id} | GET    | an Adopter         |
| Update Adopter        | /api/adopters/{id} | PUT    | updated Adopter   |
| Remove a Adopter      | /api/adopters/{id} | DELETE | deleted Adopter   |
