// import express from 'express';
const express = require('express');

const server = express();

server.listen(9000, () => {
    console.log('server is now listening on port 9000!');
});