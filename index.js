// import the server and start it!

const { server } = require("./api/server.js")

const PORT = 8000; // we visit http://localhost:8000/ to see API
server.listen(PORT, () => console.log(`server is running on port ${PORT}`));

