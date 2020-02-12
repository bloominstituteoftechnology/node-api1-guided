const express = require("express");
let users = require('./users.js');
const server = express();
server.use(express.json());

server.get('/', (req, res) =>{
    res.json({message: 'Server is live'})
});

server.get('/secondRoute', (req, res)=>{
    res.redirect('https://redirectUrl.com')
});
server.get('/users',(req, res)=>{
    res.json(users)
});
server.get('/users/:id', (req, res)=>{
    const id = req.params.id;
    const user = users.find(e => e.id == id);
    user
        ? res.json(user)
        : res.status(404).json({message: "User not found"})
});
server.post('/users', (req,res)=>{
    const newUser = {
        id: users.length + 1,
        name: req.body.name
    };
    users.push(newUser);
    res.status(201).json(newUser)
});
server.put('/users/:id', (req, res)=>{
    const index = users.findIndex(e => e.id == req.params.id);
    req.body.name
        ? users[index].name = req.body.name
        : res.status(404).json({message: 'User not found'});
    res.json(users[index])
});
server.delete('/users/:id', (req, res)=> {
        const user = users.find(e => e.id == req.params.id);
        user
            ? (users=users.filter(e => e.id != req.params.id), res.status(204).end())
            : res.status(404).json({message: 'User not found'})

    }
);

const port = 5000;
server.listen(port, ()=>{
    console.log(`Server listening on http://localhost:${port}`)
});