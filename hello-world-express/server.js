// server? What is a server?

// const http = require("http");
//Before you install express you would need line above. When it's installed, write like below.
const express = require("express");

// const hostname = "127.0.0.1";
const port = 3000;

// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader("Content-Type", "text/plain");
//   res.end("Hello World, from NodeJS");
// });

const server = express();

server.get("/", (req, res) => {
  res.send("Hellow World from Express!");
});

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
