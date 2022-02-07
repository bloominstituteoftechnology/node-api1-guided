const server = require('./api/server');
const PORT = 8080;

console.log('hello world!!!!!');

server.listen(PORT, () => {
    console.log('server started');
});
