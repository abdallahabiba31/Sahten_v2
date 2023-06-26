var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var jwt = require('jsonwebtoken');
//const { Session } = require('inspector');

// Create a new Express application
var app = express();
var ID = 3;

// Use middleware
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Mock data for our "database"
let items = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
];

// Mock user data
let users = [
    { id: 1, username: 'user1', password: 'pass1' },
    { id: 2, username: 'user2', password: 'pass2' },
    // add more users as needed
];


app.get('/items', async function (req, res) {
    console.log('Received GET request to /items');  // This will print to the terminal
    res.json(items);
    //res.send();
});

app.post('/items', async (req, res) => {
    const newItem = req.body;
    newItem.id = ID;
    ID += 1;
    items.push(newItem);
    res.status(201).json(newItem);
});

app.put('/items/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const updateIndex = items.findIndex(item => item.id === id);
    items[updateIndex] = req.body;
    res.json(items[updateIndex]);
});

app.delete('/items/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`Error: ${id}`);
    items = items.filter(item => item.id !== id);
    res.json({ message: 'Item deleted' });
});

let nextUserId = 5;
let isLoggedIn = false;


app.post('/login', async (req, res) => {
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
});

app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const userId = nextUserId++;
    const newUser = { userId, username, password }

    console.log(userId, username, password)
    users.push(userId, username, password);
    console.log(users);

    const accessToken = jwt.sign({ id: newUser.id, name: newUser.username }, 'your_secret_key')
    console.log(accessToken);
    res.status(201).json({ accessToken: accessToken })
    //res.status(201).json(newUser);
});

app.post('/logout', async (req, res) => {
    const userId = req.body.userId;
    if(req.user.id ===  userId){
        res.status(200).json("User logout");
    }else{
        res.status(403).json("not log out");
    }

    res.json({ message: 'Logout erfolgreich' });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

module.exports = app;