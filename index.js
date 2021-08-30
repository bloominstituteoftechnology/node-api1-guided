const server = require('./api/server.js')

server.listen(5000, () => { // only one program can hog 5000 at a time
  console.log('listening on port 5000') // success callback
})
