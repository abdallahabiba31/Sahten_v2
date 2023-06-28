var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var jwt = require('jsonwebtoken');

// Create a new Express application
var app = express();
var ID = 3;

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Mock data
let items = [
    { id: 1, name: 'Ingredient 1' },
    { id: 2, name: 'Ingredient 2' },
];

// Mock user data
let users = [
    { id: 1, username: 'user1', password: 'password' },
    { id: 2, username: 'user2', password: 'password' },
];


app.get('/items', async function (req, res) {
    console.log('Received GET request to /items');
    console.log(items);
    res.json(items);
    //res.send();
});

app.post('/items', async (req, res) => {
    try {
        const newItem = req.body;
        newItem.id = ID;
        ID += 1;
        items.push(newItem);
        console.log(items);
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/items/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updateIndex = items.findIndex(item => item.id === id);
        items[updateIndex] = req.body;
        res.json(items[updateIndex]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/items/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        console.log(`Error: ${id}`);
        items = items.filter(item => item.id !== id);
        res.json({ message: 'Item deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

let nextUserId = 5;


app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = users.find(user => user.username === username && user.password === password);
        console.log("USER " + user + " " + username + " " + password)

        if (user) {
            const accessToken = jwt.sign({ id: user.id, name: user.username }, 'your_secret_key');
            console.log(accessToken);
            res.status(200).json({ message: "Welcome back", accessToken: accessToken })
        } else {
            // User is not found, return an error message
            res.status(400).json({ message: 'Username or password is incorrect' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        const userId = nextUserId++;
        const newUser = { id: userId, username: username, password: password }


        console.log(userId, username, password)
        users.push(newUser);
        console.log(users);

        const accessToken = jwt.sign({ id: newUser.id, name: newUser.username }, 'your_secret_key')
        console.log(accessToken);
        res.status(201).json({ accessToken: accessToken })
        //res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

module.exports = app;