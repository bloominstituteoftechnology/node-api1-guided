const server = require('./api/server');

console.log('hello world');

server.listen(() => {
    console.log('server started');
})
