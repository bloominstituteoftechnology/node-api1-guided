const express = require("express");
const shortid =  require("shortid");

const server = express();

server.use(express.json());

let hubs = []
let lessons = []

server.get('/', (req, res) => {
    res.status(200).json({api: "running"})
});

server.get('/hello', (req, res) => {
    res.status(200).json({hello: "Web 27"})
});

server.get('/api/lessons', (req, res) => {
    res.status(200).json(lessons)
})

server.post('/api/hubs', (req, res) => {
    const hubInfo = req.body;
    hubInfo.id = shortid.generate();
    hubs.push(hubInfo);
    res.status(201).json(hubInfo);
});

server.post('/api/lessons', (req, res) => {
    const lessonInfo = req.body;
    lessonInfo.id = shortid.generate();
    lessons.push(lessonInfo);
    res.status(201).json(lessonInfo);
});

const PORT = 5000;

server.listen(PORT, () => console.log(`\n *** API on http://localhost:${PORT} ***\n`))