const express = require('express');
const shortid = require('shortid');

const server = express();

let hubs = [];

let lessons = [];

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({ api: 'running...'})
})

server.get('/hello', (req, res) => {
    res.status(200).json(
        {
            hello: "webpt_13"
        }
    )
})

server.post('/api/hubs', (req, res) => {
    const hubInfo = req.body;

    hubInfo.id = shortid.generate();

    hubs.push(hubInfo)

    res.status(201).json(hubInfo);
})

server.post('/api/lessons', (req, res) => {
    const lessonsInfo = req.body;

    lessonsInfo.id = shortid.generate();

    lessons.push(lessonsInfo);

    res.status(201).json(lessonsInfo);
})

const PORT = 5000;

server.listen(PORT, () => console.log(`\n ** API on http://localhost:${PORT} ** \n`))